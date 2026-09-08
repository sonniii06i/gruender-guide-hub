import { CheckCircle2, Truck, Undo2 } from "lucide-react";

/**
 * Der Block, der im Shop direkt unter dem Preis steht: Verfügbarkeit,
 * Lieferung, Rückgabe.
 *
 * Wichtig: Hier steht kein künstlicher Knappheits-Hinweis ("nur noch 2 auf
 * Lager"). Ein Abo hat keinen Bestand, und eine erfundene Zahl wäre eine
 * irreführende geschäftliche Handlung (§ 5 UWG) — ausgerechnet auf der
 * Verkaufsseite eines Rechts-Produkts.
 */
export const DeliveryFacts = ({ cancelNote }: { cancelNote: string }) => (
  <div className="space-y-2 rounded-xl border border-border bg-muted/20 p-4">
    <p className="flex items-start gap-2.5 text-sm">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
      <span>
        <strong className="font-semibold text-success">Sofort verfügbar</strong>
        <span className="text-muted-foreground"> — kein Lieferengpass, keine Wartezeit</span>
      </span>
    </p>
    <p className="flex items-start gap-2.5 text-sm">
      <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
      <span className="text-muted-foreground">
        <strong className="font-medium text-foreground">Lieferung: digital, 0,00 €</strong> — Freischaltung
        im Konto unmittelbar nach der Zahlung
      </span>
    </p>
    <p className="flex items-start gap-2.5 text-sm">
      <Undo2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
      <span className="text-muted-foreground">
        <strong className="font-medium text-foreground">Rückgabe:</strong> {cancelNote}
      </span>
    </p>
  </div>
);
