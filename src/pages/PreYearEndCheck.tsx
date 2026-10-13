import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { HebesatzPicker } from "@/components/ui/hebesatz-picker";
import { cn } from "@/lib/utils";
import { Callout, Field, ResultPanel, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";
import {
  Calculator,
  Calendar,
  Check,
  ChevronDown,
  MousePointerClick,
  Package,
  ShoppingCart,
  Briefcase,
  Umbrella,
  TrendingDown,
  ClipboardList,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { progressionESt, ABG_ST, kstGewstRate, holdingRate, SOLZ_RATE, IAB_GEWINN_GRENZE } from "@/lib/germanTax";
import { abzugVorgezogeneInvestition, type InvestArt } from "@/lib/jahresendHebel";

type LegalForm = "einzel" | "ug" | "gmbh" | "holding";

/** Icons je Hebel (ersetzen die Emojis in der Oberfläche). */
const HEBEL_ICON: Record<string, LucideIcon> = {
  iab: Package,
  invest: ShoppingCart,
  boni: Briefcase,
  pension: Umbrella,
  verlust: TrendingDown,
  oss: ClipboardList,
  spende: HeartHandshake,
};

function steuerForm(form: LegalForm, gewinn: number, hebesatz: number): number {
  if (gewinn <= 0) return 0;
  const KSt_GEWST = kstGewstRate(hebesatz);
  const HOLDING_RATE = holdingRate(hebesatz);
  if (form === "einzel") return progressionESt(gewinn) * (1 + SOLZ_RATE);
  if (form === "ug" || form === "gmbh") {
    const stG = gewinn * KSt_GEWST;
    return stG + (gewinn - stG) * ABG_ST;
  }
  const stG = gewinn * KSt_GEWST;
  return stG + (gewinn - stG) * HOLDING_RATE;
}

const PreYearEndCheck = () => {
  const [form, setForm] = useState<LegalForm>("gmbh");
  const [gewinn, setGewinn] = useState(150000);
  const [estSatz, setEstSatz] = useState(0.42);
  const [hebesatz, setHebesatz] = useState(400);
  const [aktivitaeten, setAktivitaeten] = useState<Record<string, boolean>>({});
  const [iabBasis, setIabBasis] = useState(40000);
  const [investitionVorziehen, setInvestitionVorziehen] = useState(15000);
  const [investArt, setInvestArt] = useState<InvestArt>("anlage");
  const [investNd, setInvestNd] = useState(3);
  const [investSonderAfa, setInvestSonderAfa] = useState(true);
  const [boniGesamt, setBoniGesamt] = useState(20000);

  const KSt_GEWST = kstGewstRate(hebesatz);
  const HOLDING_RATE = holdingRate(hebesatz);
  void estSatz;

  const baselineSteuer = useMemo(() => steuerForm(form, gewinn, hebesatz), [form, gewinn, hebesatz]);

  // Hebel-Berechnungen
  const hebel = useMemo(() => {
    const list: { id: string; title: string; emoji: string; deadline: string; description: string; ersparnis: number; details: string[]; aktiv: boolean }[] = [];

    // 1) IAB §7g EStG — mit Voraussetzungs-Check
    // §7g Abs. 1 Satz 2 Nr. 1 EStG (seit JStG 2020): einheitlich Gewinn ≤ 200.000 € für alle Rechtsformen
    const iabBerechtigt = gewinn <= IAB_GEWINN_GRENZE;
    if (gewinn > 0) {
      const iabAbzug = iabBerechtigt ? Math.min(iabBasis * 0.5, 200000) : 0;
      // Einzel: echte Progression — Steuer mit IAB vs ohne IAB
      const ersparnis = form === "einzel"
        ? (progressionESt(gewinn) - progressionESt(Math.max(0, gewinn - iabAbzug))) * (1 + SOLZ_RATE)
        : iabAbzug * KSt_GEWST;
      list.push({
        id: "iab",
        title: iabBerechtigt ? "IAB — Investitionsabzugsbetrag" : "IAB — NICHT berechtigt (Gewinn-Schwelle)",
        emoji: "📦",
        deadline: "31.12.",
        description: iabBerechtigt
          ? "50 % geplanter Investitionen (max 200k €) als Vorab-Abzug — sofort steuerwirksam."
          : "Bei Gewinn vor IAB > 200.000 €/Jahr ist §7g EStG gesperrt (einheitlich für alle Rechtsformen seit JStG 2020).",
        ersparnis,
        details: iabBerechtigt
          ? [
              `Geplante Investition in 3 Jahren: ${iabBasis.toLocaleString("de-DE")} €`,
              `IAB-Abzug 50 %: ${iabAbzug.toLocaleString("de-DE")} €`,
              `Steuer-Ersparnis ${form === "einzel" ? "ESt" : "KSt+GewSt"}: ${Math.round(ersparnis).toLocaleString("de-DE")} €`,
              "Voraussetzung: Investition muss binnen 3 Wirtschaftsjahren erfolgen, sonst rückwirkende Auflösung + Nachzahlungszinsen 0,15 % pro Monat = 1,8 % p.a. (§233a i. V. m. §238 Abs. 1 AO)",
              "Gewinngrenze: Gewinn vor IAB ≤ 200.000 €/Jahr, für Einzelunternehmen, UG und GmbH gleich (§7g Abs. 1 Satz 2 Nr. 1 EStG)",
              "Detail-Tool: → /cockpit/iab-rechner",
            ]
          : [
              `Aktueller Gewinn ${gewinn.toLocaleString("de-DE")} € überschreitet die §7g-Schwelle 200.000 €`,
              "Die Grenze gilt für alle Rechtsformen; die frühere Bilanzsummen-Grenze (235.000 €) ist seit dem JStG 2020 abgeschafft",
              "Auch die Sonder-AfA §7g Abs. 5 (bis 40 % seit 2024) setzt dieselbe Gewinngrenze von 200.000 € voraus",
              "Alternative: Investitionen vorziehen + GWG-Sofortabschreibung",
            ],
        aktiv: !!aktivitaeten.iab,
      });
    }

    // 2) Investitionen vorziehen (Sofortabschreibung GWG bis 800€, 1000€ ab 2024)
    if (investitionVorziehen > 0) {
      // Sofort abziehbar sind nur GWG bis 800 € netto (§6 Abs. 2 EStG). Größere Wirtschaftsgüter:
      // lineare AfA zeitanteilig (Dezember = 1/12, §7 Abs. 1 Satz 4 EStG), Nutzungsdauer 1 Jahr voll (BMF 22.02.2022), optional Sonder-AfA §7g Abs. 5 (40 %).
      const inv = abzugVorgezogeneInvestition({
        betrag: investitionVorziehen, art: investArt, nutzungsdauer: investNd, monate: 1, gewinn, sonderAfa: investSonderAfa,
      });
      const sofortAbschreibung = inv.abzug;
      const ersparnis = form === "einzel"
        ? (progressionESt(gewinn) - progressionESt(Math.max(0, gewinn - sofortAbschreibung))) * (1 + SOLZ_RATE)
        : sofortAbschreibung * KSt_GEWST;
      list.push({
        id: "invest",
        title: "Investitionen vorziehen (vor 31.12.)",
        emoji: "🛒",
        deadline: "31.12.",
        description: "GWG bis 800 € netto sofort abschreiben · größere Investitionen nur mit zeitanteiliger AfA (Dezember = 1/12), Computer/Software mit 1 Jahr Nutzungsdauer voll (BMF 22.02.2022), plus ggf. Sonder-AfA §7g.",
        ersparnis,
        details: [
          `Geplante Investition vorziehen: ${investitionVorziehen.toLocaleString("de-DE")} € (${investArt === "gwg" ? "GWG je Stück ≤ 800 €" : `Nutzungsdauer ${investNd} J., Anschaffung im Dezember`})`,
          investArt === "gwg"
            ? "GWG: 100 % Sofortabschreibung"
            : `AfA Dezember (1/12): ${Math.round(inv.afa).toLocaleString("de-DE")} €${inv.sonderAfa > 0 ? ` + Sonder-AfA §7g Abs. 5 (40 %): ${Math.round(inv.sonderAfa).toLocaleString("de-DE")} €` : ""}`,
          `Gewinnminderung im laufenden Jahr: ${Math.round(inv.abzug).toLocaleString("de-DE")} €`,
          `Steuer-Ersparnis im laufenden Jahr: ${Math.round(ersparnis).toLocaleString("de-DE")} €`,
          investArt === "anlage" && investSonderAfa && !inv.sonderAfaMoeglich
            ? "Sonder-AfA §7g nicht möglich: Gewinn über 200.000 €"
            : "Sonder-AfA §7g: bis 40 %, Gewinngrenze 200.000 €, ≥ 90 % betriebliche Nutzung bis Ende des Folgejahres",
          "Pool-Wahlrecht: 250–1.000 €/Stück → Pool über 5 Jahre abschreiben",
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
          "Angemessenheits-Prüfung Finanzamt (BMF 01.02.2002): max. 50 % des Jahresüberschusses, Gesamtbezüge i. d. R. 75 % fix / 25 % variabel",
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
          "Insolvenzschutz bei beherrschenden Gesellschafter-GF nur über verpfändete Rückdeckungsversicherung (kein PSV, BetrAVG gilt nicht)",
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
  }, [form, gewinn, estSatz, iabBasis, investitionVorziehen, investArt, investNd, investSonderAfa, boniGesamt, aktivitaeten, hebesatz, KSt_GEWST, HOLDING_RATE]);

  const aktiverHebel = hebel.filter((h) => h.aktiv);
  const totalErsparnis = aktiverHebel.reduce((sum, h) => sum + h.ersparnis, 0);
  // Steuer kann nicht negativ werden (Hebel-Ersparnis ist gegenüber Baseline gedeckelt).
  const tatsaechlicheSteuer = Math.max(0, baselineSteuer - totalErsparnis);

  const toggleHebel = (id: string) => setAktivitaeten({ ...aktivitaeten, [id]: !aktivitaeten[id] });

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;

  return (
    <CockpitShell
      eyebrow="Steuern & Optimierung · Jahresende"
      title="7 Steuer-Hebel, die du vor dem 31.12. noch ziehen kannst"
      subtitle="Ab November zählt jede Woche: Was du jetzt noch tun kannst, um die Steuer für das laufende Jahr zu senken. Mit Live-Berechnung der Ersparnis je Hebel und den Fristen zum Jahresende."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <ToolSection title="Deine Situation" icon={Calculator}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Rechtsform" htmlFor="pye-form">
                <select id="pye-form" value={form} onChange={(e) => setForm(e.target.value as LegalForm)} className={selectCls}>
                  <option value="einzel">Einzelunternehmen</option>
                  <option value="ug">UG</option>
                  <option value="gmbh">GmbH</option>
                  <option value="holding">GmbH + Holding</option>
                </select>
              </Field>
              <Field label="Erwarteter Gewinn (€)" htmlFor="pye-gewinn">
                <Input
                  id="pye-gewinn"
                  type="number"
                  value={gewinn}
                  onChange={(e) => setGewinn(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
              <Field
                label="Einkommensteuersatz"
                htmlFor="pye-est"
                hint="Für Einzelunternehmen rechnet das Tool mit echter Progression; der Wert dient dort nur zur Info."
              >
                <select id="pye-est" value={estSatz} onChange={(e) => setEstSatz(Number(e.target.value))} className={selectCls}>
                  <option value={0.14}>14 %</option>
                  <option value={0.24}>24 %</option>
                  <option value={0.32}>32 %</option>
                  <option value={0.42}>42 % (Spitzensatz)</option>
                  <option value={0.45}>45 % (Reichensteuer)</option>
                </select>
              </Field>
              <Field label="Gewerbesteuer-Hebesatz der Gemeinde (%)">
                <HebesatzPicker value={hebesatz} onChange={setHebesatz} />
              </Field>
              <Field label="Geplante Investitionen in 3 Jahren (€)" htmlFor="pye-iab" hint="Basis für den Investitionsabzugsbetrag (IAB)">
                <Input
                  id="pye-iab"
                  type="number"
                  value={iabBasis}
                  onChange={(e) => setIabBasis(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
              <Field label="Investitionen vorziehen (€)" htmlFor="pye-invest">
                <Input
                  id="pye-invest"
                  type="number"
                  value={investitionVorziehen}
                  onChange={(e) => setInvestitionVorziehen(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
              <Field label="Art der Investition" htmlFor="pye-invest-art">
                <select id="pye-invest-art" value={investArt} onChange={(e) => setInvestArt(e.target.value as InvestArt)} className={selectCls}>
                  <option value="gwg">GWG (je Stück bis 800 € netto, sofort absetzbar)</option>
                  <option value="anlage">Anlagegut über 800 € (AfA)</option>
                </select>
              </Field>
              {investArt === "anlage" && (
                <>
                  <Field label="Nutzungsdauer (Jahre)" htmlFor="pye-invest-nd" hint="Laut AfA-Tabelle, z. B. Computer 1 Jahr, Pkw 6, Büromöbel 13">
                    <Input
                      id="pye-invest-nd"
                      type="number"
                      value={investNd}
                      onChange={(e) => setInvestNd(Math.max(1, Number(e.target.value) || 1))}
                      className="tabular"
                    />
                  </Field>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={investSonderAfa} onChange={(e) => setInvestSonderAfa(e.target.checked)} />
                    Sonder-AfA §7g Abs. 5 (40 %) nutzen
                  </label>
                </>
              )}
              <Field label="Geplante Boni oder Tantiemen (€)" htmlFor="pye-boni" className="sm:col-span-2">
                <Input
                  id="pye-boni"
                  type="number"
                  value={boniGesamt}
                  onChange={(e) => setBoniGesamt(Math.max(0, Number(e.target.value) || 0))}
                  className="tabular"
                />
              </Field>
            </div>
          </ToolSection>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Steuer mit Hebeln"
              title={
                aktiverHebel.length === 0
                  ? "Noch kein Hebel ausgewählt"
                  : `${aktiverHebel.length} Hebel aktiv`
              }
              value={eur(tatsaechlicheSteuer)}
              valueHint="voraussichtliche Steuer für das laufende Jahr"
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Steuer ohne Hebel", v: eur(baselineSteuer) },
                  { l: "Mögliche Ersparnis", v: totalErsparnis > 0 ? `−${eur(totalErsparnis)}` : eur(0) },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>
            <Callout tone="info" icon={MousePointerClick}>
              Wähle unten die Hebel aus, die du nutzen willst. Die Ersparnis wird sofort eingerechnet.
            </Callout>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-tight">Hebel auswählen</h2>
        <p className="text-sm text-muted-foreground tabular">
          {aktiverHebel.length} von {hebel.length} ausgewählt
        </p>
      </div>
      <div className="mb-8 space-y-3">
        {hebel.map((h) => {
          const Icon = HEBEL_ICON[h.id] ?? Calculator;
          return (
            <article
              key={h.id}
              className={cn(
                "rounded-2xl border bg-card shadow-card transition-[border-color,box-shadow] duration-200",
                h.aktiv ? "border-success/40 shadow-[0_0_0_3px_hsl(var(--success)/0.1)]" : "border-border hover:border-foreground/20",
              )}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={h.aktiv}
                onClick={() => toggleHebel(h.id)}
                className="flex w-full items-start gap-3 p-4 text-left md:p-5"
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                    h.aktiv ? "border-success bg-success text-primary-foreground" : "border-input bg-card",
                  )}
                >
                  {h.aktiv && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </span>
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue sm:flex">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug">{h.title.replace(" — ", ": ")}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{h.description}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" aria-hidden="true" /> Frist {h.deadline}
                  </span>
                </span>
                {h.ersparnis > 0 && (
                  <span className="shrink-0 text-right">
                    <span className="block text-xs text-muted-foreground">Ersparnis</span>
                    <span className="block text-lg font-semibold text-success tabular">{eur(h.ersparnis)}</span>
                  </span>
                )}
              </button>
              <details className="group border-t border-border/70 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-1 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground md:px-5">
                  Details und Voraussetzungen
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="list-disc space-y-1 px-4 pb-4 pl-8 text-sm leading-relaxed text-muted-foreground md:px-5 md:pl-9">
                  {h.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </details>
            </article>
          );
        })}
      </div>

      <Callout tone="warning" title="Wichtig zum 31.12." className="mb-6">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            IAB, Bonus-Zusage, vorgezogene Investitionen und Pensionsrückstellung müssen <strong>vor dem 31.12.</strong>{" "}
            dokumentiert sein.
          </li>
          <li>Spätestens Mitte November einen Termin mit der Steuerberatung machen, im Dezember wird es knapp.</li>
          <li>Bei Investitionen zählt die tatsächliche Lieferung und Inbetriebnahme, nicht das Bestelldatum.</li>
          <li>Tantieme-Vereinbarungen schriftlich vor Ende des Geschäftsjahres, sonst kein Aufwand im laufenden Jahr.</li>
        </ul>
      </Callout>

      <Stand2026Footer
        sources={[
          { label: "§7g EStG (IAB)", url: "https://www.gesetze-im-internet.de/estg/__7g.html" },
          { label: "§6 EStG (GWG)", url: "https://www.gesetze-im-internet.de/estg/__6.html" },
          { label: "§10d EStG (Verlustabzug)", url: "https://www.gesetze-im-internet.de/estg/__10d.html" },
          { label: "§37 EStG (Vorauszahlung)", url: "https://www.gesetze-im-internet.de/estg/__37.html" },
        ]}
        note="Hebel-Empfehlungen sind nicht abschließend — abhängig von individueller Situation (Branche, Bilanz, Vorjahr). Vor Aktivierung mit StB durchsprechen."
      />
    </CockpitShell>
  );
};

export default PreYearEndCheck;
