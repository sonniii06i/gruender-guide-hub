import { useMemo, useState } from "react";
import CockpitShell from "@/components/cockpit/CockpitShell";
import { Input } from "@/components/ui/input";
import { GuideCard } from "@/components/dashboard/GuideCard";
import { PLAYBOOKS } from "@/data/playbooks";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceGroup, EmptyState } from "@/components/cockpit/kit";
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
        eyebrow="Guides"
        title="Alle Gründungs-Guides"
        subtitle="Wähle einen Guide, wir führen dich Schritt für Schritt durch jedes Detail. Nichts wird vergessen, keine Lücken."
      >
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-card md:flex-row md:items-center md:p-4">
        <div className="relative flex-1 md:max-w-md">
          <label htmlFor="guide-suche" className="sr-only">Guides durchsuchen</label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="guide-suche"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Guide suchen, z. B. GmbH, Holding, Marke…"
            className="h-10 pl-9"
          />
        </div>
        <ChoiceGroup<string>
          label="Schwierigkeit"
          size="sm"
          value={filter}
          onChange={setFilter}
          options={FILTERS.map((f) => ({ value: f.id, label: f.label }))}
        />
        <p className="text-sm text-muted-foreground tabular md:ml-auto" aria-live="polite">
          {list.length} von {PLAYBOOKS.length} Guides
        </p>
      </div>

      {list.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <GuideCard key={p.slug} pb={p} />)}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="Keine Guides gefunden"
          description="Versuch einen anderen Suchbegriff oder setz den Filter auf „Alle“."
          action={
            <Button variant="outline" onClick={() => { setQ(""); setFilter("all"); }}>
              Suche zurücksetzen
            </Button>
          }
        />
      )}
      </CockpitShell>
    </>
  );
};

export default Playbooks;
