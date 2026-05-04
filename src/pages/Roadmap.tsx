import CockpitShell from "@/components/cockpit/CockpitShell";
import { CATEGORIES, STATUS_LABEL, type FeatureStatus } from "@/data/features";

const STATUS_STYLES: Record<FeatureStatus, string> = {
  live: "bg-success/15 text-success",
  beta: "bg-accent-blue/15 text-accent-blue",
  soon: "bg-secondary text-muted-foreground",
  planned: "bg-secondary text-muted-foreground",
};

const Roadmap = () => {
  const total = CATEGORIES.reduce((acc, c) => acc + c.features.length, 0);
  const beta = CATEGORIES.flatMap((c) => c.features).filter((f) => f.status === "beta").length;
  const soon = CATEGORIES.flatMap((c) => c.features).filter((f) => f.status === "soon").length;

  return (
    <CockpitShell
      eyebrow="🗺️ Roadmap"
      title={`${total} Features – die komplette GründerX-Vision`}
      subtitle={`${beta} Beta · ${soon} Bald · Wir releasen wöchentlich. Voting im Cockpit entscheidet die Reihenfolge.`}
    >
      <div className="space-y-10">
        {CATEGORIES.map((cat) => (
          <section key={cat.slug}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-2xl">{cat.emoji}</div>
              <div>
                <h2 className="text-xl font-bold">{cat.title}</h2>
                <p className="text-sm text-muted-foreground">{cat.tagline}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.features.map((f) => (
                <div key={f.slug} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-sm leading-tight">{f.title}</span>
                    <span className={`shrink-0 inline-flex rounded-full text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${STATUS_STYLES[f.status]}`}>
                      {STATUS_LABEL[f.status]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </CockpitShell>
  );
};

export default Roadmap;
