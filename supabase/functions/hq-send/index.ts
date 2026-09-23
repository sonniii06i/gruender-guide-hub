// ===================================================================
// hq-send — Kampagnenversand aus dem HQ-Portal (arbitragex.de/hq).
//
// Diese Datei ist in allen vier TS-Marken byte-identisch (wie das
// Mail-Kit). Das HQ waehlt Empfaenger und Text; gesendet wird HIER, mit
// dem Layout, dem Versandweg, der Abmeldeliste und der Messung DIESER
// Marke. Dadurch landen sent/opened/clicked in mail_events wie bei jeder
// anderen Kampagne, und das HQ sieht sie beim naechsten Sammellauf.
//
// Schutz: HMAC-SHA256 ueber den rohen Body mit HQ_ARCHIV_SECRET (dasselbe
// Secret wie das Mail-Archiv). Der Body traegt einen Zeitstempel; aelter
// als 10 Minuten wird abgelehnt, damit ein mitgeschnittener Aufruf nicht
// spaeter noch einmal eine ganze Liste anschreibt.
//
// modus "vorschau" rendert nur (kein Versand), "test" schickt an die
// angegebenen Adressen ohne Abmeldepruefung unter "<kampagne>_test",
// "senden" geht ueber sendCampaign() — Abmeldung wird zuerst geprueft.
// ===================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { aufmacher, button, paragraph, plain, renderMail } from "../_shared/mailLayout.ts";
import { sendCampaign, sendMail } from "../_shared/mailSend.ts";
import { BRANDING } from "../_shared/mailBrand.ts";

interface Empfaenger { email: string; name?: string; abmelden?: string }
interface Auftrag {
  ts: number;
  modus: "vorschau" | "test" | "senden";
  kampagne: string;
  betreff: string;
  vorschautext?: string;
  titel?: string;
  absaetze: string[];
  knopf?: { text: string; url: string } | null;
  empfaenger: Empfaenger[];
}

const esc = (v: string) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function signatur(body: string, geheim: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(geheim), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body)));
  return Array.from(sig).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function gleich(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function bauen(a: Auftrag, e: Empfaenger) {
  const vorname = (e.name || "").trim().split(/\s+/)[0];
  const gruss = vorname ? `Hallo ${vorname},` : "Hallo,";
  // Absaetze sind reiner Text aus dem HQ: escapen, Zeilenumbrueche erhalten.
  const bloecke = a.absaetze.filter((p) => p.trim()).map((p) => paragraph(esc(p.trim()).replace(/\n/g, "<br>")));
  if (a.knopf?.url && a.knopf?.text) bloecke.push(button(a.knopf.url, a.knopf.text));
  const html = renderMail({
    preheader: a.vorschautext || a.betreff,
    greeting: a.titel ? undefined : gruss,
    heroBlock: a.titel ? aufmacher(a.titel) : undefined,
    blocks: a.titel ? [paragraph(esc(gruss)), ...bloecke] : bloecke,
    unsubscribeUrl: e.abmelden,
  });
  const text = plain({
    greeting: gruss,
    lines: a.absaetze.filter((p) => p.trim()).flatMap((p) => [p.trim(), ""]),
    cta: a.knopf?.url ? [a.knopf.text, a.knopf.url] : undefined,
    unsubscribeUrl: e.abmelden,
    reason: BRANDING.defaultReason,
  });
  return { subject: a.betreff, html, text };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("nur POST", { status: 405 });
  const geheim = Deno.env.get("HQ_ARCHIV_SECRET");
  const body = await req.text();
  if (!geheim || !gleich(req.headers.get("x-hq-signatur") || "", await signatur(body, geheim))) {
    return new Response("unauthorized", { status: 401 });
  }
  let a: Auftrag;
  try {
    a = JSON.parse(body);
  } catch {
    return new Response("kein JSON", { status: 400 });
  }
  if (!a.ts || Math.abs(Date.now() / 1000 - a.ts) > 600) {
    return new Response("abgelaufen", { status: 401 });
  }
  if (!a.betreff || !Array.isArray(a.absaetze) || !Array.isArray(a.empfaenger)) {
    return new Response("unvollstaendig", { status: 400 });
  }

  if (a.modus === "vorschau") {
    const b = bauen(a, a.empfaenger[0] ?? { email: "vorschau@example.com", abmelden: "#" });
    return Response.json({ ok: true, html: b.html, text: b.text });
  }

  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  const ergebnisse: Array<{ email: string; ok: boolean; grund?: string; id?: string }> = [];
  for (const e of a.empfaenger.slice(0, 50)) {
    const gebaut = bauen(a, e);
    const r = a.modus === "test"
      ? await sendMail({ to: e.email, built: gebaut, campaign: `${a.kampagne}_test`, unsubscribeUrl: e.abmelden, db })
      : await sendCampaign({ to: e.email, built: gebaut, campaign: a.kampagne, unsubscribeUrl: e.abmelden, db });
    ergebnisse.push(r.ok ? { email: e.email, ok: true, id: r.id } : { email: e.email, ok: false, grund: r.reason + (r.detail ? `: ${r.detail}` : "") });
  }
  return Response.json({ ok: true, marke: BRANDING.slug, ergebnisse });
});
