// ===================================================================
// send-weekly — die Wochenmail aus dem echten Kontostand.
//
// Laeuft als Cron, einmal woechentlich. Aufruf: POST mit dem Header
// x-cron-secret (Wert aus CART_CRON_SECRET).
//
// -------------------------------------------------------------------
// WOHER DIE ZAHLEN KOMMEN
// -------------------------------------------------------------------
// Drei Quellen, alle aus dem laufenden Betrieb — die Mail rechnet nichts
// selbst nach, damit sie nicht von der Oberflaeche abweichen kann:
//
//   playbook_runs          der offene Schritt (der eigentliche Hebel)
//   affiliate_commissions  Provision, wenn der Nutzer Affiliate ist
//   blog_posts             Ratgeber-Artikel der letzten Woche
//
// Der Name des offenen Schritts steht NICHT in der Datenbank — dort liegt
// nur der Index. Die Titel kommen aus _shared/playbookSteps.ts, das aus
// src/data/playbooks.ts erzeugt wird (siehe scripts/generate-playbook-steps.mjs).
// Waeren sie hier von Hand gepflegt, wuerden sie beim naechsten
// umbenannten Schritt still falsch werden.
//
// FALLE bei current_step: Der Index laeuft am Ende NICHT ueber die Liste
// hinaus, sondern wird auf den letzten Schritt geklemmt
// (PlaybookRun.tsx: `Math.min(activeIndex + 1, pb.steps.length - 1)`).
// Ein fertiger Lauf sieht an der Zahl deshalb genauso aus wie einer, der
// beim letzten Schritt haengt. Ob er fertig ist, sagt allein `status`.
//
// -------------------------------------------------------------------
// WER SIE BEKOMMT
// -------------------------------------------------------------------
// Nutzer mit aktivem Zugang (`subscriptions.status = 'active'` oder
// `comp_access`) — und nur, wenn es etwas zu berichten gibt (hatInhalt).
// Eine Wochenmail, die "diese Woche nichts" meldet, trainiert den
// Empfaenger darauf, sie nicht mehr zu oeffnen; genau daran sterben
// Newsletter. Neue Ratgeber-Artikel allein reichen als Inhalt: sie sind
// fuer jeden Empfaenger dieselben, aber es ist echter neuer Inhalt.
// ===================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { buildWeekly, hatInhalt, type WochenStand } from "../_shared/campaigns.ts";
import { abTest, sendCampaign } from "../_shared/mailSend.ts";
import { BRANDING } from "../_shared/mailBrand.ts";
import { unsubscribeUrl } from "../_shared/unsubscribe.ts";
import { PLAYBOOK_TITEL } from "../_shared/playbookSteps.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-cron-secret",
};

/** Laeufe, die laenger als das her sind, gelten als aufgegeben. Eine
 *  Erinnerung an etwas, das vor einem halben Jahr liegen blieb, liest
 *  sich nicht als Hilfe, sondern als Vorwurf. */
const MAX_RUHE_TAGE = 60;

/** Zeitfenster fuer "neu im Ratgeber". Etwas grosszuegiger als sieben
 *  Tage, damit ein Artikel nicht zwischen zwei Laeufen durchfaellt. */
const ARTIKEL_TAGE = 8;

/** Hoechstens so viele Artikel — eine Liste, die man ueberfliegt. */
const MAX_ARTIKEL = 3;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const secret = Deno.env.get("CART_CRON_SECRET");
  if (!secret || req.headers.get("x-cron-secret") !== secret) {
    return new Response("unauthorized", { status: 401, headers: corsHeaders });
  }

  const db = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );
  const basis = Deno.env.get("PUBLIC_BASE_URL") ?? BRANDING.url;
  const funktionen = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;

  // Ein Testlauf schickt an genau eine Adresse und aendert sonst nichts.
  let nurAn: string | null = null;
  const body = await req.json().catch(() => ({}));
  if (typeof body?.testAn === "string") nurAn = body.testAn.trim().toLowerCase();

  // ---------------------------------------------------------------
  // 1. Neue Ratgeber-Artikel — fuer alle Empfaenger dieselben.
  // ---------------------------------------------------------------
  const seit = new Date(Date.now() - ARTIKEL_TAGE * 86400_000).toISOString();
  const { data: artikelZeilen } = await db
    .from("blog_posts")
    .select("slug, title, published_at")
    .eq("status", "published")
    .gte("published_at", seit)
    .order("published_at", { ascending: false })
    .limit(MAX_ARTIKEL);

  const neueArtikel: Array<[string, string]> = (artikelZeilen ?? [])
    .map((a) => [a.title as string, `/ratgeber/${a.slug}`] as [string, string]);

  // ---------------------------------------------------------------
  // 2. Offene Playbook-Laeufe je Nutzer.
  // ---------------------------------------------------------------
  const ruhe = new Date(Date.now() - MAX_RUHE_TAGE * 86400_000).toISOString();
  const { data: laeufe, error } = await db
    .from("playbook_runs")
    .select("user_id, playbook_slug, title, current_step, total_steps, status, last_activity_at")
    .eq("status", "in_progress")
    .gte("last_activity_at", ruhe)
    .order("last_activity_at", { ascending: false });

  if (error) {
    console.error("[weekly] playbook_runs:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Je Nutzer nur der zuletzt angefasste Lauf. Wer drei Playbooks offen
  // hat, bekommt nicht drei Aufforderungen — eine Mail, ein Schritt.
  const proNutzer = new Map<string, WochenStand>();
  for (const l of (laeufe ?? [])) {
    if (proNutzer.has(l.user_id)) continue;
    const titel = PLAYBOOK_TITEL[l.playbook_slug as string];
    const schritt = titel?.schritte[l.current_step as number] ?? null;
    if (!schritt) continue;   // umbenanntes oder entferntes Playbook
    proNutzer.set(l.user_id, {
      playbook: (l.title as string) ?? titel.titel,
      schrittNr: (l.current_step as number) + 1,   // Anzeige ist einsbasiert
      schritteGesamt: l.total_steps as number,
      naechsterSchritt: schritt,
      neueArtikel,
    });
  }

  // ---------------------------------------------------------------
  // 3. Empfaenger: aktiver Zugang. Wer keinen offenen Lauf hat, kommt
  //    ueber die Artikel trotzdem in die Liste — sofern es welche gibt.
  // ---------------------------------------------------------------
  const { data: abos } = await db
    .from("subscriptions")
    .select("user_id, status, comp_access");

  const berechtigt = (abos ?? []).filter((a) =>
    a.status === "active" || a.comp_access === true);

  let versendet = 0, nichtsZuSagen = 0, uebersprungen = 0, fehler = 0;

  for (const abo of berechtigt) {
    const stand: WochenStand = proNutzer.get(abo.user_id) ?? { neueArtikel };

    // Provision nur nachschlagen, wenn der Nutzer ueberhaupt Affiliate
    // ist — sonst eine Abfrage je Empfaenger fuer nichts.
    const { data: aff } = await db
      .from("affiliates").select("id").eq("user_id", abo.user_id).maybeSingle();
    if (aff?.id) {
      const { data: prov } = await db
        .from("affiliate_commissions")
        .select("commission_cents")
        .eq("affiliate_id", aff.id)
        .in("status", ["pending", "approved", "paid"]);
      const summe = (prov ?? []).reduce((n, p) => n + (p.commission_cents ?? 0), 0);
      if (summe > 0) stand.provisionCents = summe;
    }

    if (!hatInhalt(stand)) { nichtsZuSagen++; continue; }

    const { data: profil } = await db
      .from("profiles").select("email, first_name").eq("id", abo.user_id).maybeSingle();

    const adresse = (profil?.email ?? "").trim().toLowerCase();
    if (!adresse) { uebersprungen++; continue; }
    if (nurAn && adresse !== nurAn) { uebersprungen++; continue; }

    const variant = abTest(adresse, "weekly");

    // Signierter Link auf die Edge Function, nicht `${basis}/abmelden`:
    // diese Route gibt es im Frontend nicht (App.tsx kennt sie nicht),
    // ein Abmeldelink dorthin landet auf 404. Ohne UNSUBSCRIBE_SECRET
    // liefert der Helfer `undefined` — dann lieber nicht senden, als
    // eine Werbemail ohne funktionierenden Abmeldeweg zu verschicken.
    const abmelden = await unsubscribeUrl(adresse, funktionen);
    if (!abmelden) { uebersprungen++; continue; }
    const built = buildWeekly({
      name: profil?.first_name ?? null, stand, baseUrl: basis, variant,
      unsubscribeUrl: abmelden,
    });

    const res = await sendCampaign({
      to: adresse, built, campaign: "weekly", variant, db, unsubscribeUrl: abmelden,
    });

    if (res.ok) versendet++;
    else if (res.reason === "optout") uebersprungen++;
    else { console.error(`[weekly] ${adresse}: ${res.reason} ${res.detail ?? ""}`); fehler++; }
  }

  const bericht = {
    berechtigt: berechtigt.length, mitOffenemSchritt: proNutzer.size,
    neueArtikel: neueArtikel.length, versendet, nichtsZuSagen, uebersprungen, fehler,
  };
  console.log("[weekly]", JSON.stringify(bericht));
  return new Response(JSON.stringify(bericht), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
