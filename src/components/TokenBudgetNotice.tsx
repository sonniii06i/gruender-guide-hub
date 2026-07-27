import { Link } from "react-router-dom";
import { AlertTriangle, Info } from "lucide-react";
import { useTokenBudget } from "@/hooks/useTokenBudget";

// Hinweis auf das Token-Kontingent.
//
// Absichtlich ein Hinweis und keine Sperre: Ein Gründer mitten im Setup auszusperren
// kostet mehr an Vertrauen, als der Deckel an Kosten spart. Also warnen wir und greifen im Zweifel von Hand ein.
//
// Rendert nichts, solange der Nutzer unter der Warnschwelle liegt. Kein
// Dauerbanner: eine Warnung, die immer da ist, liest niemand mehr.
export const TokenBudgetNotice = ({ className }: { className?: string }) => {
  const { budget, loading } = useTokenBudget();

  if (loading || !budget || !budget.should_warn) return null;

  const eur = (v: number) =>
    v.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

  const resetDate = new Date(budget.period_end).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
  });

  const over = budget.over_limit;

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${
        over
          ? "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200"
          : "border-border bg-muted/50 text-muted-foreground"
      } ${className || ""}`}
      role="status"
    >
      <div className="flex items-start gap-2.5">
        {over ? (
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
        ) : (
          <Info className="h-4 w-4 mt-0.5 shrink-0" />
        )}
        <div className="space-y-1">
          <p className="font-medium">
            {over
              ? "Du hast dein monatliches Nutzungskontingent erreicht"
              : `Du hast ${Math.round(budget.pct)} % deines Nutzungskontingents verbraucht`}
          </p>
          <p>
            {eur(budget.used_eur)} von {eur(budget.limit_eur)} in diesem Monat.
            {over
              ? " Du kannst GründerX weiter nutzen — wir sperren nichts. Bei dauerhaft hoher Nutzung melden wir uns wegen eines passenden Tarifs."
              : ` Zurückgesetzt wird am ${resetDate}.`}
          </p>
          {over && (
            <Link to="/checkout" className="inline-block underline underline-offset-2 font-medium">
              Tarife ansehen
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenBudgetNotice;
