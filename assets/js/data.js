/* =====================================================================
   SOLUTION – inhoud van de website
   ---------------------------------------------------------------------
   Dit is het ENIGE bestand dat je hoeft aan te passen om leerjaren,
   hoofdstukken, paragrafen en digitale materialen toe te voegen.
   Materialen staan per hoofdstuk: één blok per tool. Kan een tool meer
   dingen, beschrijf die dan als 'onderdelen' (zie README.md).
   Zie README.md voor uitleg en voorbeelden.
   ===================================================================== */

window.SOLUTION = {

  /* Versie van de materialen. Verhoog dit (bijv. de datum) als je een animatie of
     simulatie in materialen/ hebt aangepast: browsers laden dan zeker de nieuwe versie
     in plaats van een oude uit hun geheugen (cache). */
  versie: "2026-11-21a",

  /* Soorten materiaal. Je kunt hier zelf soorten aan toevoegen. */
  typen: {
    animatie:  { label: "Animatie",  kleur: "#2f6fb5" },
    simulatie: { label: "Simulatie", kleur: "#1f8a70" },
    video:     { label: "Video",     kleur: "#c0392b" },
    oefening:  { label: "Oefening",  kleur: "#c27c0e" },
    document:  { label: "Document",  kleur: "#6c4fc4" },
    link:      { label: "Link",      kleur: "#5b6b7c" }
  },

  leerjaren: [
    /* Leerjaren in ontwikkeling: zet 'actief' op true zodra
       er hoofdstukken zijn toegevoegd. */
    { id: "2hv", titel: "2 havo-vwo", ondertitel: "Scheikunde – 2 HAVO-VWO", actief: false, hoofdstukken: [] },

    {
      id: "3hv",
      titel: "3 havo-vwo",
      ondertitel: "Scheikunde – 3 HAVO-VWO",
      actief: true,
      hoofdstukken: [
        {
          nr: 1,
          titel: "Atoombouw en periodiek systeem",
          pagina: 4,
          paragrafen: [
            { nr: 1, titel: "Atoombouw", pagina: 5 },
            { nr: 2, titel: "Massagetal, atoomnummer en isotopen", pagina: 10 },
            { nr: 3, titel: "Het Periodiek Systeem", pagina: 15 }
          ],
          materialen: [
            {
              id: "atoommodel",
              type: "animatie",
              paragrafen: [1],
              titel: "Het atoommodel van Bohr",
              beschrijving: "Kies een element en bekijk hoe protonen, neutronen en elektronen in het atoom zijn verdeeld.",
              url: "materialen/3hv/h1/atoommodel/index.html"
            },
            {
              id: "bouw-een-atoom",
              type: ["simulatie", "oefening"],
              paragrafen: [2],
              titel: "Bouw een atoom",
              beschrijving: "Bouw zelf atomen en oefen daarna met drie spellen over atoomnummer, massagetal en het symbool van een atoom.",
              url: "materialen/3hv/h1/bouw-een-atoom/index.html",
              formaat: "groot",
              onderdelen: [
                {
                  id: "bouw-een-atoom-bouwen",
                  titel: "Bouwen",
                  tekst: "Voeg protonen, neutronen en elektronen toe. Je ziet welk element het wordt, het atoomnummer, het massagetal en of de kern stabiel is."
                },
                {
                  id: "spellen-atoombouw",
                  type: "oefening",
                  titel: "Drie spellen",
                  tekst: "Welk element is het? Vul het symbool aan. Maak zelf het symbool met atoomnummer en massagetal.",
                  url: "materialen/3hv/h1/bouw-een-atoom/index.html?spel=1"
                }
              ]
            },
            {
              id: "periodiek-systeem",
              type: "simulatie",
              paragrafen: [3],
              titel: "Interactief periodiek systeem",
              beschrijving: "Ontdek de metalen, niet-metalen, metalloïden en de groepen in het periodiek systeem. Beweeg over een element en lees de fase, waar het voorkomt en waarvoor het wordt gebruikt.",
              url: "materialen/3hv/h1/periodiek-systeem/index.html",
              formaat: "groot"
            }
          ]
        },
        {
          nr: 2,
          titel: "Indeling van stoffen",
          pagina: 25,
          paragrafen: [
            { nr: 1, titel: "Zouten", pagina: 26 },
            { nr: 2, titel: "Verhoudingsformules en naamgeving van zouten", pagina: 33 },
            { nr: 3, titel: "Metalen", pagina: 40 },
            { nr: 4, titel: "Moleculaire stoffen", pagina: 44 },
            { nr: 5, titel: "Naamgeving van moleculaire stoffen", pagina: 51 }
          ],
          materialen: [
            {
              id: "bouw-een-ion",
              type: ["simulatie", "oefening"],
              paragrafen: [1],
              titel: "Bouw een ion",
              beschrijving: "Bouw atomen en ionen en ontdek wat er met de lading gebeurt als je elektronen toevoegt of weghaalt. Met drie spellen.",
              url: "materialen/3hv/h1/bouw-een-atoom/index.html?ionen=1",
              formaat: "groot",
              onderdelen: [
                {
                  id: "bouw-een-ion-bouwen",
                  titel: "Bouwen",
                  tekst: "Voeg protonen, neutronen en elektronen toe. Je ziet welk element het is, het massagetal en de lading van het deeltje."
                },
                {
                  id: "spellen-ionen",
                  type: "oefening",
                  titel: "Drie spellen",
                  tekst: "Met atomen én ionen: welk element is het, vul het symbool aan en maak zelf het symbool met atoomnummer, massagetal en lading.",
                  url: "materialen/3hv/h1/bouw-een-atoom/index.html?spel=1&ionen=1"
                }
              ]
            },
            {
              id: "bindingen",
              type: ["simulatie", "oefening"],
              paragrafen: [2, 3, 4],
              titel: "Bindingen: zouten, metalen en moleculen",
              beschrijving: "Eén simulatie voor de drie soorten binding: ionbinding (zouten), metaalbinding (metalen) en atoombinding (moleculaire stoffen). Met een spel waarin je zelf moleculen bouwt.",
              url: "materialen/3hv/h2/bindingen/index.html",
              formaat: "groot",
              onderdelen: [
                {
                  id: "uitleg-bindingen",
                  paragraaf: [2, 3, 4],
                  titel: "Uitleg: ionbinding, metaalbinding en atoombinding",
                  tekst: "Kies bovenin een tabblad: ionbinding (zo ontstaat een zout), metaalbinding (vrije elektronen vormen een elektronenzee) of atoombinding (niet-metaalatomen delen elektronen; van atoommodel naar structuurformule)."
                },
                /* verborgen: niet op de tegel, alleen zodat oude links (?m=metaalbinding) blijven werken */
                { id: "ionbinding", verborgen: true, titel: "Ionbinding" },
                { id: "metaalbinding", verborgen: true, titel: "Metaalbinding", url: "materialen/3hv/h2/bindingen/index.html?tab=metaal" },
                { id: "atoombinding", verborgen: true, titel: "Atoombinding", url: "materialen/3hv/h2/bindingen/index.html?tab=covalent" },
                {
                  id: "bouw-een-molecuul",
                  type: "oefening",
                  paragraaf: 4,
                  titel: "Spel: bouw een molecuul",
                  tekst: "Sleep losse atomen tegen elkaar en maak zelf de structuurformule, met enkele, dubbele en drievoudige bindingen. Vijf moleculen per ronde.",
                  url: "materialen/3hv/h2/bindingen/index.html?tab=spel"
                }
              ]
            }
          ]
        },
        {
          nr: 3,
          titel: "Stofeigenschappen en scheidingsmethoden",
          pagina: 60,
          paragrafen: [
            { nr: 1, titel: "Stofeigenschappen", pagina: 61 },
            { nr: 2, titel: "Stofeigenschappen op microniveau", pagina: 72 },
            { nr: 3, titel: "Zuivere stoffen en mengsels", pagina: 80 },
            { nr: 4, titel: "Scheidingsmethoden", pagina: 91 }
          ],
          materialen: []
        },
        {
          nr: 4,
          titel: "Chemische reacties",
          pagina: 106,
          paragrafen: [
            { nr: 1, titel: "Reactievergelijkingen", pagina: 107 },
            { nr: 2, titel: "Ontleding", pagina: 114 },
            { nr: 3, titel: "Verbranding", pagina: 121 },
            { nr: 4, titel: "Organische chemie", pagina: 129 }
          ],
          materialen: []
        },
        {
          nr: 5,
          titel: "Chemisch rekenen",
          pagina: 144,
          paragrafen: [
            { nr: 1, titel: "Relatieve massa's", pagina: 145 },
            { nr: 2, titel: "De mol", pagina: 149 },
            { nr: 3, titel: "Rekenen aan reacties", pagina: 155 }
          ],
          materialen: []
        }
      ]
    }
  ]
};
