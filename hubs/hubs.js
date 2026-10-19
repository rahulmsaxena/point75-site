/* Point75 - section hub pages (/kinetics, /bond-summary). Loaded by p75.js.
   A hub is a short landing page: a heading, a line on what the section is for, and one card per page in it.
   The section tree itself (which page sits under which) lives in p75.js as SECTIONS, so the cards here and
   the back / forward arrows always agree.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75HUBS) return;
  var EDITIONS = 'https://rahulmsaxena.github.io/point75-site/intelsummary/editions.json?v=' + Math.floor(Date.now() / 36e5);

  // What each card says. Keys are page paths; anything missing falls back to the page's name only.
  var CARD = {
    '/pulse': { blurb: 'The bond market’s vital signs: positioning, rates volatility, funding pressure, term premium and inflation expectations.', cta: 'Check the pulse' },
    '/debt-trap': { blurb: 'How much U.S. debt must be refinanced, what it costs taxpayers in interest, and who is still lending.', cta: 'Open the debt trap' },
    '/news': { blurb: 'Today’s bond, rates and central bank headlines, in one place.', cta: 'Read the news' },
    '/bond-summary': { blurb: 'The Treasury market day by day: why yields moved, and what the big bond investors are saying about it.', cta: 'Open Bond Summary' },
    '/economic-indicators': { blurb: 'The latest U.S. economic data: inflation, jobs, growth and more.', cta: 'See the indicators' },
    '/intelligent-summary': { blurb: 'Every trading day: why Treasury yields moved, the drivers, the news and what to watch next.', cta: 'Read the summary' },
    '/intelligent-summary#archive': { blurb: 'Every earlier daily summary, newest first, one line each, with a search.', cta: 'Open the archive' },
    '/insights': { blurb: 'What the big bond investors are saying: where they agree, where they differ and what they are doing.', cta: 'Open' }
  };

  // Cards on a hub that are not pages of their own (so they stay out of the back / forward arrows)
  var EXTRA = { '/bond-summary': [{ href: '/intelligent-summary#archive', text: 'Archives' }] };

  // Page heading and introduction per hub
  var HEAD = {
    '/kinetics': { eyebrow: 'Kinetics', title: 'The Forces Moving the Bond Market', lede: 'Five ways in: the daily bond summary, the government’s debt bill, the economic numbers underneath, the day’s news and the market’s pulse. Pick where you’d like to start.' },
    '/bond-summary': { eyebrow: 'Kinetics', title: 'Bond Summary', lede: 'The Treasury market day by day: the daily summary of why yields moved, and what the big bond investors are saying.' }
  };

  var CSS =
    '.p75hubpg{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--soft:#EDE8DE;--muted:#BDB7AA;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75hubpg *{box-sizing:border-box}' +
    '.p75hubpg .wrap{max-width:1040px;margin:0 auto;padding:4px 20px 64px}' +
    '.p75hubpg .crumb{font-size:13.5px;color:var(--muted);margin:0 0 8px}' +
    '.p75hubpg .crumb a{color:#D2CCBF;text-decoration:none}.p75hubpg .crumb a:hover{color:var(--cream)}' +
    '.p75hubpg .crumb span{margin:0 8px}' +
    '.p75hubpg .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75hubpg h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:4px 0 8px;letter-spacing:-.01em;color:#fff;display:inline-block;vertical-align:baseline;max-width:100%}' +
    '.p75hubpg .eyebrow:has(+ h1){display:inline-block;margin-right:14px;vertical-align:baseline}' +
    '.p75hubpg .lede{color:var(--soft);font-size:15.5px;line-height:1.6;margin:0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75hubpg .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}' +
    '.p75hubpg .grid.four{grid-template-columns:repeat(4,minmax(0,1fr))}' +
    '.p75hubpg a.card{display:flex;flex-direction:column;gap:6px;padding:14px 16px 14px;background:var(--panel);border:1px solid var(--line);' +
      'border-top:2px solid var(--gold);border-radius:6px;color:var(--cream);text-decoration:none;transition:border-color .15s,background .15s,transform .15s}' +
    '@media (hover:hover){.p75hubpg a.card:hover{transform:translateY(-2px)}}' +
    '.p75hubpg .ch{display:flex;align-items:baseline;gap:10px}' +
    '.p75hubpg .ic{margin-left:auto;align-self:flex-start;flex:0 0 auto;width:30px;height:30px;fill:none;stroke:var(--gold);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;opacity:.9}' +
    '.p75hubpg a.card{position:relative}.p75hubpg .arr{position:absolute;right:16px;bottom:10px;color:var(--gold);font-size:26px;line-height:1;transition:transform .15s}' +
    '.p75hubpg a.card:hover .arr,.p75hubpg a.card:focus-visible .arr{transform:translateX(4px)}' +
    // fill the screen: rows stretch to the window, five cards as a bento (the first spans two columns)
    '.p75hubpg .grid.fill{grid-auto-rows:minmax(0,1fr);height:max(420px,calc(100vh - 300px))}' +
    '.p75hubpg .grid.fill a.card{padding:20px 22px 34px;gap:10px;border-top-width:3px;background:linear-gradient(160deg,#1D1E23 0%,#151619 100%)}' +
    '.p75hubpg .grid.fill .nm{font-size:27px}.p75hubpg .grid.fill .num{font-size:16px}.p75hubpg .grid.fill .bl{font-size:16px;line-height:1.55}' +
    '.p75hubpg .grid.fill .ic{width:40px;height:40px}' +
    '.p75hubpg .grid.n5 a.card:first-child{grid-column:span 2}.p75hubpg .grid.n5 a.card:first-child .nm{font-size:34px}.p75hubpg .grid.n5 a.card:first-child .bl{font-size:17px;max-width:60ch}' +
    '.p75hubpg .grid.n4,.p75hubpg .grid.n2{grid-template-columns:repeat(2,minmax(0,1fr))}' +
    '.p75hubpg .grid.fill.n3{height:auto;grid-auto-rows:auto}.p75hubpg .grid.n3 a.card{min-height:250px}.p75hubpg .grid.n3 .nm{font-size:30px}.p75hubpg .grid.n3 .ic{width:44px;height:44px}' +
    '@media (max-width:900px){.p75hubpg .grid.n3{grid-template-columns:1fr}.p75hubpg .grid.n3 a.card{min-height:0}.p75hubpg .grid.n3 .nm{font-size:24px}}' +
    '.p75hubpg .lt{display:block;margin-top:auto;padding:12px 14px;border-radius:10px;background:rgba(201,162,39,.08);border:1px solid rgba(201,162,39,.35);' +
      'font-family:"Hedvig Letters Serif",Georgia,serif;font-size:18px;line-height:1.35;color:#fff}' +
    '.p75hubpg .lt small{display:block;font-family:Manrope,sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#F2D27A;margin-bottom:4px}' +
    '.p75hubpg a.card:hover,.p75hubpg a.card:focus-visible{border-color:var(--gold);background:#1C1D21;outline:none}' +
    '.p75hubpg .num{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:15px;color:var(--gold)}' +
    '.p75hubpg .nm{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:22px;line-height:1.15;color:#fff}' +
    '.p75hubpg .bl{font-size:14.5px;line-height:1.5;color:var(--soft)}' +
    '.p75hubpg .inside{margin-top:auto;font-size:12.5px;line-height:1.5;color:#D2CCBF}' +
    '.p75hubpg .go{font-size:14.5px;font-weight:700;color:var(--gold)}' +
    '.p75hubpg .inside + .go{margin-top:0}.p75hubpg .bl + .go{margin-top:auto}' +
    '.p75hubpg .grid.four a.card{border-top-width:1px}.p75hubpg .grid.four .nm{font-size:19px}' +
    // the featured summary card on Bond Summary
    '.p75hubpg a.feat{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:14px;padding:16px 20px;background:var(--panel);' +
      'border:1px solid var(--line);border-left:2px solid var(--gold);border-radius:4px;color:var(--cream);text-decoration:none;transition:border-color .15s,background .15s}' +
    '.p75hubpg a.feat:hover,.p75hubpg a.feat:focus-visible{border-color:var(--gold);background:#1C1D21;outline:none}' +
    '.p75hubpg .feat .t{display:flex;flex-direction:column;gap:8px;min-width:0}' +
    '.p75hubpg .feat .ey{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:700}' +
    '.p75hubpg .feat .hd{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:25px;line-height:1.25;color:#fff}' +
    '.p75hubpg .feat .tk{font-size:15px;line-height:1.6;color:var(--soft)}' +
    '.p75hubpg .feat .go{white-space:nowrap}' +
    '.p75hubpg .grid.four{margin-top:12px}' +
    '@media (max-width:900px){.p75hubpg .grid.four,.p75hubpg .grid{grid-template-columns:repeat(2,minmax(0,1fr))}.p75hubpg .grid.fill{height:auto}.p75hubpg .grid.fill a.card{min-height:170px}}' +
    // Bond Summary overview: latest summary line and a plain list of its tabs
    '.p75hubpg .latest{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;margin-top:12px;padding:4px 0 4px 18px;border-left:2px solid var(--gold);text-decoration:none;color:var(--cream)}' +
    '.p75hubpg .latest .ey{flex-basis:100%;color:var(--gold);font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75hubpg .latest .hd{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:22px;line-height:1.3;color:#fff}' +
    '.p75hubpg .latest .go{color:var(--gold);font-weight:800;font-size:14px;white-space:nowrap}' +
    '.p75hubpg .latest:hover .hd{color:#F2D27A}' +
    '.p75hubpg .what{margin:14px 0 0;border-top:1px solid var(--line)}' +
    '.p75hubpg .what div{display:grid;grid-template-columns:200px minmax(0,1fr);gap:6px 20px;padding:10px 0;border-bottom:1px solid var(--line)}' +
    '.p75hubpg .what dt a{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:19px;color:#fff;text-decoration:none}' +
    '.p75hubpg .what dt a:hover{color:var(--gold)}' +
    '.p75hubpg .what dd{margin:0;color:var(--soft);font-size:15px;line-height:1.55}' +
    '@media (max-width:640px){.p75hubpg .what div{grid-template-columns:1fr}.p75hubpg .latest .hd{font-size:19px}}' +
    '@media (max-width:640px){.p75hubpg .wrap{padding:4px 16px 48px}.p75hubpg h1{font-size:24px}.p75hubpg .lede{font-size:16px;text-align:left}.p75hubpg .grid.fill a.card{min-height:0}' +
      '.p75hubpg .grid,.p75hubpg .grid.four{grid-template-columns:1fr;gap:10px;margin-top:14px}.p75hubpg a.card{padding:12px 14px}' +
      '.p75hubpg .nm{font-size:20px}.p75hubpg .bl{font-size:14px}.p75hubpg .grid.n5 a.card:first-child{grid-column:auto}.p75hubpg .grid.fill a.card{min-height:0;padding:14px 16px 30px}.p75hubpg .grid.fill .nm,.p75hubpg .grid.n5 a.card:first-child .nm{font-size:22px}.p75hubpg .grid.fill .bl{font-size:14.5px}.p75hubpg .grid.fill .ic{width:30px;height:30px}.p75hubpg a.feat{flex-direction:column;align-items:flex-start;gap:14px;padding:22px 20px}.p75hubpg .feat .hd{font-size:22px}}';

  function esc(x) { return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function once() {
    if (document.getElementById('p75hubpg-css')) return;
    var st = document.createElement('style'); st.id = 'p75hubpg-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  // A card for one page. `inside` lists the pages under it (shown as a hint of what's there).
  // A simple gold line icon per page (24px grid, drawn with strokes)
  var ICON = {
    '/pulse': '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1.4"/><path d="M6.5 11.5l1 .8M12 8.5v1.3M17.5 11.5l-1 .8"/>',
    '/debt-trap': '<rect x="4" y="15" width="4" height="5" rx=".6"/><rect x="10" y="10" width="4" height="10" rx=".6"/><rect x="16" y="5" width="4" height="15" rx=".6"/><path d="M3 20.5h18"/>',
    '/news': '<rect x="4" y="5" width="13" height="14" rx="1.5"/><path d="M17 9h2.5a.5.5 0 0 1 .5.5V17a2 2 0 0 1-2 2H7"/><path d="M7 9h7M7 12h7M7 15h4"/>',
    '/bond-summary': '<path d="M7 4h7l4 4v12H7z"/><path d="M14 4v4h4"/><path d="M9.5 16l2-2.5 2 1.5 2.5-3.5"/>',
    '/intelligent-summary': '<path d="M8 3.5v3M16 3.5v3"/><rect x="4" y="5.5" width="16" height="14.5" rx="1.8"/><path d="M4 10h16"/><path d="M8 16l2.5-3 2 1.5 3-3.5"/>',
    '/intelligent-summary#archive': '<rect x="3.5" y="4.5" width="17" height="4" rx="1"/><path d="M5 8.5v10a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-10"/><path d="M10 12.5h4"/>',
    '/insights': '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/><path d="M8 8.5h8M8 11.5h5"/>',
    '/economic-indicators': '<path d="M4 20h16"/><path d="M6 20v-6M10 20V9M14 20v-4M18 20V6"/><path d="M5 11l5-4 4 3 5-5"/>'
  };
  function card(k, i, numbered, latest) {
    var c = CARD[k.href] || {};
    var lt = k.href === '/intelligent-summary' && latest ? '<span class="lt"><small>Latest · ' + esc(latest.when) + '</small>' + esc(latest.title) + '</span>' :
      k.href === '/intelligent-summary#archive' && latest && latest.count > 1 ? '<span class="lt"><small>' + (latest.count - 1) + ' earlier days</small>' + esc(latest.first) + ' to ' + esc(latest.prev) + '</span>' : '';
    var inside = k.kids && k.kids.length ? k.kids.map(function (x) { return esc(x.text); }).join(' · ') : '';
    return '<a class="card" href="' + esc(k.href) + '" aria-label="' + esc(k.text + (c.blurb ? ': ' + c.blurb : '')) + '">' +
      '<span class="ch">' + (numbered ? '<span class="num">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' : '') +
      '<span class="nm">' + esc(k.text) + '</span>' + (ICON[k.href] ? '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICON[k.href] + '</svg>' : '') + '</span>' +
      (c.blurb ? '<span class="bl">' + esc(c.blurb) + '</span>' : '') + lt +
      (inside ? '<span class="inside">' + inside + '</span>' : '') + '<span class="arr" aria-hidden="true">›</span></a>';
  }

  function page(path, node, parent, latest) {
    var h = HEAD[path] || { eyebrow: parent ? parent.text : '', title: node.text, lede: '' };
    var html = '<div class="wrap">';
    if (parent && path !== '/bond-summary') html += '<nav class="crumb" aria-label="Breadcrumb"><a href="' + esc(parent.href) + '">' + esc(parent.text) + '</a><span aria-hidden="true">/</span>' + esc(node.text) + '</nav>';
    html += '<div class="eyebrow">' + esc(h.eyebrow) + '</div><h1>' + esc(h.title) + '</h1>' + (h.lede ? '<p class="lede">' + esc(h.lede) + '</p>' : '');
    var kids = (node.kids || []).concat(EXTRA[path] || []);
    // The cards fill the rest of the screen: a bento grid whose rows stretch to the window's height
    // (Bond Summary: two big cards, the Daily Summary one carrying the latest headline)
    html += '<div class="grid fill n' + kids.length + '">' + kids.map(function (k, i) { return card(k, i, true, latest); }).join('') + '</div>';
    return html + '</div>';
  }

  // The site can rebuild the page while the summary is loading, so callers queue up and all hear back
  var latest = null, loading = false, waiting = [];
  function loadLatest(cb) {
    if (latest) return cb(latest);
    waiting.push(cb);
    if (loading) return; loading = true;
    fetch(EDITIONS).then(function (r) { return r.json(); }).then(function (j) {
      var all = (j && j.summaries || []).filter(function (e) { return e && e.title; })
        .sort(function (a, b) { return String(b.generated_at || b.key).localeCompare(String(a.generated_at || a.key)); });
      var day = function (e) { var d = new Date((e.market_date || e.key) + 'T12:00:00Z'); return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }); };
      var s = all[0];
      if (s) {
        // count, oldest and second-newest day feed the Archives card
        latest = { title: s.title, regime: s.regime || '', note: s.regime_note || '', when: day(s),
          count: all.length, first: day(all[all.length - 1]), prev: all[1] ? day(all[1]) : '' };
      }
      loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(latest); });
    }).catch(function () { loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(null); }); });
  }

  // node: { href, text, kids }, parent: the same shape or null. Both come from SECTIONS in p75.js.
  function render(path, node, parent) {
    var main = document.querySelector('main') || document.body;
    var host = document.querySelector('.p75hubpg');
    var state = path + (latest ? '|latest' : '');
    if (host && host.getAttribute('data-state') === state) return;
    if (host) host.remove();
    once();
    host = document.createElement('div'); host.className = 'p75hubpg'; host.setAttribute('data-path', path); host.setAttribute('data-state', state);
    host.innerHTML = page(path, node, parent, latest);
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    if (path === '/bond-summary' && !latest) loadLatest(function (l) {
      var h = document.querySelector('.p75hubpg');
      if (l && h && h.getAttribute('data-path') === path) { h.innerHTML = page(path, node, parent, l); h.setAttribute('data-state', path + '|latest'); }
    });
  }
  function clear() { var h = document.querySelector('.p75hubpg'); if (h) h.remove(); }

  window.P75HUBS = { render: render, clear: clear };
})();
