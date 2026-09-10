import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CreditCard, Lock, Store } from "lucide-react";
import { DeliveryFacts } from "./DeliveryFacts";

export type Variant = {
  id: string;
  /** Name der Ausführung, wie er auch im Warenkorb und auf der Rechnung steht. */
  name: string;
  /** Artikelnummer — im Shop die Zeile unter dem Titel, hier echte SKUs. */
  sku: string;
  /**
   * BRUTTOpreis in Cent — der Betrag, den Stripe tatsächlich abbucht.
   *
   * Hier stand vorher "Nettopreis", und die Buy-Box schlug 19 % obendrauf.
   * Das war falsch: Die AGB § 4 Abs. 1 führt GründerX Solo ausdrücklich mit
   * „54,61 € netto / Monat (64,99 € brutto inkl. 19 % USt)" und das Bundle
   * mit „84,03 € netto (99,99 € brutto)". Der Checkout setzt zudem kein
   * `automatic_tax`, Stripe zieht diesen Betrag also unverändert ein. Der
   * Nettoanteil wird deshalb herausgerechnet, nicht aufgeschlagen.
   */
  grossCents: number;
  /** Streichpreis in Cent (brutto), falls es einen echten Vergleichswert gibt. */
  anchorCents?: number;
  /** Abrechnungszeitraum — bestimmt die Beschriftung und den Tagespreis. */
  period: "month" | "year";
  note?: string;
};

const VAT_RATE = 0.19;

export const eur = (cents: number) =>
  (cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/** Nettoanteil eines Bruttobetrags. */
export const netCents = (gross: number) => Math.round(gross / (1 + VAT_RATE));

/**
 * Preis pro Tag — der Reframe, der aus "64,99 € im Monat" etwas macht, das
 * man gegen eine Anwaltsstunde halten kann.
 */
export const perDayCents = (gross: number, period: "month" | "year") =>
  Math.round(gross / (period === "year" ? 365 : 30));

/**
 * Die Buy-Box rechts neben der Galerie — der Block, den man aus jedem
 * Warenshop kennt: Preis, Ausführung, Verfügbarkeit, Kaufknopf, Verkäufer.
 *
 * Zwei Dinge, die die alte Preis-Kachel nicht hatte und die bei einer Ware
 * selbstverständlich sind:
 *  - die Umsatzsteuer-Angabe (§ 3 PAngV) — der Preis stand vorher nackt da
 *  - die Artikelnummer, damit Warenkorb, Rechnung und Support dieselbe
 *    Bezeichnung benutzen
 */
export const ProductBuyBox = ({
  brand,
  title,
  subtitle,
  variants,
  selected,
  onSelect,
  cancelNote,
  seller,
  paymentMethods,
  children,
}: {
  brand: string;
  title: string;
  subtitle: string;
  variants: Variant[];
  selected: string;
  onSelect: (id: string) => void;
  cancelNote: string;
  seller: string;
  /**
   * Die tatsaechlich freigeschalteten Zahlungswege. Kein Default-Text:
   * Was hier steht, muss zur Stripe-Session passen (payment_method_types),
   * sonst wirbt die Seite mit einer Zahlart, die im Checkout fehlt.
   */
  paymentMethods: string;
  /** Kaufknopf + alles, was direkt darunter gehört. */
  children: React.ReactNode;
}) => {
  const v = variants.find((x) => x.id === selected) ?? variants[0];

  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold text-accent-blue">{brand}</span>
          <span className="text-muted-foreground">Art.-Nr. {v.sku}</span>
        </div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      </div>

      <hr className="border-border" />

      {/* Preisblock */}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {eur(v.grossCents)}
          </span>
          <span className="text-lg text-muted-foreground">/ {v.period === "year" ? "Jahr" : "Monat"}</span>
          {v.anchorCents && (
            <>
              <span className="text-base text-muted-foreground line-through">{eur(v.anchorCents)}</span>
              <Badge className="border-0 bg-success text-xs font-bold text-white">
                −{Math.round((1 - v.grossCents / v.anchorCents) * 100)} %
              </Badge>
            </>
          )}
        </div>
        <p className="mt-1.5 text-base font-semibold text-accent-blue">
          {eur(perDayCents(v.grossCents, v.period))} am Tag
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          inkl. 19 % USt. — <strong className="text-foreground">{eur(netCents(v.grossCents))} netto</strong>, für
          Unternehmer also eine absetzbare Betriebsausgabe.
        </p>
        {v.note && <p className="mt-1 text-sm text-muted-foreground">{v.note}</p>}
      </div>

      {/* Ausführung — im Shop die Größen-/Farbwahl */}
      {variants.length > 1 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-foreground">
            Ausführung: <span className="font-normal text-muted-foreground">{v.name}</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {variants.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelect(opt.id)}
                aria-pressed={opt.id === v.id}
                className={cn(
                  "rounded-xl border-2 p-3 text-left transition-all",
                  opt.id === v.id
                    ? "border-primary bg-accent-blue/5 shadow-sm"
                    : "border-border bg-card hover:border-accent-blue/40",
                )}
              >
                <span className="block text-sm font-semibold text-foreground">{opt.name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {eur(opt.grossCents)} / {opt.period === "year" ? "Jahr" : "Monat"}
                  {opt.anchorCents && (
                    <span className="ml-1.5 line-through">{eur(opt.anchorCents)}</span>
                  )}
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-accent-blue">
                  {eur(perDayCents(opt.grossCents, opt.period))} am Tag
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <DeliveryFacts cancelNote={cancelNote} />

      {children}

      {/* items-start + shrink-0 + min-w-0: mit items-center und ohne min-w-0
          liefen diese Zeilen bei 320px auf 332px Breite und zogen die Seite
          seitlich auf. Das Symbol darf nicht schrumpfen, der Text schon. */}
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-start gap-2">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" />
          <span className="min-w-0">Sichere Zahlung über Stripe · SSL-verschlüsselt</span>
        </p>
        <p className="flex items-start gap-2">
          <CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" />
          <span className="min-w-0">{paymentMethods}</span>
        </p>
        <p className="flex items-start gap-2">
          <Store className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-blue" />
          <span className="min-w-0">Verkauf und Bereitstellung durch {seller}</span>
        </p>
      </div>
    </div>
  );
};
