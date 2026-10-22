// ===================================================================
// vorlagenMail.ts — Signatur und Mailtexte der Vorlagen-Bibliothek.
//
// ABLAUF (Double-Opt-in):
//   1. Nutzer gibt auf /vorlagen/<slug> seine Adresse ein
//      -> Edge Function vorlage-anfordern legt die Zeile in vorlagen_leads
//         an und schickt die Bestaetigungsmail mit signiertem Link.
//   2. Klick auf den Link -> vorlage-bestaetigen prueft die Signatur,
//      setzt bestaetigt_am und leitet auf die Vorlagenseite zurueck,
//      wo der Browser die Freigabe merkt und die Downloads oeffnet.
//
// Die Signatur ist eine HMAC-SHA256 ueber "vorlagen|<adresse>" — mit
// eigenem Praefix, damit sie sich von der Abmelde-Signatur (unsubscribe.ts,
// nur die Adresse) unterscheidet, obwohl beide notfalls dasselbe Secret
// nutzen: Ein Bestaetigungslink darf niemanden abmelden und umgekehrt.
//
// Hier bewusst ohne Deno.serve(): Wer von hier importiert, startet keinen
// zweiten Server (siehe unsubscribe.ts).
// ===================================================================

import { sameSig } from "./unsubscribe.ts";
import {
  aufmacher, button, paragraph, plain, renderMail, secondary, esc, type Built,
} from "./mailLayout.ts";

export const SITE = "https://gruenderx.de";

/** Secret: eigenes, sonst das der Abmeldelinks. Ohne beides: undefined. */
export function vorlagenSecret(): string | undefined {
  return Deno.env.get("VORLAGEN_SECRET") || Deno.env.get("UNSUBSCRIBE_SECRET") || undefined;
}

export const normalisiere = (email: string) => email.trim().toLowerCase();

/** HMAC-SHA256 ueber "vorlagen|<adresse>", hex. */
export async function signiereVorlagenMail(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC", key, new TextEncoder().encode(`vorlagen|${normalisiere(email)}`),
  );
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function signaturGueltig(email: string, sig: string, secret: string): Promise<boolean> {
  if (!/^[0-9a-f]{64}$/.test(sig)) return false;
  return sameSig(sig, await signiereVorlagenMail(email, secret));
}

/** Link in der Mail: Edge Function, die bestaetigt und weiterleitet. */
export function bestaetigungsLink(functionsUrl: string, email: string, slug: string, sig: string): string {
  return `${functionsUrl.replace(/\/+$/, "")}/vorlage-bestaetigen` +
    `?e=${encodeURIComponent(normalisiere(email))}&v=${encodeURIComponent(slug)}&s=${sig}`;
}

/** Ziel nach der Bestaetigung: die Vorlagenseite mit Freigabe-Parametern. */
export function freigabeLink(email: string, slug: string, sig: string): string {
  return `${SITE}/vorlagen/${encodeURIComponent(slug)}` +
    `?freigabe=1&e=${encodeURIComponent(normalisiere(email))}&s=${sig}`;
}

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// -------------------------------------------------------------------
// Mailtexte
// -------------------------------------------------------------------
// Zwei Faelle, eine Mail-Form:
//   erstmalig    -> "Bitte bestaetigen": der Klick ist die Einwilligung
//   bereits best. -> "Hier ist dein Link": gleiche URL, anderer Ton
// Beides sind Dienstmails, die der Nutzer selbst angefordert hat: kein
// Abmeldelink, keine Werbung, kein zweiter Knopf.

export function buildVorlagenBestaetigung(o: {
  titel: string;
  link: string;
  bereitsBestaetigt: boolean;
}): Built {
  const vorlagenUrl = `${SITE}/vorlagen`;
  if (o.bereitsBestaetigt) {
    const blocks = [
      aufmacher("Dein Download-Link", `${o.titel} — als Word, PDF oder Text.`),
      paragraph(
        "Deine Adresse ist schon bestätigt. Mit dem Knopf öffnest du die Vorlage " +
        "in diesem Browser; alle anderen Vorlagen der Bibliothek sind damit ebenfalls frei.",
      ),
      button(o.link, "Vorlage öffnen"),
      secondary(vorlagenUrl, "Alle Vorlagen ansehen"),
      paragraph(
        "<b>Nicht du?</b> Dann hat jemand deine Adresse eingegeben. Ignoriere die Mail " +
        "einfach — ohne Klick passiert nichts.",
      ),
    ];
    return {
      subject: `Dein Download-Link: ${o.titel}`,
      text: plain({
        greeting: "Hallo,",
        lines: [
          `hier ist dein Link zur Vorlage „${o.titel}“ (Word, PDF oder Text).`,
          "Deine Adresse ist schon bestätigt; der Link öffnet die Vorlage in deinem Browser.",
          "",
          "Nicht du? Dann ignoriere diese Mail — ohne Klick passiert nichts.",
        ],
        cta: ["Vorlage öffnen", o.link],
        reason: "Du bekommst diese Mail, weil jemand auf gruenderx.de diese Vorlage für deine Adresse angefordert hat.",
      }),
      html: renderMail({
        preheader: `${o.titel} als Word, PDF oder Text — ein Klick.`,
        blocks,
        footerReason:
          "Du bekommst diese Mail, weil jemand auf gruenderx.de diese Vorlage für deine Adresse angefordert hat. " +
          "Das ist keine Werbung; ohne Klick passiert nichts.",
      }),
    };
  }

  const blocks = [
    aufmacher("Bitte kurz bestätigen", `Dann ist „${o.titel}“ sofort frei.`),
    paragraph(
      `Du hast auf gruenderx.de die Vorlage <b>${esc(o.titel)}</b> angefordert. ` +
      "Ein Klick bestätigt deine E-Mail-Adresse und öffnet die Vorlage als Word, PDF oder Text. " +
      "Mit derselben Bestätigung sind alle Vorlagen der Bibliothek für dich frei.",
    ),
    button(o.link, "E-Mail bestätigen und Vorlage öffnen"),
    paragraph(
      "Der Link gilt für deine Adresse. Wir speichern nur, dass du die Vorlage angefordert " +
      "und bestätigt hast — keine Werbung, kein Newsletter, kein Konto.",
    ),
    paragraph(
      "<b>Nicht du?</b> Dann hat jemand deine Adresse eingegeben. Ignoriere die Mail " +
      "einfach — ohne Klick passiert nichts und wir löschen die Adresse nach 30 Tagen.",
    ),
  ];
  return {
    subject: `Bitte bestätigen: ${o.titel}`,
    text: plain({
      greeting: "Hallo,",
      lines: [
        `du hast auf gruenderx.de die Vorlage „${o.titel}“ angefordert.`,
        "Ein Klick auf den Link bestätigt deine E-Mail-Adresse und öffnet die Vorlage",
        "als Word, PDF oder Text. Damit sind alle Vorlagen der Bibliothek für dich frei.",
        "",
        "Wir speichern nur, dass du die Vorlage angefordert und bestätigt hast —",
        "keine Werbung, kein Newsletter, kein Konto.",
        "",
        "Nicht du? Dann ignoriere diese Mail. Ohne Klick passiert nichts,",
        "und wir löschen die Adresse nach 30 Tagen.",
      ],
      cta: ["E-Mail bestätigen und Vorlage öffnen", o.link],
      reason: "Du bekommst diese Mail, weil jemand auf gruenderx.de diese Vorlage für deine Adresse angefordert hat.",
    }),
    html: renderMail({
      preheader: `Ein Klick, und ${o.titel} ist als Word, PDF oder Text frei.`,
      blocks,
      footerReason:
        "Du bekommst diese Mail, weil jemand auf gruenderx.de diese Vorlage für deine Adresse angefordert hat. " +
        "Das ist keine Werbung; ohne Klick passiert nichts.",
    }),
  };
}
