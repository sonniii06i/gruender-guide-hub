import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgePercent, ArrowRight, Copy, Check } from "lucide-react";

// Prominenter 20%-Rabatt-Banner für die Free-Tool-Landingpages (Code FOUNDER).
// CTA führt direkt in den Checkout (Stripe allow_promotion_codes ist aktiv).
export function FreeToolPromo() {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText("FOUNDER");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="px-4 sm:px-6 mb-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 sm:p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold mb-2">
                <BadgePercent className="h-3.5 w-3.5" /> Limitiertes Gründer-Angebot
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                20 % Rabatt auf dein GründerX-Abo
              </h2>
              <p className="text-sm text-white/90 mt-1">
                Über 80 Tools, Felix KI-Co-Founder &amp; alle Wizards – jetzt mit Code{" "}
                <span className="font-bold">FOUNDER</span> dauerhaft günstiger.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-white/70 bg-white/10 px-4 py-2.5 font-mono text-lg font-bold tracking-wider hover:bg-white/20 transition-colors"
                aria-label="Rabattcode FOUNDER kopieren"
              >
                FOUNDER
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 opacity-80" />}
              </button>
              <Link to="/checkout">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-orange-600 shadow-sm hover:bg-orange-50 transition-colors whitespace-nowrap">
                  Jetzt 20 % sichern
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
