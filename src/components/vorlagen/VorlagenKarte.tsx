import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Vorlage } from "@/data/vorlagen/types";
import { KATEGORIE_BY_KEY } from "@/data/vorlagen";
import { KATEGORIE_AKZENT, kategorieIcon } from "@/components/vorlagen/vorlagenIcons";

// Eine Vorlage als Karte – auf dem Hub, den Kategorieseiten und in der Suche.
export function VorlagenKarte({ vorlage: v }: { vorlage: Vorlage }) {
  const Icon = kategorieIcon(KATEGORIE_BY_KEY[v.kategorie]?.icon ?? "");
  return (
    <Link to={`/vorlagen/${v.slug}`} className="group block">
      <Card className="h-full transition-[border-color,box-shadow] group-hover:border-accent-blue/35 group-hover:shadow-soft">
        <CardContent className="flex h-full gap-4 p-5">
          <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${KATEGORIE_AKZENT[v.kategorie]}`}>
            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-blue">{v.titel}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{v.kurz}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-blue">
              Word · PDF · Text
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
