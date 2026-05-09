import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, AlertTriangle, CheckCircle2, TrendingDown, Info, Calendar } from "lucide-react";

type LegalForm = "einzel" | "ug" | "gmbh" | "holding";

const KSt_GEWST = 0.30;
const ABG_ST = 0.26375;
const HOLDING_RATE = 0.015;

function progressionESt(zvE: number): number {
  if (zvE <= 12096) return 0;
  if (zvE <= 17443) {
    const y = (zvE - 12096) / 10000;
    return Math.round((932.3 * y + 1400) * y);
  }
  if (zvE <= 68480) {
    const z = (zvE - 17443) / 10000;
    return Math.round((176.64 * z + 2397) * z + 1015.13);
  }
  if (zvE <= 277825) return Math.round(0.42 * zvE - 10911.92);
  return Math.round(0.45 * zvE - 19246.67);
}

function steuerForm(form: LegalForm, gewinn: number, estSatz: number): number {
  if (gewinn <= 0) return 0;
  if (form === "einzel") return progressionESt(gewinn);
  // GmbH/UG: KSt+GewSt 30% + AbgSt 26,375% auf Vollausschüttung (vereinfacht)
  if (form === "ug" || form === "gmbh") {
    const stG = gewinn * KSt_GEWST;
    return stG + (gewinn - stG) * ABG_ST;
  }
  // Holding: 30% + 1,5% (Reinvest) — bei Privat-Entnahme zusätzlich AbgSt
  const stG = gewinn * KSt_GEWST;
  return stG + (gewinn - stG) * HOLDING_RATE;
}

const PreYearEndCheck = () => {
  const [form, setForm] = useState<LegalForm>("gmbh");
  const [gewinn, setGewinn] = useState(150000);
  const [estSatz, setEstSatz] = useState(0.42);
  const [aktivitaeten, setAktivitaeten] = useState<Record<string, boolean>>({});
  const [iabBasis, setIabBasis] = useState(40000);
  const [investitionVorziehen, setInvestitionVorziehen] = useState(15000);
  const [boniGesamt, setBoniGesamt] = useState(20000);

  const baselineSteuer = useMemo(() => steuerForm(form, gewinn, estSatz), [form, gewinn, estSatz]);

  // Hebel-Berechnungen
  const hebel = useMemo(() => {
    const list: { id: string; title: string; emoji: string; deadline: string; description: string; ersparnis: number; details: string[]; aktiv: boolean }[] = [];

    // 1) IAB §7g EStG — mit Voraussetzungs-Check
    // Einzel/UG/GmbH: vereinfacht über Gewinn-Schwelle 200k (echte Voraussetzung GmbH:
    // Bilanzsumme < 235k, hier approximiert über Gewinn als Indikator).
    const iabBerechtigt = form === "einzel" ? gewinn <= 200000 : gewinn <= 200000;
    if (gewinn > 0) {
      const iabAbzug = iabBerechtigt ? Math.min(iabBasis * 0.5, 200000) : 0;
      const ersparnis = form === "einzel" ? iabAbzug * estSatz : iabAbzug * KSt_GEWST;
      list.push({
        id: "iab",
        title: iabBerechtigt ? "IAB — Investitionsabzugsbetrag" : "IAB — NICHT berechtigt (Gewinn-Schwelle)",
        emoji: "📦",
        deadline: "31.12.",
        description: iabBerechtigt
          ? "50 % geplanter Investitionen (max 200k €) als Vorab-Abzug — sofort steuerwirksam."
          : "Bei Gewinn > 200.000 €/Jahr (Einzel) bzw. Bilanzsumme > 235.000 € (GmbH) ist §7g EStG gesperrt.",
        ersparnis,
        details: iabBerechtigt
          ? [
              `Geplante Investition in 3 Jahren: ${iabBasis.toLocaleString("de-DE")} €`,
              `IAB-Abzug 50 %: ${iabAbzug.toLocaleString("de-DE")} €`,
              `Steuer-Ersparnis ${form === "einzel" ? "ESt" : "KSt+GewSt"}: ${Math.round(ersparnis).toLocaleString("de-DE")} €`,
              "Voraussetzung: Investition muss binnen 3 Wirtschaftsjahren erfolgen, sonst rückwirkend + 6 % p.a. Verzinsung (§233a AO)",
              "Einzel/Freiberuf: Gewinn vor IAB ≤ 200.000 €/Jahr · GmbH/UG: Bilanzsumme ≤ 235.000 €",
              "Detail-Tool: → /cockpit/iab-rechner",
            ]
          : [
              `Aktueller Gewinn ${gewinn.toLocaleString("de-DE")} € überschreitet die §7g-Schwelle 200.000 €`,
              "Bei GmbH: Maßstab ist die Bilanzsumme zum Wirtschaftsjahres-Ende (≤ 235.000 €)",
              "Alternative: Sonderabschreibung §7g(5) — 20 % im Anschaffungsjahr ohne Schwellen-Beschränkung",
              "Alternative: Investitionen vorziehen + GWG-Sofortabschreibung",
            ],
        aktiv: !!aktivitaeten.iab,
      });
    }

    // 2) Investitionen vorziehen (Sofortabschreibung GWG bis 800€, 1000€ ab 2024)
    if (investitionVorziehen > 0) {
      const gwgGrenze = 800; // Pool-Grenze, ab 2024 könnte 1.000 € gelten je nach Wahlrecht
      const sofortAbschreibung = investitionVorziehen; // simplification
      const ersparnis = form === "einzel" ? sofortAbschreibung * estSatz : sofortAbschreibung * KSt_GEWST;
      list.push({
        id: "invest",
        title: "Investitionen vorziehen (vor 31.12.)",
        emoji: "🛒",
        deadline: "31.12.",
        description: "GWG bis 800 € sofort abschreiben · größere Investitionen Halbjahres-AfA nutzen.",
        ersparnis,
        details: [
          `Geplante Investition vorziehen: ${investitionVorziehen.toLocaleString("de-DE")} €`,
          `Steuer-Ersparnis im laufenden Jahr: ${Math.round(ersparnis).toLocaleString("de-DE")} €`,
          "GWG (Geringwertige Wirtschaftsgüter) < 800 €: 100 % Sofortabschreibung",
          "Pool-Wahlrecht: 250–1.000 €/Stück → Pool über 5 Jahre abschreiben",
          "Bei größerer Anschaffung im Dezember: nur 1/12 AfA — meist trotzdem mehr als 0",
          "Achtung: tatsächliche Lieferung + Inbetriebnahme vor 31.12.",
        ],
        aktiv: !!aktivitaeten.invest,
      });
    }

    // 3) Boni / Tantiemen / GF-Vergütung
    if ((form === "ug" || form === "gmbh" || form === "holding") && boniGesamt > 0) {
      // Boni reduzieren GmbH-Gewinn → KSt+GewSt-Ersparnis
      const ersparnisGmbh = boniGesamt * KSt_GEWST;
      // Privat: ESt auf Bonus
      const steuerPrivat = boniGesamt * estSatz;
      const netErsparnis = ersparnisGmbh - steuerPrivat;
      list.push({
        id: "boni",
        title: "Boni / Tantiemen vor 31.12. zusagen",
        emoji: "💼",
        deadline: "31.12. (Zusage), 30.6. Folgejahr (Auszahlung)",
        description: "Schriftliche Zusage vor 31.12. → Aufwand laufendes Jahr · Auszahlung kann später.",
        ersparnis: Math.max(0, netErsparnis),
        details: [
          `Gesamt-Boni: ${boniGesamt.toLocaleString("de-DE")} €`,
          `KSt+GewSt-Ersparnis: ${Math.round(ersparnisGmbh).toLocaleString("de-DE")} €`,
          `ESt-Last privat: ${Math.round(steuerPrivat).toLocaleString("de-DE")} €`,
          `Netto-Ersparnis: ${Math.round(netErsparnis).toLocaleString("de-DE")} €${netErsparnis < 0 ? " (lohnt nicht bei deinem ESt-Satz!)" : ""}`,
          "Tipp: Tantieme-Vereinbarung schriftlich VOR Wirtschaftsjahres-Ende",
          "Angemessenheits-Prüfung Finanzamt: max ~25 % vom Vorjahres-Gewinn",
        ],
        aktiv: !!aktivitaeten.boni,
      });
    }

    // 4) GF-Pensionszusage einrichten
    if ((form === "ug" || form === "gmbh" || form === "holding") && gewinn >= 100000) {
      const pensionRueckstellung = Math.min(gewinn * 0.2, 50000); // ~20% des Gewinns als Rückstellung
      const ersparnis = pensionRueckstellung * KSt_GEWST;
      list.push({
        id: "pension",
        title: "GF-Pensionszusage einrichten",
        emoji: "🏖️",
        deadline: "31.12.",
        description: "Rückstellung mindert GmbH-Gewinn aktuell. Später als Rente mit Rentner-ESt-Satz versteuert.",
        ersparnis,
        details: [
          `Empfohlene Pensions-Rückstellung: ${pensionRueckstellung.toLocaleString("de-DE")} €/Jahr`,
          `KSt+GewSt-Ersparnis aktuell: ${Math.round(ersparnis).toLocaleString("de-DE")} €/Jahr`,
          "Zusage muss schriftlich vor Wirtschaftsjahres-Ende vereinbart sein",
          "Versicherungsmathematische Bewertung Pflicht — Kosten 500–1.500 €/Jahr",
          "Insolvenzschutz via Pensions-Sicherungsverein",
          "Achtung: Erdienenszeitraum + Angemessenheit (max 75 % letztes Aktivgehalt)",
        ],
        aktiv: !!aktivitaeten.pension,
      });
    }

    // 5) Verlustverrechnung optimieren
    list.push({
      id: "verlust",
      title: "Verlustverrechnung prüfen",
      emoji: "📉",
      deadline: "31.12.",
      description: "Alte Verluste vortragsfähig? Verlustabzug-Beschränkung §10d EStG nutzen.",
      ersparnis: 0,
      details: [
        "Verlustvortrag bis 1 Mio € vollständig nutzbar",
        "Verlustvortrag > 1 Mio €: nur 60 % zusätzlich verrechenbar (Mindestbesteuerung)",
        "Bei GmbH: §8c KStG-Verlustuntergang bei Anteilsverkauf > 50 % beachten",
        "Tipp: vor Geschäftsjahres-Ende prüfen ob Gewinn-/Verlust-Mix zwischen Gesellschaften optimiert werden kann",
      ],
      aktiv: !!aktivitaeten.verlust,
    });

    // 6) OSS-/USt-Voranmeldung-Deadlines Q4
    list.push({
      id: "oss",
      title: "OSS-/USt-VA Q4 + USt-Jahreserklärung",
      emoji: "📋",
      deadline: "10.01. (USt-VA Dez) · 31.07. (Folgejahr USt-JA)",
      description: "Letzte USt-VA + OSS-Q4-Meldung + Jahreserklärung organisieren.",
      ersparnis: 0,
      details: [
        "USt-VA Dezember: bis 10.01. Folgejahr",
        "OSS-Q4-Meldung: bis 31.01. Folgejahr",
        "Dauerfristverlängerung bringt 1 Monat Aufschub",
        "USt-Jahreserklärung: 31.07. (mit StB: 28.02. Folgejahr)",
      ],
      aktiv: !!aktivitaeten.oss,
    });

    // 7) Spendenabzug
    list.push({
      id: "spende",
      title: "Spenden bis 31.12. (max 20 % Gewinn)",
      emoji: "❤️",
      deadline: "31.12.",
      description: "Spenden an gemeinnützige Organisationen mindern steuerlichen Gewinn (§10b EStG / §9 KStG).",
      ersparnis: 0,
      details: [
        "Höchstgrenze: 20 % des steuerlichen Gewinns ODER 4 ‰ Umsatz+Löhne",
        "Bei GmbH: KSt+GewSt-mindernd",
        "Bei Einzel: Sonderausgaben-Abzug",
        "Spendenbescheinigung Pflicht ab 300 € (sonst ggf. Beleg)",
        "Tipp: Krisenzeiten — auch Sachspenden (Inventar) zulässig",
      ],
      aktiv: !!aktivitaeten.spende,
    });

    return list;
  }, [form, gewinn, estSatz, iabBasis, investitionVorziehen, boniGesamt, aktivitaeten]);

  const aktiverHebel = hebel.filter((h) => h.aktiv);
  const totalErsparnis = aktiverHebel.reduce((sum, h) => sum + h.ersparnis, 0);
  const wirklichlichSteuer = baselineSteuer - totalErsparnis;

  const toggleHebel = (id: string) => setAktivitaeten({ ...aktivitaeten, [id]: !aktivitaeten[id] });

  return (
    <CockpitShell
      eyebrow="Pre-Year-End-Check"
      title="7 Steuer-Hebel die du noch ziehen kannst"
      subtitle="Ab November: Was du jetzt noch tun kannst um Steuer für das laufende Jahr zu reduzieren. Mit Live-Berechnung der Ersparnis pro Hebel + 31.12.-Deadlines."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine Situation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <select
              value={form}
              onChange={(e) => setForm(e.target.value as LegalForm)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="einzel">Einzelunternehmen</option>
              <option value="ug">UG</option>
              <option value="gmbh">GmbH</option>
              <option value="holding">GmbH + Holding</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Erwarteter Gewinn (€)</Label>
            <Input
              type="number"
              value={gewinn}
              onChange={(e) => setGewinn(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">ESt-Satz</Label>
            <select
              value={estSatz}
              onChange={(e) => setEstSatz(Number(e.target.value))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={0.14}>14 %</option>
              <option value={0.24}>24 %</option>
              <option value={0.32}>32 %</option>
              <option value={0.42}>42 % (Spitzensatz)</option>
              <option value={0.45}>45 % (Reichensteuer)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Geplante Investition 3 Jahre (IAB)</Label>
            <Input
              type="number"
              value={iabBasis}
              onChange={(e) => setIabBasis(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Investitionen vorziehen (€)</Label>
            <Input
              type="number"
              value={investitionVorziehen}
              onChange={(e) => setInvestitionVorziehen(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Boni / Tantiemen geplant (€)</Label>
            <Input
              type="number"
              value={boniGesamt}
              onChange={(e) => setBoniGesamt(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Steuer ohne Hebel</div>
          <div className="text-xl font-bold">{Math.round(baselineSteuer).toLocaleString("de-DE")} €</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-700 mb-1">
            Mögliche Ersparnis ({aktiverHebel.length} aktive Hebel)
          </div>
          <div className="text-xl font-bold text-emerald-700">
            -{Math.round(totalErsparnis).toLocaleString("de-DE")} €
          </div>
        </div>
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4">
          <div className="text-[10px] uppercase tracking-wider text-accent-blue mb-1">Steuer mit Hebeln</div>
          <div className="text-xl font-bold text-accent-blue">
            {Math.round(wirklichlichSteuer).toLocaleString("de-DE")} €
          </div>
        </div>
      </div>

      {/* Hebel-Liste */}
      <h3 className="text-base font-bold mb-3">7 Hebel — wähle aus was du nutzen willst</h3>
      <div className="space-y-3 mb-6">
        {hebel.map((h) => (
          <div
            key={h.id}
            className={`rounded-2xl border p-4 transition-colors cursor-pointer ${
              h.aktiv ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card hover:border-accent-blue/40"
            }`}
            onClick={() => toggleHebel(h.id)}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-3">
                <div
                  className={`h-6 w-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    h.aktiv ? "bg-emerald-500 border-emerald-500" : "border-border"
                  }`}
                >
                  {h.aktiv && <CheckCircle2 className="h-4 w-4 text-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xl">{h.emoji}</span>
                    <span className="font-bold">{h.title}</span>
                    <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5 text-[10px] inline-flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" /> {h.deadline}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{h.description}</p>
                </div>
              </div>
              {h.ersparnis > 0 && (
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground uppercase">Ersparnis</div>
                  <div className="text-lg font-bold text-emerald-700">
                    {Math.round(h.ersparnis).toLocaleString("de-DE")} €
                  </div>
                </div>
              )}
            </div>
            <details onClick={(e) => e.stopPropagation()} className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-semibold text-foreground">Details ▾</summary>
              <ul className="mt-2 space-y-1 list-disc pl-4">
                {h.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig zum 31.12.:</div>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                IAB, Boni-Zusage, Investitions-Vorzug, Pensions-Rückstellung müssen <strong>vor 31.12.</strong> dokumentiert sein.
              </li>
              <li>Spätestens Mitte November mit StB Termin machen — er hat im Dezember keine Zeit mehr.</li>
              <li>Tatsächliche Lieferung/Inbetriebnahme bei Investitionen entscheidend (nicht Bestelldatum).</li>
              <li>
                Tantieme-Vereinbarungen schriftlich VOR Geschäftsjahres-Ende, sonst nicht aufwandswirksam im
                laufenden Jahr.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default PreYearEndCheck;
