import { useState } from "react";
import { trackMonetization } from "@/utils/analytics";

// Nachfrage-Messung vor dem Bau (Konzept ~/hq-growth/gx-ust-protokoll, 01.11.2026): Das Prüfprotokoll gibt es noch nicht.
export const UstProtokollVormerken = () => {
  const [gemerkt, setGemerkt] = useState(false);
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h2 className="text-lg font-semibold tracking-tight">Lieferst du an Firmen in der EU?</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Wir überlegen, Kunden-USt-IdNrn künftig regelmäßig beim BZSt zu prüfen und das Ergebnis als PDF abzulegen.
        Das gibt es noch nicht. Sag uns, ob du es brauchst.
      </p>
      {gemerkt ? (
        <p className="mt-4 text-sm font-semibold text-foreground" role="status">Danke, ist notiert.</p>
      ) : (
        <button
          type="button"
          className="mt-4 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          onClick={() => {
            trackMonetization.ctaKlick("ust-protokoll-vormerken", "Brauche ich");
            setGemerkt(true);
          }}
        >
          Brauche ich
        </button>
      )}
    </section>
  );
};
