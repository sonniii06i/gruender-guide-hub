import { useState, useMemo, useEffect } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, FileText, Plus, Trash2, CheckCircle2, Clipboard } from "lucide-react";

type Anhang = { id: string; name: string; typ: string; bemerkung: string };

type FormState = {
  // Mandant
  firma: string;
  rechtsform: string;
  steuernr: string;
  ustId: string;
  mandantennr: string;
  ansprechpartner: string;
  ansprechMail: string;
  // StB
  stbName: string;
  stbMail: string;
  // Period
  periodVon: string;
  periodBis: string;
  // Sonderhinweise
  hinweise: string;
  // Checklist (Strings = abgehakt)
  checklist: Record<string, boolean>;
  // Anhänge
  anhaenge: Anhang[];
};

const INITIAL: FormState = {
  firma: "",
  rechtsform: "GmbH",
  steuernr: "",
  ustId: "",
  mandantennr: "",
  ansprechpartner: "",
  ansprechMail: "",
  stbName: "",
  stbMail: "",
  periodVon: "",
  periodBis: "",
  hinweise: "",
  checklist: {},
  anhaenge: [],
};

const CHECKLIST_GROUPS: { gruppe: string; items: { key: string; label: string; tool?: string; route?: string }[] }[] = [
  {
    gruppe: "Buchführung",
    items: [
      { key: "datev-stapel", label: "DATEV-Buchungsstapel (Bank, Marketplaces)", tool: "DATEV-Mapper", route: "/cockpit/datev-mapper" },
      { key: "lexoffice-csv", label: "Lexoffice-CSV", tool: "DATEV-Mapper", route: "/cockpit/datev-mapper" },
      { key: "settlement-amazon", label: "Amazon-Settlement-CSV inkl. Mapping", tool: "Settlement-Parser", route: "/cockpit/settlement-parser?mode=amazon" },
      { key: "settlement-stripe", label: "Stripe-Payout-CSV inkl. Mapping", tool: "Settlement-Parser", route: "/cockpit/settlement-parser?mode=stripe" },
      { key: "ek-belege", label: "Eingangsrechnungen (Wareneinkauf, Dienstleister) digital + chronologisch" },
      { key: "ar-belege", label: "Ausgangsrechnungen (Eigene Verkäufe, Beratung)" },
      { key: "kontoauszuege", label: "Kontoauszüge alle Bank-Konten" },
      { key: "kassenbuch", label: "Kassenbuch (falls Bargeschäft)" },
    ],
  },
  {
    gruppe: "Steuer-relevante Tools",
    items: [
      { key: "bwa", label: "BWA (Soll-Ist-Vergleich, KPIs)", tool: "BWA-Generator", route: "/cockpit/bwa-generator" },
      { key: "reisekosten", label: "Reisekosten + Bewirtungs-Logger (Pauschalen + 70% BA)", tool: "Reisekosten-Logger", route: "/cockpit/reisekosten-logger" },
      { key: "kfz", label: "Kfz-Methodenwahl (1%-Regel oder Fahrtenbuch)", tool: "Kfz-Optimizer", route: "/cockpit/kfz-optimizer" },
      { key: "crypto", label: "Crypto-Trades mit FIFO-Veräußerungsgewinn", tool: "Crypto-Steuer", route: "/cockpit/crypto-steuer" },
      { key: "iab", label: "IAB-Anträge / Auflösungen", tool: "Steuer-Cockpit", route: "/cockpit/steuer" },
      { key: "marge", label: "Multi-Channel-Margen-Übersicht (für KPIs)", tool: "Marge-Tracker", route: "/cockpit/marge-tracker" },
    ],
  },
  {
    gruppe: "Internationale Compliance",
    items: [
      { key: "us-llc", label: "US-LLC: 5472 / Form-1120-Filing-Status", tool: "US-LLC-Wizard", route: "/cockpit/us-llc-wizard" },
      { key: "sales-tax", label: "Sales-Tax-Nexus-Liste (US-Staaten)", tool: "Sales-Tax-Nexus", route: "/cockpit/sales-tax-nexus" },
      { key: "hk-ltd", label: "HK-Limited: Profits Tax Return + Audit", tool: "HK-Limited-Wizard", route: "/cockpit/hk-limited-wizard" },
      { key: "dba-cfc", label: "DBA-CFC: Hinzurechnungsbesteuerung-Berechnung", tool: "DBA-CFC-Rechner", route: "/cockpit/dba-cfc" },
      { key: "substance", label: "Substance-Dokumentation (ATAD III)", tool: "Substance-Checker", route: "/cockpit/substance-checker" },
      { key: "oss", label: "OSS-Meldungen EU-Verkäufe (B2C)" },
    ],
  },
  {
    gruppe: "Personal & Sozial",
    items: [
      { key: "lohnabrechnungen", label: "Lohnabrechnungen + SV-Meldungen" },
      { key: "minijob", label: "Minijob-Meldungen (falls relevant)" },
      { key: "pension-zusagen", label: "Pensionszusagen / bAV-Verträge", tool: "Pension-Optimizer", route: "/cockpit/pension-optimizer" },
    ],
  },
  {
    gruppe: "Sonstiges",
    items: [
      { key: "vertraege", label: "Mietverträge, Versicherungs-Policen, Leasing" },
      { key: "afa-anlagenverz", label: "Anlagenverzeichnis + AfA-Tabelle" },
      { key: "lucid", label: "LUCID-Bestätigungen / EPR-Nachweise", tool: "LUCID-Wizard", route: "/cockpit/lucid-wizard" },
      { key: "verlustvortrag", label: "Verlustvortrag aus Vorperioden" },
      { key: "darlehen", label: "Gesellschafter-Darlehen / Verträge" },
    ],
  },
];

const LS_KEY = "stb-handoff-state-v1";

const StbHandoff = () => {
  const [form, setForm] = useState<FormState>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return { ...INITIAL, ...JSON.parse(raw) };
    } catch {}
    return INITIAL;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const toggleCheck = (key: string) =>
    setForm((f) => ({ ...f, checklist: { ...f.checklist, [key]: !f.checklist[key] } }));

  const addAnhang = () =>
    setForm((f) => ({
      ...f,
      anhaenge: [...f.anhaenge, { id: Date.now().toString(), name: "", typ: "PDF", bemerkung: "" }],
    }));
  const updateAnhang = (id: string, patch: Partial<Anhang>) =>
    setForm((f) => ({
      ...f,
      anhaenge: f.anhaenge.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  const removeAnhang = (id: string) =>
    setForm((f) => ({ ...f, anhaenge: f.anhaenge.filter((a) => a.id !== id) }));

  const counts = useMemo(() => {
    const all = CHECKLIST_GROUPS.flatMap((g) => g.items);
    const done = all.filter((i) => form.checklist[i.key]).length;
    return { done, total: all.length };
  }, [form.checklist]);

  const generatePdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;

    const line = (text: string, opts: { size?: number; bold?: boolean; gap?: number } = {}) => {
      const { size = 10, bold = false, gap = 5 } = opts;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const wrapped = doc.splitTextToSize(text, 175);
      doc.text(wrapped, 15, y);
      y += wrapped.length * (size * 0.45) + gap;
    };

    line("StB-Übergabe-Manifest", { size: 18, bold: true, gap: 3 });
    line(`Stand: ${new Date().toLocaleDateString("de-DE")}`, { size: 9, gap: 8 });

    line("Mandant", { size: 13, bold: true, gap: 3 });
    line(`Firma: ${form.firma || "—"}`);
    line(`Rechtsform: ${form.rechtsform}`);
    line(`Steuernummer: ${form.steuernr || "—"}`);
    line(`USt-IdNr: ${form.ustId || "—"}`);
    line(`Mandanten-Nr (StB): ${form.mandantennr || "—"}`);
    line(`Ansprechpartner: ${form.ansprechpartner || "—"} (${form.ansprechMail || "—"})`, { gap: 8 });

    line("Steuerberater", { size: 13, bold: true, gap: 3 });
    line(`${form.stbName || "—"}`);
    line(`${form.stbMail || "—"}`, { gap: 8 });

    line("Buchungs-Periode", { size: 13, bold: true, gap: 3 });
    line(`${form.periodVon || "—"} bis ${form.periodBis || "—"}`, { gap: 8 });

    if (form.hinweise) {
      line("Sonderhinweise", { size: 13, bold: true, gap: 3 });
      line(form.hinweise, { gap: 8 });
    }

    line(`Checklist (${counts.done} / ${counts.total} erledigt)`, { size: 13, bold: true, gap: 4 });
    CHECKLIST_GROUPS.forEach((g) => {
      line(g.gruppe, { size: 11, bold: true, gap: 2 });
      g.items.forEach((i) => {
        const mark = form.checklist[i.key] ? "[x]" : "[ ]";
        line(`  ${mark} ${i.label}${i.tool ? ` (Tool: ${i.tool})` : ""}`, { size: 9, gap: 2 });
      });
      y += 3;
    });

    if (form.anhaenge.length > 0) {
      y += 5;
      line("Anhänge / Beigefügte Dateien", { size: 13, bold: true, gap: 3 });
      form.anhaenge.forEach((a, idx) => {
        line(`  ${idx + 1}. ${a.name || "—"} [${a.typ}] ${a.bemerkung ? "— " + a.bemerkung : ""}`, { size: 9, gap: 2 });
      });
    }

    doc.save(`stb-handoff-${form.firma || "mandant"}-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const buildEmailBody = () => {
    const lines: string[] = [];
    lines.push(`Sehr geehrte/r ${form.stbName || "Frau / Herr ..."},`);
    lines.push("");
    lines.push(`anbei das Übergabe-Bundle für ${form.firma || "[Firma]"} (${form.rechtsform}).`);
    lines.push("");
    lines.push(`Buchungs-Periode: ${form.periodVon || "—"} bis ${form.periodBis || "—"}`);
    lines.push(`Steuernummer: ${form.steuernr || "—"}`);
    lines.push(`USt-IdNr: ${form.ustId || "—"}`);
    if (form.mandantennr) lines.push(`Mandanten-Nr: ${form.mandantennr}`);
    lines.push("");
    if (form.hinweise) {
      lines.push("Sonderhinweise:");
      lines.push(form.hinweise);
      lines.push("");
    }
    if (form.anhaenge.length > 0) {
      lines.push("Beigefügte Dateien:");
      form.anhaenge.forEach((a, idx) => {
        lines.push(`  ${idx + 1}. ${a.name} [${a.typ}]${a.bemerkung ? " — " + a.bemerkung : ""}`);
      });
      lines.push("");
    }
    lines.push("Bei Rückfragen gern jederzeit melden.");
    lines.push("");
    lines.push("Beste Grüße");
    lines.push(form.ansprechpartner || "[Name]");
    return lines.join("\n");
  };

  const sendEmail = () => {
    if (!form.stbMail) {
      alert("Bitte StB-Email zuerst eintragen.");
      return;
    }
    const subject = `Übergabe-Bundle ${form.firma || ""} (${form.periodVon || ""}–${form.periodBis || ""})`;
    const body = buildEmailBody();
    window.location.href = `mailto:${encodeURIComponent(form.stbMail)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(buildEmailBody());
      alert("Email-Body in Zwischenablage kopiert.");
    } catch {
      alert("Konnte nicht in die Zwischenablage kopieren.");
    }
  };

  return (
    <CockpitShell
      eyebrow="StB-Hand-off / Übergabe-Bundle"
      title="Sauberes Übergabe-Pack für deinen Steuerberater"
      subtitle="Manifest-PDF + Email-Helper. 30+ Pflicht-Posten in 5 Gruppen (Buchführung, Steuer-relevante Tools, International, Personal, Sonstiges) — speichert lokal, jederzeit fortsetzen."
    >
      {/* Mandant */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <h3 className="font-semibold text-sm mb-3">Mandantendaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Firma</Label>
            <Input
              value={form.firma}
              onChange={(e) => update("firma", e.target.value)}
              placeholder="z.B. Acme Vertriebs GmbH"
              className="h-8 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Rechtsform</Label>
            <select
              value={form.rechtsform}
              onChange={(e) => update("rechtsform", e.target.value)}
              className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs mt-1"
            >
              {["GmbH", "UG", "GmbH & Co. KG", "AG", "Einzelunternehmen", "OHG", "GbR", "Holding", "US-LLC", "HK-Limited"].map(
                (r) => (
                  <option key={r}>{r}</option>
                ),
              )}
            </select>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Steuernummer</Label>
            <Input
              value={form.steuernr}
              onChange={(e) => update("steuernr", e.target.value)}
              className="h-8 text-sm mt-1 font-mono"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">USt-IdNr</Label>
            <Input
              value={form.ustId}
              onChange={(e) => update("ustId", e.target.value)}
              placeholder="DE123456789"
              className="h-8 text-sm mt-1 font-mono"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Mandanten-Nr (StB)</Label>
            <Input
              value={form.mandantennr}
              onChange={(e) => update("mandantennr", e.target.value)}
              className="h-8 text-sm mt-1 font-mono"
            />
          </div>
          <div className="md:col-span-1" />
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Ansprechpartner</Label>
            <Input
              value={form.ansprechpartner}
              onChange={(e) => update("ansprechpartner", e.target.value)}
              className="h-8 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Email Mandant</Label>
            <Input
              type="email"
              value={form.ansprechMail}
              onChange={(e) => update("ansprechMail", e.target.value)}
              className="h-8 text-sm mt-1"
            />
          </div>
        </div>
      </div>

      {/* StB + Period */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <h3 className="font-semibold text-sm mb-3">Steuerberater + Buchungs-Periode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">StB-Name</Label>
            <Input
              value={form.stbName}
              onChange={(e) => update("stbName", e.target.value)}
              placeholder="z.B. Max Müller, Müller Steuerberatung"
              className="h-8 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">StB-Email</Label>
            <Input
              type="email"
              value={form.stbMail}
              onChange={(e) => update("stbMail", e.target.value)}
              placeholder="kanzlei@example.de"
              className="h-8 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Periode von</Label>
            <Input
              type="date"
              value={form.periodVon}
              onChange={(e) => update("periodVon", e.target.value)}
              className="h-8 text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Periode bis</Label>
            <Input
              type="date"
              value={form.periodBis}
              onChange={(e) => update("periodBis", e.target.value)}
              className="h-8 text-sm mt-1"
            />
          </div>
        </div>
        <div className="mt-3">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Sonderhinweise (frei-Text, geht in PDF + Email)
          </Label>
          <textarea
            value={form.hinweise}
            onChange={(e) => update("hinweise", e.target.value)}
            placeholder="z.B. Crypto-Trades mit FIFO berechnet (Tool-Output anbei). 2 US-LLCs unter dieser Holding — siehe Substance-Checker-Bewertung. IAB-Auflösung in Q4 vorgesehen."
            className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-xs mt-1"
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">
            Pflicht-Checklist
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              ({counts.done} / {counts.total} erledigt)
            </span>
          </h3>
          <div className="text-xs">
            {counts.done === counts.total ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Komplett
              </span>
            ) : (
              <span className="text-muted-foreground">Was offen ist, dem StB direkt mitteilen</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {CHECKLIST_GROUPS.map((g) => (
            <div key={g.gruppe}>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {g.gruppe}
              </div>
              <div className="space-y-1">
                {g.items.map((i) => (
                  <label
                    key={i.key}
                    className="flex items-start gap-2 py-1.5 px-2 rounded hover:bg-secondary/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!form.checklist[i.key]}
                      onChange={() => toggleCheck(i.key)}
                      className="mt-0.5 h-3.5 w-3.5"
                    />
                    <div className="flex-1 text-xs">
                      <span className={form.checklist[i.key] ? "line-through text-muted-foreground" : ""}>
                        {i.label}
                      </span>
                      {i.route && (
                        <a
                          href={i.route}
                          className="ml-2 text-accent-blue text-[10px] hover:underline font-semibold"
                        >
                          → {i.tool}
                        </a>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anhänge */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Anhänge / Dateien (im Manifest gelistet)</h3>
          <button
            onClick={addAnhang}
            className="inline-flex items-center gap-1 rounded-lg bg-accent-blue text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" /> Anhang
          </button>
        </div>

        {form.anhaenge.length === 0 ? (
          <div className="text-xs text-muted-foreground py-4 text-center border border-dashed border-border rounded-lg">
            Trag hier deine separat hochgeladenen Dateien ein (Datei-Name + Typ). Sie erscheinen im
            Manifest-PDF + in der Email.
          </div>
        ) : (
          <div className="space-y-2">
            {form.anhaenge.map((a) => (
              <div key={a.id} className="grid grid-cols-2 md:grid-cols-12 gap-2 items-center">
                <Input
                  value={a.name}
                  onChange={(e) => updateAnhang(a.id, { name: e.target.value })}
                  placeholder="Dateiname (z.B. bwa-2026-q1.pdf)"
                  className="col-span-2 md:col-span-5 h-8 text-xs min-w-0"
                />
                <select
                  value={a.typ}
                  onChange={(e) => updateAnhang(a.id, { typ: e.target.value })}
                  className="col-span-1 md:col-span-2 h-8 rounded-md border border-input bg-background px-2 text-xs min-w-0"
                >
                  {["PDF", "CSV", "DATEV-Stapel", "Lexoffice", "Excel", "ZIP"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <Input
                  value={a.bemerkung}
                  onChange={(e) => updateAnhang(a.id, { bemerkung: e.target.value })}
                  placeholder="Bemerkung"
                  className="col-span-1 md:col-span-4 h-8 text-xs min-w-0"
                />
                <button
                  onClick={() => removeAnhang(a.id)}
                  className="col-span-2 md:col-span-1 text-red-600 hover:bg-red-500/10 p-1 rounded justify-self-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={generatePdf}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-blue text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90"
        >
          <FileText className="h-4 w-4" /> Manifest-PDF generieren
        </button>
        <button
          onClick={sendEmail}
          disabled={!form.stbMail}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary disabled:opacity-50"
        >
          <Mail className="h-4 w-4" /> Email an StB öffnen
        </button>
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary"
        >
          <Clipboard className="h-4 w-4" /> Email-Text kopieren
        </button>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed">
        <div className="font-semibold mb-2">So nutzt du das Tool:</div>
        <ol className="list-decimal pl-4 space-y-1 text-muted-foreground">
          <li>Mandantendaten + StB + Periode oben eintragen — wird lokal gespeichert.</li>
          <li>
            Checklist durchgehen. Klick die Tool-Links rechts für Direkt-Sprung zu BWA-Generator,
            DATEV-Mapper, Crypto-Steuer etc. Dort exportieren, dann zurück und Häkchen setzen.
          </li>
          <li>
            Anhangs-Dateien (BWA-PDF, DATEV-CSV usw.) kommen in einen separaten Cloud-Ordner / Email-Anhang.
            Hier nur Datei-Namen erfassen — sie tauchen dann im Manifest auf.
          </li>
          <li>"Manifest-PDF generieren" → Cover-Sheet mit allem.</li>
          <li>"Email an StB öffnen" → Standard-Mail-Client wird mit fertigem Body geöffnet, du hängst die
            Files manuell an.</li>
        </ol>
      </div>
    </CockpitShell>
  );
};

export default StbHandoff;
