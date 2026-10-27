import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { PLANS, formatEurCents } from "@/config/pricing";

// Schwester-Marken-Tipp (27.10.2026, HQ growth-schwester): genau eine kontextuelle Empfehlung pro Guide – nur für Paare mit
// belegtem Kaufmoment (GründerX → AnwaltX bei Shop/Rechtstexten, GründerX → ArbitrageX bei Amazon). Messbar per UTM.
// Läuft bei der Schwester gerade eine Aktion (HQ aktionen.py, /px/aktion/<marke>.json), steht sie dazu – sonst nichts.
type Ziel = "anwaltx" | "arbitragex";
type Aktion = { aktiv: boolean; text?: string; code?: string };

const TIPPS: Record<Ziel, { marke: string; url: string; titel: string; text: string; cta: string }> = {
  anwaltx: {
    marke: "AnwaltX",
    url: "https://anwaltx.de/",
    titel: "Impressum, AGB, Widerruf, Datenschutz – für deinen Shop",
    text: "Sobald du verkaufst, brauchst du Rechtstexte. AnwaltX, unsere Schwester-Marke, erstellt sie für deinen Shop. Ersetzt im Einzelfall keine anwaltliche Beratung.",
    cta: "Rechtstexte bei AnwaltX",
  },
  arbitragex: {
    marke: "ArbitrageX",
    url: "https://arbitragex.de/",
    titel: "Gewinn je Artikel – und was Amazon dir schuldet",
    text: "Rechne vor dem ersten Einkauf deinen Gewinn nach allen Amazon-Gebühren. Wenn du verkaufst, findet ArbitrageX, unsere Schwester-Marke, offene Erstattungen und zeigt Gewinn und Cashflow deines Kontos.",
    cta: "ArbitrageX ansehen",
  },
};

// Guide-Slug → Schwester (nur belegte Kaufmomente; max. 1 Tipp je Seite)
const ZIEL_JE_GUIDE: Record<string, Ziel> = {
  "dsgvo-shop": "anwaltx", "shopify-launch": "anwaltx", "brand-owner-d2c-setup": "anwaltx", "kaufland-launch": "anwaltx",
  "tiktok-shop-launch": "anwaltx", "tiktok-shop-starten": "anwaltx",
  "amazon-fba-launch": "arbitragex", "pan-eu-fba": "arbitragex", "reseller-marketplace-setup": "arbitragex",
};

export function schwesterZiel(slug: string): Ziel | null {
  return ZIEL_JE_GUIDE[slug] ?? null;
}

export default function SchwesterTipp({ slug }: { slug: string }) {
  const ziel = schwesterZiel(slug);
  const [aktion, setAktion] = useState<Aktion | null>(null);

  useEffect(() => {
    if (!ziel) return;
    let ab = false;
    fetch(`https://arbitragex.de/px/aktion/${ziel}.json`, { credentials: "omit" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Aktion | null) => !ab && d?.aktiv && setAktion(d))
      .catch(() => undefined);
    return () => {
      ab = true;
    };
  }, [ziel]);

  if (!ziel) return null;
  const t = TIPPS[ziel];
  const href = `${t.url}?utm_source=gruenderx&utm_medium=schwester&utm_campaign=guide-${slug}`;
  return (
    <aside
      aria-label={`Tipp: ${t.marke}`}
      className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6"
      data-schwester={ziel}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">Passt dazu · {t.marke}</p>
      <h2 className="mb-2 text-lg font-bold leading-snug sm:text-xl">{t.titel}</h2>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
      {ziel === "anwaltx" ? (
        <p className="mb-3 text-sm text-muted-foreground">
          Beides zusammen: Founder-Set GründerX + AnwaltX für {formatEurCents(PLANS.bundle.grossCents)} im Monat (inkl. USt.).
        </p>
      ) : null}
      {aktion?.text ? (
        <p className="mb-3 flex items-start gap-2 rounded-lg bg-background px-3 py-2 text-sm font-medium">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>
            Gerade bei {t.marke}: {aktion.text}
            {aktion.code ? <> Code <b>{aktion.code}</b></> : null}
          </span>
        </p>
      ) : null}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        {t.cta} <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </aside>
  );
}
