import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { EXTERN_REL, PARTNER_HINWEIS, PARTNER_REL, hatPartnerlink, partnerZiel } from "@/config/partnerLinks";
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
 * Sonst ein normaler externer Link. Funktioniert auch in <Button asChild>.
 */
export const AnbieterLink = forwardRef<HTMLAnchorElement, Props>(function AnbieterLink(
  { url, ort, slug, children, title, ...rest },
  ref,
) {
  const z = partnerZiel(url, ort, slug);
  return (
    <a
      ref={ref}
      {...rest}
      href={z.href}
      target="_blank"
      rel={z.partner ? PARTNER_REL : EXTERN_REL}
      title={z.partner ? PARTNER_HINWEIS : title}
      data-partnerlink={z.partner ? "1" : undefined}
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
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { ort: string }) {
  if (!href || !EXTERN.test(href)) return <a href={href} {...rest}>{children}</a>;
  const z = partnerZiel(href, ort, undefined, { zielErhalten: true });
  if (!z.partner) return <a href={href} {...rest}>{children}</a>;
  return (
    <a {...rest} href={z.href} target="_blank" rel={PARTNER_REL} title={PARTNER_HINWEIS} data-partnerlink="1">
      {children}
      <span aria-hidden="true">*</span>
    </a>
  );
}
