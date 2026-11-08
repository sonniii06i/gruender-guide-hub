// Verlauf-Bereinigung fuer chat-felix (SICHERHEIT 08.11.2026), eigene Datei fuer Tests.
export const FELIX_MAX_NACHRICHTEN = 40;
export const FELIX_MAX_ZEICHEN_NUTZER = 4000;
export const FELIX_MAX_ZEICHEN_ANTWORT = 8000;
export const FELIX_MAX_ZEICHEN_GESAMT = 60000;

/** Nur user/assistant mit Text, gekappt; null bei unbrauchbarer Eingabe. */
export function verlaufBereinigen(roh: unknown): { role: "user" | "assistant"; content: string }[] | null {
  if (!Array.isArray(roh)) return null;
  const liste = roh
    .filter((m: any) => (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string")
    .slice(-FELIX_MAX_NACHRICHTEN)
    .map((m: any) => ({
      role: m.role as "user" | "assistant",
      content: m.role === "assistant" ? m.content.slice(0, FELIX_MAX_ZEICHEN_ANTWORT) : m.content,
    }));
  let summe = liste.reduce((n, m) => n + m.content.length, 0);
  while (liste.length > 1 && summe > FELIX_MAX_ZEICHEN_GESAMT) summe -= liste.shift()!.content.length;
  return liste.length ? liste : null;
}
