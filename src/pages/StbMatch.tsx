import { useState, useMemo, useEffect } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Callout,
  ChoiceGroup,
  EmptyState,
  Field,
  ResultPanel,
  ToneBadge,
  ToolSection,
  selectCls,
  type Tone,
} from "@/components/cockpit/kit";
import { STB_POOL, STB_AVOID_LIST, matchStbs, plzToRegion, regionLabel, regionCoverage, type Briefing, type StbSpecTag } from "@/data/stbPool";
import { GRUPPEN, getGruppeById, type Gruppe, type Pflichtfeld } from "@/data/stbGruppen";
import {
  Building2,
  Search,
  CheckCircle2,
  Check,
  Mail,
  FileText,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Loader2,
  Star,
  Wifi,
  ShieldAlert,
  MessageCircle,
  MapPin,
  Users,
  User,
  ShoppingCart,
  Landmark,
  Globe,
  Bitcoin,
  MonitorSmartphone,
  FlaskConical,
  Briefcase,
  ClipboardList,
  ChevronDown,
  Store,
  ListChecks,
  Lightbulb,
  Plus,
  RotateCcw,
  Copy,
  Scale,
  type LucideIcon,
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

const STEP_LABELS: Record<Step, string> = { 1: "Briefing", 2: "Kanzleien wählen", 3: "PDF und Versand" };

/** Icons je Gründer-Gruppe (ersetzt die Emojis in der Oberfläche; PDF/E-Mail bleiben unverändert). */
const GRUPPEN_ICON: Record<string, LucideIcon> = {
  "solo-freiberufler": User,
  "ug-gmbh-regular": Building2,
  "ecom-d2c": ShoppingCart,
  holding: Landmark,
  international: Globe,
  crypto: Bitcoin,
  "saas-digital": MonitorSmartphone,
  "lohn-mitarbeiter": Users,
  "fae-forschung": FlaskConical,
  "stiftung-pool": Briefcase,
};

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
    gruppen: [],
    gruppenFelder: {},
  });

  const aktivGruppen = useMemo(
    () => briefing.gruppen.map((id) => getGruppeById(id as any)).filter(Boolean) as Gruppe[],
    [briefing.gruppen],
  );

  // Auto-Merge der Gruppen-MatchTags in spezialTags + Vorschlag von Pain-Points
  useEffect(() => {
    if (aktivGruppen.length === 0) return;
    const autoTags = Array.from(new Set(aktivGruppen.flatMap((g) => g.matchTags))) as StbSpecTag[];
    setBriefing((b) => {
      const mergedTags = Array.from(new Set([...b.spezialTags, ...autoTags])) as StbSpecTag[];
      return { ...b, spezialTags: mergedTags };
    });
  }, [aktivGruppen.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleGruppe = (id: string) => {
    setBriefing((b) => {
      const has = b.gruppen.includes(id);
      const next = has ? b.gruppen.filter((x) => x !== id) : b.gruppen.length < 3 ? [...b.gruppen, id] : b.gruppen;
      return { ...b, gruppen: next };
    });
  };

  const setGruppeFeld = (gruppenId: string, fieldKey: string, value: string | string[] | number | boolean) => {
    setBriefing((b) => ({
      ...b,
      gruppenFelder: { ...b.gruppenFelder, [`${gruppenId}.${fieldKey}`]: value },
    }));
  };

  const getGruppeFeld = (gruppenId: string, fieldKey: string): string | string[] | number | boolean | undefined =>
    briefing.gruppenFelder[`${gruppenId}.${fieldKey}`];

  const applyPainPointSuggestion = (idx: number, text: string) => {
    setBriefing((b) => ({ ...b, painPoints: b.painPoints.map((p, i) => (i === idx ? text : p)) }));
  };
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
    briefing.gruppen.length >= 1 &&
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

      // Gruppen-spezifische Pflichtfelder
      if (aktivGruppen.length > 0) {
        line("Gewählte Gründer-Gruppe(n) + Pflicht-Angaben", { size: 13, bold: true, gap: 3 });
        aktivGruppen.forEach((gruppe) => {
          line(`${gruppe.emoji} ${gruppe.name}`, { size: 11, bold: true, gap: 2 });
          gruppe.pflichtfelder.forEach((feld) => {
            const v = briefing.gruppenFelder[`${gruppe.id}.${feld.key}`];
            if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return;
            const displayVal = Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "Ja" : "Nein") : String(v);
            line(`  ${feld.label}: ${displayVal}`, { size: 9, gap: 2 });
          });
          y += 2;
        });
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
    if (aktivGruppen.length > 0) {
      lines.push("");
      lines.push("Gründer-Gruppe(n):");
      aktivGruppen.forEach((g) => {
        lines.push(`  ${g.emoji} ${g.name}`);
        g.pflichtfelder.forEach((feld) => {
          const v = briefing.gruppenFelder[`${g.id}.${feld.key}`];
          if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return;
          const displayVal = Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "Ja" : "Nein") : String(v);
          lines.push(`    - ${feld.label}: ${displayVal}`);
        });
      });
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
    const note = `\n\n---\nHinweis: Diese Anfrage geht parallel an mehrere Kanzleien (BCC). Die Kanzleien sehen sich gegenseitig nicht.`;
    // Mailto-URLs sind URL-länge-limitiert (~2000 chars) — Body ist hier safe.
    // Keine geratenen info@-Adressen mehr: Nur verifizierte Kontaktadressen aus dem Pool (Feld email) kommen in BCC,
    // Verzeichnisse/Kammern nie. Alle übrigen Adressen trägt der Nutzer selbst aus dem Impressum der Kanzlei ein.
    const bccList = selectedStbList
      .filter((s) => !istVerzeichnis(s))
      .map((s) => (s as { email?: string }).email)
      .filter((e): e is string => typeof e === "string" && /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(e))
      .join(",");
    const url = `mailto:?${bccList ? `bcc=${encodeURIComponent(bccList)}&` : ""}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + note)}`;
    window.location.href = url;
  };

  const istVerzeichnis = (s: { id: string; name: string }) =>
    /verzeichnis|suche|kammer/i.test(s.name) || s.id === "datev-smartexperts" || s.id === "stbk-suche";

  const copyEmailBody = async () => {
    try {
      await navigator.clipboard.writeText(buildEmailBody());
      alert("Email-Body in Zwischenablage kopiert. PDF separat anhängen.");
    } catch {
      alert("Konnte nicht in Zwischenablage kopieren.");
    }
  };

  const step1Fehlt: string[] = [];
  if (briefing.gruppen.length === 0) step1Fehlt.push("mindestens eine Gruppe");
  if (briefing.serviceBedarf.length === 0) step1Fehlt.push("Service-Bedarf");
  if (briefing.painPoints.filter((p) => p.trim().length > 5).length === 0) step1Fehlt.push("eine Frage an die Kanzlei");

  return (
    <CockpitShell
      eyebrow="Steuerberatung · Drei-Angebote-Modell"
      title="Steuerberater-Match in 3 Schritten"
      subtitle="Erst ein Briefing passend zu deiner Gründer-Gruppe, dann bis zu drei passende Kanzleien wählen, zum Schluss Briefing-PDF und E-Mail-Vorlage. Du verschickst selbst, GründerX vermittelt nicht (§ 9 StBerG)."
      showRelated={false}
    >
      {/* Schritt-Anzeige */}
      <nav aria-label="Fortschritt" className="mb-8">
        <ol className="flex gap-2 sm:grid sm:grid-cols-3 sm:gap-3">
          {([1, 2, 3] as const).map((s) => {
            const done = step > s;
            const current = step === s;
            return (
              <li
                key={s}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 sm:px-4",
                  current ? "min-w-0 flex-1" : "shrink-0",
                  current ? "border-primary/30 bg-card shadow-card" : "border-border bg-secondary/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular",
                    done || current ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground ring-1 ring-border",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : s}
                </span>
                <span className="min-w-0">
                  <span className="hidden text-xs text-muted-foreground sm:block">Schritt {s}</span>
                  <span className={cn("truncate text-sm font-medium", current ? "block text-foreground" : "hidden text-muted-foreground sm:block")}>
                    {STEP_LABELS[s]}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* === SCHRITT 1: BRIEFING === */}
      {step === 1 && (
        <div className="space-y-6">
          <ToolSection
            title="Welche Gründer-Gruppe trifft auf dich zu?"
            description="Wähle eine bis drei Gruppen, z. B. E-Commerce und GmbH. Jede Gruppe bringt eigene Pflichtangaben und passende Fragen an die Kanzlei mit."
            icon={Users}
            actions={<ToneBadge tone={briefing.gruppen.length > 0 ? "accent" : "neutral"}>{briefing.gruppen.length} von 3</ToneBadge>}
          >
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {GRUPPEN.map((g) => {
                const aktiv = briefing.gruppen.includes(g.id);
                const disabled = !aktiv && briefing.gruppen.length >= 3;
                const Icon = GRUPPEN_ICON[g.id] ?? Users;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => toggleGruppe(g.id)}
                    disabled={disabled}
                    aria-pressed={aktiv}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200",
                      aktiv
                        ? "border-accent-blue/50 bg-accent shadow-[0_0_0_3px_hsl(var(--accent-blue)/0.12)]"
                        : disabled
                          ? "cursor-not-allowed border-border bg-secondary/40 opacity-50"
                          : "border-border bg-card hover:border-foreground/25",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        aktiv ? "bg-accent-blue text-primary-foreground" : "bg-secondary text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug">{g.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{g.beschreibung}</span>
                    </span>
                    {aktiv && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {briefing.gruppen.length === 0 && (
              <Callout tone="warning" className="mt-4">
                Bitte mindestens eine Gruppe wählen. Danach richten sich die Pflichtangaben und die Fragenvorschläge.
              </Callout>
            )}
          </ToolSection>

          {aktivGruppen.map((gruppe) => {
            const Icon = GRUPPEN_ICON[gruppe.id] ?? ClipboardList;
            return (
              <ToolSection
                key={gruppe.id}
                title={`${gruppe.name}: Pflichtangaben`}
                description="Diese Angaben braucht die Kanzlei, um Aufwand und Honorar im Erstgespräch seriös zu schätzen."
                icon={Icon}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {gruppe.pflichtfelder.map((feld) => (
                    <PflichtfeldInput
                      key={feld.key}
                      gruppenId={gruppe.id}
                      feld={feld}
                      value={getGruppeFeld(gruppe.id, feld.key)}
                      onChange={(val) => setGruppeFeld(gruppe.id, feld.key, val)}
                    />
                  ))}
                </div>
                <details className="group mt-5 rounded-xl border border-border bg-secondary/40 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium">
                    Regulatorische Besonderheiten dieser Gruppe ({gruppe.regulatorischeBesonderheiten.length})
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="list-disc space-y-1.5 border-t border-border/70 px-4 py-3 pl-8 text-sm leading-relaxed text-muted-foreground">
                    {gruppe.regulatorischeBesonderheiten.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </details>
              </ToolSection>
            );
          })}

          <ToolSection title="Mandanten-Profil" description="Basisdaten für die Honorar-Schätzung." icon={Building2}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Rechtsform" htmlFor="stb-rechtsform">
                <select
                  id="stb-rechtsform"
                  value={briefing.rechtsform}
                  onChange={(e) => setBriefing({ ...briefing, rechtsform: e.target.value })}
                  className={selectCls}
                >
                  {RECHTSFORM_OPTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field label="Umsatz pro Jahr (€)" htmlFor="stb-umsatz">
                <select
                  id="stb-umsatz"
                  value={briefing.umsatzRange}
                  onChange={(e) => setBriefing({ ...briefing, umsatzRange: e.target.value as Briefing["umsatzRange"] })}
                  className={selectCls}
                >
                  {UMSATZ_OPTIONS.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </Field>
              <Field label="Belege pro Monat" htmlFor="stb-belege">
                <select
                  id="stb-belege"
                  value={briefing.belegeMonat}
                  onChange={(e) => setBriefing({ ...briefing, belegeMonat: e.target.value as Briefing["belegeMonat"] })}
                  className={selectCls}
                >
                  {BELEGE_OPTIONS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="PLZ (optional)" htmlFor="stb-plz" hint="Für Kanzleien in deiner Nähe">
                <Input
                  id="stb-plz"
                  value={briefing.plz}
                  onChange={(e) => setBriefing({ ...briefing, plz: e.target.value })}
                  placeholder="z. B. 22527"
                  inputMode="numeric"
                  maxLength={5}
                />
              </Field>
              <Field label="Mitarbeitende gesamt" htmlFor="stb-ma">
                <Input
                  id="stb-ma"
                  type="number"
                  value={briefing.mitarbeiter || ""}
                  onChange={(e) => setBriefing({ ...briefing, mitarbeiter: Math.max(0, Number(e.target.value) || 0) })}
                  placeholder="0"
                  className="tabular"
                />
              </Field>
              <Field label="Lohnabrechnungen pro Monat" htmlFor="stb-lohn">
                <Input
                  id="stb-lohn"
                  type="number"
                  value={briefing.lohnabrechnungenMonat || ""}
                  onChange={(e) =>
                    setBriefing({ ...briefing, lohnabrechnungenMonat: Math.max(0, Number(e.target.value) || 0) })
                  }
                  placeholder="0"
                  className="tabular"
                />
              </Field>
            </div>
          </ToolSection>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ToolSection title="Vertriebskanäle" icon={Store}>
              <CheckGrid
                items={VERTRIEBSKANAELE.map((k) => ({ value: k, label: k }))}
                selected={briefing.vertriebskanaele}
                onToggle={(k) => toggleArrayItem("vertriebskanaele", k)}
              />
            </ToolSection>
            <ToolSection title="Spezial-Themen" description="Diese Themen treiben das Match am stärksten." icon={Sparkles}>
              <CheckGrid
                items={(Object.keys(SPEZIAL_TAG_LABELS) as StbSpecTag[]).map((t) => ({ value: t, label: SPEZIAL_TAG_LABELS[t] }))}
                selected={briefing.spezialTags}
                onToggle={(t) => toggleArrayItem("spezialTags", t)}
              />
            </ToolSection>
          </div>

          <ToolSection title="Leistungen und Erwartungen" description="Mindestens eine Leistung auswählen." icon={ListChecks}>
            <CheckGrid
              items={SERVICE_OPTIONS.map((s) => ({ value: s, label: s }))}
              selected={briefing.serviceBedarf}
              onToggle={(s) => toggleArrayItem("serviceBedarf", s)}
            />
            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border/70 pt-5 md:grid-cols-3">
              <Field label="Buchhaltungs-Software" htmlFor="stb-tool">
                <select
                  id="stb-tool"
                  value={briefing.toolStack}
                  onChange={(e) => setBriefing({ ...briefing, toolStack: e.target.value as Briefing["toolStack"] })}
                  className={selectCls}
                >
                  <option value="egal">Kein Wunsch</option>
                  <option value="datev">DATEV</option>
                  <option value="lexoffice">Lexoffice</option>
                  <option value="sevdesk">sevDesk</option>
                  <option value="buchhaltungsbutler">BuchhaltungsButler</option>
                </select>
              </Field>
              <Field label="Gewünschte Antwortzeit" htmlFor="stb-sla">
                <select
                  id="stb-sla"
                  value={briefing.slaWunsch}
                  onChange={(e) => setBriefing({ ...briefing, slaWunsch: e.target.value as Briefing["slaWunsch"] })}
                  className={selectCls}
                >
                  <option value="24h">24h</option>
                  <option value="48h">48h</option>
                  <option value="1woche">1 Woche</option>
                </select>
              </Field>
              <Field label="Budget (optional)" htmlFor="stb-budget">
                <Input
                  id="stb-budget"
                  value={briefing.budget}
                  onChange={(e) => setBriefing({ ...briefing, budget: e.target.value })}
                  placeholder="z. B. 6-12k €/Jahr"
                />
              </Field>
            </div>
          </ToolSection>

          <ToolSection
            title="Drei Fragen an die Kanzlei"
            description="Mindestens eine ausfüllen. Die Kanzlei soll jede Frage in zwei bis drei Sätzen beantworten; so trennst du Spezialisten von Standard-Anschreiben."
            icon={MessageCircle}
          >
            <div className="space-y-3">
              {briefing.painPoints.map((p, idx) => (
                <Field key={idx} label={`Frage ${idx + 1}`} htmlFor={`stb-pp-${idx}`}>
                  <Input
                    id={`stb-pp-${idx}`}
                    value={p}
                    onChange={(e) => setPainPoint(idx, e.target.value)}
                    placeholder={[
                      "z. B. Wie bucht ihr Amazon-Reverse-Charge §13b für IT/FR/ES korrekt?",
                      "z. B. Erfahrung mit OSS-Verfahren bei FBA-Pan-EU?",
                      "z. B. Wie schnell antwortet ihr auf Mandanten-Mails: gleicher Tag, 24h, 48h?",
                    ][idx]}
                  />
                </Field>
              ))}
            </div>
            {aktivGruppen.length > 0 && (
              <details className="group mt-5 rounded-xl border border-accent-blue/20 bg-accent/60 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent-blue" aria-hidden="true" />
                    Vorschläge aus deinen Gruppen ({aktivGruppen.flatMap((g) => g.beispielPainPoints).length})
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-accent-blue/15 px-4 py-3">
                  <p className="mb-3 text-xs text-muted-foreground">Ein Klick übernimmt die Frage ins nächste freie Feld.</p>
                  <div className="space-y-2">
                    {aktivGruppen
                      .flatMap((g) => g.beispielPainPoints.map((pp, i) => ({ gruppe: g, text: pp, key: `${g.id}-${i}` })))
                      .map(({ gruppe, text, key }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            const nextFreeIdx = briefing.painPoints.findIndex((p) => p.trim().length === 0);
                            const idx = nextFreeIdx === -1 ? 2 : nextFreeIdx;
                            applyPainPointSuggestion(idx, text);
                          }}
                          className="flex w-full items-start gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-accent-blue/40"
                        >
                          <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" aria-hidden="true" />
                          <span className="min-w-0">
                            <span className="block text-xs text-muted-foreground">{gruppe.name}</span>
                            <span className="block text-sm leading-relaxed">{text}</span>
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              </details>
            )}
          </ToolSection>

          <div className="flex flex-col-reverse items-stretch gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between md:px-6">
            <p className="text-sm text-muted-foreground">
              {step1Valid ? "Briefing vollständig. Weiter zur Kanzlei-Auswahl." : `Noch offen: ${step1Fehlt.join(", ")}.`}
            </p>
            <Button size="lg" className="rounded-xl bg-gradient-primary" onClick={() => setStep(2)} disabled={!step1Valid}>
              Weiter: Kanzleien wählen <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {/* === SCHRITT 2: KANZLEIEN === */}
      {step === 2 && (
        <div className="space-y-6">
          <ToolSection
            title={`Passende Kanzleien aus ${STB_POOL.length} Spezialisten`}
            description="Der Score berücksichtigt Spezial-Themen, Größe, Software, Sprachen, Online-Fähigkeit und öffentliche Bewertungen. Die Liste ist redaktionell kuratiert, ohne Provisionsbeziehung."
            icon={Search}
            actions={
              <ToneBadge tone={selectedStbs.size > 0 ? "accent" : "neutral"} className="tabular">
                {selectedStbs.size} von 3 gewählt
              </ToneBadge>
            }
          >
            {userRegion ? (
              (() => {
                const cov = regionCoverage(userRegion);
                const isThin = cov.local <= 2;
                return (
                  <Callout tone={isThin ? "warning" : "success"} icon={MapPin} title={`PLZ ${briefing.plz}: ${regionLabel(userRegion)}`}>
                    <span className="tabular">
                      {cov.local} lokal, {cov.neighbor} in der Nachbarregion, {cov.online} online (überall).
                    </span>
                    {isThin && (
                      <span className="mt-1 block">
                        Wenig lokale Kanzleien in deiner Region. Aktiviere den Online-Filter oder nutze die DATEV SmartExperts
                        bzw. die StBK-Suche im Pool.
                      </span>
                    )}
                  </Callout>
                );
              })()
            ) : (
              <Callout tone="warning" icon={MapPin} title="Keine PLZ angegeben">
                Die Entfernung fließt nicht ins Match ein.{" "}
                <button type="button" onClick={() => setStep(1)} className="font-medium text-foreground underline underline-offset-2">
                  Im Briefing PLZ nachtragen
                </button>{" "}
                für lokale Treffer.
              </Callout>
            )}

            <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <p className="text-sm font-medium">Mindestbewertung</p>
                <ChoiceGroup
                  label="Mindestbewertung"
                  size="sm"
                  value={minRating}
                  onChange={(v) => setMinRating(v)}
                  options={([0, 4.0, 4.5, 4.8] as const).map((r) => ({
                    value: r,
                    label: r === 0 ? "Alle" : `ab ${r.toFixed(1).replace(".", ",")}`,
                  }))}
                />
              </div>
              <Button
                variant={onlineOnly ? "default" : "outline"}
                size="sm"
                aria-pressed={onlineOnly}
                onClick={() => setOnlineOnly((v) => !v)}
              >
                <Wifi aria-hidden="true" /> Nur Online-Kanzleien
              </Button>
              <Button variant="outline" size="sm" aria-expanded={showAvoid} onClick={() => setShowAvoid((v) => !v)}>
                <ShieldAlert className="text-danger" aria-hidden="true" />
                Warnliste {showAvoid ? "ausblenden" : "anzeigen"} ({STB_AVOID_LIST.length})
              </Button>
              {(onlineOnly || minRating > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setOnlineOnly(false);
                    setMinRating(0);
                  }}
                >
                  <RotateCcw aria-hidden="true" /> Filter zurücksetzen
                </Button>
              )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground tabular">{matches.length} passende Kanzleien</p>
          </ToolSection>

          {showAvoid && (
            <ToolSection
              title="Kanzleien, vor denen Community und Bewertungen überwiegend warnen"
              description="Nicht im Match-Pool, basierend auf öffentlichen Beschwerde-Sammlungen."
              icon={ShieldAlert}
              className="border-danger/25"
            >
              <ul className="space-y-2.5">
                {STB_AVOID_LIST.map((a, i) => (
                  <li key={i} className="rounded-xl border border-danger/20 bg-danger-soft/60 p-3.5">
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{a.reason}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Quelle: {a.source}</p>
                  </li>
                ))}
              </ul>
            </ToolSection>
          )}

          {visibleMatches.length === 0 ? (
            <EmptyState
              icon={Search}
              title="Keine Kanzlei passt zu deinen Filtern"
              description="Senke die Mindestbewertung oder schalte den Online-Filter ab."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setOnlineOnly(false);
                    setMinRating(0);
                  }}
                >
                  Filter zurücksetzen
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {visibleMatches.map((m, idx) => {
                const isSelected = selectedStbs.has(m.stb.id);
                const canSelect = selectedStbs.size < 3 || isSelected;
                const ratingTone: Tone =
                  m.stb.rating === undefined ? "neutral" : m.stb.rating >= 4.7 ? "success" : m.stb.rating >= 4.0 ? "warning" : "danger";
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
                return (
                  <article
                    key={m.stb.id}
                    className={cn(
                      "flex flex-col rounded-2xl border bg-card p-5 shadow-card transition-[border-color,box-shadow] duration-200",
                      isSelected
                        ? "border-accent-blue/50 shadow-[0_0_0_3px_hsl(var(--accent-blue)/0.12)]"
                        : "border-border hover:border-foreground/20",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <ToneBadge tone="accent" className="tabular">Score {m.score}</ToneBadge>
                          {idx < 3 && <ToneBadge tone="success">Top {idx + 1}</ToneBadge>}
                          {m.stb.online_first && (
                            <ToneBadge tone="info">
                              <Wifi className="h-3 w-3" aria-hidden="true" /> Online
                            </ToneBadge>
                          )}
                          {m.stb.rating !== undefined &&
                            (() => {
                              const inner = (
                                <ToneBadge tone={ratingTone} className="tabular">
                                  <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                                  {m.stb.rating.toFixed(1).replace(".", ",")}
                                  {m.stb.rating_count !== undefined && (
                                    <span className="font-normal opacity-75">({m.stb.rating_count})</span>
                                  )}
                                </ToneBadge>
                              );
                              return reviewUrl ? (
                                <a
                                  href={reviewUrl}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="hover:opacity-80"
                                  title={`${m.stb.rating} von 5 aus ${m.stb.rating_count ?? "?"} Bewertungen via ${m.stb.rating_source}, dort ansehen`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {inner}
                                </a>
                              ) : (
                                <span title={`${m.stb.rating} von 5 aus ${m.stb.rating_count ?? "?"} Bewertungen via ${m.stb.rating_source ?? "?"}`}>
                                  {inner}
                                </span>
                              );
                            })()}
                        </div>
                        <h3 className="mt-2.5 truncate text-base font-semibold leading-snug">{m.stb.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {m.stb.city} · {m.stb.groesse === "boutique" ? "Boutique" : m.stb.groesse === "mid" ? "Mid-Market" : "Enterprise"} ·{" "}
                          {m.stb.sprachen.join(", ").toUpperCase()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => toggleStb(m.stb.id)}
                        disabled={!canSelect}
                        aria-pressed={isSelected}
                        className="shrink-0"
                      >
                        {isSelected ? (
                          <>
                            <Check aria-hidden="true" /> Gewählt
                          </>
                        ) : (
                          "Wählen"
                        )}
                      </Button>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.stb.tagline}</p>
                    <p className="mt-2 text-sm font-medium text-success">{m.stb.honorarHinweis}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.stb.specs.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                          {SPEZIAL_TAG_LABELS[s] || s}
                        </span>
                      ))}
                    </div>

                    {m.reason && (
                      <p className="mt-3 flex items-start gap-1.5 text-xs text-accent-blue">
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                        {m.reason}
                      </p>
                    )}

                    {m.stb.reddit_mention && (
                      <p className="mt-3 flex items-start gap-2 rounded-lg bg-secondary/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                        <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{m.stb.reddit_mention}</span>
                      </p>
                    )}

                    <details className="group mt-auto pt-3 text-sm [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer list-none items-center gap-1 border-t border-border/70 pt-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                        Was sie besonders gut können
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
                        {m.stb.besonders.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                      <a
                        href={m.stb.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
                      >
                        Webseite öffnen <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </details>
                  </article>
                );
              })}
            </div>
          )}

          {!showAll && matches.length > 12 && (
            <Button variant="outline" className="h-11 w-full rounded-xl border-dashed" onClick={() => setShowAll(true)}>
              Alle {matches.length} Kanzleien anzeigen ({matches.length - 12} weitere)
            </Button>
          )}

          <div className="flex flex-col-reverse gap-3 pb-24 sm:flex-row sm:justify-between md:pb-20">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft aria-hidden="true" /> Zurück zum Briefing
            </Button>
            <Button size="lg" className="rounded-xl bg-gradient-primary" onClick={() => setStep(3)} disabled={selectedStbs.size === 0}>
              Weiter: PDF und Versand <ArrowRight aria-hidden="true" />
            </Button>
          </div>

          {/* Schwebende Leiste, sobald mindestens eine Kanzlei gewählt ist */}
          {selectedStbs.size > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 shadow-soft backdrop-blur-md">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-blue">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight tabular">
                      {selectedStbs.size} Kanzlei{selectedStbs.size === 1 ? "" : "en"} gewählt
                    </p>
                    <p className="hidden truncate text-xs text-muted-foreground sm:block">
                      {selectedStbList.map((s) => s.name).join(" · ")}
                    </p>
                  </div>
                </div>
                <Button className="shrink-0 rounded-xl bg-gradient-primary" onClick={() => setStep(3)}>
                  Weiter<span className="hidden md:inline">: PDF und Versand</span>
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === SCHRITT 3: VERSAND === */}
      {step === 3 && (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
          <div className="min-w-0 space-y-6">
            <ResultPanel
              kicker="Schritt 3"
              title="Bereit für den Versand"
              actions={<ToneBadge tone="accent" className="tabular">{selectedStbList.length} Empfänger</ToneBadge>}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                Lade das anonymisierte Briefing als PDF herunter und öffne die vorbereitete E-Mail. Die Kontaktadresse jeder Kanzlei
                findest du im Impressum ihrer Website (Link rechts); trage sie selbst in BCC ein, damit sich die Kanzleien nicht gegenseitig sehen.
                Wir raten keine Adressen. Verzeichnisse und Kammern sind keine Kanzleien: dort suchst du direkt auf der Website.
              </p>
              <ul className="mt-4 divide-y divide-border/70 rounded-xl border border-border">
                {selectedStbList.map((s) => (
                  <li key={s.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                    <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{s.name}</span>
                      <span className="block text-xs text-muted-foreground">{s.city}</span>
                    </span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Webseite von ${s.name} öffnen`}
                      className="rounded-md p-1.5 text-accent-blue hover:bg-accent"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button className="rounded-xl bg-gradient-primary" onClick={generatePdf} disabled={generating}>
                  {generating ? <Loader2 className="animate-spin" aria-hidden="true" /> : <FileText aria-hidden="true" />}
                  {generating ? "PDF wird erstellt…" : "Briefing-PDF herunterladen"}
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={sendEmail}>
                  <Mail aria-hidden="true" /> E-Mail öffnen (BCC)
                </Button>
                <Button variant="ghost" className="rounded-xl" onClick={copyEmailBody}>
                  <Copy aria-hidden="true" /> E-Mail-Text kopieren
                </Button>
              </div>
            </ResultPanel>

            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft aria-hidden="true" /> Zurück zur Kanzlei-Auswahl
            </Button>
          </div>

          <div className="min-w-0 space-y-6">
            <ToolSection title="So gehst du jetzt vor" icon={Shield}>
              <ol className="space-y-3">
                {[
                  { t: "PDF herunterladen", d: "Das anonymisierte Briefing wird gespeichert." },
                  { t: "E-Mail öffnen", d: "Dein Mail-Programm öffnet sich mit vorausgefülltem Text. Kontaktadressen aus dem Impressum der Kanzleien in BCC eintragen." },
                  { t: "PDF anhängen", d: "Die Datei manuell als Anhang hinzufügen." },
                  { t: "Versenden", d: "Die Mail geht direkt an die Kanzleien, ohne Umweg über GründerX." },
                  { t: "Antworten abwarten", d: "Kanzleien antworten meist binnen 48 Stunden bis einer Woche mit einem Erstangebot." },
                  {
                    t: "Vergleichen und auswählen",
                    d: "Pauschalen, Beleg-Obergrenze, Antwortzeit und Reaktion vergleichen. Klartext-Daten erst nach Annahme des Angebots weitergeben.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular">
                      {i + 1}
                    </span>
                    <div className="min-w-0 text-sm">
                      <p className="font-medium">{s.t}</p>
                      <p className="mt-0.5 leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ToolSection>

            <Callout tone="neutral" icon={Scale} title="Rechtlicher Rahmen">
              GründerX vermittelt nicht (§ 9 StBerG). Die Kanzlei-Liste ist redaktionell nach öffentlich bekannten
              Spezialisierungen kuratiert, ohne Provisionsbeziehung. Eigene Recherche und Erstgespräch bleiben Pflicht.
              Aufnahmekapazität ist nicht garantiert (rund 30 % der Kanzleien in Deutschland haben wegen Nachwuchsmangel einen
              Aufnahmestopp). DSGVO: Klartext-Stammdaten (Firma, USt-ID, Bank) erst nach Annahme an die gewählte Kanzlei
              übermitteln.
            </Callout>
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

/** Auswahlraster aus Checkboxen (nur Darstellung). */
const CheckGrid = ({
  items,
  selected,
  onToggle,
}: {
  items: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
    {items.map((it) => {
      const checked = selected.includes(it.value);
      return (
        <label
          key={it.value}
          className={cn(
            "flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors",
            checked ? "border-accent-blue/40 bg-accent/70" : "border-border hover:border-foreground/20",
          )}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(it.value)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
          />
          <span className="leading-snug">{it.label}</span>
        </label>
      );
    })}
  </div>
);

// ===== PflichtfeldInput: rendert das passende Form-Element je nach FeldType =====
type PflichtfeldInputProps = {
  gruppenId: string;
  feld: Pflichtfeld;
  value: string | string[] | number | boolean | undefined;
  onChange: (val: string | string[] | number | boolean) => void;
};

const PflichtfeldInput = ({ gruppenId, feld, value, onChange }: PflichtfeldInputProps) => {
  const ft = feld.field;
  const id = `pf-${gruppenId}-${feld.key}`;
  const wide = ft.type === "multiselect" || ft.type === "textarea";
  return (
    <Field label={feld.label} hint={feld.hint} htmlFor={ft.type === "multiselect" || ft.type === "yesno" ? undefined : id} className={wide ? "md:col-span-2" : undefined}>
      {ft.type === "text" && (
        <Input id={id} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} placeholder={ft.placeholder} />
      )}
      {ft.type === "number" && (
        <Input
          id={id}
          type="number"
          min={ft.min ?? 0}
          value={typeof value === "number" ? value : ""}
          onChange={(e) => onChange(Math.max(ft.min ?? 0, Number(e.target.value) || 0))}
          placeholder={ft.placeholder}
          className="tabular"
        />
      )}
      {ft.type === "select" && (
        <select id={id} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} className={selectCls}>
          <option value="">Bitte wählen</option>
          {ft.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
      {ft.type === "multiselect" && (
        <div className="grid max-h-44 grid-cols-1 gap-1.5 overflow-y-auto rounded-lg border border-border bg-card p-2 sm:grid-cols-2">
          {ft.options.map((o) => {
            const arr = Array.isArray(value) ? value : [];
            const checked = arr.includes(o);
            return (
              <label
                key={o}
                className={cn(
                  "flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm",
                  checked ? "bg-accent/70" : "hover:bg-secondary/60",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(checked ? arr.filter((x) => x !== o) : [...arr, o])}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                />
                <span className="leading-snug">{o}</span>
              </label>
            );
          })}
        </div>
      )}
      {ft.type === "yesno" && (
        <ChoiceGroup
          label={feld.label}
          size="sm"
          value={value === true ? "ja" : value === false ? "nein" : ""}
          onChange={(v) => onChange(v === "ja")}
          options={[
            { value: "ja", label: "Ja" },
            { value: "nein", label: "Nein" },
          ]}
        />
      )}
      {ft.type === "textarea" && (
        <Textarea id={id} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} placeholder={ft.placeholder} rows={2} />
      )}
    </Field>
  );
};

export default StbMatch;
