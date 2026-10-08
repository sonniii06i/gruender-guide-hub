import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { eur } from "@/components/cockpit/AmpelCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAHNVERFAHREN_MINDESTGEBUEHR, PAUSCHALE_B2B, verjaehrung, verzugsbeginn, verzugszinsen } from "@/lib/mahnung";

type Stufe = "erinnerung" | "mahnung1" | "mahnung2" | "letzte";
const STUFEN: Record<Stufe, { titel: string; ton: string }> = {
  erinnerung: { titel: "Zahlungserinnerung", ton: "sicher ist Ihnen im Alltag entgangen, dass die folgende Rechnung noch offen ist. Bitte überweisen Sie den Betrag bis zum genannten Datum." },
  mahnung1: { titel: "1. Mahnung", ton: "leider konnten wir bis heute keinen Zahlungseingang für die folgende Rechnung feststellen. Wir bitten Sie, den offenen Betrag bis zum genannten Datum zu überweisen." },
  mahnung2: { titel: "2. Mahnung", ton: "trotz unserer Erinnerung ist die folgende Rechnung weiterhin offen. Sie befinden sich im Zahlungsverzug. Bitte überweisen Sie den Gesamtbetrag einschließlich Verzugszinsen bis zum genannten Datum." },
  letzte: { titel: "Letzte Mahnung", ton: "die folgende Forderung ist trotz mehrfacher Aufforderung nicht beglichen. Geht der Gesamtbetrag nicht bis zum genannten Datum ein, beantragen wir ohne weitere Ankündigung einen gerichtlichen Mahnbescheid. Die dadurch entstehenden Kosten gehen zu Ihren Lasten." },
};

const heute = () => new Date().toISOString().slice(0, 10);
const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const de = (iso: string) => (iso ? iso.split("-").reverse().join(".") : "–");

const absenderAusRechnungsGenerator = () => {
  try {
    const s = JSON.parse(localStorage.getItem("ggh-rechnung-company-v2") || "{}");
    return { name: s.name ?? "", strasse: s.strasse ?? "", plzOrt: s.plzOrt ?? "", iban: s.iban ?? "", email: s.email ?? "" };
  } catch {
    return { name: "", strasse: "", plzOrt: "", iban: "", email: "" };
  }
};

const MahnungGenerator = () => {
  const [abs, setAbs] = useState(absenderAusRechnungsGenerator);
  const [kunde, setKunde] = useState({ name: "", strasse: "", plzOrt: "" });
  const [verbraucher, setVerbraucher] = useState(false);
  const [hinweis, setHinweis] = useState(false);
  const [kalender, setKalender] = useState(false);
  const [r, setR] = useState({ nummer: "", datum: plus(heute(), -45), faellig: plus(heute(), -31), betrag: 1000, ersteMahnung: "" });
  const [stufe, setStufe] = useState<Stufe>("mahnung1");
  const [frist, setFrist] = useState(plus(heute(), 10));
  const [mahnkosten, setMahnkosten] = useState(0);

  const verzug = useMemo(
    () => verzugsbeginn({ faellig: r.faellig, zugang: r.datum, ersteMahnung: r.ersteMahnung || undefined, verbraucher, hinweisInRechnung: hinweis, kalenderdatumVereinbart: kalender }),
    [r, verbraucher, hinweis, kalender],
  );
  const imVerzug = !!verzug.datum && verzug.datum <= heute();
  const zinsen = useMemo(() => (imVerzug && stufe !== "erinnerung" ? verzugszinsen(r.betrag, verzug.datum!, heute(), verbraucher) : { abschnitte: [], summe: 0, veraltet: false }), [imVerzug, stufe, r.betrag, verzug.datum, verbraucher]);
  const pauschale = imVerzug && !verbraucher && stufe !== "erinnerung" ? PAUSCHALE_B2B : 0;
  const kosten = imVerzug && stufe !== "erinnerung" ? mahnkosten : 0;
  const gesamt = Math.round((r.betrag + zinsen.summe + pauschale + kosten) * 100) / 100;

  const pdf = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFontSize(8);
    doc.text(`${abs.name} · ${abs.strasse} · ${abs.plzOrt}`, 20, 45);
    doc.setFontSize(10);
    doc.text([kunde.name, kunde.strasse, kunde.plzOrt].filter(Boolean), 20, 52);
    doc.text([abs.name, abs.strasse, abs.plzOrt, abs.email].filter(Boolean), 190, 20, { align: "right" });
    doc.text(de(heute()), 190, 75, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${STUFEN[stufe].titel} – Rechnung ${r.nummer} vom ${de(r.datum)}`, 20, 88);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const anrede = doc.splitTextToSize(`Sehr geehrte Damen und Herren,\n\n${STUFEN[stufe].ton}`, 170);
    doc.text(anrede, 20, 98);
    let y = 98 + anrede.length * 5 + 6;
    const zeile = (l: string, v: string, fett = false) => {
      doc.setFont("helvetica", fett ? "bold" : "normal");
      doc.text(l, 20, y);
      doc.text(v, 190, y, { align: "right" });
      y += 6;
    };
    zeile(`Rechnung ${r.nummer} vom ${de(r.datum)}, fällig am ${de(r.faellig)}`, eur(r.betrag, 2));
    for (const a of zinsen.abschnitte) zeile(`Verzugszinsen ${de(a.von)}–${de(a.bis)} (${a.tage} Tage, ${a.satz.toLocaleString("de-DE")} % p. a.)`, eur(a.zins, 2));
    if (pauschale) zeile("Verzugspauschale (§ 288 Abs. 5 BGB)", eur(pauschale, 2));
    if (kosten) zeile("Mahnkosten", eur(kosten, 2));
    doc.line(20, y - 3, 190, y - 3);
    zeile("Gesamtbetrag", eur(gesamt, 2), true);
    doc.setFont("helvetica", "normal");
    y += 4;
    const schluss = doc.splitTextToSize(
      `Bitte überweisen Sie den Gesamtbetrag bis zum ${de(frist)} auf ${abs.iban ? `das Konto IBAN ${abs.iban}` : "unser Konto"} unter Angabe der Rechnungsnummer ${r.nummer}.${stufe === "erinnerung" ? " Sollten Sie die Zahlung bereits veranlasst haben, betrachten Sie dieses Schreiben bitte als gegenstandslos." : ""}\n\nMit freundlichen Grüßen\n\n${abs.name}`,
      170,
    );
    doc.text(schluss, 20, y);
    doc.save(`${STUFEN[stufe].titel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${r.nummer || "rechnung"}.pdf`);
  };

  const feld = (label: string, wert: string, setze: (v: string) => void, typ = "text") => (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input type={typ} value={wert} onChange={(e) => setze(e.target.value)} className="mt-1 h-9" />
    </div>
  );

  return (
    <CockpitShell
      eyebrow="Forderungen · §§ 286, 288 BGB · Basiszins 2. Halbjahr 2026: 1,52 %"
      title="Mahnungs-Generator: Erinnerung, Mahnung, letzte Mahnung"
      subtitle="Erstellt Zahlungserinnerung und Mahnungen als PDF – mit korrekt berechneten Verzugszinsen, 40-€-Pauschale bei Geschäftskunden und dem richtigen Verzugsbeginn."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <h2 className="sm:col-span-2 font-bold">Rechnung</h2>
            {feld("Rechnungsnummer", r.nummer, (v) => setR((x) => ({ ...x, nummer: v })))}
            {feld("Betrag (brutto, offen)", String(r.betrag), (v) => setR((x) => ({ ...x, betrag: Number(v) || 0 })), "number")}
            {feld("Rechnungsdatum / Zugang", r.datum, (v) => setR((x) => ({ ...x, datum: v })), "date")}
            {feld("Fällig am", r.faellig, (v) => setR((x) => ({ ...x, faellig: v })), "date")}
            {feld("Erste Mahnung verschickt am (falls schon)", r.ersteMahnung, (v) => setR((x) => ({ ...x, ersteMahnung: v })), "date")}
            <div className="space-y-1.5 text-sm pt-5">
              <label className="flex gap-2"><input type="checkbox" checked={verbraucher} onChange={(e) => setVerbraucher(e.target.checked)} /> Kunde ist Verbraucher (Privatperson)</label>
              {verbraucher && <label className="flex gap-2"><input type="checkbox" checked={hinweis} onChange={(e) => setHinweis(e.target.checked)} /> Rechnung enthielt Hinweis auf Verzug nach 30 Tagen</label>}
              <label className="flex gap-2"><input type="checkbox" checked={kalender} onChange={(e) => setKalender(e.target.checked)} /> Zahlungsdatum war fest vereinbart</label>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <h2 className="sm:col-span-3 font-bold">Kunde</h2>
            {feld("Name / Firma", kunde.name, (v) => setKunde((x) => ({ ...x, name: v })))}
            {feld("Straße", kunde.strasse, (v) => setKunde((x) => ({ ...x, strasse: v })))}
            {feld("PLZ Ort", kunde.plzOrt, (v) => setKunde((x) => ({ ...x, plzOrt: v })))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <h2 className="sm:col-span-2 font-bold">Absender <span className="text-xs font-normal text-muted-foreground">(aus dem Rechnungs-Generator übernommen, falls vorhanden)</span></h2>
            {feld("Name / Firma", abs.name, (v) => setAbs((x) => ({ ...x, name: v })))}
            {feld("Straße", abs.strasse, (v) => setAbs((x) => ({ ...x, strasse: v })))}
            {feld("PLZ Ort", abs.plzOrt, (v) => setAbs((x) => ({ ...x, plzOrt: v })))}
            {feld("IBAN", abs.iban, (v) => setAbs((x) => ({ ...x, iban: v })))}
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 self-start">
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5">
            <Label className="text-xs">Stufe</Label>
            <select value={stufe} onChange={(e) => setStufe(e.target.value as Stufe)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {Object.entries(STUFEN).map(([k, v]) => <option key={k} value={k}>{v.titel}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {feld("Neue Frist", frist, setFrist, "date")}
              {feld("Mahnkosten (€)", String(mahnkosten), (v) => setMahnkosten(Math.max(0, Number(v) || 0)), "number")}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Nur echte Sachkosten (Porto, Papier), meist höchstens 1,50 €; per E-Mail und für die erste, verzugsbegründende Mahnung 0 €.</p>
            <div className={`text-xs mt-3 rounded-lg p-2 ${imVerzug ? "bg-red-500/10 text-red-800" : "bg-secondary/60"}`}>
              {verzug.datum ? `${imVerzug ? "Im Verzug seit" : "Verzug ab"} ${de(verzug.datum)}. ` : ""}{verzug.grund}
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span>Offene Rechnung</span><strong>{eur(r.betrag, 2)}</strong></div>
              {zinsen.abschnitte.map((a) => <div key={a.von} className="flex justify-between text-xs text-muted-foreground"><span>Zinsen {a.tage} T. à {a.satz.toLocaleString("de-DE")} %</span><span>{eur(a.zins, 2)}</span></div>)}
              {pauschale > 0 && <div className="flex justify-between"><span>Pauschale § 288 Abs. 5</span><strong>{eur(pauschale, 2)}</strong></div>}
              {kosten > 0 && <div className="flex justify-between"><span>Mahnkosten</span><strong>{eur(kosten, 2)}</strong></div>}
              <div className="flex justify-between border-t border-border pt-1 text-base"><span className="font-semibold">Gesamt</span><strong>{eur(gesamt, 2)}</strong></div>
            </div>
            {zinsen.veraltet && <p className="text-[11px] text-amber-700 mt-2">Für das aktuelle Halbjahr ist der Basiszins noch nicht hinterlegt – Zinsen mit dem letzten bekannten Wert gerechnet.</p>}
            {stufe === "erinnerung" && <p className="text-[11px] text-muted-foreground mt-2">Die freundliche Erinnerung verlangt bewusst keine Zinsen und Gebühren.</p>}
            <Button className="w-full mt-4" onClick={pdf} disabled={!r.nummer || !kunde.name || !abs.name}><Download className="h-4 w-4 mr-2" /> {STUFEN[stufe].titel} als PDF</Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed space-y-2">
            <div className="font-bold text-sm">Wenn nichts passiert</div>
            <p>Gerichtlicher Mahnbescheid über <a href="https://www.online-mahnantrag.de/" target="_blank" rel="noreferrer noopener" className="text-accent-blue hover:underline">online-mahnantrag.de</a>: Gerichtsgebühr 0,5 – mindestens {MAHNVERFAHREN_MINDESTGEBUEHR} € (bei 1.000 € Forderung genau 38 €), muss der Schuldner am Ende tragen.</p>
            <p>Verjährung dieser Forderung: <strong>{de(verjaehrung(r.faellig))}</strong> (3 Jahre ab Jahresende). Rechnungen schreiben: <Link to="/cockpit/rechnungs-generator" className="text-accent-blue hover:underline">Rechnungs-Generator</Link>.</p>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
};

export default MahnungGenerator;
