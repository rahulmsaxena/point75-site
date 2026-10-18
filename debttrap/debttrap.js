/* Point75 - Debt Trap page (/debt-trap, under Kinetics). Loaded by p75.js; data from news.point75.io/api/debttrap.
   How much U.S. debt must be refinanced, what it costs, and who is buying it. All data is U.S. government.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75DEBT) return;
  var API = 'https://news.point75.io/api/debttrap';
  // Categorical slots, validated for this dark surface (CVD + normal-vision separation, 3:1 contrast)
  var C1 = '#3987e5', C2 = '#d95926', C3 = '#199e70', C4 = '#c98500';

  var CSS =
    '.p75debt{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--grid:#232428;--cream:#EDE8DC;--muted:#C2BCAF;--soft:#E4DED1;--faint:#8a8d93;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75debt *{box-sizing:border-box}' +
    '.p75debt .wrap{max-width:1040px;margin:0 auto;padding:16px 20px 72px}' +
    '.p75debt .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75debt .eyebrow a{color:inherit;text-decoration:none}' +
    '.p75debt h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:4px 0 8px;letter-spacing:-.01em;display:inline-block;vertical-align:baseline;max-width:100%}' +
    '.p75debt .eyebrow:has(+ h1){display:inline-block;margin-right:14px;vertical-align:baseline}' +
    '.p75debt .lede{color:var(--soft);font-size:16px;line-height:1.6;margin:0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75debt .asof{font-size:12.5px;color:var(--muted);margin-top:10px}' +
    '.p75debt .asof b{color:var(--cream);font-weight:600}' +
    '.p75debt h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:24px;margin:32px 0 6px}' +
    '.p75debt h2 .n{color:var(--gold);font-size:15px;font-family:Manrope,sans-serif;font-weight:800;letter-spacing:.1em;margin-right:10px;vertical-align:4px}' +
    '.p75debt .sub{color:var(--soft);font-size:14.5px;line-height:1.55;margin:0 0 18px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75debt .card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:22px}' +
    '.p75debt .card h3{margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:700}' +
    '.p75debt .card .cap{color:var(--soft);font-size:13px;line-height:1.5;margin:0 0 10px}' +
    '.p75debt .tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:30px}' +
    '.p75debt .tile .v{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:44px;line-height:1.05;margin:10px 0 6px}' +
    '.p75debt .tile .l{color:var(--soft);font-size:14px;line-height:1.5}' +
    '.p75debt .tile .l a{color:var(--gold);text-decoration:none;font-weight:700;white-space:nowrap}' +
    '.p75debt .means{border-left:3px solid var(--gold);padding:4px 0 4px 16px;margin:0 0 18px}' +
    '.p75debt .means b{display:block;color:var(--gold);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:4px}' +
    '.p75debt .means p{margin:0;font-size:16px;line-height:1.6;color:var(--cream)}' +
    '.p75debt .two{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px}' +
    '.p75debt .gap{height:14px}' +
    '.p75debt .chart{position:relative;width:100%}' +
    '.p75debt .chart svg{display:block;width:100%;overflow:visible}' +
    '.p75debt .tip{position:absolute;z-index:3;pointer-events:none;background:#0b0c0e;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:12.5px;line-height:1.45;color:var(--cream);opacity:0;transition:opacity .12s;white-space:nowrap}' +
    '.p75debt .tip .t{color:var(--muted);font-size:11.5px;margin-bottom:3px}' +
    '.p75debt .tip i{display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:6px;vertical-align:0}' +
    '.p75debt .tip span{float:right;margin-left:14px;font-variant-numeric:tabular-nums;font-weight:700}' +
    '.p75debt .legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px;color:var(--soft);margin:0 0 10px}' +
    '.p75debt .legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:6px;vertical-align:-1px}' +
    '.p75debt .own{display:flex;height:34px;border-radius:6px;overflow:hidden;gap:2px;margin:6px 0 14px}' +
    '.p75debt .own div{height:100%;cursor:default}' +
    '.p75debt .ownk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}' +
    '.p75debt .ownk .k{font-size:12px;color:var(--muted);letter-spacing:.04em}' +
    '.p75debt .ownk .k i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:6px;vertical-align:-1px}' +
    '.p75debt .ownk .a{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:24px;margin-top:4px}' +
    '.p75debt .ownk .p{color:var(--soft);font-size:12.5px}' +
    '.p75debt table{width:100%;border-collapse:collapse;font-size:14px}' +
    '.p75debt th{text-align:left;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700;padding:0 8px 10px 0;border-bottom:1px solid var(--line)}' +
    '.p75debt th.r,.p75debt td.r{text-align:right}' +
    '.p75debt td{padding:9px 8px 9px 0;border-bottom:1px solid var(--line);color:var(--cream)}' +
    '.p75debt .num{font-variant-numeric:tabular-nums}' +
    '.p75debt .dn{color:var(--soft)}' +
    '.p75debt .note{color:var(--faint);font-size:12px;line-height:1.5;margin-top:12px}' +
    '.p75debt .foot{color:#A8A398;font-size:12px;line-height:1.6;margin-top:32px;border-top:1px solid var(--line);padding-top:18px}' +
    '.p75debt .load{color:var(--muted);padding:40px 0}' +
    // One Shot: title line, overview dials, sections that fold open one at a time
    '.p75debt .hd-t{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;margin-bottom:8px}.p75debt .hd-t h1{margin:0}.p75debt .hd-t .asof{margin:0 0 0 auto}' +
    '.p75debt .hd-t .eyebrow{display:inline}' +
    '.p75debt .dt-ov{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:16px 0 14px}' +
    '.p75debt button.dt-ovc{display:flex;flex-direction:column;gap:6px;width:100%;padding:14px 16px;border-radius:14px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);color:inherit;font:inherit;text-align:left;cursor:pointer;transition:border-color .15s,transform .15s}' +
    '.p75debt button.dt-ovc:hover,.p75debt button.dt-ovc:focus-visible{border-color:var(--gold);outline:none}' +
    '@media (hover:hover){.p75debt button.dt-ovc:hover{transform:translateY(-2px)}}' +
    '.p75debt .dt-ovh{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E2DDD2;font-weight:800}' +
    '.p75debt .dt-go{color:var(--gold);letter-spacing:.02em;text-transform:none;font-size:13.5px}' +
    '.p75debt .dt-m{display:flex;align-items:center;gap:12px}' +
    '.p75debt .dt-d{flex:0 0 auto;width:112px}.p75debt .dt-d svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75debt .dt-r{display:flex;flex-direction:column;gap:3px;min-width:0}' +
    '.p75debt .dt-r b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:36px;line-height:1;text-shadow:0 0 14px currentColor}' +
    '.p75debt .dt-r em{font-style:normal;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}' +
    '.p75debt .dt-r > span{font-size:14px;line-height:1.45;color:#F1ECE2}' +
    '.p75debt .p75n{transition:transform 4.5s cubic-bezier(.37,0,.3,1);filter:drop-shadow(0 0 3px rgba(255,255,255,.6))}' +
    '.p75debt .p75f{stroke-dashoffset:100;transition:stroke-dashoffset 4.5s cubic-bezier(.37,0,.3,1)}.p75debt .dt-ov.go .p75f{stroke-dashoffset:0}' +
    '.p75debt .dt-panel{display:flex;flex-direction:column;padding:4px 20px;border-radius:16px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 18px 40px rgba(0,0,0,.45)}' +
    '.p75debt .dt-sec + .dt-sec{border-top:1px solid #34363C}' +
    '.p75debt .dt-tg{display:flex;align-items:center;gap:14px;width:100%;min-height:56px;padding:10px 0;background:none;border:0;color:inherit;font:inherit;cursor:pointer;text-align:left}' +
    '.p75debt .dt-tg:focus-visible{outline:3px solid #F2D27A;outline-offset:2px;border-radius:6px}' +
    '.p75debt .dt-h{color:var(--gold);font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.p75debt .dt-h .n{margin-right:10px;opacity:.75}' +
    '.p75debt .dt-tg:hover .dt-h{color:#F2D27A}' +
    '.p75debt .dt-sum{margin-left:auto;font-size:14.5px;font-weight:800;white-space:nowrap;text-shadow:0 0 10px currentColor}' +
    '.p75debt .dt-car{flex:0 0 auto;width:28px;height:28px;border-radius:50%;border:1.5px solid #8C7424;display:grid;place-items:center;transition:transform .2s,border-color .15s}' +
    '.p75debt .dt-car:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '.p75debt .dt-tg[aria-expanded="true"] .dt-car{transform:rotate(180deg);border-color:var(--gold)}' +
    '.p75debt .dt-body{padding:0 0 18px}.p75debt .dt-body[hidden]{display:none}' +
    '.p75debt .dt-body .sub{margin:0 0 12px}' +
    '.p75debt .dt-means{display:flex;align-items:flex-start;gap:10px;margin:0 0 10px;font-size:15.5px;line-height:1.55;color:#F1ECE2}.p75debt .dt-means b{color:#FFD23F}' +
    '.p75debt .dt-means i{flex:0 0 auto;width:9px;height:9px;margin-top:7px;border-radius:50%;background:var(--gold);animation:p75dping 1.8s ease-out infinite}' +
    '@keyframes p75dping{0%{box-shadow:0 0 0 0 rgba(242,210,122,.6)}80%,100%{box-shadow:0 0 0 9px rgba(242,210,122,0)}}' +
    '.p75debt .dt-body .card{background:#17181B}' +
    '@media (max-width:880px){.p75debt .dt-ov{grid-template-columns:1fr;gap:10px}.p75debt .hd-t{flex-direction:column;align-items:flex-start;gap:2px}.p75debt .hd-t .asof{margin:4px 0 0}.p75debt .lede{text-align:left}}' +
    '@media (max-width:560px){.p75debt .dt-panel{padding:2px 14px}.p75debt .dt-sum{display:none}.p75debt .dt-car{margin-left:auto}.p75debt .dt-d{width:96px}.p75debt .dt-r b{font-size:30px}}' +
    '@media (prefers-reduced-motion:reduce){.p75debt .dt-means i{animation:none}.p75debt button.dt-ovc:hover{transform:none}}' +

    '@media (max-width:880px){.p75debt .two{grid-template-columns:1fr}.p75debt .tiles{grid-template-columns:1fr}.p75debt .ownk{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:560px){.p75debt .wrap{padding:12px 16px 56px}.p75debt h1{font-size:24px}.p75debt .card{padding:16px}.p75debt .tile .v{font-size:38px}}';

  function once() {
    if (document.getElementById('p75debt-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(f);
    var st = document.createElement('style'); st.id = 'p75debt-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  function d8(s) { return new Date(String(s).slice(0, 10) + (String(s).length <= 7 ? '-15' : '') + 'T12:00:00Z'); }
  function mon(s, yr) { return d8(s).toLocaleDateString('en-US', yr === false ? { month: 'short', timeZone: 'UTC' } : { month: 'short', year: 'numeric', timeZone: 'UTC' }); }
  function money(b, dp) {   // $bn -> $10.8T / $840B
    if (b == null) return '–';
    return Math.abs(b) >= 1000 ? '$' + (b / 1000).toFixed(dp == null ? 1 : dp) + 'T' : '$' + Math.round(b).toLocaleString('en-US') + 'B';
  }
  function signedMoney(b) { return (b > 0 ? '+' : b < 0 ? '−' : '±') + money(Math.abs(b)); }

  // ---------- charts: drawn at the container's real width so text stays legible ----------
  var CHARTS = [];
  function slot(draw) { var id = 'p75dc' + CHARTS.length; CHARTS.push({ id: id, draw: draw }); return '<div class="chart" id="' + id + '"></div>'; }
  function drawAll(root) {
    CHARTS.forEach(function (c) { var el = root.querySelector('#' + c.id); if (el) c.draw(el, Math.max(260, el.clientWidth)); });
  }
  function tipAt(el, html, x, y) {
    var t = el.querySelector('.tip'); if (!t) { t = document.createElement('div'); t.className = 'tip'; el.appendChild(t); }
    t.innerHTML = html; t.style.opacity = 1;
    var w = t.offsetWidth, W = el.clientWidth;
    t.style.left = Math.max(0, Math.min(W - w, x - w / 2)) + 'px'; t.style.top = Math.max(-8, y - t.offsetHeight - 12) + 'px';
  }
  function tipOff(el) { var t = el.querySelector('.tip'); if (t) t.style.opacity = 0; }
  function niceMax(v) { var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }
  function ticks(lo, hi, n) {
    var step = niceMax((hi - lo) / n), out = [];
    for (var v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(6));
    return out;
  }
  var TXT = 'font-family="Manrope,sans-serif" font-size="12" fill="#8a8d93"';

  // Stacked columns (the maturity wall). keys: [{k, name, color}]
  function stackChart(rows, keys, labelOf, H) {
    return slot(function (el, W) {
      var L = 46, R = 8, T = 22, B = 26, iw = W - L - R, ih = H - T - B;
      var tot = rows.map(function (r) { return keys.reduce(function (s, k) { return s + (r[k.k] || 0); }, 0); });
      var ymax = niceMax(Math.max.apply(null, tot) * 1.08), gy = ticks(0, ymax, 4);
      var bw = iw / rows.length, barW = Math.min(46, bw * .62);
      var y = function (v) { return T + ih * (1 - v / ymax); };
      var s = '<svg width="' + W + '" height="' + H + '" role="img" aria-label="Treasury debt maturing each year">';
      gy.forEach(function (g) {
        s += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g) + '" y2="' + y(g) + '" stroke="#232428"/>' +
          '<text x="' + (L - 8) + '" y="' + (y(g) + 4) + '" text-anchor="end" ' + TXT + '>' + (g ? '$' + (g / 1000) + 'T' : '0') + '</text>';
      });
      rows.forEach(function (r, i) {
        var cx = L + bw * (i + .5), base = 0, segs = keys.filter(function (k) { return r[k.k] > 0; });
        segs.forEach(function (k, j) {
          var v = r[k.k], y0 = y(base), y1 = y(base + v), top = j === segs.length - 1;
          var h = Math.max(0, y0 - y1 - (j ? 2 : 0));   // 2px surface gap between segments
          var yy = y1, x = cx - barW / 2;
          if (top && h > 4) s += '<path d="M' + x + ',' + (yy + h) + 'V' + (yy + 4) + 'Q' + x + ',' + yy + ' ' + (x + 4) + ',' + yy + 'H' + (x + barW - 4) + 'Q' + (x + barW) + ',' + yy + ' ' + (x + barW) + ',' + (yy + 4) + 'V' + (yy + h) + 'Z" fill="' + k.color + '"/>';
          else s += '<rect x="' + x + '" y="' + yy + '" width="' + barW + '" height="' + h + '" fill="' + k.color + '"/>';
          base += v;
        });
        var tight = bw < 44, lab = labelOf(r, i);
        if (!tight || i % 2 === 0)   // on narrow screens label every other total so they don't collide
          s += '<text x="' + cx + '" y="' + (y(tot[i]) - 7) + '" text-anchor="middle" font-family="Manrope,sans-serif" font-size="' + (tight ? 11 : 12) + '" font-weight="700" fill="#E4DED1">' + money(tot[i]) + '</text>';
        s += '<text x="' + cx + '" y="' + (H - 7) + '" text-anchor="middle" ' + TXT + '>' + esc(tight && /^\d{4}$/.test(lab) ? '\u2019' + lab.slice(2) : lab) + '</text>' +
          '<rect class="hit" data-i="' + i + '" x="' + (cx - bw / 2) + '" y="' + T + '" width="' + bw + '" height="' + ih + '" fill="transparent"/>';
      });
      el.innerHTML = s + '</svg>';
      el.querySelectorAll('.hit').forEach(function (h) {
        h.addEventListener('mousemove', function (e) {
          var i = +h.getAttribute('data-i'), r = rows[i], b = el.getBoundingClientRect();
          tipAt(el, '<div class="t">Maturing in ' + esc(labelOf(r, i)) + '</div>' + keys.slice().reverse().map(function (k) {
            return '<div><i style="background:' + k.color + '"></i>' + esc(k.name) + '<span>' + money(r[k.k] || 0) + '</span></div>';
          }).join('') + '<div style="border-top:1px solid #2A2B2F;margin-top:4px;padding-top:4px">Total<span>' + money(tot[i]) + '</span></div>', e.clientX - b.left, y(tot[i]));
        });
        h.addEventListener('mouseleave', function () { tipOff(el); });
      });
    });
  }

  // Lines over time with a crosshair. series: [{name, color, points:[{date,value}], label}]
  function lineChart(series, fmtY, H, opts) {
    opts = opts || {};
    return slot(function (el, W) {
      var L = 48, R = opts.endLabels ? 96 : 12, T = 14, B = 26, iw = W - L - R, ih = H - T - B;
      var dates = series[0].points.map(function (p) { return p.date; });
      var all = []; series.forEach(function (s) { s.points.forEach(function (p) { if (p.value != null) all.push(p.value); }); });
      var lo = opts.zero ? 0 : Math.min.apply(null, all), hi = Math.max.apply(null, all), pad = (hi - lo) * .08 || 1;
      lo = opts.zero ? 0 : lo - pad; hi = hi + pad;
      var gy = ticks(lo, hi, 4); lo = Math.min(lo, gy[0]); hi = Math.max(hi, gy[gy.length - 1]);
      var t0 = d8(dates[0]).getTime(), t1 = d8(dates[dates.length - 1]).getTime();
      var x = function (d) { return L + iw * (d8(d).getTime() - t0) / ((t1 - t0) || 1); };
      var y = function (v) { return T + ih * (1 - (v - lo) / (hi - lo)); };
      var s = '<svg width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(opts.aria || '') + '">';
      gy.forEach(function (g) {
        s += '<line x1="' + L + '" x2="' + (L + iw) + '" y1="' + y(g) + '" y2="' + y(g) + '" stroke="#232428"/>' +
          '<text x="' + (L - 8) + '" y="' + (y(g) + 4) + '" text-anchor="end" ' + TXT + '>' + fmtY(g, true) + '</text>';
      });
      var y0 = +dates[0].slice(0, 4), y1 = +dates[dates.length - 1].slice(0, 4), every = Math.max(1, Math.ceil((y1 - y0 + 1) / Math.max(2, Math.floor(iw / 70))));
      for (var yr = y0; yr <= y1; yr++) {
        if ((yr - y0) % every) continue;
        var xx = x(yr + '-01-01'); if (xx < L - 1 || xx > L + iw) continue;
        s += '<line x1="' + xx + '" x2="' + xx + '" y1="' + (T + ih) + '" y2="' + (T + ih + 4) + '" stroke="#3a3b40"/>' +
          '<text x="' + xx + '" y="' + (H - 7) + '" text-anchor="middle" ' + TXT + '>' + yr + '</text>';
      }
      (opts.marks || []).forEach(function (m) {
        var mx = x(m.date), my = y(m.value);
        s += '<circle cx="' + mx + '" cy="' + my + '" r="4" fill="#17181B" stroke="#E4DED1" stroke-width="2"/>' +
          '<text x="' + Math.min(L + iw - 4, Math.max(L + 4, mx)) + '" y="' + (my + (m.below ? 20 : -10)) + '" text-anchor="' + (mx > L + iw * .8 ? 'end' : mx < L + iw * .2 ? 'start' : 'middle') + '" font-family="Manrope,sans-serif" font-size="12" font-weight="700" fill="#E4DED1">' + esc(m.text) + '</text>';
      });
      series.forEach(function (sr) {
        var d = '', pen = false;
        sr.points.forEach(function (p) {
          if (p.value == null) { pen = false; return; }
          d += (pen ? 'L' : 'M') + x(p.date).toFixed(1) + ',' + y(p.value).toFixed(1); pen = true;
        });
        var last = sr.points[sr.points.length - 1];
        s += '<path d="' + d + '" fill="none" stroke="' + sr.color + '" stroke-width="2" stroke-linejoin="round"/>' +
          '<circle cx="' + x(last.date) + '" cy="' + y(last.value) + '" r="4" fill="' + sr.color + '" stroke="#17181B" stroke-width="2"/>';
      });
      if (opts.endLabels) {   // end labels, spaced at least 15px apart so they never overlap
        var labs = series.map(function (sr) { var p = sr.points[sr.points.length - 1]; return { t: sr.label || sr.name, x: x(p.date) + 9, y: y(p.value) + 4 }; })
          .sort(function (a, b) { return a.y - b.y; });
        for (var li = 1; li < labs.length; li++) if (labs[li].y - labs[li - 1].y < 15) labs[li].y = labs[li - 1].y + 15;
        labs.forEach(function (lb) { s += '<text x="' + lb.x + '" y="' + lb.y + '" font-family="Manrope,sans-serif" font-size="12" font-weight="700" fill="#E4DED1">' + esc(lb.t) + '</text>'; });
      }
      s += '<line class="xh" x1="0" x2="0" y1="' + T + '" y2="' + (T + ih) + '" stroke="#5a5c62" stroke-dasharray="3 3" opacity="0"/>' +
        series.map(function (sr, i) { return '<circle class="hd" data-s="' + i + '" r="4.5" fill="' + sr.color + '" stroke="#17181B" stroke-width="2" opacity="0"/>'; }).join('') +
        '<rect class="hit" x="' + L + '" y="' + T + '" width="' + iw + '" height="' + ih + '" fill="transparent"/></svg>';
      el.innerHTML = s;
      var hit = el.querySelector('.hit'), xh = el.querySelector('.xh'), dots = el.querySelectorAll('.hd');
      function move(cx) {
        var b = el.getBoundingClientRect(), px = cx - b.left, best = 0, bd = 1e9;
        dates.forEach(function (dd, i) { var dx = Math.abs(x(dd) - px); if (dx < bd) { bd = dx; best = i; } });
        var X = x(dates[best]); xh.setAttribute('x1', X); xh.setAttribute('x2', X); xh.setAttribute('opacity', 1);
        var topY = 1e9;
        series.forEach(function (sr, i) { var p = sr.points[best]; if (p && p.value != null) { dots[i].setAttribute('cx', X); dots[i].setAttribute('cy', y(p.value)); dots[i].setAttribute('opacity', 1); topY = Math.min(topY, y(p.value)); } });
        tipAt(el, '<div class="t">' + (opts.tipDate ? opts.tipDate(dates[best]) : mon(dates[best])) + '</div>' + series.map(function (sr) {
          var p = sr.points[best]; return '<div>' + (series.length > 1 ? '<i style="background:' + sr.color + '"></i>' + esc(sr.name) : esc(sr.name)) + '<span>' + (p && p.value != null ? fmtY(p.value) : '–') + '</span></div>';
        }).join(''), X, topY);
      }
      function off() { xh.setAttribute('opacity', 0); dots.forEach(function (d) { d.setAttribute('opacity', 0); }); tipOff(el); }
      hit.addEventListener('mousemove', function (e) { move(e.clientX); });
      hit.addEventListener('touchmove', function (e) { move(e.touches[0].clientX); }, { passive: true });
      hit.addEventListener('mouseleave', off); hit.addEventListener('touchend', off);
    });
  }

  // ---------- Dials: the same tools-style speedometer as Pulse (220° sweep, coloured fill, tapered needle, hub) ----------
  var DCX = 100, DCY = 96, DR = 80, DSWEEP = 220;
  function dPt(deg, r) { var a = deg * Math.PI / 180; return [(DCX + r * Math.sin(a)).toFixed(2), (DCY - r * Math.cos(a)).toFixed(2)]; }
  function dArc(d0, d1, r) {
    var a = dPt(d0, r), b = dPt(d1, r);
    return 'M' + a[0] + ',' + a[1] + ' A' + r + ',' + r + ' 0 ' + (Math.abs(d1 - d0) > 180 ? 1 : 0) + ' ' + (d1 > d0 ? 1 : 0) + ' ' + b[0] + ',' + b[1];
  }
  // o: { v, min, max, rest, color, ticks:[values], labels:[[value,text,color]], aria, big:true|false, center:text }
  function dial(o) {
    var ang = function (v) { return -DSWEEP / 2 + (Math.max(o.min, Math.min(o.max, v)) - o.min) / (o.max - o.min) * DSWEEP; };
    var a0 = ang(o.rest), a1 = ang(o.v), sw = o.big ? 7 : 11, svg = '';
    svg += '<path d="' + dArc(-DSWEEP / 2, DSWEEP / 2, DR) + '" fill="none" stroke="#2A2C31" stroke-width="' + sw + '" stroke-linecap="round"/>';
    (o.zones || []).forEach(function (z) {
      svg += '<path d="' + dArc(ang(z[0]), ang(z[1]), DR + sw / 2 + 4) + '" fill="none" stroke="' + z[2] + '" stroke-opacity=".55" stroke-width="2"/>';
    });
    if (o.notch != null) {
      var nq = ang(o.notch), n1 = dPt(nq, DR - sw / 2 - 5), n2 = dPt(nq, DR + sw / 2 + 6);
      svg += '<line x1="' + n1[0] + '" y1="' + n1[1] + '" x2="' + n2[0] + '" y2="' + n2[1] + '" stroke="#F2D27A" stroke-width="4" stroke-linecap="round"/>';
    }
    if (Math.abs(a1 - a0) > .5)
      svg += '<path class="p75f" color="' + o.color + '" pathLength="100" stroke-dasharray="100 200" d="' + dArc(a0, a1, DR) + '" fill="none" stroke="' + o.color + '" stroke-width="' + sw + '" stroke-linecap="round" style="filter:drop-shadow(0 0 5px ' + o.color + '66)"/>';
    if (o.big) {
      for (var t = 0; t <= 40; t++) {
        var d = -DSWEEP / 2 + DSWEEP * t / 40, maj = t % 10 === 0, p = dPt(d, DR - (maj ? 16 : 13)), q = dPt(d, DR - 9);
        svg += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="' + (maj ? '#8A8D93' : '#3A3C42') + '" stroke-width="' + (maj ? 1.6 : 1) + '"/>';
      }
      (o.labels || []).forEach(function (l) {
        var d = ang(l[0]), p = dPt(d, DR + 20), anc = Math.abs(d) > 95 ? 'middle' : d < -20 ? 'end' : d > 20 ? 'start' : 'middle';
        svg += '<text x="' + p[0] + '" y="' + p[1] + '" dy=".35em" text-anchor="' + anc + '" font-size="11" font-weight="700" letter-spacing=".04em" fill="' + (l[2] || '#8A8D93') + '" font-family="Manrope,sans-serif">' + l[1] + '</text>';
      });
    }
    var len = o.big ? DR - 22 : DR - 26, nw = o.big ? 3.2 : 5;
    var as = o.from != null ? ang(o.from) : a0;   // needle start for the sweep (fill still grows from rest)
    svg += '<g class="p75n" data-a="' + a1.toFixed(1) + '" data-r="' + as.toFixed(1) + '" style="transform-origin:' + DCX + 'px ' + DCY + 'px;transform:rotate(' + as.toFixed(1) + 'deg)">' +
      '<path d="M' + (DCX - nw) + ',' + DCY + ' L' + DCX + ',' + (DCY - len) + ' L' + (DCX + nw) + ',' + DCY + ' Z" fill="#F4F1EA"/>' +
      '<line x1="' + DCX + '" y1="' + DCY + '" x2="' + DCX + '" y2="' + (DCY + (o.big ? 12 : 14)) + '" stroke="#F4F1EA" stroke-width="' + (o.big ? 3 : 4.5) + '" stroke-linecap="round"/></g>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="' + (o.big ? 8 : 11) + '" fill="#17181B" stroke="' + o.color + '" stroke-width="' + (o.big ? 2 : 3) + '"/>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="' + (o.big ? 2.6 : 3.6) + '" fill="#F4F1EA"/>';
    if (o.center != null)
      svg += '<text x="' + DCX + '" y="' + (DCY + 50) + '" text-anchor="middle" font-size="' + (o.centerSize || 34) + '" font-weight="800" fill="' + o.color + '" font-family="Manrope,sans-serif" style="font-variant-numeric:tabular-nums">' + o.center + '</text>';
    return '<svg viewBox="' + (o.big ? '-6 -12 212 146' : o.center == null ? '2 6 196 124' : '0 8 200 142') + '" role="img" aria-label="' + esc(o.aria || '').replace(/"/g, '&quot;') + '">' + svg + '</svg>';
  }

  function means(r) { return r ? '<div class="means"><b>What it means</b><p>' + esc(r.text) + '</p></div>' : ''; }

  // ---------- Page ----------
  function page(j) {
    CHARTS = [];
    var w = j.wall, rt = j.rates, it = j.interest, ow = j.owners, R = {};
    (j.readings || []).forEach(function (r) { R[r.key] = r; });
    var h = '<div class="wrap"><div class="hd-t"><span class="eyebrow"><a href="/kinetics">Kinetics</a> · Debt Trap</span><h1>The Debt Trap</h1>' +
      '<div class="asof">Updated <b>' + new Date(j.generated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      '</b> · official data, most of it published monthly</div></div>' +
      '<p class="lede">America borrows short, rolls its debt constantly, and pays whatever the market charges each time. ' +
      'Three questions decide whether that becomes a trap: how much has to be refinanced, what it costs, and who is still willing to lend.</p>';

    // Overview: one dial per question. Tap a card to open its section below.
    var ov = function (k, title, dialHtml, big, col, word, line) {
      return '<button type="button" class="dt-ovc" data-open="' + k + '" aria-label="' + esc(title + ': ' + big + '. Show the detail.') + '">' +
        '<span class="dt-ovh"><span>' + title + '</span><span class="dt-go">Details ›</span></span>' +
        '<span class="dt-m"><span class="dt-d">' + dialHtml + '</span><span class="dt-r"><b style="color:' + col + '">' + big + '</b>' +
        (word ? '<em style="color:' + col + '">' + word + '</em>' : '') + '<span>' + line + '</span></span></span></button>';
    };
    h += '<div class="dt-ov">' +
      (w ? ov('wall', 'Due in 12 months', dial({ v: w.next12_share, min: 0, max: 50, rest: 0, from: 0, color: '#FFB224', aria: Math.round(w.next12_share) + '% of marketable debt due within a year' }),
        money(w.next12_bn), '#FFB224', Math.round(w.next12_share) + '% of the debt', 'must be refinanced within a year.') : '') +
      (it ? ov('cost', 'Interest per tax dollar', dial({ v: it.cents_per_tax_dollar, min: 0, max: 40, rest: 0, from: 0, notch: it.cents_per_tax_dollar_prior, color: '#FF3D5E', aria: Math.round(it.cents_per_tax_dollar) + ' cents of every tax dollar goes to interest' }),
        Math.round(it.cents_per_tax_dollar) + '¢', '#FF3D5E', it.cents_per_tax_dollar_prior != null ? 'Up from ' + Math.round(it.cents_per_tax_dollar_prior) + '¢' : '', 'of every tax dollar goes to interest.' + (it.cents_per_tax_dollar_prior != null ? ' Notch: a year ago.' : '')) : '') +
      (ow ? ov('buyers', 'Held by foreigners', dial({ v: ow.foreign_share, min: 0, max: 60, rest: 0, from: 0, notch: ow.share_peak ? ow.share_peak.value : null, color: '#1FD8FF', aria: Math.round(ow.foreign_share) + '% of the debt is held abroad' }),
        Math.round(ow.foreign_share) + '%', '#1FD8FF', ow.share_peak ? 'Peak ' + Math.round(ow.share_peak.value) + '% in ' + ow.share_peak.date.slice(0, 4) : '', 'of public debt is held abroad.' + (ow.share_peak ? ' Notch: the peak.' : '')) : '') +
      '</div>';

    // Detail: three sections that fold open one at a time
    var sec = function (k, n, title, sum, col, reading, sub) {
      var on = OPEN === k;
      return '<section class="dt-sec"><button type="button" class="dt-tg" data-dt="' + k + '" aria-expanded="' + on + '" aria-controls="dts-' + k + '">' +
        '<span class="dt-h"><span class="n">' + n + '</span>' + title + '</span><span class="dt-sum" style="color:' + col + '">' + sum + '</span><span class="dt-car" aria-hidden="true"></span></button>' +
        '<div class="dt-body" id="dts-' + k + '"' + (on ? '' : ' hidden') + '>' +
        (reading ? '<p class="dt-means"><i aria-hidden="true"></i><span><b>What it means:</b> ' + esc(reading.text) + '</span></p>' : '') +
        '<p class="sub">' + sub + '</p>';
    };
    h += '<div class="dt-panel">';

    // 1. The wall
    if (w) {
      var keys = [{ k: 'bills', name: 'Bills (under 1 year)', color: C1 }, { k: 'notes', name: 'Notes (2–10 years)', color: C2 },
                  { k: 'bonds', name: 'Bonds (20–30 years)', color: C3 }, { k: 'other', name: 'TIPS and floating-rate', color: C4 }];
      var yrs = w.by_year.map(function (r) { return { year: r.year, bills: r.bills, notes: r.notes, bonds: r.bonds, other: (r.tips || 0) + (r.frn || 0) }; });
      h += sec('wall', '01', 'The wall', money(w.next12_bn) + ' due in 12 months', '#FFB224', R.wall, 'Every marketable Treasury outstanding, grouped by the year it comes due. Each one has to be repaid, almost always with new borrowing at whatever rates are then.') +
        '<div class="card"><h3>Treasury debt maturing each year</h3><p class="cap">' + money(w.total_bn) + ' outstanding across ' + w.securities + ' securities as of ' + mon(w.as_of) +
        '. Average time to maturity: ' + w.avg_years_to_maturity + ' years. ' + new Date().getFullYear() + ' shows only what is left of this year.</p>' +
        '<div class="legend">' + keys.map(function (k) { return '<span><i style="background:' + k.color + '"></i>' + k.name + '</span>'; }).join('') + '</div>' +
        stackChart(yrs, keys, function (r) { return String(r.year); }, 230) + '</div>';
    }
    if (rt) {
      var am = rt.avg_marketable;
      h += '<div class="gap"></div><div class="two"><div class="card"><h3>Average rate the government pays</h3><p class="cap">On all marketable debt. It moves slowly because only the debt that rolls over reprices.</p>' +
        lineChart([{ name: 'Average rate', color: C1, points: am.history }], function (v) { return v.toFixed(v < 10 && arguments[1] ? 1 : 2) + '%'; }, 190,
          { aria: 'Average interest rate on marketable Treasury debt', marks: [{ date: am.low.date, value: am.low.value, text: 'Low ' + am.low.value.toFixed(2) + '%', below: true }, { date: am.date, value: am.value, text: am.value.toFixed(2) + '%' }] }) +
        '</div><div class="card"><h3>The repricing</h3>' + (R.reprice ? '<p class="cap" style="margin:6px 0 12px;font-size:14px;color:#F1ECE2">' + esc(R.reprice.text) + '</p>' : '') +
        '<table><thead><tr><th>Rate</th><th class="r">Level</th></tr></thead><tbody>' +
        (w && w.maturing_coupon_rate != null ? '<tr><td>Coupon on notes and bonds maturing in 12 months</td><td class="r num">' + w.maturing_coupon_rate.toFixed(2) + '%</td></tr>' : '') +
        '<tr><td>Average rate on all marketable debt</td><td class="r num">' + am.value.toFixed(2) + '%</td></tr>' +
        (rt.avg_bills ? '<tr><td>Average rate on outstanding bills</td><td class="r num">' + rt.avg_bills.value.toFixed(2) + '%</td></tr>' : '') +
        '<tr><td>3-month bill today</td><td class="r num">' + rt.market.t3m.value.toFixed(2) + '%</td></tr>' +
        '<tr><td>10-year note today</td><td class="r num">' + rt.market.t10.value.toFixed(2) + '%</td></tr></tbody></table></div></div>';
    }
    if (w) h += '</div></section>';

    // 2. The cost
    if (it) {
      var hist = it.history.filter(function (p) { return p.interest != null; });
      var pts = function (k) { return hist.map(function (p) { return { date: p.date, value: p[k] }; }); };
      var lines = [{ name: 'Interest', label: 'Interest', color: C1, points: pts('interest') },
                   { name: 'Medicare', label: 'Medicare', color: C2, points: pts('medicare') },
                   { name: 'Defense', label: 'Defense', color: C3, points: pts('defense') }];
      h += sec('cost', '02', 'The cost', Math.round(it.cents_per_tax_dollar) + '¢ of each tax dollar', '#FF3D5E', R.cost, 'Net interest the government pays on its debt, compared with its biggest programs. Each point is a rolling 12-month total, so seasonal swings wash out.') +
        '<div class="two"><div class="card"><h3>Yearly spending, rolling 12 months</h3><p class="cap">Social Security, the largest line at ' + money(it.ttm.social_security) + ', is left off so the others stay readable. Medicare zigzags because its payment dates shift between months.</p>' +
        '<div class="legend">' + lines.map(function (l) { return '<span><i style="background:' + l.color + '"></i>' + l.name + '</span>'; }).join('') + '</div>' +
        lineChart(lines, function (v, ax) { return ax ? (v >= 1000 ? '$' + +(v / 1000).toFixed(2) + 'T' : '$' + Math.round(v) + 'B') : money(v); }, 220, { endLabels: true, aria: 'Interest, Medicare and defense spending' }) + '</div>' +
        '<div class="card"><h3>Cents of each tax dollar</h3><p class="cap">Interest as a share of federal revenue, rolling 12 months.</p>' +
        lineChart([{ name: 'Interest share', color: C1, points: it.cents_history }], function (v) { return Math.round(v) + '¢'; }, 165, { aria: 'Interest as cents per tax dollar' }) +
        '<table style="margin-top:14px"><tbody>' +
        '<tr><td>Interest, fiscal ' + it.fy + ' to date</td><td class="r num">' + money(it.fytd_interest_bn) + '</td></tr>' +
        (it.prior_fytd_interest_bn ? '<tr><td>Same point last year</td><td class="r num">' + money(it.prior_fytd_interest_bn) + '</td></tr>' : '') +
        '<tr><td>Tax revenue, fiscal ' + it.fy + ' to date</td><td class="r num">' + money(it.fytd_receipts_bn) + '</td></tr></tbody></table></div></div>' +
        '<p class="note">Through ' + mon(it.as_of) + '. The fiscal year runs October to September. Net interest is interest paid to the public minus interest the Treasury earns.</p></div></section>';
    }

    // 3. The buyers
    if (ow) {
      var priv = ow.foreign_bn - (ow.foreign_official_bn || 0);
      var parts = [{ n: 'U.S. investors', v: ow.domestic_bn, c: C1, d: 'Funds, banks, pensions, households' },
                   { n: 'Foreign private', v: priv, c: C2, d: 'Foreign funds and investors' },
                   { n: 'Foreign governments', v: ow.foreign_official_bn || 0, c: C4, d: 'Central banks, sovereign funds' },
                   { n: 'Federal Reserve', v: ow.fed_bn, c: C3, d: 'Held on the Fed’s balance sheet' }];
      var sum = parts.reduce(function (s, p) { return s + p.v; }, 0);
      h += sec('buyers', '03', 'The buyers', Math.round(ow.foreign_share) + '% held abroad', '#1FD8FF', R.buyers, 'Who owns the ' + money(ow.public_bn) + ' of debt held by the public. The more of it that rests with price-sensitive buyers, the more yields have to rise to attract them.') +
        '<div class="card"><h3>Who holds U.S. debt</h3><p class="cap">As of ' + mon(ow.as_of + '-01') + '. U.S. investors are what is left after foreign holders and the Fed.</p>' +
        '<div class="own" role="img" aria-label="Ownership split">' + parts.map(function (p) {
          return '<div title="' + esc(p.n) + ': ' + money(p.v) + ' (' + (100 * p.v / sum).toFixed(0) + '%)" style="width:' + (100 * p.v / sum).toFixed(2) + '%;background:' + p.c + '"></div>';
        }).join('') + '</div><div class="ownk">' + parts.map(function (p) {
          return '<div><div class="k"><i style="background:' + p.c + '"></i>' + esc(p.n) + '</div><div class="a num">' + money(p.v) + '</div><div class="p">' + (100 * p.v / sum).toFixed(0) + '% · ' + esc(p.d) + '</div></div>';
        }).join('') + '</div></div><div class="gap"></div>' +
        '<div class="two"><div class="card"><h3>Foreign share since 2000</h3><p class="cap">Share of debt held by the public owned by foreign investors, quarterly.</p>' +
        lineChart([{ name: 'Foreign share', color: C2, points: ow.share_history }], function (v) { return Math.round(v) + '%'; }, 200,
          { aria: 'Foreign share of U.S. debt since 2000', tipDate: function (d) { var x = d8(d); return 'Q' + (Math.floor(x.getUTCMonth() / 3) + 1) + ' ' + x.getUTCFullYear(); },
            marks: ow.share_peak ? [{ date: ow.share_peak.date, value: ow.share_peak.value, text: 'Peak ' + Math.round(ow.share_peak.value) + '%' }] : [] }) +
        '</div><div class="card"><h3>Largest foreign holders</h3><p class="cap">Change over the 12 months to ' + mon(ow.as_of + '-01') + '.</p>' +
        '<table><thead><tr><th>Holder</th><th class="r">Holds</th><th class="r">12-month change</th></tr></thead><tbody>' +
        ow.countries.map(function (c) {
          return '<tr><td>' + esc(c.name) + '</td><td class="r num">' + money(c.value, 2) + '</td><td class="r num dn">' + (c.change_12m == null ? '–' : (c.change_12m >= 0 ? '▲ ' : '▼ ') + signedMoney(c.change_12m)) + '</td></tr>';
        }).join('') + '</tbody></table></div></div>' +
        '<p class="note">Countries are where the securities are held in custody, not always who owns them: Belgium, Luxembourg and the Cayman Islands hold large amounts for investors elsewhere.</p></div></section>';
    }
    h += '</div>';   // the sections panel

    h += '<p class="foot">Debt Trap is built from U.S. Treasury data (Monthly Statement of the Public Debt, Monthly Treasury Statement, Average Interest Rates, Debt to the Penny and Treasury International Capital) and FRED (Federal Reserve Bank of St. Louis). ' +
      'This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis. For education, not financial advice.<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
    return h;
  }

  var OPEN = null;   // which section is open: wall, cost, buyers or none
  function wireSections(host) {
    if (host.getAttribute('data-dt-wired')) return; host.setAttribute('data-dt-wired', '1');
    host.addEventListener('click', function (e) {
      var oc = e.target.closest('[data-open]');   // an overview card: open its section and bring it into view
      if (oc) {
        var t = host.querySelector('.dt-tg[data-dt="' + oc.getAttribute('data-open') + '"]'); if (!t) return;
        if (t.getAttribute('aria-expanded') !== 'true') t.click();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      var tg = e.target.closest('.dt-tg'); if (!tg) return;
      var k = tg.getAttribute('data-dt'); OPEN = OPEN === k ? null : k;
      host.querySelectorAll('.dt-tg').forEach(function (t) {
        var on = t.getAttribute('data-dt') === OPEN, body = host.querySelector('#dts-' + t.getAttribute('data-dt'));
        t.setAttribute('aria-expanded', on ? 'true' : 'false'); if (body) body.hidden = !on;
      });
      if (OPEN) drawAll(host);   // charts in a just-opened section need their real width
    });
  }
  function sweep(host) {   // overview dials glide from the left end to their reading once the page settles
    setTimeout(function () { requestAnimationFrame(function () {
      var o = host.querySelector('.dt-ov'); if (!o) return; o.classList.add('go');
      o.querySelectorAll('.p75n').forEach(function (n) { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; });
    }); }, 650);
  }
  var cache = null, loading = false, waiting = [];
  function load(cb) {
    // Queue every caller: the site can rebuild the page while data is loading, and the redrawn page must hear back too
    if (cache) return cb(cache);
    waiting.push(cb); if (loading) return; loading = true;
    fetch(API).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { cache = j; })
      .catch(function () { cache = null; }).then(function () { loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(cache); }); });
  }

  var onResize = null;
  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75debt')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75debt';
    host.innerHTML = '<div class="wrap"><div class="eyebrow">Kinetics · Debt Trap</div><h1>The Debt Trap</h1><div class="load">Adding up the debt…</div></div>';
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !(j.wall || j.interest || j.owners)) { host.querySelector('.load').textContent = 'Debt Trap data is unavailable right now. Please try again shortly.'; return; }
      host.innerHTML = page(j); drawAll(host); wireSections(host); sweep(host);
      var last = host.clientWidth, t;
      onResize = function () { clearTimeout(t); t = setTimeout(function () { if (host.clientWidth !== last) { last = host.clientWidth; drawAll(host); } }, 150); };
      window.addEventListener('resize', onResize);
    });
  }
  function clear() {
    var h = document.querySelector('.p75debt'); if (h) h.remove();
    if (onResize) { window.removeEventListener('resize', onResize); onResize = null; }
  }

  window.P75DEBT = { render: render, clear: clear };
})();
