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
import { Input } from "@/components/ui/input";
import { NumberField } from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import {
  Lightbulb,
  Calculator,
  HelpCircle,
  TrendingUp,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

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

  return (
    <CockpitShell
      eyebrow="🌱 Erste Schritte · für komplette Anfänger:innen"
      title="Steuerberater Cost-Benefit-Check"
      subtitle="Lohnt sich ein Steuerberater oder mache ich es selbst? Vergleich von 3 Szenarien (Voll-StB / DIY-Software / Hybrid) basierend auf StBVV-Mittelgebühren und realistischen DIY-Kosten — mit Empfehlung."
    >
      <BeginnerHero />

      {/* === Inputs === */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-blue" /> Deine Eckdaten
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahres-Umsatz (€)</Label>
            <NumberField value={umsatz} onChange={setUmsatz} min={0} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Betriebsausgaben/Jahr (€)</Label>
            <NumberField value={betriebsausgaben} onChange={setBetriebsausgaben} min={0} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Gewinn (berechnet)</Label>
            <div className="mt-1 h-10 flex items-center px-3 rounded-md bg-secondary/40 font-mono text-sm font-semibold">
              {calc.gewinn.toLocaleString("de-DE")} €
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Buchführung</Label>
            <select value={rechnungsart} onChange={(e) => setRechnungsart(e.target.value as Rechnungsart)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="euer">EÜR (Freiberufler/Gewerbe ≤ 800k Umsatz)</option>
              <option value="bilanz">Bilanz (Kaufmann/GmbH)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">USt-Voranmeldung</Label>
            <select value={ustVa} onChange={(e) => setUstVa(e.target.value as UstVaFrequenz)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="monatlich">Monatlich (12×/J, &gt;7.500 € USt/J)</option>
              <option value="quartal">Quartalsweise (4×/J)</option>
              <option value="keine">Keine (Kleinunternehmer §19 UStG)</option>
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Belege pro Monat (ca.)</Label>
            <NumberField value={belegeProMonat} onChange={setBelegeProMonat} min={0} className="mt-1" />
          </div>
        </div>
      </div>

      {/* === DIY-Eigenzeit-Eingaben === */}
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 mb-4">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-purple-700" /> DIY-Setup: was kostet dich deine Zeit?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Dein Stundenlohn (€)</Label>
            <NumberField value={stundenlohnEigen} onChange={setStundenlohnEigen} min={10} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">
              Aus Tool 6 oder dein normaler Stundensatz für Kunden-Arbeit. Wert dieser Zeit ist Opportunitätskosten.
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Stunden Buchhaltung / Monat</Label>
            <NumberField value={stundenBuchhaltungMonat} onChange={setStundenBuchhaltungMonat} min={0} className="mt-1" />
            <div className="text-[10px] text-muted-foreground mt-1">
              Belege scannen, Bank kategorisieren, USt-VA. Realistisch: 30 Belege ≈ 4h, 60 ≈ 8h, 120 ≈ 15h/Mon.
            </div>
          </div>
        </div>
      </div>

      {/* === Ergebnis-Karten: 3 Szenarien === */}
      <h3 className="font-bold text-sm mb-2 mt-6 px-1">3 Szenarien im Vergleich (€/Jahr, alle inkl. USt-VA + Jahresabschluss + ESt)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <ScenarioCard
          title="Voll-StB"
          subtitle="StB macht alles"
          kosten={calc.stbGesamtMittel}
          min={calc.stbGesamtMin}
          max={calc.stbGesamtMax}
          highlight={calc.cheapest.name === "Voll-StB"}
          color="amber"
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
          color="emerald"
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
          color="blue"
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

      {/* === Empfehlung === */}
      <div className={`rounded-2xl border-2 p-5 mb-6 ${
        calc.cheapest.name === "Voll-StB" ? "border-amber-500/40 bg-amber-500/5"
        : calc.cheapest.name === "DIY" ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card"
        : "border-blue-500/40 bg-blue-500/5"
      }`}>
        <div className="flex items-start gap-3">
          <Award className={`h-6 w-6 shrink-0 mt-0.5 ${
            calc.cheapest.name === "Voll-StB" ? "text-amber-700"
            : calc.cheapest.name === "DIY" ? "text-emerald-700"
            : "text-blue-700"
          }`} />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Günstigste Option für dich</div>
            <div className={`text-2xl font-bold mb-1 ${
              calc.cheapest.name === "Voll-StB" ? "text-amber-700"
              : calc.cheapest.name === "DIY" ? "text-emerald-700"
              : "text-blue-700"
            }`}>
              {calc.cheapest.name} · {Math.round(calc.cheapest.kosten).toLocaleString("de-DE")} €/Jahr
            </div>
            <p className="text-sm text-muted-foreground mb-2">{calc.breakEvenSichtbar}</p>
            <div className="text-xs text-foreground bg-secondary/40 rounded-lg p-3">
              <strong>💡 Kontext zur Entscheidung:</strong> Reine Kostenrechnung ist NICHT die ganze Wahrheit.
              Berücksichtige auch:
              <ul className="mt-1 list-disc list-inside space-y-0.5">
                <li>Bei komplexen Fällen (Holding, US-LLC, Crypto) → IMMER StB</li>
                <li>Bei Betriebsprüfung ohne StB stehst du allein da</li>
                <li>StB kann durch Optimierungen mehr sparen als er kostet (Faktor 1,5-3× bei aktiver Beratung)</li>
                <li>Dein Stundensatz × Buchhaltungs-Zeit ist Opportunitätskosten — diese Zeit fehlt im Kundengeschäft</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* === Detail-Aufschlüsselung === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-accent-blue" /> Detail-Aufschlüsselung
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* StB */}
          <div>
            <div className="font-bold text-amber-700 mb-2 text-sm">Voll-StB</div>
            <DetailRow label="Lfd. Buchhaltung" wert={calc.stbBuchhaltungMittel} hinweis={`Mittel: ${Math.round(calc.stbBuchhaltungMin).toLocaleString("de-DE")}-${Math.round(calc.stbBuchhaltungMax).toLocaleString("de-DE")} € (Min-Max-Spanne)`} />
            <DetailRow label={`Jahresabschluss (${rechnungsart.toUpperCase()})`} wert={calc.stbAbschlussMittel} hinweis={`Mittel: ${Math.round(calc.stbAbschlussMin).toLocaleString("de-DE")}-${Math.round(calc.stbAbschlussMax).toLocaleString("de-DE")} €`} />
            <DetailRow label="ESt-Erklärung" wert={calc.stbEstMittel} hinweis={`Mittel: ${Math.round(calc.stbEstMin).toLocaleString("de-DE")}-${Math.round(calc.stbEstMax).toLocaleString("de-DE")} €`} />
            {calc.stbUstVaJahr > 0 && <DetailRow label="USt-VAs" wert={calc.stbUstVaJahr} hinweis={`${ustVa === "monatlich" ? 12 : 4}× á 50 €`} />}
            <Summe wert={calc.stbGesamtMittel} farbe="amber" min={calc.stbGesamtMin} max={calc.stbGesamtMax} />
          </div>
          {/* DIY */}
          <div>
            <div className="font-bold text-emerald-700 mb-2 text-sm">DIY (Software + Eigenzeit)</div>
            <DetailRow label="lexoffice / sevdesk Abo" wert={calc.diySoftware} hinweis="je nach Beleganzahl" />
            <DetailRow label="ESt-Software (WISO etc.)" wert={calc.diyEstSoftware} hinweis="ca. 30-50 €/Jahr" />
            <DetailRow label="Eigenzeit lfd. Buchhaltung" wert={calc.diyZeitkosten} hinweis={`${stundenBuchhaltungMonat} h/Mon × 12 × ${stundenlohnEigen} €/h`} />
            <DetailRow label="Eigenzeit Jahresabschluss" wert={calc.diyZeitAbschluss} hinweis={`${rechnungsart === "euer" ? 8 : 25} h × ${stundenlohnEigen} €/h`} />
            <DetailRow label="Eigenzeit ESt-Erklärung" wert={calc.diyZeitEst} hinweis={`6 h × ${stundenlohnEigen} €/h`} />
            <Summe wert={calc.diyGesamt} farbe="emerald" />
          </div>
          {/* Hybrid */}
          <div>
            <div className="font-bold text-blue-700 mb-2 text-sm">Hybrid (DIY + StB Abschluss)</div>
            <DetailRow label="Software" wert={calc.hybridSoftware} hinweis="lexoffice + WISO" />
            <DetailRow label="Eigenzeit lfd. Buchhaltung" wert={calc.hybridZeit} hinweis="wie DIY" />
            <DetailRow label="StB Jahresabschluss" wert={calc.hybridStbAbschluss} hinweis="-15% wegen Daten-Übernahme" />
            <DetailRow label="StB ESt-Erklärung" wert={calc.hybridStbEst} hinweis="Mittel" />
            <Summe wert={calc.hybridGesamt} farbe="blue" />
          </div>
        </div>
      </div>

      {/* === Faustregeln === */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent-blue" /> Faustregeln nach Gewinn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/30 p-3">
            <div className="font-bold text-emerald-700 mb-1">≤ 30k Gewinn</div>
            <div className="text-muted-foreground">DIY mit lexoffice/sevdesk + WISO meist günstigste Option. Buchhaltung ist überschaubar. StB für ESt-Erklärung optional (~450 €).</div>
          </div>
          <div className="rounded-lg bg-blue-500/5 border border-blue-500/30 p-3">
            <div className="font-bold text-blue-700 mb-1">30-100k Gewinn</div>
            <div className="text-muted-foreground">Hybrid-Empfehlung: DIY-Buchhaltung selbst, Jahresabschluss + ESt vom StB. Komplexität steigt (GewSt, ggf. Anlage S vs G).</div>
          </div>
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/30 p-3">
            <div className="font-bold text-amber-700 mb-1">&gt; 100k Gewinn</div>
            <div className="text-muted-foreground">Voll-StB lohnt sich meist: Optimierungs-Potenzial (IAB, Pension, Rechtsform-Wechsel) übersteigt Honorar. Zeit ist wertvoller als 3-5k € StB-Honorar.</div>
          </div>
        </div>
      </div>

      {/* === Cross-Links === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <Link to="/cockpit/stundensatz-rechner" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">← Stundensatz-Rechner (Tool 6)</div>
          <div className="text-muted-foreground">Wert deiner Eigenzeit bestimmen</div>
        </Link>
        <Link to="/cockpit/stb-finder" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">StB-Auswahl-Wizard →</div>
          <div className="text-muted-foreground">Wenn StB: welcher passt?</div>
        </Link>
        <Link to="/cockpit/stb-handoff" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">StB-Hand-off-Checkliste →</div>
          <div className="text-muted-foreground">Was übergibst du dem StB?</div>
        </Link>
      </div>

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
  <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-5 mb-6">
    <div className="flex items-start gap-3">
      <Lightbulb className="h-6 w-6 text-purple-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-sm mb-1">Brauche ich einen Steuerberater?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Die häufigste Anfänger-Frage. Antwort hängt von Umsatz, Komplexität und deiner verfügbaren Zeit ab —
          aber NICHT vom Bauchgefühl. Dieses Tool rechnet 3 Szenarien (Voll-StB / DIY / Hybrid) durch und zeigt
          dir die GÜNSTIGSTE Option — inklusive Opportunitätskosten deiner Eigenzeit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-lg bg-amber-500/5 p-2 border border-amber-500/20">
            <strong className="text-amber-700">Voll-StB</strong>
            <div className="text-muted-foreground mt-0.5">Maximale Sicherheit, höchste Kosten. Typ. 2.500-5.000 €/J bei Solo.</div>
          </div>
          <div className="rounded-lg bg-emerald-500/5 p-2 border border-emerald-500/20">
            <strong className="text-emerald-700">DIY</strong>
            <div className="text-muted-foreground mt-0.5">Günstigste Software-Kosten, aber 4-15 h/Mon Eigenzeit. Haftung bei dir.</div>
          </div>
          <div className="rounded-lg bg-blue-500/5 p-2 border border-blue-500/20">
            <strong className="text-blue-700">Hybrid</strong>
            <div className="text-muted-foreground mt-0.5">DIY-Buchhaltung + StB nur Jahresabschluss. Mittelweg, sehr beliebt.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ScenarioCard = ({
  title, subtitle, kosten, min, max, highlight, color, pros, cons,
}: {
  title: string; subtitle: string; kosten: number; min?: number; max?: number;
  highlight: boolean; color: "amber" | "emerald" | "blue"; pros: string[]; cons: string[];
}) => {
  const colorMap = {
    amber: { border: "border-amber-500/40", bg: "bg-amber-500/5", text: "text-amber-700", high: "bg-amber-500/15 border-amber-500" },
    emerald: { border: "border-emerald-500/40", bg: "bg-emerald-500/5", text: "text-emerald-700", high: "bg-emerald-500/15 border-emerald-500" },
    blue: { border: "border-blue-500/40", bg: "bg-blue-500/5", text: "text-blue-700", high: "bg-blue-500/15 border-blue-500" },
  };
  const c = colorMap[color];
  return (
    <div className={`rounded-xl border-2 p-4 ${highlight ? c.high : `${c.border} ${c.bg}`}`}>
      {highlight && (
        <div className="text-[10px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
          <Award className={`h-3 w-3 ${c.text}`} /> <span className={c.text}>Günstigste Option</span>
        </div>
      )}
      <div className={`font-bold text-base ${c.text}`}>{title}</div>
      <div className="text-[11px] text-muted-foreground mb-2">{subtitle}</div>
      <div className="text-2xl font-bold mb-1">{Math.round(kosten).toLocaleString("de-DE")} €</div>
      <div className="text-[10px] text-muted-foreground mb-3">
        {min && max ? `Spanne: ${Math.round(min).toLocaleString("de-DE")}-${Math.round(max).toLocaleString("de-DE")} €` : "pro Jahr"}
      </div>
      <div className="space-y-1 mb-2">
        {pros.map((p) => (
          <div key={p} className="flex items-start gap-1 text-[11px]">
            <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 shrink-0" />
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {cons.map((co) => (
          <div key={co} className="flex items-start gap-1 text-[11px]">
            <AlertTriangle className="h-3 w-3 text-amber-600 mt-0.5 shrink-0" />
            <span className="text-muted-foreground">{co}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailRow = ({ label, wert, hinweis }: { label: string; wert: number; hinweis?: string }) => (
  <div className="border-b border-border/40 py-1.5 last:border-0">
    <div className="flex justify-between">
      <span className="text-foreground">{label}</span>
      <span className="font-mono">{Math.round(wert).toLocaleString("de-DE")} €</span>
    </div>
    {hinweis && <div className="text-[10px] text-muted-foreground mt-0.5">{hinweis}</div>}
  </div>
);

const Summe = ({ wert, farbe, min, max }: { wert: number; farbe: "amber" | "emerald" | "blue"; min?: number; max?: number }) => {
  const colorMap = { amber: "text-amber-700", emerald: "text-emerald-700", blue: "text-blue-700" };
  return (
    <div className="mt-2 pt-2 border-t-2 border-border">
      <div className="flex justify-between">
        <span className="font-bold">Summe / Jahr</span>
        <span className={`font-bold font-mono ${colorMap[farbe]}`}>{Math.round(wert).toLocaleString("de-DE")} €</span>
      </div>
      {min && max && (
        <div className="text-[10px] text-muted-foreground text-right">
          Spanne: {Math.round(min).toLocaleString("de-DE")}-{Math.round(max).toLocaleString("de-DE")} €
        </div>
      )}
    </div>
  );
};

const Glossar = () => (
  <details className="rounded-2xl border border-border bg-card p-5 mb-6">
    <summary className="cursor-pointer font-bold text-sm flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-accent-blue" /> Glossar — Begriffe einfach erklärt
    </summary>
    <div className="mt-3 space-y-3 text-xs leading-relaxed">
      {[
        { begriff: "StBVV (Steuerberatervergütungsverordnung)", erklaerung: "Bundes-Verordnung die StB-Honorare regelt. Drei Tabellen: A (Steuererklärungen, %-vom-Wert), B (Jahresabschluss, 5/10-30/10 von Tabellen-Gebühr), C (lfd. Buchhaltung pro Monat). StB kann innerhalb der Spanne (Mindest- bis Höchstgebühr) frei kalkulieren, je nach Schwierigkeit. Mittelgebühr ist typischer Wert für Standard-Fälle." },
        { begriff: "Mittelgebühr (7/10 Tabelle C)", erklaerung: "Bei laufender Buchhaltung darf StB 2/10 bis 12/10 der vollen Gebühr berechnen. Mittelwert 7/10 ist üblich. Bei einfachen Fällen (wenige Belege, klare Struktur) eher 2-4/10. Bei komplexen Fällen 8-12/10." },
        { begriff: "Jahresabschluss vs. EÜR", erklaerung: "EÜR = Einnahmen-Überschuss-Rechnung. Reichen für Freiberufler + Gewerbe <800k Umsatz + <80k Gewinn. Bilanz = doppelte Buchführung mit Aktiva/Passiva. Pflicht für GmbH/UG/KG, Kaufleute, große Gewerbe. Bilanz ist viel teurer im StB (3-5× EÜR-Aufwand)." },
        { begriff: "Opportunitätskosten", erklaerung: "Wert der Zeit die du in Buchhaltung steckst statt im Kundengeschäft. Beispiel: 6 h/Mon Buchhaltung × 72 €/h = 432 €/Mon = 5.184 €/Jahr nicht verdienter Umsatz. Das ist im DIY-Szenario eingerechnet — sonst wird DIY 'künstlich' billig." },
        { begriff: "lexoffice / sevdesk", erklaerung: "Marktführende DIY-Buchhaltungs-Software für Solo + KMU. lexoffice (Haufe): 9-38 €/Mon. sevdesk: 9-40 €/Mon. Beide: Belege scannen, Bank-Abgleich, USt-VA, Mahnwesen, DATEV-Export. lexoffice einfacher für Anfänger, sevdesk mehr Features." },
        { begriff: "Hybrid-Modell", erklaerung: "Sehr beliebte Lösung: Du machst lfd. Buchhaltung selbst in lexoffice/sevdesk, gibst am Jahresende die Daten an StB. StB macht Jahresabschluss + ESt-Erklärung + Steuer-Optimierung. Kostet 30-50 % weniger als Voll-Mandat bei gleicher Sicherheit am Jahresende." },
        { begriff: "Voll-Mandat", erklaerung: "StB übernimmt komplette Buchhaltung. Du gibst nur Belege ab (digital oder Pendelordner). Höchste Kosten, aber Null Eigen-Aufwand außer Beleg-Sammlung. Sinnvoll bei: hohem Stundensatz, komplexen Fällen, vielen USt-VAs, fehlender Buchhaltungs-Affinität." },
      ].map((g) => (
        <div key={g.begriff} className="rounded-lg bg-secondary/30 p-3">
          <div className="font-semibold text-foreground mb-1">{g.begriff}</div>
          <div className="text-muted-foreground">{g.erklaerung}</div>
        </div>
      ))}
    </div>
  </details>
);

export default StbCostBenefit;
