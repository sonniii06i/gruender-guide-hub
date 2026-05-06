import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Search, ArrowDownCircle, ArrowUpCircle, RefreshCcw, Info, ChevronRight, ExternalLink } from "lucide-react";
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
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-600 px-2 py-0.5 text-[11px] font-semibold">
        <ArrowDownCircle className="h-3 w-3" /> Minus
      </span>
    );
  }
  if (sign === "plus") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[11px] font-semibold">
        <ArrowUpCircle className="h-3 w-3" /> Plus
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-700 px-2 py-0.5 text-[11px] font-semibold">
      <RefreshCcw className="h-3 w-3" /> ±
    </span>
  );
};

const UstBadge = ({ ust }: { ust: AmazonCode["ust"] }) => {
  const colors: Record<AmazonCode["ust"], string> = {
    "19% VSt-abziehbar": "bg-accent-blue/10 text-accent-blue",
    "Reverse Charge": "bg-purple-500/10 text-purple-600",
    "0% steuerfrei": "bg-secondary text-muted-foreground",
    OSS: "bg-cyan-500/10 text-cyan-600",
    innergemeinschaftlich: "bg-cyan-500/10 text-cyan-600",
    "Drittland steuerfrei": "bg-secondary text-muted-foreground",
    "Erlös-Korrektur": "bg-orange-500/10 text-orange-600",
    "nicht steuerbar": "bg-secondary text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${colors[ust] || "bg-secondary"}`}>
      {ust}
    </span>
  );
};

const CodeCard = ({ code }: { code: AmazonCode }) => (
  <div className="rounded-2xl border border-border bg-card p-4 hover:border-accent-blue/40 transition-colors">
    <div className="flex items-start justify-between gap-3 mb-2">
      <div>
        <code className="font-mono text-sm font-bold text-accent-blue">{code.code}</code>
        <div className="text-sm font-semibold mt-0.5">{code.label}</div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <SignBadge sign={code.sign} />
        <UstBadge ust={code.ust} />
      </div>
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{code.meaning}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
      <div className="rounded-lg bg-secondary/40 px-2 py-1.5">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">SKR03</div>
        <div className="font-mono">{code.skr03}</div>
      </div>
      <div className="rounded-lg bg-secondary/40 px-2 py-1.5">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">SKR04</div>
        <div className="font-mono">{code.skr04}</div>
      </div>
    </div>
    <div className="mt-2 text-[11px] text-muted-foreground italic leading-snug">
      <span className="font-semibold not-italic">So buchen:</span> {code.bookingHint}
    </div>
    {code.example && (
      <div className="mt-2 text-[11px] rounded-lg bg-accent-blue/5 border border-accent-blue/20 px-2 py-1.5">
        <span className="font-semibold">Beispiel:</span> <span className="font-mono">{code.example}</span>
      </div>
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
      title="Amazon-Buchungstexte – die komplette Liste"
      subtitle="Wenn du als Amazon-Verkäufer (FBA / FBM) Buchungen wie AMA-SG-DE-MZNFS, AMA-BG-IT, AUSZ-DE oder MZNFS auf deiner Bank/PayJoe siehst – hier ist die Konto-Empfehlung pro Code (SKR03/04, USt-Behandlung, Soll/Haben). Stand Mai 2026."
    >
      {/* Wichtige Hinweise */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-4 mb-6 text-xs leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Wichtig zu wissen (Stand 2026):</div>
            <ul className="space-y-1 text-muted-foreground list-disc pl-4">
              <li>
                <strong>Seit 01.08.2024</strong> rechnet Amazon EU Sarl Niederlassung Deutschland mit{" "}
                <strong>deutscher 19% USt</strong> ab → Vorsteuer abziehbar (Schlüssel <strong>9</strong> in
                SKR03 bzw. <strong>9 oder 401</strong> lt. PayJoe-Doku). KEIN Reverse Charge mehr für DE!
              </li>
              <li>
                Für Marketplaces außerhalb DE (IT/FR/ES/NL/UK/COM): Amazon AEU rechnet mit lokaler EU-USt →
                Reverse Charge §13b UStG für DE-Händler. Für UK/US: Drittland (Schlüssel 94).
              </li>
              <li>
                <strong>AUSZ-DE</strong> ist KEIN Aufwand und KEIN Erlös – nur Geldtransit (1360 bzw. 1460).
              </li>
              <li>
                <strong>Reimbursements (FBA-Erstattungen für Schäden/Verluste)</strong> = sonstiger Ertrag,
                meist nicht steuerbar (echter Schadensersatz).
              </li>
              <li>
                <strong>Refunds (A-to-z, Customer-Returns)</strong> = Erlösschmälerung (8730/4730), nicht als
                Aufwand buchen.
              </li>
              <li>Disclaimer: Orientierungshilfe – konkrete Buchung immer mit StB klären.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Live-Lookup: Felix-artiges Tool */}
      <div className="rounded-2xl border border-accent-blue/40 bg-card p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-accent-blue text-primary-foreground px-3 py-1 text-xs font-bold">
            Live-Lookup
          </span>
          <span className="text-sm font-semibold">Code aus Bank/Lexoffice einfügen</span>
        </div>
        <Input
          value={lookupInput}
          onChange={(e) => setLookupInput(e.target.value)}
          placeholder="z.B. AMA-SG-DE-MZNFS, AMA-BG-DE, AUSZ-DE oder MZNFS"
          className="font-mono mb-3"
        />
        {lookup && (lookup.prefix || lookup.sub) && (
          <div className="space-y-3">
            {lookup.prefix && (
              <div className="rounded-xl bg-secondary/40 p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Prefix erkannt</div>
                <CodeCard code={lookup.prefix} />
              </div>
            )}
            {lookup.sub && (
              <div className="rounded-xl bg-secondary/40 p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Sub-Code</div>
                <CodeCard code={lookup.sub} />
              </div>
            )}
            {lookup.prefix && lookup.sub && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
                <div className="font-semibold mb-1">Empfehlung kombiniert:</div>
                <div className="text-muted-foreground leading-relaxed">
                  Verbuche als <strong>{lookup.sub.label}</strong> auf{" "}
                  <span className="font-mono">{lookup.sub.skr03}</span> (SKR03) bzw.{" "}
                  <span className="font-mono">{lookup.sub.skr04}</span> (SKR04). USt:{" "}
                  <strong>{lookup.sub.ust}</strong>. {lookup.sub.bookingHint}
                </div>
              </div>
            )}
          </div>
        )}
        {lookup && !lookup.prefix && !lookup.sub && lookupInput.trim() && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-800">
            Code nicht gefunden. Versuch nur den Sub-Teil (z.B. <code>MZNFS</code> statt{" "}
            <code>AMA-SG-DE-MZNFS</code>) oder schau in der Liste unten. Oder frag{" "}
            <Link to="/felix" className="underline font-semibold">
              Felix
            </Link>{" "}
            mit deinem PayJoe-Auszug.
          </div>
        )}
      </div>

      {/* Top-Codes */}
      <div className="mb-8">
        <h2 className="text-base font-bold mb-3">Die wichtigsten Codes (~95% aller Auszüge)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {POPULAR_CODES.map((c) => (
            <CodeCard key={c.code} code={c} />
          ))}
        </div>
      </div>

      {/* Vollständige Liste mit Filter + Suche */}
      <div className="mb-4">
        <h2 className="text-base font-bold mb-3">Vollständige Code-Liste ({ALL_AMAZON_CODES.length} Einträge)</h2>
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Code, Bedeutung, Konto-Empfehlung suchen..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button
            onClick={() => setFilterCategory("all")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
              filterCategory === "all"
                ? "bg-accent-blue text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            Alle ({ALL_AMAZON_CODES.length})
          </button>
          {categories.map((cat) => {
            const count = ALL_AMAZON_CODES.filter((c) => c.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                  filterCategory === cat
                    ? "bg-accent-blue text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {CATEGORY_LABELS[cat]} ({count})
              </button>
            );
          })}
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Keine Codes gefunden für "{query}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((c) => (
              <CodeCard key={c.code} code={c} />
            ))}
          </div>
        )}
      </div>

      {/* Buchungs-Logik (Cheatsheet) */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-8">
        <h2 className="text-base font-bold mb-3">Buchungs-Logik in einem Satz</h2>
        <div className="space-y-2 text-xs leading-relaxed">
          <div className="flex items-start gap-2 rounded-lg bg-secondary/40 px-3 py-2">
            <ArrowDownCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong>Minus = Aufwand</strong> – meist Fremdleistungen (3100/5900) oder Werbekosten
              (4600/6600). Seit 08/2024 mit 19% VSt abziehbar (Schlüssel 9).
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-secondary/40 px-3 py-2">
            <ArrowUpCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Plus auf SG/BG-Code = Aufwandsminderung</strong> (Refund einer Gebühr) – gegen das
              gleiche Aufwandskonto buchen, VSt korrigieren.
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-secondary/40 px-3 py-2">
            <ArrowUpCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Plus aus FBA-Reimbursement (verlorene/beschädigte Ware)</strong> = sonstiger Ertrag
              (8400/4830), 0% USt (Schadensersatz).
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-secondary/40 px-3 py-2">
            <RefreshCcw className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
            <div>
              <strong>AUSZ-* (Auszahlung)</strong> = Geldtransit (1360/1460). Bank an Geldtransit. Erlöse
              werden separat aus PayJoe gebucht und gegen Geldtransit verrechnet.
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-secondary/40 px-3 py-2">
            <ArrowDownCircle className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong>A-to-z, Chargeback, Customer-Return</strong> = Erlösschmälerung (8730/4730), KEIN
              Aufwand! Mindert deinen Umsatz.
            </div>
          </div>
        </div>
      </div>

      {/* Felix-CTA */}
      <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-5 mt-6 text-center">
        <div className="text-sm font-semibold mb-1">Code unklar oder Sonderfall?</div>
        <div className="text-xs text-muted-foreground mb-3">
          Felix kennt diese Liste auswendig und hilft mit konkreten Buchungssätzen.
        </div>
        <Link
          to="/felix"
          className="inline-flex items-center gap-1 rounded-full bg-accent-blue text-primary-foreground px-4 py-1.5 text-xs font-semibold hover:opacity-90"
        >
          Felix fragen <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Quellen */}
      <div className="text-[11px] text-muted-foreground mt-6 leading-relaxed">
        Quellen: PayJoe-Dokumentation (hilfe.payjoe.de), JERA Fibu-Schnittstelle (Amazon-USt-Update
        01.08.2024), Amazon Seller Forum DE, Standard SKR03/SKR04. Keine Steuerberatung – konkrete Verbuchung
        mit eigenem StB klären.{" "}
        <a
          href="https://hilfe.payjoe.de/online-haendler/Content/topics_payjoe/zahlungssysteme/amazon.htm"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-0.5 text-accent-blue hover:underline"
        >
          PayJoe-Doku <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </CockpitShell>
  );
};

export default AmazonBuchungen;
