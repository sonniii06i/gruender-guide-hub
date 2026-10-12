/**
 * ShopProfitRechner — "Was bleibt bei einer Bestellung im eigenen Shop übrig?"
 *
 * Für den eigenen Onlineshop (kein Marktplatz — dafür gibt es den
 * Marge-Tracker). Der Unterschied zu jedem Netto-Rechner: Hier wird brutto
 * eingegeben, wie es auf Einkaufs- und Verkaufsbeleg steht, und das Tool
 * rechnet die Umsatzsteuer selbst heraus.
 *
 * Anfänger-Fehler, die das Tool fixt:
 *  1. EK brutto gegen VK brutto rechnen — die 19 % im Einkauf sind Vorsteuer
 *     und damit kein Kostenblock, die 19 % im Verkauf gehören dem Finanzamt.
 *  2. PayPal-Gebühr netto rechnen: Zahlungsgebühren sind nach § 4 Nr. 8 UStG
 *     umsatzsteuerfrei — es gibt keine Vorsteuer, sie kosten voll.
 *  3. Werbung als Monatsbudget sehen statt je Bestellung. Bei 0,51 € Klickpreis
 *     und 2 % Conversion-Rate stecken 25,50 € Werbung in JEDER Bestellung.
 *  4. Break-even nicht kennen: Die entscheidende Zahl ist, wie viele Klicks
 *     eine Bestellung tragen kann, bevor der Deckungsbeitrag aufgebraucht ist.
 */
import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import Stand2026Footer from "@/components/cockpit/Stand2026Footer";
import { NumberField } from "@/components/ui/number-field";
import { Callout, ChoiceGroup, Field, ResultPanel, ResultRow, StatGrid, StatTile, ToolLayout, ToolSection } from "@/components/cockpit/kit";
import {
  ShoppingCart,
  Truck,
  MousePointerClick,
  Receipt,
  Target,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

const UST_SAETZE = [19, 7, 0];

const ShopProfitRechner = () => {
  // Einkauf
  const [ekBrutto, setEkBrutto] = useState(12.9);
  const [ekUst, setEkUst] = useState(19);
  const [sonstBrutto, setSonstBrutto] = useState(0.6);
  const [sonstVorsteuer, setSonstVorsteuer] = useState(true);
  // Verkauf
  const [vkBrutto, setVkBrutto] = useState(39.9);
  const [vkUst, setVkUst] = useState(19);
  const [versandKunde, setVersandKunde] = useState(0);
  // Versand & Zahlung
  const [versandKosten, setVersandKosten] = useState(4.5);
  const [versandVorsteuer, setVersandVorsteuer] = useState(true);
  const [ppProzent, setPpProzent] = useState(2.49);
  const [ppFix, setPpFix] = useState(0.35);
  const [ppQuote, setPpQuote] = useState(100);
  // Werbung
  const [cpc, setCpc] = useState(0.51);
  const [modus, setModus] = useState<"cr" | "klicks">("cr");
  const [conversionRate, setConversionRate] = useState(2);
  const [klicksJeVerkauf, setKlicksJeVerkauf] = useState(50);
  const [organischProzent, setOrganischProzent] = useState(0);

  const calc = useMemo(() => {
    const bruttoUmsatz = vkBrutto + versandKunde;
    const nettoErloes = bruttoUmsatz / (1 + vkUst / 100);
    const ustVerkauf = bruttoUmsatz - nettoErloes;

    const ekNetto = ekBrutto / (1 + ekUst / 100);
    const versandNetto = versandVorsteuer ? versandKosten / 1.19 : versandKosten;
    const sonstNetto = sonstVorsteuer ? sonstBrutto / 1.19 : sonstBrutto;

    const paypal = (bruttoUmsatz * (ppProzent / 100) + ppFix) * (ppQuote / 100);

    // Klicks je Verkauf: aus Conversion-Rate abgeleitet oder direkt gesetzt.
    const klicks = modus === "cr" ? (conversionRate > 0 ? 100 / conversionRate : 0) : klicksJeVerkauf;
    const bezahlterAnteil = 1 - organischProzent / 100;
    const werbung = cpc * klicks * bezahlterAnteil;

    const db1 = nettoErloes - ekNetto - versandNetto - paypal - sonstNetto;
    const gewinn = db1 - werbung;

    // Vorsteuer aus allen Kostenbelegen (Werbung: Google/Meta rechnen mit 19 %).
    const vorsteuer =
      (ekBrutto - ekNetto) +
      (versandKosten - versandNetto) +
      (sonstBrutto - sonstNetto) +
      werbung * 0.19;

    // Break-even: was die Werbung maximal kosten darf, bevor die Null steht.
    const wirksam = cpc * bezahlterAnteil;
    const maxKlicks = wirksam > 0 ? db1 / wirksam : 0;
    const minCr = maxKlicks > 0 ? 100 / maxKlicks : 0;
    const maxCpc = klicks > 0 && bezahlterAnteil > 0 ? db1 / (klicks * bezahlterAnteil) : 0;
    const minRoas = db1 > 0 ? bruttoUmsatz / db1 : 0;

    return {
      bruttoUmsatz, nettoErloes, ustVerkauf, ekNetto, versandNetto, sonstNetto,
      paypal, klicks, werbung, db1, gewinn,
      zahllast: ustVerkauf - vorsteuer,
      marge: nettoErloes > 0 ? (gewinn / nettoErloes) * 100 : 0,
      aufschlag: ekNetto > 0 ? nettoErloes / ekNetto : 0,
      roas: werbung > 0 ? bruttoUmsatz / werbung : null,
      maxKlicks, minCr, maxCpc, minRoas,
    };
  }, [
    ekBrutto, ekUst, sonstBrutto, sonstVorsteuer, vkBrutto, vkUst, versandKunde,
    versandKosten, versandVorsteuer, ppProzent, ppFix, ppQuote,
    cpc, modus, conversionRate, klicksJeVerkauf, organischProzent,
  ]);

  const eur = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  const dez = (n: number, d = 1) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });

  // Wechsel der Eingabe-Art: Werte ineinander umrechnen, damit nichts springt.
  const wechsleModus = (ziel: "cr" | "klicks") => {
    if (ziel === modus) return;
    if (ziel === "klicks" && conversionRate > 0) setKlicksJeVerkauf(Math.round((100 / conversionRate) * 10) / 10);
    if (ziel === "cr" && klicksJeVerkauf > 0) setConversionRate(Math.round((100 / klicksJeVerkauf) * 100) / 100);
    setModus(ziel);
  };

  const verteilung = [
    { label: "Ware", wert: calc.ekNetto, klasse: "bg-primary/75" },
    { label: "Versand", wert: calc.versandNetto, klasse: "bg-info" },
    { label: "PayPal", wert: calc.paypal, klasse: "bg-warning" },
    { label: "Sonstiges", wert: calc.sonstNetto, klasse: "bg-muted-foreground/45" },
    { label: "Werbung", wert: calc.werbung, klasse: "bg-accent-blue" },
    { label: "Gewinn", wert: Math.max(calc.gewinn, 0), klasse: "bg-success" },
  ].filter((t) => t.wert > 0 && calc.nettoErloes > 0);

  const checkCls = "h-4 w-4 shrink-0 accent-[hsl(var(--primary))]";

  return (
    <CockpitShell
      eyebrow="Buchhaltung & Reporting"
      title="Shop-Profit-Rechner für den eigenen Onlineshop"
      subtitle="Einkaufs- und Verkaufspreis brutto eingeben, das Tool zieht Vorsteuer und Umsatzsteuer heraus und rechnet Versand, PayPal-Gebühren und Klickkosten gegen. Am Ende steht, was je Bestellung wirklich übrig bleibt und wie viele Klicks eine Bestellung tragen kann."
    >
      <Callout tone="neutral" className="mb-6">
        Die Felder sind mit <strong className="text-foreground">Beispielwerten</strong> vorbelegt (12,90 € Einkauf · 39,90 € Verkauf · 2 %
        Conversion-Rate). Überschreib sie mit deinen Zahlen, alles rechnet sich sofort neu.
      </Callout>

      <ToolLayout
        className="mb-8"
        inputs={
          <>
            <ToolSection title="1. Einkauf" description="Du ziehst die Vorsteuer." icon={ShoppingCart}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Einkaufspreis brutto (€)" hint="So wie er auf der Lieferantenrechnung steht, inkl. USt.">
                  <NumberField step="0.01" value={ekBrutto} onChange={setEkBrutto} min={0} aria-label="Einkaufspreis brutto in Euro" />
                </Field>
                <Field label="USt im Einkauf" hint="0 % bei Import/IGL oder als Kleinunternehmer.">
                  <ChoiceGroup<number>
                    label="USt im Einkauf"
                    size="sm"
                    value={ekUst}
                    onChange={setEkUst}
                    options={UST_SAETZE.map((s) => ({ value: s, label: `${s} %` }))}
                  />
                </Field>
                <Field label="Verpackung und Sonstiges (€ brutto)" className="sm:col-span-2">
                  <NumberField step="0.01" value={sonstBrutto} onChange={setSonstBrutto} min={0} aria-label="Verpackung und Sonstiges brutto in Euro" />
                  <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" checked={sonstVorsteuer} onChange={(e) => setSonstVorsteuer(e.target.checked)} className={checkCls} />
                    enthält 19 % USt (Vorsteuer ziehbar)
                  </label>
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="2. Verkauf" description="Die USt gehört dem Finanzamt." icon={Receipt}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Verkaufspreis brutto (€)" hint="Der Preis, den der Kunde im Shop sieht.">
                  <NumberField step="0.01" value={vkBrutto} onChange={setVkBrutto} min={0} aria-label="Verkaufspreis brutto in Euro" />
                </Field>
                <Field label="USt im Verkauf" hint="7 % z. B. Bücher und Lebensmittel, 0 % als Kleinunternehmer (§ 19).">
                  <ChoiceGroup<number>
                    label="USt im Verkauf"
                    size="sm"
                    value={vkUst}
                    onChange={setVkUst}
                    options={UST_SAETZE.map((s) => ({ value: s, label: `${s} %` }))}
                  />
                </Field>
                <Field
                  label="Versandpauschale vom Kunden (€ brutto)"
                  hint="0 bei Gratisversand. Zählt zum Umsatz und wird mitversteuert."
                  className="sm:col-span-2"
                >
                  <NumberField step="0.01" value={versandKunde} onChange={setVersandKunde} min={0} aria-label="Versandpauschale vom Kunden in Euro" />
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="3. Versand und Zahlungsgebühren" icon={Truck}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Deine Versandkosten (€ brutto)">
                  <NumberField step="0.01" value={versandKosten} onChange={setVersandKosten} min={0} aria-label="Versandkosten brutto in Euro" />
                  <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" checked={versandVorsteuer} onChange={(e) => setVersandVorsteuer(e.target.checked)} className={checkCls} />
                    enthält 19 % USt
                  </label>
                </Field>
                <Field label="PayPal prozentual (%)" hint="Inland-Standard 2,49 %, auf den Bruttoumsatz inkl. Versand.">
                  <NumberField step="0.01" value={ppProzent} onChange={setPpProzent} min={0} max={20} aria-label="PayPal-Gebühr in Prozent" />
                </Field>
                <Field label="PayPal fix (€ je Transaktion)" hint="0,35 € Inland. Gebühren sind USt-frei, also keine Vorsteuer.">
                  <NumberField step="0.01" value={ppFix} onChange={setPpFix} min={0} aria-label="PayPal-Fixgebühr in Euro" />
                </Field>
                <Field label="Anteil PayPal-Zahler (%)" hint="100 = jede Bestellung. Bei Mix mit Kauf auf Rechnung o. ä. senken.">
                  <NumberField step="1" value={ppQuote} onChange={setPpQuote} min={0} max={100} aria-label="Anteil PayPal-Zahler in Prozent" />
                </Field>
              </div>
            </ToolSection>

            <ToolSection title="4. Klickkosten" icon={MousePointerClick}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Klickpreis netto (€)" hint="Google und Meta rechnen mit USt ab, hier netto eintragen.">
                  <NumberField step="0.01" value={cpc} onChange={setCpc} min={0} aria-label="Klickpreis netto in Euro" />
                </Field>
                <Field
                  label="Organisch oder ohne Klick (%)"
                  hint="Bestellungen ohne bezahlten Klick (SEO, Direkt, Stammkunden) senken die Werbekosten anteilig."
                >
                  <NumberField step="1" value={organischProzent} onChange={setOrganischProzent} min={0} max={100} aria-label="Anteil organischer Bestellungen in Prozent" />
                </Field>
                <Field
                  label="Eingabe über"
                  className="sm:col-span-2"
                  hint={
                    modus === "cr"
                      ? `${dez(calc.klicks)} Klicks je Verkauf · Shop-Schnitt liegt bei 1 bis 3 %`
                      : `entspricht ${dez(100 / Math.max(klicksJeVerkauf, 0.0001), 2)} % Conversion-Rate`
                  }
                >
                  <ChoiceGroup<"cr" | "klicks">
                    label="Eingabe über"
                    size="sm"
                    value={modus}
                    onChange={wechsleModus}
                    options={[
                      { value: "cr", label: "Conversion-Rate (%)" },
                      { value: "klicks", label: "Klicks je Verkauf" },
                    ]}
                  />
                  <div className="mt-2">
                    {modus === "cr" ? (
                      <NumberField step="0.1" value={conversionRate} onChange={setConversionRate} min={0.01} max={100} aria-label="Conversion-Rate in Prozent" />
                    ) : (
                      <NumberField step="1" value={klicksJeVerkauf} onChange={setKlicksJeVerkauf} min={0} aria-label="Klicks je Verkauf" />
                    )}
                  </div>
                </Field>
              </div>
              <div className="mt-4 rounded-xl bg-secondary/60 px-4 py-3 text-sm tabular">
                {dez(calc.klicks)} Klicks × {eur(cpc)}
                {organischProzent > 0 && ` × ${100 - organischProzent} % bezahlt`} = <strong className="font-semibold">{eur(calc.werbung)}</strong>{" "}
                Werbung je Bestellung
              </div>
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Gewinn je Bestellung (netto)"
              title={calc.gewinn >= 0 ? "Die Bestellung trägt sich" : "Jede Bestellung kostet dich Geld"}
              value={`${calc.gewinn >= 0 ? "" : "−"}${eur(Math.abs(calc.gewinn))}`}
              valueHint={`${dez(calc.marge)} % Nettomarge`}
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[
                  { l: "Aufschlag auf EK", v: `${dez(calc.aufschlag, 2)}×` },
                  { l: "ROAS", v: calc.roas === null ? "keine Werbung" : dez(calc.roas, 2) },
                  { l: "Deckungsbeitrag vor Werbung", v: eur(calc.db1) },
                  { l: "USt-Zahllast", v: eur(calc.zahllast) },
                ].map((k) => (
                  <div key={k.l} className="bg-white/[0.04] p-3">
                    <div className="text-xs text-primary-foreground/65">{k.l}</div>
                    <div className="mt-0.5 font-semibold text-primary-foreground tabular">{k.v}</div>
                  </div>
                ))}
              </div>
            </ResultPanel>

            <ResultPanel title="Rechenweg je Bestellung">
              <div className="divide-y divide-border/70">
                <ResultRow label="Bruttoumsatz (VK + Versandpauschale)" value={eur(calc.bruttoUmsatz)} />
                <ResultRow label={`./. Umsatzsteuer ${vkUst} %`} value={`− ${eur(calc.ustVerkauf)}`} />
                <ResultRow label="Nettoerlös" value={eur(calc.nettoErloes)} strong />
                <ResultRow label="./. Wareneinsatz netto" value={`− ${eur(calc.ekNetto)}`} />
                <ResultRow label="./. Versand netto" value={`− ${eur(calc.versandNetto)}`} />
                <ResultRow label="./. PayPal-Gebühr (ohne Vorsteuer)" value={`− ${eur(calc.paypal)}`} />
                <ResultRow label="./. Verpackung und Sonstiges netto" value={`− ${eur(calc.sonstNetto)}`} />
                <ResultRow label="Deckungsbeitrag vor Werbung" value={eur(calc.db1)} strong />
                <ResultRow label="./. Werbekosten netto" value={`− ${eur(calc.werbung)}`} />
                <ResultRow
                  label="Gewinn je Bestellung"
                  value={eur(calc.gewinn)}
                  strong
                  tone={calc.gewinn >= 0 ? "success" : "danger"}
                />
              </div>

              {verteilung.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium">Wohin der Nettoerlös geht</p>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-secondary">
                    {verteilung.map((t) => (
                      <div key={t.label} className={t.klasse} style={{ width: `${(t.wert / calc.nettoErloes) * 100}%` }} />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground tabular">
                    {verteilung.map((t) => (
                      <span key={t.label} className="inline-flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-sm ${t.klasse}`} aria-hidden="true" />
                        {t.label} {dez((t.wert / calc.nettoErloes) * 100)} %
                      </span>
                    ))}
                    {calc.gewinn < 0 && (
                      <span className="font-semibold text-danger">Verlust {dez((Math.abs(calc.gewinn) / calc.nettoErloes) * 100)} %</span>
                    )}
                  </div>
                </div>
              )}
            </ResultPanel>

            <ToolSection title="Break-even: was die Werbung tragen kann" icon={Target}>
              {calc.db1 > 0 ? (
                <>
                  <StatGrid cols={2} className="mb-4">
                    <StatTile label="Klicks je Verkauf max." value={dez(calc.maxKlicks)} />
                    <StatTile label="Conversion-Rate min." value={`${dez(calc.minCr, 2)} %`} />
                    <StatTile label="Klickpreis max." value={eur(Math.max(calc.maxCpc, 0))} />
                    <StatTile label="ROAS min." value={dez(calc.minRoas, 2)} />
                  </StatGrid>
                  {calc.gewinn >= 0 ? (
                    <Callout tone="success" title="Puffer">
                      {dez(Math.max(calc.maxKlicks - calc.klicks, 0))} Klicks je Verkauf mehr oder ein Klickpreis bis{" "}
                      {eur(Math.max(calc.maxCpc, 0))}, dann steht die Null. Alles darunter ist dein Gewinn.
                    </Callout>
                  ) : (
                    <Callout tone="danger" title="Die Werbung frisst den Deckungsbeitrag.">
                      Bei {eur(cpc)} je Klick trägt eine Bestellung nur {dez(calc.maxKlicks)} Klicks, gerechnet sind {dez(calc.klicks)}.
                      Hebel: Conversion-Rate hoch (mindestens {dez(calc.minCr, 2)} %), Klickpreis runter (max.{" "}
                      {eur(Math.max(calc.maxCpc, 0))}), Warenkorb größer (Bundle, Versandpauschale) oder besser einkaufen.
                    </Callout>
                  )}
                </>
              ) : (
                <Callout tone="danger" title="Schon ohne Werbung im Minus." icon={AlertTriangle}>
                  Der Deckungsbeitrag vor Werbung liegt bei {eur(calc.db1)}. Jeder bezahlte Klick vergrößert nur den Verlust. Hier hilft
                  kein Kampagnen-Tuning, sondern Preis, Einkauf oder Versandkosten.
                </Callout>
              )}
            </ToolSection>
          </>
        }
      />

      <details className="group mb-6 rounded-2xl border border-border bg-card shadow-card [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-base font-semibold md:px-6">
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-blue">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            Warum brutto rein und netto raus?
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <dl className="divide-y divide-border/70 border-t border-border/70 px-5 md:px-6">
          {[
            {
              begriff: "Vorsteuer im Einkauf",
              erklaerung: "Die 19 % auf der Lieferantenrechnung sind für dich kein Kostenblock: Du holst sie dir über die USt-Voranmeldung zurück. Bei 12,90 € brutto sind nur 10,84 € echter Wareneinsatz. Wer brutto gegen brutto rechnet, hält sich für ärmer, als er ist — außer als Kleinunternehmer nach § 19, dann ist der Bruttopreis tatsächlich dein Einkaufspreis (USt-Satz hier auf 0 % stellen).",
            },
            {
              begriff: "Umsatzsteuer im Verkauf",
              erklaerung: "Die 19 % im Verkaufspreis gehören nie dir. Von 39,90 € sind 33,53 € dein Erlös, 6,37 € sind ein durchlaufender Posten ans Finanzamt. Die Versandpauschale vom Kunden teilt das Schicksal der Hauptleistung und wird mit demselben Satz versteuert.",
            },
            {
              begriff: "PayPal-Gebühr",
              erklaerung: "Zahlungsdienstleistungen sind nach § 4 Nr. 8 UStG umsatzsteuerfrei. Es gibt also keine Vorsteuer zu ziehen — die Gebühr kostet in voller Höhe. Berechnungsgrundlage ist der Bruttobetrag inklusive Versandpauschale, nicht dein Nettoerlös.",
            },
            {
              begriff: "Klickkosten je Bestellung",
              erklaerung: "Werbebudget wird meist pro Monat gedacht, entscheidend ist aber der Anteil je Bestellung: Klickpreis × Klicks je Verkauf. Bei 0,51 € netto und 2 % Conversion-Rate braucht eine Bestellung 50 Klicks — 25,50 € Werbung in jeder einzelnen Bestellung. Google und Meta stellen mit USt in Rechnung, deshalb hier den Nettopreis eintragen.",
            },
            {
              begriff: "Deckungsbeitrag vs. Gewinn",
              erklaerung: "Der Deckungsbeitrag vor Werbung ist das Budget, das eine Bestellung für Marketing hergibt. Er ist die Zahl, gegen die du jede Kampagne prüfst. Der Gewinn darunter ist noch vor Fixkosten (Shop, Tools, Steuerberater) und vor Ertragsteuern — die Fixkosten deckst du erst über die Menge.",
            },
            {
              begriff: "ROAS",
              erklaerung: "Return on Ad Spend: Umsatz je Werbe-Euro. Der ROAS allein sagt nichts — erst der Mindest-ROAS aus diesem Rechner sagt, ab wann er reicht. Ein ROAS von 3 ist bei 70 % Marge großartig und bei 25 % Marge ein Verlustgeschäft.",
            },
          ].map((g) => (
            <div key={g.begriff} className="py-3.5 text-sm">
              <dt className="font-semibold text-foreground">{g.begriff}</dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">{g.erklaerung}</dd>
            </div>
          ))}
        </dl>
      </details>

      <Stand2026Footer
        sources={[
          { label: "PayPal: Gebühren für Händler in Deutschland", url: "https://www.paypal.com/de/webapps/mpp/merchant-fees" },
          { label: "§ 4 Nr. 8 UStG — steuerfreie Umsätze (Zahlungsverkehr)", url: "https://www.gesetze-im-internet.de/ustg_1980/__4.html" },
        ]}
        note="Rechnung je Bestellung ohne Retouren, Fixkosten und Ertragsteuern. Retouren-Quote, Marktplatz-Provisionen und mehrere SKUs rechnet der Multi-Channel-Marge-Tracker. Kleinunternehmer nach § 19 setzen beide USt-Sätze auf 0 % — dann rechnet das Tool durchgängig brutto."
      />
    </CockpitShell>
  );
};

export default ShopProfitRechner;
