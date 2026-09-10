// Begrüßungsmail nach dem Kauf.
//
// WARUM ES DIE FUNKTION BRAUCHT: Vor pay-first lief die Registrierung über
// `supabase.auth.signUp`, und Supabase verschickte selbst eine
// Bestätigungsmail. Seit `claim-account` das Konto per Admin-API mit
// `email_confirm: true` anlegt, verschickt Supabase gar nichts mehr — ein
// zahlender Kunde bekam also weder Beleg noch Zugangshinweis. Es entstand
// dabei kein Fehler; es passierte schlicht nichts, und genau deshalb wäre es
// lange unbemerkt geblieben.
//
// WARUM SIE UMGEBAUT WURDE: Das HTML war ein <div> mit "color:#111" — keine
// Markenfarbe, kein Kopf, kein Fuß, und ein <div>-Layout bricht in Outlook.
// Vor allem aber war es eine Quittung, kein Start: "Dein Zugang ist
// freigeschaltet" und dann nichts. Die erste Mail nach dem Kauf entscheidet,
// ob jemand das Produkt überhaupt öffnet — sie führt jetzt zu den ersten
// drei Schritten statt nur zur Anmeldemaske.
//
// Versand über den gemeinsamen IONOS-SMTP-Weg (_shared/sendMail.ts) —
// dieselbe Absenderadresse wie überall, sonst scheitert die Zustellung an
// SPF/DKIM.

import {
  button, callout, heading, paragraph, renderMail, steps,
} from "../_shared/mailLayout.ts";
import { sendMail } from "../_shared/sendMail.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://gruenderx.de";

interface Payload {
  email: string;
  firstName?: string;
  plan?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;
    if (!body?.email || !body.email.includes("@")) {
      return new Response(JSON.stringify({ error: "email fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const vorname = (body.firstName || "").trim().split(/\s+/)[0] || "";
    const greeting = vorname ? `Hallo ${vorname},` : "Hallo,";
    const plan = (body.plan || "GründerX").trim();

    const blocks = [
      paragraph(
        `deine Zahlung ist eingegangen und dein Zugang <b>${plan}</b> ist ` +
        `freigeschaltet. Melde dich mit genau der Adresse an, an die diese ` +
        `Mail gegangen ist.`,
      ),
      button(`${SITE}/auth?mode=signin`, "Jetzt anmelden"),
      heading("Die ersten drei Schritte"),
      steps([
        ["Frag Felix, was dich gerade blockiert",
         "Der KI-Co-Pilot ist unbegrenzt im Chat — Rechtsform, Finanzamt-" +
         "Fragebogen, Umsatzsteuer, Amazon-Abrechnung. Keine Abrechnung pro Frage."],
        ["Lass die Pflichten einmal durchprüfen",
         "Brauche ich ein Gewerbe? Bin ich über der Schwelle? Fehlt mir LUCID, " +
         "WEEE oder eine CE-Erklärung? Drei Minuten je Check, und du weißt es."],
        ["Richte das Steuer-Cockpit ein",
         "USt-Voranmeldung, EÜR, BWA und Fristen an einer Stelle. Wer das einmal " +
         "eingerichtet hat, sucht am Quartalsende nichts mehr zusammen."],
      ]),
      callout(
        "Rechnung, Zahlungsdaten und Kündigung",
        `Alles im Kundenportal unter „Abo verwalten“ — jederzeit zum Ende der ` +
        `Abrechnungsperiode kündbar, ein Klick, kein Anruf.`,
      ),
    ];

    const text = [
      greeting, "",
      `deine Zahlung ist eingegangen, dein Zugang (${plan}) ist freigeschaltet.`,
      "",
      `Anmelden: ${SITE}/auth`,
      "Deine Anmelde-Adresse ist genau die, an die diese Mail ging.",
      "",
      "Die ersten drei Schritte:",
      "1. Frag Felix, was dich gerade blockiert — unbegrenzt im Chat.",
      "2. Lass die Pflichten pruefen: Gewerbe, Schwellen, LUCID, WEEE, CE.",
      "3. Richte das Steuer-Cockpit ein: USt, EUER, BWA, Fristen.",
      "",
      "Rechnungen und Kuendigung findest du im Kundenportal unter",
      "„Abo verwalten“. Jederzeit zum Ende der Abrechnungsperiode kuendbar.",
      "",
      "Fragen? Einfach auf diese Mail antworten.",
      "",
      "Viele Gruesse",
      "Sonni von GruenderX",
    ].join("\n");

    const html = renderMail({
      preheader: "Dein Zugang ist freigeschaltet — hier sind die ersten drei Schritte.",
      greeting,
      blocks,
      baseUrl: SITE,
      // Kein Abmeldelink: Das ist eine Vertragsmail, keine Werbung.
      footerReason: "Du bekommst diese Mail, weil du gerade einen Zugang gekauft hast.",
    });

    const res = await sendMail({
      to: body.email,
      subject: "Dein Zugang zu GründerX ist bereit",
      text,
      html,
    });
    if (!res.ok) throw new Error(res.error || "Versand fehlgeschlagen");

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("❌ send-welcome-email:", (e as Error).message);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
