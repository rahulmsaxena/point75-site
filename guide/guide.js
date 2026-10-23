/* Point75 - How to use Point75 (/guide): "Read this first". Loaded by p75.js into a blank Hostinger page.
   Where to start for each kind of reader, what every section is for, how to get around and how to read a page.
   Linked from the homepage hero and the menu footer. (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75GUIDE) return;
  var TOOLS = 'https://tools.point75.io';
  var BLUE = '#1FC8FF', RED = '#FF6640', GOLD = '#C9A227';

  // Start by goal: [tag, title, line, button, href]
  var STARTS = [
    ['New to bonds', 'Learn the basics', 'Three short reading paths, from “what is a bond?” to testing your own money.', 'Start here', '/start-here'],
    ['Every day', 'See what moved, and why', 'Today’s Summary explains every move in yields each evening. Pulse shows the vital signs at a glance.', 'Today’s Summary', '/intelligent-summary'],
    ['Your money', 'Test your own portfolio', 'The Ledger puts your mix against the market and stress-tests it. Treasury Finder finds a real bond.', 'Open The Ledger', TOOLS + '/portfolio/ledger']
  ];

  // The map: [section, tagline, what's in it (html), how often, href, colour]
  var MAP = [
    ['Briefings', 'Every move, explained', 'Today’s Summary (why yields moved), Insights (what the biggest voices in bonds are saying), News and the Archive of every earlier summary.', 'Daily', '/bond-summary'],
    ['Journal', 'Essays', 'Rahul’s essays. Each opens with a short summary and a reading level; Listen reads it aloud.', 'As written', '/journal'],
    ['Kinetics', 'The forces moving bonds', 'Pulse (the market’s vital signs), Debt Trap (how much U.S. debt rolls over, and what it costs) and Economic Indicators.', 'Daily', '/kinetics'],
    ['Outlook', 'The odds ahead', 'Where rates, the Fed, inflation, oil, gold, emerging markets, geopolitics, government debt and AI are likely in a year, as scenarios with odds. Plus Who’s Paying for AI?', 'Weekly', TOOLS + '/outlook'],
    ['Tools', 'Work with your own numbers', 'Portfolio (The Ledger, Treasury Finder), Tax & Retirement (Tax Alpha, Retirement Accounts), Intelligence (credit stress, lenders, congressional trading, AI investment) and Macro (geopolitical risk, market crashes).', 'Live', TOOLS + '/'],
    ['Terminal', 'Ask for any number', 'Type a code or plain words, such as <b>10Y</b>, <b>NVDA</b> or <b>RATES</b>, and get the figure, the odds or the page. Press <kbd>/</kbd> anywhere.', 'Live', TOOLS + '/terminal'],
    ['Education', 'Bond guides from the ground up', 'Introduction, Classification, the Bond Dictionary, Cash Logistics, The Players, a short history and the great fortunes made and lost.', 'Read any time', '/education']
  ];

  // Getting around: [keys or label, what]
  var NAV = [
    ['Menu', 'Top left on every page. Each section opens its own list; the links at the bottom lead to this guide, Start here, About, Access & FAQ and Contact.'],
    ['<kbd>/</kbd> or <kbd>Ctrl</kbd> <kbd>K</kbd>', 'Opens the Terminal over any page. Type <b>?</b> in it for its shortcuts. On a phone, use Terminal in the menu.'],
    ['Logo', 'The Point75 mark always brings you back to the homepage and the Journal.'],
    ['Back · Next', 'Pages in a series (Education, Briefings, Kinetics) have back and next links at the top and bottom; on wide screens they sit in the margins.'],
    ['Two sites, one menu', 'point75.io holds the essays, Briefings, Kinetics and Education; tools.point75.io holds Outlook, the tools and the Terminal. The menu is the same on both.']
  ];

  // Reading a page: [mark html, what]
  var READ = [
    ['<span class="tk">Takeaway</span>', 'Pages with tabs open on a Takeaway: the headline in one sentence, one card per tab. Tap a card, or a tab, for the detail.'],
    ['<i style="background:' + BLUE + '"></i><i style="background:' + RED + '"></i><i style="background:' + GOLD + '"></i>', '<b style="color:' + BLUE + '">Blue</b> is good, <b style="color:' + RED + '">red</b> is bad, <b style="color:' + GOLD + '">gold</b> means look here. Dials read the same way: the needle shows where things stand on the scale.'],
    ['<span class="lv">Easy</span><span class="lv">Medium</span><span class="lv">Advanced</span>', 'Every essay, guide and data page carries a level. Easy needs no background; Advanced is written for people who follow credit markets. The Bond Dictionary explains any term.'],
    ['<span class="tk">Updated</span>', 'Data pages say when their numbers were last refreshed. Sources and notes sit on one line at the bottom; tap to read them in full.'],
    ['<span class="tk">TL;DR · Listen</span>', 'Essays open with a short summary; the full piece is folded under “Continue reading”. Listen has it read aloud.'],
    ['<span class="tk">Share</span>', 'Every essay has a share row, and copied quotes carry their link. Any Terminal answer can be shared as a link.']
  ];

  var CSS =
    '.p75guide{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--soft:#DCD6C9;--muted:#C8C2B6;--gold:#C9A227;--blue:#1FC8FF;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75guide *{box-sizing:border-box}' +
    '.p75guide .wrap{max-width:1040px;margin:0 auto;padding:4px 20px 56px}' +
    '.p75guide .eyebrow{color:var(--gold);letter-spacing:.12em;font-size:12.5px;font-weight:800;text-transform:uppercase}' +
    '.p75guide h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:4px 0 8px;color:#fff;letter-spacing:-.01em;display:inline-block;vertical-align:baseline;max-width:100%}' +
    '.p75guide .eyebrow:has(+ h1){display:inline-block;margin-right:14px;vertical-align:baseline}' +
    '.p75guide .lede{color:var(--soft);font-size:15.5px;line-height:1.6;margin:0 0 16px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75guide h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:23px;color:#fff;margin:30px 0 4px}' +
    '.p75guide h2 + .hint{margin:0 0 12px;color:var(--muted);font-size:14.5px}' +
    '.p75guide a{color:inherit;text-decoration:none}' +
    '.p75guide .g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}' +
    '.p75guide .start{display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);border-radius:8px;padding:16px 18px;transition:transform .15s,border-color .15s}' +
    '.p75guide .start:hover,.p75guide .sec:hover{transform:translateY(-2px);border-color:#55575e}' +
    '.p75guide .start small,.p75guide .sec small{display:block;color:var(--gold);font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}' +
    '.p75guide .start b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:21px;color:#fff;margin-bottom:6px}' +
    '.p75guide .start span{flex:1;font-size:14px;line-height:1.5;color:var(--soft)}' +
    '.p75guide .start i,.p75guide .sec i{font-style:normal;color:var(--gold);font-weight:700;font-size:14px;margin-top:10px}' +
    '.p75guide .map{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}' +
    '.p75guide .sec{display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:14px 16px;transition:transform .15s,border-color .15s}' +
    '.p75guide .sec .hd{display:flex;align-items:baseline;justify-content:space-between;gap:8px}' +
    '.p75guide .sec b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:21px;color:#fff}' +
    '.p75guide .sec em{font-style:normal;font-size:11.5px;font-weight:700;letter-spacing:.06em;color:var(--blue);white-space:nowrap;border:1px solid rgba(31,200,255,.35);border-radius:99px;padding:2px 8px}' +
    '.p75guide .sec .tg{display:block;margin:2px 0 6px;color:var(--gold);font-size:13.5px;font-weight:600}' +
    '.p75guide .sec span.tx{flex:1;font-size:14px;line-height:1.5;color:var(--soft)}' +
    '.p75guide .sec span.tx b{font-family:"Geist",Manrope,system-ui,sans-serif;font-weight:600;font-size:13.5px;color:#FFD23F}' +
    '.p75guide .sec.soon{border-style:dashed;justify-content:center}' +
    '.p75guide .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px 28px}' +
    '.p75guide dl{margin:0}' +
    '.p75guide dl>div{display:grid;grid-template-columns:150px minmax(0,1fr);gap:12px;align-items:baseline;padding:10px 0;border-top:1px solid var(--line)}' +
    '.p75guide dt{color:#fff;font-weight:700;font-size:14.5px}' +
    '.p75guide dd{margin:0;color:var(--soft);font-size:14.5px;line-height:1.55}' +
    '.p75guide dd b{color:#fff}' +
    '.p75guide kbd{display:inline-block;padding:1px 7px;border:1px solid #4A4C52;border-bottom-width:2px;border-radius:6px;background:var(--panel);font:600 13px "Geist",Manrope,system-ui,sans-serif;color:#fff}' +
    '.p75guide dt i{display:inline-block;width:14px;height:14px;border-radius:50%;margin-right:5px;vertical-align:-2px}' +
    '.p75guide .tk{display:inline-block;padding:2px 9px;border-radius:99px;background:var(--gold);color:#111214;font-size:12px;font-weight:800;letter-spacing:.04em}' +
    '.p75guide .lv{display:inline-block;margin:0 4px 4px 0;padding:1px 7px;border:1px solid #4A4C52;border-radius:99px;font-size:11.5px;font-weight:700;color:var(--soft)}' +
    '.p75guide .end{margin-top:28px;padding-top:14px;border-top:1px solid var(--line);color:var(--soft);font-size:14.5px}' +
    '.p75guide .end a{color:var(--gold);font-weight:700}.p75guide .end a:hover{color:#F2D27A}' +
    '.p75guide a:focus-visible{outline:3px solid #F2D27A;outline-offset:2px;border-radius:8px}' +
    '@media (prefers-reduced-motion:reduce){.p75guide .start,.p75guide .sec{transition:none}.p75guide .start:hover,.p75guide .sec:hover{transform:none}}' +
    '@media (max-width:960px){.p75guide .map{grid-template-columns:repeat(2,minmax(0,1fr))}.p75guide .two{grid-template-columns:1fr;gap:0}}' +
    '@media (max-width:700px){.p75guide .g3{grid-template-columns:1fr;gap:10px}}' +
    '@media (max-width:600px){.p75guide .wrap{padding:4px 16px 44px}.p75guide h1{font-size:24px}.p75guide .lede{text-align:left}' +
      '.p75guide .map{grid-template-columns:1fr;gap:10px}.p75guide dl>div{grid-template-columns:1fr;gap:4px}}';

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  function page() {
    return '<div class="wrap">' +
      '<div class="eyebrow">Read this first</div><h1>How to Use Point75</h1>' +
      '<p class="lede">Point75 explains what moves the bond market and what it could mean for your money: daily briefings, forward odds, essays, tools you can run on your own numbers, and a Terminal that answers with any figure. Everything here is free to explore. This page shows where to start, what each part is for and how to get around.</p>' +

      '<h2>Where to start</h2><p class="hint">Pick the one that sounds like you.</p><div class="g3">' +
      STARTS.map(function (s) {
        return '<a class="start" href="' + s[4] + '"><small>' + esc(s[0]) + '</small><b>' + esc(s[1]) + '</b><span>' + esc(s[2]) + '</span><i>' + esc(s[3]) + ' ›</i></a>';
      }).join('') + '</div>' +

      '<h2>What each part is for</h2><p class="hint">The same sections as the menu. Each card opens its page.</p><div class="map">' +
      MAP.map(function (m) {
        return '<a class="sec" href="' + m[4] + '"><span class="hd"><b>' + esc(m[0]) + '</b><em>' + esc(m[3]) + '</em></span>' +
          '<span class="tg">' + esc(m[1]) + '</span><span class="tx">' + m[2] + '</span><i>Open ' + esc(m[0]) + ' ›</i></a>';
      }).join('') +
      '<div class="sec soon"><small>Coming next</small><b>Sectors</b><span class="tx">The parts of the economy that move bonds: power, defense, healthcare, minerals, freight.</span></div></div>' +

      '<div class="two"><div><h2>Getting around</h2><dl>' +
      NAV.map(function (n) { return '<div><dt>' + n[0] + '</dt><dd>' + n[1] + '</dd></div>'; }).join('') +
      '</dl></div><div><h2>Reading a page</h2><dl>' +
      READ.map(function (n) { return '<div><dt>' + n[0] + '</dt><dd>' + n[1] + '</dd></div>'; }).join('') +
      '</dl></div></div>' +

      '<p class="end">Questions about what’s free, membership or terms? See <a href="/access">Access &amp; FAQ</a>. Anything else, <a href="/contact">write to Rahul</a>.</p>' +
      '</div>';
  }

  function render() {
    if (document.querySelector('.p75guide')) return;
    if (!document.getElementById('p75guide-css')) {
      var st = document.createElement('style'); st.id = 'p75guide-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var main = document.querySelector('main') || document.body;
    var host = document.createElement('div'); host.className = 'p75guide';
    host.innerHTML = page();
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
    // The Hostinger page is blank; hide its empty sections so they don't show as a tall band above the page
    if (blocks) [].forEach.call(blocks.children, function (sec) {
      if (sec.tagName !== 'SECTION' || (sec.innerText || '').trim() || sec.querySelector('img, iframe, video, canvas, svg, form')) return;
      sec.setAttribute('data-p75guide-hid', '1'); sec.style.display = 'none';
    });
  }
  function clear() {
    var h = document.querySelector('.p75guide'); if (h) h.remove();
    document.querySelectorAll('[data-p75guide-hid]').forEach(function (s) { s.style.display = ''; s.removeAttribute('data-p75guide-hid'); });
  }

  window.P75GUIDE = { render: render, clear: clear };
})();
