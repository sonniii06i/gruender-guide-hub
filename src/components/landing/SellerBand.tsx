import { Link } from "react-router-dom";
import { ArrowRight, Check, ClipboardCheck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";

const MARKETPLACES = [
  "Amazon FBA & Pan-EU",
  "Shopify & eigener Shop",
  "Kaufland, Otto, eBay",
  "TikTok Shop",
];

const COMPLIANCE = [
  "LUCID (VerpackDG)",
  "WEEE / EAR",
  "GPSR",
  "OSS & USt-Fristen",
];

/**
 * Eigene Section für den stärksten Zielgruppen-Cluster:
 * E-Commerce-Operator und Amazon-Seller.
 */
export const SellerBand = () => (
  <section className="py-14 md:py-28">
    <div className="container max-w-6xl">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold leading-[1.1] md:text-[2.75rem]">
            Verkaufen ist das eine. Angemeldet sein das andere.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Felix richtet dir Marktplätze und Pflichtregistrierungen der Reihe
            nach ein, bevor ein Listing gesperrt wird.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Marktplätze", items: MARKETPLACES, Icon: Store },
              { title: "Pflichten", items: COMPLIANCE, Icon: ClipboardCheck },
            ].map(({ title, items, Icon }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <Icon className="h-4 w-4 text-brand-green" aria-hidden="true" />
                  {title}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((m) => (
                    <li key={m} className="flex items-center gap-2.5 text-[15px] text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand-green" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-9 h-12 rounded-xl bg-gradient-primary px-6 font-semibold shadow-glow">
            <Link to="/auth">
              Zugang freischalten
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-x-6 bottom-0 top-10 -z-10 rounded-[2rem] bg-brand-green-soft" aria-hidden="true" />
          <Mascot
            name="felix-boxes"
            alt="Felix trägt einen Stapel Versandkartons"
            className="w-56 md:w-72"
          />
        </div>
      </div>
    </div>
  </section>
);
