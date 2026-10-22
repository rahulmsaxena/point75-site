/* Point75 catalog pages (/kinetics; Briefings at /bond-summary; /education): categories down the left, a card per page on the right, each with its own
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
      'Penelope with the Suitors', 'Pinturicchio, c. 1509', 'National Gallery, London', 'Public domain', 'Penelope_with_the_Suitors_-_Pinturicchio_(National_Gallery).jpg'],
    archive: ['2/20/Lorenzo_Lotto_-_Andrea_Odoni_(1488-1545)_-_Google_Art_Project.jpg/1280px-Lorenzo_Lotto_-_Andrea_Odoni_(1488-1545)_-_Google_Art_Project.jpg',
      'Andrea Odoni', 'Lorenzo Lotto, 1527', 'Royal Collection', 'Public domain', 'Lorenzo_Lotto_-_Andrea_Odoni_(1488-1545)_-_Google_Art_Project.jpg'],
    intro: ['c/c4/Ghirlandaio,_Domenico_-_An_Old_Man_and_His_Grandson_-_Louvre_-_Google_Art_Project.jpg/1280px-Ghirlandaio,_Domenico_-_An_Old_Man_and_His_Grandson_-_Louvre_-_Google_Art_Project.jpg',
      'An Old Man and His Grandson', 'Domenico Ghirlandaio, c. 1490', 'Musée du Louvre, Paris', 'Public domain', 'Ghirlandaio,_Domenico_-_An_Old_Man_and_His_Grandson_-_Louvre_-_Google_Art_Project.jpg'],
    types: ['a/ad/Lorenzo_Monaco,_Coronation_of_the_Virgin,_1409,_London_NG.jpg/1280px-Lorenzo_Monaco,_Coronation_of_the_Virgin,_1409,_London_NG.jpg',
      'The Coronation of the Virgin', 'Lorenzo Monaco, 1409', 'National Gallery, London', 'Public domain', 'Lorenzo_Monaco,_Coronation_of_the_Virgin,_1409,_London_NG.jpg'],
    dictionary: ['d/d4/Bronzino_(Agnolo_di_Cosimo_di_Mariano)_-_Portrait_of_a_Young_Man_-_The_Metropolitan_Museum_of_Art.jpg/1280px-Bronzino_(Agnolo_di_Cosimo_di_Mariano)_-_Portrait_of_a_Young_Man_-_The_Metropolitan_Museum_of_Art.jpg',
      'Portrait of a Young Man', 'Bronzino, 1530s', 'The Metropolitan Museum of Art, New York', 'Public domain', 'Bronzino_(Agnolo_di_Cosimo_di_Mariano)_-_Portrait_of_a_Young_Man_-_The_Metropolitan_Museum_of_Art.jpg'],
    cash: ['1/15/Workshop_of_Andrea_del_Verrocchio._Tobias_and_the_Angel._33x26cm._1470-75._NG_London.jpg/1280px-Workshop_of_Andrea_del_Verrocchio._Tobias_and_the_Angel._33x26cm._1470-75._NG_London.jpg',
      'Tobias and the Angel', 'Workshop of Andrea del Verrocchio, c. 1470–1475', 'National Gallery, London', 'Public domain', 'Workshop_of_Andrea_del_Verrocchio._Tobias_and_the_Angel._33x26cm._1470-75._NG_London.jpg'],
    players: ['3/3c/The_Chess_Game_(Sofonisba_Anguissola)_1555_(4096x3236px).jpg/1280px-The_Chess_Game_(Sofonisba_Anguissola)_1555_(4096x3236px).jpg',
      'The Chess Game', 'Sofonisba Anguissola, 1555', 'National Museum, Poznań', 'Public domain', 'The_Chess_Game_(Sofonisba_Anguissola)_1555_(4096x3236px).jpg'],
    history: ['a/a2/Andrea_Mantegna_(1431-1506)_-_The_Triumphs_of_Caesar,_3._The_Bearers_of_Trophies_and_Bullion_-_RCIN_403960_-_Royal_Collection.jpg/1280px-Andrea_Mantegna_(1431-1506)_-_The_Triumphs_of_Caesar,_3._The_Bearers_of_Trophies_and_Bullion_-_RCIN_403960_-_Royal_Collection.jpg',
      'The Triumphs of Caesar: Bearers of Trophies and Bullion', 'Andrea Mantegna, c. 1484–1492', 'Royal Collection, Hampton Court', 'Public domain', 'Andrea_Mantegna_(1431-1506)_-_The_Triumphs_of_Caesar,_3._The_Bearers_of_Trophies_and_Bullion_-_RCIN_403960_-_Royal_Collection.jpg'],
    fortunes: ['a/a6/Lorenzo_Lotto,_Allegory_of_Virtue_and_Vice,_1505,_NGA_297.jpg/1280px-Lorenzo_Lotto,_Allegory_of_Virtue_and_Vice,_1505,_NGA_297.jpg',
      'Allegory of Virtue and Vice', 'Lorenzo Lotto, 1505', 'National Gallery of Art, Washington', 'CC0', 'Lorenzo_Lotto,_Allegory_of_Virtue_and_Vice,_1505,_NGA_297.jpg']
  };

  var PAGES = {
    kinetics: {
      eyebrow: 'Kinetics', title: 'The forces moving the bond market',
      cats: [['debt', 'Debt'], ['signals', 'Signals']],   // A–Z: headings and the cards under them
      items: [
        ['debt', 'Debt Trap', '/debt-trap', 'How much U.S. debt rolls over, and what it costs.', 'debt'],
        ['signals', 'Economic Indicators', '/economic-indicators', 'Inflation, jobs and growth: the data underneath.', 'indicators'],
        ['signals', 'Pulse', '/pulse', 'The bond market’s vital signs at a glance.', 'pulse']
      ]
    },
    // At /bond-summary, the page that already grouped these
    intelligence: {
      eyebrow: 'Briefings', title: 'Every move, explained',
      cats: [['daily', 'Daily read'], ['news', 'News'], ['history', 'History']],   // News sits under Bond Summary (moved from Kinetics, Oct 2026)
      items: [
        ['daily', 'Today’s Summary', '/intelligent-summary', 'Why yields moved today, the drivers and what to watch.', 'summary'],
        ['news', 'News', '/news', 'Today’s bond, rates and central-bank headlines.', 'news'],
        ['history', 'Archive', '/intelligent-summary#archive', 'Every earlier daily summary, newest first.', 'archive'],
        ['history', 'Insights', '/insights', 'What the biggest voices in bonds are saying.', 'insights']
      ]
    },
    education: {
      eyebrow: 'Education', title: 'Learn the language of bonds',
      cats: [['basics', 'Basics'], ['market', 'The market'], ['stories', 'Stories']],
      items: [
        ['basics', 'Introduction', '/bond-introduction', 'What a bond is, and why its price moves when rates change.', 'intro'],
        ['basics', 'Classification', '/bond-types', 'Treasuries, corporates, mortgage bonds, and ratings from AAA to D.', 'types'],
        ['basics', 'Bond Dictionary', '/bond-dictionary', 'Bond terms in everyday language, from basis points to yield curves.', 'dictionary'],
        ['market', 'Cash Logistics', '/cash-logistics', 'Follow $1,000 from your account to the borrower and back.', 'cash'],
        ['market', 'The Players', '/bond-players', 'Who owns the national debt, and the giants who move the market.', 'players'],
        ['stories', 'A Short History', '/bond-history', 'From clay tablets to a $40 trillion debt.', 'history'],
        ['stories', 'Fortunes Made and Lost', '/bond-fortunes', 'The bond market’s greatest wins and wipeouts.', 'fortunes']
      ]
    }
  };
  // Which catalog a path shows
  var AT = { '/kinetics': 'kinetics', '/bond-summary': 'intelligence', '/education': 'education' };

  var CSS = [
    '#p75L:is([data-page=kinetics],[data-page=intelligence],[data-page=education]) .p75main{min-height:auto}',
    '#p75L .cat-page{flex:1;min-height:0;display:flex;flex-direction:column;width:100%;max-width:1560px;margin:0 auto;padding:6px 46px 10px;font-family:Jost,system-ui,sans-serif;color:#F3F0EA}',
    '#p75L .cat-hd{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 16px;padding-bottom:16px}',
    '#p75L .cat-eb{font-size:12.5px;letter-spacing:.3em;text-transform:uppercase;color:#E6BD3C}',
    '#p75L .cat-hd h1{font:500 19px/1.3 Jost,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#fff}',
    '#p75L .cat-body{flex:1;min-height:0;display:grid;grid-template-columns:260px minmax(0,1fr);gap:40px;align-items:start}',
    '#p75L .cat-side ul{list-style:none;margin:0;padding:0}',
    '#p75L .cat-side li{border-bottom:1px solid #34363C}',
    '#p75L .cat-side button{width:100%;display:flex;align-items:center;gap:12px;min-height:60px;padding:0 14px 0 16px;background:none;border:0;color:#F3F0EA;font:500 14px Jost,sans-serif;letter-spacing:.18em;text-transform:uppercase;text-align:left;cursor:pointer}',
    '#p75L .cat-side button>span:first-child{flex:1}',
    '#p75L .cat-side .cat-n{font-size:12px;letter-spacing:.08em;color:#9D978C}',
    '#p75L .cat-side svg{width:16px;height:16px;flex:none}',
    '#p75L .cat-side button:hover{color:#FFD23F}',
    '#p75L .cat-side button[aria-pressed=true]{background:#1C1D21;color:#fff}',
    '#p75L .cat-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 36px}',
    '#p75L .cat-card{min-width:0}',
    '#p75L .cat-card>a{display:flex;flex-direction:column;color:inherit;text-decoration:none}',
    '#p75L .cat-pic{display:flex;align-items:center;justify-content:center;height:clamp(210px,calc((100svh - 535px) / 2),300px);border-radius:6px;background:radial-gradient(ellipse at 50% 60%,#1D1E22 0%,#121316 72%);overflow:hidden}',
    '#p75L .cat-pic img{max-height:100%;max-width:100%;width:auto;height:auto;display:block;box-shadow:0 10px 30px rgba(0,0,0,.55);transition:transform .6s ease}',
    '#p75L .cat-card>a:hover .cat-pic img{transform:scale(1.03)}',
    '#p75L .cat-groups{min-width:0;display:flex;flex-direction:column;gap:34px}',
    '#p75L .cat-gh{display:flex;align-items:center;gap:18px;margin:0 0 18px;font:600 14.5px Jost,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#E6BD3C}',
    '#p75L .cat-gh::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(201,162,39,.85),rgba(201,162,39,.15))}',
    '#p75L .cat-card h3{margin:14px 0 0;font:500 21px/1.25 Jost,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fff}',
    '#p75L .cat-card>a:hover h3{color:#FFD23F}',
    '#p75L .cat-line{margin:6px 0 0;font-size:15px;line-height:1.45;color:#E6E1D7;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}',
    '#p75L .cat-art{margin-top:6px;font-size:12px;letter-spacing:.02em;color:#A9A397;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#p75L .cat-art i{color:#C9C4B9}',
    '@media (max-width:1200px){#p75L .cat-body{grid-template-columns:220px minmax(0,1fr);gap:28px}#p75L .cat-card h3{font-size:18px}}',
    '@media (max-width:1000px){#p75L .cat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#p75L .cat-pic{height:clamp(140px,calc((100svh - 560px) / 3),260px)}}',
    '@media (max-width:760px){#p75L .cat-page{padding:4px 16px 8px}#p75L .cat-hd h1{font-size:15px;letter-spacing:.14em}#p75L .cat-body{grid-template-columns:1fr;gap:14px}',
    '#p75L .cat-side{margin:0 -16px;overflow-x:auto;scrollbar-width:none}#p75L .cat-side::-webkit-scrollbar{display:none}',
    '#p75L .cat-side ul{display:flex;padding:0 16px;gap:8px;width:max-content}#p75L .cat-side li{border:0}',
    '#p75L .cat-side button{min-height:44px;padding:0 16px;border:1px solid #34363C;border-radius:999px;font-size:12.5px;letter-spacing:.14em;white-space:nowrap}',
    '#p75L .cat-side button[aria-pressed=true]{border-color:#E6BD3C;background:rgba(230,189,60,.1)}#p75L .cat-side svg{display:none}',
    '#p75L .cat-grid{grid-template-columns:1fr 1fr;gap:18px 12px}#p75L .cat-pic{height:clamp(84px,calc((100svh - 640px) / 3),150px)}',
    '#p75L .cat-card h3{margin-top:10px;font-size:14.5px;letter-spacing:.08em}#p75L .cat-line{font-size:13px}#p75L .cat-groups{gap:24px}#p75L .cat-gh{margin-bottom:12px;font-size:12px;letter-spacing:.22em;gap:12px}#p75L .cat-art{display:none}}'
  ].join('\n');

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var CHEV = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function cards(main, cfg, cat) {
    // Cards grouped under their category's heading (a gold rule), in the order of the left column
    main.querySelector('.cat-groups').innerHTML = cfg.cats.filter(function (c) { return cat === 'all' || c[0] === cat; }).map(function (c) {
      var list = cfg.items.filter(function (it) { return it[0] === c[0]; });
      if (!list.length) return '';
      return '<section class="cat-group"><h2 class="cat-gh">' + esc(c[1]) + '</h2><ul class="cat-grid">' + list.map(function (it) {
        var a = ART[it[4]];
        return '<li class="cat-card"><a href="' + esc(it[2]) + '">' +
          '<span class="cat-pic">' + (a ? '<img src="' + WM + a[0] + '" alt="" loading="lazy" decoding="async" title="' + esc(a[1] + ', ' + a[2]) + '">' : '') + '</span>' +
          '<h3>' + esc(it[1]) + '</h3><span class="cat-line">' + esc(it[3]) + '</span>' +
          (a ? '<span class="cat-art"><i>' + esc(a[1]) + '</i> · ' + esc(a[2]) + ' · ' + esc(a[3]) + '</span>' : '') +
          '</a></li>';
      }).join('') + '</ul></section>';
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
      }).join('') + '</ul></nav><div class="cat-groups" aria-live="polite"></div></div></div>';
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

  // ---------- The page's painting beside the page (Kinetics, Intelligence and Education pages) ----------
  // Fixed down the left on screens 1200px and wider (the page moves over to make room), click to enlarge;
  // none on smaller screens. Same as tools.point75.io's tool pages.
  var MEANING = {
    pulse: 'Two doctor saints take the pulse of a sick woman. Pulse does the same for the bond market: a quick read of its vital signs before anything else.',
    indicators: 'Thomas would not believe until he saw the evidence for himself. Economic indicators are that evidence: the data underneath the story.',
    debt: 'Penelope weaves by day and unpicks by night, so the work is never done. A debt trap works the same way: new borrowing undoes the repaying.',
    news: 'An angel brings the news to shepherds in the fields, and everything changes. Markets live on the same moment: the headline that arrives before anyone is ready.',
    summary: 'Jerome at his desk, reading and writing in the quiet of his study. The daily summary is that desk: the day’s moves, read carefully and set down plainly.',
    insights: 'The young Christ debates the learned elders of the temple. Insights weighs what the biggest voices in bonds are saying, and where they disagree.',
    intro: 'An old man and his grandson: the oldest kind of lesson. The introduction starts there, with what a bond is, from the beginning.',
    types: 'Saints set out rank by rank around the throne. Bonds are ranked the same way, from Treasuries and AAA down to D.',
    dictionary: 'A young Florentine with his finger keeping the place in a book. The dictionary is that book, for the language of bonds.',
    cash: 'Tobias travels with the angel Raphael to collect a debt owed to his father, and brings the money home. Cash Logistics follows $1,000 on the same round trip.',
    players: 'Three sisters at the chessboard, every move watched. The bond market is a game of the same kind: who holds what, and who moves next.',
    history: 'Roman soldiers parade the trophies and bullion of conquest. The history of bonds is the history of how states paid for wars like these.',
    fortunes: 'A calm path to virtue on one side, a storm and a broken tree on the other. The bond market’s fortunes have taken both roads.'
  };
  // Page path -> painting, from the catalog cards (the Archive card is the summary page itself, so it is left out)
  var PLATE_AT = {};
  Object.keys(PAGES).forEach(function (k) { PAGES[k].items.forEach(function (it) { if (it[2].indexOf('#') < 0) PLATE_AT[it[2]] = it[4]; }); });
  var PCSS = [
    'html.p75P-on,html.p75P-on body,html.p75P-on main.page{background:#111214!important}',
    'html.p75P-on main.page .page__blocks{margin-left:300px}',
    '@media (min-width:1600px){html.p75P-on main.page .page__blocks{margin-left:340px}}',
    '#p75P{position:fixed;left:28px;top:104px;width:252px;max-height:calc(100vh - 124px);overflow:auto;z-index:50;font-family:Jost,system-ui,sans-serif;color:#F3F0EA;scrollbar-width:none}',
    '#p75P::-webkit-scrollbar{display:none}',
    '@media (min-width:1600px){#p75P{width:288px;left:32px}}',
    '#p75P .pic{position:relative;display:block;width:100%;padding:0;border:0;background:none;cursor:zoom-in}',
    '#p75P .pic img{display:block;width:100%;height:auto;max-height:calc(100vh - 340px);object-fit:contain;object-position:left top;box-shadow:0 10px 30px rgba(0,0,0,.5)}',
    '#p75P .zoom{position:absolute;right:8px;bottom:8px;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:rgba(10,11,12,.7);color:#F3F0EA;opacity:.75}',
    '#p75P .pic:hover .zoom{opacity:1}#p75P .zoom svg{width:15px;height:15px}',
    '#p75P .t,#p75B .t{margin:12px 0 0;font-family:"Hedvig Letters Serif",Georgia,serif;font-size:17px;line-height:1.3;font-style:italic;color:#F3F0EA}',
    '#p75P .a,#p75B .a{margin:3px 0 0;font-size:13.5px;color:#E6BD3C}',
    '#p75P .c,#p75B .c{margin:2px 0 0;font-size:12px;color:#A9A397}',
    '#p75B .c a{color:#D6D1C7}',
    '#p75P .m,#p75B .m{margin:10px 0 0;padding-top:10px;border-top:1px solid #2A2B30;font-size:14.5px;line-height:1.55;color:#D6D1C7}',
    '@media (max-width:1199px){#p75P{display:none}html.p75P-on main.page .page__blocks{margin-left:0}}',
    '#p75B{width:min(1500px,96vw);max-width:none;max-height:94vh;margin:auto;padding:0;border:0;background:transparent;color:#F3F0EA;font-family:Jost,system-ui,sans-serif}',
    '#p75B::backdrop{background:rgba(6,7,8,.92)}',
    '#p75B .in{display:flex;gap:32px;align-items:center;justify-content:center}',
    '#p75B .in>img{display:block;max-width:calc(96vw - 380px);max-height:90vh;width:auto;height:auto;box-shadow:0 20px 60px rgba(0,0,0,.6)}',
    '#p75B .txt{flex:none;width:300px}',
    '#p75B .x{position:fixed;top:18px;right:22px;display:grid;place-items:center;width:44px;height:44px;border:1px solid #3A3B40;border-radius:50%;background:#0D0E10;color:#F3F0EA;cursor:pointer}',
    '#p75B .x:hover{color:#FFD23F;border-color:#FFD23F}#p75B .x svg{width:20px;height:20px}'
  ].join('\n');
  function credit(a, key, withSource) {
    return '<p class="t">' + esc(a[1]) + '</p><p class="a">' + esc(a[2]) + '</p><p class="c">' + esc(a[3]) + ' · ' + esc(a[4]) +
      (withSource ? ' · <a href="https://commons.wikimedia.org/wiki/File:' + a[5] + '" target="_blank" rel="noopener">Source</a>' : '') + '</p>' +
      (MEANING[key] ? '<p class="m">' + esc(MEANING[key]) + '</p>' : '');
  }
  function plate(path) {
    var key = PLATE_AT[path], el = document.getElementById('p75P');
    if (!key || !ART[key]) { if (el) el.remove(); var bx = document.getElementById('p75B'); if (bx) bx.remove(); document.documentElement.classList.remove('p75P-on'); return; }
    if (el && el.getAttribute('data-k') === key) return;
    if (el) el.remove();
    if (!document.getElementById('p75plate-css')) { var st = document.createElement('style'); st.id = 'p75plate-css'; st.textContent = PCSS; document.head.appendChild(st); }
    var a = ART[key], src = WM + a[0];
    el = document.createElement('aside'); el.id = 'p75P'; el.setAttribute('data-k', key); el.setAttribute('aria-label', 'The painting for this page');
    el.innerHTML = '<button type="button" class="pic" aria-label="Enlarge the painting: ' + esc(a[1]) + '"><img src="' + src + '" alt="" decoding="async">' +
      '<span class="zoom" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>' +
      credit(a, key, false);
    document.body.appendChild(el);
    document.documentElement.classList.add('p75P-on');
    var box = document.getElementById('p75B'); if (box) box.remove();
    box = document.createElement('dialog'); box.id = 'p75B'; box.setAttribute('aria-label', a[1]);
    box.innerHTML = '<div class="in"><img src="' + src + '" alt=""><div class="txt">' + credit(a, key, true) + '</div>' +
      '<button type="button" class="x" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div>';
    document.body.appendChild(box);
    el.querySelector('.pic').addEventListener('click', function () { if (box.showModal) box.showModal(); });
    box.querySelector('.x').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  }
  window.P75CATALOG = { render: render, clear: clear, pages: PAGES, at: AT, plate: plate, plateAt: PLATE_AT };
})();
