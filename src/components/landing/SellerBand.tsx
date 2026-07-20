import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";

const MARKETPLACES = [
  "Amazon FBA & Pan-EU",
  "Shopify & eigener Shop",
  "Kaufland, Otto, eBay",
  "TikTok Shop",
];

const COMPLIANCE = [
  "LUCID (VerpackG)",
  "WEEE / EAR",
  "GPSR",
  "OSS & USt-Fristen",
];

/**
 * Eigene Section für den stärksten Zielgruppen-Cluster:
 * E-Commerce-Operator und Amazon-Seller.
 */
export const SellerBand = () => (
  <section className="py-20 md:py-24 bg-secondary/40 border-y border-border">
    <div className="container max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,auto] gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-green mb-3">
            Für E-Commerce &amp; Amazon
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
            Verkaufen ist das eine. Angemeldet sein das andere.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Felix richtet dir Marktplätze und Pflichtregistrierungen der Reihe
            nach ein – bevor ein Listing gesperrt wird.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Marktplätze</h3>
              <ul className="space-y-2">
                {MARKETPLACES.map((m) => (
                  <li key={m} className="text-muted-foreground text-sm">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Pflichten</h3>
              <ul className="space-y-2">
                {COMPLIANCE.map((c) => (
                  <li key={c} className="text-muted-foreground text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button asChild size="lg" className="mt-8 rounded-full bg-gradient-primary text-primary-foreground">
            <Link to="/auth">
              Kostenlos starten
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex justify-center">
          <Mascot
            name="felix-boxes"
            alt="Felix trägt einen Stapel Versandkartons"
            className="w-52 md:w-64"
          />
        </div>
      </div>
    </div>
  </section>
);
