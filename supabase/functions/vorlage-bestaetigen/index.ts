// ===================================================================
// vorlage-bestaetigen — Schritt 2 des Double-Opt-in der Vorlagen-Bibliothek.
//
// GET ?e=<adresse>&v=<slug>&s=<signatur>
//   -> prueft die Signatur (vorlagenMail.ts)
//   -> setzt vorlagen_leads.bestaetigt_am (nur beim ersten Mal)
//   -> leitet auf https://gruenderx.de/vorlagen/<slug>?freigabe=1&e=&s= um;
//      dort merkt sich der Browser die Freigabe (src/lib/vorlagen/freigabe.ts)
//
// Ungueltige oder unvollstaendige Links zeigen eine kleine HTML-Seite mit
// dem Weg zurueck — keine Weiterleitung, sonst koennte man mit einem
// beliebigen Link die Freigabe-Parameter erraten lassen.
// ===================================================================
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { vorlageTitel } from "../_shared/vorlagenKatalog.ts";
import {
  EMAIL_RE, SITE, SLUG_RE, freigabeLink, normalisiere, signaturGueltig, vorlagenSecret,
} from "../_shared/vorlagenMail.ts";

const page = (title: string, body: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${title} · GründerX</title></head>
<body style="margin:0;background:#f4f6fb;font:400 16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1f2937">
<div style="max-width:520px;margin:12vh auto;background:#fff;border-radius:14px;padding:32px;box-shadow:0 2px 14px rgba(15,23,42,.07)">
  <div style="font:800 20px/1 inherit;color:#0c2a6e">GründerX</div>
  <h1 style="font-size:21px;margin:22px 0 10px">${title}</h1>
  <div style="color:#4b5563">${body}</div>
  <p style="margin-top:26px"><a href="${SITE}/vorlagen" style="color:#256af4;font-weight:600">Zur Vorlagen-Bibliothek</a></p>
</div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const email = normalisiere(url.searchParams.get("e") || "");
  const slug = (url.searchParams.get("v") || "").trim();
  const sig = (url.searchParams.get("s") || "").trim();

  const secret = vorlagenSecret();
  if (!secret) {
    console.error("❌ vorlage-bestaetigen: kein Secret gesetzt");
    return page("Das hat gerade nicht geklappt",
      "Bitte fordere die Vorlage in ein paar Minuten noch einmal an.", 500);
  }
  if (!EMAIL_RE.test(email) || !SLUG_RE.test(slug) || !sig) {
    return page("Link unvollständig",
      "Der Bestätigungslink war nicht vollständig. Fordere die Vorlage bitte noch einmal an, " +
      "dann schicken wir dir einen neuen Link.", 400);
  }
  if (!(await signaturGueltig(email, sig, secret))) {
    return page("Link ungültig",
      "Dieser Link gehört nicht zu dieser Adresse. Fordere die Vorlage bitte noch einmal an.", 400);
  }
  // Unbekannter Slug: Signatur stimmt, also ist die Adresse bestaetigt —
  // wir leiten auf die Uebersicht statt auf eine 404.
  const ziel = vorlageTitel(slug) ? slug : "";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );
  const jetzt = new Date().toISOString();
  const { data, error } = await supabase
    .from("vorlagen_leads")
    .select("id, bestaetigt_am")
    .eq("email", email)
    .maybeSingle();
  if (error) {
    console.error("❌ vorlage-bestaetigen lesen:", error.message);
  } else if (!data) {
    // Zeile fehlt (z. B. nach dem 30-Tage-Aufraeumen): Signatur ist echt,
    // also neu anlegen und direkt als bestaetigt fuehren.
    await supabase.from("vorlagen_leads").insert({
      email, erste_vorlage: ziel || null, letzte_vorlage: ziel || null,
      anfragen: 1, letzte_anfrage_am: jetzt, bestaetigt_am: jetzt,
    });
  } else if (!data.bestaetigt_am) {
    await supabase.from("vorlagen_leads").update({ bestaetigt_am: jetzt }).eq("id", data.id);
  }

  const weiter = ziel
    ? freigabeLink(email, ziel, sig)
    : `${SITE}/vorlagen?freigabe=1&e=${encodeURIComponent(email)}&s=${sig}`;
  return new Response(null, { status: 302, headers: { Location: weiter, "Cache-Control": "no-store" } });
});
