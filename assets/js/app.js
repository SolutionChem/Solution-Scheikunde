/* =====================================================================
   SOLUTION – weergave. Hier hoef je normaal niets aan te veranderen;
   de inhoud staat in assets/js/data.js.
   ===================================================================== */
(function () {
  "use strict";

  const D = window.SOLUTION;
  const params = new URLSearchParams(location.search);
  const pagina = document.body.dataset.page;

  /* ---------- hulpfuncties ---------- */

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  const $ = (sel) => document.querySelector(sel);

  const vindJaar = (id) => D.leerjaren.find((j) => j.id === id);
  const vindHs = (jaar, nr) => jaar && jaar.hoofdstukken.find((h) => String(h.nr) === String(nr));

  const type = (t) => D.typen[t] || { label: t, kleur: "#5b6b7c" };
  const chip = (t) => `<span class="chip" style="--k:${type(t).kleur}">${esc(type(t).label)}</span>`;

  const alleMaterialen = (hs) => hs.paragrafen.flatMap((p) =>
    (p.materialen || []).map((m) => ({ ...m, paragraaf: p })));

  const telTypen = (materialen) => {
    const t = {};
    materialen.forEach((m) => { t[m.type] = (t[m.type] || 0) + 1; });
    return t;
  };

  const urlJaar = (j) => `leerjaar.html?jaar=${encodeURIComponent(j.id)}`;
  const urlHs = (j, h) => `hoofdstuk.html?jaar=${encodeURIComponent(j.id)}&h=${h.nr}`;
  const urlMat = (j, h, m) => `materiaal.html?jaar=${encodeURIComponent(j.id)}&h=${h.nr}&m=${encodeURIComponent(m.id)}`;

  const embedUrl = (m) => {
    if (m.youtube) return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.youtube)}?rel=0`;
    // eigen materialen krijgen ?v=<versie>, zodat de browser na een update niet een oude versie uit de cache toont
    if (D.versie && !/^[a-z]+:/i.test(m.url)) return m.url + (m.url.includes("?") ? "&" : "?") + "v=" + encodeURIComponent(D.versie);
    return m.url;
  };

  const kruimelpad = (delen) =>
    `<nav class="kruimelpad" aria-label="Kruimelpad">${delen.map(([tekst, href]) =>
      href ? `<a href="${href}">${esc(tekst)}</a>` : `<span aria-current="page">${esc(tekst)}</span>`
    ).join('<span class="sep">/</span>')}</nav>`;

  const hsTegel = (h) => `<div class="tegel hs-tegel" aria-hidden="true">${h.nr}</div>`;

  /* ---------- logo ---------- */

  const LOGO = [
    ["16", "S", "Sulfur", "32,06"],
    ["8", "O", "Oxygen", "16,00"],
    ["71", "Lu", "Lutetium", "175,0"],
    ["22", "Ti", "Titanium", "47,87"],
    ["8", "O", "Oxygen", "16,00"],
    ["7", "N", "Nitrogen", "14,01"]
  ];

  const groteLogo = () => `
    <h1 class="logo" aria-label="Solution">
      ${LOGO.map(([nr, sym, naam, massa]) => `
        <span class="tegel" aria-hidden="true">
          <span class="nr">${nr}</span>
          <span class="sym">${sym}</span>
          <span class="naam">${naam}</span>
          <span class="massa">${massa}</span>
        </span>`).join("")}
    </h1>`;

  const miniLogo = () => `
    <a class="mini-logo" href="index.html" aria-label="Solution – naar de startpagina">
      ${LOGO.map(([, sym]) => `<span class="tegel" aria-hidden="true">${sym}</span>`).join("")}
    </a>`;

  /* ---------- kop en voet ---------- */

  function kopEnVoet() {
    const actieveJaren = D.leerjaren.filter((j) => j.actief);
    const huidig = params.get("jaar");
    $("#header").outerHTML = `
      <header class="site-header">
        <div class="container">
          ${miniLogo()}
          <nav aria-label="Leerjaren">
            <a href="index.html" ${pagina === "home" ? 'aria-current="page"' : ""}>Home</a>
            ${actieveJaren.map((j) =>
              `<a href="${urlJaar(j)}" ${huidig === j.id ? 'aria-current="page"' : ""}>${esc(j.titel)}</a>`).join("")}
          </nav>
        </div>
      </header>`;
    $("#footer").outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <span>Solution – Scheikunde</span>
          <span>Digitale materialen bij de methode</span>
        </div>
      </footer>`;
  }

  /* ---------- pagina's ---------- */

  function home() {
    document.title = "Solution – Scheikunde";
    $("#inhoud").innerHTML = `
      <section class="hero">
        <div class="container">
          ${groteLogo()}
          <div class="tagline"><span>Scheikunde</span></div>
        </div>
      </section>
      <section class="sectie">
        <div class="container">
          <h2>Kies je leerjaar</h2>
          <div class="jaren">
            ${D.leerjaren.map((j) => j.actief ? `
              <a class="tegel jaar-kaart" href="${urlJaar(j)}">
                <span class="groot">${esc(j.titel)}</span>
                <span class="klein">${j.hoofdstukken.length} hoofdstukken</span>
              </a>` : `
              <div class="tegel jaar-kaart inactief" aria-disabled="true">
                <span class="badge">Binnenkort</span>
                <span class="groot">${esc(j.titel)}</span>
                <span class="klein">Nog in ontwikkeling</span>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function leerjaar() {
    const j = vindJaar(params.get("jaar"));
    if (!j || !j.actief) return nietGevonden();
    document.title = `${j.titel} – Solution`;

    $("#inhoud").innerHTML = `
      <div class="container">
        ${kruimelpad([["Home", "index.html"], [j.titel]])}
        <h1 class="paginakop">${esc(j.ondertitel || j.titel)}</h1>
        <p class="intro">Kies een hoofdstuk om de animaties, simulaties en andere digitale materialen per paragraaf te bekijken.</p>
        <div class="hoofdstukken">
          ${j.hoofdstukken.map((h) => {
            const mats = alleMaterialen(h);
            const typen = telTypen(mats);
            return `
            <a class="hs-kaart" href="${urlHs(j, h)}">
              <div class="hs-kop">
                ${hsTegel(h)}
                <div>
                  <div class="label">Hoofdstuk ${h.nr}</div>
                  <h2>${esc(h.titel)}</h2>
                </div>
              </div>
              <ol>
                ${h.paragrafen.map((p) => `
                  <li><span class="p">§${p.nr}</span><span>${esc(p.titel)}</span>
                  ${p.pagina ? `<span class="pag">${p.pagina}</span>` : ""}</li>`).join("")}
              </ol>
              <div class="hs-voet">
                ${mats.length
                  ? Object.keys(typen).map((t) => chip(t)).join("")
                  : "<span>Nog geen materialen</span>"}
                <span class="meer">Bekijk →</span>
              </div>
            </a>`;
          }).join("")}
        </div>
      </div>`;
  }

  function hoofdstuk() {
    const j = vindJaar(params.get("jaar"));
    const h = vindHs(j, params.get("h"));
    if (!j || !h) return nietGevonden();
    document.title = `H${h.nr} ${h.titel} – Solution`;

    const mats = alleMaterialen(h);
    const typenAanwezig = Object.keys(telTypen(mats));

    $("#inhoud").innerHTML = `
      <section class="hs-banner">
        <div class="container">
          ${kruimelpad([["Home", "index.html"], [j.titel, urlJaar(j)], [`Hoofdstuk ${h.nr}`]])}
          <div class="rij">
            ${hsTegel(h)}
            <div>
              <div class="hs-kop" style="padding:0;border:0"><span class="label">Hoofdstuk ${h.nr}${h.pagina ? ` · boek p. ${h.pagina}` : ""}</span></div>
              <h1 class="paginakop">${esc(h.titel)}</h1>
            </div>
          </div>
        </div>
      </section>
      <div class="container hs-layout">
        <aside class="zijbalk">
          <h2>Paragrafen</h2>
          ${h.paragrafen.map((p) => `
            <a href="#p${p.nr}"><span class="n">§${p.nr}</span><span>${esc(p.titel)}</span>
            ${(p.materialen || []).length ? `<span class="cnt">${p.materialen.length}</span>` : ""}</a>`).join("")}
          <div class="andere">
            <h2>Andere hoofdstukken</h2>
            ${j.hoofdstukken.filter((x) => x !== h).map((x) => `
              <a href="${urlHs(j, x)}"><span class="n">H${x.nr}</span><span>${esc(x.titel)}</span></a>`).join("")}
          </div>
        </aside>
        <div>
          ${typenAanwezig.length > 1 ? `
            <div class="filters" role="group" aria-label="Filter op soort materiaal">
              <span class="lbl">Toon:</span>
              <button class="filter-knop" data-filter="" aria-pressed="true">Alles</button>
              ${typenAanwezig.map((t) => `<button class="filter-knop" data-filter="${esc(t)}" aria-pressed="false">${esc(type(t).label)}</button>`).join("")}
            </div>` : ""}
          ${h.paragrafen.map((p) => `
            <section class="paragraaf" id="p${p.nr}">
              <h2 class="balk"><span class="num">§${h.nr}.${p.nr}</span><span>${esc(p.titel)}</span>
                ${p.pagina ? `<span class="pag">p. ${p.pagina}</span>` : ""}</h2>
              <div class="paragraaf-body">
                ${(p.materialen || []).length ? `
                  <div class="materialen">
                    ${p.materialen.map((m) => `
                      <a class="mat-kaart" data-type="${esc(m.type)}" style="--k:${type(m.type).kleur}" href="${urlMat(j, h, m)}">
                        <div>${chip(m.type)}</div>
                        <h3>${esc(m.titel)}</h3>
                        <p>${esc(m.beschrijving)}</p>
                        <span class="open">Openen →</span>
                      </a>`).join("")}
                  </div>
                  <p class="leeg" hidden>Geen materialen van deze soort bij deze paragraaf.</p>`
                : `<p class="leeg">Nog geen materialen bij deze paragraaf.</p>`}
              </div>
            </section>`).join("")}
        </div>
      </div>`;

    document.querySelectorAll(".filter-knop").forEach((knop) => {
      knop.addEventListener("click", () => {
        const f = knop.dataset.filter;
        document.querySelectorAll(".filter-knop").forEach((k) => k.setAttribute("aria-pressed", String(k === knop)));
        document.querySelectorAll(".paragraaf").forEach((sec) => {
          const kaarten = sec.querySelectorAll(".mat-kaart");
          if (!kaarten.length) return;
          let zichtbaar = 0;
          kaarten.forEach((k) => {
            const toon = !f || k.dataset.type === f;
            k.hidden = !toon;
            if (toon) zichtbaar++;
          });
          sec.querySelector(".leeg").hidden = zichtbaar > 0;
        });
      });
    });
  }

  function materiaal() {
    const j = vindJaar(params.get("jaar"));
    const h = vindHs(j, params.get("h"));
    if (!j || !h) return nietGevonden();
    const lijst = alleMaterialen(h);
    const i = lijst.findIndex((m) => m.id === params.get("m"));
    if (i < 0) return nietGevonden();
    const m = lijst[i];
    const p = m.paragraaf;
    const vorige = lijst[i - 1];
    const volgende = lijst[i + 1];
    const src = embedUrl(m);
    const insluiten = m.embed !== false;
    document.title = `${m.titel} – Solution`;

    $("#inhoud").innerHTML = `
      <div class="container">
        ${kruimelpad([["Home", "index.html"], [j.titel, urlJaar(j)], [`Hoofdstuk ${h.nr}`, urlHs(j, h)], [`§${h.nr}.${p.nr} ${p.titel}`, `${urlHs(j, h)}#p${p.nr}`]])}
        <div class="viewer-kop">
          <div class="tekst">
            ${chip(m.type)}
            <h1>${esc(m.titel)}</h1>
            <p class="intro">${esc(m.beschrijving)}</p>
          </div>
          <div class="knoppen">
            ${insluiten ? `<button class="knop" id="volledig" type="button">⛶ Volledig scherm</button>` : ""}
            <a class="knop licht" href="${esc(src)}" target="_blank" rel="noopener">Openen in nieuw tabblad ↗</a>
          </div>
        </div>
        ${insluiten ? `
          <div class="frame-wrap${m.formaat === "groot" ? " groot" : ""}" id="frame">
            <iframe src="${esc(src)}" title="${esc(m.titel)}" allowfullscreen
              allow="fullscreen; autoplay; encrypted-media; picture-in-picture"></iframe>
          </div>` : `
          <div class="extern">
            <p>Dit materiaal opent op een andere website.</p>
            <a class="knop" href="${esc(src)}" target="_blank" rel="noopener">Ga naar ${esc(m.titel)} ↗</a>
          </div>`}
        ${m.bron ? `<p class="bron">Bron: ${esc(m.bron)}</p>` : ""}
        <nav class="buren" aria-label="Ander materiaal in dit hoofdstuk">
          <span>${vorige ? `<a href="${urlMat(j, h, vorige)}">← ${esc(vorige.titel)}</a>` : ""}</span>
          <span>${volgende ? `<a href="${urlMat(j, h, volgende)}">${esc(volgende.titel)} →</a>` : ""}</span>
        </nav>
      </div>`;

    const knop = $("#volledig");
    if (knop) knop.addEventListener("click", () => {
      const f = $("#frame");
      (f.requestFullscreen || f.webkitRequestFullscreen).call(f);
    });
  }

  function nietGevonden() {
    document.title = "Niet gevonden – Solution";
    $("#inhoud").innerHTML = `
      <div class="container fout">
        <h1 class="paginakop">Pagina niet gevonden</h1>
        <p class="intro" style="margin:0 auto 20px">Deze pagina bestaat (nog) niet.</p>
        <a class="knop" href="index.html">Naar de startpagina</a>
      </div>`;
  }

  /* ---------- start ---------- */

  kopEnVoet();
  ({ home, leerjaar, hoofdstuk, materiaal }[pagina] || nietGevonden)();
})();
