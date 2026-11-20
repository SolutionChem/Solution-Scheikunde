# CLAUDE.md – Solution Scheikunde

Website met digitale materialen (animaties, simulaties, video's, oefeningen) bij de scheikundemethode **Solution**. Doelgroep: leerlingen, beginnend met 3 havo-vwo; later volgen andere leerjaren.

## Taal
- Alle tekst op de site, in code-commentaar en in commitberichten is **Nederlands**.
- Schrijf voor leerlingen van 3 havo-vwo: kort, helder, geen onnodig vakjargon. Gebruik de begrippen van de methode (atoomnummer, massagetal, schil, verhoudingsformule, enz.).
- Notatie zoals in het boek: decimale komma (`16,00`), paragrafen als `§1.2`.

## Techniek
- Statische site voor **GitHub Pages** (deploy vanaf `main`, map `/`). Geen build-stap, geen frameworks, geen npm. Gewone HTML, CSS en JavaScript.
- `.nojekyll` staat in de root; niet verwijderen.
- Alleen relatieve paden gebruiken (de site draait onder `/Solution-Scheikunde/`). Nooit paden die met `/` beginnen.
- De site moet ook werken door `index.html` direct te openen (file://). Daarom staat de data in een JS-bestand en niet in JSON dat met `fetch` wordt geladen.

## Structuur
```
index.html, leerjaar.html, hoofdstuk.html, materiaal.html   pagina's (lege schil, gevuld door app.js)
assets/js/data.js     ALLE inhoud: typen, leerjaren, hoofdstukken, paragrafen, materialen
assets/js/app.js      weergave per pagina (body[data-page]); URL-parameters ?jaar=&h=&m=
assets/css/style.css  huisstijl
materialen/<jaar>/h<nr>/<naam>/index.html   eigen animaties en bestanden
```
- Inhoud toevoegen of wijzigen gebeurt **alleen in `data.js`**; `app.js` hoeft daarvoor niet aangepast te worden.
- **Na elke aanpassing in `materialen/`: verhoog `versie` bovenaan `data.js`** (bijv. `"2026-11-20c"` → `"2026-11-20d"`). `app.js` zet `?v=<versie>` achter het adres van eigen materialen; zonder nieuwe versie zien docenten en leerlingen een oude versie uit de browsercache.
- Eén bestand kan bij meer paragrafen staan via URL-parameters, in plaats van het te kopiëren. Bestaande parameters: `?ionen=1` en `?spel=1` (Bouw een atoom), `?tab=metaal|covalent|spel` (bindingen). Leg een nieuwe parameter vast in `README.md`.
- Een materiaal heeft: `id` (uniek binnen het hoofdstuk, kebab-case), `type` (een sleutel uit `typen`), `titel`, `beschrijving`, en `url` of `youtube`. Optioneel: `bron`, `embed: false` (voor sites die niet in een iframe mogen).
- Nieuw leerjaar: object in `leerjaren` met eigen `id` (bijv. `4h`), `actief: true` zodra er hoofdstukken zijn. Bestanden in `materialen/<id>/`.
- `README.md` is de handleiding voor de docent. Houd die bij als de werkwijze verandert.

## Huisstijl
- Gebaseerd op het logo: zes elementtegels **S O Lu Ti O N** (donkerblauw, gevlekte textuur, dunne witte binnenrand) en de tagline in spatiërende hoofdletters.
- Kleuren (CSS-variabelen in `style.css`): navy `#11264a` / `#163a63`, lichtblauw `#dbe8f5` / `#eef4fb`. Hergebruik de variabelen en de klasse `.tegel`; voer geen nieuwe hoofdkleuren in.
- Lettertypen: Inter (tekst), Oswald (koppen en labels in hoofdletters).
- Paragraafkoppen gebruiken de navy `.balk`, zoals in de inhoudsopgave van het boek.

## Eigen animaties (materialen/…/index.html)
- Eén zelfstandig HTML-bestand per animatie (CSS/JS inline), zonder externe afhankelijkheden waar mogelijk. Voorbeeld en referentie: `materialen/3hv/h1/atoommodel/index.html`.
- Sluit aan bij de huisstijl (zelfde kleuren, elementtegel-stijl, Inter).
- Moet werken in een iframe, op mobiel (touch, smal scherm) en in volledig scherm.
- Respecteer `prefers-reduced-motion` (start dan gepauzeerd) en geef altijd een pauzeknop.
- Animaties met een verhaal: de leerling start zelf (knoppen Start / Pauzeer / Opnieuw). Geef ruim leestijd: een uitlegtekst van ± 40 woorden staat ± 6 seconden in beeld voordat de animatie verdergaat. Uitleg die bij elkaar hoort **aanvullen** in plaats van vervangen, zodat hij in beeld blijft.
- Laat bij een overgang naar een andere weergave het model staan en zet de nieuwe weergave ernaast (bijv. atoommodel → structuurformule), zodat leerlingen ze kunnen vergelijken.
- Slepen en tikken: gebruik `pointerdown`/`pointerup` met `touch-action: none` op het speelveld, niet `click`; op touchschermen valt de eerste tik na het slepen anders weg.
- Scheikundig correct: controleer gegevens (atoommassa's, elektronenverdeling, formules) tegen de Binas/het boek.
- Na het maken: voeg het materiaal toe in `data.js` bij de juiste paragraaf.

## Eigen materialen, geen externe bronnen
- Alle animaties, simulaties en oefeningen worden **zelf gemaakt** en staan in `materialen/`. Gebruik geen externe simulaties (zoals PhET).
- YouTube-video's mogen later wel (veld `youtube` in `data.js`). Verzin nooit URL's of YouTube-ID's; vraag ze aan de docent.
- Grote simulaties krijgen `formaat: "groot"` in `data.js` (hoger venster in de viewer).
- Spellen/oefeningen: willekeurige uitdagingen zonder herhaling, directe feedback met uitleg, 2 pogingen (2 punten / 1 punt). Referenties: `materialen/3hv/h1/bouw-een-atoom/` en het tabblad *Spel · Bouw een molecuul* in `materialen/3hv/h2/bindingen/`. Vaste opzet:
  - **startscherm** met de spelregels: 5 vragen; twee keer controleren; in één keer goed = 2 punten, goed bij de tweede keer = 1 punt, twee keer fout = 0 punten en dan het goede antwoord;
  - **spelbalk**: "Vraag x van 5", voortgangsstreepjes, score, poging ("Poging 1 van 2 · goed = 2 punten") en Stoppen;
  - **eindscherm** met sterren, totaalscore en de punten per vraag, en Opnieuw spelen.
- Een spel krijgt in `data.js` een eigen materiaal met `type: "oefening"` (ook als het in dezelfde simulatie zit), zodat het onder Oefening te vinden is.
- **Leerlingen moeten altijd weten WAAROM iets goed of fout is.** Dus nooit alleen "fout" of "goed":
  - Bij een goed antwoord: korte uitleg waarom het klopt (bijv. "Massagetal = protonen + neutronen = 6 + 6 = 12").
  - Bij een fout antwoord: zeg waarom het fout is, liefst op basis van de waarschijnlijke denkfout (bijv. "Je hebt de elektronen meegeteld") en geef een hint hoe ze verder kunnen, zonder het antwoord voor te zeggen.
  - Na de laatste poging: het goede antwoord met de uitleg erbij.
- Leerlijn: in hoofdstuk 1 (§1.1–§1.3) **alleen atomen**. Daar geen ionen, geen lading, geen ionen-schakelaar en ook het woord "ion" niet (ook niet in de beschrijving in `data.js`). Ionen komen vanaf §2.1; daar mag de schakelaar "Ionen meenemen" (standaard aan).
- Lading laten invoeren met ▲/▼-knoppen (niet typen), zodat er geen verwarring is over de notatie.

## Scheikundige afspraken
- Atoommodel (Bohr) met schillen K, L, M, N gevuld als 2, 8, 8, 2, zoals in het boek: atoommodellen dus alleen t/m calcium (geen Br, I enz.).
- Begrippen van de methode: valentie-elektronen, octetregel (8 elektronen in de buitenste schil; waterstof: volle K-schil met 2), covalentie, gedeeld elektronenpaar, atoombinding (covalente binding), enkele/dubbele/drievoudige binding, vrije elektronen, elektronenzee, positief/negatief ion.
- Kleuren in modellen: kern rood, elektronen blauw, valentie-elektronen oranje. Metaal geel, niet-metaal rood, metalloïde blauw (zoals het periodiek systeem van §1.3).
- Structuurformules tekenen met rechte hoeken (90°), zoals een leerling in 3 havo-vwo dat zou doen.
- Teksten die afhangen van een geval (bijv. dubbele of drievoudige binding, 1 of meer elektronen) altijd laten meebewegen met dat geval; nooit één vaste tekst voor alle gevallen.

## Controleren
- Lokaal bekijken: `python3 -m http.server` in de root en `http://localhost:8000` openen.
- Bekijk wijzigingen op desktop (± 1280 px) en mobiel (± 390 px): geen horizontale scroll, geen fouten in de console.
- Test met Playwright (Chromium is geïnstalleerd). Speel spellen en animaties helemaal door, met echte sleep- en tikbewegingen (op mobiel met touch), niet alleen een screenshot van de beginsituatie. Controleer ook via de viewer (`materiaal.html?jaar=…&h=…&m=…`).
