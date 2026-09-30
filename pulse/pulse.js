/* Point75 - Bond Pulse page (/pulse). Loaded by p75.js; data from news.point75.io/api/pulse.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75PULSE) return;
  var API = 'https://news.point75.io/api/pulse';
  var BULL = '#3D8BFF', BEAR = '#E5484D', NEUT = '#9AA0A6';

  var CSS =
    '.p75pulse{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--muted:#C2BCAF;--soft:#E4DED1;--gold:#C9A227;' +
      '--bull:' + BULL + ';--bear:' + BEAR + ';background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75pulse *{box-sizing:border-box}' +
    '.p75pulse .wrap{max-width:1040px;margin:0 auto;padding:44px 20px 72px}' +
    '.p75pulse .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75pulse h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:38px;line-height:1.12;margin:8px 0 10px;letter-spacing:-.01em}' +
    '.p75pulse .lede{color:var(--soft);font-size:16px;line-height:1.6;max-width:680px;margin:0}' +
    '.p75pulse .asof{font-size:12.5px;color:var(--muted);margin-top:10px}' +
    '.p75pulse .asof b{color:var(--cream);font-weight:600}' +
    '.p75pulse h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:25px;margin:54px 0 6px}' +
    '.p75pulse h2 + .sub{color:var(--soft);font-size:14.5px;line-height:1.55;margin:0 0 18px;max-width:720px}' +
    // instruments
    '.p75pulse .inst{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;margin-top:30px}' +
    '.p75pulse .inst .card{display:flex;flex-direction:column}' +
    '.p75pulse .card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:22px}' +
    '.p75pulse .card h3{margin:0 0 2px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:700}' +
    '.p75pulse .meter{display:flex;gap:18px;align-items:center}' +
    '.p75pulse .meter{flex:1}.p75pulse .meter svg{flex:0 0 auto;width:230px;height:auto}' +
    '.p75pulse .reading{flex:1;min-width:0}' +
    '.p75pulse .big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:58px;line-height:1;margin:6px 0 4px}' +
    '.p75pulse .verdict{font-size:19px;font-weight:700;margin-bottom:10px}' +
    '.p75pulse .hint{color:var(--soft);font-size:13px;line-height:1.5}' +
    '.p75pulse .sg{margin:6px auto 0;max-width:340px;width:100%}.p75pulse .sg svg{display:block;width:100%;height:auto}' +
    '@media (prefers-reduced-motion:reduce){.p75pulse .hg{transition:none!important}}' +
    '.p75pulse .hg{transition:y 1.6s cubic-bezier(.2,.8,.2,1),height 1.6s cubic-bezier(.2,.8,.2,1)}' +
    // why lists
    '.p75pulse .why{display:grid;grid-template-columns:1fr 1fr;gap:18px}' +
    '.p75pulse .row{display:grid;grid-template-columns:26px 1fr;gap:10px;padding:12px 0;border-top:1px solid var(--line)}' +
    '.p75pulse .row:first-of-type{border-top:0}' +
    '.p75pulse .row .nm{font-weight:800;font-size:16px;color:#FFFFFF;letter-spacing:.005em;display:flex;justify-content:space-between;gap:10px}' +
    '.p75pulse .row .tx{color:var(--soft);font-size:13.5px;line-height:1.5;margin-top:2px}' +
    '.p75pulse .ic{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:800;color:#0b0c0e;margin-top:1px}' +
    '.p75pulse .bar{height:6px;border-radius:3px;background:#26272b;margin-top:8px;overflow:hidden}' +
    '.p75pulse .bar i{display:block;height:100%;border-radius:3px}' +
    '.p75pulse .note{color:var(--soft);font-size:12px;line-height:1.5;margin-top:12px}' +
    // auctions
    '.p75pulse table{width:100%;border-collapse:collapse;font-size:14px}' +
    '.p75pulse th{text-align:left;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700;padding:0 10px 10px 0;border-bottom:1px solid var(--line)}' +
    '.p75pulse td{padding:11px 10px 11px 0;border-bottom:1px solid var(--line);vertical-align:top}' +
    '.p75pulse td small{display:block;color:var(--soft);font-size:12px;margin-top:2px}' +
    '.p75pulse .num{font-variant-numeric:tabular-nums}' +
    '.p75pulse .pill{display:inline-block;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:700;letter-spacing:.02em}' +
    '.p75pulse .up{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}' +
    '.p75pulse .chip{border:1px solid var(--line);border-radius:99px;padding:6px 12px;font-size:13px;color:var(--soft)}' +
    '.p75pulse .chip b{color:var(--cream);font-weight:600}' +
    // stat cards
    '.p75pulse .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}' +
    '.p75pulse .stat .v{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:32px;margin:8px 0 2px}' +
    '.p75pulse .stat .c{font-size:13px;font-weight:700}' +
    '.p75pulse .stat .d{color:var(--soft);font-size:13px;line-height:1.5;margin-top:8px}' +
    '.p75pulse .stat .src{color:#77736a;font-size:11.5px;margin-top:10px}' +
    '.p75pulse .spark{position:relative;margin-top:12px}' +
    '.p75pulse .spark svg{display:block;width:100%;height:46px}' +
    '.p75pulse .tip{position:absolute;top:-30px;transform:translateX(-50%);background:#0b0c0e;border:1px solid var(--line);color:var(--cream);font-size:11.5px;padding:3px 8px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0}' +
    '.p75pulse .wire{border:1px dashed var(--line);border-radius:14px;padding:20px;color:var(--soft);font-size:14px}' +
    '.p75pulse .foot{color:#77736a;font-size:12px;line-height:1.6;margin-top:48px;border-top:1px solid var(--line);padding-top:18px}' +
    '.p75pulse .load{color:var(--muted);padding:40px 0}' +
    '@media (max-width:980px){.p75pulse .grid{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:880px){.p75pulse .inst,.p75pulse .why{grid-template-columns:1fr}}' +
    '@media (max-width:560px){.p75pulse .wrap{padding:30px 16px 56px}.p75pulse h1{font-size:30px}.p75pulse .grid{grid-template-columns:1fr}' +
      '.p75pulse .meter svg{width:150px}.p75pulse .big{font-size:48px}.p75pulse .card{padding:18px}' +
      '.p75pulse .hide-s{display:none}.p75pulse table{font-size:13px}}';

  function once() {
    if (document.getElementById('p75pulse-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(f);
    var st = document.createElement('style'); st.id = 'p75pulse-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  function fmtDate(d, withYear) {
    if (!d) return '';
    var x = new Date(String(d).slice(0, 10) + 'T12:00:00Z');
    return x.toLocaleDateString('en-US', withYear ? { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' } : { month: 'short', day: 'numeric', timeZone: 'UTC' });
  }
  function signed(v, dp, unit) { if (v == null) return ''; var s = v > 0 ? '+' : v < 0 ? '−' : '±'; return s + Math.abs(v).toFixed(dp) + (unit || ''); }
  function bullColor(s) { return s >= 20 ? BULL : s <= -20 ? BEAR : NEUT; }
  function stressColor(s) { return s < 30 ? '#2BD17E' : s < 55 ? '#B8D43A' : s < 75 ? '#F2A33A' : '#FF4D4D'; }

  // ---------- Mercury column (old blood-pressure meter) ----------
  function mercury(score) {
    var top = 52, bot = 322, h = bot - top;                 // +100 at top, -100 at bottom
    var y = top + h * (1 - (score + 100) / 200);
    var col = bullColor(score);
    var ticks = '';
    for (var v = -100; v <= 100; v += 10) {
      var ty = top + h * (1 - (v + 100) / 200), major = v % 50 === 0, mid = v % 20 === 0;
      ticks += '<line x1="' + (major ? 58 : mid ? 64 : 68) + '" x2="84" y1="' + ty + '" y2="' + ty + '" stroke="#2b2621" stroke-width="' + (major ? 1.6 : 1) + '"/>';
      if (mid) ticks += '<text x="55" y="' + (ty + 5) + '" text-anchor="end" font-size="14" font-weight="700" font-family="Georgia,serif" fill="#1f1a15">' + (v > 0 ? '+' : '') + v + '</text>';
    }
    return '<svg viewBox="0 0 170 400" role="img" aria-label="Bull/bear meter reading ' + score + '">' +
      '<defs>' +
        '<linearGradient id="p75plate" x1="0" x2="1"><stop offset="0" stop-color="#E9E1CC"/><stop offset=".5" stop-color="#F4EEDF"/><stop offset="1" stop-color="#DCD3BC"/></linearGradient>' +
        '<linearGradient id="p75glass" x1="0" x2="1"><stop offset="0" stop-color="#cfc8b6"/><stop offset=".35" stop-color="#fbf9f3"/><stop offset="1" stop-color="#bfb7a3"/></linearGradient>' +
        '<linearGradient id="p75merc" x1="0" x2="1"><stop offset="0" stop-color="' + col + '" stop-opacity=".75"/><stop offset=".4" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".55" stop-color="' + col + '"/><stop offset="1" stop-color="' + col + '" stop-opacity=".8"/></linearGradient>' +
        '<radialGradient id="p75bulb" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset=".35" stop-color="' + col + '"/><stop offset="1" stop-color="' + col + '" stop-opacity=".85"/></radialGradient>' +
      '</defs>' +
      '<rect x="6" y="6" width="158" height="388" rx="14" fill="#3a2a1d"/>' +                  // wooden case
      '<rect x="12" y="12" width="146" height="376" rx="10" fill="url(#p75plate)"/>' +            // ivory scale plate
      '<rect x="106" y="' + top + '" width="10" height="' + (h / 2) + '" rx="2" fill="' + BULL + '" opacity=".22"/>' +
      '<rect x="106" y="' + (top + h / 2) + '" width="10" height="' + (h / 2) + '" rx="2" fill="' + BEAR + '" opacity=".22"/>' +
      '<text x="134" y="' + (top + 30) + '" font-size="13" font-weight="800" letter-spacing="2" fill="' + BULL + '" transform="rotate(90 134 ' + (top + 30) + ')">BULL</text>' +
      '<text x="134" y="' + (bot - 62) + '" font-size="13" font-weight="800" letter-spacing="2" fill="' + BEAR + '" transform="rotate(90 134 ' + (bot - 62) + ')">BEAR</text>' +
      ticks +
      '<line x1="84" x2="124" y1="' + (top + h / 2) + '" y2="' + (top + h / 2) + '" stroke="#2b2621" stroke-width="1.6" stroke-dasharray="3 2"/>' +
      '<rect x="87" y="' + (top - 14) + '" width="14" height="' + (h + 28) + '" rx="7" fill="url(#p75glass)" stroke="#9c9480"/>' +   // glass tube
      '<rect class="hg" x="90" y="' + bot + '" width="8" height="0" rx="3" fill="url(#p75merc)" data-y="' + y.toFixed(1) + '" data-h="' + (bot - y + 8).toFixed(1) + '"/>' +
      '<circle cx="94" cy="' + (bot + 22) + '" r="15" fill="url(#p75bulb)" stroke="#9c9480"/>' +      // reservoir bulb
      '<text x="85" y="378" text-anchor="middle" font-size="9.5" letter-spacing="0.8" font-family="Georgia,serif" fill="#5b5244">POINT75 · BOND PULSE</text>' +
    '</svg>';
  }

  // ---------- Stress gauge (arc dial, static) ----------
  function mixHex(a, b, t) {
    var pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16), o = '#';
    [16, 8, 0].forEach(function (sh) {
      var ca = (pa >> sh) & 255, cb = (pb >> sh) & 255, c = Math.round(ca + (cb - ca) * t);
      o += (c < 16 ? '0' : '') + c.toString(16);
    });
    return o;
  }
  function arcColor(t) {
    var st = [[0, '#2BD17E'], [.3, '#B8D43A'], [.55, '#F2A33A'], [.75, '#FF4D4D'], [1, '#FF4D4D']];
    for (var i = 1; i < st.length; i++) if (t <= st[i][0]) return mixHex(st[i - 1][1], st[i][1], (t - st[i - 1][0]) / (st[i][0] - st[i - 1][0]));
    return st[st.length - 1][1];
  }
  function stressGauge(stress, label) {
    var cx = 160, cy = 150, r = 112, sw = 12, N = 72, v = Math.max(0, Math.min(100, stress)) / 100, col = stressColor(stress);
    function pt(t) { var a = (135 + 270 * t) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    var segs = '';
    for (var i = 0; i < N; i++) {
      if ((i + .5) / N > v) break;
      var p0 = pt(i / N), p1 = pt(Math.min(v, (i + 1.15) / N));
      segs += '<path d="M' + p0[0].toFixed(1) + ',' + p0[1].toFixed(1) + ' A' + r + ',' + r + ' 0 0 1 ' + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) +
        '" stroke="' + arcColor((i + .5) / N) + '" stroke-width="' + sw + '" fill="none"/>';
    }
    var s0 = pt(0), s1 = pt(1), k = pt(v);
    return '<div class="sg"><svg viewBox="0 0 320 270" role="img" aria-label="Stress reading ' + stress + ' out of 100, ' + esc(label || '') + '">' +
      '<path d="M' + s0[0].toFixed(1) + ',' + s0[1].toFixed(1) + ' A' + r + ',' + r + ' 0 1 1 ' + s1[0].toFixed(1) + ',' + s1[1].toFixed(1) + '" stroke="#2a2c31" stroke-width="' + sw + '" stroke-linecap="round" fill="none"/>' +
      '<circle cx="' + s0[0].toFixed(1) + '" cy="' + s0[1].toFixed(1) + '" r="' + sw / 2 + '" fill="' + arcColor(0) + '"/>' +
      segs +
      '<circle cx="' + k[0].toFixed(1) + '" cy="' + k[1].toFixed(1) + '" r="11" fill="#f4f1ea" stroke="' + col + '" stroke-width="4"/>' +
      '<text x="' + cx + '" y="' + (cy + 12) + '" text-anchor="middle" font-size="76" fill="#f4f1ea" font-family="\'Hedvig Letters Serif\',Georgia,serif">' + stress + '</text>' +
      '<text x="' + cx + '" y="' + (cy + 44) + '" text-anchor="middle" font-size="15" font-weight="700" letter-spacing="2.5" fill="' + col + '" font-family="Manrope,sans-serif">' + esc((label || '').toUpperCase()) + '</text>' +
      '<text x="' + cx + '" y="' + (cy + 68) + '" text-anchor="middle" font-size="12" fill="#8a8d93" font-family="Manrope,sans-serif">out of 100</text>' +
      '<text x="' + (s0[0] + 4).toFixed(1) + '" y="' + (s0[1] + 32).toFixed(1) + '" text-anchor="middle" font-size="12" fill="#8a8d93" font-family="Manrope,sans-serif">0 · calm</text>' +
      '<text x="' + (s1[0] - 4).toFixed(1) + '" y="' + (s1[1] + 32).toFixed(1) + '" text-anchor="middle" font-size="12" fill="#8a8d93" font-family="Manrope,sans-serif">100 · panic</text>' +
      '</svg></div>';
  }

  // ---------- Sparkline with hover ----------
  var sparkId = 0;
  function spark(hist, color, fmt) {
    if (!hist || hist.length < 2) return '';
    var id = 'p75sp' + (++sparkId), W = 300, H = 46, pad = 4;
    var vals = hist.map(function (p) { return p.value; });
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), rg = (mx - mn) || 1;
    var pts = vals.map(function (v, i) { return [pad + i * (W - 2 * pad) / (vals.length - 1), pad + (H - 2 * pad) * (1 - (v - mn) / rg)]; });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('');
    SPARKS[id] = { hist: hist, pts: pts, W: W, fmt: fmt };
    return '<div class="spark" data-sp="' + id + '"><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' +
      '<path d="' + line + 'L' + pts[pts.length - 1][0] + ',' + H + 'L' + pts[0][0] + ',' + H + 'Z" fill="' + color + '" opacity=".10"/>' +
      '<path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="2" vector-effect="non-scaling-stroke"/>' +
      '<circle class="dot" r="3.5" cx="' + pts[pts.length - 1][0] + '" cy="' + pts[pts.length - 1][1] + '" fill="' + color + '" stroke="#17181B" stroke-width="2" vector-effect="non-scaling-stroke"/>' +
      '</svg><div class="tip"></div></div>';
  }
  var SPARKS = {};
  function wireSparks(root) {
    root.querySelectorAll('.spark').forEach(function (el) {
      var s = SPARKS[el.getAttribute('data-sp')]; if (!s) return;
      var tip = el.querySelector('.tip'), dot = el.querySelector('.dot');
      function show(clientX) {
        var r = el.getBoundingClientRect(), x = (clientX - r.left) / r.width * s.W;
        var i = Math.round((x - s.pts[0][0]) / (s.pts[1][0] - s.pts[0][0]));
        i = Math.max(0, Math.min(s.pts.length - 1, i));
        dot.setAttribute('cx', s.pts[i][0]); dot.setAttribute('cy', s.pts[i][1]);
        tip.textContent = fmtDate(s.hist[i].date, true) + ' · ' + s.fmt(s.hist[i].value);
        tip.style.left = (s.pts[i][0] / s.W * 100) + '%'; tip.style.opacity = 1;
      }
      function hide() { var n = s.pts.length - 1; dot.setAttribute('cx', s.pts[n][0]); dot.setAttribute('cy', s.pts[n][1]); tip.style.opacity = 0; }
      el.addEventListener('mousemove', function (e) { show(e.clientX); });
      el.addEventListener('touchmove', function (e) { show(e.touches[0].clientX); }, { passive: true });
      el.addEventListener('mouseleave', hide); el.addEventListener('touchend', hide);
    });
  }

  function statCard(title, value, change, changeColor, desc, hist, color, fmt, src) {
    return '<div class="card stat"><h3>' + esc(title) + '</h3><div class="v num">' + value + '</div>' +
      '<div class="c" style="color:' + changeColor + '">' + change + '</div>' +
      spark(hist, color, fmt) + '<div class="d">' + desc + '</div><div class="src">' + src + '</div></div>';
  }
  function tone(v) { return v > 0 ? BEAR : v < 0 ? BULL : NEUT; }   // for yields/spreads: up = bearish for bonds

  // ---------- Page ----------
  function page(j) {
    var g = j.gauges || {}, b = g.bull || {}, s = g.stress || {};
    var h = '<div class="wrap"><div class="eyebrow">Pulse</div><h1>The bond market’s vital signs</h1>' +
      '<p class="lede">Two readings, taken from where real money moves: Treasury auctions, futures positioning, dealer balance sheets, the term premium and rate swings. No opinions, no chatter.</p>' +
      '<div class="asof">Updated <b>' + new Date(j.generated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }) +
      '</b> · refreshed hourly on weekdays</div>';

    // instruments
    h += '<div class="inst">' +
      '<div class="card"><h3>Bull / Bear</h3><div class="meter">' + (b.score != null ? mercury(b.score) : '') +
        '<div class="reading"><div class="big num" style="color:' + bullColor(b.score) + '">' + (b.score > 0 ? '+' : '') + (b.score != null ? b.score : '–') + '</div>' +
        '<div class="verdict" style="color:' + bullColor(b.score) + '">' + esc(b.label || 'No reading') + '</div>' +
        '<div class="hint"><b style="color:' + BULL + '">Blue</b> = bullish for bonds (prices up, yields down). <b style="color:' + BEAR + '">Red</b> = bearish (prices down, yields up). Scale runs from −100 to +100.</div></div></div></div>' +
      '<div class="card"><h3>Stress monitor</h3>' + (s.score != null ? stressGauge(s.score, s.label) : '') +
        '<div style="margin-top:auto;padding-top:16px">' +
        '<div class="hint" style="margin:4px 0 12px">Higher means more strain in volatility, dealer balance sheets and auction demand. Biggest drivers right now:</div>' +
        (s.components || []).slice().sort(function (x, y) { return y.pct * y.weight - x.pct * x.weight; }).slice(0, 3).map(function (c) {
          return '<div style="display:grid;grid-template-columns:1fr 34px;gap:10px;align-items:center;font-size:13px;margin-top:7px"><div>' + esc(c.name) +
            '<div class="bar" style="margin-top:5px"><i style="width:' + Math.max(3, c.pct) + '%;background:' + stressColor(c.pct) + '"></i></div></div>' +
            '<b class="num" style="text-align:right;color:' + stressColor(c.pct) + '">' + Math.round(c.pct) + '</b></div>';
        }).join('') + '</div></div>' +
      '</div>';

    // why
    var icon = function (v) { var c = v > 0 ? BULL : v < 0 ? BEAR : NEUT; return '<span class="ic" style="background:' + c + '">' + (v > 0 ? '▲' : v < 0 ? '▼' : '•') + '</span>'; };
    h += '<h2>Why the needles are where they are</h2><p class="sub">Every signal is shown, with the rule it follows. Nothing is hidden in a black box.</p><div class="why">' +
      '<div class="card"><h3>Bull / Bear votes</h3>' + (b.votes || []).map(function (v) {
        return '<div class="row">' + icon(v.vote) + '<div><div class="nm"><span>' + esc(v.name) + '</span><span style="color:' + (v.vote > 0 ? BULL : v.vote < 0 ? BEAR : NEUT) + '">' +
          (v.vote > 0 ? 'Bullish' : v.vote < 0 ? 'Bearish' : 'Neutral') + '</span></div><div class="tx">' + esc(v.why) + '</div></div></div>';
      }).join('') + '<div class="note">' + esc(b.note || '') + '</div></div>' +
      '<div class="card"><h3>Stress readings</h3>' + (s.components || []).map(function (c) {
        return '<div class="row" style="grid-template-columns:1fr"><div><div class="nm"><span>' + esc(c.name) + ' <span style="color:var(--muted);font-weight:500;font-size:12px">· weight ' + c.weight + '%</span></span>' +
          '<span class="num" style="color:' + stressColor(c.pct) + '">' + Math.round(c.pct) + '</span></div>' +
          '<div class="bar"><i style="width:' + Math.max(3, c.pct) + '%;background:' + stressColor(c.pct) + '"></i></div><div class="tx">' + esc(c.why) + '</div></div></div>';
      }).join('') + '<div class="note">' + esc(s.note || '') + '</div></div></div>';

    // auctions
    var a = j.auctions;
    if (a && a.recent && a.recent.length) {
      var gc = { strong: BULL, weak: BEAR, average: NEUT };
      h += '<h2>Who’s buying the debt?</h2><p class="sub">Each Treasury auction, graded against the last six auctions of the same maturity. Strong demand means more bids per bond and fewer bonds left with the dealers who must take the leftovers. Foreign and fund buyers show up as “indirect” bidders.</p>' +
        '<div class="card" style="overflow-x:auto"><table><thead><tr><th>Auction</th><th>Yield</th><th>Bids per $1</th><th class="hide-s">Indirect</th><th>Dealers kept</th><th>Grade</th></tr></thead><tbody>' +
        a.recent.map(function (r) {
          return '<tr><td><b>' + esc(r.term.replace(' ', '-')) + '</b>' + (r.reopening ? ' <span style="color:var(--muted);font-size:12px">reopening</span>' : '') + '<small>' + fmtDate(r.date, true) + ' · $' + r.size_bn + 'bn</small></td>' +
            '<td class="num">' + r.high_yield.toFixed(3) + '%</td>' +
            '<td class="num">' + r.btc.toFixed(2) + '<small>avg ' + r.avg_btc.toFixed(2) + '</small></td>' +
            '<td class="num hide-s">' + r.indirect.toFixed(1) + '%<small>avg ' + r.avg_indirect.toFixed(1) + '%</small></td>' +
            '<td class="num">' + r.dealer.toFixed(1) + '%<small>avg ' + r.avg_dealer.toFixed(1) + '%</small></td>' +
            '<td><span class="pill" style="background:' + gc[r.grade] + '22;color:' + gc[r.grade] + ';border:1px solid ' + gc[r.grade] + '66">' + r.grade.charAt(0).toUpperCase() + r.grade.slice(1) + '</span></td></tr>';
        }).join('') + '</tbody></table>' +
        (a.upcoming && a.upcoming.length ? '<div class="up"><span class="chip" style="border:0;padding-left:0">Coming up:</span>' + a.upcoming.map(function (u) {
          return '<span class="chip"><b>' + esc(u.label) + '</b> · ' + fmtDate(u.date) + (u.size_bn ? ' · $' + u.size_bn + 'bn' : '') + '</span>';
        }).join('') + '</div>' : '') +
        '<div class="note">Source: U.S. Treasury, Fiscal Data. Nominal notes and bonds only (no TIPS or floating-rate notes).</div></div>';
    }

    // the pros + plumbing
    var p = j.positioning, dl = j.dealers, r = j.rates, be = j.breakeven, tp = j.term_premium;
    var bn = function (v) { return (v < 0 ? '−$' : '$') + Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 0 }) + 'bn'; };
    var cards = [];
    if (p) {
      var am = p.asset_managers, hf = p.hedge_funds;
      cards.push(statCard('Asset managers', bn(am.value), signed(am.change_4w, 0, 'bn') + ' in 4 weeks', am.change_4w >= 0 ? BULL : BEAR,
        'Pension and mutual-fund money, net long Treasury futures. Rising = real buyers adding duration.', am.history, BULL, bn,
        'CFTC · week of ' + fmtDate(am.date) + ' · 10-year-note equivalent'));
      cards.push(statCard('Hedge funds', bn(hf.value), signed(hf.change_4w, 0, 'bn') + ' in 4 weeks', NEUT,
        'Mostly the “basis trade”: short futures against bonds they own, so a big short is normal. Watch for sudden unwinds.', hf.history, '#B7A8FF', bn,
        'CFTC · week of ' + fmtDate(hf.date) + ' · 10-year-note equivalent'));
    }
    if (dl) cards.push(statCard('Dealer inventory', '$' + Math.round(dl.value) + 'bn', signed(dl.change_4w_pct, 1, '%') + ' in 4 weeks', dl.change_4w_pct > 0 ? BEAR : BULL,
      'Treasuries the big banks are holding. Piling up means end buyers aren’t absorbing new supply.', dl.history, '#E0B84A', function (v) { return '$' + Math.round(v) + 'bn'; },
      'NY Fed · week of ' + fmtDate(dl.date)));
    if (r) cards.push(statCard('Rates volatility', r.vol.value.toFixed(1) + 'bp/day', 'Higher than ' + Math.round(r.vol.pct_1y) + '% of the past year', stressColor(r.vol.pct_1y),
      'How much the 10-year yield swings on a typical day (20-day average). The free cousin of the MOVE index.', r.vol.history, stressColor(r.vol.pct_1y), function (v) { return v.toFixed(1) + 'bp/day'; },
      'FRED · 10-year at ' + r.yield.value.toFixed(2) + '% on ' + fmtDate(r.yield.date)));
    if (tp) cards.push(statCard('Term premium', tp.value.toFixed(2) + '%', signed(tp.change * 100, 0, 'bp') + ' in 4 weeks', tone(tp.change),
      'Extra yield investors demand to lock money up for 10 years instead of rolling short bills. Rising = less trust in the long end.', tp.history, '#5FD0C5', function (v) { return v.toFixed(2) + '%'; },
      'FRED · Fed Board (Kim-Wright) · ' + fmtDate(tp.date)));
    if (be) cards.push(statCard('Inflation expectations', be.value.toFixed(2) + '%', signed(be.change * 100, 0, 'bp') + ' in 4 weeks', tone(be.change),
      'Inflation the bond market expects over the next 10 years (the breakeven between regular and inflation-protected Treasuries).', be.history, '#D88BFF', function (v) { return v.toFixed(2) + '%'; },
      'FRED · ' + fmtDate(be.date)));
    if (cards.length) h += '<h2>The pros and the plumbing</h2><p class="sub">What big money is doing, and the stress points underneath. Hover or tap a chart for past values.</p><div class="grid">' + cards.join('') + '</div>';

    h += '<h2>Live wire</h2><div class="wire">Live bond and macro headlines will appear here.</div>';

    h += '<p class="foot">Pulse is built from public data: U.S. Treasury (Fiscal Data), CFTC Traders in Financial Futures, Federal Reserve Bank of New York, and FRED (Federal Reserve Bank of St. Louis). This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis. ' +
      'Signals are simple rules for education and are not financial advice.<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
    return h;
  }

  function animate(host) {
    var m = host.querySelector('.hg'); if (!m) return;
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      m.setAttribute('y', m.getAttribute('data-y')); m.setAttribute('height', m.getAttribute('data-h'));
    }); });
  }

  var cache = null, loading = false;
  function load(cb) {
    if (cache) return cb(cache);
    if (loading) return; loading = true;
    fetch(API).then(function (r) { return r.json(); }).then(function (j) { cache = j; loading = false; cb(j); })
      .catch(function () { loading = false; cb(null); });
  }

  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75pulse')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75pulse';
    host.innerHTML = '<div class="wrap"><div class="eyebrow">Pulse</div><h1>The bond market’s vital signs</h1><div class="load">Taking the market’s pulse…</div></div>';
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.gauges) { host.querySelector('.load').textContent = 'Pulse data is unavailable right now. Please try again shortly.'; return; }
      host.innerHTML = page(j); wireSparks(host); animate(host);
    });
  }
  function clear() { var h = document.querySelector('.p75pulse'); if (h) h.remove(); }

  window.P75PULSE = { render: render, clear: clear };
})();
