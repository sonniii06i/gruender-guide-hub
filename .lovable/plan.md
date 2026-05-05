Ich stelle den Flow konsequent auf diese Reihenfolge um:

```text
Registrieren / Anmelden
        ↓
Onboarding vollständig ausfüllen
        ↓
Stripe Checkout mit Rechnungsdetails aus dem Onboarding
        ↓
Aktives Abo erkannt
        ↓
Dashboard / App-Zugriff
```

## Geplante Änderungen

1. **Onboarding vor Checkout erlauben**
   - Die aktuelle Sperre in `Onboarding`, die Nutzer ohne aktives Abo direkt nach `/checkout` schickt, wird entfernt.
   - Onboarding bleibt aber weiterhin nur für eingeloggte Nutzer erreichbar.
   - Wenn Onboarding noch nicht abgeschlossen ist, wird der Nutzer nach Login/Signup dorthin geleitet.
   - Nach Abschluss des Onboardings wird nicht mehr ins Dashboard navigiert, sondern direkt zur Plan-/Checkout-Seite.

2. **Hardcore Paywall für Dashboard und App-Bereich**
   - `AppLayout` wird so angepasst, dass geschützte App-Routen niemals ohne aktives Abo oder Admin-Rolle erreichbar sind.
   - Reihenfolge der Prüfung:
     - nicht eingeloggt → `/auth`
     - Onboarding nicht abgeschlossen → `/onboarding`
     - kein aktives Abo und kein Admin → `/checkout`
     - alles erfüllt → Zugriff auf Dashboard/Tools
   - Dadurch landet niemand ohne Abo im Dashboard, auch nicht über direkte URL wie `/dashboard`, `/felix`, `/profile` usw.

3. **Auth-Redirects korrigieren**
   - Nach Registrierung: direkt zu `/onboarding`, nicht zu `/checkout`.
   - E-Mail-Redirect nach Signup ebenfalls auf `/onboarding` setzen.
   - Nach Login: nicht blind ins Dashboard, sondern anhand Profil/Abo-Status sauber weiterleiten lassen. Praktisch wird Login erst in den geschützten Flow gehen, der dann Onboarding/Checkout/Dashboard korrekt entscheidet.

4. **Checkout nur nach Onboarding**
   - `/checkout` wird für eingeloggte Nutzer ohne abgeschlossenes Onboarding auf `/onboarding` zurückleiten.
   - Damit können Rechnungsdaten aus dem Onboarding sicher vor Stripe vorhanden sein.
   - Nutzer mit aktivem Abo/Admin werden weiterhin vom Checkout weggeleitet: nach Dashboard, falls Onboarding fertig, sonst Onboarding.

5. **Stripe Checkout mit Onboarding-Rechnungsdaten**
   - `create-checkout` liest wie aktuell Name, Firma, Adresse, Telefonnummer und USt-ID aus `profiles`.
   - Zusätzlich wird die Edge Function abgesichert: Checkout wird nur erstellt, wenn das Profil/Onboarding abgeschlossen ist. Falls nicht, gibt sie eine klare Fehlermeldung zurück.
   - Stripe `success_url` wird auf `/dashboard?checkout=success` gesetzt, damit nach erfolgreicher Zahlung direkt in den App-Bereich navigiert wird. Dort greift zusätzlich die Paywall und prüft den aktiven Status.

6. **Dashboard-Button-Logik entfernen/vereinfachen**
   - Da Nutzer ohne Abo nicht mehr ins Dashboard kommen, braucht der Dashboard-Banner keine „Plan wählen“-Variante mehr.
   - Im Dashboard steht konsequent „Abo verwalten“ und der Button führt zur Abrechnung/Profilverwaltung.
   - Die alte Logik „wenn kein Abo Plan wählen“ wird aus dem Dashboard entfernt, weil sie im neuen Flow tatsächlich nicht mehr vorkommen darf.

7. **Texte in Checkout/Onboarding an neuen Ablauf anpassen**
   - Checkout-Text wird geändert von „danach richten wir dein Profil ein“ zu „deine Rechnungsdaten sind eingerichtet, jetzt Abo abschließen“.
   - Onboarding-Abschluss-CTA wird sinngemäß „Weiter zum Abo“ statt „Dashboard öffnen“.

## Technische Details

Betroffene Dateien voraussichtlich:
- `src/layouts/AppLayout.tsx`
- `src/pages/Onboarding.tsx`
- `src/pages/Checkout.tsx`
- `src/pages/Auth.tsx`
- `src/pages/Dashboard.tsx`
- `supabase/functions/create-checkout/index.ts`

Keine neue Datenbanktabelle ist nötig. Die vorhandenen Felder `profiles.onboarding_completed`, `profiles.first_name`, `profiles.last_name`, `profiles.company_name`, `profiles.street`, `profiles.postal_code`, `profiles.city`, `profiles.country`, `profiles.phone`, `profiles.vat_id` reichen für die Rechnungsdetails aus.

Wichtig: Admins bleiben vom Abo-Zwang ausgenommen, müssen aber je nach bestehendem Profilstatus trotzdem sinnvoll durch/um Onboarding geführt werden, damit die App nicht mit leeren Stammdaten arbeitet.