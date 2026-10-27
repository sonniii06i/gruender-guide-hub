// ===================================================================
// startAngebot.ts — Einstiegsangebot „7 Tage für 1 €“ (Betreiber 27.10.2026).
//
// Technik: Abo mit trial_period_days = 7 plus EINE einmalige Position über
// 1,00 € (Stripe rechnet einmalige Positionen in subscription-mode mit der
// ersten Rechnung ab — die Testphasen-Rechnung = genau 1 €). Danach läuft das
// Abo automatisch zum regulären Preis weiter, Kündigung jederzeit im Konto.
//
// Regeln:
//  - nur Monatsabo des Hauptprodukts (kein Bundle, kein Jahresabo)
//  - nur Neukunden: wer schon ein Abo hatte (gleiche Mail), bekommt es nicht.
//    Eingeloggt wird das VOR dem Checkout geprüft; im Gast-Checkout kennen wir
//    die Mail erst danach — dann endet die Testphase sofort (Hinweis steht im
//    Checkout, siehe startText).
//  - kein Stapeln: allow_promotion_codes ist beim Startangebot aus.
// ===================================================================

export const START_TAGE = 7;
export const START_CENT = 100;
export const START_KENNUNG = "start1";

/** Security-Review 27.10.: Startangebot NUR fürs GründerX-Monatsabo (serverseitig, nie Bundle/Jahr). */
export function startErlaubt(produkt: string, interval: string): boolean {
  return produkt === "gruenderx" && interval === "month";
}

export function istStartAngebot(body: Record<string, unknown> | null | undefined): boolean {
  return !!body && body.angebot === START_KENNUNG;
}

/** Einmalige 1-€-Position für line_items. */
export function startPosition(produktName: string) {
  return {
    price_data: {
      currency: "eur",
      unit_amount: START_CENT,
      product_data: { name: `${produktName} – Startwoche (${START_TAGE} Tage)` },
    },
    quantity: 1,
  };
}

/** Pflichttext vor dem Bezahlen (PAngV: Gesamtpreis, Folgepreis, Kündigung). */
export function startText(produktName: string, folgepreisEur: string): string {
  return `${produktName}: ${START_TAGE} Tage für 1,00 €, danach ${folgepreisEur} pro Monat, monatlich kündbar. ` +
    `Kündigst du innerhalb der ${START_TAGE} Tage (mit einem Klick im Konto), zahlst du nur 1,00 €. ` +
    `Wir erinnern dich 3 Tage vor Ablauf per Mail. Nur für Neukunden – hattest du schon ein Abo, beginnt es sofort zum regulären Preis.`;
}

/** Hatte diese Mail schon einmal ein Abo (irgendein Status) in diesem Stripe-Konto? */
// deno-lint-ignore no-explicit-any
export async function warSchonKunde(stripe: any, email: string, ausserAbo?: string): Promise<boolean> {
  const mail = (email || "").trim().toLowerCase();
  if (!mail) return false;
  const kunden = await stripe.customers.list({ email: mail, limit: 20 });
  for (const k of kunden.data ?? []) {
    const abos = await stripe.subscriptions.list({ customer: k.id, status: "all", limit: 20 });
    if ((abos.data ?? []).some((a: { id: string }) => a.id !== ausserAbo)) return true;
  }
  return false;
}
