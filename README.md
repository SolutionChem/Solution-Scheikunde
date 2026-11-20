# Solution – Scheikunde

Website met digitale materialen (animaties, simulaties, video's, oefeningen) bij de scheikundemethode **Solution**.
De site is een gewone statische website: geen installatie of build nodig, en hij draait direct op **GitHub Pages**.

## Website online zetten (GitHub Pages)

1. Zorg dat de bestanden op de `main`-branch staan (merge deze branch naar `main`).
2. Ga op GitHub naar **Settings → Pages**.
3. Kies bij *Source*: **Deploy from a branch**, branch **main**, map **/ (root)**, en klik op *Save*.
4. Na een minuutje staat de site op `https://<gebruikersnaam>.github.io/<repository-naam>/`.

Elke wijziging die je daarna op `main` zet, staat binnen een minuut online.

Lokaal bekijken kan ook: open `index.html` in je browser, of start in deze map `python3 -m http.server` en ga naar <http://localhost:8000>.

## Hoe zit de site in elkaar?

```
index.html            Startpagina met logo en keuze van het leerjaar
leerjaar.html         Overzicht van de hoofdstukken van één leerjaar
hoofdstuk.html        Eén hoofdstuk: paragrafen met hun materialen
materiaal.html        Bekijken van één materiaal (met volledig-scherm-knop)

assets/js/data.js     ← ALLE INHOUD: leerjaren, hoofdstukken, paragrafen, materialen
assets/js/app.js      Weergave (hoef je normaal niet aan te passen)
assets/css/style.css  Huisstijl (kleuren, lettertypen, elementtegels)

materialen/           Eigen animaties en bestanden, per leerjaar en hoofdstuk
  3hv/h1/atoommodel/      Animatie: het atoommodel van Bohr (§1.1)
  3hv/h1/bouw-een-atoom/  Simulatie met drie spellen: bouw een atoom (§1.2); met ?ionen=1 ook "Bouw een ion" (§2.1)
  3hv/h1/periodiek-systeem/  Simulatie: interactief periodiek systeem (§1.3)
  3hv/h2/bindingen/       Simulatie: ionbinding, zo ontstaat een zout (§2.2); later ook covalente binding en metaalbinding
```

De pagina's worden automatisch opgebouwd uit `assets/js/data.js`. **Je past dus alleen dat bestand aan.**
Dat kan zelfs direct op github.com: open het bestand, klik op het potloodje, wijzig en klik op *Commit changes*.

## Materiaal toevoegen

Zoek in `data.js` de juiste paragraaf en zet een nieuw blok in de lijst `materialen: [ ... ]`.
Let op de komma tussen twee blokken.

### Een eigen animatie of HTML-bestand

1. Maak een map, bijvoorbeeld `materialen/3hv/h2/zoutrooster/`, en zet daar een `index.html` in
   (upload op GitHub via *Add file → Upload files*).
2. Voeg in `data.js` toe:

```js
{
  id: "zoutrooster",                       // uniek binnen het hoofdstuk, zonder spaties
  type: "animatie",
  titel: "Het ionrooster van keukenzout",
  beschrijving: "Bekijk hoe natrium- en chloride-ionen een rooster vormen.",
  url: "materialen/3hv/h2/zoutrooster/index.html"
}
```

### Een YouTube-video

```js
{
  id: "uitleg-mol",
  type: "video",
  titel: "Uitlegvideo: de mol",
  beschrijving: "Korte uitleg over het begrip mol.",
  youtube: "ABCDEFGHIJK"                   // de code na ?v= in de YouTube-link
}
```

### Een externe website

```js
{
  id: "voorbeeld-site",
  type: "link",
  titel: "Naam van de website",
  beschrijving: "…",
  url: "https://…",
  bron: "Naam van de maker"               // optioneel: wordt onder het materiaal getoond
}
```

Sommige websites mogen niet *in* een andere site getoond worden (je ziet dan een leeg of grijs vak).
Zet in dat geval `embed: false` bij het materiaal; leerlingen krijgen dan een knop die de site in een nieuw tabblad opent.

### Groot venster

Voor uitgebreide simulaties (zoals *Bouw een atoom*) kun je `formaat: "groot"` toevoegen.
Het venster op de materiaalpagina wordt dan bijna schermvullend.

### Een PDF of ander document

Zet het bestand in de juiste `materialen/...`-map en gebruik `type: "document"` met `url: "materialen/…/bestand.pdf"`.

### Soorten materiaal

Bovenaan `data.js` staan de soorten (`animatie`, `simulatie`, `video`, `oefening`, `document`, `link`) met hun kleur.
Je kunt daar zelf een soort toevoegen, bijvoorbeeld `quiz: { label: "Quiz", kleur: "#b03a8c" }`.
Op de hoofdstukpagina kunnen leerlingen filteren op soort.

## Een nieuw leerjaar toevoegen

Onderaan `data.js` staan al `4 havo` en `4 vwo` als voorbeeld (met `actief: false`, ze tonen dan “Binnenkort”).
Vul daar `hoofdstukken` in, op dezelfde manier als bij 3 havo-vwo, en zet `actief: true`.
Het leerjaar verschijnt dan automatisch op de startpagina en in de menubalk.
Zet de bijbehorende bestanden in een eigen map, bijvoorbeeld `materialen/4h/`.
