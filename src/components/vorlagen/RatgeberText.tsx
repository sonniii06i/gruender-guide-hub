import type { RatgeberAbschnitt } from "@/data/vorlagen/types";
import { ankerId, textBloecke } from "@/lib/vorlagen/ratgeberText";

// Setzt den Ratgeber-Teil einer Vorlage: je Abschnitt eine H2, darunter
// Absätze (durch Leerzeile getrennt) und Aufzählungen (Zeilen mit „- “).
export function RatgeberText({ abschnitte, id }: { abschnitte: RatgeberAbschnitt[]; id?: string }) {
  if (!abschnitte?.length) return null;
  return (
    <div id={id} className="space-y-10">
      {abschnitte.map((a) => {
        const anker = `rg-${ankerId(a.titel)}`;
        return (
          <section key={a.titel} aria-labelledby={anker}>
            <h2 id={anker} className="mb-3 text-xl font-semibold tracking-tight text-foreground">
              {a.titel}
            </h2>
            {textBloecke(a.text).map((b, i) =>
              b.art === "liste" ? (
                <ul key={i} className="my-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/85">
                  {b.zeilen.map((z) => (
                    <li key={z}>{z}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="my-3 text-[15px] leading-relaxed text-foreground/85">
                  {b.text}
                </p>
              ),
            )}
          </section>
        );
      })}
    </div>
  );
}
