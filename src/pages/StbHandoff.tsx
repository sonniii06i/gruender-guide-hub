import { useState, useMemo, useEffect } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  FileText,
  Plus,
  Trash2,
  Clipboard,
  Building2,
  CalendarRange,
  ListChecks,
  Paperclip,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";
import { EmptyState, Field, ResultPanel, ToneBadge, ToolLayout, ToolSection, selectCls } from "@/components/cockpit/kit";

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

  const fortschritt = counts.total > 0 ? Math.round((counts.done / counts.total) * 100) : 0;

  return (
    <CockpitShell
      eyebrow="Steuerberatung · Übergabe-Bundle"
      title="Sauberes Übergabe-Paket für deine Steuerberatung"
      subtitle="Manifest-PDF und E-Mail-Helfer. Über 30 Pflichtposten in 5 Gruppen (Buchführung, steuerrelevante Tools, International, Personal, Sonstiges). Alles wird lokal gespeichert, du kannst jederzeit weitermachen."
    >
      <ToolLayout
        className="mb-8"
        inputs={
          <>
            {/* Mandant */}
            <ToolSection title="Mandantendaten" icon={Building2}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Firma" htmlFor="stb-firma">
                  <Input id="stb-firma" value={form.firma} onChange={(e) => update("firma", e.target.value)} placeholder="z. B. Acme Vertriebs GmbH" />
                </Field>
                <Field label="Rechtsform" htmlFor="stb-rechtsform">
                  <select id="stb-rechtsform" value={form.rechtsform} onChange={(e) => update("rechtsform", e.target.value)} className={selectCls}>
                    {["GmbH", "UG", "GmbH & Co. KG", "AG", "Einzelunternehmen", "OHG", "GbR", "Holding", "US-LLC", "HK-Limited"].map(
                      (r) => (
                        <option key={r}>{r}</option>
                      ),
                    )}
                  </select>
                </Field>
                <Field label="Steuernummer" htmlFor="stb-stnr">
                  <Input id="stb-stnr" value={form.steuernr} onChange={(e) => update("steuernr", e.target.value)} className="font-mono" />
                </Field>
                <Field label="USt-IdNr." htmlFor="stb-ustid">
                  <Input id="stb-ustid" value={form.ustId} onChange={(e) => update("ustId", e.target.value)} placeholder="DE123456789" className="font-mono" />
                </Field>
                <Field label="Mandantennummer bei der Kanzlei" htmlFor="stb-mandnr" className="sm:col-span-2">
                  <Input id="stb-mandnr" value={form.mandantennr} onChange={(e) => update("mandantennr", e.target.value)} className="font-mono sm:max-w-[50%]" />
                </Field>
                <Field label="Ansprechpartner" htmlFor="stb-ansprech">
                  <Input id="stb-ansprech" value={form.ansprechpartner} onChange={(e) => update("ansprechpartner", e.target.value)} />
                </Field>
                <Field label="E-Mail Mandant" htmlFor="stb-ansprechmail">
                  <Input id="stb-ansprechmail" type="email" value={form.ansprechMail} onChange={(e) => update("ansprechMail", e.target.value)} />
                </Field>
              </div>
            </ToolSection>

            {/* StB + Period */}
            <ToolSection title="Steuerberatung und Buchungszeitraum" icon={CalendarRange}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name der Kanzlei oder des StB" htmlFor="stb-name">
                  <Input id="stb-name" value={form.stbName} onChange={(e) => update("stbName", e.target.value)} placeholder="z. B. Max Müller, Müller Steuerberatung" />
                </Field>
                <Field label="E-Mail der Kanzlei" hint="Nötig für „E-Mail öffnen“" htmlFor="stb-mail">
                  <Input id="stb-mail" type="email" value={form.stbMail} onChange={(e) => update("stbMail", e.target.value)} placeholder="kanzlei@example.de" />
                </Field>
                <Field label="Zeitraum von" htmlFor="stb-von">
                  <Input id="stb-von" type="date" value={form.periodVon} onChange={(e) => update("periodVon", e.target.value)} />
                </Field>
                <Field label="Zeitraum bis" htmlFor="stb-bis">
                  <Input id="stb-bis" type="date" value={form.periodBis} onChange={(e) => update("periodBis", e.target.value)} />
                </Field>
                <Field className="sm:col-span-2" label="Sonderhinweise" hint="Freitext, erscheint im PDF und in der E-Mail." htmlFor="stb-hinweise">
                  <Textarea
                    id="stb-hinweise"
                    value={form.hinweise}
                    onChange={(e) => update("hinweise", e.target.value)}
                    placeholder="z. B. Crypto-Trades mit FIFO berechnet (Tool-Output anbei). 2 US-LLCs unter dieser Holding, siehe Substance-Checker. IAB-Auflösung in Q4 vorgesehen."
                    rows={4}
                  />
                </Field>
              </div>
            </ToolSection>

            {/* Checklist */}
            <ToolSection
              title="Pflicht-Checkliste"
              description="Was offen bleibt, teilst du der Kanzlei direkt mit."
              icon={ListChecks}
              actions={
                <ToneBadge tone={counts.done === counts.total ? "success" : "neutral"} className="tabular">
                  {counts.done} / {counts.total} erledigt
                </ToneBadge>
              }
            >
              <div className="space-y-6">
                {CHECKLIST_GROUPS.map((g) => {
                  const erledigt = g.items.filter((i) => form.checklist[i.key]).length;
                  return (
                    <fieldset key={g.gruppe}>
                      <legend className="mb-2 flex w-full items-baseline justify-between gap-2 text-sm font-semibold">
                        {g.gruppe}
                        <span className="text-xs font-normal text-muted-foreground tabular">
                          {erledigt} / {g.items.length}
                        </span>
                      </legend>
                      <div className="divide-y divide-border/60 rounded-xl border border-border">
                        {g.items.map((i) => {
                          const checked = !!form.checklist[i.key];
                          return (
                            <div key={i.key} className="flex items-start gap-3 px-3.5 py-2.5 transition-colors hover:bg-secondary/40">
                              <input
                                id={`stb-check-${i.key}`}
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleCheck(i.key)}
                                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-primary"
                              />
                              <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-3">
                                <label htmlFor={`stb-check-${i.key}`} className="block cursor-pointer text-sm leading-snug">
                                  <span className={checked ? "text-muted-foreground line-through" : ""}>{i.label}</span>
                                </label>
                                {i.route && (
                                  <a
                                    href={i.route}
                                    className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent-blue hover:underline sm:mt-0"
                                  >
                                    {i.tool} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </ToolSection>

            {/* Anhänge */}
            <ToolSection
              title="Anhänge"
              description="Dateinamen der separat verschickten Dateien. Sie erscheinen im Manifest und in der E-Mail."
              icon={Paperclip}
              actions={
                <Button size="sm" variant="outline" onClick={addAnhang}>
                  <Plus className="h-4 w-4" aria-hidden="true" /> Anhang
                </Button>
              }
            >
              {form.anhaenge.length === 0 ? (
                <EmptyState
                  className="py-8"
                  icon={Paperclip}
                  title="Noch keine Anhänge eingetragen"
                  description="Trag hier die Dateien ein, die du separat hochlädst oder anhängst, zum Beispiel bwa-2026-q1.pdf."
                  action={
                    <Button size="sm" onClick={addAnhang}>
                      <Plus className="h-4 w-4" aria-hidden="true" /> Anhang hinzufügen
                    </Button>
                  }
                />
              ) : (
                <div className="space-y-3">
                  {form.anhaenge.map((a, idx) => (
                    <div key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-xl border border-border p-3 sm:grid-cols-12 sm:items-center sm:border-0 sm:p-0">
                      <Input
                        value={a.name}
                        onChange={(e) => updateAnhang(a.id, { name: e.target.value })}
                        placeholder="Dateiname (z. B. bwa-2026-q1.pdf)"
                        aria-label={`Anhang ${idx + 1}: Dateiname`}
                        className="min-w-0 sm:col-span-5"
                      />
                      <select
                        value={a.typ}
                        onChange={(e) => updateAnhang(a.id, { typ: e.target.value })}
                        aria-label={`Anhang ${idx + 1}: Typ`}
                        className={`${selectCls} min-w-0 sm:col-span-2`}
                      >
                        {["PDF", "CSV", "DATEV-Stapel", "Lexoffice", "Excel", "ZIP"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <Input
                        value={a.bemerkung}
                        onChange={(e) => updateAnhang(a.id, { bemerkung: e.target.value })}
                        placeholder="Bemerkung"
                        aria-label={`Anhang ${idx + 1}: Bemerkung`}
                        className="min-w-0 sm:col-span-4"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAnhang(a.id)}
                        aria-label={`Anhang ${idx + 1} entfernen`}
                        className="justify-self-end text-muted-foreground hover:bg-danger-soft hover:text-danger sm:col-span-1 sm:justify-self-center"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ToolSection>
          </>
        }
        result={
          <>
            <ResultPanel
              variant="ink"
              kicker="Übergabe-Stand"
              title={counts.done === counts.total ? "Checkliste komplett" : "Checkliste in Arbeit"}
              value={`${fortschritt} %`}
              valueHint={`${counts.done} von ${counts.total} Posten erledigt`}
            >
              <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div className="h-full rounded-full bg-brand-green" style={{ width: `${fortschritt}%` }} />
              </div>
              <div className="mt-5 space-y-2">
                <Button onClick={generatePdf} size="lg" className="w-full rounded-xl bg-white text-primary hover:bg-white/90">
                  <FileText className="h-4 w-4" aria-hidden="true" /> Manifest-PDF erstellen
                </Button>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    variant="secondary"
                    onClick={sendEmail}
                    disabled={!form.stbMail}
                    className="bg-white/10 text-primary-foreground hover:bg-white/15"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" /> E-Mail öffnen
                  </Button>
                  <Button variant="secondary" onClick={copyEmail} className="bg-white/10 text-primary-foreground hover:bg-white/15">
                    <Clipboard className="h-4 w-4" aria-hidden="true" /> E-Mail-Text kopieren
                  </Button>
                </div>
                {!form.stbMail && (
                  <p className="text-xs text-primary-foreground/65">Für „E-Mail öffnen“ zuerst die E-Mail der Kanzlei eintragen.</p>
                )}
              </div>
            </ResultPanel>

            <ToolSection title="So nutzt du das Tool" icon={Lightbulb}>
              <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "Mandantendaten, Kanzlei und Zeitraum eintragen. Alles wird lokal gespeichert.",
                  "Checkliste durchgehen. Die Tool-Links führen direkt zu BWA-Generator, DATEV-Mapper, Crypto-Steuer und Co. Dort exportieren, zurückkommen, Haken setzen.",
                  "Die Dateien selbst (BWA-PDF, DATEV-CSV usw.) kommen in einen Cloud-Ordner oder als E-Mail-Anhang. Hier nur die Dateinamen erfassen, sie erscheinen im Manifest.",
                  "„Manifest-PDF erstellen“ erzeugt das Deckblatt mit allem.",
                  "„E-Mail öffnen“ startet dein Mailprogramm mit fertigem Text, die Dateien hängst du selbst an.",
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-blue tabular">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </ToolSection>
          </>
        }
      />
    </CockpitShell>
  );
};

export default StbHandoff;
