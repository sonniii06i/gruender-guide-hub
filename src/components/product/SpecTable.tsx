import { cn } from "@/lib/utils";

export type Spec = { label: string; value: React.ReactNode };

/**
 * "Produktdetails" wie im Shop: zweispaltige Merkmalstabelle.
 *
 * Die Zeilen sind bewusst die Felder, die man bei einer Ware erwartet
 * (Artikelnummer, Lieferumfang, Lieferzeit, Rückgabe) — nur mit den Werten,
 * die für ein Software-Abo tatsächlich stimmen. Erfundene Attribute wie
 * "Gewicht" oder "Lagerbestand: 3 Stück" stehen hier absichtlich nicht.
 */
export const SpecTable = ({ specs, className }: { specs: Spec[]; className?: string }) => (
  <dl className={cn("divide-y divide-border rounded-xl border border-border overflow-hidden", className)}>
    {specs.map((s) => (
      <div key={s.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3 odd:bg-muted/30">
        <dt className="text-sm font-medium text-muted-foreground">{s.label}</dt>
        <dd className="text-sm text-foreground sm:col-span-2">{s.value}</dd>
      </div>
    ))}
  </dl>
);
