import { useState } from "react";
import { AlertTriangle, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckItem {
  id: string;
  label: string;
  detail: string;
  pflicht: boolean;
}

const CHECKS: CheckItem[] = [
  {
    id: "de_amex",
    label: "Deutsche Amex aktiv (mind. 3 Monate)",
    detail: "Basis für Amex Global Transfer aus Deutschland ohne US-Credit-Score.",
    pflicht: true,
  },
  {
    id: "us_address",
    label: "Echte US-Wohnadresse (z. B. Cloud Residence, ca. 300 €/Quartal)",
    detail: "Keine offensichtliche Briefkasten-Adresse (CMRA).",
    pflicht: true,
  },
  {
    id: "utility",
    label: "Utility-Rechnung / Adressnachweis auf diese US-Adresse",
    detail: "Direkt über Cloud Residence oder über die US-Mobilfunkrechnung.",
    pflicht: true,
  },
  {
    id: "tello",
    label: "US-Mobilfunknummer per eSIM (z. B. Tello mit Wi-Fi Calling)",
    detail: "Amex ruft regelmäßig zur Verifizierung an. Kein reines VoIP verwenden.",
    pflicht: true,
  },
  {
    id: "bank_safe",
    label: "US-Filialbankkonto (Chase / Bank of America per Filialbesuch + Reisepass)",
    detail: "Sicherer Weg bei Bankprüfungen. Wise geht nur auf eigenes Risiko.",
    pflicht: false,
  },
];

export function AmexUsReadinessWidget({
  value,
  onChange,
}: {
  value?: Record<string, boolean>;
  onChange?: (next: Record<string, boolean>) => void;
}) {
  const [local, setLocal] = useState<Record<string, boolean>>(value ?? {});
  const state = value ?? local;

  const toggle = (id: string) => {
    const next = { ...state, [id]: !state[id] };
    setLocal(next);
    onChange?.(next);
  };

  const pflichtDone = CHECKS.filter((c) => c.pflicht && state[c.id]).length;
  const pflichtTotal = CHECKS.filter((c) => c.pflicht).length;
  const hatFilialBank = Boolean(state.bank_safe);
  const bereit = pflichtDone === pflichtTotal;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-secondary/40 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold">Amex-US-Startcheck</p>
          </div>
          <span className="rounded-md bg-card px-2.5 py-1 text-xs font-semibold tabular">
            {pflichtDone} / {pflichtTotal} Basis-Punkte
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Hake ab, was bei dir schon steht. Du siehst sofort, ob der Global Transfer sinnvoll ist oder welches Risiko bleibt.
        </p>
      </div>

      <ul className="space-y-2">
        {CHECKS.map((item) => {
          const checked = Boolean(state[item.id]);
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={checked}
                onClick={() => toggle(item.id)}
                className={cn(
                  "press flex min-h-11 w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
                  checked
                    ? "border-brand-green/50 bg-brand-green-soft/60"
                    : "border-border bg-card hover:border-foreground/25",
                )}
              >
                <CheckCircle2
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0",
                    checked ? "text-brand-green" : "text-muted-foreground/50",
                  )}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-snug text-foreground">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border p-4 text-sm",
          bereit && hatFilialBank
            ? "border-brand-green/40 bg-brand-green-soft/70"
            : bereit
              ? "border-warning/40 bg-warning-soft"
              : "border-border bg-card",
        )}
      >
        {bereit && hatFilialBank ? (
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />
        ) : (
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
        )}
        <div>
          <p className="font-semibold">
            {bereit && hatFilialBank
              ? "Saubere Basis für den Amex Global Transfer"
              : bereit
                ? "Basis steht, aber Bankkonto-Risiko beachten"
                : "Erst die fehlenden Bausteine schließen"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {bereit && hatFilialBank
              ? "Adresse, Utility-Nachweis, Tello eSIM und Filialbankkonto passen zusammen. Du kannst den Antrag sauber vorbereiten."
              : bereit
                ? "Ohne US-Filialbank (Chase / Bank of America mit Filialbesuch + Pass) bleibst du bei Wise im Risiko: Kommt eine Bankprüfung, ist der Antrag in der Regel durch."
                : "Stelle erst deine US-Wohnadresse, Utility-Rechnung und Tello eSIM auf. Vorher führt ein Antrag oft zu unnötigen Rückfragen."}
          </p>
        </div>
      </div>
    </div>
  );
}
