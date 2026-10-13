import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Callout, Field, ResultPanel, ResultRow, ToneBadge, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  Tag,
  ExternalLink,
  Calculator,
  Check,
  ClipboardCheck,
  Globe,
  Layers,
  Sparkles,
  Type,
} from "lucide-react";

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
  { id: 29, label: "Fleisch, Fisch, Milchprodukte, Öle, verarbeitetes Obst/Gemüse", useCases: ["Food-Brand", "Feinkost", "Plant-based"] },
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


  const waehrung = scope === "wipo" ? "CHF" : "€";
  const extraBetrag = extraFee(scope, selectedClasses.length);

  return (
    <CockpitShell
      eyebrow="Marken-Wizard"
      title="DPMA-Anmeldungs-Wizard mit Klassen-Empfehlung"
      subtitle="Schritt für Schritt zur Markenanmeldung: Schutzbereich, Nizza-Klassen, Recherche, Kostenvorschau und Direkt-Link zur offiziellen Anmeldung."
    >
      {/* Progress */}
      <nav aria-label="Schritte" className="mb-6">
        <ol className="grid grid-cols-4 gap-2">
          {STEPS.map((label, i) => {
            const s = i + 1;
            const done = s < step;
            const current = s === step;
            return (
              <li key={label} aria-current={current ? "step" : undefined} className="min-w-0">
                <div className={cn("h-1.5 rounded-full", done ? "bg-success" : current ? "bg-accent-blue" : "bg-border")} />
                <div className="mt-2 flex items-center gap-1.5 text-sm">
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular",
                      done && "bg-success text-primary-foreground",
                      current && "bg-accent-blue text-primary-foreground",
                      !done && !current && "border border-border text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-3 w-3" aria-hidden="true" /> : s}
                  </span>
                  <span className={cn("hidden truncate sm:inline", current ? "font-medium text-foreground" : "text-muted-foreground")}>{label}</span>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-sm font-medium sm:hidden">
          Schritt {step} von 4: {STEPS[step - 1]}
        </p>
      </nav>

      <ToolLayout
        inputs={
          <>
            {/* Step 1: Markenname */}
            {step === 1 && (
              <ToolSection
                title="Markenname festlegen"
                icon={Type}
                description="Welche Marke willst du anmelden? Tipp: vorab den Live-Check laufen lassen, damit du nicht in einen bestehenden Konflikt rennst."
              >
                <Field label="Marken- oder Wortzeichen" htmlFor="mw-name" hint="Mindestens 2 Zeichen">
                  <Input
                    id="mw-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z.B. Cerise, KreyaTec, NaturaPlus"
                    autoFocus
                  />
                </Field>
                <Link
                  to={`/cockpit/check?q=${encodeURIComponent(name)}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
                >
                  Erst Live-Check laufen lassen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <StepNav>
                  <span />
                  <Button onClick={() => setStep(2)} disabled={name.trim().length < 2}>
                    Weiter <ArrowRight aria-hidden="true" />
                  </Button>
                </StepNav>
              </ToolSection>
            )}

            {/* Step 2: Schutzbereich */}
            {step === 2 && (
              <ToolSection
                title="Schutzbereich wählen"
                icon={Globe}
                description="Wo soll deine Marke geschützt sein? Faustregel: nur Deutschland → DPMA (schützt nur DE; AT und CH brauchen eigene Anmeldungen oder WIPO). EU-weiter Verkauf → EUIPO. US/Asia geplant → WIPO Madrid."
              >
                <div className="grid grid-cols-1 gap-3">
                  {(["dpma", "euipo", "wipo"] as Scope[]).map((s) => {
                    const aktiv = scope === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={aktiv}
                        onClick={() => setScope(s)}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-200 active:translate-y-px",
                          aktiv
                            ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
                            : "border-border bg-card hover:border-foreground/25",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-accent-blue">
                              {s === "dpma" ? "Nur DE" : s === "euipo" ? "EU-weit" : "International"}
                            </p>
                            <p className="mt-0.5 font-semibold">{SCOPE_LABEL[s]}</p>
                          </div>
                          <p className="shrink-0 text-right text-lg font-semibold tabular">
                            {SCOPE_BASEFEE[s]} {s === "wipo" ? "CHF" : "€"}
                          </p>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          Grundgebühr ({s === "dpma" ? "3 Klassen inkl." : "1 Klasse inkl."}) ·{" "}
                          {s === "euipo"
                            ? "2. Klasse +50 €, ab 3. Klasse +150 €"
                            : `+${SCOPE_EXTRA[s]} ${s === "wipo" ? "CHF" : "€"} pro weitere Klasse`}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <StepNav>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft aria-hidden="true" /> Zurück
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    Weiter <ArrowRight aria-hidden="true" />
                  </Button>
                </StepNav>
              </ToolSection>
            )}

            {/* Step 3: Nizza-Klassen */}
            {step === 3 && (
              <ToolSection
                title="Nizza-Klassen wählen"
                icon={Layers}
                description="Markenschutz gilt nur für die Klassen, die du auswählst. Tipp: lieber eine zu wenig als eine zu viel, nach 5 Jahren gilt Benutzungspflicht."
              >
                {/* Branch-Empfehlung */}
                <div className="mb-5 rounded-xl border border-accent-blue/20 bg-accent p-4">
                  <Field
                    label={
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-accent-blue" aria-hidden="true" /> Branche oder Tätigkeit
                      </span>
                    }
                    htmlFor="mw-branche"
                    hint={recommendedClasses.length === 0 ? "Wir schlagen dir passende Klassen vor." : undefined}
                  >
                    <Input
                      id="mw-branche"
                      value={branchInput}
                      onChange={(e) => setBranchInput(e.target.value)}
                      placeholder="z.B. Kosmetik, SaaS, Streetwear, Coffee, Coaching"
                    />
                  </Field>
                  {recommendedClasses.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm text-foreground/80">
                        Empfohlene Klassen: <strong className="tabular">{recommendedClasses.join(", ")}</strong>
                      </p>
                      <Button size="sm" onClick={applyRecommended}>
                        Übernehmen
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid max-h-[460px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                  {NIZZA_CLASSES.map((c) => {
                    const checked = selectedClasses.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={checked}
                        onClick={() => toggleClass(c.id)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-[background-color,border-color,box-shadow] duration-200",
                          checked
                            ? "border-accent-blue bg-accent shadow-[0_0_0_1px_hsl(var(--accent-blue)/0.35)]"
                            : "border-border bg-card hover:border-foreground/25",
                        )}
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            Klasse <span className="tabular">{c.id}</span>
                            {c.popular && <ToneBadge tone="accent">populär</ToneBadge>}
                          </div>
                          <span
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-md border",
                              checked ? "border-accent-blue bg-accent-blue text-primary-foreground" : "border-border",
                            )}
                            aria-hidden="true"
                          >
                            {checked && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </div>
                        <div className="text-sm text-foreground/80">{c.label}</div>
                        <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.useCases.join(" · ")}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-secondary/60 px-4 py-3 text-sm">
                  <span className="font-semibold">
                    <span className="tabular">{selectedClasses.length}</span> Klassen ausgewählt
                  </span>
                  <span className="truncate text-muted-foreground tabular">{[...selectedClasses].sort((a, b) => a - b).join(", ") || "keine"}</span>
                </div>

                <StepNav>
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft aria-hidden="true" /> Zurück
                  </Button>
                  <Button onClick={() => setStep(4)} disabled={selectedClasses.length === 0}>
                    Weiter <ArrowRight aria-hidden="true" />
                  </Button>
                </StepNav>
              </ToolSection>
            )}

            {/* Step 4: Übersicht + Anmeldung */}
            {step === 4 && (
              <ToolSection
                title="Übersicht und Anmeldung"
                icon={ClipboardCheck}
                description="Letzter Check und Direkt-Links zur offiziellen Anmeldung."
              >
                <div className="divide-y divide-border/70 rounded-xl border border-border px-4">
                  <ResultRow label="Marke" value={name || "—"} strong />
                  <ResultRow label="Schutzbereich" value={SCOPE_LABEL[scope]} />
                  <ResultRow label="Klassen" value={[...selectedClasses].sort((a, b) => a - b).join(", ") || "—"} />
                  <ResultRow label="Anzahl Klassen" value={String(selectedClasses.length)} />
                  <ResultRow label="Davon im Grundpreis" value={`${baseClasses} · ${extraClasses} extra`} />
                </div>

                <Callout tone="warning" title="Vor der Anmeldung" className="mt-5">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>
                      <Link to="/cockpit/check" className="font-medium text-accent-blue hover:underline">
                        Live-Check
                      </Link>{" "}
                      durchgeführt? Identitäts- + Ähnlichkeits-Recherche?
                    </li>
                    <li>Bei vielen Treffern: Anwalt für gewerblichen Rechtsschutz konsultieren (~600–1.500 €).</li>
                    <li>Klassen final? Nach Anmeldung sind Erweiterungen NICHT möglich (neue Anmeldung nötig).</li>
                  </ul>
                </Callout>

                <p className="mb-2 mt-5 text-sm font-medium">Register durchsuchen</p>
                <div className="flex flex-wrap gap-2">
                  <a href={tmviewSearchUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    TMView öffnen <ExternalLink aria-hidden="true" />
                  </a>
                  <a href={dpmaSearchUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    DPMA-Register öffnen <ExternalLink aria-hidden="true" />
                  </a>
                  <a href={euipoSearchUrl} target="_blank" rel="noreferrer noopener" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    EUIPO-Register öffnen <ExternalLink aria-hidden="true" />
                  </a>
                </div>

                {/* Anmeldung-CTA */}
                <div className="mt-5">
                  {scope === "dpma" && (
                    <a href="https://direkt.dpma.de" target="_blank" rel="noreferrer noopener" className={ctaCls}>
                      Bei DPMAdirektWeb anmelden <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {scope === "euipo" && (
                    <a href="https://euipo.europa.eu/ohimportal/de/user-area" target="_blank" rel="noreferrer noopener" className={ctaCls}>
                      Bei EUIPO User Area anmelden <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {scope === "wipo" && (
                    <a href="https://www.wipo.int/madrid/en/" target="_blank" rel="noreferrer noopener" className={ctaCls}>
                      Madrid-System öffnen <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <StepNav>
                  <Button variant="outline" onClick={() => setStep(3)}>
                    <ArrowLeft aria-hidden="true" /> Zurück
                  </Button>
                  <Link to="/playbook/marke-anmelden" className={buttonVariants({ variant: "outline" })}>
                    <Tag aria-hidden="true" /> Komplett-Playbook öffnen
                  </Link>
                </StepNav>
              </ToolSection>
            )}
          </>
        }
        result={
          <ResultPanel
            variant="ink"
            kicker="Geschätzte Gebühr"
            title={name.trim() ? name : "Deine Marke"}
            value={`${totalCost} ${waehrung}`}
            valueHint={SCOPE_LABEL[scope]}
          >
            <div className="divide-y divide-white/10 border-t border-white/10">
              <ResultRow
                label={`Grundgebühr (${baseClasses} Klasse${baseClasses > 1 ? "n" : ""} inkl.)`}
                value={`${SCOPE_BASEFEE[scope]} ${waehrung}`}
              />
              <ResultRow
                label={`Extra-Klassen${scope === "euipo" ? " (Staffel)" : ""}`}
                value={`${extraBetrag.toLocaleString("de-DE")} ${waehrung}`}
              />
              <ResultRow label="Gewählte Klassen" value={String(selectedClasses.length)} />
            </div>
            {scope === "dpma" && (
              <p className="mt-3 text-xs text-primary-foreground/65">+200 € beschleunigte Prüfung (4 Wochen statt 8) — optional</p>
            )}
            {scope === "wipo" && (
              <p className="mt-3 text-xs text-primary-foreground/65">
                + Länder-Gebühren je gewähltem Mitglieds-Land (typisch 100–500 CHF/Land)
              </p>
            )}
            <p className="mt-3 flex items-start gap-1.5 text-xs text-primary-foreground/65">
              <Calculator className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Amtsgebühren, ohne Anwalts- oder Recherchekosten.
            </p>
          </ResultPanel>
        }
      />
    </CockpitShell>
  );
};

const STEPS = ["Markenname", "Schutzbereich", "Nizza-Klassen", "Übersicht"];

const ctaCls =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-95";

const StepNav = ({ children }: { children: ReactNode }) => (
  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">{children}</div>
);

export default MarkenWizard;
