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
- Scheikundig correct: controleer gegevens (atoommassa's, elektronenverdeling, formules) tegen de Binas/het boek.
- Na het maken: voeg het materiaal toe in `data.js` bij de juiste paragraaf.

## Externe materialen
- Verzin geen URL's of YouTube-ID's. Gebruik alleen links die echt bestaan; vraag anders de docent.
- Vermeld de bron (`bron:`) bij materiaal van derden, zoals PhET.

## Controleren
- Lokaal bekijken: `python3 -m http.server` in de root en `http://localhost:8000` openen.
- Bekijk wijzigingen op desktop (± 1280 px) en mobiel (± 390 px): geen horizontale scroll, geen fouten in de console.
