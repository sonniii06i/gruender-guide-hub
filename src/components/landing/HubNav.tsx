import { Link } from "react-router-dom";
import { ArrowRight, Wrench, ListChecks, BookOpen } from "lucide-react";

const ALL = {
  tools: { to: "/tools", icon: Wrench, title: "Alle Tools", desc: "Rechner, Wizards & Checks fürs Gründen" },
  guides: { to: "/guides", icon: ListChecks, title: "Alle Guides", desc: "Schritt-für-Schritt durch jede Gründung" },
  ratgeber: { to: "/ratgeber", icon: BookOpen, title: "Ratgeber", desc: "Artikel zu Steuern, Recht & E-Commerce" },
} as const;

/** Cross-Navigation zwischen den drei öffentlichen Hubs (interne Verlinkung). */
export const HubNav = ({ show }: { show: (keyof typeof ALL)[] }) => (
  <section className="mt-14 border-t border-border pt-10">
    <h2 className="text-lg font-bold tracking-tight mb-4">Weiter stöbern</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {show.map((key) => {
        const item = ALL[key];
        const Icon = item.icon;
        return (
          <Link
            key={key}
            to={item.to}
            className="group rounded-xl border border-border bg-card p-4 hover:border-accent-blue/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-4 w-4 text-accent-blue" />
              <p className="font-medium text-sm flex-1">{item.title}</p>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </Link>
        );
      })}
    </div>
  </section>
);

export default HubNav;
