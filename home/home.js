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

  // Desktop: one salon-style row. Each painting keeps its true 5:3 shape; its height is a share of the row
  // height (--p75H, set from the window height so the whole homepage fits on a typical laptop screen).
  // The first painting is the featured essay; the pattern repeats for later essays.
  var SCALE = [1, 0.7, 0.86, 0.62, 0.8, 0.68, 0.92, 0.66];
  function scaleFor(i) { return SCALE[i % SCALE.length]; }

  var L = '.block-blog-list.p75wall', I = L + ' .block-blog-list-item';
  var CSS =
    // Pulse strip
    '.p75ps{max-width:1224px;width:calc(100% - 40px);margin:0 auto 14px;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;gap:12px 28px;' +
      'padding:14px 20px;border:1px solid rgba(201,162,39,.32);border-radius:12px;background:#1B1C20;color:#EDE8DC!important;text-decoration:none!important;font:500 14px/1.4 Manrope,system-ui,sans-serif}' +
    '.p75ps:hover,.p75ps:focus-visible{border-color:rgba(201,162,39,.7);outline:none}' +
    '.p75ps .lb{display:flex;flex-direction:column;gap:2px}' +
    '.p75ps .lb b{color:#C9A227;font-weight:800;font-size:12px;letter-spacing:.14em;text-transform:uppercase}' +
    '.p75ps .lb span{color:#E4DED1;font-size:13px;font-weight:600}.p75ps .lb .u{font-style:normal}' +
    '.p75ps .rd{display:flex;align-items:center;gap:10px}' +
    '.p75ps .rd svg{flex:none}' +
    '.p75ps .rd .k{color:#E4DED1;font-size:12.5px;font-weight:700;letter-spacing:.03em}' +
    '.p75ps .rd .v{font:400 26px/1 "Hedvig Letters Serif",Georgia,serif;font-variant-numeric:tabular-nums;filter:brightness(1.15)}' +
    '.p75ps .rd .w{font-size:13.5px;font-weight:800;filter:brightness(1.15)}' +
    '.p75ps .go{margin-left:auto;color:#C9A227;font-weight:800;white-space:nowrap}' +
    '@media (max-width:640px){.p75ps{gap:8px 12px;padding:10px 14px}.p75ps .lb{flex:1 1 auto;order:0;flex-direction:row;gap:8px;align-items:baseline}' +
      '.p75ps .lb .u{display:none}.p75ps .go{order:1;margin-left:auto;font-size:13px}' +
      '.p75ps .rd{order:2;flex:1 1 40%;min-width:0;gap:8px}.p75ps .rd svg[width="80"]{width:52px}.p75ps .rd .v{font-size:24px}.p75ps .rd .w{font-size:13px}}' +
    // "New to bonds?" (drawn by p75.js as .p75cta), restyled on the homepage as a light signpost rather than a box
    '.p75top>.p75cta{background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none}' +
    '.p75top>.p75cta .go{transition:transform .2s}' +
    '.p75top>.p75cta:hover .go,.p75top>.p75cta:focus-visible .go{transform:translateX(4px)}' +
    '@media (min-width:' + (PHONE + 1) + 'px){' +
      '.p75top>.p75cta{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:6px;flex-wrap:nowrap;' +
        'border-left:2px solid #C9A227!important;padding:4px 0 4px 20px!important;font-size:14px;line-height:1.45;color:#A9A396!important}' +
      '.p75top>.p75cta b{display:block;margin-bottom:2px;font:400 21px/1.15 "Hedvig Letters Serif",Georgia,serif;color:#EDE8DC}' +
      '.p75top>.p75cta .go{font-size:13.5px}' +
      '.p75top>.p75cta:hover,.p75top>.p75cta:focus-visible{background:transparent!important}' +
      '.p75top>.p75cta:hover b{color:#fff}' +
    '}' +
    '@media (max-width:' + PHONE + 'px){' +
      '.p75top>.p75cta{flex-wrap:nowrap;margin:0 auto 12px!important;padding:9px 18px!important;border:1px solid rgba(201,162,39,.4)!important;border-radius:99px!important;font-size:14.5px}' +
      '.p75top>.p75cta>span:first-child{font-size:0}' +   // keeps the line read aloud, shows only the question
      '.p75top>.p75cta b{font-size:15px}' +
      '.p75top>.p75cta:hover,.p75top>.p75cta:focus-visible{background:rgba(201,162,39,.08)!important}' +
    '}' +
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
    // Desktop: one salon row along a centre line; arrows and dots below move along it
    '@media (min-width:' + (PHONE + 1) + 'px){' +
      L + '{padding-top:20px!important;--p75H:clamp(220px,calc(100vh - 500px),440px)}' +
      L + ' .block-blog-list__list{display:flex!important;flex-wrap:nowrap!important;align-items:center;gap:24px!important;overflow-x:auto;overscroll-behavior-x:contain;' +
        'scroll-snap-type:x proximity;scroll-padding:0 20px;padding:10px 20px 16px!important;grid-template-columns:none!important;scrollbar-width:none}' +
      L + ' .block-blog-list__list::-webkit-scrollbar{display:none}' +
      I + '{flex:0 0 auto;height:calc(var(--p75H) * var(--p75k));width:calc(var(--p75H) * var(--p75k) * 5 / 3);min-width:0;margin:0!important;' +
        'grid-column:auto!important;grid-row:auto!important;display:flex!important;flex-direction:column;scroll-snap-align:start}' +
      I + ' .block-blog-list-item__cover-image-container{display:block!important;flex:1 1 auto;height:100%!important}' +
      I + ' .block-blog-list-item__cover-image-wrapper{position:relative;height:100%!important;min-height:0!important;border-radius:3px;box-shadow:0 0 0 1px rgba(201,162,39,.28),0 10px 26px rgba(0,0,0,.45)}' +
      I + ' .block-blog-list-item__cover-image{width:100%!important;height:100%!important;object-fit:cover!important;transition:transform .7s ease}' +
      I + ' .block-blog-list-item__content{display:none!important}' +
      '@media (hover:hover){' + I + ':hover .block-blog-list-item__cover-image{transform:scale(1.035)}' + I + ':hover .p75band{opacity:0}}' +
      I + ' .block-blog-list-item__cover-image-container:focus-visible .p75hook{opacity:1}' +
      I + ' .block-blog-list-item__cover-image-container:focus-visible{outline:3px solid #F2D27A;outline-offset:4px}' +
      I + ' .p75hook{padding:16px 18px;gap:8px}' +
      I + ' .p75hook i{-webkit-line-clamp:3;font-size:17px}' +
      I + ' .p75band{padding:14px 18px}' + I + ' .p75band .t{font-size:26px}' +
      // Pulse strip and "New to bonds?" share one row
      '.p75top{display:flex;align-items:stretch;gap:14px;max-width:1224px;width:calc(100% - 40px);margin:0 auto 6px}' +
      '.p75top>.p75ps{flex:1.5 1 0;width:auto;margin:0;max-width:none}' +
      '.p75top>.p75cta{flex:1 1 0;width:auto;margin:0!important;max-width:none}' +
      // Explore, compact
      L + ' .p75ex{margin-top:18px}' + L + ' .p75ex .eb{margin-bottom:10px}' +
      L + ' .p75ex a{padding:14px 18px;gap:4px}' + L + ' .p75ex a b{font-size:20px}' + L + ' .p75ex a span{font-size:14px}' + L + ' .p75ex a em{padding-top:4px}' +
    '}' +
    // The site builder slides each card in as it scrolls into view. On a sideways carousel that fires on every
    // painting and fights the swipe, so the wall's cards simply stay put.
    I + '{animation:none!important;transition:none!important;transform:none!important;opacity:1!important}' +
    // Phones and small tablets: one painting at a time, uncropped, with the next one peeking in from the right
    '@media (max-width:' + PHONE + 'px){' +
      L + '{padding-top:10px!important}' +
      '.p75top>.p75ps{margin-bottom:10px}' +   // the builder's 60px gap under the site header wastes a phone's first screen
      L + ' .block-blog-list__list{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;gap:12px!important;' +
        'scrollbar-width:none;-webkit-overflow-scrolling:touch;grid-template-columns:none!important}' +
      L + ' .block-blog-list__list::-webkit-scrollbar{display:none}' +
      I + '{flex:0 0 86%;min-width:0;scroll-snap-align:start;margin:0!important}' +
      I + ' .block-blog-list-item__cover-image-container{height:auto!important}' +
      I + ' .block-blog-list-item__cover-image-wrapper{position:relative;height:auto!important;min-height:0!important;aspect-ratio:5/3;border-radius:8px}' +
      I + ' .block-blog-list-item__cover-image{width:100%!important;height:100%!important;object-fit:cover!important}' +
      I + ' .block-blog-list-item__content{display:none!important}' +
      I + ' .p75band{display:none}' +
      I + '.p75show .p75hook{opacity:1}' +
      I + ' .p75hook{padding:12px 14px;gap:6px}' +
      I + ' .p75ht{gap:4px}' + I + ' .p75ht .m{font-size:11px}' +
      I + ' .p75ht .t,' + I + '.p75sm .p75ht .t{font-size:18px;line-height:1.2}' +
      I + ' .p75hook i,' + I + '.p75sm .p75hook i{display:-webkit-box;-webkit-line-clamp:2;font-size:14px;line-height:1.35}' +
      I + ' .p75hook b{font-size:12.5px}' +
      I + ' .p75pick{top:8px;left:8px;font-size:10px;padding:3px 7px}' +
      I + ' .p75tap{display:inline-flex;align-items:center;gap:6px;position:absolute;top:8px;right:8px;z-index:2;padding:3px 9px;border-radius:99px;' +
        'background:rgba(17,18,20,.72);color:#EDE8DC;font:700 11px Manrope,system-ui,sans-serif;transition:opacity .2s}' +
      I + '.p75show .p75tap{opacity:0}' +
    '}' +
    // Arrows and dots (desktop and phones)
    '.p75dots{display:flex;align-items:center;justify-content:center;gap:14px;margin:6px auto 0}' +
    '.p75dots>button{min-width:44px;min-height:44px;border-radius:22px;border:1px solid #3A3C42;background:#17181B;color:#EDE8DC;font:700 18px Manrope,system-ui,sans-serif;cursor:pointer}' +
    '.p75dots>button:hover,.p75dots>button:focus-visible{border-color:#C9A227;outline:none}' +
    '.p75dots .ds{display:flex;gap:2px}' +
    '.p75dots .ds button{width:22px;height:22px;padding:0;border:0;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '.p75dots .ds button i{width:7px;height:7px;border-radius:50%;background:#4A4C52;transition:background .2s,transform .2s}' +
    '.p75dots .ds button.on i{background:#C9A227;transform:scale(1.25)}' +
    '.p75dots .ds button:focus-visible{outline:2px solid #F2D27A;border-radius:50%}' +
    '.p75dots .n{color:#A9A396;font:600 12.5px Manrope,system-ui,sans-serif;min-width:44px;text-align:center}' +
    // Explore
    '.p75ex{max-width:1224px;width:calc(100% - 40px);margin:64px auto 0;box-sizing:border-box}' +
    '.p75ex .eb{color:#C9A227;font:800 12px Manrope,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}' +
    '.p75ex .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}' +
    '.p75ex a{display:flex;flex-direction:column;gap:8px;padding:20px 22px;border:1px solid #34363C;border-radius:12px;background:#1B1C20;text-decoration:none!important;transition:border-color .2s}' +
    '.p75ex a:hover,.p75ex a:focus-visible{border-color:rgba(201,162,39,.7);outline:none}' +
    '.p75ex a b{font:400 23px/1.2 "Hedvig Letters Serif",Georgia,serif;color:#fff}' +
    '.p75ex a span{font:600 14.5px/1.55 Manrope,system-ui,sans-serif;color:#E4DED1}' +
    '.p75ex a em{margin-top:auto;padding-top:6px;font:800 13.5px Manrope,system-ui,sans-serif;font-style:normal;color:#C9A227}' +
    '@media (max-width:760px){.p75ex .g{grid-template-columns:1fr;gap:10px}' + L + ' .p75ex{margin-top:24px}' + L + ' .p75ex .eb{margin-bottom:10px}' +
      L + ' .p75ex a{padding:14px 18px;gap:4px}' + L + ' .p75ex a b{font-size:20px}' + L + ' .p75ex a span{font-size:14px}' + L + ' .p75ex a em{padding-top:4px}}' +
    '@media (prefers-reduced-motion:reduce){' + I + ' .block-blog-list-item__cover-image{transition:none}}';

  var EXPLORE = [
    ['https://tools.point75.io/market-intelligence', 'Market Intelligence', 'Rates, credit, sectors and flows, as clear dashboards.', 'Open the dashboards'],
    ['https://tools.point75.io/', 'Tools', 'Portfolio, tax and retirement, with honest numbers.', 'Try the tools'],
    ['/education', 'Education', 'Bonds from first principles, in plain English.', 'Start learning']
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
    // Remember that the reader left the homepage for a page on this site (Pulse strip, Explore). p75.js reads
    // this so that page's back pill says "Journal" and leads home, instead of into the page's menu section.
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('.p75ps, .p75ex a'); if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '/') return;
      try { sessionStorage.setItem('p75fromHome', href.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/'); } catch (err) {}
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
  // The Pulse strip and p75.js's "New to bonds?" line (.p75cta) live together in .p75top at the top of the list:
  // side by side on desktop, stacked on phones
  function topRow(list) {
    var top = list.querySelector(':scope > .p75top');
    if (!top) { top = document.createElement('div'); top.className = 'p75top'; list.insertBefore(top, list.firstElementChild); }
    if (list.firstElementChild !== top) list.insertBefore(top, list.firstElementChild);
    var cta = list.querySelector(':scope > .p75cta'); if (cta) top.appendChild(cta);
    return top;
  }
  function pulseStrip(list) {
    var top = topRow(list), strip = top.querySelector(':scope > .p75ps');
    if (!strip) {
      loadPulse(function (j) {
        var top = topRow(list);
        if (!j || !document.body.contains(list) || top.querySelector(':scope > .p75ps')) return;
        var b = j.gauges.bull || {}, s = j.gauges.stress || {};
        if (b.score == null && s.score == null) return;
        var when = j.generated_at ? new Date(j.generated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }) : '';
        var bs = b.score != null ? Math.round(b.score) : null, ss = s.score != null ? Math.round(s.score) : null;
        var h = '<a class="p75ps" href="/pulse" aria-label="Pulse: bull/bear ' + (bs != null ? bs : 'n/a') + ' ' + esc(b.label || '') +
          ', stress ' + (ss != null ? ss : 'n/a') + ' ' + esc(s.label || '') + '. Open Pulse.">' +
          '<span class="lb"><b>Pulse</b><span>' + (when ? '<i class="u">Updated </i>' + esc(when) : 'The bond market today') + '</span></span>' +
          (bs != null ? '<span class="rd">' + meterBar(bs) + '<span><span class="k">Bull / bear</span><br><span class="v" style="color:' + bullColor(bs) + '">' + (bs > 0 ? '+' : '') + bs +
            '</span> <span class="w" style="color:' + bullColor(bs) + '">' + esc(b.label || '') + '</span></span></span>' : '') +
          (ss != null ? '<span class="rd">' + meterArc(ss) + '<span><span class="k">Stress</span><br><span class="v" style="color:' + stressColor(ss) + '">' + ss +
            '</span> <span class="w" style="color:' + stressColor(ss) + '">' + esc(s.label || '') + '</span></span></span>' : '') +
          '<span class="go">Open Pulse &rarr;</span></a>';
        top.insertAdjacentHTML('afterbegin', h);
      });
      return;
    }
    if (top.firstElementChild !== strip) top.insertBefore(strip, top.firstElementChild);   // Pulse first, then "New to bonds?"
  }

  // ---------- Paintings ----------
  function frames(list) {
    var items = list.querySelectorAll('.block-blog-list__list > .block-blog-list-item');
    [].forEach.call(items, function (it, i) {
      var k = String(scaleFor(i));
      if (it.getAttribute('data-p75k') !== k) {
        it.style.setProperty('--p75k', k);
        it.classList.toggle('p75sm', +k <= 0.7);
        it.setAttribute('data-p75k', k);
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

  // ---------- Arrows and dots (desktop and phones) ----------
  function dots(list, items) {
    var track = list.querySelector('.block-blog-list__list'); if (!track) return;
    var d = list.querySelector(':scope > .p75dots'), n = items.length;
    if (!d || +d.getAttribute('data-n') !== n) {
      if (d) d.remove();
      var ds = ''; for (var k = 0; k < n; k++) ds += '<button type="button" data-p75to="' + k + '" aria-label="Show essay ' + (k + 1) + ' of ' + n + '"><i></i></button>';
      track.insertAdjacentHTML('afterend', '<div class="p75dots" data-n="' + n + '"><button type="button" data-p75go="-1" aria-label="Previous essay">&larr;</button>' +
        '<span class="ds">' + ds + '</span><span class="n" aria-live="polite"></span>' +
        '<button type="button" data-p75go="1" aria-label="Next essay">&rarr;</button></div>');
      d = list.querySelector(':scope > .p75dots');
      d.addEventListener('click', function (e) {
        var b = e.target.closest('[data-p75go], [data-p75to]'); if (!b) return;
        var i = b.hasAttribute('data-p75to') ? +b.getAttribute('data-p75to') : current(track) + +b.getAttribute('data-p75go');
        goTo(track, Math.max(0, Math.min(track.children.length - 1, i)));
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
  // Where each painting sits relative to the row's starting edge (paintings differ in width on desktop)
  function offsets(track) {
    var start = track.getBoundingClientRect().left + (parseFloat(getComputedStyle(track).paddingLeft) || 0);
    return [].map.call(track.children, function (c) { return c.getBoundingClientRect().left - start; });
  }
  function current(track) {
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) return track.children.length - 1;
    var o = offsets(track), best = 0;
    o.forEach(function (x, k) { if (Math.abs(x) < Math.abs(o[best])) best = k; });
    return best;
  }
  function goTo(track, i) {
    var o = offsets(track)[i]; if (o == null) return;
    track.scrollBy({ left: o, behavior: 'smooth' });
  }
  function mark(list, track) {
    var d = list.querySelector(':scope > .p75dots'); if (!d) return;
    var n = track.children.length, i = current(track);
    d.querySelectorAll('.ds button').forEach(function (x, k) { x.classList.toggle('on', k === i); x.setAttribute('aria-current', k === i ? 'true' : 'false'); });
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
    var top = document.querySelector('.p75top'), cta = top && top.querySelector('.p75cta');
    if (cta) top.parentNode.insertBefore(cta, top);
    document.querySelectorAll('.p75top, .p75ps, .p75ex, .p75dots').forEach(function (x) { x.remove(); });
    var list = document.querySelector('.block-blog-list.p75wall'); if (list) list.classList.remove('p75wall');
  }

  window.P75HOME = { render: render, clear: clear };
})();
