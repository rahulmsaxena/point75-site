/* Point75 - Economic Indicators page (/economic-indicators, under News). Loaded by p75.js;
   data from news.point75.io/api/indicators (fetch_indicators.py in Finance-NewsFeed-Aggregator, weekdays).
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75IND) return;
  var DATA = 'https://news.point75.io/api/indicators';
  var GOOD = '#2BD17E', BAD = '#E5484D', FLAT = '#A9A396', GOLD = '#C9A227';

  var CSS =
    '.p75ind{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--muted:#A9A396;--gold:' + GOLD + ';' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75ind *{box-sizing:border-box}' +
    '.p75ind .wrap{max-width:900px;margin:0 auto;padding:44px 20px 72px}' +
    '.p75ind .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75ind h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:38px;line-height:1.12;margin:8px 0 10px;letter-spacing:-.01em}' +
    '.p75ind .lede{color:var(--muted);font-size:16px;line-height:1.6;max-width:640px;margin:0}' +
    '.p75ind .asof{font-size:12.5px;color:var(--muted);margin-top:10px}.p75ind .asof b{color:var(--cream);font-weight:600}' +
    '.p75ind .num{font-variant-numeric:tabular-nums}' +
    '.p75ind .tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:30px 0 34px}' +
    '.p75ind .tile{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px}' +
    '.p75ind .tile .l{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700}' +
    '.p75ind .tile .v{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:32px;line-height:1.1;margin:6px 0 2px}' +
    '.p75ind .tile .v small{font-family:Manrope,sans-serif;font-size:13px;color:var(--muted);margin-left:4px}' +
    '.p75ind .tile .c{font-size:12.5px}.p75ind .tile .p{color:var(--muted);font-size:11.5px;margin-left:4px}' +
    '.p75ind .list{background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden}' +
    '.p75ind button{font:inherit;color:inherit}' +
    '.p75ind .cat{width:100%;display:flex;align-items:center;gap:14px;padding:17px 20px;background:none;border:0;border-top:1px solid var(--line);text-align:left;cursor:pointer}' +
    '.p75ind .cat:first-child{border-top:0}' +
    '.p75ind .cat .n{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:21px;flex:1}' +
    '.p75ind .pill{font-size:12px;font-weight:700;padding:3px 11px;border-radius:99px;background:var(--panel2);border:1px solid var(--line)}' +
    '.p75ind .chev{width:16px;height:16px;color:var(--muted);transition:transform .2s}' +
    '.p75ind .cat[aria-expanded="true"] .chev{transform:rotate(180deg)}' +
    '.p75ind .cat:hover,.p75ind .ind:hover{background:var(--panel2)}' +
    '.p75ind .cat:focus-visible,.p75ind .ind:focus-visible,.p75ind .rb:focus-visible{outline:2px solid var(--gold);outline-offset:-2px}' +
    '.p75ind .ind{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 84px 76px 70px;align-items:center;gap:12px;padding:13px 20px 13px 34px;background:none;border:0;border-top:1px solid var(--line);text-align:left;cursor:pointer}' +
    '.p75ind .ind .nm{font-weight:700;font-size:14.5px;min-width:0}' +
    '.p75ind .ind .nm span{display:block;font-weight:400;font-size:12px;color:var(--muted);margin-top:1px}' +
    '.p75ind .ind .val{text-align:right;font-weight:700;font-size:15px}.p75ind .ind .val small{display:block;font-weight:400;font-size:11px;color:var(--muted)}' +
    '.p75ind .ind .chg{text-align:right;font-size:12.5px}' +
    '.p75ind .detail{padding:6px 20px 22px 34px;border-top:1px dashed var(--line)}' +
    '.p75ind .ranges{display:flex;gap:6px;margin:10px 0}' +
    '.p75ind .rb{font-size:12px;font-weight:700;padding:5px 12px;border-radius:7px;border:1px solid var(--line);background:var(--panel2);color:var(--muted);cursor:pointer}' +
    '.p75ind .rb[aria-pressed="true"]{border-color:var(--gold);color:var(--gold)}' +
    '.p75ind .chart{position:relative}.p75ind .chart svg{display:block;width:100%;height:auto}' +
    '.p75ind .tip{position:absolute;top:0;transform:translateX(-50%);background:#0b0c0e;border:1px solid var(--line);border-radius:6px;padding:3px 8px;font-size:12px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}' +
    '.p75ind .foot{color:var(--muted);font-size:12.5px;line-height:1.55;margin-top:8px}' +
    '.p75ind .foot a{color:var(--gold);text-decoration:none}' +
    '.p75ind .note{color:var(--muted);font-size:12px;line-height:1.55;margin-top:18px}' +
    '.p75ind .load{color:var(--muted);margin-top:24px}' +
    '@media (prefers-reduced-motion:reduce){.p75ind .chev,.p75ind .tip{transition:none}}' +
    '@media (max-width:720px){.p75ind .tiles{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:560px){.p75ind .wrap{padding:30px 16px 56px}.p75ind h1{font-size:30px}.p75ind .tile .v{font-size:27px}' +
      '.p75ind .ind{grid-template-columns:minmax(0,1fr) 64px 58px;padding-left:22px;padding-right:14px}.p75ind .ind .spk{display:none}' +
      '.p75ind .cat{padding:15px 14px}.p75ind .detail{padding:6px 14px 20px 22px}}';

  function once() {
    if (document.getElementById('p75ind-css')) return;
    var st = document.createElement('style'); st.id = 'p75ind-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function period(p, freq) {
    var y = +p.slice(0, 4), m = +p.slice(5, 7);
    return freq === 'Q' ? 'Q' + Math.ceil(m / 3) + ' ' + y : MON[m - 1] + ' ' + y;
  }
  function fmt(v, dec) { return v == null ? '–' : (Math.abs(v) >= 1000 ? Math.round(v).toLocaleString('en-US') : v.toFixed(dec)); }
  function unitShort(u) { return /^%/.test(u) ? '%' : u === 'pts' ? 'pts' : u.split(' ')[0]; }
  function change(ind) {
    var d = ind.latest.value - ind.prior.value, small = Math.abs(d) < Math.pow(10, -ind.dec) / 2;
    var col = small || !ind.bad ? FLAT : ((d > 0) === (ind.bad === 'up') ? BAD : GOOD);
    return { txt: small ? 'unch.' : (d > 0 ? '▲ ' : '▼ ') + fmt(Math.abs(d), ind.dec), col: col };
  }
  function toneCol(t) { return t === 'good' ? GOOD : t === 'bad' ? BAD : FLAT; }

  function spark(ser, w, h) {
    var v = ser.map(function (p) { return p[1]; }), mn = Math.min.apply(null, v), mx = Math.max.apply(null, v), rg = (mx - mn) || 1;
    var pts = v.map(function (x, i) { return (i / (v.length - 1) * w).toFixed(1) + ',' + (h - 3 - (x - mn) / rg * (h - 6)).toFixed(1); });
    var last = pts[pts.length - 1].split(',');
    return '<svg class="spk" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><polyline fill="none" stroke="' + GOLD + '" stroke-width="1.6" stroke-linejoin="round" points="' + pts.join(' ') + '"/>' +
      '<circle cx="' + Math.min(+last[0], w - 2.5) + '" cy="' + last[1] + '" r="2.3" fill="' + GOLD + '"/></svg>';
  }

  var D = null, CH = {};
  function chart(ind, months) {
    var n = ind.freq === 'Q' ? Math.ceil(months / 3) : months, ser = ind.series.slice(-n - 1);
    var box = document.querySelector('.p75ind .list'), bw = box ? box.clientWidth - 48 : 640;
    var W = Math.round(Math.max(300, Math.min(640, bw))), H = W < 480 ? 190 : 210, L = 42, R = 10, T = 12, B = 26;   // draw at real width so labels stay readable on phones
    var v = ser.map(function (p) { return p[1]; }), mn = Math.min.apply(null, v), mx = Math.max.apply(null, v);
    if (mn > 0 && ind.unit.indexOf('YoY') < 0 && ind.id !== 'gdp' && ind.id !== 'payrolls') mn = Math.min(mn, mn - (mx - mn) * .1);
    var pad = (mx - mn) * .08 || .5; mn -= pad; mx += pad;
    var x = function (i) { return L + i / (ser.length - 1) * (W - L - R); }, y = function (val) { return T + (mx - val) / (mx - mn) * (H - T - B); };
    var idx = {}; ser.forEach(function (p, i) { idx[p[0]] = i; });
    var bands = (D.recessions || []).map(function (r) {
      var a = idx[r[0]], b = idx[r[1]];
      if (a == null && b == null) { if (r[0] < ser[0][0] && r[1] > ser[ser.length - 1][0]) { a = 0; b = ser.length - 1; } else return ''; }
      if (a == null) a = 0; if (b == null) b = ser.length - 1;
      return '<rect x="' + x(a).toFixed(1) + '" y="' + T + '" width="' + Math.max(3, x(b) - x(a)).toFixed(1) + '" height="' + (H - T - B) + '" fill="#A9A396" opacity=".13"/>';
    }).join('');
    var ticks = [0, .5, 1].map(function (f) { return mn + (mx - mn) * (.12 + f * .76); });
    var zero = mn < 0 && mx > 0 ? '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(0).toFixed(1) + '" y2="' + y(0).toFixed(1) + '" stroke="#5a5750" stroke-dasharray="3 3"/>' : '';
    var pts = ser.map(function (p, i) { return x(i).toFixed(1) + ',' + y(p[1]).toFixed(1); });
    var id = ind.id + months; CH[id] = { ind: ind, ser: ser, x: x, y: y, W: W };
    return '<div class="chart" data-ch="' + id + '"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(ind.name) + ' over the last ' + (months / 12) + ' years">' + bands +
      ticks.map(function (t) { return '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" stroke="#2A2B2F"/>' +
        '<text x="' + (L - 7) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11.5" fill="#A9A396" font-family="Manrope,sans-serif">' + fmt(t, Math.abs(mx - mn) > 50 ? 0 : 1) + '</text>'; }).join('') + zero +
      '<path d="M' + x(0) + ',' + (H - B) + ' L' + pts.join(' L') + ' L' + x(ser.length - 1) + ',' + (H - B) + ' Z" fill="' + GOLD + '" opacity=".09"/>' +
      '<polyline fill="none" stroke="' + GOLD + '" stroke-width="2" stroke-linejoin="round" points="' + pts.join(' ') + '"/>' +
      '<line class="hl" x1="0" x2="0" y1="' + T + '" y2="' + (H - B) + '" stroke="#5a5750" opacity="0"/>' +
      '<circle class="dot" cx="' + x(ser.length - 1).toFixed(1) + '" cy="' + y(v[v.length - 1]).toFixed(1) + '" r="4" fill="' + GOLD + '" stroke="#17181B" stroke-width="2"/>' +
      '<text x="' + L + '" y="' + (H - 7) + '" font-size="11.5" fill="#A9A396" font-family="Manrope,sans-serif">' + period(ser[0][0], ind.freq) + '</text>' +
      '<text x="' + (W - R) + '" y="' + (H - 7) + '" text-anchor="end" font-size="11.5" fill="#A9A396" font-family="Manrope,sans-serif">' + period(ser[ser.length - 1][0], ind.freq) + '</text>' +
      '</svg><div class="tip"></div></div>';
  }
  function wireChart(root) {
    root.querySelectorAll('.chart').forEach(function (el) {
      var c = CH[el.getAttribute('data-ch')]; if (!c) return;
      var tip = el.querySelector('.tip'), dot = el.querySelector('.dot'), hl = el.querySelector('.hl'), n = c.ser.length - 1;
      function at(i) { dot.setAttribute('cx', c.x(i)); dot.setAttribute('cy', c.y(c.ser[i][1])); }
      function show(cx) {
        var r = el.getBoundingClientRect(), px = (cx - r.left) / r.width * c.W;
        var i = Math.max(0, Math.min(n, Math.round((px - c.x(0)) / (c.x(1) - c.x(0)))));
        at(i); hl.setAttribute('x1', c.x(i)); hl.setAttribute('x2', c.x(i)); hl.setAttribute('opacity', 1);
        tip.textContent = period(c.ser[i][0], c.ind.freq) + ' · ' + fmt(c.ser[i][1], c.ind.dec) + ' ' + unitShort(c.ind.unit);
        tip.style.left = Math.max(12, Math.min(88, c.x(i) / c.W * 100)) + '%'; tip.style.opacity = 1;
      }
      function hide() { at(n); hl.setAttribute('opacity', 0); tip.style.opacity = 0; }
      el.addEventListener('mousemove', function (e) { show(e.clientX); });
      el.addEventListener('touchmove', function (e) { show(e.touches[0].clientX); }, { passive: true });
      el.addEventListener('mouseleave', hide); el.addEventListener('touchend', hide);
    });
  }

  function detail(ind, months) {
    return '<div class="ranges" role="group" aria-label="Time range">' + [[12, '1Y'], [60, '5Y'], [120, '10Y']].map(function (r) {
        return '<button class="rb" type="button" aria-pressed="' + (r[0] === months) + '" data-r="' + ind.id + ':' + r[0] + '">' + r[1] + '</button>';
      }).join('') + '</div>' + chart(ind, months) +
      '<div class="foot">' + esc(ind.note) + '. Latest: <b>' + fmt(ind.latest.value, ind.dec) + ' ' + esc(ind.unit) + '</b> for ' + period(ind.latest.period, ind.freq) +
      '. Shaded bands mark U.S. recessions. <a href="' + esc(ind.source) + '" target="_blank" rel="noopener">Source: FRED</a></div>';
  }

  function page(d) {
    var by = {}; d.indicators.forEach(function (i) { by[i.id] = i; });
    var asof = new Date(d.generated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
    var h = '<div class="wrap"><div class="eyebrow">News</div><h1>Economic indicators</h1>' +
      '<p class="lede">The numbers that move bonds, in one place: inflation, growth, jobs, rates and housing. Tap a category for its indicators, then tap any indicator for its full history.</p>' +
      '<div class="asof">Updated <b>' + asof + '</b> · refreshed every weekday from FRED</div>';
    h += '<div class="tiles">' + d.indicators.filter(function (i) { return i.headline; }).map(function (i) {
      var c = change(i);
      return '<div class="tile"><div class="l">' + esc(i.headline) + '</div><div class="v num">' + fmt(i.latest.value, i.dec) + '<small>' + esc(unitShort(i.unit)) + '</small></div>' +
        '<div class="c num" style="color:' + c.col + '">' + c.txt + '<span class="p">' + period(i.latest.period, i.freq) + '</span></div></div>';
    }).join('') + '</div>';
    var chev = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
    h += '<div class="list">' + d.categories.map(function (cat) {
      return '<button class="cat" type="button" aria-expanded="false" data-c="' + cat.id + '"><span class="n">' + esc(cat.name) + '</span>' +
        (cat.status ? '<span class="pill" style="color:' + toneCol(cat.tone) + '">' + esc(cat.status) + '</span>' : '') + chev + '</button>' +
        '<div class="body" id="p75c-' + cat.id + '" hidden>' + cat.items.map(function (iid) {
          var i = by[iid]; if (!i) return ''; var c = change(i);
          return '<button class="ind" type="button" aria-expanded="false" data-i="' + i.id + '"><span class="nm">' + esc(i.name) + '<span>' + esc(i.unit) + ' · ' + period(i.latest.period, i.freq) + '</span></span>' +
            spark(i.series.slice(i.freq === 'Q' ? -8 : -24), 84, 26) +
            '<span class="val num">' + fmt(i.latest.value, i.dec) + '</span><span class="chg num" style="color:' + c.col + '">' + c.txt + '</span></button>' +
            '<div class="detail" id="p75d-' + i.id + '" hidden></div>';
        }).join('') + '</div>';
    }).join('') + '</div>';
    h += '<p class="note">Changes compare the latest reading with the one before it. Green and red show whether a move is good or bad news for the economy; rates are shown in neutral. Data: Federal Reserve Bank of St. Louis (FRED) and the agencies that publish each series. Not investment advice.</p></div>';
    return h;
  }

  function wire(host) {
    var by = {}; D.indicators.forEach(function (i) { by[i.id] = i; });
    host.addEventListener('click', function (e) {
      var rb = e.target.closest('.rb');
      if (rb) { var p = rb.getAttribute('data-r').split(':'), box = host.querySelector('#p75d-' + p[0]); box.innerHTML = detail(by[p[0]], +p[1]); wireChart(box); return; }
      var ib = e.target.closest('.ind');
      if (ib) {
        var id = ib.getAttribute('data-i'), dt = host.querySelector('#p75d-' + id), open = dt.hidden;
        if (open) { dt.innerHTML = detail(by[id], 60); wireChart(dt); }
        dt.hidden = !open; ib.setAttribute('aria-expanded', open); return;
      }
      var cb = e.target.closest('.cat');
      if (cb) { var body = host.querySelector('#p75c-' + cb.getAttribute('data-c')), o = body.hidden; body.hidden = !o; cb.setAttribute('aria-expanded', o); }
    });
  }

  var loading = false;
  function load(cb) {
    if (D) return cb(D);
    if (loading) return; loading = true;
    fetch(DATA).then(function (r) { return r.json(); }).then(function (j) { D = j; loading = false; cb(j); })
      .catch(function () { loading = false; cb(null); });
  }

  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75ind')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75ind';
    host.innerHTML = '<div class="wrap"><div class="eyebrow">News</div><h1>Economic indicators</h1><div class="load">Loading the latest readings…</div></div>';
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.indicators) { host.querySelector('.load').textContent = 'Indicator data is unavailable right now. Please try again shortly.'; return; }
      host.innerHTML = page(j); wire(host);
    });
  }
  function clear() { var h = document.querySelector('.p75ind'); if (h) h.remove(); }

  window.P75IND = { render: render, clear: clear };
})();
