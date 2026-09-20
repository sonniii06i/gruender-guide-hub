// ==============================================================================
// discordSales.ts — Verkaufsmeldungen in den gemeinsamen Discord-Kanal
// ==============================================================================
// Alle Marken (MarktMix, Cardsnight, PheroScent, Amazon, AnwaltX, GruenderX,
// ArbitrageX) melden in DENSELBEN Kanal. Unterschieden wird ueber Titel, Farbe,
// Username und Footer des Embeds — nicht ueber getrennte Webhooks.
//
// Die URL steht NUR im Secret DISCORD_WEBHOOK_URL, nie im Repo: eine
// Webhook-URL ist ein Geheimnis — wer sie hat, kann in den Kanal schreiben.
// Fehlt das Secret, wird das im Log laut gesagt statt still uebersprungen —
// genau daran sind Bestellmeldungen schon einmal unbemerkt gescheitert.
// ==============================================================================

const WEBHOOK = Deno.env.get("DISCORD_WEBHOOK_URL") ?? "";

export type Marke = "anwaltx" | "gruenderx" | "arbitragex";

const MARKEN: Record<Marke, { name: string; farbe: number; url: string; emoji: string }> = {
  anwaltx:    { name: "AnwaltX",    farbe: 0x1b2a4a, url: "https://anwaltx.de",    emoji: "⚖️" },
  gruenderx:  { name: "GründerX",   farbe: 0x7c3aed, url: "https://gruenderx.de",  emoji: "🚀" },
  arbitragex: { name: "ArbitrageX", farbe: 0x0ea5e9, url: "https://arbitragex.de", emoji: "📊" },
};

export interface VerkaufMelden {
  marke: Marke;
  betragCent?: number | null;
  waehrung?: string | null;
  email?: string | null;
  name?: string | null;
  produkt?: string | null;        // Plan-/Produktname
  zahlungsart?: string | null;
  abo?: boolean;                  // true = wiederkehrend
  quelle?: string | null;         // z. B. "stripe-webhook", "copecart"
  referenz?: string | null;       // Session-/Bestell-ID
}

function euro(cent: number | null | undefined, waehrung: string | null | undefined): string {
  return `${((cent ?? 0) / 100).toFixed(2)} ${(waehrung || "eur").toUpperCase()}`;
}

/**
 * Meldet einen Verkauf. Wirft nie — eine gescheiterte Benachrichtigung darf
 * einen Zahlungs-Webhook niemals kippen. Fehler landen im Function-Log.
 */
export async function meldeVerkauf(v: VerkaufMelden): Promise<void> {
  if (!WEBHOOK) {
    console.error("[discord] DISCORD_WEBHOOK_URL nicht gesetzt — Verkauf nicht gemeldet");
    return;
  }
  const m = MARKEN[v.marke];

  const felder: { name: string; value: string; inline?: boolean }[] = [
    { name: "📦 Produkt", value: v.produkt || (v.abo ? "Abo" : "Kauf"), inline: false },
    { name: "💰 Gesamtbetrag", value: `**${euro(v.betragCent, v.waehrung)}**`, inline: true },
    { name: "💳 Zahlungsart", value: v.zahlungsart || "Stripe", inline: true },
  ];
  if (v.abo !== undefined) {
    felder.push({ name: "🔁 Art", value: v.abo ? "Abo (wiederkehrend)" : "Einmalkauf", inline: true });
  }
  felder.push({
    name: "👤 Kunde",
    value: [v.name || null, v.email ? `📧 ${v.email}` : null].filter(Boolean).join("\n") || "—",
    inline: false,
  });
  if (v.referenz) {
    felder.push({ name: "🧾 Referenz", value: `\`${v.referenz}\``, inline: false });
  }

  const body = {
    username: `${m.name} Sales`,
    embeds: [{
      title: `${m.emoji} Neuer Verkauf — ${m.name}`,
      url: m.url,
      color: m.farbe,
      fields: felder,
      timestamp: new Date().toISOString(),
      footer: { text: `${m.name}${v.quelle ? ` · via ${v.quelle}` : ""}` },
    }],
  };

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error(`[discord] Webhook ${res.status}: ${await res.text()}`);
    else console.log(`[discord] Verkauf gemeldet (${m.name})`);
  } catch (err) {
    console.error("[discord] Senden fehlgeschlagen:", err);
  }
}
