import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Tag, ExternalLink, Calculator, CheckCircle2, Sparkles } from "lucide-react";

type Scope = "dpma" | "euipo" | "wipo";

const SCOPE_LABEL: Record<Scope, string> = {
  dpma: "DPMA (nur Deutschland)",
  euipo: "EUIPO (alle 27 EU-Staaten)",
  wipo: "WIPO Madrid (international)",
};

const SCOPE_BASEFEE: Record<Scope, number> = {
  dpma: 290,
  euipo: 850,
  wipo: 653, // CHF, vereinfacht als € hier dargestellt
};

// DPMA: 100€ je Klasse ab 4. Klasse (3 inkl.). WIPO: ~100 CHF Designation je Klasse je Land — sehr vereinfacht.
// EUIPO: 2. Klasse 50€, ab 3. Klasse je 150€.
const SCOPE_EXTRA: Record<Scope, number> = {
  dpma: 100,
  euipo: 50, // legacy flat — wird via extraFee() überschrieben für EUIPO-Staffel
  wipo: 100,
};

/** Korrekt gestaffelte Extra-Gebühren je Scope (Klassen-Anzahl insgesamt). */
const extraFee = (scope: Scope, totalClasses: number): number => {
  if (scope === "euipo") {
    // 1 inkl., 2. Klasse 50€, ab 3. Klasse 150€ je
    if (totalClasses <= 1) return 0;
    if (totalClasses === 2) return 50;
    return 50 + (totalClasses - 2) * 150;
  }
  if (scope === "dpma") {
    return Math.max(0, totalClasses - 3) * 100;
  }
  // wipo
  return Math.max(0, totalClasses - 1) * 100;
};

const NIZZA_CLASSES: { id: number; label: string; useCases: string[]; popular?: boolean }[] = [
  { id: 3, label: "Kosmetik, Pflege, Düfte, Reinigung", useCases: ["D2C-Beauty", "Kosmetik-Brand", "Düfte", "Seifen"], popular: true },
  { id: 5, label: "Pharma, NEM, Medizinprodukte", useCases: ["Supplements", "Vitamine", "Medizinprodukte Klasse I"], popular: true },
  { id: 9, label: "Elektronik, Software, Apps", useCases: ["SaaS", "Mobile App", "Wearables", "Audio-Gadgets"], popular: true },
  { id: 14, label: "Schmuck, Uhren, Edelmetalle", useCases: ["Schmuck-Brand", "Watches"] },
  { id: 18, label: "Lederwaren, Taschen, Reisegepäck", useCases: ["Taschen-Brand", "Wallets", "Backpacks"] },
  { id: 25, label: "Bekleidung, Schuhe, Kopfbedeckungen", useCases: ["Streetwear", "Athleisure", "Sneaker"], popular: true },
  { id: 28, label: "Spielzeug, Sportartikel, Fitness-Geräte", useCases: ["Toys", "Sport-Equipment", "Fitness"] },
  { id: 30, label: "Kaffee, Tee, Snacks, Süßwaren", useCases: ["Coffee-Brand", "Snacks", "Süßwaren"] },
  { id: 32, label: "Erfrischungsgetränke, Säfte, Energy Drinks", useCases: ["Energy Drink", "Soft Drinks"] },
  { id: 35, label: "Werbung, Geschäftsführung, Online-Marketplace", useCases: ["Marketing-Agentur", "Online-Shop-Betrieb", "Affiliate"], popular: true },
  { id: 36, label: "Finanz, Versicherungen, Immobilien", useCases: ["Finanz-Tool", "Insurtech", "Immobilien-Plattform"] },
  { id: 38, label: "Telekommunikation, Streaming-Dienste", useCases: ["Streaming-Service", "Messaging-App"] },
  { id: 41, label: "Erziehung, Ausbildung, Unterhaltung", useCases: ["Online-Kurse", "Coaching", "YouTube-Channel-Brand", "Podcast"], popular: true },
  { id: 42, label: "Software-Entwicklung, IT-Beratung, Wissenschaftliche Dienste", useCases: ["SaaS-as-Service", "Tech-Agentur", "AI-Tool"], popular: true },
  { id: 43, label: "Verpflegung, Hotels, Cafés", useCases: ["Restaurant-Brand", "Café", "Hotel"] },
  { id: 44, label: "Schönheits- und Gesundheitspflege (Salon, Klinik)", useCases: ["Beauty-Salon", "Klinik", "Spa"] },
  { id: 45, label: "Rechtsberatung, Online-Dating, Sozialdienste", useCases: ["Legal-Tech", "Dating-App", "Social-Network"] },
];

// Branchen-Empfehlungs-Map: Stichwort → Klassen
const BRANCH_PRESETS: { keyword: string; classes: number[]; label: string }[] = [
  { keyword: "kosmetik", classes: [3, 35], label: "Kosmetik / Beauty D2C" },
  { keyword: "supplement", classes: [5, 35], label: "Supplements / NEM" },
  { keyword: "saas", classes: [9, 42], label: "SaaS / Software-Tool" },
  { keyword: "app", classes: [9, 38, 42], label: "Mobile App" },
  { keyword: "kleidung", classes: [25, 35], label: "Kleidung / Streetwear" },
  { keyword: "fashion", classes: [25, 35], label: "Fashion-Brand" },
  { keyword: "schmuck", classes: [14, 35], label: "Schmuck-Brand" },
  { keyword: "lebensmittel", classes: [29, 30, 32, 35], label: "Food-Brand" },
  { keyword: "drink", classes: [32, 35], label: "Drink-Brand" },
  { keyword: "kaffee", classes: [30, 35, 43], label: "Coffee-Brand" },
  { keyword: "course", classes: [41], label: "Online-Kurse" },
  { keyword: "kurs", classes: [41], label: "Online-Kurse" },
  { keyword: "coaching", classes: [41], label: "Coaching" },
  { keyword: "agentur", classes: [35, 42], label: "Agentur" },
  { keyword: "elektronik", classes: [9, 35], label: "Elektronik / Hardware" },
  { keyword: "wearable", classes: [9, 14, 25], label: "Wearable" },
  { keyword: "restaurant", classes: [43], label: "Restaurant / Café" },
];

const MarkenWizard = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [scope, setScope] = useState<Scope>("dpma");
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [branchInput, setBranchInput] = useState("");

  const baseClasses = scope === "dpma" ? 3 : 1;
  const extraClasses = Math.max(0, selectedClasses.length - baseClasses);
  const totalCost = SCOPE_BASEFEE[scope] + extraFee(scope, selectedClasses.length);

  const recommendedClasses = useMemo(() => {
    const q = branchInput.toLowerCase();
    if (!q.trim()) return [];
    const matches = BRANCH_PRESETS.filter((p) => q.includes(p.keyword));
    if (matches.length === 0) return [];
    const all = new Set<number>();
    matches.forEach((m) => m.classes.forEach((c) => all.add(c)));
    return Array.from(all).sort((a, b) => a - b);
  }, [branchInput]);

  const toggleClass = (id: number) => {
    setSelectedClasses((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const applyRecommended = () => setSelectedClasses(recommendedClasses);

  const dpmaSearchUrl = `https://register.dpma.de/DPMAregister/marke/trefferliste?queryString=${encodeURIComponent(name)}`;
  const euipoSearchUrl = `https://euipo.europa.eu/eSearch/#advanced/trademarks/1/100/n1=MarkVerbalElementText&v1=${encodeURIComponent(name)}&o1=AND`;
  const tmviewSearchUrl = `https://www.tmdn.org/tmview/#/tmview/results?text=${encodeURIComponent(name)}`;

  return (
    <CockpitShell
      eyebrow="Marken-Wizard"
      title="DPMA-Anmeldungs-Wizard mit Klassen-Empfehlung"
      subtitle="Schritt-für-Schritt zur Marken-Anmeldung: Schutzbereich, Nizza-Klassen, Recherche, Kosten-Vorschau, Direkt-Link zur offiziellen Anmeldung."
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                s < step
                  ? "bg-emerald-500 text-white"
                  : s === step
                  ? "bg-accent-blue text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
            </div>
            {s < 4 && <div className={`h-0.5 flex-1 ${s < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Markenname */}
      {step === 1 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-1">1. Markenname festlegen</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Welche Marke willst du anmelden? Tipp: vorab den Live-Check laufen lassen, damit du nicht in einen
            bestehenden Konflikt rennst.
          </p>
          <Label htmlFor="mw-name" className="text-xs uppercase tracking-wider text-muted-foreground">
            Marken-/Wortzeichen
          </Label>
          <Input
            id="mw-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Cerise, KreyaTec, NaturaPlus"
            className="mt-1 mb-4"
            autoFocus
          />
          <Link
            to={`/cockpit/check?q=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-1 text-xs text-accent-blue hover:underline mb-4"
          >
            → Erst Live-Check laufen lassen <ExternalLink className="h-3 w-3" />
          </Link>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setStep(2)}
              disabled={name.trim().length < 2}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Schutzbereich */}
      {step === 2 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-1">2. Schutzbereich wählen</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Wo soll deine Marke geschützt sein? Faustregel: nur DACH → DPMA. EU-weiter Verkauf → EUIPO. US/Asia
            geplant → WIPO Madrid.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {(["dpma", "euipo", "wipo"] as Scope[]).map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  scope === s ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30" : "border-border hover:border-accent-blue/40"
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-1">
                  {s === "dpma" ? "Nur DE" : s === "euipo" ? "EU-weit" : "International"}
                </div>
                <div className="font-bold text-sm mb-1">{SCOPE_LABEL[s]}</div>
                <div className="text-xs text-muted-foreground">
                  Grundgebühr: {SCOPE_BASEFEE[s]} {s === "wipo" ? "CHF" : "€"} (
                  {s === "dpma" ? "3 Klassen inkl." : "1 Klasse inkl."}) ·{" "}
                  {s === "euipo"
                    ? "2. Klasse +50 €, ab 3. Klasse +150 €"
                    : `+${SCOPE_EXTRA[s]} ${s === "wipo" ? "CHF" : "€"} pro weitere Klasse`}
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>
            <button onClick={() => setStep(3)} className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90">
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Nizza-Klassen */}
      {step === 3 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-1">3. Nizza-Klassen wählen</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Markenschutz gilt nur für die Klassen die du auswählst. Tipp: lieber 1 zu wenig als 1 zu viel — nach 5
            Jahren benutzungspflichtig.
          </p>

          {/* Branch-Empfehlung */}
          <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent-blue" />
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Branche / Tätigkeit</Label>
            </div>
            <Input
              value={branchInput}
              onChange={(e) => setBranchInput(e.target.value)}
              placeholder="z.B. Kosmetik, SaaS, Streetwear, Coffee, Coaching"
              className="mb-2"
            />
            {recommendedClasses.length > 0 && (
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-muted-foreground">
                  Empfohlene Klassen: <strong>{recommendedClasses.join(", ")}</strong>
                </div>
                <button
                  onClick={applyRecommended}
                  className="rounded-full bg-accent-blue text-primary-foreground px-3 py-1 text-[11px] font-semibold hover:opacity-90"
                >
                  Übernehmen
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 max-h-[400px] overflow-y-auto pr-2">
            {NIZZA_CLASSES.map((c) => {
              const checked = selectedClasses.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleClass(c.id)}
                  className={`text-left rounded-xl border p-3 transition-colors ${
                    checked
                      ? "border-accent-blue bg-accent-blue/5 ring-1 ring-accent-blue/30"
                      : "border-border hover:border-accent-blue/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="font-bold text-sm">
                      Klasse {c.id} {c.popular && <span className="text-[10px] text-accent-blue ml-1">populär</span>}
                    </div>
                    {checked && <CheckCircle2 className="h-4 w-4 text-accent-blue" />}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
                  <div className="text-[10px] text-muted-foreground italic line-clamp-2">{c.useCases.join(" · ")}</div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl bg-secondary/40 p-3 mb-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{selectedClasses.length} Klassen ausgewählt</span>
              <span className="font-mono">{selectedClasses.sort((a, b) => a - b).join(", ") || "keine"}</span>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={selectedClasses.length === 0}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Übersicht + Anmeldung */}
      {step === 4 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-1">4. Übersicht + Anmelden</h2>
          <p className="text-sm text-muted-foreground mb-4">Final-Check + Direkt-Links zu offizieller Anmeldung.</p>

          <div className="rounded-xl bg-secondary/40 p-4 mb-4 space-y-2 text-sm">
            <Row label="Marke" value={name} />
            <Row label="Schutzbereich" value={SCOPE_LABEL[scope]} />
            <Row label="Klassen" value={selectedClasses.sort((a, b) => a - b).join(", ")} />
            <Row label="Anzahl Klassen" value={String(selectedClasses.length)} />
            <Row label="Davon im Grundpreis" value={`${baseClasses} · ${extraClasses} extra`} />
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-emerald-700" />
              <span className="font-bold">Geschätzte Gebühr</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {totalCost} {scope === "wipo" ? "CHF" : "€"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Grundgebühr {SCOPE_BASEFEE[scope]} {scope === "wipo" ? "CHF" : "€"} ({baseClasses} Klasse{baseClasses > 1 ? "n" : ""} inkl.)
              {extraClasses > 0 && ` + Extra-Klassen: ${extraFee(scope, selectedClasses.length).toLocaleString("de-DE")} ${scope === "wipo" ? "CHF" : "€"}${scope === "euipo" ? " (Staffel)" : ""}`}
            </div>
            {scope === "dpma" && (
              <div className="text-xs text-muted-foreground mt-1">
                +60 € beschleunigte Prüfung (4 Wochen statt 8) — optional
              </div>
            )}
            {scope === "wipo" && (
              <div className="text-xs text-muted-foreground mt-1">
                + Länder-Gebühren je gewähltem Mitglieds-Land (typisch 100–500 CHF/Land)
              </div>
            )}
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 mb-4 text-xs">
            <div className="font-semibold mb-1">Vor der Anmeldung:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
              <li>
                <Link to="/cockpit/check" className="text-accent-blue hover:underline">
                  Live-Check
                </Link>{" "}
                durchgeführt? Identitäts- + Ähnlichkeits-Recherche?
              </li>
              <li>Bei vielen Treffern: Anwalt für gewerblichen Rechtsschutz konsultieren (~600–1.500 €).</li>
              <li>Klassen final? Nach Anmeldung sind Erweiterungen NICHT möglich (neue Anmeldung nötig).</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <a
              href={tmviewSearchUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs hover:bg-secondary"
            >
              TMView öffnen <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={dpmaSearchUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs hover:bg-secondary"
            >
              DPMA-Register öffnen <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={euipoSearchUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs hover:bg-secondary"
            >
              EUIPO-Register öffnen <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Anmeldung-CTA */}
          {scope === "dpma" && (
            <a
              href="https://direkt.dpma.de"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-5 py-3 text-sm font-semibold hover:opacity-90 w-full justify-center"
            >
              Bei DPMAdirektWeb anmelden <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {scope === "euipo" && (
            <a
              href="https://euipo.europa.eu/ohimportal/de/user-area"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-5 py-3 text-sm font-semibold hover:opacity-90 w-full justify-center"
            >
              Bei EUIPO User Area anmelden <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {scope === "wipo" && (
            <a
              href="https://www.wipo.int/madrid/en/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-blue text-primary-foreground px-5 py-3 text-sm font-semibold hover:opacity-90 w-full justify-center"
            >
              Madrid-System öffnen <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(3)} className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>
            <Link to="/playbook/marke-anmelden" className="inline-flex items-center gap-1 rounded-lg border border-accent-blue/40 text-accent-blue px-4 py-2 text-sm hover:bg-accent-blue/10">
              <Tag className="h-4 w-4" /> Komplett-Playbook öffnen
            </Link>
          </div>
        </div>
      )}
    </CockpitShell>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-muted-foreground text-xs">{label}</span>
    <span className="font-semibold text-sm">{value || "—"}</span>
  </div>
);

export default MarkenWizard;
