import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, ClipboardCheck, ExternalLink, ListChecks, Route, Signpost } from "lucide-react";
import { AmpelErgebnis, FrageZeile } from "@/components/cockpit/AmpelCheck";
import { Callout, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { GZ, pruefeGruendungszuschuss, rechneGruendungszuschuss, type GzAntworten } from "@/lib/gruendungszuschuss";

const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const FRAGEN: { key: keyof GzAntworten; frage: string; hilfe?: string }[] = [
  { key: "algAnspruch", frage: "Beziehst du Arbeitslosengeld I (oder hast einen konkreten Zahlungsanspruch)?", hilfe: "Nicht Bürgergeld/Grundsicherungsgeld – dafür gibt es das Einstiegsgeld." },
  { key: "sperrzeit", frage: "Ruht dein Anspruch gerade, z. B. wegen einer Sperrzeit?" },
  { key: "schonGestartet", frage: "Hast du schon losgelegt – Räume gemietet, Ware gekauft, Aufträge angenommen?", hilfe: "Gewerbe angemeldet zählt nicht als Start, ein Firmenschild auch nicht." },
  { key: "foerderungLetzte24", frage: "Hast du in den letzten 24 Monaten schon eine Gründungsförderung bekommen?" },
  { key: "eigenkuendigung", frage: "Hast du selbst gekündigt oder einen Aufhebungsvertrag unterschrieben, um zu gründen?" },
  { key: "rentenalter", frage: "Hast du die Regelaltersgrenze erreicht?" },
  { key: "behinderung", frage: "Hast du eine anerkannte Behinderung?", hilfe: "Dann entfällt die 150-Tage-Grenze." },
];

const UNTERLAGEN = [
  { titel: "Businessplan", hilfe: "Geschäftsidee, Markt, Wettbewerb, Marketing, Gründerperson", link: { to: "/businessplan-erstellen", label: "Businessplan-Generator" } },
  { titel: "Lebenslauf mit Qualifikationsnachweisen", hilfe: "Zeugnisse, Zertifikate, Berufserfahrung, Gründerkurse" },
  { titel: "Kapitalbedarfs- und Finanzierungsplan", hilfe: "Was brauchst du, woher kommt das Geld?", link: { to: "/gruendungskosten-rechner", label: "Gründungskosten-Rechner" } },
  { titel: "Umsatz- und Rentabilitätsvorschau (3 Jahre)", hilfe: "Realistische, belegbare Umsätze – der häufigste Ablehnungsgrund sind zu optimistische Zahlen" },
  { titel: "Liquiditätsplan (12 Monate, monatlich)", hilfe: "Verlangen viele IHKs für die Stellungnahme" },
  { titel: "Aufstellung deiner privaten Lebenshaltungskosten", hilfe: "Zeigt, dass die Gründung dich trägt" },
  { titel: "Stellungnahme der fachkundigen Stelle (Formular GZ 04)", hilfe: "Tragfähigkeitsbescheinigung von IHK, HWK, Steuerberater, Gründungsberatung …" },
  { titel: "Eingangsbestätigung der Gewerbeanmeldung bzw. Anzeige beim Finanzamt", hilfe: "Kann nachgereicht werden – Bewilligung dann mit Auflage", link: { to: "/cockpit/gewerbeanmeldung-wizard", label: "Gewerbeanmeldung-Wizard" } },
];

const IHK_GEBUEHREN = [
  { ihk: "IHK zu Lübeck", preis: "60 € pauschal", hinweis: "Vorkasse, unabhängig vom Ergebnis", url: "https://www.ihk.de/schleswig-holstein/starthilfe/themen/gruendungszuschuss-fachkundige-stellungnahme-1368452" },
  { ihk: "IHK Berlin", preis: "70 € zzgl. USt.", hinweis: "ca. 4 Wochen Bearbeitung, nur gewerbliche Gründungen", url: "https://www.ihk.de/berlin/service-und-beratung/finanzierung/gruendungszuschuss-2264252" },
  { ihk: "IHK Lahn-Dill", preis: "100 €", hinweis: "Rechnung mit der Stellungnahme", url: "https://www.ihk.de/lahn-dill/gruendung-foerderung-steuern/unternehmensgruendung/ihk-stellungnahme-zum-gruendungszuschuss-4757384" },
  { ihk: "IHK Karlsruhe", preis: "120 €", hinweis: "", url: "https://www.ihk.de/karlsruhe/fachthemen/gruendung-wachstum-nachfolge/gruendung/fachkundige-stellungnahme-4843636" },
];

const GruendungszuschussCheck = () => {
  const [a, setA] = useState<GzAntworten>({
    algAnspruch: null,
    restTage: null,
    stunden: null,
    sperrzeit: null,
    schonGestartet: null,
    foerderungLetzte24: null,
    rentenalter: null,
    behinderung: false,
    eigenkuendigung: null,
  });
  const [alg, setAlg] = useState<number>(1500);
  const [phase2, setPhase2] = useState(true);
  const [erledigt, setErledigt] = useState<Record<string, boolean>>({});

  const ergebnis = useMemo(() => pruefeGruendungszuschuss(a), [a]);
  const rechnung = useMemo(() => rechneGruendungszuschuss(alg, a.restTage, phase2), [alg, a.restTage, phase2]);
  const setze = <K extends keyof GzAntworten>(k: K, v: GzAntworten[K]) => setA((x) => ({ ...x, [k]: v }));
  const zahl = (s: string) => (s.trim() === "" ? null : Math.max(0, Math.round(Number(s))));

  const AMPEL_TITEL = {
    gruen: "Voraussetzungen erfüllt",
    gelb: "Machbar, aber mit Risiko",
    rot: "So klappt es (noch) nicht",
    offen: "Noch nicht alle Fragen beantwortet",
  };

  return (
    <CockpitShell
      eyebrow="Gründungszuschuss · Rechtsstand Oktober 2026"
      title="Gründungszuschuss-Check: Anspruch, Höhe und Antrag"
      subtitle="Prüf in 2 Minuten, ob du den Gründungszuschuss der Arbeitsagentur bekommen kannst, wie viel es gibt und was du in welcher Reihenfolge einreichst, nach §§ 93, 94 SGB III und den Fachlichen Weisungen der BA."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <ToolSection title="Voraussetzungen prüfen" description="Schritt 1 von 3. Beantworte alle Fragen, die Ampel rechts aktualisiert sich sofort." icon={ListChecks}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="ALG-I-Resttage am geplanten Gründungstag" hint="Steht in deinem Bescheid bzw. im Online-Portal der Arbeitsagentur." htmlFor="gz-rest">
                <Input id="gz-rest" type="number" inputMode="numeric" min={0} placeholder="z. B. 240" onChange={(e) => setze("restTage", zahl(e.target.value))} />
              </Field>
              <Field label="Wochenstunden in der Selbstständigkeit" hint={`Mindestens ${GZ.mindestStunden} Std. = hauptberuflich.`} htmlFor="gz-stunden">
                <Input id="gz-stunden" type="number" inputMode="numeric" min={0} placeholder="z. B. 40" onChange={(e) => setze("stunden", zahl(e.target.value))} />
              </Field>
            </div>
            <div className="mt-4 divide-y divide-border/70 border-t border-border/70">
              {FRAGEN.map((f) => (
                <FrageZeile key={f.key} frage={f.frage} hilfe={f.hilfe} wert={a[f.key] as boolean | null} setze={(v) => setze(f.key, v)} />
              ))}
            </div>
          </ToolSection>
        }
        result={
          <>
            <AmpelErgebnis ampel={ergebnis.ampel} titel={AMPEL_TITEL} befunde={ergebnis.befunde} />

            <ResultPanel
              variant="ink"
              kicker="Schritt 2"
              title="So viel bekommst du"
              value={eur(rechnung.gesamt)}
              valueHint={phase2 ? "Phase 1 und Phase 2 zusammen, steuerfrei" : "nur Phase 1, steuerfrei"}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="gz-alg" className="mb-1.5 block text-sm font-medium text-primary-foreground">
                    Dein Arbeitslosengeld I pro Monat (€)
                  </label>
                  <Input
                    id="gz-alg"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={alg}
                    onChange={(e) => setAlg(Number(e.target.value) || 0)}
                    className="border-white/15 bg-white/10 text-primary-foreground"
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 accent-[hsl(var(--brand-green-glow))]" checked={phase2} onChange={(e) => setPhase2(e.target.checked)} /> Phase 2 einrechnen (9 × 300 €, Ermessen)
                </label>
                <div className="divide-y divide-white/10 border-y border-white/10 text-sm">
                  <div className="flex justify-between py-2.5">
                    <span>Phase 1: 6 × {eur(rechnung.phase1Monat)}</span>
                    <strong className="tabular">{eur(rechnung.phase1Summe)}</strong>
                  </div>
                  {phase2 && (
                    <div className="flex justify-between py-2.5">
                      <span>Phase 2: 9 × 300 €</span>
                      <strong className="tabular">{eur(rechnung.phase2Summe)}</strong>
                    </div>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-primary-foreground/70">
                  Steuerfrei (§ 3 Nr. 2a EStG). Phase 1 verbraucht {GZ.tageVerbrauchPhase1} Tage deines ALG-I-Anspruchs
                  {rechnung.restNachPhase1 !== null && <>, danach bleiben dir noch {rechnung.restNachPhase1} Tage</>}. Die 300 € sind
                  für deine soziale Absicherung gedacht.
                </p>
              </div>
            </ResultPanel>
          </>
        }
      />

      {/* Ablauf */}
      <ToolSection title="Die richtige Reihenfolge" description="Schritt 3. Wer die Reihenfolge verwechselt, verliert den Anspruch." icon={Route} className="mb-6">
        <ol className="space-y-4 text-sm">
          {[
            <>
              <strong className="text-foreground">Beratungstermin bei deiner Vermittlungsfachkraft</strong>: sag früh, dass du gründen willst (Tel. 0800 4 555500).
              Noch nichts mit Außenwirkung tun.
            </>,
            <>
              <strong className="text-foreground">Unterlagen erstellen</strong> (Checkliste unten) und bei einer <strong className="text-foreground">fachkundigen Stelle</strong> die
              Tragfähigkeit bestätigen lassen: Formular{" "}
              <a className="font-medium text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.arbeitsagentur.de/datei/gruendungszuschuss-gz-stellungnahme-fachkundige-stelle_ba053733.pdf">
                GZ 04
              </a>
              , dazu das{" "}
              <a className="font-medium text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.arbeitsagentur.de/datei/gruendungszuschuss-gz-musteranschreiben-an-fachkundige-stelle_ba053738.pdf">
                Musteranschreiben
              </a>
              .
            </>,
            <>
              <strong className="text-foreground">Online-Antrag Phase 1 stellen, vor dem Start</strong>:{" "}
              <a className="font-medium text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://web.arbeitsagentur.de/gzo/gzo-ui/pd/gzo-phase1">
                Antrag Phase 1
              </a>
              . Fehlende Unterlagen kannst du nachreichen.
            </>,
            <>
              <strong className="text-foreground">Gewerbe anmelden bzw. beim Finanzamt anzeigen</strong> und starten. Innerhalb von <strong className="text-foreground">3 Monaten</strong>{" "}
              die freiwillige Arbeitslosenversicherung (Antragspflichtversicherung) beantragen, danach ist die Frist weg.
            </>,
            <>
              <strong className="text-foreground">Nach 6 Monaten Phase 2 beantragen</strong>:{" "}
              <a className="font-medium text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://web.arbeitsagentur.de/gzo/gzo-ui/pd/gzo-phase2">
                Antrag Phase 2
              </a>{" "}
              mit einem kurzen Bericht über Aktivitäten, Einnahmen und Ausgaben. Wer schon gut verdient, bekommt Phase 2 meist nicht.
            </>,
          ].map((st, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold tabular shadow-card">
                {i + 1}
              </span>
              <span className="pt-1 leading-relaxed text-foreground/80">{st}</span>
            </li>
          ))}
        </ol>
      </ToolSection>

      {/* Checkliste */}
      <ToolSection
        title="Unterlagen-Checkliste"
        icon={ClipboardCheck}
        className="mb-6"
        actions={
          <ToneBadge tone={Object.values(erledigt).filter(Boolean).length === UNTERLAGEN.length ? "success" : "neutral"}>
            {Object.values(erledigt).filter(Boolean).length} / {UNTERLAGEN.length} erledigt
          </ToneBadge>
        }
        bodyClassName="p-0"
      >
        <ul className="divide-y divide-border/70">
          {UNTERLAGEN.map((u) => (
            <li key={u.titel} className="flex items-start gap-3 px-5 py-3.5 text-sm md:px-6">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
                checked={!!erledigt[u.titel]}
                onChange={(e) => setErledigt((x) => ({ ...x, [u.titel]: e.target.checked }))}
                aria-label={u.titel}
              />
              <div>
                <div className={erledigt[u.titel] ? "text-muted-foreground line-through" : "font-medium"}>{u.titel}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {u.hilfe}
                  {u.link && (
                    <>
                      {" · "}
                      <Link to={u.link.to} className="font-medium text-accent-blue hover:underline">
                        {u.link.label}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ToolSection>

      {/* Fachkundige Stelle */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ToolSection title="Wer stellt die Tragfähigkeitsbescheinigung aus?" icon={Building2}>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Du wählst frei: IHK, Handwerkskammer, berufsständische Kammern, Fachverbände, Banken, Steuerberater,
            Wirtschaftsprüfer, Gründungsberater und Gründungszentren. Die Kosten trägst du selbst. Beispiele aus IHKs:
          </p>
          <ul className="divide-y divide-border/70 rounded-xl border border-border text-sm">
            {IHK_GEBUEHREN.map((g) => (
              <li key={g.ihk} className="flex justify-between gap-3 px-3.5 py-2.5">
                <a href={g.url} target="_blank" rel="noreferrer noopener" className="font-medium text-accent-blue hover:underline">
                  {g.ihk}
                </a>
                <span className="text-right">
                  <strong className="tabular">{g.preis}</strong>
                  {g.hinweis && <span className="block text-xs text-muted-foreground">{g.hinweis}</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Tipp: Viele IHKs erklären den Antrag auch auf ihren Gründerabenden:{" "}
            <Link to="/gruender-events" className="font-medium text-accent-blue hover:underline">
              Termine in deiner Nähe
            </Link>
            .
          </p>
        </ToolSection>

        <Callout tone="danger" title="Die häufigsten Ablehnungsgründe" className="self-start p-5">
          <ul className="mt-1 list-disc space-y-1.5 pl-4">
            <li>Antrag erst nach dem Start oder nach Miete/Wareneinkauf gestellt</li>
            <li>Weniger als 150 Resttage am Gründungstag oder mehr als 1 Monat Lücke nach dem ALG-Bezug</li>
            <li>Selbst gekündigt nur für die Gründung</li>
            <li>Zu optimistische, unbelegte Umsätze; Liquiditätsplan fehlt oder ist zu knapp</li>
            <li>Eigene Mittel decken den Bedarf ohnehin (z. B. hohe Abfindung); allein Vermögen darf aber kein Ablehnungsgrund sein</li>
            <li>Übernahme eines eingeführten Betriebs mit Kundenstamm</li>
          </ul>
          <p className="mt-3 text-xs">Bei Ablehnung: Widerspruch prüfen. Die Entscheidung muss dokumentiert und ermessensfehlerfrei sein.</p>
        </Callout>
      </div>

      {/* Alternativen */}
      <ToolSection title="Passt nicht? Diese Wege gibt es auch" icon={Signpost} className="mb-6">
        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <div className="font-semibold">Einstiegsgeld (§ 16b SGB II)</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Für Bezieher von Grundsicherungsgeld (bis 30.06.2026 „Bürgergeld“): bis zu 24 Monate, Grundbetrag bis 50 %
              des Regelbedarfs plus Zuschläge, Ermessen. Zusätzlich bis 5.000 € Zuschuss für Sachgüter (§ 16c).{" "}
              <a className="font-medium text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld/arbeit-finden/einstiegsgeld-fuer-selbststaendigkeit">
                Details
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <div className="font-semibold">Nebenbei gründen, ALG I behalten</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Unter 15 Std./Woche bleibst du arbeitslos. Vom Gewinn bleiben 165 € im Monat anrechnungsfrei; als Ausgaben
              werden pauschal 30 % der Einnahmen abgezogen (§§ 138, 155 SGB III).
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <div className="font-semibold">BAFA-Beratungsförderung</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              „Förderung unternehmerischen Know-hows“: 50 % von bis zu 3.500 € Beratungskosten in den alten Bundesländern,
              Anträge bis 31.12.2026. Für Jungunternehmen ist vorher ein Informationsgespräch Pflicht.{" "}
              <a className="font-medium text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Unternehmensberatung/unternehmensberatung_node.html">
                BAFA
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <div className="font-semibold">Stipendien & Wettbewerbe</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              EXIST, Berliner Startup Stipendium, InnoFounder und Businessplan-Wettbewerbe mit Preisgeld ; alle Fristen im{" "}
              <Link to="/gruender-events" className="font-medium text-accent-blue hover:underline">
                Fristen-Radar
              </Link>{" "}
              und in der{" "}
              <Link to="/cockpit/foerderung" className="font-medium text-accent-blue hover:underline">
                Förder-Datenbank
              </Link>
              .
            </p>
          </div>
        </div>
      </ToolSection>

      <Callout tone="warning" title="Rechtsstand 07.10.2026" className="text-xs"> §§ 93, 94, 324 SGB III in der Fassung vom 24.07.2026 und Fachliche Weisungen
        Gründungszuschuss der BA (Stand 13.09.2023). Die 2024 geplante Senkung auf 90 Resttage und eine einzige Förderphase
        ist nicht Gesetz geworden. Der Check ersetzt keine Beratung; entscheidend ist das Gespräch mit deiner
        Arbeitsagentur.{" "}
        <a href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/gruendungszuschuss-beantragen" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-0.5 font-medium text-accent-blue hover:underline">
          Offizielle Seite der Arbeitsagentur <ExternalLink className="h-3 w-3" />
        </a>
      </Callout>
    </CockpitShell>
  );
};

export default GruendungszuschussCheck;
