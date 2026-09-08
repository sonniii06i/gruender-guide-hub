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
  /** Nettopreis in Cent. GründerX weist netto aus (AGB § 4 Abs. 1). */
  netCents: number;
  /** Streichpreis in Cent, falls es einen echten Vergleichswert gibt. */
  anchorCents?: number;
  note?: string;
};

const VAT_RATE = 0.19;

export const eur = (cents: number) =>
  (cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export const grossCents = (netCents: number) => Math.round(netCents * (1 + VAT_RATE));

/**
 * Die Buy-Box rechts neben der Galerie — der Block, den man aus jedem
 * Warenshop kennt: Preis, Ausführung, Verfügbarkeit, Kaufknopf, Verkäufer.
 *
 * Zwei Dinge, die die alte Preis-Kachel nicht hatte und die bei einer Ware
 * selbstverständlich sind:
 *  - die Umsatzsteuer-Angabe (§ 3 PAngV) — der Preis stand vorher nackt da,
 *    obwohl die AGB Nettopreise vereinbaren
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
            {eur(v.netCents)}
          </span>
          <span className="text-lg text-muted-foreground">/ Monat</span>
          {v.anchorCents && (
            <>
              <span className="text-base text-muted-foreground line-through">{eur(v.anchorCents)}</span>
              <Badge className="border-0 bg-success text-xs font-bold text-white">
                −{Math.round((1 - v.netCents / v.anchorCents) * 100)} %
              </Badge>
            </>
          )}
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Nettopreis zzgl. 19 % USt. = <strong className="text-foreground">{eur(grossCents(v.netCents))} brutto</strong>
          {" · "}Abrechnung monatlich
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
                    ? "border-accent-blue bg-accent-blue/5 shadow-sm"
                    : "border-border bg-card hover:border-accent-blue/40",
                )}
              >
                <span className="block text-sm font-semibold text-foreground">{opt.name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {eur(opt.netCents)} / Monat
                  {opt.anchorCents && (
                    <span className="ml-1.5 line-through">{eur(opt.anchorCents)}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <DeliveryFacts cancelNote={cancelNote} />

      {children}

      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-accent-blue" /> Sichere Zahlung über Stripe · SSL-verschlüsselt
        </p>
        <p className="flex items-center gap-2">
          <CreditCard className="h-3.5 w-3.5 text-accent-blue" /> {paymentMethods}
        </p>
        <p className="flex items-center gap-2">
          <Store className="h-3.5 w-3.5 text-accent-blue" /> Verkauf und Bereitstellung durch {seller}
        </p>
      </div>
    </div>
  );
};
