// Felix-Chat Guardrails — Pattern-Detection-basierte Input/Output-Schutzschicht.
// Inspiration: NirDiamant/agents-towards-production · agent-security-with-llamafirewall
//
// Light-Version ohne ML — basiert auf bekannten Prompt-Injection-/Jailbreak-Patterns aus
// der Llamafirewall + OWASP-LLM-Top-10 Forschung. Schutz ist nicht perfekt aber filtert
// Standard-Angriffsvektoren ab. Bei Verdacht: ablehnen und loggen.

export type GuardResult = {
  ok: boolean;
  /** Pattern-Name der getriggert hat (für Logging). */
  trigger?: string;
  /** Optional Nutzer-freundliche Begründung. */
  reason?: string;
};

// ===== INPUT-GUARD =====
// Bekannte Prompt-Injection-/Jailbreak-Patterns. Word-Boundaries wo möglich.
const INPUT_PATTERNS: { name: string; re: RegExp; reason: string }[] = [
  // Direct instruction override
  {
    name: "instruction-override",
    re: /\b(ignore|disregard|forget|vergiss|ignoriere)\s+(all\s+)?(previous|prior|above|alle?n?|bisherige|vorherige|vorigen|obige)\s+(instructions?|prompts?|anweisungen?|regeln?|rules?|system)/i,
    reason: "Anweisung erkannt, die vorherige Systemregeln überschreiben will.",
  },
  // Role hijacking
  {
    name: "role-hijack",
    re: /\b(you are now|du bist (jetzt|nun)|act as|spiele die rolle|pretend (to be|you are)|tu so als)\s+(a |an |eine?|ein |the |der |die |das )?(different|new|anderer|neuer|jailbroken|uncensored|unrestricted|DAN|developer mode|admin)/i,
    reason: "Versuch erkannt, Felix in eine andere Rolle zu zwingen.",
  },
  // System-prompt-leak attempts
  {
    name: "system-prompt-leak",
    re: /\b(repeat|reveal|show|print|output|wiederhole|zeige|gib aus|verrate|nenne)\s+(me\s+)?(your |the |dein(en|e|er)?|the system|alle?n?|complete)?\s*(system\s*prompt|systemprompt|instructions?|anweisungen?|guidelines|initial prompt|original prompt|first message|deine? anweisungen)/i,
    reason: "Versuch erkannt, den System-Prompt auszulesen.",
  },
  // DAN-style jailbreaks
  {
    name: "jailbreak-dan",
    re: /\b(DAN|developer mode|jailbroken|unfiltered|no restrictions|ohne (einschränkungen|filter|grenzen)|do anything now)\b/i,
    reason: "Bekanntes Jailbreak-Pattern erkannt.",
  },
  // Encoded/obfuscated injection
  {
    name: "encoded-injection",
    re: /(\\u[0-9a-f]{4}\s*){3,}|base64:?\s*[A-Za-z0-9+/=]{40,}/i,
    reason: "Verdächtig kodierte Eingabe (Base64 / Unicode-Escape).",
  },
  // Token-budget bait
  {
    name: "token-bait",
    re: /(.)\1{100,}/,
    reason: "Eingabe enthält ungewöhnliche Zeichenwiederholung (möglicher Token-Bait).",
  },
];

export const inputGuard = (text: string): GuardResult => {
  if (!text || text.trim().length === 0) {
    return { ok: false, trigger: "empty-input", reason: "Leere Anfrage." };
  }
  if (text.length > 8000) {
    return { ok: false, trigger: "oversized-input", reason: "Anfrage zu lang (max 8000 Zeichen)." };
  }
  for (const p of INPUT_PATTERNS) {
    if (p.re.test(text)) {
      return { ok: false, trigger: p.name, reason: p.reason };
    }
  }
  return { ok: true };
};

// ===== OUTPUT-GUARD =====
// Checkt LLM-Output auf PII-Leaks + system-prompt-Echos.
// Bei Detection wird der Output NICHT blockiert, sondern markiert + geloggt.
// (Output-Block würde Streaming-UX kaputt machen.)

const OUTPUT_PATTERNS: { name: string; re: RegExp }[] = [
  // System-Prompt-Echo (wenn Modell System-Marker leaked)
  {
    name: "system-prompt-echo",
    re: /(?:System-Prompt|Du bist Felix.*KI-Co-Founder|=+\s*AMAZON-BUCHUNGSTEXTE|TOOLS-CATALOG|============)/i,
  },
  // Credit-Card-Pattern (16 zusammenhängende Ziffern, plausibel)
  {
    name: "pii-creditcard",
    re: /\b(?:\d[ -]*?){13,16}\b/,
  },
  // IBAN-Pattern (DE-IBAN-Format)
  {
    name: "pii-iban",
    re: /\bDE\d{2}\s?(\d{4}\s?){4}\d{2}\b/,
  },
];

export const outputGuard = (text: string): GuardResult => {
  for (const p of OUTPUT_PATTERNS) {
    if (p.re.test(text)) {
      return { ok: false, trigger: p.name, reason: "Output-Pattern getriggert (Markierung, nicht blockiert)." };
    }
  }
  return { ok: true };
};

// ===== REJECT-RESPONSE =====
// Streamt eine OpenAI-kompatible SSE-Antwort, die den User höflich abweist.
// Format gleich wie chat-felix-Stream, damit Client unverändert weiter funktioniert.

export const rejectStream = (reason: string): Response => {
  const message = `🛑 Ich kann diese Anfrage nicht bearbeiten.

**Grund:** ${reason}

Falls du eine echte Gründer-/Steuer-/Compliance-Frage hast, formuliere sie bitte direkt — Felix antwortet gerne auf alles im GründerX-Themenbereich.`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Chunk-weise streamen damit Client typewriter-Effekt zeigt
      const words = message.split(/(\s+)/);
      let i = 0;
      const interval = setInterval(() => {
        if (i >= words.length) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          clearInterval(interval);
          return;
        }
        const chunk = { choices: [{ delta: { content: words[i] } }] };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        i++;
      }, 15);
    },
  });

  return new Response(stream, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream",
    },
  });
};
