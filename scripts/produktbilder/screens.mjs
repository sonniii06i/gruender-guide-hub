// Produkt-Bilder für die Website: lokale Aufnahmen mit gestellter Sitzung und
// Beispieldaten. Supabase wird im Browser abgefangen, es geht nichts an den Server.
//   node screens.mjs [name …]      → screens/voll, screens/rahmen, screens/mobil (PNG, 2x)
import { chromium } from '/Users/sonniib/video-produktion/remotion/node_modules/playwright/index.mjs';
import fs from 'fs';

const nur = process.argv.slice(2);
const BASIS = 'http://localhost:8097';
const REF = 'rwrjuzemkfghlziretdj';
const UID = '00000000-0000-4000-8000-000000000001';
const user = {
  id: UID, aud: 'authenticated', role: 'authenticated',
  email: 'beispiel@example.com', email_confirmed_at: '2026-10-01T08:00:00Z', confirmation_sent_at: '2026-10-01T07:59:00Z',
  app_metadata: { provider: 'email' }, user_metadata: { first_name: 'Mara' }, created_at: '2026-10-01T08:00:00Z',
};
const session = {
  access_token: 'lokal.' + Buffer.from(JSON.stringify({ sub: UID, exp: 4102444800, role: 'authenticated' })).toString('base64url') + '.x',
  token_type: 'bearer', expires_in: 3600, expires_at: 4102444800, refresh_token: 'lokal', user,
};
const zeile = {
  profiles: { id: UID, first_name: 'Mara', last_name: 'Beispiel', onboarding_completed: true, onboarding_step: 6, business_model: 'amazon_fba,shopify', founder_stage: 'ready', legal_form: 'ug', email: user.email, postal_code: '10115', city: 'Berlin' },
  subscriptions: { status: 'active', comp_access: false, plan: 'pro' },
  user_roles: null,
};
const LS = {
  [`sb-${REF}-auth-token`]: JSON.stringify(session),
  'ggh-tour-done-v1': '1',
  'marketing_consent': 'false', 'marketing_consent_decided': 'true',
  'ggh_consent': 'necessary',
  'gx_cookie_consent_v1': JSON.stringify({ necessary: true, analytics: false, marketing: false, decidedAt: '2026-11-25T00:00:00Z' }),
  [`gx-zuletzt-v1-${UID}`]: JSON.stringify(['/cockpit/steuerkalender', '/cockpit/rechnungs-generator', '/cockpit/shop-profit-rechner']),
  'ggh-rechnung-company-v2': JSON.stringify({
    name: 'Muster Handels UG (haftungsbeschränkt)', strasse: 'Musterstraße 1', plzOrt: '10115 Berlin', land: 'Deutschland',
    steuernummer: '12/345/67890', ustId: 'DE123456789', iban: 'DE89 3704 0044 0532 0130 00', bic: 'COBADEFFXXX', bank: 'Musterbank',
    email: 'rechnung@muster-handel.example', telefon: '+49 30 1234567', kontaktName: 'Mara Beispiel', logoDataUrl: null,
  }),
};

const weiter = (s) => s.getByRole('button', { name: /^Weiter|erstellen/ }).click();
const feld = (s) => s.locator('input:not([type=radio]):not([type=checkbox]):not([type=email]):not([type=hidden])');
const wahl = (s, text) => s.getByText(text, { exact: true }).first().click();

const SEITEN = [
  { name: 'dashboard', route: '/dashboard', vor: async (s) => { const cb = s.getByRole('checkbox').first(); if (await cb.isVisible().catch(() => false)) await cb.click(); } },
  { name: 'fse-wizard', route: '/cockpit/fse-wizard' },
  { name: 'steuerkalender', route: '/cockpit/steuerkalender' },
  { name: 'guide-tiktok', route: '/playbook/preview/tiktok-shop-starten', rollen: 'Dein fertiges Ergebnis' },
  { name: 'gewerbeanmeldung', route: '/cockpit/gewerbeanmeldung-wizard' },
  { name: 'felix', route: '/felix' },
  { name: 'lucid', route: '/cockpit/lucid-wizard' },
  { name: 'schwellen', route: '/cockpit/schwellen-check' },
  { name: 'shop-profit', route: '/cockpit/shop-profit-rechner' },
  { name: 'rechnung', route: '/cockpit/rechnungs-generator', vor: async (s) => {
    await s.fill('#k-name', 'Beispiel GmbH'); await s.fill('#k-strasse', 'Beispielweg 12'); await s.fill('#k-plz', '20095 Hamburg');
    await s.fill('#k-email', 'buchhaltung@beispiel-gmbh.example');
    await s.fill('#p1-beschr', 'Beratung Marketing-Strategie'); await s.fill('#p1-menge', '7'); await s.fill('#p1-preis', '100');
    await s.locator('#p1-preis').blur();
  } },
  { name: 'tiktok-check', route: '/tiktok-shop-checkliste', oeffentlich: true, vor: async (s) => {
    await wahl(s, 'Beides'); await wahl(s, '18 oder älter'); await weiter(s);
    await wahl(s, 'Nein / noch nicht'); await wahl(s, 'Gewerbe ohne Handelsregister (normales Kleingewerbe)'); await weiter(s);
    await wahl(s, 'Batterien oder Akkus (auch eingebaut)'); await wahl(s, 'Kosmetik / Pflegeprodukte'); await wahl(s, 'Nein, nur Deutschland'); await weiter(s);
  } },
  { name: 'pr-rechner', route: '/pr-paket-rechner', oeffentlich: true, vor: async (s) => {
    const posten = [['Over-Ear-Kopfhörer (Marke A)', '249', '10', 'Behalten, betrieblich genutzt'], ['Hautpflege-Set (Marke B)', '89', '0', 'Behalten, danach privat genutzt'], ['Hotelnacht Hamburg gegen Story', '160', '0', 'Dienstleistung (Hotel, Event, Reise)']];
    for (let i = 0; i < posten.length; i++) {
      const [n, p, r, v] = posten[i];
      await feld(s).nth(i * 3).fill(n);
      await feld(s).nth(i * 3 + 1).fill(p);
      await feld(s).nth(i * 3 + 2).fill(r);
      await s.getByRole('combobox').nth(i).click();
      await s.getByRole('option', { name: v }).click();
    }
    await weiter(s);
    await wahl(s, 'Kleinunternehmer (§ 19 UStG)'); await weiter(s);
  } },
  { name: 'influencer-check', route: '/influencer-steuer-check', oeffentlich: true, vor: async (s) => {
    await wahl(s, 'Affiliate-Provisionen (auch TikTok-Shop-Showcase und LIVE)'); await wahl(s, 'Gratis-Produkte, die du nach der Werbung behalten darfst'); await wahl(s, 'UGC-Videos für Marken'); await weiter(s);
    await s.getByText('Nein', { exact: true }).first().click(); await wahl(s, '18 oder älter'); await weiter(s);
    await feld(s).nth(0).fill('6000'); await feld(s).nth(1).fill('4000'); await weiter(s);
  } },
];

const ANKER = {
  steuerkalender: ['Deine nächsten 12 Monate', 'Hinweise zu deiner Situation', 'Deine Situation'],
  rechnung: ['Welcher USt-Modus passt?', 'Rechnungssumme', '§14 UStG-Pflichtangaben'],
  'tiktok-check': ['Fertig: TikTok-Shop-Checkliste', 'Angaben ändern'],
  'pr-rechner': ['Fertig: PR-Paket-Übersicht', 'Angaben ändern'],
  'influencer-check': ['Fertig: Influencer-Steuer-Fahrplan', 'Angaben ändern'],
  lucid: ['Schritt 1 von 5', '1. Bist du LUCID-pflichtig?', 'Zurück'],
  'fse-wizard': ['So nutzt du den Begleiter', '5 Jahre Bindung'],
  gewerbeanmeldung: ['Person', 'Dein Stand', 'Zwischenspeichern'],
  'guide-tiktok': ['Dein fertiges Ergebnis', 'Dein Lehrplan', 'Gewerbe anmelden'],
  dashboard: ['Dein nächster Schritt', 'Die nächsten 14 Tage', 'Zuletzt geöffnet'],
};
for (const o of ['voll', 'rahmen', 'mobil']) fs.mkdirSync(`screens/${o}`, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function kontext(breite, hoehe) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: hoehe }, deviceScaleFactor: 2, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'reduce' });
  await ctx.addInitScript((ls) => {
    try { for (const [a, b] of Object.entries(ls)) if (localStorage.getItem(a) === null) localStorage.setItem(a, b); sessionStorage.setItem('mailHinweisZu', '1'); } catch (e) { /* ohne Speicher */ }
  }, LS);
  await ctx.route(/supabase\.co\//, async (r) => {
    const u = new URL(r.request().url());
    const einzeln = (r.request().headers()['accept'] || '').includes('vnd.pgrst.object');
    const kopf = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' };
    if (r.request().method() === 'OPTIONS') return r.fulfill({ status: 204, headers: kopf });
    if (u.pathname.startsWith('/auth/v1/user')) return r.fulfill({ json: user, headers: kopf });
    if (u.pathname.startsWith('/auth/v1/token')) return r.fulfill({ json: session, headers: kopf });
    if (u.pathname.startsWith('/rest/v1/')) {
      const t = u.pathname.split('/')[3];
      if (t in zeile) return r.fulfill({ json: einzeln ? zeile[t] : (zeile[t] ? [zeile[t]] : []), headers: kopf });
      return r.fulfill({ json: einzeln ? null : [], headers: kopf });
    }
    return r.fulfill({ json: {}, headers: kopf });
  });
  return ctx;
}

// Galerie der Startseite (Bundles): fünf Ansichten im Format 16:10.
if (process.env.GALERIE) {
  fs.mkdirSync('screens/galerie', { recursive: true });
  const ctx = await kontext(1440, 900);
  const G = [['uebersicht', '/dashboard', SEITEN[0].vor], ['rechtsform', '/wizard/rechtsform'], ['steuerkalender', '/cockpit/steuerkalender'], ['anbieter', '/anbieter'], ['runway', '/cockpit/runway-rechner']];
  for (const [name, route, vor] of G) {
    const s = await ctx.newPage();
    await s.goto(BASIS + route, { waitUntil: 'networkidle', timeout: 45000 });
    await s.waitForTimeout(900);
    if (vor) await vor(s);
    await s.waitForTimeout(500);
    await s.evaluate(() => { window.scrollTo(0, 0); document.querySelectorAll('[data-sonner-toaster]').forEach((x) => x.remove()); });
    await s.screenshot({ path: `screens/galerie/${name}.png` });
    console.log('galerie', name, new URL(s.url()).pathname);
    await s.close();
  }
  await ctx.close(); await browser.close(); process.exit(0);
}
for (const [art, breite, hoehe] of [['desktop', 1425, 775], ['mobil', 390, 844]].filter((x) => !process.env.NUR || process.env.NUR === x[0])) {
  const ctx = await kontext(breite, hoehe);
  for (const e of SEITEN) {
    if (nur.length && !nur.includes(e.name)) continue;
    const s = await ctx.newPage();
    const fehler = [];
    s.on('pageerror', (x) => fehler.push(String(x).slice(0, 160)));
    try {
      await s.goto(BASIS + e.route, { waitUntil: 'networkidle', timeout: 45000 });
      await s.waitForTimeout(700);
      if (e.vor) await e.vor(s);
      await s.waitForTimeout(700);
      await s.evaluate((isMobil) => {
        window.scrollTo(0, 0);
        document.querySelectorAll('[data-sonner-toaster]').forEach((x) => x.remove());
        if (isMobil) document.querySelectorAll('nav[aria-label="App-Navigation"]').forEach((x) => x.remove());
      }, art === 'mobil');
      await s.waitForTimeout(200);
      const h = await s.evaluate(() => document.documentElement.scrollHeight);
      const max = art === 'desktop' ? 3200 : (e.name === 'rechnung' ? 5400 : 2600);
      await s.screenshot({ path: `screens/${art === 'desktop' ? 'voll' : 'mobil'}/${e.name}.png`, fullPage: true, clip: { x: 0, y: 0, width: breite, height: Math.min(h, max) } });
      if (art === 'desktop') {
        if (e.rollen) {
          await s.getByText(e.rollen, { exact: true }).first().evaluate((el) => { const r = el.getBoundingClientRect(); window.scrollTo(0, window.scrollY + r.top - 110); });
          await s.waitForTimeout(300);
        }
        await s.screenshot({ path: `screens/rahmen/${e.name}.png` });
      }
      for (const t of (ANKER[e.name] || [])) {
        const k = await s.getByText(t, { exact: true }).first().evaluate((el, tief) => { const o = []; let x = el; for (let i = 0; i < tief && x && x !== document.body; i++) { const r = x.getBoundingClientRect(); o.push(`${x.tagName.toLowerCase()} x${Math.round(r.left + scrollX)} y${Math.round(r.top + scrollY)} w${Math.round(r.width)} h${Math.round(r.height)}`); x = x.parentElement; } return o; }, art === 'desktop' ? 8 : 5).catch(() => ['nicht gefunden']);
        console.log('  ANKER', art, e.name, JSON.stringify(t), k.join(' | '));
      }
      console.log(art, e.name, 'h=' + h, fehler.length ? 'FEHLER ' + fehler.join(' | ') : '');
    } catch (x) {
      await s.screenshot({ path: `screens/${art}-${e.name}-abbruch.png`, fullPage: true }).catch(() => {});
      console.log(art, e.name, 'ABBRUCH', String(x).split('\n')[0].slice(0, 200));
    }
    await s.close();
  }
  await ctx.close();
}
await browser.close();
