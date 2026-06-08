import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgePercent, ArrowRight, Check } from "lucide-react";

// Dezente 20%-Rabatt-Leiste für die Free-Tool-Landingpages (Code FOUNDER).
// CTA führt in den Checkout (Stripe allow_promotion_codes ist aktiv).
export function FreeToolPromo() {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText("FOUNDER");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="px-4 sm:px-6 mb-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
          <BadgePercent className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <span>
            <span className="font-semibold">20 % Rabatt</span> auf dein Abo mit Code
          </span>
          <button
            onClick={copyCode}
            className="inline-flex items-center gap-1 rounded-md border border-amber-300 bg-white px-2 py-0.5 font-mono text-xs font-bold tracking-wide text-amber-700 transition-colors hover:bg-amber-100"
            aria-label="Rabattcode FOUNDER kopieren"
          >
            FOUNDER
            {copied && <Check className="h-3 w-3" />}
          </button>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-1 font-medium text-amber-700 hover:text-amber-900 hover:underline"
          >
            einlösen
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
