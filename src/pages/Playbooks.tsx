import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { PLAYBOOKS } from "@/data/playbooks";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Seo } from "@/components/Seo";

const FILTERS = [
  { id: "all", label: "Alle" },
  { id: "Einfach", label: "Einfach" },
  { id: "Mittel", label: "Mittel" },
  { id: "Komplex", label: "Komplex" },
];

const Playbooks = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return PLAYBOOKS.filter((p) => {
      if (filter !== "all" && p.difficulty !== filter) return false;
      if (!ql) return true;
      return (
        p.title.toLowerCase().includes(ql) ||
        p.tagline.toLowerCase().includes(ql) ||
        p.outcome.toLowerCase().includes(ql)
      );
    });
  }, [q, filter]);

  return (
    <>
      <Seo
        title="Gründungs-Guides – GmbH, UG, Einzelunternehmen & mehr | GründerX"
        description={`${PLAYBOOKS.length} Schritt-für-Schritt-Guides: GmbH gründen, UG gründen, US-LLC, Holding, Marke anmelden, Amazon FBA & mehr. Mit Kosten, Dauer und Pflichtunterlagen.`}
        path="/playbooks"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: PLAYBOOKS.slice(0, 30).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://gruenderx.de/playbook/preview/${p.slug}`,
            name: p.title,
          })),
        }}
      />
      <CockpitShell
        eyebrow="🎓 Guides"
        title="Alle Gründungs-Guides"
        subtitle="Wähle einen Guide – wir führen dich Schritt für Schritt durch jedes Detail. Kein Vergessen, keine Lücken."
      >
      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Guide suchen…"
            className="pl-9 h-10 rounded-full bg-card"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-colors",
                filter === f.id
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue font-semibold"
                  : "border-border hover:bg-accent text-muted-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => <GuideCard key={p.slug} pb={p} />)}
      </div>
      {list.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Keine Guides gefunden.</p>
        </div>
      )}
      </CockpitShell>
    </>
  );
};

export default Playbooks;
