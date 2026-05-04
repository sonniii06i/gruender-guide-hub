import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { Star, Tag, ExternalLink } from "lucide-react";

interface Provider {
  name: string;
  category: string;
  region: string;
  starting: string;
  rating: number;
  pros: string;
  coop?: string;
  url: string;
}

const PROVIDERS: Provider[] = [
  // Banking DE
  { name: "Qonto", category: "Banking DE", region: "DE/EU", starting: "9 €/Mon", rating: 4.5, pros: "Beste App, Multi-User, DATEV-Export", coop: "30 Tage gratis + 50 € Bonus", url: "https://qonto.com" },
  { name: "Holvi", category: "Banking DE", region: "DE", starting: "9 €/Mon", rating: 4.2, pros: "Buchhaltung integriert, Solo-Selbstständige", url: "https://holvi.com" },
  { name: "Finom", category: "Banking DE", region: "DE/EU", starting: "0 €/Mon", rating: 4.3, pros: "Kostenloser Tarif, Rechnungstool", coop: "3 Monate Premium gratis", url: "https://finom.co" },
  { name: "Kontist", category: "Banking DE", region: "DE", starting: "9 €/Mon", rating: 4.0, pros: "Steuer-Tool für Freelancer", url: "https://kontist.com" },
  // Banking US
  { name: "Mercury", category: "Banking US", region: "US", starting: "0 $", rating: 4.7, pros: "Top für US-LLC Founder, free", coop: "250 $ Bonus ab 10k Deposit", url: "https://mercury.com" },
  { name: "Wise Business", category: "Banking US", region: "global", starting: "0 €", rating: 4.5, pros: "Multi-Currency, beste FX-Raten", url: "https://wise.com" },
  { name: "Relay", category: "Banking US", region: "US", starting: "0 $", rating: 4.3, pros: "20 Konten, Rollen & Rechte", url: "https://relayfi.com" },
  { name: "Brex", category: "Banking US", region: "US", starting: "0 $", rating: 4.2, pros: "Kreditkarte für Startups", url: "https://brex.com" },
  // Versand DACH
  { name: "Sendcloud", category: "Versand DACH", region: "DACH/EU", starting: "ab 23 €/Mon", rating: 4.6, pros: "Multi-Carrier, Retouren-Portal", coop: "1. Monat gratis", url: "https://sendcloud.de" },
  { name: "DHL Geschäftskunden", category: "Versand DACH", region: "DE", starting: "auf Anfrage", rating: 4.0, pros: "Standard für DE-Versand", url: "https://dhl.de" },
  { name: "DPD", category: "Versand DACH", region: "DACH", starting: "auf Anfrage", rating: 3.8, pros: "Günstig ab 100 Pakete/Monat", url: "https://dpd.com" },
  // Buchhaltung
  { name: "Lexoffice", category: "Buchhaltung", region: "DE", starting: "11 €/Mon", rating: 4.4, pros: "Marktführer, DATEV-Export", coop: "6 Monate -50 %", url: "https://lexoffice.de" },
  { name: "sevDesk", category: "Buchhaltung", region: "DE", starting: "9 €/Mon", rating: 4.3, pros: "Günstig, gute Mobile-App", url: "https://sevdesk.de" },
  { name: "Candis", category: "Buchhaltung", region: "DE", starting: "ab 99 €/Mon", rating: 4.5, pros: "Rechnungs-Workflow für Teams", url: "https://candis.io" },
  { name: "BuchhaltungsButler", category: "Buchhaltung", region: "DE", starting: "ab 19 €/Mon", rating: 4.2, pros: "Automatik-Buchungen", url: "https://buchhaltungsbutler.de" },
  // 3PL
  { name: "Byrd", category: "3PL", region: "EU", starting: "auf Anfrage", rating: 4.4, pros: "EU-weite Lager, Shopify-Integration", coop: "0 € Onboarding", url: "https://getbyrd.com" },
  { name: "ShipBob", category: "3PL", region: "global", starting: "auf Anfrage", rating: 4.3, pros: "US + EU + UK Lager", url: "https://shipbob.com" },
  // LUCID
  { name: "Lizenzero", category: "LUCID", region: "DE", starting: "ab 39 €/Jahr", rating: 4.5, pros: "Für kleine Mengen ideal", url: "https://lizenzero.de" },
  { name: "Reclay", category: "LUCID", region: "DE", starting: "auf Anfrage", rating: 4.0, pros: "Für hohe Mengen", url: "https://reclay.de" },
  // Email
  { name: "Klaviyo", category: "Email", region: "global", starting: "ab 20 $/Mon", rating: 4.7, pros: "Beste E-Com Email-Plattform", url: "https://klaviyo.com" },
  { name: "Brevo", category: "Email", region: "EU", starting: "0 €/Mon", rating: 4.2, pros: "Günstig, DSGVO-konform (EU)", url: "https://brevo.com" },
  // Tracking
  { name: "Triple Whale", category: "Tracking", region: "global", starting: "ab 129 $/Mon", rating: 4.6, pros: "Top Shopify Attribution", url: "https://triplewhale.com" },
  { name: "Hyros", category: "Tracking", region: "global", starting: "ab 99 $/Mon", rating: 4.5, pros: "Server-Side Tracking, Coaching/Info", url: "https://hyros.com" },
  // Shop
  { name: "Shopify", category: "Shop-System", region: "global", starting: "39 $/Mon", rating: 4.7, pros: "Standard für DTC-Brands", url: "https://shopify.com" },
  { name: "Shopware", category: "Shop-System", region: "DE", starting: "0 € (Open Source)", rating: 4.3, pros: "DE-Standard, B2B-stark", url: "https://shopware.com" },
];

const CATS = ["Alle", ...Array.from(new Set(PROVIDERS.map((p) => p.category)))];

const Anbieter = () => {
  const [cat, setCat] = useState("Alle");
  const [q, setQ] = useState("");

  const list = useMemo(() => PROVIDERS.filter((p) =>
    (cat === "Alle" || p.category === cat) &&
    (q === "" || (p.name + p.pros).toLowerCase().includes(q.toLowerCase()))
  ), [cat, q]);

  return (
    <CockpitShell
      eyebrow="🏆 Anbieter-Vergleichs-Engine"
      title="Die besten Tools – mit verhandelten Coop-Deals"
      subtitle="Wir vergleichen die Top-Anbieter pro Kategorie und handeln exklusive Konditionen für GründerX-Mitglieder raus."
    >
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input placeholder="Anbieter oder Stärke suchen..." value={q} onChange={(e) => setQ(e.target.value)} className="md:max-w-xs" />
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent-blue/40"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p) => (
          <div key={p.name + p.category} className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent-blue">{p.category}</div>
                <h3 className="font-bold text-lg">{p.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                {p.rating.toFixed(1)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.pros}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{p.region}</span>
              <span className="font-semibold text-foreground">{p.starting}</span>
            </div>
            {p.coop && (
              <div className="flex items-start gap-1.5 rounded-xl bg-accent text-accent-foreground p-2.5 text-xs font-semibold mb-3">
                <Tag className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>Coop-Deal: {p.coop}</span>
              </div>
            )}
            <a href={p.url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:underline">
              Zum Anbieter <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Keine Anbieter gefunden.</div>
      )}
    </CockpitShell>
  );
};

export default Anbieter;
