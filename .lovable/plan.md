# Felix-Chat aufräumen: Historie in Sidebar, Chat-Fenster ohne Header

## Ziel
- Chat-Übersicht (Liste vergangener Chats + Suche + „+ Neuer Chat") wandert aus dem Chat-Fenster in die linke App-Sidebar als eigene aufklappbare Gruppe.
- Das Chat-Fenster selbst hat keinen „Felix – Dein KI-Co-Founder" Header mehr und nutzt die volle Breite/Höhe wie Claude/ChatGPT. Nur das eigentliche Gespräch + Eingabefeld.

## Änderungen

### 1. AppSidebar (`src/components/AppSidebar.tsx`)
Neue Collapsible-Gruppe „Felix-Chat" direkt unter dem bestehenden Felix-Eintrag:

```text
┌─ Felix-Chat              [+] ▾
│   🔍 Chats durchsuchen...
│   • UG vs GmbH bei 80k    14:22
│   • Amazon FBA Anmeldung  Gestern
│   • US-LLC fürs SaaS      03. Mai
│   ...
```

Inhalt:
- Header der Gruppe: „Felix-Chat" + kleines `+` Icon-Button rechts → startet neuen Chat (navigiert nach `/felix?new=1`).
- Suchfeld (Input mit Lupen-Icon), durchsucht Titel der Conversations und – per Edge-Roundtrip – auch Inhalte alter Nachrichten (debounced, 200 ms).
- Liste aller Conversations des eingeloggten Users, sortiert nach `last_message_at` desc, mit Titel + relativer Zeit.
- Klick auf eine Zeile → `/felix?c=<id>`. Aktive Conversation wird hervorgehoben.
- Pro Eintrag Hover-Menü (3-Punkte) mit „Umbenennen" / „Löschen".
- Im Collapsed-State der gesamten App-Sidebar wird die Liste ausgeblendet (nur Felix-Hauptpunkt mit Icon bleibt).

### 2. Neuer Hook `src/hooks/useFelixConversations.tsx`
- Lädt Conversations des aktuellen Users.
- Stellt `reload()` und einen globalen `notifyConversationsChanged()` Event-Bus bereit, damit das Chat-Fenster nach dem Anlegen/Umbenennen/Löschen die Sidebar-Liste sofort aktualisiert.

### 3. Chat-Fenster (`src/pages/FelixChat.tsx`) komplett refactoren
- `CockpitShell` mit Eyebrow/Title/Subtitle entfernen.
- Eigene interne Sidebar/Conversation-Liste entfernen (lebt jetzt in der App-Sidebar).
- Komponente rendert nur noch ein vollflächiges Chat-Panel:
  - Liest `?c=<id>` und `?new=1` aus der URL via `useSearchParams`.
  - Kein „Felix – Dein KI-Co-Founder" Heading mehr; stattdessen — wie Claude/ChatGPT — direkt der Gesprächs-Stream, zentriert mit `max-w-3xl`.
  - Empty State (wenn neuer/leerer Chat): zentriertes „Hi, ich bin Felix." + Suggestion-Chips, sonst nichts darüber.
  - Input fest unten, sticky, breite zentriert.
  - Höhe: `h-[calc(100vh-3rem)]` (Header der App), keine inneren Borders/Rahmen, fühlt sich wie ein eigenständiges Tool an.
- Beim Senden ohne `c` wird eine neue Conversation angelegt, Titel = erste 60 Zeichen der Nachricht, danach `setSearchParams({ c: id })` und `notifyConversationsChanged()`.

### 4. Suche
Die Suche in der App-Sidebar:
- Volltext: filtert lokal nach Titel; zusätzlich Query auf `chat_messages.content ilike %q%` (eingeschränkt auf eigenen User_id durch RLS) → liefert `conversation_id`s, die in die Filtermenge mit aufgenommen werden.

## Technische Details

- Routing-Param: `c` (conversation id), `new=1` (force-new).
- Active-Highlight in Sidebar via `searchParams.get("c") === conv.id && pathname === "/felix"`.
- Neuer Chat-Button (`+`) navigiert zu `/felix?new=1`, der FelixChat-Page leert daraufhin Messages und entfernt `c` aus der URL.
- Löschen: `chat_messages` (per `conversation_id`) → `chat_conversations`. Bei aktivem Chat: navigiere zu `/felix?new=1`.
- Mobile: Die App-Sidebar ist bereits `collapsible="icon"`/Sheet auf Mobile – keine Extra-Bar im Chat-Fenster nötig.

## Dateien
- ✏️ `src/components/AppSidebar.tsx` – Felix-Chat-Gruppe mit Suche/Liste/+
- ➕ `src/hooks/useFelixConversations.tsx` – geteilter State + Event-Bus
- ✏️ `src/pages/FelixChat.tsx` – Header & interne Liste raus, Claude-Style Layout, URL-driven Conversation-Auswahl

## Außerhalb des Scopes
- Keine DB-Migration (Tabellen `chat_conversations` / `chat_messages.conversation_id` bestehen schon).
- Keine Änderung am `chat-felix` Edge-Function-Verhalten.
