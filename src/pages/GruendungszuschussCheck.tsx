import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, XCircle, AlertTriangle, HelpCircle } from "lucide-react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const JaNein = ({ wert, setze }: { wert: boolean | null; setze: (v: boolean) => void }) => (
  <div className="flex gap-1.5 shrink-0">
    {[true, false].map((v) => (
      <button
        key={String(v)}
        onClick={() => setze(v)}
        className={`rounded-md px-3 py-1.5 text-xs font-semibold border transition-colors ${
          wert === v ? "bg-accent-blue text-primary-foreground border-accent-blue" : "border-border bg-background hover:bg-secondary"
        }`}
      >
        {v ? "Ja" : "Nein"}
      </button>
    ))}
  </div>
);

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

  const AMPEL = {
    gruen: { text: "Voraussetzungen erfüllt", farbe: "border-emerald-500/40 bg-emerald-500/5 text-emerald-700", Icon: CheckCircle2 },
    gelb: { text: "Machbar – aber mit Risiko", farbe: "border-amber-500/40 bg-amber-500/5 text-amber-700", Icon: AlertTriangle },
    rot: { text: "So klappt es (noch) nicht", farbe: "border-red-500/40 bg-red-500/5 text-red-700", Icon: XCircle },
    offen: { text: "Noch nicht alle Fragen beantwortet", farbe: "border-border bg-secondary/40 text-muted-foreground", Icon: HelpCircle },
  }[ergebnis.ampel];

  return (
    <CockpitShell
      eyebrow="Gründungszuschuss · Rechtsstand Oktober 2026"
      title="Gründungszuschuss-Check: Anspruch, Höhe & Antrag"
      subtitle="Prüf in 2 Minuten, ob du den Gründungszuschuss der Arbeitsagentur bekommen kannst, wie viel es gibt und was du in welcher Reihenfolge einreichst – nach §§ 93, 94 SGB III und den Fachlichen Weisungen der BA."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-8">
        {/* Fragen */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-bold">1. Voraussetzungen prüfen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">ALG-I-Resttage am geplanten Gründungstag</Label>
              <Input type="number" min={0} placeholder="z. B. 240" className="mt-1" onChange={(e) => setze("restTage", zahl(e.target.value))} />
              <p className="text-[11px] text-muted-foreground mt-1">Steht in deinem Bescheid bzw. im Online-Portal der Arbeitsagentur.</p>
            </div>
            <div>
              <Label className="text-xs">Wochenstunden in der Selbstständigkeit</Label>
              <Input type="number" min={0} placeholder="z. B. 40" className="mt-1" onChange={(e) => setze("stunden", zahl(e.target.value))} />
              <p className="text-[11px] text-muted-foreground mt-1">Mindestens {GZ.mindestStunden} Std. = hauptberuflich.</p>
            </div>
          </div>
          <div className="divide-y divide-border">
            {FRAGEN.map((f) => (
              <div key={f.key} className="flex items-start justify-between gap-3 py-3">
                <div className="text-sm">
                  {f.frage}
                  {f.hilfe && <div className="text-[11px] text-muted-foreground mt-0.5">{f.hilfe}</div>}
                </div>
                <JaNein wert={a[f.key] as boolean | null} setze={(v) => setze(f.key, v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Ergebnis */}
        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className={`rounded-2xl border p-5 ${AMPEL.farbe}`}>
            <div className="flex items-center gap-2 font-bold">
              <AMPEL.Icon className="h-5 w-5" /> {AMPEL.text}
            </div>
            <ul className="mt-3 space-y-2 text-xs text-foreground">
              {ergebnis.befunde.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0">{b.stufe === "ok" ? "✅" : b.stufe === "warnung" ? "⚠️" : "⛔"}</span>
                  <span>
                    {b.text} <span className="text-muted-foreground">({b.quelle})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <h2 className="font-bold mb-3">2. So viel bekommst du</h2>
            <Label className="text-xs">Dein Arbeitslosengeld I pro Monat</Label>
            <Input type="number" min={0} value={alg} onChange={(e) => setAlg(Number(e.target.value) || 0)} className="mt-1 bg-background" />
            <label className="flex items-center gap-2 text-xs mt-3 cursor-pointer">
              <input type="checkbox" checked={phase2} onChange={(e) => setPhase2(e.target.checked)} /> Phase 2 einrechnen (9 × 300 €, Ermessen)
            </label>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span>Phase 1: 6 × {eur(rechnung.phase1Monat)}</span>
                <strong>{eur(rechnung.phase1Summe)}</strong>
              </div>
              {phase2 && (
                <div className="flex justify-between">
                  <span>Phase 2: 9 × 300 €</span>
                  <strong>{eur(rechnung.phase2Summe)}</strong>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-1.5 text-base">
                <span className="font-semibold">Gesamt</span>
                <strong>{eur(rechnung.gesamt)}</strong>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              Steuerfrei (§ 3 Nr. 2a EStG). Phase 1 verbraucht {GZ.tageVerbrauchPhase1} Tage deines ALG-I-Anspruchs
              {rechnung.restNachPhase1 !== null && <> – danach bleiben dir noch {rechnung.restNachPhase1} Tage</>}. Die 300 € sind
              für deine soziale Absicherung gedacht.
            </p>
          </div>
        </div>
      </div>

      {/* Ablauf */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-bold mb-3">3. Die richtige Reihenfolge</h2>
        <ol className="space-y-3 text-sm">
          {[
            <>
              <strong>Beratungstermin bei deiner Vermittlungsfachkraft</strong> – sag früh, dass du gründen willst (Tel. 0800 4 555500).
              Noch nichts mit Außenwirkung tun.
            </>,
            <>
              <strong>Unterlagen erstellen</strong> (Checkliste unten) und bei einer <strong>fachkundigen Stelle</strong> die
              Tragfähigkeit bestätigen lassen – Formular{" "}
              <a className="text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.arbeitsagentur.de/datei/gruendungszuschuss-gz-stellungnahme-fachkundige-stelle_ba053733.pdf">
                GZ 04
              </a>
              , dazu das{" "}
              <a className="text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.arbeitsagentur.de/datei/gruendungszuschuss-gz-musteranschreiben-an-fachkundige-stelle_ba053738.pdf">
                Musteranschreiben
              </a>
              .
            </>,
            <>
              <strong>Online-Antrag Phase 1 stellen – vor dem Start</strong>:{" "}
              <a className="text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://web.arbeitsagentur.de/gzo/gzo-ui/pd/gzo-phase1">
                Antrag Phase 1
              </a>
              . Fehlende Unterlagen kannst du nachreichen.
            </>,
            <>
              <strong>Gewerbe anmelden bzw. beim Finanzamt anzeigen</strong> und starten. Innerhalb von <strong>3 Monaten</strong>{" "}
              die freiwillige Arbeitslosenversicherung (Antragspflichtversicherung) beantragen – danach ist die Frist weg.
            </>,
            <>
              <strong>Nach 6 Monaten Phase 2 beantragen</strong>:{" "}
              <a className="text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://web.arbeitsagentur.de/gzo/gzo-ui/pd/gzo-phase2">
                Antrag Phase 2
              </a>{" "}
              mit einem kurzen Bericht über Aktivitäten, Einnahmen und Ausgaben. Wer schon gut verdient, bekommt Phase 2 meist nicht.
            </>,
          ].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue text-primary-foreground text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Checkliste */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <h2 className="font-bold">4. Unterlagen-Checkliste</h2>
          <span className="text-xs text-muted-foreground">
            {Object.values(erledigt).filter(Boolean).length} / {UNTERLAGEN.length} erledigt
          </span>
        </div>
        <ul className="space-y-2">
          {UNTERLAGEN.map((u) => (
            <li key={u.titel} className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={!!erledigt[u.titel]}
                onChange={(e) => setErledigt((x) => ({ ...x, [u.titel]: e.target.checked }))}
                aria-label={u.titel}
              />
              <div>
                <div className={erledigt[u.titel] ? "line-through text-muted-foreground" : "font-medium"}>{u.titel}</div>
                <div className="text-xs text-muted-foreground">
                  {u.hilfe}
                  {u.link && (
                    <>
                      {" · "}
                      <Link to={u.link.to} className="text-accent-blue hover:underline">
                        {u.link.label}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fachkundige Stelle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold mb-2">Wer stellt die Tragfähigkeitsbescheinigung aus?</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Du wählst frei: IHK, Handwerkskammer, berufsständische Kammern, Fachverbände, Banken, Steuerberater,
            Wirtschaftsprüfer, Gründungsberater und Gründungszentren. Die Kosten trägst du selbst. Beispiele aus IHKs:
          </p>
          <ul className="space-y-1.5 text-sm">
            {IHK_GEBUEHREN.map((g) => (
              <li key={g.ihk} className="flex justify-between gap-3">
                <a href={g.url} target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline">
                  {g.ihk}
                </a>
                <span className="text-right">
                  <strong>{g.preis}</strong>
                  {g.hinweis && <span className="block text-[11px] text-muted-foreground">{g.hinweis}</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Tipp: Viele IHKs erklären den Antrag auch auf ihren Gründerabenden –{" "}
            <Link to="/gruender-events" className="text-accent-blue hover:underline">
              Termine in deiner Nähe
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h2 className="font-bold mb-2">Die häufigsten Ablehnungsgründe</h2>
          <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
            <li>Antrag erst nach dem Start oder nach Miete/Wareneinkauf gestellt</li>
            <li>Weniger als 150 Resttage am Gründungstag – oder mehr als 1 Monat Lücke nach dem ALG-Bezug</li>
            <li>Selbst gekündigt nur für die Gründung</li>
            <li>Zu optimistische, unbelegte Umsätze; Liquiditätsplan fehlt oder ist zu knapp</li>
            <li>Eigene Mittel decken den Bedarf ohnehin (z. B. hohe Abfindung) – allein Vermögen darf aber kein Ablehnungsgrund sein</li>
            <li>Übernahme eines eingeführten Betriebs mit Kundenstamm</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Bei Ablehnung: Widerspruch prüfen – die Entscheidung muss dokumentiert und ermessensfehlerfrei sein.
          </p>
        </div>
      </div>

      {/* Alternativen */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-bold mb-3">Passt nicht? Diese Wege gibt es auch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold">Einstiegsgeld (§ 16b SGB II)</div>
            <p className="text-muted-foreground text-xs mt-1">
              Für Bezieher von Grundsicherungsgeld (bis 30.06.2026 „Bürgergeld“): bis zu 24 Monate, Grundbetrag bis 50 %
              des Regelbedarfs plus Zuschläge, Ermessen. Zusätzlich bis 5.000 € Zuschuss für Sachgüter (§ 16c).{" "}
              <a className="text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld/arbeit-finden/einstiegsgeld-fuer-selbststaendigkeit">
                Details
              </a>
            </p>
          </div>
          <div>
            <div className="font-semibold">Nebenbei gründen, ALG I behalten</div>
            <p className="text-muted-foreground text-xs mt-1">
              Unter 15 Std./Woche bleibst du arbeitslos. Vom Gewinn bleiben 165 € im Monat anrechnungsfrei; als Ausgaben
              werden pauschal 30 % der Einnahmen abgezogen (§§ 138, 155 SGB III).
            </p>
          </div>
          <div>
            <div className="font-semibold">BAFA-Beratungsförderung</div>
            <p className="text-muted-foreground text-xs mt-1">
              „Förderung unternehmerischen Know-hows“: 50 % von bis zu 3.500 € Beratungskosten in den alten Bundesländern,
              Anträge bis 31.12.2026. Für Jungunternehmen ist vorher ein Informationsgespräch Pflicht.{" "}
              <a className="text-accent-blue hover:underline" target="_blank" rel="noreferrer noopener" href="https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Unternehmensberatung/unternehmensberatung_node.html">
                BAFA
              </a>
            </p>
          </div>
          <div>
            <div className="font-semibold">Stipendien & Wettbewerbe</div>
            <p className="text-muted-foreground text-xs mt-1">
              EXIST, Berliner Startup Stipendium, InnoFounder und Businessplan-Wettbewerbe mit Preisgeld – alle Fristen im{" "}
              <Link to="/gruender-events" className="text-accent-blue hover:underline">
                Fristen-Radar
              </Link>{" "}
              und in der{" "}
              <Link to="/cockpit/foerderung" className="text-accent-blue hover:underline">
                Förder-Datenbank
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <strong>Rechtsstand 07.10.2026:</strong> §§ 93, 94, 324 SGB III in der Fassung vom 24.07.2026 und Fachliche Weisungen
        Gründungszuschuss der BA (Stand 13.09.2023). Die 2024 geplante Senkung auf 90 Resttage und eine einzige Förderphase
        ist nicht Gesetz geworden. Der Check ersetzt keine Beratung – entscheidend ist das Gespräch mit deiner
        Arbeitsagentur.{" "}
        <a href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/gruendungszuschuss-beantragen" target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline inline-flex items-center gap-0.5">
          Offizielle Seite der Arbeitsagentur <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </CockpitShell>
  );
};

export default GruendungszuschussCheck;
