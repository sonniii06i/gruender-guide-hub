import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

type Country =
  | "estland"
  | "niederlande"
  | "luxembourg"
  | "irland"
  | "zypern"
  | "malta"
  | "schweiz"
  | "oesterreich"
  | "polen"
  | "litauen"
  | "bulgarien"
  | "tschechien";

const COUNTRY_LABELS: Record<Country, { flag: string; name: string; baseTaxRate: number; atadRisk: "high" | "medium" | "low" }> = {
  estland: { flag: "🇪🇪", name: "Estland (OÜ)", baseTaxRate: 0, atadRisk: "high" },
  niederlande: { flag: "🇳🇱", name: "Niederlande (BV)", baseTaxRate: 19, atadRisk: "medium" },
  luxembourg: { flag: "🇱🇺", name: "Luxembourg (Soparfi/SPF)", baseTaxRate: 24.94, atadRisk: "medium" },
  irland: { flag: "🇮🇪", name: "Irland (Ltd)", baseTaxRate: 12.5, atadRisk: "high" },
  zypern: { flag: "🇨🇾", name: "Zypern (Ltd)", baseTaxRate: 12.5, atadRisk: "high" },
  malta: { flag: "🇲🇹", name: "Malta (Ltd, eff. 5%)", baseTaxRate: 5, atadRisk: "high" },
  schweiz: { flag: "🇨🇭", name: "Schweiz (GmbH/AG)", baseTaxRate: 11.9, atadRisk: "high" },
  oesterreich: { flag: "🇦🇹", name: "Österreich (FlexCo)", baseTaxRate: 23, atadRisk: "low" },
  polen: { flag: "🇵🇱", name: "Polen (Sp. z o.o.)", baseTaxRate: 9, atadRisk: "high" },
  litauen: { flag: "🇱🇹", name: "Litauen (UAB)", baseTaxRate: 5, atadRisk: "high" },
  bulgarien: { flag: "🇧🇬", name: "Bulgarien (EOOD)", baseTaxRate: 10, atadRisk: "high" },
  tschechien: { flag: "🇨🇿", name: "Tschechien (s.r.o.)", baseTaxRate: 21, atadRisk: "low" },
};

const SubstanceChecker = () => {
  const [country, setCountry] = useState<Country>("estland");
  const [gfWohnsitz, setGfWohnsitz] = useState<"de" | "auslandLand" | "drittland">("de");
  const [lokaleMitarbeiter, setLokaleMitarbeiter] = useState(0);
  const [eigenesBuero, setEigenesBuero] = useState<"none" | "coworking" | "office">("none");
  const [geschaeftsleitungVorOrt, setGeschaeftsleitungVorOrt] = useState(false);
  const [aktivitaetsArt, setAktivitaetsArt] = useState<"aktiv" | "passive">("aktiv");
  const [umsatzVorOrt, setUmsatzVorOrt] = useState(0);
  const [umsatzGesamt, setUmsatzGesamt] = useState(100);
  const [bankkontoLokal, setBankkontoLokal] = useState(false);
  const [steuerHoeher25, setSteuerHoeher25] = useState(false);

  const countryInfo = COUNTRY_LABELS[country];

  const result = useMemo(() => {
    let score = 0;
    const reasons: string[] = [];
    const empfehlungen: string[] = [];

    // GF-Wohnsitz: kritisch
    if (gfWohnsitz === "de") {
      score += 35;
      reasons.push("**Geschäftsführer wohnt in DE** → BMF kann Sitz nach DE umqualifizieren (§10 AO)");
      empfehlungen.push("GF mit Wohnsitz im Ziel-Land oder zumindest EU/EWR engagieren");
    } else if (gfWohnsitz === "auslandLand") {
      score -= 15;
      reasons.push("✓ GF wohnt im Ziel-Land — gute Substanz");
    } else {
      score += 10;
      reasons.push("GF wohnt in Drittland — neutral");
    }

    // Lokale Mitarbeiter
    if (lokaleMitarbeiter === 0) {
      score += 25;
      reasons.push("**Keine lokalen Mitarbeiter** → klassisches Mailbox-Indiz");
      empfehlungen.push("Mind. 1 lokaler Mitarbeiter (auch Teilzeit / Service-Provider mit echtem Arbeitsverhältnis)");
    } else if (lokaleMitarbeiter >= 3) {
      score -= 20;
      reasons.push(`✓ ${lokaleMitarbeiter} lokale Mitarbeiter — solide Substanz`);
    } else {
      score += 5;
      reasons.push(`${lokaleMitarbeiter} lokale Mitarbeiter — minimal aber vorhanden`);
    }

    // Büro
    if (eigenesBuero === "none") {
      score += 20;
      reasons.push("**Kein eigenes Büro / nur Briefkasten-Adresse** → klares ATAD-Indiz");
      empfehlungen.push("Mind. Coworking-Vertrag mit eigener Tür/Schreibtisch + Schlüssel");
    } else if (eigenesBuero === "coworking") {
      score += 5;
      reasons.push("Coworking — akzeptabel aber nicht ideal");
    } else {
      score -= 15;
      reasons.push("✓ Eigenes Büro — gute Substanz");
    }

    // Geschäftsleitung
    if (!geschaeftsleitungVorOrt) {
      score += 25;
      reasons.push(
        "**Geschäftsleitung NICHT vor Ort** → §10 AO: Sitz richtet sich nach Ort der tatsächlichen Geschäftsleitung",
      );
      empfehlungen.push("Geschäfts-Entscheidungen vor Ort treffen (Board Meetings, Verträge unterschreiben dort)");
    } else {
      score -= 20;
      reasons.push("✓ Geschäftsleitung tatsächlich vor Ort");
    }

    // Aktive vs. passive Einkünfte
    if (aktivitaetsArt === "passive") {
      score += 30;
      reasons.push(
        "**Passive Einkünfte (Lizenz, Zinsen, Dividenden, Mieten)** → §AStG Hinzurechnungsbesteuerung greift schneller",
      );
      empfehlungen.push("Wenn passiv: nur sinnvoll wenn lokale Steuer ≥ 25 % oder mit klarer Substanz");
    } else {
      score -= 10;
      reasons.push("✓ Aktive Geschäftstätigkeit (Handel, Dienstleistung, Produktion)");
    }

    // Lokaler Umsatz
    const umsatzAnteilLokal = umsatzGesamt > 0 ? umsatzVorOrt / umsatzGesamt : 0;
    if (umsatzAnteilLokal < 0.1) {
      score += 15;
      reasons.push(
        `**Nur ${(umsatzAnteilLokal * 100).toFixed(0)} % Umsatz vor Ort** → schwach für Substanz-Argument`,
      );
      empfehlungen.push("Echten lokalen Markt entwickeln (B2B-Kunden vor Ort, lokale Verträge)");
    } else if (umsatzAnteilLokal >= 0.3) {
      score -= 15;
      reasons.push(`✓ ${(umsatzAnteilLokal * 100).toFixed(0)} % Umsatz vor Ort — solider lokaler Markt`);
    }

    // Bankkonto
    if (!bankkontoLokal) {
      score += 8;
      reasons.push("Kein lokales Bankkonto — schwächt Substanz-Argument");
    } else {
      reasons.push("✓ Lokales Bankkonto vorhanden");
    }

    // Steuersatz
    if (!steuerHoeher25) {
      score += 15;
      reasons.push(
        `**Lokaler Steuersatz ${countryInfo.baseTaxRate} % < 25 %** → §AStG-Hinzurechnungsschwelle erreicht`,
      );
    } else {
      score -= 10;
      reasons.push("✓ Lokaler Steuersatz ≥ 25 % — §AStG nicht anwendbar");
    }

    // ATAD-Risk-Modifier basierend auf Land
    if (countryInfo.atadRisk === "high") {
      score += 10;
      reasons.push(`Land "${countryInfo.name}" steht auf BMF-Hochrisiko-Liste — strengere Substanz-Prüfung`);
    } else if (countryInfo.atadRisk === "low") {
      score -= 5;
      reasons.push(`Land "${countryInfo.name}" hat unkritischen Compliance-Status`);
    }

    score = Math.max(0, Math.min(100, score));

    let category: "low" | "medium" | "high" | "critical";
    if (score < 25) category = "low";
    else if (score < 50) category = "medium";
    else if (score < 75) category = "high";
    else category = "critical";

    return { score, category, reasons, empfehlungen };
  }, [
    country,
    gfWohnsitz,
    lokaleMitarbeiter,
    eigenesBuero,
    geschaeftsleitungVorOrt,
    aktivitaetsArt,
    umsatzVorOrt,
    umsatzGesamt,
    bankkontoLokal,
    steuerHoeher25,
    countryInfo,
  ]);

  const categoryColor = {
    low: "border-emerald-500/40 bg-emerald-500/5",
    medium: "border-amber-500/40 bg-amber-500/5",
    high: "border-orange-500/40 bg-orange-500/5",
    critical: "border-red-500/40 bg-red-500/5",
  }[result.category];

  const categoryLabel = {
    low: "Niedrig — Substanz solide",
    medium: "Mittel — Verbesserung empfohlen",
    high: "Hoch — Setup riskant",
    critical: "Kritisch — sehr wahrscheinlich Mailbox-Klassifizierung",
  }[result.category];

  const categoryIcon = {
    low: <CheckCircle2 className="h-6 w-6 text-emerald-700" />,
    medium: <AlertCircle className="h-6 w-6 text-amber-700" />,
    high: <AlertTriangle className="h-6 w-6 text-orange-700" />,
    critical: <XCircle className="h-6 w-6 text-red-700" />,
  }[result.category];

  return (
    <CockpitShell
      eyebrow="Substance-Checker"
      title="ATAD III / §AStG Mailbox-Risiko-Score"
      subtitle="Live-Bewertung deiner Auslandsgesellschaft auf Substanz-Anforderungen. Niedrig = sauber. Hoch = BMF kann Sitz umqualifizieren oder Hinzurechnung anwenden."
    >
      {/* Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-accent-blue" />
          <h3 className="font-bold text-sm">Deine Auslandsgesellschaft</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Land</Label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {Object.entries(COUNTRY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.flag} {v.name} ({v.baseTaxRate} % CIT)
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">GF-Wohnsitz</Label>
            <select
              value={gfWohnsitz}
              onChange={(e) => setGfWohnsitz(e.target.value as typeof gfWohnsitz)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="de">DE — Wohnsitz Deutschland</option>
              <option value="auslandLand">{countryInfo.flag} im Ziel-Land</option>
              <option value="drittland">Drittland (z.B. Dubai, Andorra)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Lokale Mitarbeiter</Label>
            <Input
              type="number"
              min={0}
              value={lokaleMitarbeiter}
              onChange={(e) => setLokaleMitarbeiter(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Büro-Setup</Label>
            <select
              value={eigenesBuero}
              onChange={(e) => setEigenesBuero(e.target.value as typeof eigenesBuero)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="none">Nur Briefkasten / Service-Provider-Adresse</option>
              <option value="coworking">Coworking-Vertrag</option>
              <option value="office">Eigenes Büro</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Tatsächliche Geschäftsleitung vor Ort?
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setGeschaeftsleitungVorOrt(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    geschaeftsleitungVorOrt === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Hauptaktivität (Einkünfte-Art)
            </Label>
            <select
              value={aktivitaetsArt}
              onChange={(e) => setAktivitaetsArt(e.target.value as typeof aktivitaetsArt)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="aktiv">Aktiv (Handel, Service, Produktion)</option>
              <option value="passive">Passiv (Lizenz, Zinsen, Dividenden, Mieten)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz vor Ort (k €)</Label>
            <Input
              type="number"
              min={0}
              value={umsatzVorOrt}
              onChange={(e) => setUmsatzVorOrt(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Umsatz gesamt (k €)</Label>
            <Input
              type="number"
              min={1}
              value={umsatzGesamt}
              onChange={(e) => setUmsatzGesamt(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Lokales Bankkonto?</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setBankkontoLokal(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    bankkontoLokal === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Lokaler Steuersatz ≥ 25 %?
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {[
                { v: true, l: "Ja" },
                { v: false, l: "Nein" },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  onClick={() => setSteuerHoeher25(o.v)}
                  className={`rounded-md border h-10 text-sm transition-colors ${
                    steuerHoeher25 === o.v
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              Aktueller Land-Satz: {countryInfo.baseTaxRate} %
            </div>
          </div>
        </div>
      </div>

      {/* Score-Display */}
      <div className={`rounded-2xl border-2 p-6 mb-6 ${categoryColor}`}>
        <div className="flex items-center gap-3 mb-3">
          {categoryIcon}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Mailbox-Risiko</div>
            <div className="text-2xl font-bold">{categoryLabel}</div>
          </div>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <div className="text-5xl font-bold">{result.score}</div>
          <div className="text-sm text-muted-foreground pb-2">/ 100 Risiko-Score</div>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${
              result.category === "low"
                ? "bg-emerald-500"
                : result.category === "medium"
                ? "bg-amber-500"
                : result.category === "high"
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {/* Reasons */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Bewertungs-Faktoren</h3>
        <ul className="space-y-2 text-sm">
          {result.reasons.map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
              dangerouslySetInnerHTML={{
                __html: `<span class="text-muted-foreground">·</span><span>${r.replace(
                  /\*\*([^*]+)\*\*/g,
                  "<strong>$1</strong>",
                )}</span>`,
              }}
            />
          ))}
        </ul>
      </div>

      {/* Empfehlungen */}
      {result.empfehlungen.length > 0 && (
        <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
          <h3 className="font-bold text-sm mb-3">Was du verbessern solltest</h3>
          <ul className="space-y-2 text-sm">
            {result.empfehlungen.map((e, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed">
        <strong>Wichtige Hintergründe:</strong>
        <ul className="list-disc pl-4 space-y-1 mt-2 text-muted-foreground">
          <li>
            <strong>§10 AO</strong>: Ort der Geschäftsleitung bestimmt Steuer-Sitz. Mailbox in LU mit GF in DE →
            BMF qualifiziert nach DE um.
          </li>
          <li>
            <strong>§AStG §7-14</strong>: Hinzurechnungsbesteuerung bei DE-Wohnsitz + Beherrschung über 50 % +
            niedrigere Besteuerung (unter 25 %) + passive Einkünfte → DE rechnet zu eigenen Gewinnen hinzu.
          </li>
          <li>
            <strong>ATAD III seit 2024</strong>: EU-weiter Substance-Test. Mailbox-Companies werden EU-weit
            durchschaut. Mind. ein qualifizierter Mitarbeiter + eigene Räume + lokale Geschäftsleitung Pflicht.
          </li>
          <li>
            <strong>Pillar 2 OECD</strong>: 15 % Mindeststeuer für Konzerne &gt; 750 Mio Umsatz — kleinere KMUs
            unbetroffen.
          </li>
          <li>
            <strong>§6 AStG (Wegzugsbesteuerung)</strong>: bei Wegzug aus DE mit GmbH-Anteilen &gt; 1 % → Anteile
            gelten als verkauft mit Stundungs-Möglichkeit (EU-EWR) bzw. sofortiger Besteuerung (Drittland).
          </li>
          <li>
            <strong>Disclaimer</strong>: Score ist Heuristik, kein Steuer-Bescheid. Bei kommerziellem Setup
            zwingend StB + Fachanwalt für internationales Steuerrecht konsultieren.
          </li>
        </ul>
      </div>
    </CockpitShell>
  );
};

export default SubstanceChecker;
