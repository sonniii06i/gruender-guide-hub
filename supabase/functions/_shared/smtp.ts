// ─────────────────────────────────────────────────────────────────────────────
// SMTPClient mit Schutz gegen das sichtbare "=20" in Mails.
//
// denomailer kodiert HTML und Text als quoted-printable. Ein Leerzeichen am
// Zeilenende wird dabei zu "=20" — und denomailer kodiert das "=" danach ein
// zweites Mal zu "=3D". Beim Empfänger steht dann "=20" mitten in der Mail
// (30.09.2026: MarktMix-Warenkorbmail, direkt unter der Anrede). Auslöser
// sind Template-Zeilen wie `  ${hinweis}`, die bei leerem Wert als reine
// Leerzeichen stehen bleiben.
//
// Den Kodierer kann man nicht abstellen, das Leerzeichen schon: ohne
// Whitespace am Zeilenende gibt es nichts zu kodieren. Deshalb hier zentral
// statt in jedem Template — jede Function importiert SMTPClient von hier.
// ─────────────────────────────────────────────────────────────────────────────

import { SMTPClient as Basis } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

type SendConfig = Parameters<Basis["send"]>[0];

const ohneZeilenendLeer = <T>(s: T): T =>
  (typeof s === "string" ? s.replace(/[ \t]+(?=\r?\n|$)/g, "") : s) as T;

export class SMTPClient extends Basis {
  override send(config: SendConfig) {
    const c = { ...config } as SendConfig & Record<string, unknown>;
    if (c.html) c.html = ohneZeilenendLeer(c.html);
    if (c.content) c.content = ohneZeilenendLeer(c.content);
    if (Array.isArray(c.mimeContent)) {
      c.mimeContent = c.mimeContent.map((m) => ({ ...m, content: ohneZeilenendLeer(m.content) }));
    }
    return super.send(c);
  }
}
