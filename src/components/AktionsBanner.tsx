import { useEffect, useState } from "react";

// Aktions-Banner (26.10.2026, HQ aktionen.py): zeigt nur eine aktive Aktion dieser Marke; der Not-Aus im HQ
// schaltet es sofort ab (Endpunkt liefert dann aktiv=false). Kein Tracking, keine Cookies.
type Aktion = { aktiv: boolean; id?: number; text?: string; code?: string; url?: string };

const QUELLE = "https://arbitragex.de/px/aktion/gruenderx.json";

export default function AktionsBanner() {
  const [a, setA] = useState<Aktion | null>(null);
  const [kopiert, setKopiert] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    let ab = false;
    fetch(QUELLE, { credentials: "omit" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Aktion | null) => {
        if (ab || !d?.aktiv) return;
        try {
          if (sessionStorage.getItem("aktion-zu") === String(d.id)) return;
        } catch {
          /* Speicher gesperrt – Banner trotzdem zeigen */
        }
        setA(d);
      })
      .catch(() => undefined);
    return () => {
      ab = true;
    };
  }, []);

  if (!a?.aktiv) return null;
  const schliessen = () => {
    try {
      sessionStorage.setItem("aktion-zu", String(a.id));
    } catch {
      /* egal */
    }
    setA(null);
  };
  return (
    <div
      role="region"
      aria-label="Aktuelle Aktion"
      className="fixed inset-x-0 bottom-0 z-50 bg-primary px-4 py-2.5 pr-12 text-center text-sm font-semibold text-primary-foreground shadow-lg"
    >
      <span>{a.text}</span>
      {a.code ? (
        <button
          type="button"
          title="Code kopieren"
          className="ml-2 rounded-md bg-background px-2 py-0.5 font-bold text-foreground"
          onClick={() => {
            navigator.clipboard?.writeText(a.code ?? "").then(() => setKopiert(true), () => undefined);
          }}
        >
          {kopiert ? "kopiert ✓" : a.code}
        </button>
      ) : null}
      {a.url ? (
        <a href={a.url} className="ml-2 underline">
          Zum Angebot
        </a>
      ) : null}
      <button type="button" aria-label="Schließen" onClick={schliessen} className="absolute right-3 top-1.5 text-lg leading-none">
        ×
      </button>
    </div>
  );
}
