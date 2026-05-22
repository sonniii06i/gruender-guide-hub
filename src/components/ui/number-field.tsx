import { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";

/**
 * NumberField — Number-Input mit menschenfreundlichem Tipp-Verhalten.
 *
 * Problem mit dem üblichen Pattern
 *   `onChange={(e) => set(Math.max(MIN, Math.min(MAX, Number(e.target.value) || DEFAULT)))}`
 * → tippst du "5" wird sofort auf MIN geklemmt (z.B. 200) bevor du "450"
 *    fertig tippen kannst. Leeres Feld snappt auf DEFAULT zurück.
 *
 * Lösung hier:
 * - Während des Tippens nur in den `value`-Sync schreiben, NICHT clampen
 * - Leere Eingabe: erlaubt (Display bleibt leer, Parent-State bleibt wie er war)
 * - Clamping passiert erst on blur
 * - Externe Value-Updates (z.B. Reset) syncen nur wenn Input nicht fokussiert ist
 */
export type NumberFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  /**
   * Wenn true: bei value === 0 wird das Feld leer angezeigt (für Placeholder-UX).
   * Beim Leeren des Feldes wird 0 an Parent emittiert.
   */
  emptyAsZero?: boolean;
};

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ value, onChange, min, max, emptyAsZero, onBlur, onFocus, ...rest }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef;
    const [draft, setDraft] = useState<string>(() => (emptyAsZero && value === 0 ? "" : String(value)));
    const focused = useRef(false);

    // Sync wenn Parent extern updated (z.B. Reset-Button) — nur wenn nicht fokussiert
    useEffect(() => {
      if (focused.current) return;
      const draftAsNum = draft === "" ? 0 : Number(draft);
      if (draftAsNum !== value || (emptyAsZero && value === 0 && draft !== "")) {
        setDraft(emptyAsZero && value === 0 ? "" : String(value));
      }
    }, [value, draft, emptyAsZero]);

    return (
      <Input
        {...rest}
        ref={ref}
        type="number"
        inputMode="decimal"
        value={draft}
        onFocus={(e) => { focused.current = true; onFocus?.(e); }}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          if (raw === "") {
            // Bei emptyAsZero → 0 emitten (Feld bleibt leer angezeigt).
            // Sonst Parent unverändert lassen damit Reset-zu-NaN vermieden wird.
            if (emptyAsZero && value !== 0) onChange(0);
            return;
          }
          if (raw === "-" || raw === ".") return;
          const n = Number(raw);
          if (!Number.isNaN(n)) onChange(n);
        }}
        onBlur={(e) => {
          focused.current = false;
          const raw = e.target.value;
          if (raw === "" && emptyAsZero) {
            if (value !== 0) onChange(0);
            onBlur?.(e);
            return;
          }
          let n = Number(raw);
          if (Number.isNaN(n)) n = value; // leeres / ungültiges Feld → letzter guter Wert
          if (min !== undefined && n < min) n = min;
          if (max !== undefined && n > max) n = max;
          setDraft(emptyAsZero && n === 0 ? "" : String(n));
          if (n !== value) onChange(n);
          onBlur?.(e);
        }}
      />
    );
  },
);
NumberField.displayName = "NumberField";
