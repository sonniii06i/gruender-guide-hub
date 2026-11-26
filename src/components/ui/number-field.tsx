import { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

/**
 * NumberField — Lexoffice-sauberes Zahlenfeld mit menschenfreundlichem Tipp-Verhalten:
 * - Während des Tippens kein voreiliges Clamping
 * - Optionales Einheiten-Suffix (z. B. "€", "%")
 * - Versteckt unruhige Browser-Spinner-Pfeile, nutzt tabellarische Ziffern
 */
export type NumberFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  emptyAsZero?: boolean;
  suffix?: string;
};

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ value, onChange, min, max, emptyAsZero, suffix, className, onBlur, onFocus, ...rest }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef;
    const [draft, setDraft] = useState<string>(() => (emptyAsZero && value === 0 ? "" : String(value)));
    const focused = useRef(false);

    useEffect(() => {
      if (focused.current) return;
      const draftAsNum = draft === "" ? 0 : Number(draft);
      if (draftAsNum !== value || (emptyAsZero && value === 0 && draft !== "")) {
        setDraft(emptyAsZero && value === 0 ? "" : String(value));
      }
    }, [value, draft, emptyAsZero]);

    const inputEl = (
      <Input
        {...rest}
        ref={ref}
        type="number"
        inputMode="decimal"
        value={draft}
        className={cn(
          "h-11 rounded-xl bg-white font-medium tabular [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          suffix && "pr-11",
          className,
        )}
        onFocus={(e) => {
          focused.current = true;
          onFocus?.(e);
        }}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          if (raw === "") {
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
          if (Number.isNaN(n)) n = value;
          if (min !== undefined && n < min) n = min;
          if (max !== undefined && n > max) n = max;
          setDraft(emptyAsZero && n === 0 ? "" : String(n));
          if (n !== value) onChange(n);
          onBlur?.(e);
        }}
      />
    );

    if (!suffix) return inputEl;

    return (
      <div className="relative">
        {inputEl}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground"
        >
          {suffix}
        </span>
      </div>
    );
  },
);
NumberField.displayName = "NumberField";
