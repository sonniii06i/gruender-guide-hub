import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, TrendingDown, AlertTriangle, Info, CheckCircle2, ExternalLink } from "lucide-react";

// === Stand 2026 (recherchiert Mai 2026) ===
const GKV_ALLG_SATZ = 14.6; // % — unverändert seit 2015
const GKV_ZUSATZ_SCHNITT_2026 = 2.9; // % — rechnerischer Durchschnitt 2026 (war 2,5 % in 2025)
const PV_SATZ = 3.6; // % — Pflegeversicherung 2026
const PV_KINDERLOS_ZUSCHLAG = 0.6; // % ab 23 J. ohne Kind
const PV_KIND_ABSCHLAG_JE = 0.25; // % je Kind 2-5 Kinder (Familie mit Kindern <25)
const BBG_KV_MONAT_2026 = 5512.5; // € Höchst-Bemessung
const MINDEST_BEMESSUNG_MONAT_2026 = 1318.33; // € Mindest-Bemessung freiwillig Versicherte
const JAEG_2026 = 77400; // € Jahresarbeitsentgeltgrenze (Pflichtversicherungsgrenze)

// Top günstige bundesweit geöffnete Kassen 2026 (rechnerisch ohne Bonus, Quelle: zusatzbeitrag.net)
const TOP_KASSEN = [
  { name: "BKK firmus", zusatz: 2.18, gesamt: 16.78, bemerkung: "Günstigste bundesweite Kasse 2026" },
  { name: "hkk", zusatz: 2.39, gesamt: 16.99, bemerkung: "Bremer Kasse, oft im Top-3" },
  { name: "BKK Linde", zusatz: 2.49, gesamt: 17.09, bemerkung: "Eingeschränkt offen (siehe Region)" },
  { name: "TK (Techniker)", zusatz: 2.69, gesamt: 17.29, bemerkung: "Größte bundesweite Kasse, gute App + Service" },
  { name: "DAK", zusatz: 3.4, gesamt: 18.0, bemerkung: "Eher teuer Stand 2026" },
  { name: "Barmer", zusatz: 3.29, gesamt: 17.89, bemerkung: "Bundesweit, stabil" },
];

const KvOptimizer = () => {
  // Single Source of Truth: Brutto-Monat — alle anderen Werte werden daraus abgeleitet.
  const [bruttoMonat, setBruttoMonat] = useState(5000);
  const bruttoJahr = bruttoMonat * 12;
  const [aktuellerZusatz, setAktuellerZusatz] = useState(GKV_ZUSATZ_SCHNITT_2026);
  const [kinderlos, setKinderlos] = useState(true);
  const [kinderAnzahl, setKinderAnzahl] = useState(0);
  // PKV
  const [pkvBeitragMonat, setPkvBeitragMonat] = useState(550);
  const [pkvAlter, setPkvAlter] = useState(35);
  const [pkvSelbstbehalt, setPkvSelbstbehalt] = useState(0);
  // Wechsel-Check: nutzt bruttoJahr (oben), kein separater Input
  const [istGmbHGF, setIstGmbHGF] = useState(false);

  // === Berechnungen ===
  const calc = useMemo(() => {
    // PV-Satz angepasst nach Familienstand (§55 SGB XI)
    let pvSatz = PV_SATZ;
    if (kinderlos) pvSatz += PV_KINDERLOS_ZUSCHLAG;
    else if (kinderAnzahl >= 2 && kinderAnzahl <= 5) pvSatz -= (kinderAnzahl - 1) * PV_KIND_ABSCHLAG_JE;
    pvSatz = Math.max(2.6, pvSatz); // Floor

    // GKV-Pflicht (Angestellte): AN-Anteil = 50 % von KV+Zusatz + 50 % PV (PV-Zuschlag kinderlos AN-only)
    const gkvGesamtSatz = GKV_ALLG_SATZ + aktuellerZusatz;
    const beitragKvMonat = Math.min(bruttoMonat, BBG_KV_MONAT_2026) * (gkvGesamtSatz / 100);
    const beitragPvMonat = Math.min(bruttoMonat, BBG_KV_MONAT_2026) * (pvSatz / 100);
    const anAnteilKv = beitragKvMonat / 2;
    const anAnteilPv = beitragPvMonat / 2 + (kinderlos ? Math.min(bruttoMonat, BBG_KV_MONAT_2026) * (PV_KINDERLOS_ZUSCHLAG / 100) / 2 : 0);
    // Korrektur: PV-Kinderlos-Zuschlag trägt NUR AN allein (nicht AG-mit-50%)
    const gkvPflichtAN = anAnteilKv + anAnteilPv;

    // Vergleich mit Top-Kassen (Spar-Potenzial pro Jahr für AN)
    const sparPotenzial = TOP_KASSEN.map((k) => {
      const neuerSatz = GKV_ALLG_SATZ + k.zusatz;
      const neuerKv = Math.min(bruttoMonat, BBG_KV_MONAT_2026) * (neuerSatz / 100);
      const neuerAnKv = neuerKv / 2;
      const sparungMonat = anAnteilKv - neuerAnKv;
      return {
        ...k,
        sparungMonat,
        sparungJahr: sparungMonat * 12,
      };
    }).sort((a, b) => b.sparungJahr - a.sparungJahr);

    // GKV-freiwillig (Selbstständige)
    const bemessung = Math.max(MINDEST_BEMESSUNG_MONAT_2026, Math.min(bruttoMonat, BBG_KV_MONAT_2026));
    const freiwilligKv = bemessung * ((GKV_ALLG_SATZ + aktuellerZusatz) / 100);
    const freiwilligPv = bemessung * (pvSatz / 100);
    const freiwilligGesamt = freiwilligKv + freiwilligPv;
    const freiwilligMindest = MINDEST_BEMESSUNG_MONAT_2026 * ((GKV_ALLG_SATZ + aktuellerZusatz + pvSatz) / 100);
    const freiwilligHoechst = BBG_KV_MONAT_2026 * ((GKV_ALLG_SATZ + aktuellerZusatz + pvSatz) / 100);

    // PKV Spar-Szenarien
    const pkvSparSzenarien = [
      { titel: "§204 VVG Tarifwechsel intern (typisch ab Alter 40+)", quote: 0.20, hinweis: "15-30% Sparen ohne Verlust der Altersrückstellungen — Pflicht der Kasse, Tarifwechsel-Antrag zu prüfen." },
      { titel: "Selbstbehalt 500€ → 1.500€ erhöhen", quote: 0.10, hinweis: "Beitrag sinkt ~10%, du zahlst max. 1.500€/J selbst — sinnvoll wenn gesund + Rücklage da." },
      { titel: "Beitragsrückerstattung (BRE) — Rechnungen 1 Jahr selbst zahlen", quote: 0.08, hinweis: "1-4 Monatsbeiträge zurück wenn du keine Rechnungen einreichst. Lohnt sich nur bei kleinen Beträgen + Selbstbehalt-Tarif." },
      { titel: "Wechsel in Standardtarif (≥10 Jahre PKV, ≥55J)", quote: 0.40, hinweis: "Notlösung: gedeckelt auf max. GKV-Höchstbeitrag, eingeschränkte Leistungen. Sinnvoll bei Beitrags-Notstand." },
    ].map((s) => ({ ...s, ersparnisMonat: pkvBeitragMonat * s.quote, ersparnisJahr: pkvBeitragMonat * s.quote * 12 }));
    void pkvAlter; void pkvSelbstbehalt;

    // Wechsel-Check: Lohnt sich PKV für AN mit Brutto X?
    const wechselGkvMonatAn = (Math.min(bruttoJahr / 12, BBG_KV_MONAT_2026) * ((GKV_ALLG_SATZ + GKV_ZUSATZ_SCHNITT_2026) / 100)) / 2 + (Math.min(bruttoJahr / 12, BBG_KV_MONAT_2026) * (pvSatz / 100)) / 2;
    const wechselGkvJahresKostenAn = wechselGkvMonatAn * 12;
    // PKV: Junger Single ~450-550€/Mon, alt 30-40 J im Schnitt; mit AG-Zuschuss bei Angestellten halbieren
    const pkvSchaetzungJung = 480;
    const pkvBeitragNetto = istGmbHGF ? pkvSchaetzungJung / 2 : pkvSchaetzungJung; // GmbH-GF kann sich AG-Zuschuss zahlen
    const pkvAnKostenJahr = pkvBeitragNetto * 12;
    const wechselErlaubt = bruttoJahr > JAEG_2026 || istGmbHGF; // Selbstständige immer; AN nur über JAEG
    const wechselErsparnisJahr = wechselGkvJahresKostenAn - pkvAnKostenJahr;

    return {
      gkvPflichtAN,
      sparPotenzial,
      freiwilligKv,
      freiwilligPv,
      freiwilligGesamt,
      freiwilligMindest,
      freiwilligHoechst,
      pkvSparSzenarien,
      bemessung,
      pvSatz,
      wechselErlaubt,
      wechselGkvJahresKostenAn,
      pkvAnKostenJahr,
      wechselErsparnisJahr,
    };
  }, [bruttoMonat, aktuellerZusatz, kinderlos, kinderAnzahl, pkvBeitragMonat, pkvAlter, pkvSelbstbehalt, bruttoJahr, istGmbHGF]);

  return (
    <CockpitShell
      eyebrow="KV-Optimizer · Stand 2026"
      title="Krankenkasse: Spar-Hebel + GKV-vs-PKV-Vergleich"
      subtitle="Zusatzbeitrag-Vergleich GKV (2,18 % - 4,39 % Spanne 2026), günstigste Kassen + Spar-Potenzial pro Jahr. PKV-Hebel: §204 VVG Tarifwechsel (15-30 %), Selbstbehalt, BRE. Wechsel-Check GKV ↔ PKV mit JAEG 77.400 €."
    >
      {/* Sticky Anchor-Navigation — alle 4 Sektionen permanent sichtbar */}
      <div className="sticky top-0 z-10 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-background/95 backdrop-blur border-b border-border mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([
            { v: "sektion-gkv-pflicht", l: "GKV Pflicht", emoji: "👔" },
            { v: "sektion-gkv-freiwillig", l: "GKV freiwillig", emoji: "🏛️" },
            { v: "sektion-pkv", l: "PKV Spar-Hebel", emoji: "💎" },
            { v: "sektion-wechsel", l: "Wechsel-Check", emoji: "🔄" },
          ]).map((s) => (
            <a
              key={s.v}
              href={`#${s.v}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.v)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="rounded-xl border border-border bg-card hover:bg-accent-blue/5 hover:border-accent-blue/40 p-2 text-left transition flex items-center gap-2"
            >
              <span className="text-base">{s.emoji}</span>
              <span className="text-xs font-semibold leading-tight">{s.l}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Common Inputs */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">Deine Daten</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Brutto-Einkommen / Monat (€)</Label>
            <Input
              type="number"
              value={bruttoMonat}
              onChange={(e) => setBruttoMonat(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              = <strong className="text-foreground">{bruttoJahr.toLocaleString("de-DE")} €/Jahr</strong> · BBG-Cap 2026: {BBG_KV_MONAT_2026.toLocaleString("de-DE")} €/Mon ({(BBG_KV_MONAT_2026 * 12).toLocaleString("de-DE")} €/J)
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Aktueller Zusatzbeitrag (%)</Label>
            <Input
              type="number"
              step="0.01"
              value={aktuellerZusatz}
              onChange={(e) => setAktuellerZusatz(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Durchschnitt 2026: {GKV_ZUSATZ_SCHNITT_2026} % · Spanne 2,18 - 4,39 %
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Familie</Label>
            <div className="mt-1 space-y-1">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={kinderlos} onChange={(e) => setKinderlos(e.target.checked)} />
                <span>Kinderlos (PV-Zuschlag +0,6 %)</span>
              </label>
              {!kinderlos && (
                <Input
                  type="number"
                  value={kinderAnzahl}
                  onChange={(e) => setKinderAnzahl(Math.max(0, Number(e.target.value) || 0))}
                  placeholder="Anzahl Kinder unter 25"
                  className="h-8 text-xs"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* === Modus: GKV-Pflicht === */}
      <section id="sektion-gkv-pflicht" className="scroll-mt-32">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">👔 GKV Pflicht (Angestellte)</h2>
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-5 w-5 text-emerald-700" />
              <h3 className="font-bold text-base">Spar-Potenzial durch Kassenwechsel</h3>
            </div>
            <div className="text-xs mb-3 text-muted-foreground">
              Dein AN-Anteil bei aktuellem Zusatzbeitrag <strong>{aktuellerZusatz.toFixed(2)} %</strong>:{" "}
              <strong className="text-foreground">{calc.gkvPflichtAN.toFixed(2)} €/Monat</strong> ({(calc.gkvPflichtAN * 12).toFixed(0)} €/Jahr)
            </div>
            <div className="space-y-2">
              {calc.sparPotenzial.slice(0, 5).map((k) => (
                <div
                  key={k.name}
                  className={`flex items-center justify-between rounded-lg p-3 text-xs ${
                    k.sparungJahr > 100 ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-secondary/40"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{k.name}</div>
                    <div className="text-[11px] text-muted-foreground">{k.bemerkung}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="font-mono">Zusatz {k.zusatz.toFixed(2)} % · Total {k.gesamt.toFixed(2)} %</div>
                    {k.sparungJahr > 0 ? (
                      <div className="text-emerald-700 font-bold">
                        − {k.sparungMonat.toFixed(0)} €/Mon · {k.sparungJahr.toFixed(0)} €/Jahr
                      </div>
                    ) : (
                      <div className="text-muted-foreground">teurer als aktuell</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed mb-6">
            <div className="font-bold mb-2">3 weitere GKV-Spar-Hebel:</div>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Bonusprogramme</strong>: TK bis 480 €/J, AOK ~200 €/J, BARMER ~200 €/J — für
                Check-up, Sport-Verein, Zahn-Vorsorge. Geld <em>steuerfrei</em>.
              </li>
              <li>
                <strong>Familienversicherung §10 SGB V</strong>: Ehepartner/Kinder unter 23 (Studium 25)
                mit Einkommen unter 535 €/Monat (Stand 2026) → kostenlos mitversichert. Spart bei dir
                kein Geld, aber spart dem Partner ~280 €/Monat.
              </li>
              <li>
                <strong>Sonderkündigungsrecht</strong>: Wenn deine Kasse 2026 den Zusatz erhöht → 2
                Monate Frist, Wechsel zum übernächsten Monat. Vorversicherungszeit muss <em>nicht</em>{" "}
                12 Monate sein (Sonderkündigung).
              </li>
            </ul>
          </div>
      </section>

      {/* === Sektion: GKV-freiwillig (Selbstständige) === */}
      <section id="sektion-gkv-freiwillig" className="scroll-mt-32">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">🏛️ GKV freiwillig (Selbstständige)</h2>
          <div className="rounded-2xl border-2 border-blue-500/40 bg-blue-500/5 p-5 mb-6">
            <h3 className="font-bold text-base mb-3">Dein Beitrag als Selbstständiger</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="rounded-lg bg-secondary/40 p-3">
                <div className="text-[10px] text-muted-foreground uppercase">Beitrag dein Brutto</div>
                <div className="text-lg font-bold">{calc.freiwilligGesamt.toFixed(0)} €/Mon</div>
                <div className="text-[10px] text-muted-foreground">Bemessung: {calc.bemessung.toFixed(0)} €</div>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-3">
                <div className="text-[10px] text-muted-foreground uppercase">Mindestbeitrag 2026</div>
                <div className="text-lg font-bold">{calc.freiwilligMindest.toFixed(0)} €/Mon</div>
                <div className="text-[10px] text-muted-foreground">Bei Einkommen &lt; 1.318 €/Mon</div>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3">
                <div className="text-[10px] text-muted-foreground uppercase">Höchstbeitrag 2026</div>
                <div className="text-lg font-bold">{calc.freiwilligHoechst.toFixed(0)} €/Mon</div>
                <div className="text-[10px] text-muted-foreground">Cap bei 5.512 €/Mon Einkommen</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1.5">
              <div>
                · <strong>Krankengeld-Wahltarif</strong>: Mit Wahltarif (+0,5-1 %) bekommst du bei AU ab Tag 43
                Krankengeld. Ohne Wahltarif zahlst du günstigeren ermäßigten Satz (14,0 statt 14,6 %), bekommst
                aber kein Krankengeld. Bei Rücklagen + Berufsunfähigkeitsversicherung oft sinnvoller.
              </div>
              <div>
                · <strong>Einnahmen nicht melden &lt; BBG</strong>: Beitrag bemisst sich nur nach gemeldetem
                Einkommen. Bei schwankendem Einkommen vorsichtig — FA-Bescheid + StB-Schreiben gegenüber
                Kasse nutzen.
              </div>
              <div>
                · <strong>KSK-Mitgliedschaft prüfen</strong> (Künstler, Publizisten, Programmierer-grenze):
                Bundeszuschuss übernimmt 50 % der KV-Beiträge wie bei AN.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed mb-6">
            <div className="font-bold mb-2">Spar-Hebel als Selbstständiger:</div>
            <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Wechsel zu günstiger Kasse:</strong> gleiche Spar-Logik wie bei Angestellten —
                zusätzliche Ersparnis: <strong>{(calc.sparPotenzial[0].sparungJahr * 2).toFixed(0)} €/Jahr</strong>{" "}
                (×2 weil du sowohl AN- als auch AG-Anteil trägst!)
              </li>
              <li>
                <strong>Ermäßigter Beitrag ohne Krankengeld:</strong> 14,0 % statt 14,6 % allgemein
              </li>
              <li>
                <strong>Wechsel-Check PKV</strong> (Tab 4): bei Brutto &gt; 70 k €/J + jung + gesund kann
                PKV deutlich günstiger sein
              </li>
            </ul>
          </div>
      </section>

      {/* === Sektion: PKV === */}
      <section id="sektion-pkv" className="scroll-mt-32">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">💎 PKV Spar-Hebel</h2>
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Aktueller PKV-Beitrag (€/Mon)</Label>
                <Input
                  type="number"
                  value={pkvBeitragMonat}
                  onChange={(e) => setPkvBeitragMonat(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Alter</Label>
                <Input
                  type="number"
                  value={pkvAlter}
                  onChange={(e) => setPkvAlter(Math.max(18, Math.min(90, Number(e.target.value) || 35)))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Aktueller Selbstbehalt (€/J)</Label>
                <Input
                  type="number"
                  value={pkvSelbstbehalt}
                  onChange={(e) => setPkvSelbstbehalt(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-5 mb-6">
            <h3 className="font-bold text-base mb-3 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-emerald-700" />
              PKV-Spar-Hebel (sortiert nach Sparpotenzial)
            </h3>
            <div className="space-y-2">
              {calc.pkvSparSzenarien.map((s, i) => (
                <div key={i} className="rounded-lg bg-card border border-border p-3">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="font-semibold text-sm flex-1">{s.titel}</div>
                    <div className="text-right shrink-0">
                      <div className="text-emerald-700 font-bold text-sm">− {s.ersparnisMonat.toFixed(0)} €/Mon</div>
                      <div className="text-[10px] text-muted-foreground">{s.ersparnisJahr.toFixed(0)} €/Jahr</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed">{s.hinweis}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed mb-6">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-2">§204 VVG Tarifwechsel — der wichtigste Hebel (2026: 13 % Beitragserhöhung trifft 60 %)</div>
                <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
                  <li>
                    <strong>Was es ist:</strong> Wechsel in einen <em>günstigeren Tarif derselben</em> Versicherung
                    unter Mitnahme der Altersrückstellungen. Keine Gesundheitsprüfung für gleiche/niedrigere Leistungen.
                  </li>
                  <li>
                    <strong>Pflicht der Kasse</strong> (§204 VVG): du fragst aktiv nach Vergleichstarifen,
                    Versicherung MUSS antworten. Banche bei der Kasse beantragen, nicht via Vermittler (der
                    bekommt sonst Bestandsprovision).
                  </li>
                  <li>
                    <strong>Honorarberater (NICHT Vermittler):</strong> 200-400 € Pauschale, oft 1.500-5.000 €/J
                    Ersparnis. ROI in 1-3 Monaten.
                  </li>
                  <li>
                    <strong>Standard- &amp; Basistarif</strong>: Notlösung gedeckelt auf max. GKV-Höchstbeitrag.
                    Standardtarif: bei ≥10 J PKV + ≥55 J. Basistarif: jederzeit, aber eingeschränkte Leistungen
                    auf GKV-Niveau.
                  </li>
                  <li>
                    <strong>Beihilfe-Wechsel (Beamte/Verwaltungs-AN):</strong> nur Restkostenversicherung statt
                    Vollkosten — deutlich günstiger. Nur für anspruchsberechtigte Beamte.
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </section>

      {/* === Sektion: Wechsel-Check === */}
      <section id="sektion-wechsel" className="scroll-mt-32">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">🔄 Wechsel-Check GKV ↔ PKV</h2>
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary/40 p-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Jahresbrutto (aus Brutto-Monat oben × 12)</Label>
                <div className="text-2xl font-bold mt-1">{bruttoJahr.toLocaleString("de-DE")} €</div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Basis: {bruttoMonat.toLocaleString("de-DE")} €/Monat. Zum Ändern oben anpassen.
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer rounded-lg border border-border p-3">
                <input type="checkbox" checked={istGmbHGF} onChange={(e) => setIstGmbHGF(e.target.checked)} />
                <span>Ich bin <strong>GmbH-Gesellschafter-GF</strong> oder Selbstständig (kein JAEG-Check nötig)</span>
              </label>
            </div>
          </div>

          <div className={`rounded-2xl border-2 p-5 mb-6 ${
            calc.wechselErlaubt ? "border-emerald-500/40 bg-emerald-500/5" : "border-red-500/40 bg-red-500/5"
          }`}>
            <h3 className="font-bold text-base mb-3 flex items-center gap-2">
              {calc.wechselErlaubt ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <AlertTriangle className="h-5 w-5 text-red-700" />}
              {calc.wechselErlaubt ? "Du darfst in die PKV wechseln" : `Wechsel nicht möglich — Brutto < JAEG ${JAEG_2026.toLocaleString("de-DE")} €`}
            </h3>
            {calc.wechselErlaubt ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">GKV-Kosten (AN-Anteil)</div>
                    <div className="text-lg font-bold">{(calc.wechselGkvJahresKostenAn).toFixed(0)} €/Jahr</div>
                    <div className="text-[10px] text-muted-foreground">{(calc.wechselGkvJahresKostenAn / 12).toFixed(0)} €/Mon AN</div>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <div className="text-[10px] uppercase text-muted-foreground">PKV-Schätzung Jung-Single</div>
                    <div className="text-lg font-bold">{calc.pkvAnKostenJahr.toFixed(0)} €/Jahr</div>
                    <div className="text-[10px] text-muted-foreground">{(calc.pkvAnKostenJahr / 12).toFixed(0)} €/Mon {istGmbHGF ? "(50% AG-Zuschuss)" : ""}</div>
                  </div>
                  <div className={`rounded-lg p-3 ${calc.wechselErsparnisJahr > 0 ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                    <div className="text-[10px] uppercase text-muted-foreground">Differenz heute</div>
                    <div className={`text-lg font-bold ${calc.wechselErsparnisJahr > 0 ? "text-emerald-700" : "text-amber-700"}`}>
                      {calc.wechselErsparnisJahr > 0 ? "− " : "+ "}
                      {Math.abs(calc.wechselErsparnisJahr).toFixed(0)} €/Jahr
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {calc.wechselErsparnisJahr > 0 ? "PKV günstiger" : "GKV günstiger"}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs text-muted-foreground leading-relaxed">
                Als Arbeitnehmer brauchst du Bruttoeinkommen über JAEG <strong>{JAEG_2026.toLocaleString("de-DE")} €/Jahr</strong>{" "}
                ({(JAEG_2026 / 12).toFixed(0)} €/Monat) für 12 Monate ununterbrochen. Bei Selbstständigen / GmbH-GF entfällt der JAEG-Check.
              </div>
            )}
          </div>

          <div className="rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-4 text-xs leading-relaxed mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-red-800 mb-2">⚠ Langzeit-Risiken PKV (oft unterschätzt)</div>
                <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground">
                  <li>
                    <strong>PKV-Beitrag steigt mit Alter</strong> stark: 2026 zogen 60 % der PKVs um ~13 % an.
                    Heute günstig ≠ in 20 Jahren günstig.
                  </li>
                  <li>
                    <strong>Rück-Wechsel ab 55 unmöglich:</strong> Ausnahmen nur über Arbeitslosigkeit + JAEG-
                    Unterschreitung 12 Monate. Faktisch lebenslange Bindung.
                  </li>
                  <li>
                    <strong>Kinder PKV:</strong> jedes Kind eigener Vertrag (~150-250 €/Mon). GKV: kostenlos
                    familienversichert. Ein Kind kostet PKV ~30k € über 18 Jahre.
                  </li>
                  <li>
                    <strong>Rente:</strong> GKV-Rentner zahlen ~50 % Beitragssatz aus AG-Zuschuss-Hälfte. PKV-
                    Rentner: voller PKV-Beitrag aus eigener Tasche, oft 600-900 €/Mon.
                  </li>
                  <li>
                    <strong>Bei großer Krankheit / Familienplanung:</strong> GKV sicherer (Familien-Verbund,
                    keine Reha-Limit, keine Beitrags-Sprünge).
                  </li>
                  <li>
                    <strong>Sweet-Spot PKV:</strong> Single, ≥70 k €/J, jung (&lt; 35), gesund, hohe Rücklagen,
                    kein Familienwunsch — sonst sehr genau prüfen.
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </section>

      {/* Cross-Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <a href="/cockpit/pension-optimizer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Pension-Optimizer →</div>
          <div className="text-muted-foreground">bAV-KV-Pflicht in Rente jetzt mit Freibetrag 2.373 €/J modelliert</div>
        </a>
        <a href="/cockpit/salary-dividende" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5">Salary vs. Dividende →</div>
          <div className="text-muted-foreground">Optimum GF-Gehalt vs. Ausschüttung mit SV-Effekt</div>
        </a>
        <a href="https://www.zusatzbeitrag.net/" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-card p-3 text-xs hover:border-accent-blue transition">
          <div className="font-semibold mb-0.5 flex items-center gap-1">Aktuelle GKV-Zusatzbeiträge <ExternalLink className="h-3 w-3" /></div>
          <div className="text-muted-foreground">Live-Tabelle aller Kassen (zusatzbeitrag.net)</div>
        </a>
      </div>

      <Stand2026Footer
        sources={[
          { label: "Stiftung Warentest — Krankenkassen 2026", url: "https://www.test.de/Gesetzliche-Krankenkassen-2026-Das-koennen-Sie-tun-wenn-es-teuerer-wird-5898858-0/" },
          { label: "Zusatzbeitrag-Liste 2026 (zusatzbeitrag.net)", url: "https://www.zusatzbeitrag.net/" },
          { label: "JAEG 2026 (Haufe)", url: "https://www.haufe.de/personal/entgelt/jahresarbeitsentgeltgrenze-welche-auswirkung-hat-die-erhoehung_78_390184.html" },
          { label: "§204 VVG Tarifwechsel (Finanztip)", url: "https://www.finanztip.de/pkv/pkv-tarif-wechsel/" },
          { label: "Mindestbemessung Selbstständige 2026 (covago)", url: "https://covago.de/mindestbemessungsgrundlage-2026/" },
          { label: "§229 SGB V Versorgungsbezüge (Haufe)", url: "https://www.haufe.de/id/norm/sgb-v-gesetzliche-krankenversicherung-229-versorgungsbezuege-als-beitragspflichtige-einnahmen-HI12693200_p229.html" },
        ]}
        note="Stand Mai 2026: GKV-Allg-Satz 14,6 % unverändert · Zusatz-Durchschnitt 2,9 % (Vorjahr 2,5 %) · BBG-KV 5.512,50 €/Mon · JAEG 77.400 €/J · Mindestbemessung freiwillig 1.318,33 €/Mon · PKV-Erhöhung 2026 ~13 % bei 60 % der Versicherten · PV 3,6 % + Kinderlosen-Zuschlag 0,6 % ab 23 J."
      />
    </CockpitShell>
  );
};

export default KvOptimizer;
