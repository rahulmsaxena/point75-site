/* Point75 Journal (/journal): every essay on one screen, as a salon wall of paintings in mixed sizes.
   Essays, their order and their paintings come from the site builder's blog list (on this page, or read from the
   home page); reading level, Editor's picks and the plain-English summary come from p75.js (window.P75META).
   Filter by level; with more than seven essays the wall pages instead of scrolling.
   Header and left menu from shell/shell.js. (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75JOURNAL) return;
  var BASE = window.P75BASE || 'https://rahulmsaxena.github.io/point75-site/';
  var CSS = "#p75L .jmain{flex:1;display:flex;flex-direction:column;min-height:0;width:100%;max-width:1304px;margin:0 auto;padding:0 32px 28px}\n#p75L .jbar{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:8px 24px;padding:4px 0 18px}\n#p75L .jbar .kick{display:block;font-size:12.5px;font-weight:400;letter-spacing:.34em;text-transform:uppercase;color:#E6BD3C}\n#p75L .jbar h1{margin:8px 0 0;font-family:'Hedvig Letters Serif',Georgia,serif;font-weight:400;font-size:30px;line-height:1;letter-spacing:-.01em}\n#p75L .filters{display:flex;flex-wrap:wrap;gap:4px 24px}\n#p75L .filters button{min-height:44px;background:none;border:0;border-bottom:1px solid transparent;color:var(--muted);font:400 13px Jost,sans-serif;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;padding:0 2px}\n#p75L .filters button[aria-pressed=true]{color:var(--ink);border-bottom-color:var(--gold)}\n#p75L .filters button:hover{color:var(--ink)}\n#p75L .wall{flex:1;min-height:420px;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:14px}\n#p75L .tile{grid-column:var(--c);grid-row:var(--r);min-height:0}\n#p75L .wall.filtered{grid-template-rows:none;grid-auto-rows:minmax(0,1fr)}\n#p75L .wall.filtered .tile{grid-column:auto/span 2;grid-row:auto}\n#p75L .tile a{position:relative;display:block;height:100%;overflow:hidden;border-radius:2px;color:var(--ink);text-decoration:none;background:#141518}\n#p75L .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(.15);transition:transform 1.4s cubic-bezier(.2,.7,.1,1),filter .6s}\n#p75L .tile .ph{position:absolute;inset:0;background:radial-gradient(120% 100% at 30% 15%,#2A2B30 0%,#18191C 55%,#111214 100%);border:1px solid #23242A}\n#p75L .tile .veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,11,12,0) 35%,rgba(10,11,12,.55) 65%,rgba(10,11,12,.92) 100%);transition:background .5s}\n#p75L .tile .cap{position:absolute;left:0;right:0;bottom:0;padding:18px 20px 18px}\n#p75L .tile .meta{display:flex;gap:14px;font:400 12px Jost,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#E4E0D7}\n#p75L .tile .pick{color:#F2C94C}\n#p75L .tile strong{display:block;margin-top:8px;font-family:'Hedvig Letters Serif',Georgia,serif;font-weight:400;font-size:20px;line-height:1.2;letter-spacing:-.005em;transition:color .3s}\n#p75L .tile.lead strong{font-size:28px}\n#p75L .tile.wide strong{font-size:21px}\n#p75L .tile .sum{display:block;max-height:0;opacity:0;overflow:hidden;margin-top:0;font-weight:400;font-size:15px;line-height:1.55;color:#ECE8E0;transition:max-height .5s,opacity .4s,margin-top .4s}\n#p75L .tile a:hover img,#p75L .tile a:focus-visible img{transform:scale(1.04);filter:none}\n#p75L .tile a:hover .veil,#p75L .tile a:focus-visible .veil{background:linear-gradient(180deg,rgba(10,11,12,.2) 0%,rgba(10,11,12,.75) 45%,rgba(10,11,12,.95) 100%)}\n#p75L .tile a:hover .sum,#p75L .tile a:focus-visible .sum{max-height:6.3em;opacity:1;margin-top:10px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4}\n#p75L .tile a:hover strong,#p75L .tile a:focus-visible strong{color:var(--gold)}\n#p75L .tile a:focus{outline:none}\n#p75L .tile a:focus-visible{outline:1px solid #C9A227;outline-offset:3px}\n#p75L .tile.lead .sum{max-height:9.5em;opacity:1;margin-top:10px;max-width:520px}\n#p75L .tile[hidden]{display:none}\n@media (max-width:760px){#p75L .jmain{padding:0 16px 16px}\n#p75L .jbar{padding-bottom:12px}\n#p75L .jbar h1{font-size:24px}\n#p75L .filters{gap:0 16px}\n#p75L .wall{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:1.4fr repeat(3,minmax(0,1fr));gap:10px;min-height:0}\n#p75L .tile{grid-column:auto;grid-row:auto}\n#p75L .tile.lead{grid-column:1/span 2}\n#p75L .tile .cap{padding:10px 12px}\n#p75L .tile strong{font-size:15.5px}\n#p75L .tile.lead strong{font-size:19px}\n#p75L .tile.wide strong{font-size:15.5px}\n#p75L .tile .meta{font-size:10.5px;gap:8px}\n#p75L .tile .sum,#p75L .tile.lead .sum{display:none}\n#p75L .wall.filtered .tile{grid-column:auto/span 1}}\n@media (prefers-reduced-motion: reduce){#p75L .tile img,#p75L .tile .sum,#p75L .tile .veil{transition:none}}\n#p75L .tile .ph{display:flex;align-items:flex-end}\n#p75L .tile strong{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}\n@media (min-width:761px) and (max-width:1100px){\n#p75L .wall:not(.auto){grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr))}\n#p75L .wall:not(.auto) .tile:nth-child(1){grid-column:1/span 2;grid-row:1/span 2}\n#p75L .wall:not(.auto) .tile:nth-child(2){grid-column:3/span 2;grid-row:1}\n#p75L .wall:not(.auto) .tile:nth-child(3){grid-column:3;grid-row:2}\n#p75L .wall:not(.auto) .tile:nth-child(4){grid-column:4;grid-row:2}\n#p75L .wall:not(.auto) .tile:nth-child(5){grid-column:1/span 2;grid-row:3}\n#p75L .wall:not(.auto) .tile:nth-child(6){grid-column:3;grid-row:3}\n#p75L .wall:not(.auto) .tile:nth-child(7){grid-column:4;grid-row:3}\n#p75L .tile.lead .sum{-webkit-line-clamp:5;display:-webkit-box;-webkit-box-orient:vertical}}\n#p75L .pager{display:flex;align-items:center;gap:6px;margin-left:12px}\n#p75L .pager button{min-width:44px;min-height:44px;background:none;border:1px solid #2A2B30;border-radius:999px;color:var(--ink);font:400 16px Jost,sans-serif;cursor:pointer}\n#p75L .pager button:disabled{opacity:.35;cursor:default}\n#p75L .pager span{font:400 11px Jost,sans-serif;letter-spacing:.2em;color:var(--muted);min-width:44px;text-align:center}\n#p75L .wall.auto{grid-template-rows:none;grid-auto-rows:minmax(0,1fr);grid-auto-flow:dense}\n#p75L .wall.auto .tile{grid-column:auto/span 2;grid-row:auto}\n#p75L .wall.auto .tile.lead{grid-column:auto/span 2;grid-row:auto/span 2}\n@media (max-width:760px){#p75L .tile .veil{background:linear-gradient(180deg,rgba(10,11,12,.05) 20%,rgba(10,11,12,.7) 55%,rgba(10,11,12,.95) 100%)}#p75L .wall.auto .tile,#p75L .wall.auto .tile.lead{grid-column:auto/span 1;grid-row:auto}#p75L .wall.auto .tile.lead{grid-column:1/span 2}}";
  var FALLBACK = [{"url": "/let-the-fed-be-fed", "title": "Let The Fed be Fed", "desc": "The U.S. now spends over $1 trillion a year just on interest, which gives politicians every reason to pressure the Fed to keep rates low. History shows how that ends: Arthur Burns gave in and got a decade of inflation, while Paul Volcker held firm and broke it. The real fix is a Congress that stops overspending. So does today's Fed have Volcker's nerve?", "level": "Easy"}, {"url": "/the-anxiety-trade", "title": "The Anxiety Trade", "desc": "Oil near $95, 10-year yields at 4.8%, and a trillion-dollar AI spending spree all look scary, especially when strung together into one doomsday story. But they're separate, real risks, not a countdown clock. The market is sorting AI winners from losers exactly as it should. Uncertain isn't the same as doomed, so what's actually worth watching?", "level": "Easy"}, {"url": "/the-machine-that-doesnt-need-cheap-money", "title": "The Machine That Doesn't Need Cheap Money", "desc": "The Fed just raised rates, yet AI spending keeps growing because Big Tech pays for it with its own cash, not borrowed money. That has turned chips into a bargaining chip between the U.S. and China, while Europe absorbs an energy shock from the Iran war and the BRICS nations slowly gain influence. Right now these forces are pushing everyone toward the negotiating table, but for how long?", "level": "Medium"}, {"url": "/right-fear-wrong-reasons", "title": "Right Fear, Wrong Reasons", "desc": "Everyone is watching AI stocks and the next Fed meeting, but the real warning signs are in the financial system's plumbing. Consumers are tapped out, big investors are avoiding long-term bonds, young workers are stuck behind boomers who can't afford to retire, and high mortgage rates have frozen housing. Add it up, and the word that comes out isn't \u201csoft landing.\u201d", "level": "Advanced"}, {"url": "/nightmare-on-bond-street", "title": "Nightmare on Bond Street", "desc": "Bonds, the \u201csafe\u201d corner of finance, just had a scary stretch: the 30-year Treasury yield touched levels last seen in 2007 as U.S. debt crossed $40 trillion. The Treasury's answer, bigger bond buybacks, is a few billion dollars thrown at a $30 trillion market, and the Fed is staying quiet. Higher yields don't stay on Wall Street; they show up in mortgages, loans and prices. So how long will this Halloween last?", "level": "Medium"}, {"url": "/the-welfare-state-was-always-a-ticking-clock", "title": "The Welfare State Was Always a Ticking Clock. We're Just Now Hearing It Tick.", "desc": "Welfare promises were made when many workers supported each retiree. Japan is down to about two, and the U.S. faces soaring healthcare costs and nearly $40 trillion in debt. Now AI could wipe out jobs just as those bills peak, forcing governments to spend even more, and opening a window for China. Is this just another cycle, or a countdown?", "level": "Medium"}, {"url": "/bond-martinis-shaken-not-stirred", "title": "Bond Martinis, Shaken Not Stirred", "desc": "Long-term Treasury yields are climbing, and the comforting idea that \u201cthe economy grows faster than our debt costs\u201d is getting harder to believe. Higher yields lock the government into paying more interest for years, squeeze Big Tech's AI borrowing, and help explain gold's rally. It's not a five-alarm fire yet, but the ingredients for stagflation are on the table.", "level": "Medium"}];
  var COVER_CROP = /^(https:\/\/assets\.zyrosite\.com)\/cdn-cgi\/image\/[^\/]*fit=crop[^\/]*\/(.+)$/;
  // desktop: lead 2x2, two wide, four small (6 columns x 2 rows)
  var POS = [['1 / span 2', '1 / span 2', 'lead'], ['3 / span 2', '1', 'wide'], ['5', '1', ''], ['6', '1', ''], ['3', '2', ''], ['4', '2', ''], ['5 / span 2', '2', 'wide']];
  var PAGE = 7, essays = null, level = 'all', page = 0, building = false;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pathOf(h) { try { return new URL(h, location.origin).pathname.replace(/\/+$/, '') || '/'; } catch (e) { return h; } }
  function fullCover(src) { var m = (src || '').match(COVER_CROP); return m ? m[1] + '/cdn-cgi/image/format=auto,w=1200,fit=scale-down/' + m[2] : src; }

  function fromDoc(doc) {
    var out = [], seen = {};
    doc.querySelectorAll('.block-blog-list-item').forEach(function (it) {
      var a = it.querySelector('a[href]'), t = it.querySelector('.block-blog-list-item__title'), img = it.querySelector('img');
      if (!a || !t) return;
      var p = pathOf(a.getAttribute('href')), title = (t.textContent || '').trim();
      if (!title || seen[title.toLowerCase()]) return; seen[title.toLowerCase()] = 1;
      out.push({ url: p, title: title, img: img ? fullCover(img.getAttribute('src')) : '' });
    });
    return out;
  }
  function enrich(list) {
    var M = window.P75META || {}, L = M.levels || {}, T = M.tldr || {}, P = M.picks || [];
    var fb = {}; FALLBACK.forEach(function (e) { fb[e.url] = e; });
    list.forEach(function (e) {
      var base = e.url.replace(/-copy$/, ''), f = fb[base] || fb[e.url] || {};
      e.level = L[e.url] || L[base] || f.level || '';
      e.desc = T[e.url] || T[base] || T[base + '-copy'] || f.desc || '';
      e.pick = P.indexOf(e.url) >= 0 || P.indexOf(base) >= 0;
    });
    // Editor's picks lead, then the builder's own order
    return list.filter(function (e) { return e.pick; }).concat(list.filter(function (e) { return !e.pick; }));
  }
  function load(cb) {
    var here = fromDoc(document);
    if (here.length) return cb(enrich(here));
    fetch('/', { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (h) {
      var list = fromDoc(new DOMParser().parseFromString(h, 'text/html'));
      cb(enrich(list.length ? list : FALLBACK.map(function (e) { return { url: e.url, title: e.title, img: '' }; })));
    }).catch(function () { cb(enrich(FALLBACK.map(function (e) { return { url: e.url, title: e.title, img: '' }; }))); });
  }

  function tiles(main) {
    var shown = essays.filter(function (e) { return level === 'all' || e.level === level; });
    var pages = Math.max(1, Math.ceil(shown.length / PAGE)); if (page >= pages) page = pages - 1;
    var slice = shown.slice(page * PAGE, page * PAGE + PAGE), full = slice.length === PAGE && level === 'all';
    var wall = main.querySelector('.wall');
    wall.className = 'wall' + (full ? '' : ' auto');
    wall.innerHTML = slice.map(function (e, i) {
      var p = full ? POS[i] : ['auto', 'auto', i === 0 ? 'lead' : ''];
      var art = e.img ? '<img src="' + esc(e.img) + '" alt="" loading="' + (i < 3 ? 'eager' : 'lazy') + '">' : '<span class="ph" aria-hidden="true"></span>';
      return '<li class="tile ' + p[2] + '"' + (full ? ' style="--c:' + p[0] + ';--r:' + p[1] + '"' : '') + '><a href="' + esc(e.url) + '">' + art +
        '<span class="veil" aria-hidden="true"></span><span class="cap"><span class="meta">' +
        (e.pick ? '<span class="pick">Editor’s pick</span>' : '') + (e.level ? '<span>' + esc(e.level) + '</span>' : '') +
        '</span><strong>' + esc(e.title) + '</strong>' + (e.desc ? '<span class="sum">' + esc(e.desc) + '</span>' : '') + '</span></a></li>';
    }).join('');
    var pg = main.querySelector('.pager');
    pg.hidden = pages < 2;
    pg.querySelector('span').textContent = (page + 1) + ' / ' + pages;
    pg.querySelector('[data-d="-1"]').disabled = page === 0;
    pg.querySelector('[data-d="1"]').disabled = page >= pages - 1;
  }
  function build() {
    var main = window.P75SHELL.mount('journal');
    if (main.querySelector('.wall') || building) return;
    building = true;
    if (!document.getElementById('p75journal-css')) { var st = document.createElement('style'); st.id = 'p75journal-css'; st.textContent = CSS; document.head.appendChild(st); }
    main.innerHTML = '<div class="jmain"><div class="jbar"><div><span class="kick">Journal</span><h1>Essays</h1></div>' +
      '<div style="display:flex;align-items:center;flex-wrap:wrap"><div class="filters" role="group" aria-label="Filter by reading level">' +
      ['all', 'Easy', 'Medium', 'Advanced'].map(function (f) { return '<button aria-pressed="' + (f === 'all') + '" data-f="' + f + '">' + (f === 'all' ? 'All' : f) + '</button>'; }).join('') +
      '</div><div class="pager" hidden><button data-d="-1" aria-label="Previous essays">←</button><span></span><button data-d="1" aria-label="More essays">→</button></div></div></div>' +
      '<ol class="wall" aria-label="Essays"></ol></div>';
    main.querySelectorAll('.filters button').forEach(function (b) {
      b.addEventListener('click', function () {
        level = b.getAttribute('data-f'); page = 0;
        main.querySelectorAll('.filters button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        tiles(main);
      });
    });
    main.querySelectorAll('.pager button').forEach(function (b) {
      b.addEventListener('click', function () { page += Number(b.getAttribute('data-d')); tiles(main); });
    });
    load(function (list) { essays = list; building = false; if (document.body.contains(main)) tiles(main); });
  }
  function withShell(cb) {
    if (window.P75SHELL) return cb();
    if (document.getElementById('p75shell-js')) return;
    var s = document.createElement('script'); s.id = 'p75shell-js';
    s.src = BASE + 'shell/shell.js?v=' + Math.floor(Date.now() / 36e5);
    s.onload = cb; document.body.appendChild(s);
  }
  function render() { withShell(build); }
  function clear() {
    var r = document.getElementById('p75L');
    if (r && r.getAttribute('data-page') === 'journal' && window.P75SHELL) window.P75SHELL.unmount();
  }
  window.P75JOURNAL = { render: render, clear: clear };
})();
