/**
 * StbCostBenefit — "Brauche ich einen Steuerberater?"
 *
 * Tool 7 der Anfänger-Wave (Starter-Kategorie, Wave 2).
 *
 * Klassische Anfänger-Frage: "Lohnt sich ein Steuerberater oder mache ich es selbst?"
 * Tool vergleicht 3 Szenarien:
 *  1. Voll-Mandat StB (lfd. Buchhaltung + Jahresabschluss + ESt + USt-VA)
 *  2. DIY (lexoffice/sevdesk + Eigenzeit + ESt-Software)
 *  3. Hybrid (DIY-Buchhaltung + StB nur für Jahresabschluss & ESt-Erklärung)
 *
 * Methode: StBVV-Mittelgebühr vereinfacht angesetzt (Tabelle A/B/C),
 * DIY-Eigenzeit × Stundensatz aus Tool 6, dann break-even ableiten.
 *
 * Hinweis: Ist eine ORIENTIERUNG, keine StBVV-Detail-Berechnung.
 * Echte Honorare hängen von Tätigkeitsumfang & Vereinbarung ab.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import {
  Lightbulb,
  Calculator,
  HelpCircle,
  TrendingUp,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Callout,
  Field,
  ResultPanel,
  ResultRow,
  ToneBadge,
  ToolLayout,
  ToolSection,
  selectCls,
  toneSoft,
  type Tone,
} from "@/components/cockpit/kit";

type Rechnungsart = "euer" | "bilanz";
type UstVaFrequenz = "monatlich" | "quartal" | "keine";

const StbCostBenefit = () => {
  const [umsatz, setUmsatz] = useState(80000);
  const [betriebsausgaben, setBetriebsausgaben] = useState(20000);
  const [rechnungsart, setRechnungsart] = useState<Rechnungsart>("euer");
  const [ustVa, setUstVa] = useState<UstVaFrequenz>("quartal");
  const [belegeProMonat, setBelegeProMonat] = useState(40);
  const [stundenlohnEigen, setStundenlohnEigen] = useState(72); // Default = Tool 6 Default-Stundensatz
  const [stundenBuchhaltungMonat, setStundenBuchhaltungMonat] = useState(6);

  const calc = useMemo(() => {
    const gewinn = Math.max(0, umsatz - betriebsausgaben);

    // ===== StBVV-Mittelgebühr-Schätzung (vereinfacht) =====
    // Diese Werte sind realistische Branchen-Durchschnitte für kleine Mandanten
    // (Quelle: BStBK Strukturanalyse + öffentliche StB-Honorar-Recherchen 2025/2026).
    // Wir nutzen sie als Plausibilitäts-Bandbreite — nicht als exakte StBVV-Berechnung.

    // Laufende Buchhaltung pro Jahr (Tabelle C analog, vereinfacht als % vom Umsatz)
    // Realistisch: 1,5-3,5 % vom Umsatz bei Solo-Mandanten, abhängig von Beleganzahl
    const belegFaktor = belegeProMonat <= 30 ? 0.020 : belegeProMonat <= 60 ? 0.025 : belegeProMonat <= 120 ? 0.030 : 0.035;
    const stbBuchhaltungMittel = Math.max(900, umsatz * belegFaktor); // Min 75 €/Mon
    const stbBuchhaltungMin = stbBuchhaltungMittel * 0.7;
    const stbBuchhaltungMax = stbBuchhaltungMittel * 1.4;

    // Jahresabschluss (Tabelle B)
    // EÜR: 5/10-30/10 → Mittelgebühr ca. 1.200-2.500 € für Solo, bei 80k Umsatz
    // Bilanz: deutlich teurer, ~3.000-6.000 €
    let stbAbschlussMittel;
    if (rechnungsart === "euer") {
      stbAbschlussMittel = umsatz <= 50000 ? 800 : umsatz <= 100000 ? 1400 : umsatz <= 250000 ? 2200 : 3200;
    } else {
      stbAbschlussMittel = umsatz <= 100000 ? 3500 : umsatz <= 250000 ? 5500 : 8500;
    }
    const stbAbschlussMin = stbAbschlussMittel * 0.7;
    const stbAbschlussMax = stbAbschlussMittel * 1.4;

    // ESt-Erklärung mit Anlagen (Tabelle A)
    // Solo-Selbstständig: ESt + Anlage S/G + EÜR + ggf. Anlage V → 400-1.000 €
    const stbEstMittel = gewinn <= 30000 ? 450 : gewinn <= 70000 ? 700 : gewinn <= 150000 ? 950 : 1300;
    const stbEstMin = stbEstMittel * 0.7;
    const stbEstMax = stbEstMittel * 1.4;

    // USt-VA: 30-80 € pro Voranmeldung
    const ustVaProJahr = ustVa === "monatlich" ? 12 : ustVa === "quartal" ? 4 : 0;
    const stbUstVaProStueck = 50;
    const stbUstVaJahr = ustVaProJahr * stbUstVaProStueck;

    const stbGesamtMittel = stbBuchhaltungMittel + stbAbschlussMittel + stbEstMittel + stbUstVaJahr;
    const stbGesamtMin = stbBuchhaltungMin + stbAbschlussMin + stbEstMin + stbUstVaJahr * 0.7;
    const stbGesamtMax = stbBuchhaltungMax + stbAbschlussMax + stbEstMax + stbUstVaJahr * 1.4;

    // ===== DIY-Kosten =====
    // Software-Abo (lexoffice / sevdesk realistische Preise 2026)
    const diySoftware = belegeProMonat <= 20 ? 119 // lexoffice S
                      : belegeProMonat <= 60 ? 239 // lexoffice M
                      : belegeProMonat <= 150 ? 455 // lexoffice L
                      : 720; // lexoffice XL
    // ESt-Software (WISO/Smartsteuer): 30-50 €/Jahr
    const diyEstSoftware = 45;
    // Eigenzeit: Stunden/Mon × 12 × Stundenlohn
    const diyZeitkosten = stundenBuchhaltungMonat * 12 * stundenlohnEigen;
    // Zusätzliche Zeit für Jahresabschluss + ESt (kleiner Aufwand mit Software)
    const diyZeitAbschluss = (rechnungsart === "euer" ? 8 : 25) * stundenlohnEigen;
    const diyZeitEst = 6 * stundenlohnEigen;

    const diyGesamt = diySoftware + diyEstSoftware + diyZeitkosten + diyZeitAbschluss + diyZeitEst;

    // ===== Hybrid: DIY-Buchhaltung + StB nur für Jahresabschluss + ESt =====
    // Realistisch: StB nimmt das Buchhaltungs-Ergebnis aus lexoffice und macht Jahresabschluss/ESt
    // Buchhaltungs-Aufschlag StB für Übernahme der DIY-Daten: ~20-30% Rabatt auf Mittelgebühr
    const hybridSoftware = diySoftware + diyEstSoftware;
    const hybridZeit = diyZeitkosten;
    const hybridStbAbschluss = stbAbschlussMittel * 0.85; // 15% Aufschlag für Daten-Übernahme-Aufwand
    const hybridStbEst = stbEstMittel;
    const hybridStbUstVa = stbUstVaJahr * 0.7; // wenn überhaupt; oft macht DIY-User die USt-VA selbst
    const hybridGesamt = hybridSoftware + hybridZeit + hybridStbAbschluss + hybridStbEst;

    // ===== Empfehlung =====
    // Welches Szenario ist am günstigsten?
    const cheapest = [
      { name: "Voll-StB", kosten: stbGesamtMittel },
      { name: "DIY", kosten: diyGesamt },
      { name: "Hybrid", kosten: hybridGesamt },
    ].sort((a, b) => a.kosten - b.kosten)[0];

    // Break-even-Gewinn: ab welchem Gewinn ist Voll-StB günstiger als DIY?
    // Approximation: StB-Buchhaltung wächst mit Umsatz, DIY-Zeit ist umsatz-unabhängig
    // → Break-even bei DIY-Zeit-Kosten > StB-Mehrkosten
    const breakEvenSichtbar = diyGesamt > stbGesamtMittel
      ? `Bei deinen aktuellen Werten ist DIY ${Math.round(diyGesamt - stbGesamtMittel).toLocaleString("de-DE")} € teurer als Voll-StB.`
      : `Bei deinen aktuellen Werten ist DIY ${Math.round(stbGesamtMittel - diyGesamt).toLocaleString("de-DE")} € günstiger als Voll-StB.`;

    return {
      gewinn,
      stbBuchhaltungMittel, stbBuchhaltungMin, stbBuchhaltungMax,
      stbAbschlussMittel, stbAbschlussMin, stbAbschlussMax,
      stbEstMittel, stbEstMin, stbEstMax,
      stbUstVaJahr,
      stbGesamtMittel, stbGesamtMin, stbGesamtMax,
      diySoftware, diyEstSoftware, diyZeitkosten, diyZeitAbschluss, diyZeitEst,
      diyGesamt,
      hybridSoftware, hybridZeit, hybridStbAbschluss, hybridStbEst, hybridStbUstVa,
      hybridGesamt,
      cheapest,
      breakEvenSichtbar,
    };
  }, [umsatz, betriebsausgaben, rechnungsart, ustVa, belegeProMonat, stundenlohnEigen, stundenBuchhaltungMonat]);

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;
  const tonOf = (name: string): Tone => (name === "Voll-StB" ? "accent" : name === "DIY" ? "success" : "info");

  return (
    <CockpitShell
      eyebrow="Erste Schritte · für komplette Anfänger:innen"
      title="Steuerberater Cost-Benefit-Check"
      subtitle="Lohnt sich ein Steuerberater oder mache ich es selbst? Drei Szenarien (Voll-StB, DIY-Software, Hybrid) im Vergleich, gerechnet mit StBVV-Mittelgebühren und realistischen DIY-Kosten, mit Empfehlung."
    >
      <BeginnerHero />

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="Deine Eckdaten" icon={Calculator} description="Umsatz, Kosten und Buchführungsart bestimmen die StB-Honorare.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Jahresumsatz (€)">
                  <NumberField value={umsatz} onChange={setUmsatz} min={0} aria-label="Jahresumsatz in Euro" />
                </Field>
                <Field label="Betriebsausgaben pro Jahr (€)">
                  <NumberField value={betriebsausgaben} onChange={setBetriebsausgaben} min={0} aria-label="Betriebsausgaben pro Jahr in Euro" />
                </Field>
                <Field label="Gewinn (berechnet)" hint="Umsatz minus Betriebsausgaben">
                  <div className="flex h-10 items-center rounded-md border border-border bg-secondary/50 px-3 text-sm font-semibold tabular">
                    {calc.gewinn.toLocaleString("de-DE")} €
                  </div>
                </Field>
                <Field label="Belege pro Monat (ca.)" hint="Bestimmt Software-Tarif und Buchhaltungsaufwand">
                  <NumberField value={belegeProMonat} onChange={setBelegeProMonat} min={0} aria-label="Belege pro Monat" />
                </Field>
                <Field label="Buchführung" htmlFor="stb-rechnungsart">
                  <select id="stb-rechnungsart" value={rechnungsart} onChange={(e) => setRechnungsart(e.target.value as Rechnungsart)} className={selectCls}>
                    <option value="euer">EÜR (Freiberufler/Gewerbe ≤ 800k Umsatz)</option>
                    <option value="bilanz">Bilanz (Kaufmann/GmbH)</option>
                  </select>
                </Field>
                <Field label="USt-Voranmeldung" htmlFor="stb-ustva">
                  <select id="stb-ustva" value={ustVa} onChange={(e) => setUstVa(e.target.value as UstVaFrequenz)} className={selectCls}>
                    <option value="monatlich">Monatlich (12×/J, &gt;7.500 € USt/J)</option>
                    <option value="quartal">Quartalsweise (4×/J)</option>
                    <option value="keine">Keine (Kleinunternehmer §19 UStG)</option>
                  </select>
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="DIY-Setup: Was kostet dich deine Zeit?" icon={Clock}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Dein Stundenlohn (€)" hint="Aus Tool 6 oder dein normaler Stundensatz für Kundenarbeit. Der Wert dieser Zeit sind Opportunitätskosten.">
                  <NumberField value={stundenlohnEigen} onChange={setStundenlohnEigen} min={10} aria-label="Stundenlohn in Euro" />
                </Field>
                <Field label="Stunden Buchhaltung pro Monat" hint="Belege scannen, Bank kategorisieren, USt-VA. Realistisch: 30 Belege ≈ 4h, 60 ≈ 8h, 120 ≈ 15h/Mon.">
                  <NumberField value={stundenBuchhaltungMonat} onChange={setStundenBuchhaltungMonat} min={0} aria-label="Stunden Buchhaltung pro Monat" />
                </Field>
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Günstigste Option für dich"
              title={calc.cheapest.name}
              value={eur(calc.cheapest.kosten)}
              valueHint="pro Jahr, inkl. USt-VA, Jahresabschluss und ESt"
            >
              <p className="text-sm leading-relaxed text-primary-foreground/80">{calc.breakEvenSichtbar}</p>
              <div className="mt-4 divide-y divide-white/10 rounded-xl bg-white/[0.04] px-4">
                <ResultRow label="Voll-StB" value={eur(calc.stbGesamtMittel)} strong={calc.cheapest.name === "Voll-StB"} />
                <ResultRow label="DIY" value={eur(calc.diyGesamt)} strong={calc.cheapest.name === "DIY"} />
                <ResultRow label="Hybrid" value={eur(calc.hybridGesamt)} strong={calc.cheapest.name === "Hybrid"} />
              </div>
            </ResultPanel>

            <Callout tone="info" icon={Lightbulb} title="Kontext zur Entscheidung">
              <p>Die reine Kostenrechnung ist nicht die ganze Wahrheit. Berücksichtige auch:</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Bei komplexen Fällen (Holding, US-LLC, Crypto): immer StB</li>
                <li>Bei einer Betriebsprüfung ohne StB stehst du allein da</li>
                <li>Ein StB kann durch Optimierungen mehr sparen, als er kostet (Faktor 1,5-3× bei aktiver Beratung)</li>
                <li>Dein Stundensatz × Buchhaltungszeit sind Opportunitätskosten: Diese Zeit fehlt im Kundengeschäft</li>
              </ul>
            </Callout>
          </>
        }
      />

      <section className="mb-8" aria-labelledby="stb-szenarien">
        <div className="mb-4">
          <h2 id="stb-szenarien" className="text-lg font-semibold tracking-tight">Drei Szenarien im Vergleich</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Euro pro Jahr, jeweils inkl. USt-VA, Jahresabschluss und ESt-Erklärung</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ScenarioCard
            title="Voll-StB"
            subtitle="StB macht alles"
            kosten={calc.stbGesamtMittel}
            min={calc.stbGesamtMin}
            max={calc.stbGesamtMax}
            highlight={calc.cheapest.name === "Voll-StB"}
            tone={tonOf("Voll-StB")}
            pros={[
              "Maximale Sicherheit (Haftung beim StB)",
              "Kein Eigen-Aufwand für Buchhaltung",
              "StB kennt Steuer-Optimierungen",
              "Vertretung bei Betriebsprüfung",
            ]}
            cons={[
              "Höchste Kosten",
              "Belege müssen trotzdem aufbereitet werden",
              "Abhängigkeit vom StB-Tempo",
            ]}
          />
          <ScenarioCard
            title="DIY"
            subtitle="lexoffice + WISO"
            kosten={calc.diyGesamt}
            highlight={calc.cheapest.name === "DIY"}
            tone={tonOf("DIY")}
            pros={[
              "Volle Kostenkontrolle",
              "Schneller Überblick über Zahlen",
              "Lern-Effekt für Steuer-Verständnis",
              "Bei wenig Belegen sehr günstig",
            ]}
            cons={[
              "Zeitaufwand 4-15 h/Monat",
              "Haftung liegt bei dir",
              "Fehler-Risiko bei komplexen Fällen",
              "Kein StB-Wissen für Optimierungen",
            ]}
          />
          <ScenarioCard
            title="Hybrid"
            subtitle="DIY + StB nur Jahresabschluss"
            kosten={calc.hybridGesamt}
            highlight={calc.cheapest.name === "Hybrid"}
            tone={tonOf("Hybrid")}
            pros={[
              "Mittelweg: günstig + sicher",
              "Lfd. Buchhaltung in eigener Hand",
              "StB-Quality-Check am Jahresende",
              "ESt-Erklärung wird abgegeben (Haftung)",
            ]}
            cons={[
              "Trotzdem ~6h/Mon Eigenzeit",
              "lexoffice/sevdesk + StB-Lernkurve",
              "Kein StB-Sparring bei Quartal-Fragen",
            ]}
          />
        </div>
      </section>

      <ToolSection title="Detail-Aufschlüsselung" icon={Calculator} className="mb-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Voll-StB</h3>
            <DetailRow label="Lfd. Buchhaltung" wert={calc.stbBuchhaltungMittel} hinweis={`Mittel, Spanne ${Math.round(calc.stbBuchhaltungMin).toLocaleString("de-DE")}-${Math.round(calc.stbBuchhaltungMax).toLocaleString("de-DE")} €`} />
            <DetailRow label={`Jahresabschluss (${rechnungsart.toUpperCase()})`} wert={calc.stbAbschlussMittel} hinweis={`Mittel, Spanne ${Math.round(calc.stbAbschlussMin).toLocaleString("de-DE")}-${Math.round(calc.stbAbschlussMax).toLocaleString("de-DE")} €`} />
            <DetailRow label="ESt-Erklärung" wert={calc.stbEstMittel} hinweis={`Mittel, Spanne ${Math.round(calc.stbEstMin).toLocaleString("de-DE")}-${Math.round(calc.stbEstMax).toLocaleString("de-DE")} €`} />
            {calc.stbUstVaJahr > 0 && <DetailRow label="USt-VAs" wert={calc.stbUstVaJahr} hinweis={`${ustVa === "monatlich" ? 12 : 4}× à 50 €`} />}
            <Summe wert={calc.stbGesamtMittel} tone={tonOf("Voll-StB")} min={calc.stbGesamtMin} max={calc.stbGesamtMax} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">DIY (Software + Eigenzeit)</h3>
            <DetailRow label="lexoffice / sevdesk Abo" wert={calc.diySoftware} hinweis="je nach Beleganzahl" />
            <DetailRow label="ESt-Software (WISO etc.)" wert={calc.diyEstSoftware} hinweis="ca. 30-50 €/Jahr" />
            <DetailRow label="Eigenzeit lfd. Buchhaltung" wert={calc.diyZeitkosten} hinweis={`${stundenBuchhaltungMonat} h/Mon × 12 × ${stundenlohnEigen} €/h`} />
            <DetailRow label="Eigenzeit Jahresabschluss" wert={calc.diyZeitAbschluss} hinweis={`${rechnungsart === "euer" ? 8 : 25} h × ${stundenlohnEigen} €/h`} />
            <DetailRow label="Eigenzeit ESt-Erklärung" wert={calc.diyZeitEst} hinweis={`6 h × ${stundenlohnEigen} €/h`} />
            <Summe wert={calc.diyGesamt} tone={tonOf("DIY")} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Hybrid (DIY + StB Abschluss)</h3>
            <DetailRow label="Software" wert={calc.hybridSoftware} hinweis="lexoffice + WISO" />
            <DetailRow label="Eigenzeit lfd. Buchhaltung" wert={calc.hybridZeit} hinweis="wie DIY" />
            <DetailRow label="StB Jahresabschluss" wert={calc.hybridStbAbschluss} hinweis="15 % weniger wegen Datenübernahme" />
            <DetailRow label="StB ESt-Erklärung" wert={calc.hybridStbEst} hinweis="Mittel" />
            <Summe wert={calc.hybridGesamt} tone={tonOf("Hybrid")} />
          </div>
        </div>
      </ToolSection>

      <ToolSection title="Faustregeln nach Gewinn" icon={TrendingUp} className="mb-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Callout tone="success" icon={false} title="≤ 30k Gewinn">
            DIY mit lexoffice/sevdesk + WISO meist günstigste Option. Buchhaltung ist überschaubar. StB für ESt-Erklärung optional (~450 €).
          </Callout>
          <Callout tone="info" icon={false} title="30-100k Gewinn">
            Hybrid-Empfehlung: DIY-Buchhaltung selbst, Jahresabschluss + ESt vom StB. Komplexität steigt (GewSt, ggf. Anlage S vs G).
          </Callout>
          <Callout tone="accent" icon={false} title="> 100k Gewinn">
            Voll-StB lohnt sich meist: Optimierungs-Potenzial (IAB, Pension, Rechtsform-Wechsel) übersteigt Honorar. Zeit ist wertvoller als 3-5k € StB-Honorar.
          </Callout>
        </div>
      </ToolSection>

      <nav aria-label="Weiterführende Tools" className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { to: "/cockpit/stundensatz-rechner", t: "Stundensatz-Rechner (Tool 6)", d: "Wert deiner Eigenzeit bestimmen", back: true },
          { to: "/cockpit/stb-finder", t: "StB-Auswahl-Wizard", d: "Wenn StB: welcher passt?" },
          { to: "/cockpit/stb-handoff", t: "StB-Hand-off-Checkliste", d: "Was übergibst du dem StB?" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
          >
            {l.back && <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />}
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{l.t}</span>
              <span className="block text-xs text-muted-foreground">{l.d}</span>
            </span>
            {!l.back && <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-blue" aria-hidden="true" />}
          </Link>
        ))}
      </nav>

      <Glossar />
      <Stand2026Footer
        sources={[
          { label: "StBVV (Steuerberatervergütungsverordnung)", url: "https://www.gesetze-im-internet.de/stbvv/" },
          { label: "BStBK Strukturanalyse Steuerberatung", url: "https://www.bstbk.de" },
          { label: "lexoffice Preise", url: "https://www.lexoffice.de/preise/" },
          { label: "sevdesk Preise", url: "https://sevdesk.de/preise/" },
        ]}
        note="StBVV-Mittelgebühren sind Orientierung. Echte Honorare hängen von Tätigkeitsumfang + Vereinbarung ab — StB kann auch Stundensatz vereinbaren (typisch 80-180 €/h). Bei Hochrisiko-Fällen (Holding, Betriebsprüfung, USt-Voranmeldungen monatlich, US-Geschäft) IMMER StB einsetzen."
      />
    </CockpitShell>
  );
};

// ============================================================================
// Sub-Components
// ============================================================================
const BeginnerHero = () => (
  <ToolSection className="mb-8" bodyClassName="p-5 md:p-6">
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-blue">
        <HelpCircle className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-semibold tracking-tight">Brauche ich einen Steuerberater?</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Die häufigste Anfänger-Frage. Die Antwort hängt von Umsatz, Komplexität und deiner verfügbaren Zeit ab, nicht
          vom Bauchgefühl. Dieses Tool rechnet drei Szenarien (Voll-StB, DIY, Hybrid) durch und zeigt dir die günstigste
          Option, inklusive Opportunitätskosten deiner Eigenzeit.
        </p>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
      {[
        { t: "Voll-StB", d: "Maximale Sicherheit, höchste Kosten. Typ. 2.500-5.000 €/J bei Solo.", tone: "accent" as Tone },
        { t: "DIY", d: "Günstigste Software-Kosten, aber 4-15 h/Mon Eigenzeit. Haftung bei dir.", tone: "success" as Tone },
        { t: "Hybrid", d: "DIY-Buchhaltung + StB nur Jahresabschluss. Mittelweg, sehr beliebt.", tone: "info" as Tone },
      ].map((x) => (
        <div key={x.t} className="rounded-xl border border-border bg-secondary/40 p-3.5">
          <ToneBadge tone={x.tone}>{x.t}</ToneBadge>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
        </div>
      ))}
    </div>
  </ToolSection>
);

const ScenarioCard = ({
  title, subtitle, kosten, min, max, highlight, tone, pros, cons,
}: {
  title: string; subtitle: string; kosten: number; min?: number; max?: number;
  highlight: boolean; tone: Tone; pros: string[]; cons: string[];
}) => (
  <div
    className={cn(
      "flex flex-col rounded-2xl border bg-card p-5",
      highlight ? "border-accent-blue/40 shadow-soft ring-1 ring-accent-blue/25" : "border-border shadow-card",
    )}
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <ToneBadge tone={tone}>{title}</ToneBadge>
      {highlight && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-blue">
          <Award className="h-3.5 w-3.5" aria-hidden="true" /> Günstigste Option
        </span>
      )}
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] tabular">{Math.round(kosten).toLocaleString("de-DE")} €</p>
    <p className="mt-0.5 text-xs text-muted-foreground tabular">
      {min && max ? `Spanne: ${Math.round(min).toLocaleString("de-DE")}-${Math.round(max).toLocaleString("de-DE")} €` : "pro Jahr"}
    </p>
    <ul className="mt-4 space-y-1.5 border-t border-border/70 pt-4">
      {pros.map((p) => (
        <li key={p} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
          <span>{p}</span>
        </li>
      ))}
      {cons.map((co) => (
        <li key={co} className="flex items-start gap-2 text-sm">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
          <span className="text-muted-foreground">{co}</span>
        </li>
      ))}
    </ul>
  </div>
);

const DetailRow = ({ label, wert, hinweis }: { label: string; wert: number; hinweis?: string }) => (
  <div className="border-b border-border/60 py-2.5 last:border-0">
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-foreground">{label}</span>
      <span className="shrink-0 tabular">{Math.round(wert).toLocaleString("de-DE")} €</span>
    </div>
    {hinweis && <div className="mt-0.5 text-xs text-muted-foreground tabular">{hinweis}</div>}
  </div>
);

const Summe = ({ wert, tone, min, max }: { wert: number; tone: Tone; min?: number; max?: number }) => (
  <div className={cn("mt-3 rounded-xl border px-3 py-2.5", toneSoft(tone))}>
    <div className="flex justify-between gap-3 text-sm">
      <span className="font-semibold">Summe pro Jahr</span>
      <span className="font-semibold tabular">{Math.round(wert).toLocaleString("de-DE")} €</span>
    </div>
    {min && max && (
      <div className="mt-0.5 text-right text-xs text-muted-foreground tabular">
        Spanne: {Math.round(min).toLocaleString("de-DE")}-{Math.round(max).toLocaleString("de-DE")} €
      </div>
    )}
  </div>
);

const Glossar = () => (
  <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
      <span className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        Glossar: Begriffe einfach erklärt
      </span>
      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
      {[
        { begriff: "StBVV (Steuerberatervergütungsverordnung)", erklaerung: "Bundes-Verordnung die StB-Honorare regelt. Drei Tabellen: A (Steuererklärungen, %-vom-Wert), B (Jahresabschluss, 5/10-30/10 von Tabellen-Gebühr), C (lfd. Buchhaltung pro Monat). StB kann innerhalb der Spanne (Mindest- bis Höchstgebühr) frei kalkulieren, je nach Schwierigkeit. Mittelgebühr ist typischer Wert für Standard-Fälle." },
        { begriff: "Mittelgebühr (7/10 Tabelle C)", erklaerung: "Bei laufender Buchhaltung darf StB 2/10 bis 12/10 der vollen Gebühr berechnen. Mittelwert 7/10 ist üblich. Bei einfachen Fällen (wenige Belege, klare Struktur) eher 2-4/10. Bei komplexen Fällen 8-12/10." },
        { begriff: "Jahresabschluss vs. EÜR", erklaerung: "EÜR = Einnahmen-Überschuss-Rechnung. Reichen für Freiberufler + Gewerbe <800k Umsatz + <80k Gewinn. Bilanz = doppelte Buchführung mit Aktiva/Passiva. Pflicht für GmbH/UG/KG, Kaufleute, große Gewerbe. Bilanz ist viel teurer im StB (3-5× EÜR-Aufwand)." },
        { begriff: "Opportunitätskosten", erklaerung: "Wert der Zeit die du in Buchhaltung steckst statt im Kundengeschäft. Beispiel: 6 h/Mon Buchhaltung × 72 €/h = 432 €/Mon = 5.184 €/Jahr nicht verdienter Umsatz. Das ist im DIY-Szenario eingerechnet — sonst wird DIY 'künstlich' billig." },
        { begriff: "lexoffice / sevdesk", erklaerung: "Marktführende DIY-Buchhaltungs-Software für Solo + KMU. lexoffice (Haufe): 9-38 €/Mon. sevdesk: 9-40 €/Mon. Beide: Belege scannen, Bank-Abgleich, USt-VA, Mahnwesen, DATEV-Export. lexoffice einfacher für Anfänger, sevdesk mehr Features." },
        { begriff: "Hybrid-Modell", erklaerung: "Sehr beliebte Lösung: Du machst lfd. Buchhaltung selbst in lexoffice/sevdesk, gibst am Jahresende die Daten an StB. StB macht Jahresabschluss + ESt-Erklärung + Steuer-Optimierung. Kostet 30-50 % weniger als Voll-Mandat bei gleicher Sicherheit am Jahresende." },
        { begriff: "Voll-Mandat", erklaerung: "StB übernimmt komplette Buchhaltung. Du gibst nur Belege ab (digital oder Pendelordner). Höchste Kosten, aber Null Eigen-Aufwand außer Beleg-Sammlung. Sinnvoll bei: hohem Stundensatz, komplexen Fällen, vielen USt-VAs, fehlender Buchhaltungs-Affinität." },
      ].map((g) => (
        <div key={g.begriff} className="py-3.5 text-sm">
          <dt className="font-semibold text-foreground">{g.begriff}</dt>
          <dd className="mt-1 leading-relaxed text-muted-foreground">{g.erklaerung}</dd>
        </div>
      ))}
    </dl>
  </details>
);

export default StbCostBenefit;
