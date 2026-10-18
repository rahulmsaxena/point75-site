/* Point75 - Start here (/start-here). Loaded by p75.js.
   Three short reading paths for newcomers, and what the Easy / Medium / Advanced labels on each page mean.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75START) return;
  var TOOLS = 'https://tools.point75.io';

  // [tag, title, who it's for, button label, steps: [name, why, href]]
  var PATHS = [
    ['Path 1 · Easy', 'I’m new to bonds', 'You’ve heard the word and want to know how bonds actually work.', 'Begin with the Introduction', [
      ['Introduction', 'What a bond is, and how futures and options fit around it.', '/bond-introduction'],
      ['Classification', 'Treasuries, munis, company bonds: the main kinds.', '/bond-types'],
      ['Bond Dictionary', 'Keep it open: every term, in plain words.', '/bond-dictionary'],
      ['T-bill, CD or savings?', 'Put it to use: what your cash would actually earn, after tax.', TOOLS + '/market-intelligence/treasury-finder']]],
    ['Path 2 · Medium', 'I want to understand the market', 'You invest already and want to know what’s moving rates, and why.', 'Read the first essay', [
      ['Let The Fed be Fed', 'An essay on who’s really setting rates.', '/let-the-fed-be-fed'],
      ['Pulse', 'The bond market’s vital signs, today.', '/pulse'],
      ['Daily Summary', 'Why yields moved, every evening.', '/intelligent-summary'],
      ['Economic Indicators', 'The numbers underneath it all.', '/economic-indicators']]],
    ['Path 3 · Hands-on', 'I want to test my own money', 'You have a portfolio, or are building one, and want to see how it holds up.', 'Open The Ledger', [
      ['The Ledger', 'Your mix against the market, five years back.', TOOLS + '/portfolio/ledger'],
      ['Stress tests', 'What rising yields or a tech reset would cost it.', TOOLS + '/portfolio/ledger#stress'],
      ['Stocks or a bond?', 'What a plain bond would pay instead.', TOOLS + '/portfolio/ledger#bond'],
      ['Treasury Finder', 'Find a real Treasury and see how it would behave.', TOOLS + '/market-intelligence/treasury-finder']]]
  ];

  var LEVELS = [
    ['easy', 'Easy', 'No background needed. Every term is explained as it comes up.'],
    ['medium', 'Medium', 'Assumes you know what a yield is and why prices fall when rates rise.'],
    ['advanced', 'Advanced', 'Written for people who follow credit markets, with links back to the basics.']
  ];

  var CSS =
    '.p75start{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--soft:#D9D3C6;--muted:#B8B2A5;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75start *{box-sizing:border-box}' +
    '.p75start .wrap{max-width:1100px;margin:0 auto;padding:16px 20px 72px}' +
    '.p75start .eyebrow{color:var(--gold);letter-spacing:.1em;font-size:12.5px;font-weight:800;text-transform:uppercase}' +
    '.p75start h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:4px 0 8px;color:#fff;letter-spacing:-.01em;display:inline-block;vertical-align:baseline;max-width:100%}' +
    '.p75start .eyebrow:has(+ h1){display:inline-block;margin-right:14px;vertical-align:baseline}' +
    '.p75start .lede{color:var(--soft);font-size:15.5px;line-height:1.6;margin:0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75start .paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:40px}' +
    '.p75start .path{display:flex;flex-direction:column;gap:14px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);border-radius:6px;padding:24px 22px}' +
    '.p75start .tag{font-size:12.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}' +
    '.p75start h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:26px;line-height:1.2;margin:0;color:#fff}' +
    '.p75start .who{margin:0;font-size:15px;line-height:1.55;color:var(--soft)}' +
    '.p75start ol{list-style:none;margin:4px 0 0;padding:0;border-top:1px solid var(--line)}' +
    '.p75start li{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}' +
    '.p75start li .n{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:15px;color:var(--gold);min-width:18px}' +
    '.p75start li a{display:block;font-size:15.5px;font-weight:700;color:#fff;text-decoration:none}' +
    '.p75start li a:hover,.p75start li a:focus-visible{color:var(--gold);outline:none}' +
    '.p75start li span.why{display:block;font-size:13.5px;line-height:1.45;color:var(--muted);margin-top:3px}' +
    '.p75start .go{margin-top:auto;display:flex;align-items:center;justify-content:center;min-height:46px;border-radius:23px;background:var(--gold);color:#111214;font-weight:800;font-size:14.5px;text-decoration:none;padding:0 16px;text-align:center}' +
    '.p75start .go:hover,.p75start .go:focus-visible{background:#E0B53A;outline:none}' +
    '.p75start .levels{margin-top:44px;border-top:1px solid var(--line);padding-top:26px;display:grid;grid-template-columns:220px repeat(3,minmax(0,1fr));gap:24px;align-items:start}' +
    '.p75start .levels h2{font:800 12.5px Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--gold)}' +
    '.p75start .levels p{margin:6px 0 0;font-size:14px;line-height:1.5;color:var(--soft)}' +
    '@media (max-width:900px){.p75start .paths{grid-template-columns:1fr}.p75start .levels{grid-template-columns:1fr;gap:16px}.p75start h1{font-size:24px}.p75start .wrap{padding:12px 16px 56px}}';

  function once() {
    if (document.getElementById('p75start-css')) return;
    var st = document.createElement('style'); st.id = 'p75start-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function badge(key, label) { return '<span class="p75lvl p75lvl--' + key + '">' + label + '</span>'; }

  function page() {
    return '<div class="wrap"><div class="eyebrow">Start here</div><h1>Where Would You Like to Begin?</h1>' +
      '<p class="lede">Point75 covers bonds from the very first idea to the plumbing of the market. Pick the path that sounds like you. Each one ends somewhere useful.</p>' +
      '<div class="paths">' + PATHS.map(function (p) {
        return '<section class="path" aria-label="' + p[1] + '"><span class="tag">' + p[0] + '</span><h2>' + p[1] + '</h2><p class="who">' + p[2] + '</p><ol>' +
          p[4].map(function (s, i) {
            return '<li><span class="n">' + (i + 1) + '</span><span><a href="' + s[2] + '">' + s[0] + '</a><span class="why">' + s[1] + '</span></span></li>';
          }).join('') + '</ol><a class="go" href="' + p[4][0][2] + '">' + p[3] + ' &rarr;</a></section>';
      }).join('') + '</div>' +
      '<section class="levels" aria-label="Reading levels"><h2>The levels you’ll see on every page</h2>' +
      LEVELS.map(function (l) { return '<div>' + badge(l[0], l[1]) + '<p>' + l[2] + '</p></div>'; }).join('') + '</section></div>';
  }

  function render() {
    if (document.querySelector('.p75start')) return;
    once();
    var main = document.querySelector('main') || document.body;
    var host = document.createElement('div'); host.className = 'p75start';
    host.innerHTML = page();
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
  }
  function clear() { var h = document.querySelector('.p75start'); if (h) h.remove(); }

  window.P75START = { render: render, clear: clear };
})();
