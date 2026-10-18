// ===================================================================
// abbruchNachtrag.ts — Pruefung, ob ein abgelaufener Stripe-Checkout
// (checkout.session.expired) in die Warenkorbstrecke (cart_abandons)
// nachgetragen werden darf. Datei in AnwaltX und GruenderX gleich; die
// Marke steckt nur in `domain` und `istKunde`.
//
// Stand 18.10.2026: Ohne diese Pruefung haette das Ereignis
//   - ArbitrageX-Abbrueche in die AnwaltX-Strecke geschoben (AnwaltX und
//     ArbitrageX teilen ein Stripe-Konto, beide Endpunkte sehen alles),
//   - Zahlenden Kunden "Hat etwas nicht funktioniert?" geschickt, wenn sie
//     im zweiten Anlauf gekauft hatten (der Erfolgs-Webhook raeumt nur
//     Zeilen ab, die es beim Kauf schon gab — die Nachtrag-Zeile entsteht
//     erst ~24 h spaeter beim Ablauf),
//   - eine zweite, parallele Strecke fuer dieselbe Adresse gestartet.
// Die Strecke selbst (Stufen, Texte) bleibt in send-cart-series.
// ===================================================================

// deno-lint-ignore no-explicit-any
type Any = any;

export type Nachtrag =
  | { ok: true; email: string; createdAt: string }
  | { ok: false; grund: string };

/** Wie lange eine Strecke laeuft (send-cart-series MAX_STUNDEN). */
const FENSTER_STUNDEN = 120;

export function vonUnsererSeite(s: Any, domain: string): boolean {
  const urls = [s?.success_url, s?.cancel_url].filter((u) => typeof u === "string");
  return urls.some((u: string) => {
    try {
      const h = new URL(u).hostname.toLowerCase();
      return h === domain || h === `www.${domain}`;
    } catch { return false; }
  });
}

export async function abbruchPruefen(
  s: Any, db: { from: (t: string) => Any }, stripe: Any,
  o: { domain: string; istKunde: (email: string) => Promise<boolean> },
): Promise<Nachtrag> {
  const email = String(s?.customer_details?.email || s?.customer_email || "").trim().toLowerCase();
  if (!email.includes("@")) return { ok: false, grund: "keine Adresse" };
  if (s?.mode !== "subscription") return { ok: false, grund: `mode=${s?.mode}` };
  if (!vonUnsererSeite(s, o.domain)) return { ok: false, grund: `nicht ${o.domain} (fremde Marke/Herkunft)` };
  const meta = s?.metadata ?? {};
  if (String(meta.product ?? "").toLowerCase().includes("arbitrage")) return { ok: false, grund: "ArbitrageX" };

  // Schon Kunde? Erst die eigene DB, dann Stripe (laufendes Abo zur Adresse).
  if (await o.istKunde(email)) return { ok: false, grund: "bereits Kunde (DB)" };
  try {
    const kunden = await stripe.customers.list({ email, limit: 10 });
    for (const c of kunden?.data ?? []) {
      const subs = await stripe.subscriptions.list({ customer: c.id, status: "all", limit: 10 });
      if ((subs?.data ?? []).some((x: Any) => ["active", "trialing", "past_due"].includes(x.status))) {
        return { ok: false, grund: "bereits Kunde (Stripe-Abo)" };
      }
    }
  } catch (e) {
    // Nicht pruefbar -> lieber keine Werbemail.
    return { ok: false, grund: `Stripe-Pruefung fehlgeschlagen: ${(e as Error).message}` };
  }

  // Laeuft fuer die Adresse schon eine Strecke (oder wurde gekauft)?
  const seit = new Date(Date.now() - FENSTER_STUNDEN * 3600_000).toISOString();
  const { data: vorhanden, error } = await db.from("cart_abandons")
    .select("id, gekauft_at").eq("email", email).gte("created_at", seit).limit(5);
  if (error) return { ok: false, grund: `cart_abandons nicht lesbar: ${error.message}` };
  if ((vorhanden ?? []).length) return { ok: false, grund: "Strecke laeuft schon / gekauft" };

  // Uhr ab dem echten Abbruch, nicht ab dem Ablauf (~24 h spaeter).
  const createdAt = new Date((Number(s?.created) || Date.now() / 1000) * 1000).toISOString();
  return { ok: true, email, createdAt };
}
