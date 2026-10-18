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
    '/bond-summary': { blurb: 'How credit and the Treasury market are holding up: the daily summary, credit stress, sectors, lenders and what big investors are saying.', cta: 'Open Bond Summary' },
    '/economic-indicators': { blurb: 'The latest U.S. economic data: inflation, jobs, growth and more.', cta: 'See the indicators' },
    '/intelligent-summary': { blurb: 'Daily close summary of the Treasury market: why yields moved, the curve, Fed pricing and what to watch next.', cta: 'Read the summary' },
    '/credit-stress': { blurb: 'Where corporate credit is showing cracks: delinquencies, write-offs, commercial real estate and companies that can’t cover interest.', cta: 'Open' },
    '/sector-credit': { blurb: 'Corporate debt sector by sector: the biggest borrowers, leverage, interest coverage and how they are financed.', cta: 'Open' },
    '/lenders': { blurb: 'Who lends corporate America its short-term money: money market funds, insurers, pension funds, banks and private credit.', cta: 'Open' },
    '/insights': { blurb: 'What the big bond investors are saying: where they agree, where they differ and what they are doing.', cta: 'Open' }
  };

  // Page heading and introduction per hub
  var HEAD = {
    '/kinetics': { eyebrow: 'Kinetics', title: 'The Forces Moving the Bond Market', lede: 'Five ways in: the market’s pulse, the government’s debt bill, the state of credit, the day’s news and the economic numbers underneath. Pick where you’d like to start.' },
    '/bond-summary': { eyebrow: 'Kinetics', title: 'Bond Summary', lede: 'How credit markets are holding up. Start with the daily summary, or go straight to the part you care about.' }
  };

  var CSS =
    '.p75hubpg{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--soft:#D9D3C6;--muted:#8D887E;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75hubpg *{box-sizing:border-box}' +
    '.p75hubpg .wrap{max-width:1040px;margin:0 auto;padding:16px 20px 64px}' +
    '.p75hubpg .crumb{font-size:13.5px;color:var(--muted);margin:0 0 22px}' +
    '.p75hubpg .crumb a{color:#A9A396;text-decoration:none}.p75hubpg .crumb a:hover{color:var(--cream)}' +
    '.p75hubpg .crumb span{margin:0 8px}' +
    '.p75hubpg .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75hubpg h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:4px 0 8px;letter-spacing:-.01em;color:#fff;display:inline-block;vertical-align:baseline;max-width:100%}' +
    '.p75hubpg .eyebrow:has(+ h1){display:inline-block;margin-right:14px;vertical-align:baseline}' +
    '.p75hubpg .lede{color:var(--soft);font-size:15.5px;line-height:1.6;margin:0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75hubpg .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:40px}' +
    '.p75hubpg .grid.four{grid-template-columns:repeat(4,minmax(0,1fr))}' +
    '.p75hubpg a.card{display:flex;flex-direction:column;gap:10px;min-height:220px;padding:28px 26px 24px;background:var(--panel);border:1px solid var(--line);' +
      'border-top:2px solid var(--gold);border-radius:4px;color:var(--cream);text-decoration:none;transition:border-color .15s,background .15s}' +
    '.p75hubpg a.card:hover,.p75hubpg a.card:focus-visible{border-color:var(--gold);background:#1C1D21;outline:none}' +
    '.p75hubpg .num{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:15px;color:var(--gold)}' +
    '.p75hubpg .nm{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:28px;line-height:1.15;color:#fff}' +
    '.p75hubpg .bl{font-size:15px;line-height:1.6;color:var(--soft)}' +
    '.p75hubpg .inside{margin-top:auto;font-size:13px;line-height:1.7;color:var(--muted)}' +
    '.p75hubpg .go{font-size:14.5px;font-weight:700;color:var(--gold)}' +
    '.p75hubpg .inside + .go{margin-top:0}.p75hubpg .bl + .go{margin-top:auto}' +
    '.p75hubpg .grid.four a.card{border-top-width:1px;min-height:230px}.p75hubpg .grid.four .nm{font-size:23px}' +
    // the featured summary card on Bond Summary
    '.p75hubpg a.feat{display:flex;align-items:center;justify-content:space-between;gap:32px;margin-top:36px;padding:28px 30px;background:var(--panel);' +
      'border:1px solid var(--line);border-left:2px solid var(--gold);border-radius:4px;color:var(--cream);text-decoration:none;transition:border-color .15s,background .15s}' +
    '.p75hubpg a.feat:hover,.p75hubpg a.feat:focus-visible{border-color:var(--gold);background:#1C1D21;outline:none}' +
    '.p75hubpg .feat .t{display:flex;flex-direction:column;gap:8px;min-width:0}' +
    '.p75hubpg .feat .ey{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:700}' +
    '.p75hubpg .feat .hd{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:25px;line-height:1.25;color:#fff}' +
    '.p75hubpg .feat .tk{font-size:15px;line-height:1.6;color:var(--soft)}' +
    '.p75hubpg .feat .go{white-space:nowrap}' +
    '.p75hubpg .grid.four{margin-top:20px}' +
    '@media (max-width:900px){.p75hubpg .grid.four{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    // Bond Summary overview: latest summary line and a plain list of its tabs
    '.p75hubpg .latest{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;margin-top:26px;padding:4px 0 4px 18px;border-left:2px solid var(--gold);text-decoration:none;color:var(--cream)}' +
    '.p75hubpg .latest .ey{flex-basis:100%;color:var(--gold);font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75hubpg .latest .hd{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:22px;line-height:1.3;color:#fff}' +
    '.p75hubpg .latest .go{color:var(--gold);font-weight:800;font-size:14px;white-space:nowrap}' +
    '.p75hubpg .latest:hover .hd{color:#F2D27A}' +
    '.p75hubpg .what{margin:30px 0 0;border-top:1px solid var(--line)}' +
    '.p75hubpg .what div{display:grid;grid-template-columns:200px minmax(0,1fr);gap:6px 20px;padding:14px 0;border-bottom:1px solid var(--line)}' +
    '.p75hubpg .what dt a{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:19px;color:#fff;text-decoration:none}' +
    '.p75hubpg .what dt a:hover{color:var(--gold)}' +
    '.p75hubpg .what dd{margin:0;color:var(--soft);font-size:15px;line-height:1.55}' +
    '@media (max-width:640px){.p75hubpg .what div{grid-template-columns:1fr}.p75hubpg .latest .hd{font-size:19px}}' +
    '@media (max-width:640px){.p75hubpg .wrap{padding:12px 16px 48px}.p75hubpg h1{font-size:24px}.p75hubpg .lede{font-size:16px}' +
      '.p75hubpg .grid,.p75hubpg .grid.four{grid-template-columns:1fr;gap:14px;margin-top:28px}.p75hubpg a.card{min-height:0;padding:22px 20px}' +
      '.p75hubpg .nm{font-size:25px}.p75hubpg a.feat{flex-direction:column;align-items:flex-start;gap:14px;padding:22px 20px}.p75hubpg .feat .hd{font-size:22px}}';

  function esc(x) { return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function once() {
    if (document.getElementById('p75hubpg-css')) return;
    var st = document.createElement('style'); st.id = 'p75hubpg-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  // A card for one page. `inside` lists the pages under it (shown as a hint of what's there).
  function card(k, i, numbered) {
    var c = CARD[k.href] || {};
    var inside = k.kids && k.kids.length ? k.kids.map(function (x) { return esc(x.text); }).join(' · ') : '';
    return '<a class="card" href="' + esc(k.href) + '">' +
      (numbered ? '<span class="num">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' : '') +
      '<span class="nm">' + esc(k.text) + '</span>' +
      (c.blurb ? '<span class="bl">' + esc(c.blurb) + '</span>' : '') +
      (inside ? '<span class="inside">' + inside + '</span>' : '') +
      '<span class="go">' + esc(c.cta || 'Open') + ' →</span></a>';
  }

  function page(path, node, parent, latest) {
    var h = HEAD[path] || { eyebrow: parent ? parent.text : '', title: node.text, lede: '' };
    var html = '<div class="wrap">';
    if (parent && path !== '/bond-summary') html += '<nav class="crumb" aria-label="Breadcrumb"><a href="' + esc(parent.href) + '">' + esc(parent.text) + '</a><span aria-hidden="true">/</span>' + esc(node.text) + '</nav>';
    html += '<div class="eyebrow">' + esc(h.eyebrow) + '</div><h1>' + esc(h.title) + '</h1>' + (h.lede ? '<p class="lede">' + esc(h.lede) + '</p>' : '');
    var kids = node.kids || [];
    if (path === '/bond-summary') {
      // Bond Summary's pages are tabs (the strip above, drawn by p75.js), so the overview has no cards:
      // the latest daily summary's headline on one line, then what each tab holds, as a plain list.
      var first = kids[0];
      html += '<a class="latest" href="' + esc(first.href) + '"><span class="ey">' + (latest ? 'Latest summary · ' + esc(latest.when) : 'The daily summary') + '</span>' +
        '<span class="hd">' + esc(latest ? latest.title : (CARD[first.href] || {}).blurb || first.text) + '</span><span class="go">Read it →</span></a>';
      html += '<dl class="what">' + kids.map(function (k) {
        return '<div><dt><a href="' + esc(k.href) + '">' + esc(k.text) + '</a></dt><dd>' + esc((CARD[k.href] || {}).blurb || '') + '</dd></div>';
      }).join('') + '</dl>';
    } else {
      html += '<div class="grid">' + kids.map(function (k, i) { return card(k, i, true); }).join('') + '</div>';
    }
    return html + '</div>';
  }

  // The site can rebuild the page while the summary is loading, so callers queue up and all hear back
  var latest = null, loading = false, waiting = [];
  function loadLatest(cb) {
    if (latest) return cb(latest);
    waiting.push(cb);
    if (loading) return; loading = true;
    fetch(EDITIONS).then(function (r) { return r.json(); }).then(function (j) {
      var s = (j && j.summaries || []).filter(function (e) { return e && e.title; })
        .sort(function (a, b) { return String(b.generated_at || b.key).localeCompare(String(a.generated_at || a.key)); })[0];
      if (s) {
        var d = new Date((s.market_date || s.key) + 'T12:00:00Z');
        latest = { title: s.title, regime: s.regime || '', note: s.regime_note || '',
          when: isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }) };
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
