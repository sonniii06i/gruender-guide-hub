import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Vorlage } from "@/data/vorlagen/types";
import { KATEGORIE_BY_KEY } from "@/data/vorlagen";
import { kategorieIcon } from "@/components/vorlagen/vorlagenIcons";

// Eine Vorlage als Karte – auf dem Hub, den Kategorieseiten und in der Suche.
export function VorlagenKarte({ vorlage: v }: { vorlage: Vorlage }) {
  const Icon = kategorieIcon(KATEGORIE_BY_KEY[v.kategorie]?.icon ?? "");
  return (
    <Link to={`/vorlagen/${v.slug}`} className="group block min-w-0">
      <Card className="h-full transition-colors group-hover:border-foreground/30">
        <CardContent className="flex h-full gap-4 p-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-border bg-background">
            <Icon className="h-[18px] w-[18px] text-foreground/70" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold leading-snug text-foreground">{v.titel}</h3>
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
