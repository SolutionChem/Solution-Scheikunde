/* =====================================================================
   SOLUTION – inhoud van de website
   ---------------------------------------------------------------------
   Dit is het ENIGE bestand dat je hoeft aan te passen om leerjaren,
   hoofdstukken, paragrafen en digitale materialen toe te voegen.
   Zie README.md voor uitleg en voorbeelden.
   ===================================================================== */

window.SOLUTION = {

  /* Versie van de materialen. Verhoog dit (bijv. de datum) als je een animatie of
     simulatie in materialen/ hebt aangepast: browsers laden dan zeker de nieuwe versie
     in plaats van een oude uit hun geheugen (cache). */
  versie: "2026-11-20b",

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
            {
              nr: 1, titel: "Atoombouw", pagina: 5,
              materialen: [
                {
                  id: "atoommodel",
                  type: "animatie",
                  titel: "Het atoommodel van Bohr",
                  beschrijving: "Kies een element en bekijk hoe protonen, neutronen en elektronen in het atoom zijn verdeeld.",
                  url: "materialen/3hv/h1/atoommodel/index.html"
                }
              ]
            },
            {
              nr: 2, titel: "Massagetal, atoomnummer en isotopen", pagina: 10,
              materialen: [
                {
                  id: "bouw-een-atoom",
                  type: "simulatie",
                  titel: "Bouw een atoom",
                  beschrijving: "Bouw atomen uit protonen, neutronen en elektronen en ontdek wat er gebeurt met het element en het massagetal. Met drie spellen.",
                  url: "materialen/3hv/h1/bouw-een-atoom/index.html",
                  formaat: "groot"
                },
                {
                  id: "spellen-atoombouw",
                  type: "oefening",
                  titel: "Spellen: atoomnummer, massagetal en symbool",
                  beschrijving: "Drie spellen: welk element is het, vul het symbool aan en maak zelf het symbool met atoomnummer en massagetal.",
                  url: "materialen/3hv/h1/bouw-een-atoom/index.html?spel=1",
                  formaat: "groot"
                }
              ]
            },
            {
              nr: 3, titel: "Het Periodiek Systeem", pagina: 15,
              materialen: [
                {
                  id: "periodiek-systeem",
                  type: "simulatie",
                  titel: "Interactief periodiek systeem",
                  beschrijving: "Ontdek de metalen, niet-metalen, metalloïden en de groepen in het periodiek systeem. Beweeg over een element en lees de fase, waar het voorkomt en waarvoor het wordt gebruikt.",
                  url: "materialen/3hv/h1/periodiek-systeem/index.html",
                  formaat: "groot"
                }
              ]
            }
          ]
        },
        {
          nr: 2,
          titel: "Indeling van stoffen",
          pagina: 25,
          paragrafen: [
            {
              nr: 1, titel: "Zouten", pagina: 26,
              materialen: [
                {
                  id: "bouw-een-ion",
                  type: "simulatie",
                  titel: "Bouw een ion",
                  beschrijving: "Bouw atomen en ionen uit protonen, neutronen en elektronen en ontdek wat er gebeurt met de lading. Met drie spellen; ionen staan al aan.",
                  url: "materialen/3hv/h1/bouw-een-atoom/index.html?ionen=1",
                  formaat: "groot"
                },
                {
                  id: "spellen-ionen",
                  type: "oefening",
                  titel: "Spellen: atomen en ionen",
                  beschrijving: "Drie spellen met atomen én ionen: welk element is het, vul het symbool aan en maak zelf het symbool met atoomnummer, massagetal en lading.",
                  url: "materialen/3hv/h1/bouw-een-atoom/index.html?spel=1&ionen=1",
                  formaat: "groot"
                }
              ]
            },
            {
              nr: 2, titel: "Verhoudingsformules en naamgeving van zouten", pagina: 33,
              materialen: [
                {
                  id: "ionbinding",
                  type: "simulatie",
                  titel: "Zo ontstaat een zout",
                  beschrijving: "Bekijk hoe een metaalatoom elektronen afstaat aan een niet-metaalatoom, hoe de ionen ontstaan en waarom ze in een vaste verhouding samen een zout vormen.",
                  url: "materialen/3hv/h2/bindingen/index.html",
                  formaat: "groot"
                }
              ]
            },
            {
              nr: 3, titel: "Metalen", pagina: 40,
              materialen: [
                {
                  id: "metaalbinding",
                  type: "simulatie",
                  titel: "De metaalbinding",
                  beschrijving: "Zie hoe de valentie-elektronen van metaalatomen vrije elektronen worden en hoe de zee van vrije elektronen de positieve metaalionen bij elkaar houdt.",
                  url: "materialen/3hv/h2/bindingen/index.html?tab=metaal",
                  formaat: "groot"
                }
              ]
            },
            {
              nr: 4, titel: "Moleculaire stoffen", pagina: 44,
              materialen: [
                {
                  id: "atoombinding",
                  type: "simulatie",
                  titel: "De atoombinding",
                  beschrijving: "Zie hoe niet-metaalatomen elektronen delen om aan de octetregel te voldoen, hoe zo atoombindingen ontstaan en hoe je daaruit de structuurformule tekent.",
                  url: "materialen/3hv/h2/bindingen/index.html?tab=covalent",
                  formaat: "groot"
                },
                {
                  id: "bouw-een-molecuul",
                  type: "oefening",
                  titel: "Spel: bouw een molecuul",
                  beschrijving: "Je krijgt een molecuulformule en de losse atomen. Sleep ze tegen elkaar en maak zelf de structuurformule, met enkele, dubbele en drievoudige bindingen. Vijf moleculen per ronde.",
                  url: "materialen/3hv/h2/bindingen/index.html?tab=spel",
                  formaat: "groot"
                }
              ]
            },
            { nr: 5, titel: "Naamgeving van moleculaire stoffen", pagina: 51, materialen: [] }
          ]
        },
        {
          nr: 3,
          titel: "Stofeigenschappen en scheidingsmethoden",
          pagina: 60,
          paragrafen: [
            { nr: 1, titel: "Stofeigenschappen", pagina: 61, materialen: [] },
            { nr: 2, titel: "Stofeigenschappen op microniveau", pagina: 72, materialen: [] },
            { nr: 3, titel: "Zuivere stoffen en mengsels", pagina: 80, materialen: [] },
            { nr: 4, titel: "Scheidingsmethoden", pagina: 91, materialen: [] }
          ]
        },
        {
          nr: 4,
          titel: "Chemische reacties",
          pagina: 106,
          paragrafen: [
            { nr: 1, titel: "Reactievergelijkingen", pagina: 107, materialen: [] },
            { nr: 2, titel: "Ontleding", pagina: 114, materialen: [] },
            { nr: 3, titel: "Verbranding", pagina: 121, materialen: [] },
            { nr: 4, titel: "Organische chemie", pagina: 129, materialen: [] }
          ]
        },
        {
          nr: 5,
          titel: "Chemisch rekenen",
          pagina: 144,
          paragrafen: [
            { nr: 1, titel: "Relatieve massa's", pagina: 145, materialen: [] },
            { nr: 2, titel: "De mol", pagina: 149, materialen: [] },
            { nr: 3, titel: "Rekenen aan reacties", pagina: 155, materialen: [] }
          ]
        }
      ]
    },

    /* Voorbeelden van toekomstige leerjaren: zet 'actief' op true zodra
       er hoofdstukken zijn toegevoegd. */
    { id: "4h", titel: "4 havo", ondertitel: "Scheikunde – 4 HAVO", actief: false, hoofdstukken: [] },
    { id: "4v", titel: "4 vwo",  ondertitel: "Scheikunde – 4 VWO",  actief: false, hoofdstukken: [] }
  ]
};
