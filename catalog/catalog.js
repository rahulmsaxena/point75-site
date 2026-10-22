/* Point75 catalog pages (now /kinetics): categories down the left, a card per page on the right, each with its own
   Italian Renaissance painting (public domain or CC0 from the holding museum), its name and one line. The same
   model as tools.point75.io's Tools and Outlook pages. Picking a category filters in place (?c= in the address).
   Header, left menu and footer from shell/shell.js. Fits one screen: the pictures size to the window.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75CATALOG) return;
  var BASE = window.P75BASE || 'https://rahulmsaxena.github.io/point75-site/';
  var WM = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';

  // Paintings: [thumb path under WM, title, artist and date, museum, licence, Commons file page]
  var ART = {
    summary: ['b/b1/Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg/1280px-Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg',
      'Saint Jerome in his Study', 'Antonello da Messina, c. 1475', 'National Gallery, London', 'Public domain', 'Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg'],
    news: ['9/94/Jacopo_Bassano,_The_Annunciation_to_the_Shepherds,_probably_1555-1560,_NGA_267.jpg/1280px-Jacopo_Bassano,_The_Annunciation_to_the_Shepherds,_probably_1555-1560,_NGA_267.jpg',
      'The Annunciation to the Shepherds', 'Jacopo Bassano, c. 1555–1560', 'National Gallery of Art, Washington', 'CC0', 'Jacopo_Bassano,_The_Annunciation_to_the_Shepherds,_probably_1555-1560,_NGA_267.jpg'],
    insights: ['6/69/Bernardino_Luini,_Christ_among_the_Doctors,_c.1515-30,_oil_on_poplar,_72.4_x_85.7_cm,_National_Gallery,_London.jpg/1280px-Bernardino_Luini,_Christ_among_the_Doctors,_c.1515-30,_oil_on_poplar,_72.4_x_85.7_cm,_National_Gallery,_London.jpg',
      'Christ among the Doctors', 'Bernardino Luini, c. 1515–1530', 'National Gallery, London', 'Public domain', 'Bernardino_Luini,_Christ_among_the_Doctors,_c.1515-30,_oil_on_poplar,_72.4_x_85.7_cm,_National_Gallery,_London.jpg'],
    pulse: ['d/d8/Fra_Angelico,_The_Healing_of_Palladia_by_Saint_Cosmas_and_Saint_Damian,_c._1438-1440,_NGA_41613.jpg/1280px-Fra_Angelico,_The_Healing_of_Palladia_by_Saint_Cosmas_and_Saint_Damian,_c._1438-1440,_NGA_41613.jpg',
      'The Healing of Palladia by Saint Cosmas and Saint Damian', 'Fra Angelico, c. 1438–1440', 'National Gallery of Art, Washington', 'CC0', 'Fra_Angelico,_The_Healing_of_Palladia_by_Saint_Cosmas_and_Saint_Damian,_c._1438-1440,_NGA_41613.jpg'],
    indicators: ['5/54/Cima_da_Conegliano_London_NG_Incredulita_STommaso_1504.jpg/1280px-Cima_da_Conegliano_London_NG_Incredulita_STommaso_1504.jpg',
      'The Incredulity of Saint Thomas', 'Cima da Conegliano, c. 1502–1504', 'National Gallery, London', 'Public domain', 'Cima_da_Conegliano_London_NG_Incredulita_STommaso_1504.jpg'],
    debt: ['b/b7/Penelope_with_the_Suitors_-_Pinturicchio_(National_Gallery).jpg/1280px-Penelope_with_the_Suitors_-_Pinturicchio_(National_Gallery).jpg',
      'Penelope with the Suitors', 'Pinturicchio, c. 1509', 'National Gallery, London', 'Public domain', 'Penelope_with_the_Suitors_-_Pinturicchio_(National_Gallery).jpg']
  };

  var PAGES = {
    kinetics: {
      eyebrow: 'Kinetics', title: 'The forces moving the bond market',
      cats: [['daily', 'Daily read'], ['signals', 'Signals'], ['debt', 'Debt']],
      items: [
        ['daily', 'Daily Summary', '/intelligent-summary', 'Why yields moved today, the drivers and what to watch.', 'summary'],
        ['daily', 'News', '/news', 'Today’s bond, rates and central-bank headlines.', 'news'],
        ['daily', 'Insights', '/insights', 'What the biggest voices in bonds are saying.', 'insights'],
        ['signals', 'Pulse', '/pulse', 'The bond market’s vital signs at a glance.', 'pulse'],
        ['signals', 'Economic Indicators', '/economic-indicators', 'Inflation, jobs and growth: the data underneath.', 'indicators'],
        ['debt', 'Debt Trap', '/debt-trap', 'How much U.S. debt rolls over, and what it costs.', 'debt']
      ]
    }
  };

  var CSS = [
    '#p75L .cat-page{flex:1;min-height:0;display:flex;flex-direction:column;width:100%;max-width:1560px;margin:0 auto;padding:6px 46px 10px;font-family:Jost,system-ui,sans-serif;color:#F3F0EA}',
    '#p75L .cat-hd{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 16px;padding-bottom:16px}',
    '#p75L .cat-eb{font-size:12.5px;letter-spacing:.3em;text-transform:uppercase;color:#E6BD3C}',
    '#p75L .cat-hd h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;color:#fff}',
    '#p75L .cat-body{flex:1;min-height:0;display:grid;grid-template-columns:260px minmax(0,1fr);gap:40px;align-items:start}',
    '#p75L .cat-side ul{list-style:none;margin:0;padding:0}',
    '#p75L .cat-side li{border-bottom:1px solid #34363C}',
    '#p75L .cat-side button{width:100%;display:flex;align-items:center;gap:12px;min-height:60px;padding:0 14px 0 16px;background:none;border:0;color:#F3F0EA;font:400 14px Jost,sans-serif;letter-spacing:.18em;text-transform:uppercase;text-align:left;cursor:pointer}',
    '#p75L .cat-side button>span:first-child{flex:1}',
    '#p75L .cat-side .cat-n{font-size:12px;letter-spacing:.08em;color:#9D978C}',
    '#p75L .cat-side svg{width:16px;height:16px;flex:none}',
    '#p75L .cat-side button:hover{color:#FFD23F}',
    '#p75L .cat-side button[aria-pressed=true]{background:#1C1D21;color:#fff}',
    '#p75L .cat-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 36px}',
    '#p75L .cat-card{min-width:0}',
    '#p75L .cat-card>a{display:flex;flex-direction:column;color:inherit;text-decoration:none}',
    '#p75L .cat-pic{display:flex;align-items:center;justify-content:center;height:clamp(150px,calc((100svh - 470px) / 2),300px);border-radius:6px;background:radial-gradient(ellipse at 50% 60%,#1D1E22 0%,#121316 72%);overflow:hidden}',
    '#p75L .cat-pic img{max-height:100%;max-width:100%;width:auto;height:auto;display:block;box-shadow:0 10px 30px rgba(0,0,0,.55);transition:transform .6s ease}',
    '#p75L .cat-card>a:hover .cat-pic img{transform:scale(1.03)}',
    '#p75L .cat-tag{margin-top:14px;font-size:11.5px;letter-spacing:.26em;text-transform:uppercase;color:#E6BD3C}',
    '#p75L .cat-card h2{margin:6px 0 0;font:400 21px/1.25 Jost,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fff}',
    '#p75L .cat-card>a:hover h2{color:#FFD23F}',
    '#p75L .cat-line{margin:6px 0 0;font-size:15px;line-height:1.45;color:#D6D1C7;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}',
    '#p75L .cat-art{margin-top:6px;font-size:12px;letter-spacing:.02em;color:#A9A397;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#p75L .cat-art i{color:#C9C4B9}',
    '@media (max-width:1200px){#p75L .cat-body{grid-template-columns:220px minmax(0,1fr);gap:28px}#p75L .cat-card h2{font-size:18px}}',
    '@media (max-width:1000px){#p75L .cat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#p75L .cat-pic{height:clamp(140px,calc((100svh - 560px) / 3),260px)}}',
    '@media (max-width:760px){#p75L .cat-page{padding:4px 16px 8px}#p75L .cat-hd h1{font-size:22px}#p75L .cat-body{grid-template-columns:1fr;gap:14px}',
    '#p75L .cat-side{margin:0 -16px;overflow-x:auto;scrollbar-width:none}#p75L .cat-side::-webkit-scrollbar{display:none}',
    '#p75L .cat-side ul{display:flex;padding:0 16px;gap:8px;width:max-content}#p75L .cat-side li{border:0}',
    '#p75L .cat-side button{min-height:44px;padding:0 16px;border:1px solid #34363C;border-radius:999px;font-size:12.5px;letter-spacing:.14em;white-space:nowrap}',
    '#p75L .cat-side button[aria-pressed=true]{border-color:#E6BD3C;background:rgba(230,189,60,.1)}#p75L .cat-side svg{display:none}',
    '#p75L .cat-grid{grid-template-columns:1fr 1fr;gap:18px 12px}#p75L .cat-pic{height:clamp(96px,calc((100svh - 470px) / 3),170px)}',
    '#p75L .cat-card h2{font-size:14.5px;letter-spacing:.08em}#p75L .cat-line{font-size:13px}#p75L .cat-tag{margin-top:10px;font-size:10.5px;letter-spacing:.18em}#p75L .cat-art{display:none}}'
  ].join('\n');

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var CHEV = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function cards(main, cfg, cat) {
    var label = {}; cfg.cats.forEach(function (c) { label[c[0]] = c[1]; });
    main.querySelector('.cat-grid').innerHTML = cfg.items.filter(function (it) { return cat === 'all' || it[0] === cat; }).map(function (it) {
      var a = ART[it[4]];
      return '<li class="cat-card"><a href="' + esc(it[2]) + '">' +
        '<span class="cat-pic">' + (a ? '<img src="' + WM + a[0] + '" alt="" loading="lazy" decoding="async" title="' + esc(a[1] + ', ' + a[2]) + '">' : '') + '</span>' +
        '<span class="cat-tag">' + esc(label[it[0]]) + '</span><h2>' + esc(it[1]) + '</h2><span class="cat-line">' + esc(it[3]) + '</span>' +
        (a ? '<span class="cat-art"><i>' + esc(a[1]) + '</i> · ' + esc(a[2]) + ' · ' + esc(a[3]) + '</span>' : '') +
        '</a></li>';
    }).join('');
    main.querySelectorAll('.cat-side button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-c') === cat ? 'true' : 'false'); });
  }

  function build(key) {
    var cfg = PAGES[key]; if (!cfg) return;
    var main = window.P75SHELL.mount(key);
    if (main.querySelector('.cat-page')) return;
    if (!document.getElementById('p75cat-css')) { var st = document.createElement('style'); st.id = 'p75cat-css'; st.textContent = CSS; document.head.appendChild(st); }
    var rows = [['all', 'All']].concat(cfg.cats);
    main.innerHTML = '<div class="cat-page"><header class="cat-hd"><span class="cat-eb">' + esc(cfg.eyebrow) + '</span><h1>' + esc(cfg.title) + '</h1></header>' +
      '<div class="cat-body"><nav class="cat-side" aria-label="' + esc(cfg.eyebrow) + ' categories"><ul>' +
      rows.map(function (r) {
        var n = r[0] === 'all' ? cfg.items.length : cfg.items.filter(function (it) { return it[0] === r[0]; }).length;
        return '<li><button type="button" data-c="' + r[0] + '"><span>' + esc(r[1]) + '</span><span class="cat-n">' + n + '</span>' + CHEV + '</button></li>';
      }).join('') + '</ul></nav><ul class="cat-grid" aria-live="polite"></ul></div></div>';
    var q = new URLSearchParams(location.search).get('c');
    var cat = q && rows.some(function (r) { return r[0] === q; }) ? q : 'all';
    cards(main, cfg, cat);
    main.querySelectorAll('.cat-side button').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.getAttribute('data-c'); cards(main, cfg, c);
        var u = new URL(location.href); if (c === 'all') u.searchParams.delete('c'); else u.searchParams.set('c', c);
        history.replaceState(history.state, '', u);
      });
    });
  }
  function withShell(cb) {
    if (window.P75SHELL) return cb();
    if (document.getElementById('p75shell-js')) return;
    var s = document.createElement('script'); s.id = 'p75shell-js';
    s.src = BASE + 'shell/shell.js?v=' + Math.floor(Date.now() / 36e5);
    s.onload = cb; document.body.appendChild(s);
  }
  function render(key) { withShell(function () { build(key); }); }
  function clear(key) {
    var r = document.getElementById('p75L');
    if (r && r.getAttribute('data-page') === key && window.P75SHELL) window.P75SHELL.unmount();
  }
  window.P75CATALOG = { render: render, clear: clear, pages: PAGES };
})();
