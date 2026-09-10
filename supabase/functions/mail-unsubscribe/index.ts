// ===================================================================
// Abmeldung von Marketingmails.
//
// WARUM ES DIESE FUNKTION BRAUCHT:
//
// 1. RECHTLICH. § 7 Abs. 3 UWG erlaubt Werbung per Mail an eigene Kunden
//    fuer eigene, aehnliche Ware ohne separate Einwilligung -- aber nur,
//    wenn der Kunde bei jeder Mail widersprechen kann. Ein Link, der ins
//    Leere zeigt, erfuellt das nicht.
// 2. ZUSTELLBARKEIT. Gmail und Yahoo verlangen seit Februar 2024 bei
//    Massenversand List-Unsubscribe mit One-Click (RFC 8058). Fehlt der
//    funktionierende Endpunkt, klickt der Empfaenger stattdessen auf
//    "Spam melden" -- und das schaedigt die Domain dauerhaft.
//
// ZWEI WEGE, EIN ERGEBNIS:
//   POST  -> One-Click aus dem Mailclient. Kein Bestaetigungsklick, sonst
//            verletzt es RFC 8058.
//   GET   -> Klick auf "Abmelden" im Fuss. Traegt ebenfalls sofort aus und
//            zeigt eine Bestaetigungsseite; ein zweiter Klick waere hier
//            nur eine Huerde, denn wer abmelden will, will abmelden.
//
// Die Adresse steht in der URL, gegen Manipulation mit einer HMAC-Signatur
// gesichert -- sonst koennte jeder fremde Adressen austragen.
// ===================================================================
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { sameSig, signEmail } from "../_shared/unsubscribe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SITE = "https://gruenderx.de";

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
  <p style="margin-top:26px"><a href="${SITE}" style="color:#256af4;font-weight:600">Zurück zu gruenderx.de</a></p>
</div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const email = (url.searchParams.get("e") || "").trim().toLowerCase();
  const sig = (url.searchParams.get("s") || "").trim();
  const secret = Deno.env.get("UNSUBSCRIBE_SECRET");

  if (!secret) {
    console.error("❌ UNSUBSCRIBE_SECRET not set");
    return page("Das hat gerade nicht geklappt",
      "Bitte antworte kurz auf die Mail — wir tragen dich von Hand aus.", 500);
  }
  if (!email || !email.includes("@") || !sig) {
    return page("Link unvollständig",
      "Der Abmeldelink war nicht vollständig. Antworte einfach auf die Mail, " +
      "dann tragen wir dich aus.", 400);
  }
  if (!sameSig(sig, await signEmail(email, secret))) {
    return page("Link ungültig",
      "Dieser Abmeldelink gehört nicht zu dieser Adresse. Antworte einfach auf " +
      "die Mail, dann tragen wir dich aus.", 400);
  }

  const { error } = await supabase.from("mail_optouts").upsert(
    { email, source: req.method === "POST" ? "one_click" : "link" },
    { onConflict: "email" },
  );

  if (error) {
    console.error("❌ mail-unsubscribe:", error.message);
    // One-Click darf trotzdem 200 sehen: sonst wertet der Mailclient die
    // Abmeldung als kaputt und bietet dem Nutzer "Spam melden" an.
    if (req.method === "POST") return new Response("ok", { status: 200 });
    return page("Das hat gerade nicht geklappt",
      "Bitte antworte kurz auf die Mail — wir tragen dich von Hand aus.", 500);
  }

  if (req.method === "POST") return new Response("ok", { status: 200 });

  return page("Du bekommst keine Werbemails mehr",
    `<b>${email.replace(/</g, "&lt;")}</b> ist ausgetragen. ` +
    "Rechnungen, Kaufbestätigungen und Antworten auf deine Anfragen kommen " +
    "weiterhin — die gehören zum Vertrag und lassen sich nicht abbestellen.");
});
