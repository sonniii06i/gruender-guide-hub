## Felix-Chat: Logo statt Sparkles + Chat-Verhalten verifizieren

### 1. Logo im leeren Chat-Zustand
In `src/pages/FelixChat.tsx` die `Sparkles`-Icon-Box im Empty-State durch unser GründerX-Logo (`@/components/Logo`) ersetzen:
- Import `Sparkles` entfernen, stattdessen `import Logo from "@/components/Logo"`.
- Die runde Gradient-Box (`h-16 w-16 rounded-2xl bg-gradient-primary ... shadow-glow`) bleibt – nur der Inhalt wird `<Logo asImage invert className="h-full w-full" />` mit etwas Padding (`p-3`).

Ergebnis: gleiche Optik wie der hochgeladene Screenshot (gradient-blaue Kachel), aber mit unserem Logo statt dem generischen Sparkles-Stern.

### 2. Chat-Logik wie Claude (Verifikation, kein Code-Change nötig)
Die aktuelle `FelixChat.tsx` macht bereits genau das Claude-Verhalten:
- Nachricht senden → wird sofort rechts angezeigt (`setMessages([...prev, userMsg])`).
- "Felix denkt nach..." Loader während Streaming.
- Antwort kommt per Server-Sent-Events (`data: ...` Chunks) und wird Token für Token in die letzte Assistant-Bubble gestreamt (`upsert(content)`).
- Auto-Scroll nach unten bei jedem neuen Chunk (`scrollRef.current?.scrollTo(...)`).
- Nach Fertigstellung wird Assistant-Message in DB persistiert und `last_message_at` aktualisiert → Sidebar/Übersicht refreshen via `notifyConversationsChanged()`.
- Folgenachrichten in derselben Conversation hängen sauber an (volle History wird an `chat-felix` Edge Function geschickt).
- Enter sendet, Shift+Enter = neue Zeile.

Das ist das Claude/ChatGPT-Pattern. Falls du beim Testen ein konkretes Verhalten siehst, das nicht passt (z.B. Scroll springt nicht, Antwort kommt nicht stream-weise, History geht verloren), nenn mir bitte das Symptom – dann fixe ich gezielt.

### Geänderte Dateien
- `src/pages/FelixChat.tsx` (nur Empty-State-Icon)
