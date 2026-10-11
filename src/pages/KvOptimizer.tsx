import { useMemo, useState, type ElementType } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { Input } from "@/components/ui/input";
import {
  Callout,
  Field,
  KitTable,
  ResultPanel,
  StatGrid,
  StatTile,
  ToolLayout,
  ToolSection,
} from "@/components/cockpit/kit";
import {
  TrendingDown,
  AlertTriangle,
  Info,
  ExternalLink,
  ArrowRight,
  ArrowLeftRight,
  Briefcase,
  Landmark,
  Shield,
  UserRound,
  Lightbulb,
  FileText,
} from "lucide-react";

// === Stand 2026 (recherchiert Mai 2026) ===
const GKV_ALLG_SATZ = 14.6; // % — unverändert seit 2015
const GKV_ZUSATZ_SCHNITT_2026 = 2.9; // % — rechnerischer Durchschnitt 2026 (war 2,5 % in 2025)
const PV_SATZ = 3.6; // % — Pflegeversicherung 2026
const PV_KINDERLOS_ZUSCHLAG = 0.6; // % ab 23 J. ohne Kind
const PV_KIND_ABSCHLAG_JE = 0.25; // % je Kind 2-5 Kinder (Familie mit Kindern <25)
const BBG_KV_MONAT_2026 = 5812.5; // € Höchst-Bemessung (69.750 €/Jahr; 2025: 5.512,50)
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

  const eur = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;
  const pct = (n: number) => `${n.toFixed(2).replace(".", ",")} %`;

  return (
    <CockpitShell
      eyebrow="Versicherungen · Stand 2026"
      title="Krankenkasse: Spar-Hebel und GKV-PKV-Vergleich"
      subtitle="Zusatzbeiträge der GKV im Vergleich (Spanne 2026: 2,18 bis 4,39 %), günstigste Kassen und dein Sparpotenzial pro Jahr. Dazu die PKV-Hebel (Tarifwechsel nach § 204 VVG, Selbstbehalt, Beitragsrückerstattung) und der Wechsel-Check GKV oder PKV mit der JAEG von 77.400 €."
    >
      {/* Sprungmarken */}
      <nav
        aria-label="Abschnitte"
        className="sticky top-0 z-10 -mx-4 mb-6 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6"
      >
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {[
            { v: "sektion-gkv-pflicht", l: "GKV Pflicht", icon: Briefcase },
            { v: "sektion-gkv-freiwillig", l: "GKV freiwillig", icon: Landmark },
            { v: "sektion-pkv", l: "PKV Spar-Hebel", icon: Shield },
            { v: "sektion-wechsel", l: "Wechsel-Check", icon: ArrowLeftRight },
          ].map((s) => (
            <a
              key={s.v}
              href={`#${s.v}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.v)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
            >
              <s.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {s.l}
            </a>
          ))}
        </div>
      </nav>

      {/* Gemeinsame Eingaben */}
      <ToolSection title="Deine Daten" description="Gilt für alle vier Abschnitte." icon={UserRound} className="mb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field
            label="Bruttoeinkommen pro Monat (€)"
            htmlFor="kv-brutto"
            hint={
              <>
                Entspricht <strong className="text-foreground tabular">{bruttoJahr.toLocaleString("de-DE")} €</strong> im Jahr.
                Beitragsbemessungsgrenze 2026: {BBG_KV_MONAT_2026.toLocaleString("de-DE")} € pro Monat
              </>
            }
          >
            <Input
              id="kv-brutto"
              type="number"
              value={bruttoMonat}
              onChange={(e) => setBruttoMonat(Math.max(0, Number(e.target.value) || 0))}
              className="tabular"
            />
          </Field>
          <Field
            label="Aktueller Zusatzbeitrag (%)"
            htmlFor="kv-zusatz"
            hint={`Durchschnitt 2026: ${String(GKV_ZUSATZ_SCHNITT_2026).replace(".", ",")} %, Spanne 2,18 bis 4,39 %`}
          >
            <Input
              id="kv-zusatz"
              type="number"
              step="0.01"
              value={aktuellerZusatz}
              onChange={(e) => setAktuellerZusatz(Math.max(0, Number(e.target.value) || 0))}
              className="tabular"
            />
          </Field>
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Familie</p>
            <label className="flex h-10 cursor-pointer items-center gap-2.5 rounded-md border border-input bg-card px-3 text-sm">
              <input
                type="checkbox"
                checked={kinderlos}
                onChange={(e) => setKinderlos(e.target.checked)}
                className="h-4 w-4 accent-[hsl(var(--primary))]"
              />
              Kinderlos (Pflege-Zuschlag 0,6 %)
            </label>
            {!kinderlos && (
              <Input
                type="number"
                value={kinderAnzahl}
                onChange={(e) => setKinderAnzahl(Math.max(0, Number(e.target.value) || 0))}
                placeholder="Anzahl Kinder unter 25"
                aria-label="Anzahl Kinder unter 25"
                className="tabular"
              />
            )}
          </div>
        </div>
      </ToolSection>

      {/* === GKV Pflicht === */}
      <section id="sektion-gkv-pflicht" className="mb-10 scroll-mt-32 space-y-4">
        <AbschnittKopf icon={Briefcase} titel="GKV Pflicht" zusatz="für Angestellte" />
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] [&>*]:min-w-0">
          <ResultPanel
            variant="ink"
            kicker="Dein Arbeitnehmer-Anteil"
            title={`bei ${pct(aktuellerZusatz)} Zusatzbeitrag`}
            value={`${calc.gkvPflichtAN.toFixed(2).replace(".", ",")} €`}
            valueHint={`pro Monat, ${eur(calc.gkvPflichtAN * 12)} im Jahr`}
          />
          <ToolSection title="Sparpotenzial durch Kassenwechsel" icon={TrendingDown} bodyClassName="p-0 md:p-0">
            <KitTable caption="Sparpotenzial je Krankenkasse" className="rounded-none border-0">
              <thead>
                <tr>
                  <th>Kasse</th>
                  <th className="whitespace-nowrap !text-right">Zusatz</th>
                  <th className="whitespace-nowrap !text-right">Gesamt</th>
                  <th className="whitespace-nowrap !text-right">Ersparnis</th>
                </tr>
              </thead>
              <tbody>
                {calc.sparPotenzial.slice(0, 5).map((k) => (
                  <tr key={k.name} className={k.sparungJahr > 100 ? "bg-success-soft/40" : undefined}>
                    <td className="min-w-[11rem]">
                      <p className="font-medium">{k.name}</p>
                      <p className="text-xs text-muted-foreground">{k.bemerkung}</p>
                    </td>
                    <td className="whitespace-nowrap text-right">{pct(k.zusatz)}</td>
                    <td className="whitespace-nowrap text-right">{pct(k.gesamt)}</td>
                    <td className="whitespace-nowrap text-right">
                      {k.sparungJahr > 0 ? (
                        <>
                          <p className="font-semibold text-success">{eur(k.sparungJahr)} pro Jahr</p>
                          <p className="text-xs text-muted-foreground">{eur(k.sparungMonat)} pro Monat</p>
                        </>
                      ) : (
                        <span className="text-muted-foreground">teurer als aktuell</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </KitTable>
          </ToolSection>
        </div>
        <Callout tone="info" icon={Lightbulb} title="Drei weitere Spar-Hebel in der GKV">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              <strong>Bonusprogramme:</strong> TK bis 480 € im Jahr, AOK und BARMER rund 200 € für Check-up, Sportverein oder
              Zahnvorsorge. Das Geld ist <em>steuerfrei</em>.
            </li>
            <li>
              <strong>Familienversicherung nach § 10 SGB V:</strong> Ehepartner und Kinder unter 23 (im Studium 25) mit
              Einkommen unter 565 € im Monat (Stand 2026) sind kostenlos mitversichert. Spart dir selbst nichts, dem Partner
              aber rund 280 € im Monat.
            </li>
            <li>
              <strong>Sonderkündigungsrecht:</strong> Erhöht deine Kasse 2026 den Zusatzbeitrag, kannst du mit zwei Monaten
              Frist zum übernächsten Monat wechseln. Die Vorversicherungszeit muss dann <em>nicht</em> 12 Monate betragen.
            </li>
          </ul>
        </Callout>
      </section>

      {/* === GKV freiwillig === */}
      <section id="sektion-gkv-freiwillig" className="mb-10 scroll-mt-32 space-y-4">
        <AbschnittKopf icon={Landmark} titel="GKV freiwillig" zusatz="für Selbstständige" />
        <StatGrid cols={3}>
          <StatTile
            emphasis
            label="Dein Beitrag bei deinem Brutto"
            value={`${eur(calc.freiwilligGesamt)} / Monat`}
            hint={`Bemessungsgrundlage: ${eur(calc.bemessung)}`}
          />
          <StatTile label="Mindestbeitrag 2026" value={`${eur(calc.freiwilligMindest)} / Monat`} hint="Bei Einkommen unter 1.318 € im Monat" />
          <StatTile label="Höchstbeitrag 2026" value={`${eur(calc.freiwilligHoechst)} / Monat`} hint="Gedeckelt ab 5.812,50 € Monatseinkommen" />
        </StatGrid>
        <div className="grid gap-4 md:grid-cols-2">
          <ToolSection title="Gut zu wissen" icon={Info}>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Krankengeld-Wahltarif:</strong> Mit Wahltarif (plus 0,5 bis 1 %) gibt es
                bei Arbeitsunfähigkeit ab Tag 43 Krankengeld. Ohne zahlst du den ermäßigten Satz (14,0 statt 14,6 %), bekommst
                aber kein Krankengeld. Mit Rücklagen und Berufsunfähigkeitsversicherung oft die bessere Wahl.
              </li>
              <li>
                <strong className="text-foreground">Einkommen unter der BBG:</strong> Der Beitrag bemisst sich nach dem
                gemeldeten Einkommen. Bei schwankenden Einnahmen vorsichtig sein und Steuerbescheid oder ein Schreiben der
                Steuerberatung gegenüber der Kasse nutzen.
              </li>
              <li>
                <strong className="text-foreground">KSK-Mitgliedschaft prüfen</strong> (Künstler, Publizisten, teils
                Programmierer): Der Bundeszuschuss übernimmt wie bei Angestellten 50 % der KV-Beiträge.
              </li>
            </ul>
          </ToolSection>
          <ToolSection title="Spar-Hebel als Selbstständiger" icon={TrendingDown}>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Wechsel zu einer günstigeren Kasse:</strong> zusätzliche Ersparnis{" "}
                <strong className="text-success tabular">{eur(calc.sparPotenzial[0].sparungJahr * 2)} pro Jahr</strong>, doppelt
                so viel wie bei Angestellten, weil du Arbeitnehmer- und Arbeitgeber-Anteil trägst.
              </li>
              <li>
                <strong className="text-foreground">Ermäßigter Beitrag ohne Krankengeld:</strong> 14,0 % statt 14,6 %.
              </li>
              <li>
                <strong className="text-foreground">Wechsel-Check PKV</strong> (unten): Bei mehr als 70.000 € im Jahr, jung und
                gesund kann die PKV deutlich günstiger sein.
              </li>
            </ul>
          </ToolSection>
        </div>
      </section>

      {/* === PKV === */}
      <section id="sektion-pkv" className="mb-10 scroll-mt-32 space-y-4">
        <AbschnittKopf icon={Shield} titel="PKV Spar-Hebel" />
        <ToolLayout
          inputs={
            <ToolSection title="Dein PKV-Vertrag" icon={FileText}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <Field label="Beitrag pro Monat (€)" htmlFor="kv-pkv-beitrag">
                  <Input
                    id="kv-pkv-beitrag"
                    type="number"
                    value={pkvBeitragMonat}
                    onChange={(e) => setPkvBeitragMonat(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
                <Field label="Alter" htmlFor="kv-pkv-alter">
                  <Input
                    id="kv-pkv-alter"
                    type="number"
                    value={pkvAlter}
                    onChange={(e) => setPkvAlter(Math.max(18, Math.min(90, Number(e.target.value) || 35)))}
                    className="tabular"
                  />
                </Field>
                <Field label="Selbstbehalt pro Jahr (€)" htmlFor="kv-pkv-sb">
                  <Input
                    id="kv-pkv-sb"
                    type="number"
                    value={pkvSelbstbehalt}
                    onChange={(e) => setPkvSelbstbehalt(Math.max(0, Number(e.target.value) || 0))}
                    className="tabular"
                  />
                </Field>
              </div>
            </ToolSection>
          }
          result={
            <ResultPanel title="Spar-Hebel für deinen Beitrag">
              <ul className="divide-y divide-border/70">
                {calc.pkvSparSzenarien.map((s, i) => (
                  <li key={i} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium">{s.titel}</p>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-success tabular">{eur(s.ersparnisMonat)} / Monat</p>
                        <p className="text-xs text-muted-foreground tabular">{eur(s.ersparnisJahr)} im Jahr</p>
                      </div>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.hinweis}</p>
                  </li>
                ))}
              </ul>
            </ResultPanel>
          }
        />
        <Callout tone="warning" title="Tarifwechsel nach § 204 VVG: der wichtigste Hebel (2026 trifft eine Erhöhung um 13 % rund 60 % der Versicherten)">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              <strong>Was es ist:</strong> Wechsel in einen <em>günstigeren Tarif derselben</em> Versicherung, die
              Altersrückstellungen bleiben erhalten. Keine Gesundheitsprüfung bei gleichen oder geringeren Leistungen.
            </li>
            <li>
              <strong>Pflicht der Versicherung</strong> (§ 204 VVG): Du fragst aktiv nach Vergleichstarifen, die Versicherung
              muss antworten. Direkt bei der Versicherung beantragen, nicht über Vermittler (die erhalten sonst
              Bestandsprovision).
            </li>
            <li>
              <strong>Honorarberater statt Vermittler:</strong> 200 bis 400 € Pauschale, oft 1.500 bis 5.000 € Ersparnis im
              Jahr. Das rechnet sich in ein bis drei Monaten.
            </li>
            <li>
              <strong>Standard- und Basistarif:</strong> Notlösung, gedeckelt auf den GKV-Höchstbeitrag. Standardtarif ab 10
              Jahren PKV und Alter 55, Basistarif jederzeit, aber mit Leistungen auf GKV-Niveau.
            </li>
            <li>
              <strong>Beihilfe-Wechsel (Beamte):</strong> Restkosten- statt Vollkostenversicherung, deutlich günstiger. Nur für
              beihilfeberechtigte Beamte.
            </li>
          </ul>
        </Callout>
      </section>

      {/* === Wechsel-Check === */}
      <section id="sektion-wechsel" className="mb-10 scroll-mt-32 space-y-4">
        <AbschnittKopf icon={ArrowLeftRight} titel="Wechsel-Check GKV oder PKV" />
        <div className="grid gap-4 md:grid-cols-2">
          <StatTile
            label="Jahresbrutto (Monatsbrutto mal 12)"
            value={`${bruttoJahr.toLocaleString("de-DE")} €`}
            hint={`Basis: ${bruttoMonat.toLocaleString("de-DE")} € pro Monat, oben unter „Deine Daten“ änderbar`}
          />
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
            <input
              type="checkbox"
              checked={istGmbHGF}
              onChange={(e) => setIstGmbHGF(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
            />
            <span>
              <span className="block font-medium">Ich bin Gesellschafter-Geschäftsführer einer GmbH oder selbstständig</span>
              <span className="mt-0.5 block text-muted-foreground">Dann entfällt die Prüfung der Jahresarbeitsentgeltgrenze.</span>
            </span>
          </label>
        </div>

        {calc.wechselErlaubt ? (
          <ResultPanel kicker="Ergebnis" title="Du darfst in die PKV wechseln">
            <StatGrid cols={3}>
              <StatTile
                label="GKV, Arbeitnehmer-Anteil"
                value={`${eur(calc.wechselGkvJahresKostenAn)} / Jahr`}
                hint={`${eur(calc.wechselGkvJahresKostenAn / 12)} pro Monat`}
              />
              <StatTile
                label="PKV, Schätzung junger Single"
                value={`${eur(calc.pkvAnKostenJahr)} / Jahr`}
                hint={`${eur(calc.pkvAnKostenJahr / 12)} pro Monat${istGmbHGF ? ", mit 50 % Arbeitgeber-Zuschuss" : ""}`}
              />
              <StatTile
                emphasis
                tone={calc.wechselErsparnisJahr > 0 ? "success" : "warning"}
                label="Differenz heute"
                value={`${calc.wechselErsparnisJahr > 0 ? "−" : "+"} ${eur(Math.abs(calc.wechselErsparnisJahr))}`}
                hint={calc.wechselErsparnisJahr > 0 ? "PKV günstiger" : "GKV günstiger"}
              />
            </StatGrid>
          </ResultPanel>
        ) : (
          <Callout tone="danger" title={`Wechsel nicht möglich: Brutto unter der JAEG von ${JAEG_2026.toLocaleString("de-DE")} €`}>
            Als Arbeitnehmer brauchst du ein Bruttoeinkommen über{" "}
            <strong className="tabular">{JAEG_2026.toLocaleString("de-DE")} € im Jahr</strong> (
            <span className="tabular">{(JAEG_2026 / 12).toFixed(0)} €</span> im Monat), und zwar 12 Monate am Stück. Für
            Selbstständige und GmbH-Geschäftsführer entfällt diese Prüfung.
          </Callout>
        )}

        <Callout tone="danger" icon={AlertTriangle} title="Langzeit-Risiken der PKV, oft unterschätzt">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              <strong>Der Beitrag steigt mit dem Alter</strong> deutlich: 2026 erhöhten 60 % der Versicherer um rund 13 %.
              Heute günstig heißt nicht in 20 Jahren günstig.
            </li>
            <li>
              <strong>Rückwechsel ab 55 praktisch unmöglich:</strong> Ausnahmen nur über Arbeitslosigkeit oder 12 Monate unter
              der JAEG. Faktisch eine lebenslange Bindung.
            </li>
            <li>
              <strong>Kinder in der PKV:</strong> Jedes Kind braucht einen eigenen Vertrag (rund 150 bis 250 € im Monat). In der
              GKV sind Kinder kostenlos familienversichert. Ein Kind kostet in der PKV über 18 Jahre rund 30.000 €.
            </li>
            <li>
              <strong>Rente:</strong> GKV-Rentner zahlen etwa den halben Beitragssatz. PKV-Rentner tragen den vollen Beitrag
              selbst, oft 600 bis 900 € im Monat.
            </li>
            <li>
              <strong>Schwere Krankheit, Familienplanung:</strong> Die GKV ist sicherer (Familienversicherung, keine
              Reha-Limits, keine Beitragssprünge).
            </li>
            <li>
              <strong>Wann die PKV passt:</strong> Single, mindestens 70.000 € im Jahr, jung (unter 35), gesund, hohe Rücklagen,
              kein Kinderwunsch. Sonst sehr genau prüfen.
            </li>
          </ul>
        </Callout>
      </section>

      {/* Weiterführend */}
      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { href: "/cockpit/pension-optimizer", t: "Pension-Optimizer", d: "KV-Pflicht der bAV in der Rente, mit Freibetrag 2.373 € im Jahr", ext: false },
          { href: "/cockpit/salary-dividende", t: "Gehalt oder Dividende", d: "Optimales GF-Gehalt gegenüber Ausschüttung, mit SV-Effekt", ext: false },
          { href: "https://www.zusatzbeitrag.net/", t: "Aktuelle GKV-Zusatzbeiträge", d: "Live-Tabelle aller Kassen auf zusatzbeitrag.net", ext: true },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group rounded-xl border border-border bg-card p-4 shadow-card transition-colors hover:border-accent-blue/40"
          >
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              {l.t}
              {l.ext ? (
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              )}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{l.d}</p>
          </a>
        ))}
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
        note="Stand Mai 2026: GKV-Allg-Satz 14,6 % unverändert · Zusatz-Durchschnitt 2,9 % (Vorjahr 2,5 %) · BBG-KV 5.812,50 €/Mon (69.750 €/J) · JAEG 77.400 €/J · Mindestbemessung freiwillig 1.318,33 €/Mon · PKV-Erhöhung 2026 ~13 % bei 60 % der Versicherten · PV 3,6 % + Kinderlosen-Zuschlag 0,6 % ab 23 J."
      />
    </CockpitShell>
  );
};

const AbschnittKopf = ({ icon: Icon, titel, zusatz }: { icon: ElementType; titel: string; zusatz?: string }) => (
  <div className="flex items-center gap-3 border-b border-border/70 pb-3">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-blue">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
    <h2 className="text-lg font-semibold tracking-tight">
      {titel}
      {zusatz && <span className="font-normal text-muted-foreground"> {zusatz}</span>}
    </h2>
  </div>
);

export default KvOptimizer;
