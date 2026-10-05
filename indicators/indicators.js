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
    '.p75ind .tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:30px 0 34px}' +
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
    '.p75ind .rates{margin:0 0 34px}' +
    '.p75ind .yc{margin-top:40px}' +
    '.p75ind .yc h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:26px;margin:0 0 4px}' +
    '.p75ind .yc .rsub{color:#DDD7CA;font-size:14.5px;line-height:1.55;margin:0 0 14px;max-width:680px}' +
    '.p75ind .ycstats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:12px 0 14px}' +
    '.p75ind .ycstats div{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:10px 12px}' +
    '.p75ind .ycstats small{display:block;font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}' +
    '.p75ind .ycstats b{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;margin-top:4px}' +
    '.p75ind .ycstats span{font-size:12.5px;color:#DDD7CA}' +
    '.p75ind .ycread{font-size:15px;line-height:1.6;color:var(--cream);border-left:3px solid var(--gold);padding-left:14px;margin:14px 0}' +
    '.p75ind .yct{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:6px}' +
    '.p75ind .yct th{text-align:left;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:700;padding:0 8px 8px 0;border-bottom:1px solid var(--line)}' +
    '.p75ind .yct td{padding:8px 8px 8px 0;border-bottom:1px solid var(--line)}.p75ind .yct .r{text-align:right}' +
    '.p75ind .ychart{position:relative;margin-top:6px}.p75ind .ychart svg{display:block;width:100%}' +
    '@media (max-width:620px){.p75ind .ycstats{gap:6px}.p75ind .ycstats div{padding:8px}.p75ind .ycstats small{font-size:10px;letter-spacing:.03em}.p75ind .ycstats b{font-size:21px}.p75ind .ycstats span{font-size:11px}.p75ind .yct .hs{display:none}}' +
    '.p75ind .rates h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:26px;margin:0 0 4px}' +
    '.p75ind .rates .rsub{color:#DDD7CA;font-size:14.5px;line-height:1.55;margin:0 0 14px}' +
    '.p75ind .rcard{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:14px}' +
    '.p75ind .rlab{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);font-weight:700}' +
    '.p75ind .r10{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap}' +
    '.p75ind .r10 .big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:46px;line-height:1.05;margin-top:4px}' +
    '.p75ind .r10 .dl{font-family:Manrope,system-ui,sans-serif;font-weight:700;font-size:15px;margin-left:10px}.p75ind .r10 .wk{color:var(--muted);font-size:13px;margin-top:4px}' +
    '.p75ind .r10 svg{flex:1 1 220px;max-width:340px;height:70px}' +
    '.p75ind .rnarr{color:#E4DED1;font-size:15.5px;line-height:1.65;margin:14px 0 0;padding-top:14px;border-top:1px solid var(--line)}' +
    '.p75ind .rmini{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:14px}' +
    '.p75ind .rm{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:12px 14px}' +
    '.p75ind .rm .v{font-weight:700;font-size:20px;margin:4px 0 6px}.p75ind .rm .v span{font-size:13px;margin-left:8px}' +
    '.p75ind .rm svg{width:100%;height:34px;display:block}' +
    '.p75ind .rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;margin-top:12px}' +
    '.p75ind .rc{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:14px 16px}' +
    '.p75ind .rc .n{font-weight:700;font-size:13.5px;letter-spacing:.08em;text-transform:uppercase;color:#CFC9BC}' +
    '.p75ind .rc .t{color:var(--muted);font-size:12px;margin-top:2px}' +
    '.p75ind .rc .v{font-weight:700;font-size:24px;margin:8px 0 2px;font-variant-numeric:tabular-nums}' +
    '.p75ind .rc .s{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;color:var(--muted)}' +
    '.p75ind .rc p{color:#DDD7CA;font-size:14px;line-height:1.55;margin:8px 0 0}' +
    '.p75ind .rsrc{color:var(--muted);font-size:12px;margin-top:10px}' +
    '@media (max-width:720px){.p75ind .tiles{grid-template-columns:repeat(2,minmax(0,1fr))}.p75ind .rmini{grid-template-columns:1fr}.p75ind .r10 .big{font-size:40px}}' +
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
      '<p class="lede">The numbers that move bonds, in one place: inflation, growth, jobs, rates and housing starts. Tap a category for its indicators, then tap any indicator for its full history.</p>' +
      '<div class="asof">Updated <b>' + asof + '</b> · refreshed every weekday from FRED</div>';
    h += '<div class="tiles">' + d.indicators.filter(function (i) { return i.headline && i.id !== 'fedfunds' && i.id !== 't10'; }).map(function (i) {
      var c = change(i);
      return '<div class="tile"><div class="l">' + esc(i.headline) + '</div><div class="v num">' + fmt(i.latest.value, i.dec) + '<small>' + esc(unitShort(i.unit)) + '</small></div>' +
        '<div class="c num" style="color:' + c.col + '">' + c.txt + '<span class="p">' + period(i.latest.period, i.freq) + '</span></div></div>';
    }).join('') + '</div>';
    h += '<section class="rates" id="p75rates" hidden></section>';
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
    h += ycHTML(d.curve);
    h += '<p class="note">Changes compare the latest reading with the one before it. Green and red show whether a move is good or bad news for the economy. In Rates today, red means yields or rates went up and green means they came down. Data: Federal Reserve Bank of St. Louis (FRED) and the agencies that publish each series. This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis. Not investment advice.</p></div>';
    return h;
  }

  // ---------- The yield curve: 10-year minus 3-month, past inversions, recession odds ----------
  var MONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function ym(m) { return m ? MONS[+m.slice(5, 7) - 1] + ' ' + m.slice(0, 4) : '–'; }
  function mdiff(a, b) { return (+b.slice(0, 4) - +a.slice(0, 4)) * 12 + (+b.slice(5, 7) - +a.slice(5, 7)); }
  function ycReading(c) {
    var e = c.episodes[c.episodes.length - 1], hits = c.episodes.filter(function (x) { return x.recession; });
    var leads = hits.map(function (x) { return x.lead_from_inversion; }), lo = Math.min.apply(null, leads), hi = Math.max.apply(null, leads);
    var t = '';
    if (c.inverted) return 'The curve is inverted: 3-month bills pay more than 10-year notes. In the past, ' + hits.length + ' of ' + c.episodes.length +
      ' inversions were followed by a recession, ' + lo + ' to ' + hi + ' months after the curve first inverted.';
    if (e && e.uninverted && c.months_since_uninversion != null) {
      t = 'The curve turned positive in ' + ym(e.uninverted) + ' after ' + e.months_inverted + ' months inverted, and has stayed positive for ' + c.months_since_uninversion + ' months. ';
      if (!e.recession) {
        var since = mdiff(e.inverted, c.month.period);
        t += 'No recession has followed. It is now ' + since + ' months since it first inverted; in the past, recessions arrived ' + lo + ' to ' + hi + ' months after inversion' +
          (since > hi ? ', so this is the longest the signal has gone without one.' : '.');
      } else t += 'The recession that followed began in ' + ym(e.recession) + '.';
      return t;
    }
    return 'The curve is positive, with long-term rates above short-term rates, which is its normal shape.';
  }
  function ycChart(c, W) {
    var ser = c.series, H = W < 480 ? 200 : 230, L = 36, R = 8, T = 10, B = 24;
    var v = ser.map(function (p) { return p[1]; }), mn = Math.floor(Math.min.apply(null, v)), mx = Math.ceil(Math.max.apply(null, v));
    var x = function (i) { return L + i / (ser.length - 1) * (W - L - R); }, y = function (val) { return T + (mx - val) / (mx - mn) * (H - T - B); };
    var idx = {}; ser.forEach(function (p, i) { idx[p[0]] = i; });
    var bands = (c.recessions || []).map(function (r) {
      var a = idx[r[0]] != null ? idx[r[0]] : 0, b = idx[r[1]] != null ? idx[r[1]] : ser.length - 1;
      return '<rect x="' + x(a).toFixed(1) + '" y="' + T + '" width="' + Math.max(3, x(b) - x(a)).toFixed(1) + '" height="' + (H - T - B) + '" fill="#A9A396" opacity=".16"/>';
    }).join('');
    var grid = '', step = mx - mn > 4 ? 2 : 1;
    for (var g = mn; g <= mx; g += step) grid += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g).toFixed(1) + '" y2="' + y(g).toFixed(1) + '" stroke="' + (g === 0 ? '#6a665e' : '#2A2B2F') + '"' + (g === 0 ? ' stroke-dasharray="4 3"' : '') + '/>' +
      '<text x="' + (L - 6) + '" y="' + (y(g) + 4).toFixed(1) + '" text-anchor="end" font-size="11.5" fill="#A9A396" font-family="Manrope,sans-serif">' + (g > 0 ? '+' : '') + g + '</text>';
    var years = '', every = W < 480 ? 10 : 5;
    ser.forEach(function (p, i) { var yr = +p[0].slice(0, 4); if (p[0].slice(5) === '01' && yr % every === 0) years += '<text x="' + x(i).toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11.5" fill="#A9A396" font-family="Manrope,sans-serif">' + yr + '</text>'; });
    var line = ser.map(function (p, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(p[1]).toFixed(1); }).join('');
    // shade the inverted stretches below zero
    var neg = ser.map(function (p, i) { return x(i).toFixed(1) + ',' + y(Math.min(0, p[1])).toFixed(1); }).join(' ');
    var last = ser[ser.length - 1];
    return '<svg width="' + W + '" height="' + H + '" role="img" aria-label="10-year minus 3-month Treasury spread since ' + ser[0][0].slice(0, 4) + ', with recessions shaded">' + bands + grid + years +
      '<polygon points="' + x(0).toFixed(1) + ',' + y(0).toFixed(1) + ' ' + neg + ' ' + x(ser.length - 1).toFixed(1) + ',' + y(0).toFixed(1) + '" fill="' + BAD + '" opacity=".35"/>' +
      '<path d="' + line + '" fill="none" stroke="' + GOLD + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<circle cx="' + x(ser.length - 1).toFixed(1) + '" cy="' + y(last[1]).toFixed(1) + '" r="4" fill="' + GOLD + '" stroke="#17181B" stroke-width="2"/>' +
      '<line class="xh" y1="' + T + '" y2="' + (H - B) + '" stroke="#6a665e" stroke-dasharray="3 3" opacity="0"/><circle class="hd" r="4.5" fill="' + GOLD + '" stroke="#17181B" stroke-width="2" opacity="0"/>' +
      '<rect class="hit" x="' + L + '" y="' + T + '" width="' + (W - L - R) + '" height="' + (H - T - B) + '" fill="transparent"/></svg>' +
      '<div class="tip"></div>';
  }
  function drawYc(host) {
    var c = D.curve, box = host.querySelector('#p75yc-chart'); if (!c || !box) return;
    var W = Math.max(300, box.clientWidth); box.innerHTML = ycChart(c, W);
    var ser = c.series, H = W < 480 ? 200 : 230, L = 36, R = 8, T = 10, B = 24;
    var v = ser.map(function (p) { return p[1]; }), mn = Math.floor(Math.min.apply(null, v)), mx = Math.ceil(Math.max.apply(null, v));
    var x = function (i) { return L + i / (ser.length - 1) * (W - L - R); }, y = function (val) { return T + (mx - val) / (mx - mn) * (H - T - B); };
    var hit = box.querySelector('.hit'), xh = box.querySelector('.xh'), hd = box.querySelector('.hd'), tip = box.querySelector('.tip');
    function show(cx) {
      var r = box.getBoundingClientRect(), i = Math.round((cx - r.left - L) / (W - L - R) * (ser.length - 1)); i = Math.max(0, Math.min(ser.length - 1, i));
      var p = ser[i], X = x(i); xh.setAttribute('x1', X); xh.setAttribute('x2', X); xh.setAttribute('opacity', 1);
      hd.setAttribute('cx', X); hd.setAttribute('cy', y(p[1])); hd.setAttribute('opacity', 1);
      tip.textContent = ym(p[0]) + ' · ' + (p[1] > 0 ? '+' : '') + p[1].toFixed(2) + ' pts · recession odds ' + Math.round(p[2]) + '%';
      tip.style.left = Math.max(90, Math.min(W - 90, X)) + 'px'; tip.style.opacity = 1;
    }
    function hide() { xh.setAttribute('opacity', 0); hd.setAttribute('opacity', 0); tip.style.opacity = 0; }
    hit.addEventListener('mousemove', function (e) { show(e.clientX); });
    hit.addEventListener('touchmove', function (e) { show(e.touches[0].clientX); }, { passive: true });
    hit.addEventListener('mouseleave', hide); hit.addEventListener('touchend', hide);
  }
  function ycHTML(c) {
    if (!c || !c.series) return '';
    var l = c.latest, pr = c.month.prob, e = c.episodes;
    return '<section class="yc"><h2>The yield curve</h2><p class="rsub">The gap between the 10-year Treasury yield and the 3-month bill. When short rates rise above long ones, the curve is “inverted,” and that has come before every U.S. recession since the 1980s.</p>' +
      '<div class="rcard"><div class="ycstats">' +
      '<div><small>10-year minus 3-month</small><b class="num">' + (l.value > 0 ? '+' : '') + l.value.toFixed(2) + '</b><span>percentage points, ' + asof(l.date) + '</span></div>' +
      '<div><small>Recession odds, next 12 months</small><b class="num">' + Math.round(pr) + '%</b><span>NY Fed model, ' + ym(c.month.period) + '</span></div>' +
      '<div><small>Status</small><b>' + (c.inverted ? 'Inverted' : 'Positive') + '</b><span>' + (c.inverted ? 'short rates above long rates' : c.months_since_uninversion != null ? 'for ' + c.months_since_uninversion + ' months' : 'normal shape') + '</span></div></div>' +
      '<p class="ycread">' + esc(ycReading(c)) + '</p>' +
      '<div class="ychart chart" id="p75yc-chart"></div>' +
      '<p class="foot" style="margin-top:4px">Monthly average since ' + c.series[0][0].slice(0, 4) + '. Red marks inverted stretches; gray bands are recessions. Hover for the model’s recession odds in any month.</p>' +
      '<table class="yct"><thead><tr><th>Curve inverted</th><th class="hs">Months</th><th>Turned positive</th><th>Recession began</th><th class="r">After turning positive</th></tr></thead><tbody>' +
      e.map(function (x) {
        return '<tr><td>' + ym(x.inverted) + '</td><td class="hs">' + x.months_inverted + '</td><td>' + (x.uninverted ? ym(x.uninverted) : 'still inverted') + '</td><td>' + (x.recession ? ym(x.recession) : 'none') + '</td>' +
          '<td class="r num">' + (x.lead_from_uninversion == null ? '–' : x.lead_from_uninversion < 0 ? (-x.lead_from_uninversion) + ' mo before' : x.lead_from_uninversion + ' mo') + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<p class="foot">A handful of episodes is a small sample, and the 2020 recession was caused by the pandemic. Recession odds use the New York Fed’s published model, odds = N(−0.5333 − 0.6330 × spread), applied to the monthly average spread from daily Treasury yields, so they can differ slightly from the NY Fed’s own figure. Recession dates: NBER via FRED.</p></div></section>';
  }

  // ---------- Rates today (moved here from the News page): Treasury yields and Fed policy rates ----------
  var NEWS_API = 'https://news.point75.io/api/news';
  var POL = [['FFR', 'Fed funds target', 'FFR', 'The range the Fed sets for banks lending spare cash to each other overnight, unsecured.'],
    ['EFFR', 'Effective fed funds', 'EFFR', 'What banks actually paid overnight: the volume-weighted median, published daily by the New York Fed.'],
    ['SOFR', 'SOFR', 'Secured overnight', 'The cost of borrowing cash overnight against Treasuries. It replaced LIBOR as the dollar benchmark.'],
    ['IORB', 'Interest on reserves', 'IORB', 'What the Fed pays banks on the reserves they park at the central bank.'],
    ['ONRRP', 'ON RRP', 'Reverse repo', 'What the Fed pays money funds and others to park cash overnight. It sets a floor under short rates.']];
  function bps(b) { return b == null ? '' : (Math.abs(b) < 0.5 ? 'unch.' : (b > 0 ? '▲ +' : '▼ ') + Math.round(b) + 'bp'); }
  function bcol(b) { return b == null || Math.abs(b) < 0.5 ? FLAT : b > 0 ? BAD : GOOD; }   // higher yields = red, as on the rest of the site
  function mini(hist, w, h) {
    if (!hist || hist.length < 2) return '';
    var v = hist.map(function (p) { return p.value; }), mn = Math.min.apply(null, v), mx = Math.max.apply(null, v), rg = (mx - mn) || 1;
    var pts = v.map(function (x, i) { return (i / (v.length - 1) * w).toFixed(1) + ',' + (h - 3 - (x - mn) / rg * (h - 6)).toFixed(1); });
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true"><path d="M' + pts.join(' L') + ' L' + w + ',' + h + ' L0,' + h + ' Z" fill="' + GOLD + '" opacity=".1"/>' +
      '<polyline fill="none" stroke="' + GOLD + '" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round" points="' + pts.join(' ') + '"/></svg>';
  }
  function asof(d) { try { return new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }); } catch (e) { return d; } }
  function ratesHTML(s) {
    var y = s.yields || {}, t = y.DGS10, h = '<h2>Rates today</h2><p class="rsub">Treasury yields and the Fed’s policy rates, updated every weekday.</p>';
    if (t) {
      h += '<div class="rcard"><div class="r10"><div><div class="rlab">US 10-year Treasury</div><div class="big num">' + t.value.toFixed(2) + '%<span class="dl" style="color:' + bcol(t.change_1d_bps) + '">' + bps(t.change_1d_bps) + ' today</span></div>' +
        (t.change_1w_bps != null ? '<div class="wk">' + (t.change_1w_bps >= 0 ? '+' : '') + Math.round(t.change_1w_bps) + 'bp over the past week · as of ' + asof(t.date) + '</div>' : '') + '</div>' + mini(t.history, 340, 70) + '</div>' +
        (s.narrative ? '<p class="rnarr">' + esc(s.narrative) + '</p>' : '') +
        '<div class="rmini">' + ['DGS2', 'DGS30'].filter(function (k) { return y[k]; }).map(function (k) {
          var m = y[k]; return '<div class="rm"><div class="rlab" style="color:#CFC9BC">' + esc(m.label) + '</div><div class="v num">' + m.value.toFixed(2) + '%<span style="color:' + bcol(m.change_1d_bps) + '">' + bps(m.change_1d_bps) + '</span></div>' + mini(m.history, 220, 34) + '</div>';
        }).join('') + '</div></div>';
    }
    var r = s.policy_rates || {}, cards = POL.filter(function (p) { return r[p[0]] && typeof r[p[0]].value === 'number'; }).map(function (p) {
      var x = r[p[0]], val = p[0] === 'FFR' && typeof x.lower === 'number' ? x.lower.toFixed(2) + '–' + x.value.toFixed(2) + '%' : x.value.toFixed(2) + '%';
      return '<div class="rc"><div class="n">' + p[1] + '</div><div class="t">' + p[2] + '</div><div class="v num">' + val + '</div>' +
        '<div class="s"><span style="color:' + bcol(x.change_1w_bps) + '">' + bps(x.change_1w_bps) + (x.change_1w_bps != null ? ' 1w' : '') + '</span><span>as of ' + asof(x.date) + '</span></div><p>' + p[3] + '</p></div>';
    }).join('');
    if (cards) h += '<div class="rcard"><div class="rlab">Fed policy and overnight funding rates</div><div class="rgrid">' + cards + '</div>' +
      '<p class="rsrc">Source: FRED. EFFR and SOFR are published by the Federal Reserve Bank of New York. This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis.</p></div>';
    return h;
  }
  function loadRates(host) {
    var box = host.querySelector('#p75rates'); if (!box) return;
    fetch(NEWS_API).then(function (r) { return r.json(); }).then(function (j) {
      var s = j && j.market_snapshot; if (!s || (!s.yields && !s.policy_rates)) return;
      box.innerHTML = ratesHTML(s); box.hidden = false;
    }).catch(function () {});
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
      host.innerHTML = page(j); wire(host); loadRates(host); drawYc(host);
      var lw = host.clientWidth, tt; window.addEventListener('resize', function () { clearTimeout(tt); tt = setTimeout(function () { if (document.body.contains(host) && host.clientWidth !== lw) { lw = host.clientWidth; drawYc(host); } }, 150); });
    });
  }
  function clear() { var h = document.querySelector('.p75ind'); if (h) h.remove(); }

  window.P75IND = { render: render, clear: clear };
})();
