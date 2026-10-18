/* Point75 - homepage (/) extras. Loaded by p75.js on the homepage only.
   1. Pulse strip: today's two Pulse readings, linking to /pulse (data from news.point75.io/api/pulse).
   2. Salon wall (desktop): the Journal's paintings hung in different sizes along a centre line, like an old
      gallery wall. Titles appear when you hover; the featured essay keeps its title on show.
   3. Phone carousel: one painting at a time. Swipe (or use the arrows) to move; the first tap shows the title
      and the essay's closing question, a second tap opens the essay.
   4. Explore: doorways to Market Intelligence, Tools and Education under the gallery.
   p75.js calls render() about once a second, so everything here is safe to run repeatedly.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75HOME) return;
  var API = 'https://news.point75.io/api/pulse';
  var PHONE = 920;   // matches the breakpoint the Journal cards already use
  var BULL = '#3D8BFF', BEAR = '#E5484D', NEUT = '#9AA0A6';

  // Salon-hang sizes, as [share of the row width, height in px]. Each row adds up to about 96% so the
  // frames wrap where intended; later rows repeat the last two patterns. The first frame is the featured essay.
  var ROWS = [
    [[44, 460], [24, 300], [28, 380]],
    [[22, 270], [30, 360], [20, 310], [24, 330]],
    [[32, 340], [38, 420], [26, 300]],
    [[24, 300], [22, 260], [28, 360], [22, 290]]
  ];
  function sizeFor(i) {
    var r = 0, n = i;
    while (n >= ROWS[Math.min(r, ROWS.length - 1)].length) { n -= ROWS[Math.min(r, ROWS.length - 1)].length; r++; }
    var row = r < ROWS.length ? ROWS[r] : ROWS[ROWS.length - 2 + ((r - ROWS.length) % 2)];
    return row[n];
  }

  var L = '.block-blog-list.p75wall', I = L + ' .block-blog-list-item';
  var CSS =
    // Pulse strip
    '.p75ps{max-width:1224px;width:calc(100% - 40px);margin:0 auto 14px;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;gap:12px 28px;' +
      'padding:14px 20px;border:1px solid #2A2B2F;border-radius:12px;background:#17181B;color:#EDE8DC!important;text-decoration:none!important;font:500 14px/1.4 Manrope,system-ui,sans-serif}' +
    '.p75ps:hover,.p75ps:focus-visible{border-color:rgba(201,162,39,.7);outline:none}' +
    '.p75ps .lb{display:flex;flex-direction:column;gap:2px}' +
    '.p75ps .lb b{color:#C9A227;font-weight:800;font-size:12px;letter-spacing:.14em;text-transform:uppercase}' +
    '.p75ps .lb span{color:#A9A396;font-size:12.5px}' +
    '.p75ps .rd{display:flex;align-items:center;gap:10px}' +
    '.p75ps .rd svg{flex:none}' +
    '.p75ps .rd .k{color:#A9A396;font-size:12px;letter-spacing:.04em}' +
    '.p75ps .rd .v{font:400 22px/1 "Hedvig Letters Serif",Georgia,serif;font-variant-numeric:tabular-nums}' +
    '.p75ps .rd .w{font-size:13px;font-weight:700}' +
    '.p75ps .go{margin-left:auto;color:#C9A227;font-weight:800;white-space:nowrap}' +
    '@media (max-width:640px){.p75ps{gap:12px 18px;padding:12px 16px}.p75ps .lb{flex-basis:100%;flex-direction:row;gap:8px;align-items:baseline}.p75ps .go{margin-left:0;flex-basis:100%}}' +
    // Captions on the paintings (shared by desktop and phone)
    I + ' .p75ht{display:flex;flex-direction:column;gap:6px}' +
    I + ' .p75ht .m{display:flex;align-items:center;gap:8px;font:500 12px Manrope,system-ui,sans-serif;color:#C4BEB1}' +
    I + ' .p75ht .m .p75lvl{margin-left:0;padding:1px 8px;font-size:11px}' +
    I + ' .p75ht .t{font:400 21px/1.25 "Hedvig Letters Serif",Georgia,serif;color:#fff}' +
    I + ' .p75hook{justify-content:flex-end}' +
    I + ' .p75hook i{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}' +
    I + '.p75sm .p75hook{padding:16px}' + I + '.p75sm .p75hook i{display:none}' + I + '.p75sm .p75ht .t{font-size:17px}' +
    I + ' .p75band{position:absolute;left:0;right:0;bottom:0;z-index:1;padding:18px 22px;background:rgba(17,18,20,.74);transition:opacity .25s;pointer-events:none}' +
    I + ' .p75band .t{font-size:30px;line-height:1.15}' +
    I + ' .p75tap{display:none}' +
    // Desktop: the salon wall
    '@media (min-width:' + (PHONE + 1) + 'px){' +
      L + ' .block-blog-list__list{display:flex!important;flex-wrap:wrap;justify-content:center;align-items:center;gap:22px!important;grid-template-columns:none!important}' +
      I + '{flex:0 0 calc(var(--p75w) - 16px);height:var(--p75h);min-width:0;margin:0!important;grid-column:auto!important;grid-row:auto!important;display:flex!important;flex-direction:column}' +
      I + ' .block-blog-list-item__cover-image-container{display:block!important;flex:1 1 auto;height:100%!important}' +
      I + ' .block-blog-list-item__cover-image-wrapper{position:relative;height:100%!important;min-height:0!important;border-radius:3px;box-shadow:0 0 0 1px rgba(201,162,39,.28),0 10px 26px rgba(0,0,0,.45)}' +
      I + ' .block-blog-list-item__cover-image{width:100%!important;height:100%!important;object-fit:cover!important;transition:transform .7s ease}' +
      I + ' .block-blog-list-item__content{display:none!important}' +
      '@media (hover:hover){' + I + ':hover .block-blog-list-item__cover-image{transform:scale(1.035)}' + I + ':hover .p75band{opacity:0}}' +
      I + ' .block-blog-list-item__cover-image-container:focus-visible .p75hook{opacity:1}' +
      I + ' .block-blog-list-item__cover-image-container:focus-visible{outline:3px solid #F2D27A;outline-offset:4px}' +
    '}' +
    // Phones and small tablets: one painting at a time
    '@media (max-width:' + PHONE + 'px){' +
      L + ' .block-blog-list__list{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px!important;' +
        'scrollbar-width:none;-webkit-overflow-scrolling:touch;grid-template-columns:none!important}' +
      L + ' .block-blog-list__list::-webkit-scrollbar{display:none}' +
      I + '{flex:0 0 100%;min-width:0;scroll-snap-align:center;scroll-snap-stop:always;margin:0!important}' +
      I + ' .block-blog-list-item__cover-image-wrapper{position:relative;height:min(118vw,560px)!important;min-height:0!important;border-radius:8px}' +
      I + ' .block-blog-list-item__cover-image{width:100%!important;height:100%!important;object-fit:cover!important}' +
      I + ' .block-blog-list-item__content{display:none!important}' +
      I + ' .p75band{display:none}' +
      I + '.p75show .p75hook{opacity:1}' +
      I + ' .p75ht .t{font-size:26px}' +
      I + ' .p75hook i{font-size:18px}' +
      I + '.p75sm .p75hook i{display:-webkit-box}' +
      I + ' .p75tap{display:inline-flex;align-items:center;gap:6px;position:absolute;top:12px;right:12px;z-index:2;padding:4px 10px;border-radius:99px;' +
        'background:rgba(17,18,20,.72);color:#EDE8DC;font:700 12px Manrope,system-ui,sans-serif;transition:opacity .2s}' +
      I + '.p75show .p75tap{opacity:0}' +
      '.p75dots{display:flex;align-items:center;justify-content:center;gap:14px;margin:14px auto 0}' +
      '.p75dots button{min-width:44px;min-height:44px;border-radius:22px;border:1px solid #3A3C42;background:#17181B;color:#EDE8DC;font:700 18px Manrope,system-ui,sans-serif;cursor:pointer}' +
      '.p75dots .ds{display:flex;gap:7px}' +
      '.p75dots .ds i{width:7px;height:7px;border-radius:50%;background:#4A4C52;transition:background .2s,transform .2s}' +
      '.p75dots .ds i.on{background:#C9A227;transform:scale(1.25)}' +
      '.p75dots .n{color:#A9A396;font:600 12.5px Manrope,system-ui,sans-serif;min-width:44px;text-align:center}' +
    '}' +
    '@media (min-width:' + (PHONE + 1) + 'px){.p75dots{display:none}}' +
    // Explore
    '.p75ex{max-width:1224px;width:calc(100% - 40px);margin:64px auto 0;box-sizing:border-box}' +
    '.p75ex .eb{color:#C9A227;font:800 12px Manrope,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}' +
    '.p75ex .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}' +
    '.p75ex a{display:flex;flex-direction:column;gap:8px;padding:20px 22px;border:1px solid #2A2B2F;border-radius:12px;background:#17181B;text-decoration:none!important;transition:border-color .2s}' +
    '.p75ex a:hover,.p75ex a:focus-visible{border-color:rgba(201,162,39,.7);outline:none}' +
    '.p75ex a b{font:400 23px/1.2 "Hedvig Letters Serif",Georgia,serif;color:#EDE8DC}' +
    '.p75ex a span{font:500 14.5px/1.55 Manrope,system-ui,sans-serif;color:#C4BEB1}' +
    '.p75ex a em{margin-top:auto;padding-top:6px;font:800 13.5px Manrope,system-ui,sans-serif;font-style:normal;color:#C9A227}' +
    '@media (max-width:760px){.p75ex .g{grid-template-columns:1fr;gap:12px}.p75ex{margin-top:44px}}' +
    '@media (prefers-reduced-motion:reduce){' + I + ' .block-blog-list-item__cover-image{transition:none}}';

  var EXPLORE = [
    ['https://tools.point75.io/market-intelligence', 'Market Intelligence', 'Rates, credit, sectors and the flows that move markets, as clear dashboards.', 'Open the dashboards'],
    ['https://tools.point75.io/', 'Tools', 'Build and stress-test a portfolio, and see what fees and taxes really cost over decades.', 'Try the tools'],
    ['/education', 'Education', 'Bonds from first principles: the basics, the history, the players and a plain-English dictionary.', 'Start learning']
  ];

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  function bullColor(s) { return s >= 20 ? BULL : s <= -20 ? BEAR : NEUT; }
  function stressColor(s) { return s < 30 ? '#2BD17E' : s < 55 ? '#B8D43A' : s < 75 ? '#F2A33A' : '#FF4D4D'; }

  function once() {
    if (document.getElementById('p75home-css')) return;
    var st = document.createElement('style'); st.id = 'p75home-css'; st.textContent = CSS; document.head.appendChild(st);
    // Phones: first tap on a painting shows its title, the second opens the essay.
    // Capture phase, so the site's own link handling doesn't run on that first tap.
    document.addEventListener('click', function (e) {
      if (window.innerWidth > PHONE) return;
      var a = e.target.closest && e.target.closest(L + ' .block-blog-list-item__cover-image-container'); if (!a) return;
      var it = a.closest('.block-blog-list-item');
      if (it.classList.contains('p75show')) return;
      e.preventDefault(); e.stopPropagation();
      document.querySelectorAll(I + '.p75show').forEach(function (x) { x.classList.remove('p75show'); });
      it.classList.add('p75show');
    }, true);
  }

  // ---------- Pulse strip ----------
  var pulse = null, pulseState = 'idle';
  function loadPulse(cb) {
    if (pulseState === 'done') return cb(pulse);
    if (pulseState === 'loading') return;
    pulseState = 'loading';
    fetch(API).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
      .then(function (j) { pulse = j && j.gauges ? j : null; pulseState = 'done'; cb(pulse); });
  }
  function meterBar(score) {   // −100 … +100, marker on a short track
    var x = 4 + (Math.max(-100, Math.min(100, score)) + 100) / 200 * 72, c = bullColor(score);
    return '<svg width="80" height="16" viewBox="0 0 80 16" aria-hidden="true"><rect x="4" y="6" width="36" height="4" rx="2" fill="' + BEAR + '" opacity=".45"/>' +
      '<rect x="40" y="6" width="36" height="4" rx="2" fill="' + BULL + '" opacity=".45"/><rect x="39.5" y="3" width="1" height="10" fill="#6B6E75"/>' +
      '<circle cx="' + x.toFixed(1) + '" cy="8" r="5" fill="' + c + '" stroke="#111214" stroke-width="2"/></svg>';
  }
  function meterArc(score) {   // 0 … 100 half-dial
    var p = Math.max(0, Math.min(100, score)), c = stressColor(p);
    return '<svg width="44" height="26" viewBox="0 0 100 56" aria-hidden="true"><path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#2F3136" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="' + c + '" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="' + p.toFixed(0) + ' 100"/></svg>';
  }
  function pulseStrip(list) {
    var strip = list.querySelector(':scope > .p75ps');
    if (!strip) {
      loadPulse(function (j) {
        if (!j || !document.body.contains(list) || list.querySelector(':scope > .p75ps')) return;
        var b = j.gauges.bull || {}, s = j.gauges.stress || {};
        if (b.score == null && s.score == null) return;
        var when = j.generated_at ? new Date(j.generated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }) : '';
        var bs = b.score != null ? Math.round(b.score) : null, ss = s.score != null ? Math.round(s.score) : null;
        var h = '<a class="p75ps" href="/pulse" aria-label="Pulse: bull/bear ' + (bs != null ? bs : 'n/a') + ' ' + esc(b.label || '') +
          ', stress ' + (ss != null ? ss : 'n/a') + ' ' + esc(s.label || '') + '. Open Pulse.">' +
          '<span class="lb"><b>Pulse</b><span>' + (when ? 'Updated ' + esc(when) : 'The bond market today') + '</span></span>' +
          (bs != null ? '<span class="rd">' + meterBar(bs) + '<span><span class="k">Bull / bear</span><br><span class="v" style="color:' + bullColor(bs) + '">' + (bs > 0 ? '+' : '') + bs +
            '</span> <span class="w" style="color:' + bullColor(bs) + '">' + esc(b.label || '') + '</span></span></span>' : '') +
          (ss != null ? '<span class="rd">' + meterArc(ss) + '<span><span class="k">Stress</span><br><span class="v" style="color:' + stressColor(ss) + '">' + ss +
            '</span> <span class="w" style="color:' + stressColor(ss) + '">' + esc(s.label || '') + '</span></span></span>' : '') +
          '<span class="go">Open Pulse &rarr;</span></a>';
        list.insertAdjacentHTML('afterbegin', h);
      });
      return;
    }
    if (list.firstElementChild !== strip) list.insertBefore(strip, list.firstElementChild);   // keep it above "New to bonds?"
  }

  // ---------- Paintings ----------
  function frames(list) {
    var items = list.querySelectorAll('.block-blog-list__list > .block-blog-list-item');
    [].forEach.call(items, function (it, i) {
      var sz = sizeFor(i), key = sz.join('x');
      if (it.getAttribute('data-p75w') !== key) {
        it.style.setProperty('--p75w', sz[0] + '%'); it.style.setProperty('--p75h', sz[1] + 'px');
        it.classList.toggle('p75sm', sz[0] <= 24);
        it.setAttribute('data-p75w', key);
      }
      var wrap = it.querySelector('.block-blog-list-item__cover-image-wrapper'), hook = wrap && wrap.querySelector('.p75hook');
      if (!wrap || !hook) return;   // p75.js adds the hook first; try again on the next pass
      var title = (it.querySelector('.block-blog-list-item__title') || {}).textContent || '';
      var meta = it.querySelector('.p75cm');
      if (!hook.querySelector('.p75ht')) {
        hook.insertAdjacentHTML('afterbegin', '<div class="p75ht"><div class="m">' + (meta ? meta.innerHTML : '') + '</div><div class="t">' + esc(title) + '</div></div>');
        var a = it.querySelector('a.block-blog-list-item__cover-image-container');
        if (a && title) a.setAttribute('aria-label', title.trim());
        wrap.insertAdjacentHTML('beforeend', '<span class="p75tap" aria-hidden="true">Tap to preview</span>');
      }
      var band = wrap.querySelector('.p75band');
      if (it.classList.contains('p75feat') && !band) {
        wrap.insertAdjacentHTML('beforeend', '<div class="p75band p75ht" aria-hidden="true"><div class="m">' + (meta ? meta.innerHTML : '') + '</div><div class="t">' + esc(title) + '</div></div>');
      } else if (!it.classList.contains('p75feat') && band) band.remove();
    });
    return items;
  }

  // ---------- Phone dots and arrows ----------
  function dots(list, items) {
    var track = list.querySelector('.block-blog-list__list'); if (!track) return;
    var d = list.querySelector(':scope > .p75dots'), n = items.length;
    if (!d || +d.getAttribute('data-n') !== n) {
      if (d) d.remove();
      var ds = ''; for (var k = 0; k < n; k++) ds += '<i></i>';
      track.insertAdjacentHTML('afterend', '<div class="p75dots" data-n="' + n + '"><button type="button" data-p75go="-1" aria-label="Previous essay">&larr;</button>' +
        '<span class="ds" aria-hidden="true">' + ds + '</span><span class="n" aria-live="polite"></span>' +
        '<button type="button" data-p75go="1" aria-label="Next essay">&rarr;</button></div>');
      d = list.querySelector(':scope > .p75dots');
      d.addEventListener('click', function (e) {
        var b = e.target.closest('[data-p75go]'); if (!b) return;
        var w = track.clientWidth + 12, i = Math.round(track.scrollLeft / w), last = track.children.length - 1;
        i = Math.max(0, Math.min(last, i + +b.getAttribute('data-p75go')));
        track.scrollTo({ left: i * w, behavior: 'smooth' });
      });
    }
    if (!track.getAttribute('data-p75scroll')) {
      track.setAttribute('data-p75scroll', '1');
      track.addEventListener('scroll', function () {
        clearTimeout(track._p75t);
        track._p75t = setTimeout(function () { mark(list, track); }, 60);
        track.querySelectorAll('.p75show').forEach(function (x) { x.classList.remove('p75show'); });
      }, { passive: true });
    }
    mark(list, track);
  }
  function mark(list, track) {
    var d = list.querySelector(':scope > .p75dots'); if (!d) return;
    var n = track.children.length, i = Math.max(0, Math.min(n - 1, Math.round(track.scrollLeft / ((track.clientWidth + 12) || 1))));
    d.querySelectorAll('.ds i').forEach(function (x, k) { x.classList.toggle('on', k === i); });
    var lbl = (i + 1) + ' / ' + n; if (d.querySelector('.n').textContent !== lbl) d.querySelector('.n').textContent = lbl;
  }

  // ---------- Explore ----------
  function explore(list) {
    if (list.querySelector(':scope > .p75ex')) return;
    list.insertAdjacentHTML('beforeend', '<nav class="p75ex" aria-label="Explore Point75"><div class="eb">Explore</div><div class="g">' +
      EXPLORE.map(function (x) { return '<a href="' + x[0] + '"><b>' + x[1] + '</b><span>' + x[2] + '</span><em>' + x[3] + ' &rarr;</em></a>'; }).join('') + '</div></nav>');
  }

  function render() {
    var list = document.querySelector('.block-blog-list'); if (!list) return;
    once();
    list.classList.add('p75wall');
    pulseStrip(list);
    var items = frames(list);
    if (items.length) dots(list, items);
    explore(list);
    var ex = list.querySelector(':scope > .p75ex');
    if (ex && list.lastElementChild !== ex) list.appendChild(ex);
  }
  function clear() {
    document.querySelectorAll('.p75ps, .p75ex, .p75dots').forEach(function (x) { x.remove(); });
    var list = document.querySelector('.block-blog-list.p75wall'); if (list) list.classList.remove('p75wall');
  }

  window.P75HOME = { render: render, clear: clear };
})();
