// Gemeinsamer, ruhiger Rahmen für Konto- und Zahlungsseiten
// (Anmeldung, Willkommen, Zahlung erfolgreich/abgebrochen, Passwort zurücksetzen).
// Reine Optik: zentrierte Karte mit Logo, genau einer H1 und optionalem Fuß.
import type { ElementType, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { toneSoft, toneText, type Tone } from "@/components/cockpit/kit";

export const SUPPORT_MAIL = "service@gruenderx.de";

export const KontoRahmen = ({
  icon: Icon,
  tone = "accent",
  iconSpin,
  kicker,
  title,
  subtitle,
  children,
  footer,
  backLink = true,
}: {
  icon?: ElementType;
  tone?: Tone;
  iconSpin?: boolean;
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  backLink?: boolean;
}) => (
  <div className="flex min-h-screen flex-col bg-hero">
    <header className="container flex max-w-6xl items-center justify-between gap-4 py-5">
      <Link to="/" aria-label="GründerX, zur Startseite" className="inline-flex items-center gap-2.5">
        <Logo asImage className="h-8 w-8" />
        <span className="text-[17px] font-semibold tracking-tight">GründerX</span>
      </Link>
      {backLink && (
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Zur Startseite</span>
          <span className="sm:hidden">Start</span>
        </Link>
      )}
    </header>

    <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-4 sm:items-center sm:pt-0">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          {Icon && (
            <span
              className={cn(
                "mb-5 flex h-11 w-11 items-center justify-center rounded-xl border",
                toneSoft(tone),
                toneText(tone),
              )}
            >
              <Icon className={cn("h-5 w-5", iconSpin && "animate-spin")} aria-hidden="true" />
            </span>
          )}
          {kicker && <p className="mb-1.5 text-sm font-medium text-accent-blue">{kicker}</p>}
          <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.7rem] sm:leading-tight">{title}</h1>
          {subtitle && <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</div>}
          {children && <div className="mt-6">{children}</div>}
        </div>

        {footer && <div className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">{footer}</div>}

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-center text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          Verschlüsselte Verbindung. Fragen?{" "}
          <a href={`mailto:${SUPPORT_MAIL}`} className="font-medium text-foreground/80 underline-offset-4 hover:underline">
            {SUPPORT_MAIL}
          </a>
        </p>
      </div>
    </main>
  </div>
);

/** Inline-Fehlermeldung im Formular. */
export const FormFehler = ({ children }: { children: ReactNode }) => (
  <div role="alert" className="flex items-start gap-2 rounded-xl border border-danger/25 bg-danger-soft px-3 py-2.5 text-sm text-foreground">
    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden="true" />
    <span>{children}</span>
  </div>
);

/** Primärer, großer Knopf für die Kontoseiten. */
export const kontoCta =
  "press h-11 w-full rounded-xl bg-gradient-primary font-semibold text-primary-foreground shadow-glow hover:opacity-95";
