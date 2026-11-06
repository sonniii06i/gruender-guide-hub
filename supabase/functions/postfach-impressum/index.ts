// ===================================================================
// postfach-impressum — impressum@gruenderx.de lesbar machen (06.11.2026).
//
// impressum@ ist das IONOS-Postfach hinter dem SMTP-Zugang. Die Adresse
// steht auf GründerX-Seiten (Startseite, Partner, Konto, Widerruf) und als
// einzige Adresse im Bärenstark-Impressum, landet aber nicht im
// Sammel-Gmail: Kundenmails dorthin las niemand.
//
// Diese Function liest das Postfach per IMAP (gleicher Zugang wie der
// SMTP-Versand, IONOS_SMTP_PASSWORD) und leitet Mails von Menschen an
// service@gruenderx.de weiter (Weiterleitung ins Sammel-Gmail: Daily-Check
// und HQ-Antwort-Agent). Aufruf nur mit Service-Schlüssel, aus dem HQ:
//
//   {"modus":"weiterleiten","seit":"<ISO>"}  ungelesene Mails seit <seit>
//   {"modus":"liste","tage":90}              Altbestand, nur Kopfdaten
//   {"modus":"uids","uids":[1,2]}            genau diese Mails nachreichen
//
// Gelesen markiert wird erst nach geglückter Weiterleitung. Bounces,
// No-Reply-Absender und eigene Adressen bleiben unangetastet.
// ===================================================================
import { ImapFlow } from "npm:imapflow@1.0.164";
import { simpleParser } from "npm:mailparser@3.7.1";
import { istServiceRole } from "../_shared/authGuard.ts";
import { sendMail, SMTP_LOGIN } from "../_shared/sendMail.ts";

const ZIEL = "service@gruenderx.de";
const PRAEFIX = "Kundenmail an impressum@:";
const MAX_JE_LAUF = 10;   // gemeinsames SMTP-Kontingent schonen; der Rest kommt im naechsten Lauf
const FEHL_KENNZEICHEN = "WeiterleitungFehlgeschlagen";

// Echtheit des Absenders (IONOS schreibt Authentication-Results): der HQ-Agent zeigt sie an und behandelt „fail“/„keine“ als
// moeglicherweise gefaelscht. Der Mailtext bleibt fuer den Agenten reine Daten, nie Anweisung.
// Nur der oberste Authentication-Results-Kopf zaehlt, und nur, wenn seine authserv-id exakt ein IONOS-Rechner ist; weitere
// Koepfe kann der Absender selbst mitschicken. Vor dem Zerlegen werden Anfuehrungen und Kommentare entfernt (RFC 8601), ein
// Verfahren, das nicht genau einmal vorkommt, gilt als „keine“. Bleibt ein Hinweis: setzt IONOS keinen eigenen Kopf, kann ein
// gefaelschter oben stehen. Der HQ-Agent schreibt deshalb nur Entwuerfe, gesendet wird nach Klick.
const IONOS_AUTHSERV = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.(ionos\.de|ionos\.com|kundenserver\.de)$/;
function echtheit(p: any): string {
  const kopf = p.headers?.get?.("authentication-results");
  const roh = String(Array.isArray(kopf) ? kopf[0] ?? "" : kopf ?? "")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""').replace(/\([^()]*\)/g, " ");
  const teile = roh.split(";").map((t) => t.trim());
  const id = (teile[0] ?? "").split(/\s+/)[0].toLowerCase();
  if (!IONOS_AUTHSERV.test(id)) return "spf=keine dkim=keine dmarc=keine (kein IONOS-Pruefkopf)";
  const teil = (k: string) => {
    const w = teile.slice(1).map((t) => t.match(new RegExp(`^${k}\\s*=\\s*(\\w+)`, "i"))?.[1]).filter(Boolean);
    return w.length === 1 ? String(w[0]).toLowerCase() : "keine";
  };
  return `spf=${teil("spf")} dkim=${teil("dkim")} dmarc=${teil("dmarc")}`;
}
const SYSTEM_ABSENDER =
  /(^|[.@])(mailer-daemon|postmaster|no-?reply|donotreply|do-not-reply|notifications?|newsletter|bounces?)[@.+-]|@gruenderx\.de$/i;

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json" } });

const esc = (v: unknown) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const adresse = (v: unknown) => (String(v ?? "").match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] ?? "").toLowerCase();

function vonMensch(von: string, betreff: string): boolean {
  return !!von && !SYSTEM_ABSENDER.test(von) && !betreff.startsWith(PRAEFIX);
}

async function weiterleiten(p: any): Promise<boolean> {
  const von = (p.from as any)?.text || "";
  const vonAdresse = adresse(von);
  const betreff = String(p.subject || "(ohne Betreff)").replace(/[\r\n]+/g, " ").slice(0, 160);
  const datum = p.date ? new Date(p.date).toISOString() : "";
  const text = String(p.text || "").slice(0, 20000);
  const kopf = `Von: ${von}\nAn: ${(p.to as any)?.text || ""}\nDatum: ${datum}\nBetreff: ${betreff}\nEchtheit: ${echtheit(p)}\n` +
    "Weitergeleitet aus dem Postfach impressum@gruenderx.de (postfach-impressum).\n\n";
  const r = await sendMail({
    to: ZIEL,
    subject: `${PRAEFIX} ${betreff}`,
    text: kopf + text,
    html: `<!doctype html><html lang="de"><head><meta charset="utf-8"></head>
      <body style="font:400 15px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1f2937">
        <p><b>Von:</b> ${esc(von)}<br><b>An:</b> ${esc((p.to as any)?.text || "")}<br><b>Datum:</b> ${esc(datum)}<br>
        <b>Betreff:</b> ${esc(betreff)}<br><b>Echtheit:</b> ${esc(echtheit(p))}</p>
        ${vonAdresse ? `<p><a href="mailto:${esc(vonAdresse)}?subject=${encodeURIComponent("Re: " + betreff)}">Antworten an ${esc(vonAdresse)}</a></p>` : ""}
        <p style="color:#6b7280">Weitergeleitet aus dem Postfach impressum@gruenderx.de (postfach-impressum).</p>
        <hr style="border:0;border-top:1px solid #e5e7eb;margin:16px 0">
        <p style="white-space:pre-wrap">${esc(text)}</p>
      </body></html>`,
  });
  if (!r.ok) console.error("Weiterleitung fehlgeschlagen:", r.error);
  return r.ok;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!istServiceRole(req)) return json({ error: "nicht erlaubt" }, 401);
  const b = await req.json().catch(() => ({})) as Record<string, unknown>;
  const modus = String(b.modus ?? "");
  const pass = Deno.env.get("IONOS_SMTP_PASSWORD");
  if (!pass) return json({ error: "IONOS_SMTP_PASSWORD fehlt" }, 500);

  const client = new ImapFlow({
    host: "imap.ionos.de", port: 993, secure: true, greetingTimeout: 30000,
    auth: { user: SMTP_LOGIN, pass }, logger: false,
  });
  await client.connect();
  const lock = await client.getMailboxLock("INBOX");
  try {
    if (modus === "liste") {
      const tage = Math.min(Math.max(Number(b.tage) || 90, 1), 365);
      const alle = (await client.search({ since: new Date(Date.now() - tage * 86400_000) }, { uid: true })) || [];
      const liste: unknown[] = [];
      let system = 0;
      if (alle.length) {
        for await (const m of client.fetch(alle.slice(-1000).join(","), { envelope: true, flags: true }, { uid: true })) {
          const f = m.envelope?.from?.[0];
          const von = (f?.address || "").toLowerCase();
          if (!vonMensch(von, m.envelope?.subject || "")) { system++; continue; }
          liste.push({ uid: m.uid, von: `${f?.name || ""} <${von}>`, betreff: m.envelope?.subject || "",
                       datum: m.envelope?.date || null, gelesen: m.flags?.has("\\Seen") ?? null });
        }
      }
      return json({ success: true, gesamt: alle.length, system, menschen: liste });
    }

    let uids: number[] = [];
    if (modus === "uids") {
      uids = (Array.isArray(b.uids) ? b.uids : []).map(Number).filter((n) => Number.isInteger(n) && n > 0).slice(0, 100);
    } else if (modus === "weiterleiten") {
      const seit = new Date(String(b.seit ?? ""));
      if (Number.isNaN(seit.getTime())) return json({ error: "seit fehlt" }, 400);
      uids = ((await client.search({ seen: false, since: seit }, { uid: true })) || []).slice(0, MAX_JE_LAUF);
    } else {
      return json({ error: "modus" }, 400);
    }

    const stats = { geprueft: 0, weitergeleitet: 0, system: 0, fehler: 0 };
    for (const uid of uids) {
      stats.geprueft++;
      try {
        const msg = await client.fetchOne(String(uid), { source: true, flags: true }, { uid: true });
        if (!msg || !msg.source) continue;
        const p = await simpleParser(msg.source as Uint8Array);
        if (!vonMensch(adresse((p.from as any)?.text), p.subject || "")) { stats.system++; continue; }
        if (await weiterleiten(p)) {
          await client.messageFlagsAdd(String(uid), ["\\Seen"], { uid: true });
          stats.weitergeleitet++;
        } else {
          stats.fehler++;
          if (!msg.flags?.has(FEHL_KENNZEICHEN)) {
            await client.messageFlagsAdd(String(uid), [FEHL_KENNZEICHEN], { uid: true });
          } else {  // zweimal gescheitert: aufgeben, damit sie das Fenster nicht dauerhaft belegt
            await client.messageFlagsAdd(String(uid), ["\\Seen"], { uid: true });
            console.error("Weiterleitung zweimal gescheitert, aufgegeben:", uid);
          }
        }
      } catch (e) {
        stats.fehler++;
        console.error("Mail", uid, (e as Error).message);
      }
    }
    return json({ success: stats.fehler === 0, stats }, stats.fehler ? 502 : 200);
  } finally {
    lock.release();
    await client.logout();
  }
});
