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
hoofdstuk.html        Eén hoofdstuk: alle tools van het hoofdstuk, elk één keer
materiaal.html        Bekijken van één materiaal (met volledig-scherm-knop)

assets/js/data.js     ← ALLE INHOUD: leerjaren, hoofdstukken, paragrafen, materialen
assets/js/app.js      Weergave (hoef je normaal niet aan te passen)
assets/css/style.css  Huisstijl (kleuren, lettertypen, elementtegels)

materialen/           Eigen animaties en bestanden, per leerjaar en hoofdstuk
  3hv/h1/atoommodel/      Animatie: het atoommodel van Bohr (§1.1)
  3hv/h1/bouw-een-atoom/  Simulatie met drie spellen: bouw een atoom (§1.2); met ?spel=1 meteen de spellen (oefening bij §1.2),
                          met ?ionen=1 "Bouw een ion" (§2.1), met ?spel=1&ionen=1 de spellen met ionen (oefening bij §2.1)
  3hv/h1/periodiek-systeem/  Simulatie: interactief periodiek systeem (§1.3)
  3hv/h2/bindingen/       Simulatie: ionbinding (§2.2), metaalbinding (§2.3, ?tab=metaal), atoombinding (§2.4, ?tab=covalent)
                          en het spel Bouw een molecuul (§2.4, ?tab=spel)
```

De pagina's worden automatisch opgebouwd uit `assets/js/data.js`. **Je past dus alleen dat bestand aan.**
Dat kan zelfs direct op github.com: open het bestand, klik op het potloodje, wijzig en klik op *Commit changes*.

## Materiaal toevoegen

Zoek in `data.js` het juiste hoofdstuk en zet een nieuw blok in de lijst `materialen: [ ... ]` van dat hoofdstuk.
Let op de komma tussen twee blokken. Met `paragrafen: [2]` geef je aan bij welke paragraaf (of paragrafen) het hoort;
dat staat als label (§2.2) op de tegel.

### Eén tool die meer kan: onderdelen

Elke tool staat maar één keer op de hoofdstukpagina. Kan een tool meer dingen (zoals *Bindingen*: zouten, metalen,
moleculen en een spel), beschrijf dat dan met `onderdelen`. Ze verschijnen in de tegel onder *Wat kun je ermee?*
en zijn daar los aan te klikken. Een tool kan meer soorten hebben: `type: ["simulatie", "oefening"]`.

```js
{
  id: "bindingen",
  type: ["simulatie", "oefening"],
  paragrafen: [2, 3, 4],
  titel: "Bindingen: zouten, metalen en moleculen",
  beschrijving: "Eén simulatie voor de drie soorten binding …",
  url: "materialen/3hv/h2/bindingen/index.html",
  formaat: "groot",
  onderdelen: [
    { id: "uitleg-bindingen", paragraaf: [2, 3, 4], titel: "Uitleg: ionbinding, metaalbinding en atoombinding",
      tekst: "Wat de leerling hier kan doen." },
    { id: "bouw-een-molecuul", type: "oefening", paragraaf: 4, titel: "Spel: bouw een molecuul", tekst: "…",
      url: "materialen/3hv/h2/bindingen/index.html?tab=spel" }
  ]
}
```

Zonder `url` opent een onderdeel het gewone adres van de tool. Een onderdeel kun je direct openen met
`materiaal.html?jaar=3hv&h=2&m=bindingen&deel=uitleg-bindingen` (of kort: `&m=uitleg-bindingen`).
Houd uitleg die bij elkaar hoort samen in één onderdeel, zodat uitleg en oefening naast elkaar passen.

Een onderdeel met `verborgen: true` staat niet op de tegel, maar oude links ernaartoe blijven werken
(bij *Bindingen* bijv. `&m=metaalbinding`, dat het tabblad Metaalbinding opent).

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

### Na het aanpassen van een animatie of simulatie

Browsers bewaren pagina's een tijdje in hun geheugen (cache). Verhoog daarom bovenaan `data.js` het
veld `versie` (bijvoorbeeld naar de datum van vandaag) als je een bestand in `materialen/` hebt aangepast.
Leerlingen krijgen dan meteen de nieuwe versie te zien.

### Soorten materiaal

Bovenaan `data.js` staan de soorten (`animatie`, `simulatie`, `video`, `oefening`, `document`, `link`) met hun kleur.
Je kunt daar zelf een soort toevoegen, bijvoorbeeld `quiz: { label: "Quiz", kleur: "#b03a8c" }`.
Op de hoofdstukpagina kunnen leerlingen filteren op soort.

## Een nieuw leerjaar toevoegen

Bovenaan de lijst `leerjaren` in `data.js` staat al `2 havo-vwo` (met `actief: false`, die tegel is dan lichter en toont “Nog in ontwikkeling”).
Een ander leerjaar voeg je op dezelfde manier toe, bijvoorbeeld
`{ id: "4h", titel: "4 havo", ondertitel: "Scheikunde – 4 HAVO", actief: false, hoofdstukken: [] }`.
Vul `hoofdstukken` in, op dezelfde manier als bij 3 havo-vwo, en zet `actief: true`.
Het leerjaar verschijnt dan automatisch op de startpagina en in de menubalk.
Zet de bijbehorende bestanden in een eigen map, bijvoorbeeld `materialen/4h/`.
