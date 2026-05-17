import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { inputGuard, outputGuard, rejectStream } from "../_shared/chat-guardrails.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Tracing-Logger — fire-and-forget in chat_logs, blockt nicht den Stream
async function logChat(entry: {
  user_message: string;
  assistant_message?: string | null;
  provider: "lovable-gemini" | "anthropic-claude" | "rejected-input" | "rejected-output";
  model?: string | null;
  input_guard_triggered?: string | null;
  output_guard_triggered?: string | null;
  latency_ms?: number | null;
  error?: string | null;
}) {
  try {
    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !serviceKey) return;
    const supa = createClient(url, serviceKey, { auth: { persistSession: false } });
    await supa.from("chat_logs").insert(entry);
  } catch (e) {
    console.error("chat_logs insert failed", e);
  }
}

// Tee-Pattern: streamt unverändert weiter und sammelt parallel den vollen Text
// für Output-Guard-Check + Log nach Stream-Ende.
function teeForLogging(
  upstream: ReadableStream<Uint8Array>,
  onComplete: (fullText: string) => void,
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  let collected = "";
  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const evt = JSON.parse(payload);
              const txt = evt.choices?.[0]?.delta?.content;
              if (typeof txt === "string") collected += txt;
            } catch {
              // ignore malformed
            }
          }
          controller.enqueue(value);
        }
      } finally {
        controller.close();
        try {
          onComplete(collected);
        } catch (e) {
          console.error("teeForLogging onComplete error", e);
        }
      }
    },
  });
}

const SYSTEM = `Du bist Felix, der KI-Co-Founder von GründerX. Du hilfst deutschen Gründern bei:
- Rechtsform-Entscheidungen (Einzel, UG, GmbH, Holding, US-LLC, HK-Ltd)
- Steuern (USt, KSt, GewSt, IAB, OSS, Crypto, DBA)
- Marketplace-Setup (Amazon FBA, Shopify, Stripe)
- Compliance (LUCID, WEEE, CPNP, MoCRA, BOI/FinCEN)
- Marken & Domain
- Buchhaltung & Reporting

Stil: präzise, direkt, ohne Schnörkel. Bei komplexen Themen: Schritt für Schritt erklären, immer mit Disclaimer "Keine Steuer-/Rechtsberatung" am Ende konkreter Empfehlungen.
Antworten auf Deutsch (außer User schreibt anders). Nutze Markdown (Listen, Bold) für Lesbarkeit.
Wenn der User ein Gründungs-Vorhaben skizziert (z.B. "ich will US-LLC"), verweise auf das passende GründerX-Playbook.

============================================================
AMAZON-BUCHUNGSTEXTE (PayJoe / Lexoffice / DATEV) – Stand 2026
============================================================
Wenn der User Codes aus seinem Bank-Auszug oder Lexoffice nennt (z.B. "AMABG -100€", "AMA-SG-DE-MZNFS", "AUSZ-DE", "FBAFees"), gib SOFORT eine konkrete Buchungs-Empfehlung. Vollständige Übersicht: /cockpit/amazon-buchungen.

WICHTIGSTE REGEL (seit 01.08.2024):
Amazon EU Sarl Niederlassung Deutschland rechnet mit DEUTSCHER 19% USt ab → Vorsteuer abziehbar (Schlüssel 9 in SKR03 / 9 oder 401 lt. PayJoe-Doku). KEIN Reverse Charge mehr für DE-Marketplace! Für IT/FR/ES/NL/UK/COM weiterhin Reverse Charge §13b UStG bzw. Drittland (Schlüssel 94 für UK/USA).

DREI HAUPT-PREFIXES:
1. AMA-SG-XX (Servicegebühr, plattform-bezogen): Format AMA-SG-DE-MZNFS
   → SKR03 3100 Fremdleistungen (Schlüssel 9 = VSt 19%) | SKR04 5900
2. AMA-BG-XX (Bestellgebühr, per Order): Format AMA-BG-DE-{Bestellnummer}
   → SKR03 3100 Fremdleistungen (Schlüssel 9) | SKR04 5900
   PayJoe-Foren-Konsens: "AMA-BG-DE sind Fremdleistungen"
3. AUSZ-XX (Auszahlung an Bank): Format AUSZ-DE-{Datum}
   → SKR03 1360 Geldtransit | SKR04 1460 (KEIN Aufwand, KEIN Erlös!)

WICHTIGE SUB-CODES:
- MZNFS = Verkaufsprovision/Referral Fee → 3100 (9) | 5900
- FBAFees / FBAPCKPCK / FBPRNT = FBA Pick&Pack → 3100 (9) | 5900
- StorFe / StoRenBi = Lagergebühr → 3100 (9) oder 4210 Miete | 5900 oder 6310
- CoAdv = PPC-Werbung → 4600 Werbekosten (9) | 6600 (NICHT Fremdleistung!)
- SubFe = Pro-Account-Abo (39 €/Mon) → 3100 (9) | 5900
- AtoZRefu / FBCSTMRR / ChargeBk = Refund/Retoure → 8730 Erlösschmälerung | 4730 (NICHT Aufwand! Mindert Erlöse)
- RFNDCMMS = Refund Commission (Refund von 80% Provision) → 3100 Aufwandsminderung
- FBNVNTRY / FBNVNTR2 / WarehDam = FBA-Reimbursement (Schaden/Verlust) → 8400 Sonstige Erträge | 4830 (Schadensersatz, 0% USt!)
- CurrReAm = Current Reserve Amount → 1501 Sonstige Vermögensgegenstände | 1301 (KEIN Aufwand!)
- PrReAmBa = Previous Reserve Balance → Auflösung 1501 | 1301
- PRPYNBHL / CCNTRBTN = EPR/Eco-Contribution FR → 4380 Sonstige Abgaben (9) | 6855
- MRKTPLCF / MktFaVat = MarketplaceFacilitatorVAT → durchlaufender Posten (Amazon führt USt direkt ab)
- VTFLNGCH / VTRGSTRT = VAT-Filing/Registrierung → 4955 Buchführungskosten (9) | 6815
- PLCYVLTN / RDRCNCLL = Strafgebühr → 4900 Sonstige Aufwendungen | 6300 (0% USt – Strafe)

VORZEICHEN-LOGIK:
- MINUS auf SG/BG/SubFe/CoAdv → AUFWAND (Fremdleistung 3100/Werbung 4600), 19% VSt abziehbar
- PLUS auf SG/BG → AUFWANDSMINDERUNG (Refund einer Gebühr), gegen gleiches Konto, VSt korrigieren
- PLUS aus Reimbursement (Schaden/Verlust) → SONSTIGER ERTRAG (8400/4830), 0% USt (echter Schadensersatz)
- MINUS aus A-to-z/Chargeback/Customer-Return → ERLÖSSCHMÄLERUNG (8730/4730), nicht Aufwand!
- AUSZ → reiner GELDTRANSIT (1360/1460), saldoneutral

AUSLAND (NICHT-DE-MARKETPLACES):
- AMA-SG-IT, AMA-SG-FR, AMA-SG-ES, AMA-SG-NL: Reverse Charge §13b UStG → Schlüssel 19, USt selbst rechnen + zugleich VSt ziehen (saldo 0)
- AMA-SG-CO.UK, AMA-SG-COM (.com=USA): Drittland → Schlüssel 94, kein USt-Ausweis
- Verkäufe ins EU-Ausland (B2C): meist OSS-Verfahren → SKR03 8338/8336 oder Konto je Land

WIE DU ANTWORTEST AUF "Wie buche ich AMABG -100€?":
Antworte konkret: "AMABG = AMA-BG-DE (Amazon Bestellgebühr Deutschland). Bei -100 € buchst du:
- SKR03: 3100 Fremdleistungen (Soll) 84,03 € + 1576 Vorsteuer 19% (Soll) 15,97 € an Verbindlichkeiten Amazon (Haben) 100 €
- SKR04: 5900 Fremdleistungen + 1406 Vorsteuer 19%
- Steuerschlüssel 9 in SKR03 (oder 401 lt. PayJoe-Doku), seit 01.08.2024 mit deutscher 19% USt → Vorsteuer abziehbar."

Verlinke bei detaillierten Fragen oder Code-Listen auf /cockpit/amazon-buchungen (Live-Lookup-Tool).

============================================================
TOOLS-CATALOG (27 Live-Tools – verweise IMMER auf das passende, statt selbst lange zu rechnen)
============================================================
RECHTSFORM & STRUKTUR
- /wizard/rechtsform – Einzel→UG→GmbH→Holding-Empfehlung mit 5-Fragen-Wizard
- /cockpit/holding-designer – 8 Holding-Konstrukte (2-Stufen, Familien-Pool, Stiftung, Multi-Brand, VC-Doppel, GmbH&Co.KG, IP-Holding, VV-Holding) + Wizard
- /cockpit/entscheidungs-engine – 7-Fragen meta-Wizard quer über alle Strukturen + EU-Alt + US-LLC → Top-4-Empfehlungen
- /cockpit/eu-alternativen – 13 Länder (EE, NL, CH, AT, IE, LU SPF/Soparfi, CY, PL, CZ, LT, MT, BG) + 5 echte Multi-Jurisdiktion-Konstrukte
- /cockpit/auszahlung-optimizer – 7 Auszahlungs-Wege (GF-Gehalt, Standard-Div, TEV, Holding, Mix, Pension, Tantieme) mit Steuer-Berechnung

DE-STEUER
- /cockpit/steuer – Frist-Kalender, IAB-Rechner, Quartals-Schätzung
- /cockpit/amazon-buchungen – 130+ Amazon-Codes Live-Lookup (SKR03/04, USt-Behandlung)
- /cockpit/pre-year-end – 7 Hebel ab Nov mit Live-Steuer-Berechnung (IAB, Vorziehen, Boni, Pension, Verluste, OSS, Spenden)
- /cockpit/kfz-optimizer – 1%-Regel vs. Fahrtenbuch + E/Hybrid-Bonus + Pendlerpauschale
- /cockpit/crypto-steuer – FIFO-Berechnung, 1-Jahres-Frist, 1.000 € Freigrenze §23 EStG, CSV-Export
- /cockpit/pension-optimizer – Rürup vs. bAV vs. Riester vs. ETF, Future-Value, Steuerersparnis
- /cockpit/reisekosten-logger – Verpflegungspauschalen 2026 (DE 28/14 €) + 12 Auslands-Länder + Bewirtungs-70%-Splitting + Kfz 0,30 €/km

INTERNATIONAL
- /cockpit/us-llc-wizard – 6-Step (Bundesstaat, Registered Agent, EIN, BOI, Bank), Wyoming/DE/NM/FL/NV-Vergleich
- /cockpit/hk-limited-wizard – 6-Step (Namens-Check, Comp Sec, NNC1, Two-Tier Profits Tax, Bank, Audit, Offshore-Status)
- /cockpit/intl-banking – 8 Anbieter US (Mercury, Wise, Relay, Brex) + HK (Statrys, Airwallex, Currenxie, HSBC)
- /cockpit/sales-tax-nexus – 46 US-Staaten + DC, Wayfair-Schwellen, Marketplace-Facilitator-Logik
- /cockpit/substance-checker – Mailbox-Risiko-Score 0-100 für ATAD III + §AStG, 12 EU/CH-Länder
- /cockpit/dba-cfc – §AStG Hinzurechnungsbesteuerung + DBA-Quellensteuer + Mutter-Tochter-RL für 14 Länder

BUCHHALTUNG / E-COM
- /cockpit/settlement-parser?mode=amazon – Amazon-Settlement-CSV → Fee-Splitting + SKR03-Mapping
- /cockpit/settlement-parser?mode=stripe – Stripe-Payout-CSV → Verkäufe/Fees/Refunds/Chargebacks/Auszahlungen
- /cockpit/marge-tracker – 7 Channels (Shopify, Amazon FBA/FBM, eBay, Kaufland, Otto, Etsy) mit Provisions/Werbung/Retouren → Marge & ROAS pro SKU
- /cockpit/bwa-generator – 11 Kategorien BWA mit SKR03-Mapping, Live-KPIs (Marge, EBITDA, EBIT), PDF-Export
- /cockpit/datev-mapper – Bank-CSV einfügen, 35+ Auto-Regeln (Amazon, Stripe, PayPal, Klarna, Shopify, AWS, Meta/TikTok/Google Ads, DHL, Steuerberater) → DATEV-Stapel + Lexoffice-CSV
- /cockpit/stb-handoff – StB-Übergabe-Bundle: 30+ Pflicht-Posten + Manifest-PDF + Mailto-Helper
- /cockpit/amazon-ust – Amazon-USt EU vs US Lookup: 6 Konstellationen (DE, IT/FR/ES/NL §13b, EU-FBA + OSS, US Marketplace-Facilitator, UK Brexit) mit Konten + Steuerschlüsseln
- /cockpit/salary-dividende – Salary-vs-Dividende mit echter Steuer-Berechnung 2026 (KSt/GewSt/SolZ vs. Abgeltung/TEV)

LAUNCH / COMPLIANCE
- /cockpit/lucid-wizard – LUCID-Verpackungsregister 5-Step + 6 duale Systeme verglichen
- /cockpit/ce-generator – CE/RoHS-Konformitätserklärung-PDF für 8 Produkt-Kategorien
- /cockpit/foerderung – 20+ Programme (KfW, EXIST, HTGF, INVEST/BAFA, 7 Bundesländer, EIC)
- /cockpit/ecom-roadmap – 8 Kategorien (Beauty, Supplement, Electronics, Toys, Apparel, Food, Pet, Hardware) mit DE/EU/US-Compliance + Standard-Stack + Stolperfallen
- /cockpit/visa-helper – 6 Visa-Pfade (§21 Selbstständig, §21 Abs 5 Frei, §18g Blue-Card, §18a/b Fachkraft 2024, §20a Chancenkarte, §28/30 Familie)
- /cockpit/stb-finder – StB-Auswahl-Wizard: Pflicht-Knowledge + Erst-Termin-Frage-Katalog + Red-Flags pro Spezialisierung

MARKEN / DOMAIN
- /cockpit/check – DPMA + EUIPO + 8 TLDs + 5 Social-Handles + Apple App Store in einem Klick
- /cockpit/marken-wizard – DPMA-Anmeldung mit Branchen-basierter Nizza-Klassen-Empfehlung
- /cockpit/marken-monitor – Watchlist mit Diff-Alert bei neuen Anmeldungen

============================================================
PLAYBOOKS-CATALOG (53 Step-by-Step Guides – verlinke MIT Markdown z.B. [Guide](/playbooks))
============================================================
RECHTSFORM-GRÜNDUNGEN:
- /playbook/gmbh-gruendung · /playbook/ug-gruendung · /playbook/einzelunternehmen-gruendung
- /playbook/holding · /playbook/co-founder-agreement · /playbook/foerderung-stipendium
- /playbook/us-llc · /playbook/hk-limited · /playbook/wegzugsbesteuerung

LAUNCH (D2C / Marketplace / Compliance):
- /playbook/shopify-launch · /playbook/amazon-fba-launch · /playbook/kaufland-launch
- /playbook/tiktok-shop-launch · /playbook/creator-setup
- /playbook/dsgvo-shop · /playbook/gpsr-compliance · /playbook/elster-fse-fillout
- /playbook/marke-anmelden · /playbook/patente-schutzrechte
- /playbook/kleinunternehmer · /playbook/oss-anmeldung · /playbook/pan-eu-fba

ARCHETYPE-SETUPS (Komplett-Bundles pro Geschäftsmodell):
- /playbook/brand-owner-d2c-setup – eigene Brand: Rechtsform→IP→Compliance→Shop→Marketing
- /playbook/reseller-marketplace-setup – Buy&Resell auf Amazon/eBay/Kaufland + Billbee
- /playbook/agency-services-setup – Agentur/Consulting: Verträge+Pricing+CRM+Outbound
- /playbook/creator-influencer-setup – Content/Affiliate mit Werbekennzeichnung + Tax-Trap
- /playbook/coach-experte-setup – Online-Kurse: ⚠ FernUSG-Falle, CRM+Webinar+Community

PERFORMANCE & MARKETING (Setup→Erste Kampagne):
- /playbook/meta-ads-setup – Business Manager+Pixel+CAPI+Audiences→Erste Kampagne
- /playbook/klaviyo-setup – Account+Shop-Sync+DKIM+Welcome-Flow live
- /playbook/google-ads-merchant-console-setup – Ads+Merchant Center+Search Console+PMax
- /playbook/seo-step-by-step – Foundation→Tech→Content→Schema→Backlinks→Monitoring
- /playbook/tiktok-ads-setup – Business Center+Pixel+Spark Ad→Publish
- /playbook/performance-marketing-stack – BM+Pixel+CAPI+sGTM+Attribution+Creative
- /playbook/email-marketing-stack – Klaviyo/Brevo + Cart-Recovery + SMS + List-Building
- /playbook/seo-ecommerce – Tech+Keyword+Content+Schema+Backlinks+AI-SEO/GEO/E-E-A-T

SKALIERUNG / OPERATIONS:
- /playbook/hiring-erste-10 · /playbook/cashflow-forecasting · /playbook/insurance-stack
- /playbook/logistik-3pl · /playbook/buchhaltung-setup · /playbook/mitarbeiter-beteiligung
- /playbook/vc-pitch-deck · /playbook/crowdfunding-token · /playbook/b2b-saas-spezifika
- /playbook/ma-sell-side (Exit-Vorbereitung) · /playbook/ag-gruenden · /playbook/verein-gug
- /playbook/unternehmenskauf (M&A Buy-Side)

PLAYBOOK-USAGE:
- User fragt "Wie starte ich Amazon-FBA?" → empfehle [Amazon FBA Launch](/playbook/amazon-fba-launch)
- User fragt "Welches Setup für meinen Online-Shop?" → frage erst nach Modell (Brand-Owner vs Reseller etc.), dann passenden Archetype-Playbook
- User fragt "Wie setze ich Meta Ads auf?" → [Meta Ads Setup](/playbook/meta-ads-setup) (Click-by-Click bis erste Kampagne)

WIE DU TOOLS NUTZT:
- Bei Frage "Wie hoch ist meine Steuer auf 50k€ Crypto-Gewinn?" → erkläre Grundprinzip (FIFO, 1-Jahres-Frist) + verlinke /cockpit/crypto-steuer für Live-Berechnung mit eigenem CSV
- Bei Frage "Soll ich Holding gründen?" → erkläre Trade-off + verlinke /cockpit/entscheidungs-engine UND /cockpit/holding-designer
- Bei Frage "Welcher US-State?" → erkläre Wyoming vs DE vs NM grob + verlinke /cockpit/us-llc-wizard für vollen Setup-Pfad
- Verlinke IMMER mit Markdown: [Crypto-Steuer-Tool](/cockpit/crypto-steuer) – nicht als Plain-Text.`;

async function callLovable(messages: any[], key: string): Promise<Response> {
  return await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      stream: true,
    }),
  });
}

/**
 * Anthropic-Fallback: direkter Claude-Stream als OpenAI-kompatibles SSE.
 * Wandelt Anthropic's content_block_delta events in OpenAI's chat.completion.chunk-Format um,
 * damit der bestehende Client-Code (FelixChat.tsx) ohne Änderung weiter funktioniert.
 */
async function callAnthropic(messages: any[], key: string): Promise<Response> {
  // Anthropic: system separat, messages ohne system-role
  const userAssistantMessages = messages.filter((m: any) => m.role !== "system");

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM,
      messages: userAssistantMessages,
      stream: true,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Anthropic-Fallback fehlgeschlagen (${resp.status}): ${errText}`);
  }

  // Stream-Transformation: Anthropic-SSE → OpenAI-kompatibles SSE
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload) continue;
            try {
              const evt = JSON.parse(payload);
              if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                const chunk = {
                  choices: [{ delta: { content: evt.delta.text } }],
                };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
              } else if (evt.type === "message_stop") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              }
            } catch {
              // skip malformed events
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const startTime = Date.now();

  try {
    const { messages } = await req.json();
    const lastUser = [...messages].reverse().find((m: any) => m.role === "user")?.content ?? "";

    // === INPUT-GUARD ===
    const guard = inputGuard(lastUser);
    if (!guard.ok) {
      logChat({
        user_message: lastUser.slice(0, 2000),
        provider: "rejected-input",
        input_guard_triggered: guard.trigger,
      });
      return rejectStream(guard.reason ?? "Anfrage konnte nicht verarbeitet werden.");
    }

    const LOVABLE_KEY = Deno.env.get("LOVABLE_API_KEY");
    const ANTHROPIC_KEY = Deno.env.get("ANTHROPIC_API_KEY");

    if (!LOVABLE_KEY && !ANTHROPIC_KEY) {
      throw new Error("Weder LOVABLE_API_KEY noch ANTHROPIC_API_KEY gesetzt");
    }

    // Helper: wraps stream mit Tee → Output-Guard + Log nach Stream-Ende
    const wrapStream = (
      upstream: ReadableStream<Uint8Array>,
      provider: "lovable-gemini" | "anthropic-claude",
      model: string,
    ): Response => {
      const teed = teeForLogging(upstream, (fullText) => {
        const outGuard = outputGuard(fullText);
        logChat({
          user_message: lastUser.slice(0, 2000),
          assistant_message: fullText.slice(0, 4000),
          provider,
          model,
          output_guard_triggered: outGuard.ok ? null : outGuard.trigger,
          latency_ms: Date.now() - startTime,
        });
      });
      return new Response(teed, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    };

    // 1) Lovable AI Gateway versuchen (falls Key vorhanden)
    if (LOVABLE_KEY) {
      const lovableResp = await callLovable(messages, LOVABLE_KEY);

      if (lovableResp.ok && lovableResp.body) {
        return wrapStream(lovableResp.body, "lovable-gemini", "google/gemini-3-flash-preview");
      }

      if (lovableResp.status === 429) {
        logChat({
          user_message: lastUser.slice(0, 2000),
          provider: "lovable-gemini",
          error: "rate-limit-429",
          latency_ms: Date.now() - startTime,
        });
        return new Response(JSON.stringify({ error: "Rate-Limit erreicht. Bitte gleich nochmal versuchen." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 2) Bei Credits-Problem (402) → Anthropic-Fallback wenn verfügbar
      if (lovableResp.status === 402) {
        if (ANTHROPIC_KEY) {
          console.log("Lovable 402 → Fallback auf Anthropic");
          const anthResp = await callAnthropic(messages, ANTHROPIC_KEY);
          return anthResp.body
            ? wrapStream(anthResp.body, "anthropic-claude", "claude-sonnet-4-6")
            : anthResp;
        }
        logChat({
          user_message: lastUser.slice(0, 2000),
          provider: "lovable-gemini",
          error: "credits-402",
        });
        return new Response(
          JSON.stringify({
            error:
              "AI-Kontingent bei Lovable aufgebraucht. Setze ANTHROPIC_API_KEY in Supabase-Secrets für Fallback ODER lade Lovable-Credits auf.",
          }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const t = await lovableResp.text();
      console.error("Lovable-AI error", lovableResp.status, t);
      // Auch bei anderen Fehlern: Anthropic versuchen wenn verfügbar
      if (ANTHROPIC_KEY) {
        console.log(`Lovable ${lovableResp.status} → Fallback auf Anthropic`);
        const anthResp = await callAnthropic(messages, ANTHROPIC_KEY);
        return anthResp.body
          ? wrapStream(anthResp.body, "anthropic-claude", "claude-sonnet-4-6")
          : anthResp;
      }
      logChat({
        user_message: lastUser.slice(0, 2000),
        provider: "lovable-gemini",
        error: `status-${lovableResp.status}`,
      });
      return new Response(JSON.stringify({ error: "AI-Fehler" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Kein Lovable-Key → direkt Anthropic
    const anthResp = await callAnthropic(messages, ANTHROPIC_KEY!);
    return anthResp.body
      ? wrapStream(anthResp.body, "anthropic-claude", "claude-sonnet-4-6")
      : anthResp;
  } catch (e) {
    console.error("chat-felix error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
