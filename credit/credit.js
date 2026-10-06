/* Point75 - Sector Credit (/sector-credit), Lenders (/lenders) and Credit Stress (/credit-stress), under Bond Summary.
   Loaded by p75.js; data from news.point75.io/api/credit, written weekly by fetch_credit.py.
   Sources: company 10-K/10-Q filings and money market fund filings (SEC EDGAR), and the Federal Reserve's
   Financial Accounts (Z.1) via FRED. No licensed data. (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75CREDIT) return;
  var API = 'https://news.point75.io/api/credit';
  var GRADE = ['#72b58d', '#d9a441', '#e0776d'], GLABEL = ['Comfortable', 'Stretched', 'Heavy'];

  var CSS =
    '.p75cr{--ink:#111214;--panel:#17181B;--panel2:#1f2023;--line:#2A2B2F;--cream:#EDE8DC;--muted:#C2BCAF;--soft:#E4DED1;--faint:#8d887e;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75cr *{box-sizing:border-box}' +
    '.p75cr .wrap{max-width:1120px;margin:0 auto;padding:44px 20px 72px}' +
    '.p75cr .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75cr .eyebrow a{color:inherit;text-decoration:none}' +
    '.p75cr h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:40px;line-height:1.1;margin:8px 0 10px}' +
    '.p75cr h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:27px;margin:48px 0 6px}' +
    '.p75cr .lede{color:var(--soft);font-size:16.5px;line-height:1.6;max-width:760px;margin:0}' +
    '.p75cr .asof{font-size:12.5px;color:var(--muted);margin-top:10px}' +
    '.p75cr .sub{color:var(--soft);font-size:14.5px;line-height:1.55;margin:0 0 16px;max-width:760px}' +
    '.p75cr .num{font-variant-numeric:tabular-nums}' +
    '.p75cr .card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px}' +
    '.p75cr .card.hi{border-color:rgba(201,162,39,.45)}' +
    '.p75cr .lbl{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:700}' +
    '.p75cr button{font:inherit;color:inherit;cursor:pointer}' +
    '.p75cr button:focus-visible{outline:2px solid #e6c35a;outline-offset:2px}' +
    '.p75cr .sectors{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:26px 0 18px}' +
    '.p75cr .sec{text-align:left;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:13px 14px;display:flex;flex-direction:column;gap:5px;min-height:96px}' +
    '.p75cr .sec[aria-pressed=true]{border-color:var(--gold);background:#221e12}' +
    '.p75cr .sec b{font-size:15.5px}.p75cr .sec span{font-size:12.5px;color:var(--muted)}.p75cr .dots{display:flex;gap:5px;margin-top:2px}.p75cr .dots i{width:10px;height:10px;border-radius:50%}' +
    '.p75cr .grid2{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:16px;align-items:start}' +
    '.p75cr .rows{display:flex;flex-direction:column;gap:2px}' +
    '.p75cr .thead,.p75cr .row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1.15fr) 94px 78px minmax(0,1fr);gap:10px;align-items:center}' +
    '.p75cr .thead{padding:0 10px 8px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid var(--line);margin-bottom:4px}' +
    '.p75cr .row{text-align:left;padding:11px 10px;min-height:56px;border-radius:10px;border:1px solid transparent;background:none}' +
    '.p75cr .row:hover{background:#1c1d20}.p75cr .row[aria-pressed=true]{border-color:rgba(201,162,39,.6);background:#221e12}' +
    '.p75cr .row .nm b{display:block;font-size:15px}.p75cr .row .nm span{font-size:12px;color:var(--faint)}' +
    '.p75cr .bar{display:flex;align-items:center;gap:8px}.p75cr .bar i{height:10px;border-radius:5px;background:#6b6f77;display:block}' +
    '.p75cr .pill{display:inline-block;padding:3px 10px;border-radius:999px;font-weight:800;font-size:13.5px;color:#111214}' +
    '.p75cr .rt{text-align:right;color:var(--muted);font-size:13.5px}' +
    '.p75cr .legend{display:flex;flex-wrap:wrap;gap:14px;font-size:12.5px;color:var(--muted);margin-top:12px}.p75cr .legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:-1px}' +
    '.p75cr .scatter svg{display:block;width:100%;height:auto;overflow:visible}.p75cr .scatter circle{cursor:pointer}' +
    '.p75cr .detail{margin-top:16px;display:flex;flex-direction:column;gap:12px}' +
    '.p75cr .dh{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}.p75cr .dh h3{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:25px;margin:0}' +
    '.p75cr .dh span{font-size:12.5px;color:var(--faint)}.p75cr .dh .pill{color:#111214;font-size:13px;white-space:nowrap}' +
    '.p75cr .kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.p75cr .kpi{background:var(--panel2);border-radius:10px;padding:10px;border:1px solid transparent}' +
    '.p75cr .kpi div{font-size:12px;color:var(--faint)}.p75cr .kpi b{font-size:19px}' +
    '.p75cr .story{margin:0;font-size:15px;line-height:1.6;color:var(--soft)}' +
    '.p75cr .part{padding-top:12px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:7px}' +
    '.p75cr .mix{display:flex;height:14px;border-radius:5px;overflow:hidden;background:var(--panel2)}' +
    '.p75cr .mixk{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;color:var(--muted)}.p75cr .mixk i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}' +
    '.p75cr .li{display:flex;justify-content:space-between;gap:10px;font-size:14px}.p75cr .li .na{color:var(--faint);font-style:italic}' +
    '.p75cr .note{font-size:12.5px;color:var(--faint);line-height:1.5}' +
    '.p75cr a.go{color:var(--gold);font-weight:700;text-decoration:none}' +
    '.p75cr .hero{display:grid;grid-template-columns:320px minmax(0,1fr);gap:16px;margin-top:26px}' +
    '.p75cr .big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:44px;line-height:1.05;margin:8px 0 4px}' +
    '.p75cr .stack{display:flex;height:30px;border-radius:8px;overflow:hidden;margin:12px 0}' +
    '.p75cr .isk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.p75cr .isk div{font-size:13px;color:var(--soft)}.p75cr .isk i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px}.p75cr .isk b{display:block;font-size:15px;color:var(--cream)}' +
    '.p75cr .hrow{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1.4fr) 76px 60px;gap:10px;align-items:center;text-align:left;padding:9px 10px;min-height:44px;border-radius:9px;border:1px solid transparent;background:none;width:100%}' +
    '.p75cr .hrow:hover{background:#1c1d20}.p75cr .hrow[aria-pressed=true]{border-color:rgba(201,162,39,.6);background:#221e12}' +
    '.p75cr .hrow b{font-size:14.5px}.p75cr .hrow i{display:block;height:13px;border-radius:4px}.p75cr .hrow .v{text-align:right;font-weight:800}.p75cr .hrow .c{text-align:right;font-size:13px;color:var(--muted)}' +
    '.p75cr .cush{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}' +
    '.p75cr .cush .card{display:flex;flex-direction:column;gap:5px;min-height:150px}.p75cr .cush b{font-size:15px}.p75cr .cush .v{font-size:28px;font-weight:800}.p75cr .cush span{font-size:13px;color:var(--muted);line-height:1.45}.p75cr .cush em{font-style:normal;font-size:12.5px;color:var(--faint);margin-top:auto}' +
    '.p75cr table{width:100%;border-collapse:collapse;font-size:14px;margin-top:6px}.p75cr th{color:var(--gold);text-align:left;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;padding:8px;border-bottom:1px solid var(--line)}' +
    '.p75cr td{padding:10px 8px;border-bottom:1px solid var(--line)}.p75cr td.r,.p75cr th.r{text-align:right}' +
    '.p75cr .foot{margin-top:44px;color:var(--faint);font-size:12.5px;line-height:1.6;border-top:1px solid var(--line);padding-top:16px}' +
    '.p75cr .load{margin-top:30px;color:var(--muted)}' +
    '.p75cr .reading{display:flex;gap:20px;align-items:center;margin-top:24px}.p75cr .reading .big2{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:30px;white-space:nowrap}' +
    '.p75cr .reading p{margin:0;font-size:16.5px;line-height:1.55;color:var(--soft)}' +
    '.p75cr .shead,.p75cr .srow .top{display:grid;grid-template-columns:300px minmax(0,1fr) 190px;gap:20px;align-items:center}' +
    '.p75cr .shead{padding:0 22px;margin:22px 0 8px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--faint)}.p75cr .shead .ends{display:flex;justify-content:space-between}' +
    '.p75cr .srows{display:flex;flex-direction:column;gap:10px}' +
    '.p75cr .srow{width:100%;text-align:left;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 22px}.p75cr .srow[aria-expanded=true]{border-color:rgba(201,162,39,.55);background:#1d1b15}' +
    '.p75cr .srow .nm b{display:block;font-size:17px}.p75cr .srow .nm span{font-size:14px;color:var(--muted)}' +
    '.p75cr .track{position:relative;height:46px}.p75cr .track .bg{position:absolute;left:0;right:0;top:19px;height:8px;border-radius:4px;background:linear-gradient(90deg,#2f3a33 0%,#3a3526 45%,#4a2c29 100%)}' +
    '.p75cr .track .mv{position:absolute;top:21px;height:4px;border-radius:2px;opacity:.8}' +
    '.p75cr .track .ref{position:absolute;top:15px;width:16px;height:16px;margin-left:-8px;border-radius:50%;border:2px solid;background:var(--ink);box-sizing:border-box}' +
    '.p75cr .track .now{position:absolute;top:13px;width:20px;height:20px;margin-left:-10px;border-radius:50%;box-shadow:0 0 0 3px var(--ink)}' +
    '.p75cr .track .lo,.p75cr .track .hi{position:absolute;top:34px;font-size:12.5px;color:var(--faint)}.p75cr .track .hi{right:0}.p75cr .track .lo{left:0}' +
    '.p75cr .track .rl{position:absolute;top:-4px;font-size:12.5px;color:var(--faint);white-space:nowrap}' +
    '.p75cr .srow .val{display:flex;flex-direction:column;align-items:flex-end;gap:4px}.p75cr .srow .val b{font-size:27px}' +
    '.p75cr .srow .more{margin-top:12px;padding-top:12px;border-top:1px solid var(--line);font-size:15.5px;line-height:1.6;color:var(--soft)}' +
    '@media (max-width:980px){.p75cr .grid2{grid-template-columns:1fr}.p75cr .sectors{grid-template-columns:repeat(3,minmax(0,1fr))}.p75cr .cush{grid-template-columns:repeat(2,minmax(0,1fr))}.p75cr .hero{grid-template-columns:1fr}}' +
    '@media (max-width:640px){.p75cr .wrap{padding:30px 14px 56px}.p75cr h1{font-size:32px}.p75cr .sectors{grid-template-columns:repeat(2,minmax(0,1fr))}' +
      '.p75cr .thead{display:none}.p75cr .row{grid-template-columns:minmax(0,1fr) auto;row-gap:6px}.p75cr .row .bar{grid-column:1/-1;order:3}.p75cr .row .cov,.p75cr .row .rt{display:none}' +
      '.p75cr .kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.p75cr .isk{grid-template-columns:repeat(2,minmax(0,1fr))}.p75cr .cush{grid-template-columns:1fr}' +
      '.p75cr .hrow{grid-template-columns:minmax(0,1fr) 70px 54px}.p75cr .hrow .bw{grid-column:1/-1;order:4}.p75cr .card{padding:16px}.p75cr .shead{display:none}.p75cr .srow .top{grid-template-columns:minmax(0,1fr) auto;row-gap:10px}.p75cr .srow .track{grid-column:1/-1;order:3}.p75cr .srow{padding:14px 16px}.p75cr .reading{flex-direction:column;align-items:flex-start;gap:8px}}';

  function once() {
    if (document.getElementById('p75cr-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(f);
    var st = document.createElement('style'); st.id = 'p75cr-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function money(v) { if (v == null) return '–'; var a = Math.abs(v); return (v < 0 ? '−$' : '$') + (a >= 100 ? Math.round(a) : a.toFixed(1)) + 'B'; }
  function x1(v) { return v == null ? '–' : v.toFixed(1) + '×'; }
  function day(d, long) { var t = new Date(d + 'T12:00:00'); return t.toLocaleDateString('en-US', long ? { month: 'long', day: 'numeric', year: 'numeric' } : { month: 'short', year: 'numeric' }); }
  function grade(c, norm) {
    if (c.lev == null) return 1;
    var g = c.lev <= norm[0] ? 0 : c.lev <= norm[1] ? 1 : 2;
    if (c.cov != null) { if (c.cov < 2) g = 2; else if (c.cov < 3 && g === 0) g = 1; }
    return g;
  }
  function median(a) { a = a.slice().sort(function (x, y) { return x - y; }); var n = a.length; return !n ? null : n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2; }

  // ---------------------------------------------------------------- Sector Credit
  var st = { sector: null, tk: null, pick: 'mmf', sig: null };

  function companies(j) {
    return (j.companies || []).filter(function (c) { return c.debt != null; }).map(function (c) {
      var s = (j.sectors || {})[c.sector] || { norm: [3, 5] }; c.g = grade(c, s.norm); return c;
    });
  }

  function sectorTabs(j, all) {
    return Object.keys(j.sectors).map(function (name) {
      var list = all.filter(function (c) { return c.sector === name; });
      if (!list.length) return '';
      var total = list.reduce(function (a, c) { return a + c.debt; }, 0), med = median(list.map(function (c) { return c.lev; }).filter(function (v) { return v != null; }));
      return '<button type="button" class="sec" data-sector="' + esc(name) + '" aria-pressed="' + (name === st.sector) + '"><b>' + esc(name) + '</b>' +
        '<span class="num">' + money(total) + ' debt · ' + list.length + ' companies</span><span class="num">Median debt/EBITDA <b style="color:var(--cream)">' + x1(med) + '</b></span>' +
        '<span class="dots">' + list.map(function (c) { return '<i style="background:' + GRADE[c.g] + '"></i>'; }).join('') + '</span></button>';
    }).join('');
  }

  function table(list) {
    var max = Math.max.apply(null, list.map(function (c) { return c.debt; }));
    return '<div class="thead"><span>Company</span><span>Debt</span><span>Debt/EBITDA</span><span>Coverage</span><span style="text-align:right">Revenue · Net income</span></div>' +
      list.map(function (c) {
        return '<button type="button" class="row" data-tk="' + esc(c.tk) + '" aria-pressed="' + (c.tk === st.tk) + '">' +
          '<span class="nm"><b>' + esc(c.name) + '</b><span>' + esc(c.tk) + ' · ' + (c.basis === 'ttm' ? '12 mo. to ' : 'FY ends ') + day(c.fy) + '</span></span>' +
          '<span class="bar"><i style="width:' + Math.max(4, Math.round(c.debt / max * 90)) + 'px"></i><b class="num">' + money(c.debt) + '</b></span>' +
          '<span><span class="pill num" style="background:' + GRADE[c.g] + '">' + x1(c.lev) + '</span></span>' +
          '<span class="cov num" style="color:' + (c.cov != null && c.cov < 2 ? GRADE[2] : c.cov != null && c.cov < 3 ? GRADE[1] : 'var(--cream)') + '">' + x1(c.cov) + '</span>' +
          '<span class="rt num">' + money(c.rev) + ' · ' + money(c.ni) + '</span></button>';
      }).join('') +
      '<div class="legend"><span><i style="background:' + GRADE[0] + '"></i>Comfortable for its sector</span><span><i style="background:' + GRADE[1] + '"></i>Stretched</span>' +
      '<span><i style="background:' + GRADE[2] + '"></i>Heavy</span><span>Coverage = operating profit ÷ interest expense</span></div>';
  }

  function scatter(list, norm) {
    var W = 460, H = 280, L = 40, B = 30, XM = 8;
    var X = function (v) { return L + Math.min(Math.max(v, 0), XM) / XM * (W - L - 10); };
    var Y = function (v) { return 10 + (1 - Math.log(Math.min(Math.max(v, 1), 100)) / Math.LN10 / 2) * (H - B - 10); };
    var g = '<rect x="' + X(norm[0]) + '" y="10" width="' + (X(norm[1]) - X(norm[0])) + '" height="' + (H - B - 10) + '" fill="rgba(217,164,65,.08)"/>' +
      '<rect x="' + X(norm[1]) + '" y="10" width="' + (X(XM) - X(norm[1])) + '" height="' + (H - B - 10) + '" fill="rgba(224,119,109,.10)"/>' +
      '<rect x="' + L + '" y="' + Y(2) + '" width="' + (X(XM) - L) + '" height="' + (H - B - Y(2)) + '" fill="rgba(224,119,109,.10)"/>';
    [1, 2, 5, 10, 50].forEach(function (v) { g += '<line x1="' + L + '" x2="' + X(XM) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="#2A2B2F"/><text x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end" font-size="11" fill="#8d887e">' + v + '×</text>'; });
    [0, 2, 4, 6, 8].forEach(function (v) { g += '<text x="' + X(v) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="11" fill="#8d887e">' + v + '×</text>'; });
    list.slice().sort(function (a, b) { return b.debt - a.debt; }).forEach(function (c) {
      if (c.lev == null || c.cov == null) return;
      var r = 7 + Math.sqrt(c.debt) * 1.3, on = c.tk === st.tk, x = X(c.lev), y = Y(c.cov);
      g += '<circle data-tk="' + esc(c.tk) + '" cx="' + x + '" cy="' + y + '" r="' + r.toFixed(1) + '" fill="' + GRADE[c.g] + '" fill-opacity="' + (on ? 1 : .7) + '" stroke="' + (on ? '#EDE8DC' : 'none') + '" stroke-width="2"><title>' +
        esc(c.name + ': debt ' + x1(c.lev) + ' EBITDA, coverage ' + x1(c.cov)) + '</title></circle>' +
        '<text x="' + (x + r + 4) + '" y="' + (y + 4) + '" font-size="12" font-weight="700" fill="#EDE8DC" pointer-events="none">' + esc(c.tk) + '</text>';
    });
    return '<div class="lbl" style="display:flex;justify-content:space-between"><span>Leverage vs. ability to pay</span><span style="color:var(--faint);letter-spacing:0;text-transform:none;font-weight:500">Bubble size = debt</span></div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Debt to EBITDA against interest coverage for each company">' + g + '</svg>' +
      '<div class="note" style="display:flex;justify-content:space-between"><span>↑ Interest coverage (log scale)</span><span>Debt ÷ EBITDA →</span></div>';
  }

  function detail(c, sector) {
    var pct = c.rev ? Math.round(c.ni / c.rev * 100) : null, sl = sector.toLowerCase();
    var story = c.name + ' owes ' + money(c.debt) + (c.lev != null ? ', about ' + c.lev.toFixed(1) + ' years of EBITDA (' + money(c.ebitda) + ')' : '') + '. ' +
      (c.cov != null ? 'Its operating profit covers the interest bill ' + c.cov.toFixed(1) + ' times. ' : '') +
      (c.g === 0 ? 'That is comfortable for ' + sl + '.' : c.g === 1 ? 'That is on the stretched side for ' + sl + ', worth watching.' : 'That is heavy for ' + sl + ', leaving less room if earnings slip.') +
      (pct != null ? ' Net margin: ' + pct + '% of revenue.' : '');
    var m = c.mix || {}, tot = (m.short || 0) + (m.due || 0) + (m.long || 0) || 1;
    var h = '<div class="card hi detail"><div class="dh"><div><h3>' + esc(c.name) + '</h3><span>' + esc(c.tk) + ' · ' + (c.basis === 'ttm' ? '12 months to ' + day(c.fy, true) + ' · latest 10-Q' : 'fiscal year ended ' + day(c.fy, true) + ' · 10-K') + '</span></div>' +
      '<span class="pill" style="background:' + GRADE[c.g] + '">' + GLABEL[c.g] + '</span></div>' +
      '<div class="kpis"><div class="kpi" style="border-color:' + GRADE[c.g] + '"><div>Debt/EBITDA</div><b class="num" style="color:' + GRADE[c.g] + '">' + x1(c.lev) + '</b></div>' +
      '<div class="kpi"><div>Total debt</div><b class="num">' + money(c.debt) + '</b></div><div class="kpi"><div>EBITDA</div><b class="num">' + money(c.ebitda) + '</b></div>' +
      '<div class="kpi"><div>Net income</div><b class="num">' + money(c.ni) + '</b></div></div>' +
      '<p class="story">' + esc(story) + '</p>' +
      '<div class="part"><div class="lbl">How it’s financed</div><div class="mix">' +
      '<i style="width:' + (m.long / tot * 100) + '%;background:#6b6f77"></i><i style="width:' + (m.due / tot * 100) + '%;background:#8f9bb0"></i><i style="width:' + (m.short / tot * 100) + '%;background:#C9A227"></i></div>' +
      '<div class="mixk"><span><i style="background:#6b6f77"></i>Long-term bonds &amp; loans <b class="num">' + money(m.long) + '</b></span><span><i style="background:#8f9bb0"></i>Due within a year <b class="num">' + money(m.due) + '</b></span>' +
      '<span><i style="background:#C9A227"></i>Short-term IOUs <b class="num">' + money(m.short) + '</b></span></div></div>';
    var cp = c.cp;
    h += '<div class="part"><div class="lbl" style="display:flex;justify-content:space-between"><span>Who holds its paper</span>' + (cp ? '<span style="color:var(--faint);letter-spacing:0;text-transform:none;font-weight:500">As of ' + day(cp.date, true) + '</span>' : '') + '</div>';
    if (cp) {
      h += '<div class="li"><span>' + esc(cp.label) + '</span><b class="num">' + money(cp.amount) + '</b></div>' +
        '<div class="li"><span>Money market funds</span>' + (cp.mmf == null ? '<span class="na">being updated</span></div>' : '<b class="num" style="color:var(--gold)">' + (cp.mmf ? '$' + Math.round(cp.mmf * 1000) + 'M' : '$0') +
        (cp.mmfPct != null && cp.mmfPct <= 100 ? ' · ' + cp.mmfPct.toFixed(1) + '%' : '') + '</b></div>') +
        '<div class="li"><span style="color:var(--muted)">Mutual funds &amp; ETFs</span><span class="na">not yet tracked</span></div>' +
        '<div class="li"><span style="color:var(--muted)">Insurers · Pension funds · Foreign &amp; others</span><span class="na">not publicly available</span></div>' +
        '<div class="note">' + (cp.mmf == null ? '' : cp.mmfFunds ? 'Held by ' + cp.mmfFunds + ' money market fund' + (cp.mmfFunds > 1 ? 's' : '') + '. ' : 'No money market fund held it on that date. ') +
        (cp.muniNotes ? 'Tax-exempt funds also held ' + money(cp.muniNotes) + ' of municipal notes the company is responsible for repaying. ' : '') +
        '<a class="go" href="/lenders">Who lends across the market &rarr;</a></div>';
    } else {
      h += '<div class="note" style="font-size:13.5px;color:var(--muted)">No commercial paper reported in its latest filing, so there is nothing for money market funds to hold.</div>';
    }
    h += '</div>' + ((c.notes || []).length ? '<div class="note">' + esc(c.notes.join(' ')) + '</div>' : '') + '</div>';
    return h;
  }

  function checkPage(j) {
    var all = companies(j);
    if (!st.sector || !j.sectors[st.sector]) st.sector = Object.keys(j.sectors)[0];
    var list = all.filter(function (c) { return c.sector === st.sector; }).sort(function (a, b) { return b.debt - a.debt; });
    if (!list.some(function (c) { return c.tk === st.tk; })) st.tk = list.length ? list[0].tk : null;
    var c = list.filter(function (x) { return x.tk === st.tk; })[0], sec = j.sectors[st.sector];
    return '<div class="sectors" role="group" aria-label="Sectors">' + sectorTabs(j, all) + '</div>' +
      '<div class="grid2"><div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:8px"><h2 style="margin:0">' + esc(st.sector) + '</h2><span class="note">' + esc(sec.note) + '</span></div>' +
      '<div class="rows" role="group" aria-label="Companies">' + table(list) + '</div></div>' +
      '<div><div class="card scatter">' + scatter(list, sec.norm) + '</div>' + (c ? detail(c, st.sector) : '') + '</div></div>';
  }

  // ---------------------------------------------------------------- Lenders
  var ISC = ['#C9A227', '#8f9bb0', '#6b6f77', '#4a4c53'];

  function followPage(j) {
    var mk = j.market;
    if (!mk) return '<p class="load">The market data is unavailable right now.</p>';
    var chg = mk.total - mk.totalPrev, H = mk.holders || [];
    var max = Math.max.apply(null, H.map(function (h) { return h.now; }));
    if (!H.some(function (h) { return h.key === st.pick; })) st.pick = H[0] && H[0].key;
    var cur = H.filter(function (h) { return h.key === st.pick; })[0];
    var h = '<div class="hero"><div class="card hi"><div class="lbl">Commercial paper outstanding</div><div class="big num">$' + (mk.total / 1000).toFixed(2) + ' trillion</div>' +
      '<div class="num" style="color:' + (chg >= 0 ? '#e0776d' : '#72b58d') + '">' + (chg >= 0 ? '▲ +' : '▼ −') + money(Math.abs(chg)) + ' (' + (chg >= 0 ? '+' : '−') + Math.abs(chg / mk.totalPrev * 100).toFixed(1) + '%) in a year</div>' +
      '<div class="note" style="margin-top:4px">As of ' + day(mk.asof, true) + '</div></div>' +
      '<div class="card"><div class="lbl">Who is borrowing</div><div class="stack">' + mk.issuers.map(function (i, n) { return '<i style="width:' + (i.now / mk.total * 100) + '%;background:' + ISC[n] + '"></i>'; }).join('') + '</div>' +
      '<div class="isk">' + mk.issuers.map(function (i, n) { return '<div><i style="background:' + ISC[n] + '"></i>' + esc(i.name) + '<b class="num">' + money(i.now) + ' <span style="color:var(--faint);font-weight:500">· ' + Math.round(i.now / mk.total * 100) + '%</span></b></div>'; }).join('') + '</div></div></div>';
    h += '<h2>Who is lending it</h2><p class="sub">Tap a lender for details. Change is against a year earlier.</p><div class="grid2"><div class="card"><div role="group" aria-label="Lenders">' +
      H.map(function (x) {
        var d = x.prev ? (x.now - x.prev) / x.prev * 100 : 0;
        return '<button type="button" class="hrow" data-pick="' + esc(x.key) + '" aria-pressed="' + (x.key === st.pick) + '"><b>' + esc(x.name) + '</b>' +
          '<span class="bw"><i style="width:' + Math.max(1, x.now / max * 100) + '%;background:' + (x.key === 'oth' ? '#4a4c53' : '#C9A227') + '"></i></span>' +
          '<span class="v num">' + money(x.now) + '</span><span class="c num">' + (d >= 0 ? '+' : '−') + Math.abs(Math.round(d)) + '%</span></button>';
      }).join('') + '</div><p class="note" style="margin:10px 0 0">ETFs and private-equity funds barely hold commercial paper and are not reported separately; private-equity-style lending shows up as private credit, below.</p></div>';
    if (cur) h += '<div class="card hi" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">' + Math.round(cur.now / mk.total * 100) + '% of all commercial paper</div>' +
      '<div style="font-family:\'Hedvig Letters Serif\',Georgia,serif;font-size:25px">' + esc(cur.name) + '</div>' +
      '<div class="kpis" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="kpi"><div>Holds now</div><b class="num">' + money(cur.now) + '</b></div><div class="kpi"><div>A year earlier</div><b class="num">' + money(cur.prev) + '</b></div></div>' +
      '<p class="story">' + esc(cur.story) + '</p>' + (cur.split ? '<div class="note" style="font-size:13.5px;color:var(--muted)">' + esc(cur.split) + '</div>' : '') + '</div>';
    h += '</div>';
    // cushions
    var cards = (j.cushions || []).map(function (k) {
      if (k.kind === 'multiple') {
        var c1 = k.now == null ? 'var(--cream)' : k.now > 20 ? GRADE[1] : k.now < 5 ? GRADE[0] : 'var(--cream)';
        return '<div class="card"><b>' + esc(k.name) + '</b><div class="v num" style="color:' + c1 + '">' + x1(k.now) + '</div><span>Assets per $1 of cushion (' + k.cushionPct + '% of assets)</span><em>A year earlier: ' + x1(k.prev) + '</em></div>';
      }
      return '<div class="card"><b>' + esc(k.name) + '</b><div class="v num" style="color:' + (k.now >= 100 ? GRADE[0] : k.now >= 80 ? 'var(--cream)' : GRADE[1]) + '">' + k.now + '% funded</div><span>Assets vs. benefits promised to workers</span><em>A year earlier: ' + k.prev + '% funded</em></div>';
    });
    var B = j.bdcs || [];
    if (B.length) {
      var des = B.map(function (b) { return b.de; });
      cards.push('<div class="card"><b>Private credit funds</b><div class="v num">' + Math.min.apply(null, des).toFixed(1) + '–' + Math.max.apply(null, des).toFixed(1) + '×</div><span>Debt per $1 of equity at the ' + B.length + ' largest listed BDCs; the legal limit is 2×</span><em>Details below</em></div>');
    }
    cards.push('<div class="card"><b>Money market funds</b><div class="v num" style="color:' + GRADE[0] + '">0×</div><span>Not allowed to borrow to invest; their risk is a rush of withdrawals, not leverage</span><em>Unchanged by rule</em></div>');
    h += '<h2>How much cushion do the lenders have?</h2><p class="sub">Latest vs. a year earlier.</p><div class="cush">' + cards.join('') + '</div>';
    if (B.length) {
      h += '<h2>Private credit: the largest listed lenders</h2><p class="sub">Business development companies (BDCs) lend directly to mid-sized companies, much like private-equity-style credit funds, and must file their balance sheets with the SEC.</p>' +
        '<div class="card" style="overflow-x:auto"><table><thead><tr><th>Fund</th><th class="r">Debt</th><th class="r">Equity</th><th class="r">Debt/equity</th><th class="r">As of</th></tr></thead><tbody>' +
        B.map(function (b) { return '<tr><td><b>' + esc(b.name) + '</b> <span class="note">' + esc(b.tk) + '</span></td><td class="r num">' + money(b.debt) + '</td><td class="r num">' + money(b.equity) + '</td><td class="r num"><b>' + b.de.toFixed(2) + '×</b></td><td class="r">' + day(b.date) + '</td></tr>'; }).join('') +
        '</tbody></table></div>';
    }
    return h;
  }

  // ---------------------------------------------------------------- Credit Stress
  var SCOL = { Calm: '#72b58d', Watch: '#d9a441', Stressed: '#e0776d' };
  function sfmt(sig, v) { return v.toFixed(sig.key === 'zom' || sig.key === 'dg' ? 0 : sig.key === 'pik' ? 1 : 2) + '%'; }
  function stressMore(g) {
    var f = function (v) { return sfmt(g, v); };
    if (g.key === 'co') return 'Banks wrote off ' + f(g.now) + ' of their business loans (annualized) in ' + g.nowDate + ', against ' + f(g.ref) + ' at the ' + g.refDate + ' ' + g.refKind.toLowerCase() + '. The crisis peak was ' + f(g.worst) + ' in ' + g.worstDate + '.';
    if (g.key === 'dq') return f(g.now) + ' of banks’ business loans were 30 or more days late in ' + g.nowDate + ', against ' + f(g.ref) + ' at the ' + g.refDate + ' ' + g.refKind.toLowerCase() + ' and ' + f(g.worst) + ' at the ' + g.worstDate + ' peak. Late payments tend to rise before write-offs do.';
    if (g.key === 'cre') return f(g.now) + ' of banks’ commercial real estate loans (offices, stores, apartments) were 30 or more days late in ' + g.nowDate + ', against ' + f(g.ref) + ' at the ' + g.refDate + ' ' + g.refKind.toLowerCase() + '. The peak was ' + f(g.worst) + ' in ' + g.worstDate + '.';
    if (g.key === 'zom') return 'Of ' + (g.companies || 'about 1,400').toLocaleString('en-US') + ' U.S.-listed companies paying $10M or more a year in interest, ' + f(g.now) + ' had operating profit smaller than the interest they paid in ' + g.nowDate + '. The recent low was ' + f(g.ref) + ' (' + g.refDate + '); the worst since 2015 was ' + f(g.worst) + ' in ' + g.worstDate + '.';
    if (g.key === 'pik') {
      var fu = Object.keys(g.funds || {}).map(function (tk) { return ((g.fundNames || {})[tk] || tk) + ' ' + g.funds[tk].toFixed(1) + '%'; }).join(', ');
      return 'At the largest listed private-credit lenders, ' + f(g.now) + ' of investment income in ' + g.nowDate + ' was paid “in kind”: borrowers added the interest to their loans instead of paying cash. A rising share is an early sign of strain. By fund: ' + fu + '. The bar runs from 0% to 20%.';
    }
    if (g.key === 'dg') return 'U.S. companies owe $' + g.debtT + ' trillion, ' + f(g.now) + ' of GDP (' + g.nowDate + '), against a ' + g.refKind.toLowerCase() + ' of ' + f(g.ref) + ' in ' + g.refDate + ' and a record ' + f(g.worst) + ' in ' + g.worstDate + '.';
    return '';
  }
  var SRC = { co: 'Federal Reserve, all U.S. commercial banks', dq: 'Federal Reserve, all U.S. commercial banks', cre: 'Federal Reserve, all U.S. commercial banks',
    zom: 'Point75 calculation from SEC filings', pik: 'Company 10-K filings via SEC EDGAR', dg: 'Federal Reserve Financial Accounts and BEA' };

  function stressPage(j) {
    var S = j.stress || [];
    if (!S.length) return '<p class="load">The stress signals are unavailable right now.</p>';
    var n = { Calm: 0, Watch: 0, Stressed: 0 }; S.forEach(function (g) { n[g.status]++; });
    var head = n.Stressed ? ['Visible cracks', SCOL.Stressed] : n.Watch >= 3 ? ['Hairline cracks', SCOL.Watch] : ['Holding firm', SCOL.Calm];
    var up = S.filter(function (g) { return g.status !== 'Calm'; }).length;
    var summary = (n.Stressed ? n.Stressed + ' of ' + S.length + ' signals are in the worse half of their history. ' : 'None of the ' + S.length + ' signals is near crisis levels. ') +
      (up ? up + ' ' + (up === 1 ? 'has' : 'have') + ' moved meaningfully off ' + (up === 1 ? 'its' : 'their') + ' recent lows or sit' + (up === 1 ? 's' : '') + ' high in ' + (up === 1 ? 'its' : 'their') + ' range, so they are worth watching.' : 'All are close to their calmest levels.');
    var h = '<div class="card hi reading"><span class="big2" style="color:' + head[1] + '">' + head[0] + '</span><p>' + esc(summary) + '</p></div>' +
      '<div class="shead"><span>Signal</span><span class="ends"><span>◂ Best</span><span>Worst ▸</span></span><span style="text-align:right">Today</span></div><div class="srows">';
    S.forEach(function (g) {
      var span = (g.worst - g.best) || 1, pos = function (v) { return Math.max(0, Math.min(100, (v - g.best) / span * 100)); };
      var a = pos(g.ref), b = pos(g.now), c = SCOL[g.status], open = st.sig === g.key;
      var tx = a < 12 ? '-8px' : a > 88 ? 'calc(-100% + 8px)' : '-50%';
      h += '<button type="button" class="srow" data-sig="' + esc(g.key) + '" aria-expanded="' + open + '"><span class="top">' +
        '<span class="nm"><b>' + esc(g.name) + '</b><span>' + esc(g.short) + '</span></span>' +
        '<span class="track"><span class="bg"></span><span class="mv" style="left:' + Math.min(a, b) + '%;width:' + Math.abs(b - a) + '%;background:' + c + '"></span>' +
        '<span class="ref" style="left:' + a + '%;border-color:' + c + '"></span><span class="now" style="left:' + b + '%;background:' + c + '"></span>' +
        '<span class="rl num" style="left:' + a + '%;transform:translateX(' + tx + ')">' + g.refKind + ' ' + sfmt(g, g.ref) + ' · ' + esc(g.refDate) + '</span>' +
        '<span class="lo num">' + sfmt(g, g.best) + '</span><span class="hi num">' + sfmt(g, g.worst) + (g.key === 'pik' ? '' : ' · ' + esc(g.worstDate)) + '</span></span>' +
        '<span class="val"><b class="num" style="color:' + c + '">' + sfmt(g, g.now) + '</b><span class="pill" style="background:' + c + '">' + g.status + '</span></span></span>' +
        (open ? '<span class="more" style="display:block">' + esc(stressMore(g)) + ' <span style="color:var(--faint)">Source: ' + esc(SRC[g.key] || '') + ', ' + esc(g.nowDate) + '.</span></span>' : '') + '</button>';
    });
    return h + '</div><p class="note" style="margin-top:12px">Tap a signal for what it means. Each bar runs from the signal’s best to its worst level since 2005 (since 2015 for “can’t cover interest”; a fixed 0–20% scale for private credit). The hollow dot marks its furthest point in the past five years; the solid dot is today. ' +
      'Status: <b style="color:' + SCOL.Stressed + '">Stressed</b> in the worse half of its range; <b style="color:' + SCOL.Watch + '">Watch</b> in the worse 35%, or up at least 5% of its range from its five-year low; otherwise <b style="color:' + SCOL.Calm + '">Calm</b>.</p>';
  }

  // ---------------------------------------------------------------- shell
  var PAGES = {
    '/sector-credit': { title: 'Sector Credit', eyebrow: 'Sector Credit', lede: 'Corporate debt, sector by sector: the biggest borrowers, how much they owe, whether their earnings comfortably carry it, and who holds their short-term IOUs. Pick a sector, then a company.', body: checkPage,
      link: '<a class="go" href="/lenders">Next: Lenders, who is lending them the money &rarr;</a>' },
    '/lenders': { title: 'Lenders', eyebrow: 'Lenders', lede: 'Companies and banks fund their day-to-day bills with commercial paper: short IOUs, usually repaid within weeks. Here is who is lending that money, and how much cushion those lenders have.', body: followPage,
      link: '<a class="go" href="/credit-stress">Next: Credit Stress, where the cracks are &rarr;</a>' },
    '/credit-stress': { title: 'Credit Stress', eyebrow: 'Credit Stress', lede: 'Where corporate credit is showing cracks, and where it isn’t: six signals from bank regulators and company filings, each placed between its best and worst level on record.', body: stressPage,
      link: '<a class="go" href="/sector-credit">Back to Sector Credit, who is borrowing &rarr;</a>' }
  };
  var FOOT = '<p class="foot">Sources: companies’ annual and quarterly reports (Forms 10-K and 10-Q) and money market funds’ monthly holdings (Form N-MFP) via SEC EDGAR; ' +
    'Board of Governors of the Federal Reserve System (Financial Accounts of the United States; bank delinquency and charge-off rates) and U.S. Bureau of Economic Analysis (GDP), via FRED (public domain). This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis. ' +
    'Debt, EBITDA, coverage, debt mix and health grades are Point75 calculations from reported (GAAP) figures, not company-adjusted numbers, using the latest 12 months (last annual report plus the latest quarterly report) where available; EBITDA = operating profit + depreciation &amp; amortization; grades compare leverage with typical levels for each sector. ' +
    'Bank and insurer multiples use the Fed’s financial assets and liabilities, not regulatory capital ratios; pension funded ratios exclude the Fed’s “claims on sponsor” entry. “Everyone else” is the remainder the data does not split out. ' +
    'For education, not financial advice.<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p>';

  var cache = null, loading = false, waiting = [];
  function load(cb) {
    if (cache) return cb(cache);
    waiting.push(cb); if (loading) return; loading = true;
    fetch(API).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { cache = j; })
      .catch(function () { cache = null; }).then(function () { loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(cache); }); });
  }

  function draw(host, path, j) {
    var p = PAGES[path];
    host.querySelector('.body').innerHTML = p.body(j) + '<p style="margin-top:34px">' + p.link + '</p>' + FOOT;
  }

  function render(path) {
    var p = PAGES[path]; if (!p) return;
    var main = document.querySelector('main') || document.body;
    var host = document.querySelector('.p75cr');
    if (host && host.getAttribute('data-path') === path) return;
    if (host) host.remove();
    once();
    host = document.createElement('div'); host.className = 'p75cr'; host.setAttribute('data-path', path);
    host.innerHTML = '<div class="wrap"><div class="eyebrow"><a href="/intelligent-summary">Bond Summary</a> · ' + esc(p.eyebrow) + '</div><h1>' + esc(p.title) + '</h1>' +
      '<p class="lede">' + esc(p.lede) + '</p><div class="asof"></div><div class="body"><div class="load">Loading the latest filings…</div></div></div>';
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || (!(j.companies || []).length && !j.market && !(j.stress || []).length)) { host.querySelector('.load').textContent = 'This data is unavailable right now. Please try again shortly.'; return; }
      if (j.generated_at) host.querySelector('.asof').innerHTML = 'Updated <b>' + new Date(j.generated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + '</b>';
      if (path === '/sector-credit') {   // deep link from search: /sector-credit?tk=XOM
        var tk = (new URLSearchParams(location.search).get('tk') || '').toUpperCase();
        var hit = (j.companies || []).filter(function (c) { return c.tk === tk; })[0];
        if (hit) { st.sector = hit.sector; st.tk = hit.tk; }
      }
      draw(host, path, j);
      host.addEventListener('click', function (e) {
        var b = e.target.closest('[data-sector],[data-tk],[data-pick],[data-sig]'); if (!b) return;
        if (b.hasAttribute('data-sig')) { var k = b.getAttribute('data-sig'); st.sig = st.sig === k ? null : k; var yy = window.pageYOffset; draw(host, path, j); window.scrollTo(0, yy); return; }
        if (b.hasAttribute('data-sector')) { st.sector = b.getAttribute('data-sector'); st.tk = null; }
        else if (b.hasAttribute('data-tk')) st.tk = b.getAttribute('data-tk');
        else st.pick = b.getAttribute('data-pick');
        var y = window.pageYOffset; draw(host, path, j); window.scrollTo(0, y);
      });
    });
  }
  function clear() { var h = document.querySelector('.p75cr'); if (h) h.remove(); }

  window.P75CREDIT = { render: render, clear: clear, paths: Object.keys(PAGES) };
})();
