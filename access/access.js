/* Point75 - Access & FAQ (/access). Loaded by p75.js into a blank Hostinger page.
   What is free now, what membership will add and cost, terms of use, privacy and how to reach Rahul.
   While point75-tools OPEN_ACCESS is on, everything is free; set OPEN below to false when the walls return.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75ACCESS) return;
  var OPEN = true;                       // mirror of point75-tools config/membership.ts OPEN_ACCESS
  var TOOLS = 'https://tools.point75.io';
  var UPDATED = '23 October 2026';
  var PRICE = { mE: 15, yE: 150, mL: 19, yL: 190 };   // point75-tools config/membership.ts PRICES

  // [id, question, answer html]
  var FAQ = [
    ['free', 'Is it really all free?', OPEN ?
      '<p>Yes, for now. Every Outlook topic, every company in <a href="' + TOOLS + '/outlook/ai-spending">Who’s Paying for AI?</a> and every answer in the <a href="' + TOOLS + '/terminal">Terminal</a> is open to everyone, with no account. Explore as much as you like.</p>' +
      '<p>A paid membership will come back later for the deepest analysis. The essays, Briefings, Pulse, Education and the everyday tools stay free either way.</p>' :
      '<p>Most of it. The essays, Briefings, Pulse, Education, the everyday tools and one full Outlook topic (Oil) are free. The full Outlook, company figures and some Terminal answers are for members.</p>'],
    ['members', 'What will membership add?',
      '<ul><li><b>Outlook in full:</b> every scenario’s curve, the odds behind it and the written analysis, refreshed weekly.</li>' +
      '<li><b>Who’s Paying for AI?:</b> each of the 12 AI builders’ spending, funding and strain, from their SEC filings.</li>' +
      '<li><b>Terminal:</b> company look-ups, side-by-side comparisons and the strain ranking.</li></ul>'],
    ['cost', 'What will it cost?',
      '<p>Founding members: <b>$' + PRICE.mE + ' a month</b> or <b>$' + PRICE.yE + ' a year</b>, kept for as long as you stay a member. After that, $' + PRICE.mL + ' a month or $' + PRICE.yL + ' a year.</p>' +
      (OPEN ? '<p>There is nothing to pay today. Founding prices will be announced here and in the Journal before anything changes.</p>' : '')],
    ['account', 'Do I need an account?',
      '<p>No. Nothing on Point75 needs an account' + (OPEN ? ' right now' : ' except the members’ pages') + '. <b>Sign in</b> at the top of the page is only for members, using the link from their approval email.</p>'],
    ['data', 'Where do the numbers come from?',
      '<p>Public sources: the Federal Reserve Bank of St. Louis (FRED), the US Treasury, company filings with the SEC and congressional disclosures. On top of those sit Point75’s own models and judgement. Each page names its sources and says when it was last updated.</p>'],
    ['advice', 'Is any of this financial advice?',
      '<p>No. Point75 is general market commentary and education, the same for everyone. It is not financial, investment, tax or legal advice, and it doesn’t know your circumstances. Odds are probabilities, not promises. Do your own research and talk to a qualified professional before you act.</p>'],
    ['terms', 'Terms of use',
      '<p class="p75acc-upd">Last updated ' + UPDATED + '</p><ol>' +
      '<li><b>Use it freely, for yourself.</b> Read, use the tools and run the Terminal for your own investing, study or work.</li>' +
      '<li><b>Share with credit.</b> Link to any page, and quote a figure or a short passage with credit to Point75 and a link back.</li>' +
      '<li><b>Don’t copy wholesale.</b> No republishing essays, tables or Outlook analysis, and no reselling Point75’s figures, without written permission.</li>' +
      '<li><b>No bulk downloading.</b> Please don’t scrape the sites or call their data addresses automatically. If you need the data in bulk, ask.</li>' +
      '<li><b>No advice, no guarantee.</b> Everything is provided as is. Figures can be late or wrong, and Point75 isn’t liable for decisions made with them.</li>' +
      '<li><b>Changes.</b> These terms and what’s free may change. The date above shows the latest version.</li></ol>' +
      '<p>Essays, audio and photographs © Rahul Saxena. All rights reserved.</p>'],
    ['privacy', 'What do you keep about me?',
      '<p>Reading Point75 and using the tools keeps nothing about you: no account and no advertising trackers. The Terminal remembers your last few commands in your own browser only.</p>' +
      '<p>If you write through the contact page or apply for membership, your name, email and message are kept to reply and to run your membership, never sold or shared. The full note is on the <a href="' + TOOLS + '/privacy">privacy page</a>.</p>'],
    ['api', 'Is there an API?',
      '<p>Not yet. If you’d use one, for a spreadsheet, a model or an app, <a href="/contact">say what you’d want from it</a>. That decides what comes first.</p>'],
    ['contact', 'How do I reach Rahul?',
      '<p>Through the <a href="/contact">contact page</a>. Questions, corrections, tool ideas and data requests all land in the same inbox and get a reply.</p>']
  ];

  var CSS =
    '.p75acc{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--soft:#DCD6C9;--muted:#C8C2B6;--gold:#C9A227;--blue:#1FC8FF;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75acc *{box-sizing:border-box}' +
    '.p75acc .wrap{max-width:900px;margin:0 auto;padding:4px 20px 56px}' +
    '.p75acc .eyebrow{color:var(--gold);letter-spacing:.12em;font-size:12.5px;font-weight:800;text-transform:uppercase}' +
    '.p75acc h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:4px 0 8px;color:#fff;letter-spacing:-.01em;display:inline-block;vertical-align:baseline;max-width:100%}' +
    '.p75acc .eyebrow:has(+ h1){display:inline-block;margin-right:14px;vertical-align:baseline}' +
    '.p75acc .lede{color:var(--soft);font-size:15.5px;line-height:1.6;margin:0 0 18px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75acc .lede b{color:var(--blue);font-weight:700}' +
    '.p75acc .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:0 0 26px}' +
    '.p75acc .card{display:block;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--c,var(--gold));border-radius:8px;padding:16px 18px;color:inherit;text-decoration:none;transition:transform .15s,border-color .15s}' +
    '.p75acc .card:hover{transform:translateY(-2px);border-color:#55575e;border-top-color:var(--c,var(--gold))}' +
    '.p75acc .card small{display:block;color:var(--c,var(--gold));font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}' +
    '.p75acc .card b{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:22px;line-height:1.2;color:#fff;margin-bottom:6px}' +
    '.p75acc .card span{display:block;font-size:14px;line-height:1.5;color:var(--soft)}' +
    '.p75acc .card i{font-style:normal;color:var(--c,var(--gold));font-weight:700;white-space:nowrap}' +
    '.p75acc h2{font-size:23px;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;color:#fff;margin:0 0 8px}' +
    '.p75acc .qs{border-top:1px solid var(--line)}' +
    '.p75acc .q{border-bottom:1px solid var(--line)}' +
    '.p75acc .q>h3{margin:0;font:inherit}' +
    '.p75acc .qb{display:flex;align-items:center;gap:14px;width:100%;min-height:52px;padding:12px 2px;border:0;background:none;color:#fff;font:700 16px/1.4 Manrope,system-ui,sans-serif;text-align:left;cursor:pointer}' +
    '.p75acc .qb:hover{color:#F2D27A}' +
    '.p75acc .qb:focus-visible{outline:3px solid #F2D27A;outline-offset:2px;border-radius:6px}' +
    '.p75acc .qb .t{flex:1;min-width:0}' +
    '.p75acc .chev{flex:none;width:28px;height:28px;border-radius:50%;border:1px solid #4A4C52;display:grid;place-items:center;transition:transform .3s,border-color .2s}' +
    '.p75acc .qb[aria-expanded="true"] .chev{transform:rotate(180deg);border-color:var(--gold)}' +
    '.p75acc .qb[aria-expanded="true"]{color:#F2D27A}' +
    '.p75acc .qa{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s ease}' +
    '.p75acc .qa.open{grid-template-rows:1fr}' +
    '.p75acc .qa>div{overflow:hidden;min-height:0}' +
    '.p75acc .qa .in{padding:0 2px 16px;color:var(--soft);font-size:15.5px;line-height:1.65;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75acc .qa p{margin:0 0 10px}.p75acc .qa p:last-child{margin-bottom:0}' +
    '.p75acc .qa ul,.p75acc .qa ol{margin:0 0 10px;padding-left:22px}.p75acc .qa li{margin:0 0 6px}' +
    '.p75acc .qa b{color:#fff}' +
    '.p75acc .qa a{color:var(--gold);font-weight:700;text-decoration:none}.p75acc .qa a:hover{color:#F2D27A;text-decoration:underline}' +
    '.p75acc .p75acc-upd{font-size:13px;color:var(--muted)}' +
    '@media (prefers-reduced-motion:reduce){.p75acc .qa,.p75acc .chev,.p75acc .card{transition:none}.p75acc .card:hover{transform:none}}' +
    '@media (max-width:760px){.p75acc .cards{grid-template-columns:1fr;gap:10px}.p75acc .card b{font-size:20px}}' +
    '@media (max-width:600px){.p75acc .wrap{padding:4px 16px 44px}.p75acc h1{font-size:24px}.p75acc .lede,.p75acc .qa .in{text-align:left}}';

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  var CHEV = '<span class="chev" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

  function page() {
    var cards = OPEN ?
      '<a class="card" style="--c:var(--blue)" href="' + TOOLS + '/outlook"><small>Now</small><b>Everything is free</b><span>Every Outlook, every company figure, every Terminal answer. No account. <i>Explore ›</i></span></a>' +
      '<a class="card" href="#cost" data-q="cost"><small>Coming later</small><b>Founding membership</b><span>$' + PRICE.mE + ' a month or $' + PRICE.yE + ' a year, kept while you stay. Nothing to pay today. <i>Details ›</i></span></a>' :
      '<a class="card" style="--c:var(--blue)" href="' + TOOLS + '/outlook/oil"><small>Free</small><b>Read, learn, use the tools</b><span>Essays, Briefings, Pulse, Education, the tools and the Oil Outlook in full. <i>Start ›</i></span></a>' +
      '<a class="card" href="' + TOOLS + '/join"><small>Members</small><b>Founding membership</b><span>$' + PRICE.mE + ' a month or $' + PRICE.yE + ' a year, kept while you stay. <i>Request access ›</i></span></a>';
    cards += '<a class="card" href="/contact"><small>Questions</small><b>Write to Rahul</b><span>Corrections, ideas, data requests: one inbox, a real reply. <i>Contact ›</i></span></a>';

    return '<div class="wrap">' +
      '<div class="eyebrow">Point75</div><h1>Access &amp; FAQ</h1>' +
      '<p class="lede">' + (OPEN ?
        'Point75 is <b>free to explore right now</b>: the full Outlook, Who’s Paying for AI? and the Terminal are open to everyone while the site finds its readers. Here is what that means, what membership will add later, and the few rules for using what you find.' :
        'What is free on Point75, what membership adds and costs, and the few rules for using what you find.') + '</p>' +
      '<div class="cards">' + cards + '</div>' +
      '<h2>Questions</h2><div class="qs">' +
      FAQ.map(function (f, i) {
        return '<div class="q" id="' + f[0] + '"><h3><button type="button" class="qb" aria-expanded="false" aria-controls="p75acc-a' + i + '" id="p75acc-q' + i + '">' +
          '<span class="t">' + esc(f[1]) + '</span>' + CHEV + '</button></h3>' +
          '<div class="qa" id="p75acc-a' + i + '" role="region" aria-labelledby="p75acc-q' + i + '" hidden><div><div class="in">' + f[2] + '</div></div></div></div>';
      }).join('') + '</div></div>';
  }

  // One open at a time; the panel slides open (grid rows 0fr -> 1fr) and is hidden from tab order while closed
  function toggle(host, btn, force) {
    var open = force != null ? force : btn.getAttribute('aria-expanded') !== 'true';
    host.querySelectorAll('.qb[aria-expanded="true"]').forEach(function (b) { if (b !== btn) set(host, b, false); });
    set(host, btn, open);
  }
  function set(host, btn, open) {
    var a = host.querySelector('#' + btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(open));
    if (open) { a.hidden = false; void a.offsetHeight; a.classList.add('open'); }
    else {
      a.classList.remove('open');
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) a.hidden = true; else setTimeout(function () { if (!a.classList.contains('open')) a.hidden = true; }, 420);
    }
  }
  function openId(host, id, scroll) {
    var q = id && host.querySelector('.q#' + id.replace(/[^a-z-]/g, ''));
    if (!q) return;
    toggle(host, q.querySelector('.qb'), true);
    if (scroll) q.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function render() {
    if (document.querySelector('.p75acc')) return;
    if (!document.getElementById('p75acc-css')) {
      var st = document.createElement('style'); st.id = 'p75acc-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var main = document.querySelector('main') || document.body;
    var host = document.createElement('div'); host.className = 'p75acc';
    host.innerHTML = page();
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
    // The Hostinger page is blank; hide its empty sections so they don't show as a tall band above the page
    if (blocks) [].forEach.call(blocks.children, function (sec) {
      if (sec.tagName !== 'SECTION' || (sec.innerText || '').trim() || sec.querySelector('img, iframe, video, canvas, svg, form')) return;
      sec.setAttribute('data-p75acc-hid', '1'); sec.style.display = 'none';
    });
    host.addEventListener('click', function (e) {
      var b = e.target.closest('.qb'); if (b) { toggle(host, b); return; }
      var c = e.target.closest('[data-q]');
      if (c) { e.preventDefault(); openId(host, c.getAttribute('data-q'), true); try { history.replaceState(null, '', '#' + c.getAttribute('data-q')); } catch (x) {} }
    });
    var h = (location.hash || '').slice(1);
    if (h) openId(host, h, true); else toggle(host, host.querySelector('.qb'), true);   // first question opens by default
  }
  function clear() {
    var h = document.querySelector('.p75acc'); if (h) h.remove();
    document.querySelectorAll('[data-p75acc-hid]').forEach(function (s) { s.style.display = ''; s.removeAttribute('data-p75acc-hid'); });
  }

  window.P75ACCESS = { render: render, clear: clear };
})();
