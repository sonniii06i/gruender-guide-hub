import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Callout, ChoiceGroup, EmptyState, ToneBadge, ToolSection, type Tone } from "@/components/cockpit/kit";
import {
  Search,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  ChevronRight,
  ExternalLink,
  ScanSearch,
  Star,
  ListTree,
  BookOpen,
} from "lucide-react";
import {
  ALL_AMAZON_CODES,
  PREFIX_CODES,
  POPULAR_CODES,
  CATEGORY_LABELS,
  type AmazonCode,
  type AmazonCodeCategory,
  searchAmazonCodes,
  lookupAmazonCode,
} from "@/lib/amazonBookingCodes";

const SignBadge = ({ sign }: { sign: AmazonCode["sign"] }) => {
  if (sign === "minus") {
    return (
      <ToneBadge tone="danger">
        <ArrowDownCircle className="h-3 w-3" aria-hidden="true" /> Minus
      </ToneBadge>
    );
  }
  if (sign === "plus") {
    return (
      <ToneBadge tone="success">
        <ArrowUpCircle className="h-3 w-3" aria-hidden="true" /> Plus
      </ToneBadge>
    );
  }
  return (
    <ToneBadge tone="warning">
      <RefreshCcw className="h-3 w-3" aria-hidden="true" /> ±
    </ToneBadge>
  );
};

const UST_TONE: Record<AmazonCode["ust"], Tone> = {
  "19% VSt-abziehbar": "accent",
  "Reverse Charge": "info",
  "0% steuerfrei": "neutral",
  OSS: "info",
  innergemeinschaftlich: "info",
  "Drittland steuerfrei": "neutral",
  "Erlös-Korrektur": "warning",
  "nicht steuerbar": "neutral",
};

const UstBadge = ({ ust }: { ust: AmazonCode["ust"] }) => <ToneBadge tone={UST_TONE[ust] ?? "neutral"}>{ust}</ToneBadge>;

const CodeCard = ({ code }: { code: AmazonCode }) => (
  <div className="rounded-xl border border-border bg-card p-4 transition-[border-color,box-shadow] duration-200 hover:border-accent-blue/40 hover:shadow-card">
    <div className="mb-2 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <code className="break-all font-mono text-sm font-semibold text-accent-blue">{code.code}</code>
        <p className="mt-0.5 text-sm font-semibold">{code.label}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <SignBadge sign={code.sign} />
        <UstBadge ust={code.ust} />
      </div>
    </div>
    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{code.meaning}</p>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="rounded-lg bg-secondary/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">SKR03</p>
        <p className="font-mono text-sm">{code.skr03}</p>
      </div>
      <div className="rounded-lg bg-secondary/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">SKR04</p>
        <p className="font-mono text-sm">{code.skr04}</p>
      </div>
    </div>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
      <span className="font-semibold text-foreground">So buchen:</span> {code.bookingHint}
    </p>
    {code.example && (
      <p className="mt-2 rounded-lg border border-accent-blue/15 bg-accent px-3 py-2 text-xs">
        <span className="font-semibold">Beispiel:</span> <span className="break-all font-mono">{code.example}</span>
      </p>
    )}
  </div>
);

const AmazonBuchungen = () => {
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<AmazonCodeCategory | "all">("all");
  const [lookupInput, setLookupInput] = useState("");

  const filtered = useMemo(() => {
    let list = searchAmazonCodes(query);
    if (filterCategory !== "all") {
      list = list.filter((c) => c.category === filterCategory);
    }
    return list;
  }, [query, filterCategory]);

  const lookup = useMemo(() => {
    if (!lookupInput.trim()) return null;
    return lookupAmazonCode(lookupInput);
  }, [lookupInput]);

  const categories: AmazonCodeCategory[] = [
    "prefix",
    "service-fee",
    "order-fee",
    "advertising",
    "fba",
    "storage",
    "subscription",
    "vine",
    "refund",
    "reimbursement",
    "chargeback",
    "payout",
    "reserve",
    "epr",
    "tax",
    "adjustment",
    "other",
  ];

  return (
    <CockpitShell
      eyebrow="Steuer-Cockpit"
      title="Amazon-Buchungstexte: die komplette Liste"
      subtitle="Wenn du als Amazon-Verkäufer (FBA / FBM) Buchungen wie AMA-SG-DE-MZNFS, AMA-BG-IT, AUSZ-DE oder MZNFS auf deiner Bank oder in PayJoe siehst: hier ist die Konto-Empfehlung pro Code (SKR03/04, USt-Behandlung, Soll/Haben). Stand Mai 2026."
    >
      {/* Wichtige Hinweise */}
      <Callout tone="accent" title="Wichtig zu wissen (Stand 2026)" className="mb-6 p-5">
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <strong>Seit 01.08.2024</strong> rechnet Amazon EU Sarl Niederlassung Deutschland mit{" "}
            <strong>deutscher 19% USt</strong> ab → Vorsteuer abziehbar (Schlüssel <strong>9</strong> in
            SKR03 bzw. <strong>9 oder 401</strong> lt. PayJoe-Doku). KEIN Reverse Charge mehr für DE!
          </li>
          <li>
            Für Marketplaces außerhalb DE (IT/FR/ES/NL): Rechnung prüfen. Weist Amazon deutsche USt aus, gilt
            Vorsteuer 19 % (Schlüssel 9). Rechnet eine ausländische Amazon-Einheit <em>ohne</em> Steuerausweis ab,
            gilt Reverse Charge §13b UStG (SKR03 3123 / SKR04 5923). Beides zugleich gibt es nicht. UK/US-Gebühren
            ohne Steuerausweis: §13b für Leistungen ausländischer Unternehmer (Schlüssel 94).
          </li>
          <li>
            <strong>AUSZ-DE</strong> ist KEIN Aufwand und KEIN Erlös, nur Geldtransit (1360 bzw. 1460).
          </li>
          <li>
            <strong>Reimbursements (FBA-Erstattungen für Schäden/Verluste)</strong> = sonstiger Ertrag,
            meist nicht steuerbar (echter Schadensersatz).
          </li>
          <li>
            <strong>Refunds (A-to-z, Customer-Returns)</strong> = Erlösschmälerung 19 % (8720/4720; 8730/4730 sind gewährte Skonti), nicht als
            Aufwand buchen.
          </li>
          <li>Disclaimer: Orientierungshilfe, konkrete Buchung immer mit StB klären.</li>
        </ul>
      </Callout>

      {/* Live-Lookup */}
      <ToolSection
        title="Live-Lookup"
        description="Code aus Bank, PayJoe oder Lexoffice einfügen"
        icon={ScanSearch}
        className="mb-8 border-accent-blue/30"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={lookupInput}
            onChange={(e) => setLookupInput(e.target.value)}
            placeholder="z.B. AMA-SG-DE-MZNFS, AMA-BG-DE, AUSZ-DE oder MZNFS"
            aria-label="Amazon-Buchungscode nachschlagen"
            className="h-11 pl-9 font-mono"
          />
        </div>
        {lookup && (lookup.prefix || lookup.sub) && (
          <div className="mt-4 space-y-4">
            {lookup.fallbackHint && (
              <Callout tone="warning" title="Heuristik">
                {lookup.fallbackHint}
              </Callout>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {lookup.prefix && (
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Prefix erkannt</p>
                  <CodeCard code={lookup.prefix} />
                </div>
              )}
              {lookup.sub && (
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Sub-Code</p>
                  <CodeCard code={lookup.sub} />
                </div>
              )}
            </div>
            {lookup.prefix && lookup.sub && (
              <Callout tone="success" title="Empfehlung kombiniert">
                Verbuche als <strong>{lookup.sub.label}</strong> auf{" "}
                <span className="font-mono">{lookup.sub.skr03}</span> (SKR03) bzw.{" "}
                <span className="font-mono">{lookup.sub.skr04}</span> (SKR04). USt:{" "}
                <strong>{lookup.sub.ust}</strong>. {lookup.sub.bookingHint}
              </Callout>
            )}
          </div>
        )}
        {lookup && !lookup.prefix && !lookup.sub && lookupInput.trim() && (
          <Callout tone="warning" title="Code nicht eindeutig zuordenbar." className="mt-4">
            <p className="mb-2">{lookup.fallbackHint}</p>
            <p>
              Versuche es mit nur dem Sub-Teil (z.B. <code className="font-mono">MZNFS</code> statt{" "}
              <code className="font-mono">AMA-SG-DE-MZNFS</code>), schau in der Liste unten oder frag{" "}
              <Link to="/felix" className="font-semibold underline underline-offset-4">
                Felix
              </Link>{" "}
              direkt mit deinem PayJoe-Auszug.
            </p>
          </Callout>
        )}
        {!lookupInput.trim() && (
          <p className="mt-3 text-sm text-muted-foreground">
            Prefix und Sub-Code werden getrennt erkannt, danach siehst du die kombinierte Buchungsempfehlung.
          </p>
        )}
      </ToolSection>

      {/* Top-Codes */}
      <ToolSection title="Die wichtigsten Codes" description="Decken rund 95 % aller Auszüge ab" icon={Star} className="mb-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {POPULAR_CODES.map((c) => (
            <CodeCard key={c.code} code={c} />
          ))}
        </div>
      </ToolSection>

      {/* Vollständige Liste mit Filter + Suche */}
      <ToolSection
        title="Vollständige Code-Liste"
        icon={ListTree}
        className="mb-8"
        actions={<ToneBadge tone="neutral" className="tabular">{filtered.length} von {ALL_AMAZON_CODES.length}</ToneBadge>}
      >
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Code, Bedeutung, Konto-Empfehlung suchen …"
            aria-label="Codes durchsuchen"
            className="pl-9"
          />
        </div>
        <ChoiceGroup<AmazonCodeCategory | "all">
          label="Kategorie"
          size="sm"
          className="mb-5"
          value={filterCategory}
          onChange={setFilterCategory}
          options={[
            { value: "all", label: <>Alle <span className="tabular opacity-70">({ALL_AMAZON_CODES.length})</span></> },
            ...categories
              .map((cat) => ({ cat, count: ALL_AMAZON_CODES.filter((c) => c.category === cat).length }))
              .filter((x) => x.count > 0)
              .map((x) => ({
                value: x.cat,
                label: (
                  <>
                    {CATEGORY_LABELS[x.cat]} <span className="tabular opacity-70">({x.count})</span>
                  </>
                ),
              })),
          ]}
        />
        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Keine Codes gefunden"
            description={query ? `Für „${query}“ gibt es in dieser Kategorie keinen Treffer. Probier einen kürzeren Suchbegriff oder „Alle“.` : "In dieser Kategorie gibt es keinen Treffer."}
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((c) => (
              <CodeCard key={c.code} code={c} />
            ))}
          </div>
        )}
      </ToolSection>

      {/* Buchungs-Logik (Cheatsheet) */}
      <ToolSection title="Buchungs-Logik in einem Satz" icon={BookOpen} className="mb-6">
        <ul className="space-y-2 text-sm leading-relaxed">
          {[
            {
              icon: ArrowDownCircle,
              cls: "text-danger",
              t: "Minus = Aufwand",
              d: "Meist Fremdleistungen (3100/5900) oder Werbekosten (4600/6600). Seit 08/2024 mit 19% VSt abziehbar (Schlüssel 9).",
            },
            {
              icon: ArrowUpCircle,
              cls: "text-success",
              t: "Plus auf SG/BG-Code = Aufwandsminderung",
              d: "(Refund einer Gebühr): gegen das gleiche Aufwandskonto buchen, VSt korrigieren.",
            },
            {
              icon: ArrowUpCircle,
              cls: "text-success",
              t: "Plus aus FBA-Reimbursement (verlorene/beschädigte Ware)",
              d: "= Schadenersatz (SKR03 2742 / SKR04 4970), 0 % USt, nicht steuerbar. Nicht auf 8400 buchen: das ist das Automatikkonto Erlöse 19 %.",
            },
            {
              icon: RefreshCcw,
              cls: "text-accent-blue",
              t: "AUSZ-* (Auszahlung)",
              d: "= Geldtransit (1360/1460). Bank an Geldtransit. Erlöse werden separat aus PayJoe gebucht und gegen Geldtransit verrechnet.",
            },
            {
              icon: ArrowDownCircle,
              cls: "text-warning",
              t: "A-to-z, Chargeback, Customer-Return",
              d: "= Erlösschmälerung 19 % (8720/4720), KEIN Aufwand! Mindert deinen Umsatz.",
            },
          ].map((r) => (
            <li key={r.t} className="flex items-start gap-3 rounded-xl bg-secondary/60 px-4 py-3">
              <r.icon className={`mt-0.5 h-4 w-4 shrink-0 ${r.cls}`} aria-hidden="true" />
              <p className="text-foreground/85">
                <strong className="font-semibold text-foreground">{r.t}</strong> {r.d}
              </p>
            </li>
          ))}
        </ul>
      </ToolSection>

      {/* Felix-CTA */}
      <section className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-ink p-6 text-primary-foreground shadow-soft md:flex-row md:items-center">
        <div>
          <h2 className="text-base font-semibold">Code unklar oder Sonderfall?</h2>
          <p className="mt-1 text-sm text-primary-foreground/75">
            Felix kennt diese Liste auswendig und hilft mit konkreten Buchungssätzen.
          </p>
        </div>
        <Button asChild className="bg-white text-primary hover:bg-white/90">
          <Link to="/felix">
            Felix fragen <ChevronRight />
          </Link>
        </Button>
      </section>

      {/* Quellen */}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Quellen: PayJoe-Dokumentation (hilfe.payjoe.de), JERA Fibu-Schnittstelle (Amazon-USt-Update
        01.08.2024), Amazon Seller Forum DE, Standard SKR03/SKR04. Keine Steuerberatung, konkrete Verbuchung
        mit eigenem StB klären.{" "}
        <a
          href="https://hilfe.payjoe.de/online-haendler/Content/topics_payjoe/zahlungssysteme/amazon.htm"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-0.5 text-accent-blue hover:underline"
        >
          PayJoe-Doku <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </p>
    </CockpitShell>
  );
};

export default AmazonBuchungen;
