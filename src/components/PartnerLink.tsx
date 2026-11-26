import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { EXTERN_REL, PARTNER_HINWEIS, PARTNER_REL, hatPartnerlink, partnerZiel } from "@/config/partnerLinks";
import { isGruenderXIosApp } from "@/lib/iosApp";
import { openExternalInIosApp } from "@/lib/iosBridge";
import { cn } from "@/lib/utils";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  /** Ziel beim Anbieter (wie in den Daten hinterlegt) */
  url: string;
  /** Platzierung, landet als clickref in der Auswertung (z. B. "bankvergleich") */
  ort: string;
  /** Anbieter-Slug aus anbieter.ts, falls bekannt */
  slug?: string;
  children: ReactNode;
}

/**
 * Externer Anbieter-Link. Ist der Anbieter ein Partnerprogramm (config/partnerLinks.ts), wird
 * daraus der Partnerlink mit rel="sponsored nofollow", Sternchen und Hinweis im title.
 * In der nativen iOS-App öffnet der Link im SFSafariViewController, ohne die App zu verlassen.
 * Funktioniert auch in <Button asChild>.
 */
export const AnbieterLink = forwardRef<HTMLAnchorElement, Props>(function AnbieterLink(
  { url, ort, slug, children, title, onClick, ...rest },
  ref,
) {
  const z = partnerZiel(url, ort, slug);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (isGruenderXIosApp()) {
      e.preventDefault();
      void openExternalInIosApp(z.href).then((opened) => {
        if (!opened) window.open(z.href, "_blank", "noopener,noreferrer");
      });
    }
  };

  return (
    <a
      ref={ref}
      {...rest}
      href={z.href}
      target="_blank"
      rel={z.partner ? PARTNER_REL : EXTERN_REL}
      title={z.partner ? PARTNER_HINWEIS : title}
      data-partnerlink={z.partner ? "1" : undefined}
      onClick={handleClick}
    >
      {children}
      {z.partner ? <span aria-hidden="true">*</span> : null}
    </a>
  );
});

/** Hinweiszeile unter einer Liste; erscheint nur, wenn einer der Links ein Partnerlink ist. */
export function PartnerFussnote({
  urls,
  className,
  fliesstext,
}: {
  urls: Array<string | undefined | null>;
  className?: string;
  /** true: Links stammen aus Fließtext (TextLink), Quellenangaben zählen nicht als Partnerlink. */
  fliesstext?: boolean;
}) {
  if (!hatPartnerlink(urls, { zielErhalten: fliesstext })) return null;
  return (
    <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
      * {PARTNER_HINWEIS}
    </p>
  );
}

const EXTERN = /^https?:\/\//i;

/**
 * Link im Fließtext (Markdown der Ratgeber). Interne Links bleiben unverändert; ein externer
 * Link auf einen Partner-Anbieter wird zum gekennzeichneten Partnerlink.
 */
export function TextLink({
  href,
  ort,
  children,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { ort: string }) {
  if (!href || !EXTERN.test(href)) return <a href={href} onClick={onClick} {...rest}>{children}</a>;
  const z = partnerZiel(href, ort, undefined, { zielErhalten: true });

  const handleExternalClick = (targetUrl: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (isGruenderXIosApp()) {
      e.preventDefault();
      void openExternalInIosApp(targetUrl).then((opened) => {
        if (!opened) window.open(targetUrl, "_blank", "noopener,noreferrer");
      });
    }
  };

  if (!z.partner) {
    return (
      <a href={href} onClick={handleExternalClick(href)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a
      {...rest}
      href={z.href}
      target="_blank"
      rel={PARTNER_REL}
      title={PARTNER_HINWEIS}
      data-partnerlink="1"
      onClick={handleExternalClick(z.href)}
    >
      {children}
      <span aria-hidden="true">*</span>
    </a>
  );
}
