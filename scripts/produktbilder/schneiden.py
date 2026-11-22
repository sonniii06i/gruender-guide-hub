# Zuschnitt der Produkt-Bilder: css-Pixel-Boxen auf die 2x-Aufnahmen aus screens.mjs, Ausgabe webp.
#   python3 schneiden.py <zielordner>     (z. B. public/screens/2026-11)
import sys, os
from PIL import Image
Q = 'screens'
ZIEL = sys.argv[1]
os.makedirs(ZIEL, exist_ok=True)
RAHMEN = ['dashboard','fse-wizard','steuerkalender','guide-tiktok','gewerbeanmeldung','felix','lucid','schwellen','shop-profit','rechnung']
MOBIL = {  # name: (y, hoehe) in css-px der 390er-Aufnahme, Schnitt jeweils an einer Karten- oder Zeilengrenze
  'dashboard': (419, 455), 'felix': (85, 477), 'fse-wizard': (394, 523), 'guide-tiktok': (630, 555),
  'lucid': (432, 514), 'steuerkalender': (1201, 465), 'rechnung': (4583, 452),
}
AUS = {  # name: (x, y, breite, hoehe) in css-px der 1425er-Aufnahme; die Karten zeigen nur den oberen Teil
  'steuerkalender': (651, 291, 752, 600), 'rechnung': (279, 531, 1124, 520),
  'tiktok-check': (319, 680, 788, 600), 'pr-rechner': (319, 652, 788, 600), 'influencer-check': (319, 680, 788, 600),
  'lucid': (383, 340, 916, 492), 'fse-wizard': (279, 326, 1124, 630), 'gewerbeanmeldung': (279, 458, 1124, 700),
}
GALERIE = ['uebersicht', 'rechtsform', 'steuerkalender', 'anbieter', 'runway']
import json
def sp(im, pfad, breite):
    h = round(im.height * breite / im.width)
    im.resize((breite, h), Image.LANCZOS).save(pfad, 'WEBP', quality=84, method=6)
    return breite, h
masse = {'mobil': {}, 'aus': {}}
for n in RAHMEN:
    im = Image.open(f'{Q}/rahmen/{n}.png').convert('RGB')
    assert im.size == (2850, 1550), (n, im.size)
    im.resize((1600, 870), Image.LANCZOS).save(f'{ZIEL}/{n}.webp', 'WEBP', quality=84, method=6)
    im.resize((720, 392), Image.LANCZOS).save(f'{ZIEL}/{n}-720.webp', 'WEBP', quality=84, method=6)
for n, (y, h) in MOBIL.items():
    im = Image.open(f'{Q}/mobil/{n}.png').convert('RGB')
    assert im.width == 780 and (y + h) * 2 <= im.height, (n, im.size, y, h)
    masse['mobil'][n] = sp(im.crop((0, y * 2, 780, (y + h) * 2)), f'{ZIEL}/{n}-mobil.webp', 780)
for n, (x, y, w, h) in AUS.items():
    im = Image.open(f'{Q}/voll/{n}.png').convert('RGB')
    assert (y + h) * 2 <= im.height and (x + w) * 2 <= im.width, (n, im.size)
    c = im.crop((x * 2, y * 2, (x + w) * 2, (y + h) * 2))
    masse['aus'][n] = sp(c, f'{ZIEL}/{n}-ausschnitt.webp', 1000); sp(c, f'{ZIEL}/{n}-ausschnitt-520.webp', 520)
for n in GALERIE:
    im = Image.open(f'{Q}/galerie/{n}.png').convert('RGB')
    assert im.size == (2880, 1800), (n, im.size)
    im.resize((1440, 900), Image.LANCZOS).save(f'{ZIEL}/galerie-{n}.webp', 'WEBP', quality=84, method=6)
    im.resize((720, 450), Image.LANCZOS).save(f'{ZIEL}/galerie-{n}-720.webp', 'WEBP', quality=84, method=6)
print(json.dumps(masse))
