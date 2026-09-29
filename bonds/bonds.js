/* Point75 - Bonds page (/bonds): search every outstanding U.S. Treasury by CUSIP or plain words,
   with a yield and value estimated from the Treasury yield curve, performance, a rate-change
   calculator, and the five largest bond ETFs. Loaded by p75.js; data from news.point75.io/api/bonds
   (fetch_bonds.py in Finance-NewsFeed-Aggregator, weekdays). (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75BONDS) return;
  var API = 'https://news.point75.io/api/bonds';

  var CSS =
    '.p75bonds{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--soft:#E4DED1;--muted:#B8B2A5;--gold:#C9A227;--up:#2BD17E;--down:#E5484D;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75bonds *{box-sizing:border-box}' +
    '.p75bonds .wrap{max-width:860px;margin:0 auto;padding:44px 20px 72px}' +
    '.p75bonds .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75bonds h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:38px;line-height:1.12;margin:8px 0 10px}' +
    '.p75bonds .lede{color:var(--soft);font-size:16px;line-height:1.6;max-width:640px;margin:0}' +
    '.p75bonds .asof{font-size:12.5px;color:var(--muted);margin-top:10px}.p75bonds .asof b{color:var(--cream);font-weight:600}' +
    '.p75bonds .search{position:relative;margin:24px 0 10px}' +
    '.p75bonds .search svg{position:absolute;left:16px;top:50%;transform:translateY(-50%)}' +
    '.p75bonds #p75bq{width:100%;height:52px;font:500 16px Manrope,system-ui,sans-serif;color:var(--cream);background:var(--panel);border:1.5px solid var(--gold);border-radius:12px;padding:0 16px 0 48px;box-shadow:0 0 0 3px rgba(201,162,39,.1);outline:none}' +
    '.p75bonds #p75bq::placeholder{color:#A9A396}.p75bonds #p75bq:focus{box-shadow:0 0 0 4px rgba(201,162,39,.28)}' +
    '.p75bonds .tries{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px;color:var(--muted);margin-bottom:18px}' +
    '.p75bonds .tries button{font:600 13px Manrope,system-ui,sans-serif;color:var(--cream);background:var(--panel);border:1px solid var(--line);border-radius:99px;padding:6px 12px;cursor:pointer}' +
    '.p75bonds .tries button:hover,.p75bonds .tries button:focus-visible{border-color:var(--gold);color:var(--gold);outline:none}' +
    '.p75bonds .meta{font-size:13px;color:var(--muted);margin:0 0 10px;min-height:1em}' +
    '.p75bonds .list{background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden}' +
    '.p75bonds .row{border-top:1px solid var(--line)}.p75bonds .row:first-child{border-top:0}' +
    '.p75bonds .rb{width:100%;display:grid;grid-template-columns:minmax(0,1fr) 90px 84px 76px;gap:12px;align-items:center;padding:14px 18px;background:none;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer}' +
    '.p75bonds .rb:hover{background:var(--panel2)}.p75bonds .rb:focus-visible{outline:2px solid var(--gold);outline-offset:-2px}' +
    '.p75bonds .nm b{display:block;font-weight:800;font-size:15.5px;color:#fff}.p75bonds .nm>span{font-size:12.5px;color:var(--muted)}' +
    '.p75bonds .tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;padding:1px 8px;border-radius:99px;margin-left:6px;border:1px solid var(--line);color:var(--soft)}' +
    '.p75bonds .num{font-variant-numeric:tabular-nums;text-align:right}' +
    '.p75bonds .px b{display:block;font-weight:800;font-size:16px}.p75bonds .px span{font-size:11.5px;color:var(--muted)}' +
    '.p75bonds .ch{font-weight:700;font-size:13px}.p75bonds .ch small{display:block;font-size:11px;color:var(--muted);font-weight:500}' +
    '.p75bonds .upc{color:var(--up)}.p75bonds .dnc{color:var(--down)}.p75bonds .flc{color:var(--muted)}' +
    '.p75bonds .more{display:block;width:100%;padding:12px;background:none;border:0;border-top:1px solid var(--line);color:var(--gold);font:700 14px Manrope,system-ui,sans-serif;cursor:pointer}' +
    '.p75bonds .det{padding:4px 18px 22px;border-top:1px dashed var(--line);display:flex;flex-direction:column;gap:14px}' +
    '.p75bonds .perf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}' +
    '.p75bonds .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}' +
    '.p75bonds .st{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:10px 12px}' +
    '.p75bonds .st small{display:block;font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}' +
    '.p75bonds .st b{display:block;font-size:17px;font-weight:800;margin-top:3px;font-variant-numeric:tabular-nums}' +
    '.p75bonds .chart svg{width:100%;height:auto;display:block}' +
    '.p75bonds h3{font:700 12.5px Manrope,system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin:0}' +
    '.p75bonds .calc{border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:12px;background:var(--ink)}' +
    '.p75bonds .ctl{display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:14px;color:var(--soft)}' +
    '.p75bonds .ctl label{min-width:96px}.p75bonds .ctl input[type=range]{flex:1;min-width:150px;accent-color:var(--gold)}' +
    '.p75bonds .ctl input[type=number]{width:140px;font:600 14px Manrope,system-ui,sans-serif;padding:7px 9px;border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--cream)}' +
    '.p75bonds .ctl output{font-weight:800;min-width:64px;text-align:right}' +
    '.p75bonds .fine{font-size:12.5px;color:var(--muted);line-height:1.55;margin:0}.p75bonds .fine a{color:var(--gold)}' +
    '.p75bonds .nope{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px;font-size:15px;line-height:1.6;color:var(--soft)}' +
    '.p75bonds .nope b{color:#fff}.p75bonds .nope a{color:var(--gold);font-weight:700}' +
    '.p75bonds h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:27px;margin:46px 0 4px}' +
    '.p75bonds .sub{color:var(--soft);font-size:15px;line-height:1.55;margin:0 0 14px;max-width:640px}' +
    '.p75bonds .etfs{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}' +
    '.p75bonds .etf{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;gap:6px}' +
    '.p75bonds .etf .tk{font-weight:800;font-size:22px;color:#fff}.p75bonds .etf .rk{float:right;color:var(--gold);font-weight:800;font-size:13px}' +
    '.p75bonds .etf .fn{font-size:13.5px;color:var(--soft)}' +
    '.p75bonds .etf dl{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;margin:6px 0 0;font-size:13.5px}' +
    '.p75bonds .etf dt{color:var(--muted)}.p75bonds .etf dd{margin:0;text-align:right;font-weight:700;font-variant-numeric:tabular-nums}' +
    '.p75bonds .etf p{font-size:13.5px;line-height:1.5;color:var(--soft);margin:4px 0 0}' +
    '.p75bonds .foot{margin-top:40px;color:var(--muted);font-size:12.5px;line-height:1.6;border-top:1px solid var(--line);padding-top:16px}' +
    '.p75bonds .load{color:var(--muted);margin-top:24px}' +
    '@media (max-width:620px){.p75bonds .wrap{padding:30px 16px 56px}.p75bonds h1{font-size:30px}.p75bonds .rb{grid-template-columns:minmax(0,1fr) 78px 64px;padding:13px 14px}.p75bonds .rb .spk{display:none}' +
      '.p75bonds .perf{grid-template-columns:repeat(2,minmax(0,1fr))}.p75bonds .det{padding:4px 14px 18px}}';

  var ETFS = [
    ['BND', 'Vanguard Total Bond Market ETF', '$161B', '0.03%', 'Medium', 'The whole U.S. investment-grade market in one fund: Treasuries, mortgage bonds and company bonds.'],
    ['AGG', 'iShares Core U.S. Aggregate Bond ETF', '$136B', '0.03%', 'Medium', 'BlackRock’s version of the same idea: it tracks the benchmark U.S. bond index.'],
    ['SGOV', 'iShares 0–3 Month Treasury Bond ETF', '$112B', '0.09%', 'Very low', 'Treasury bills that mature within three months. Behaves much like cash that earns interest.'],
    ['BNDX', 'Vanguard Total International Bond ETF', '$83B', '0.07%', 'Medium', 'Investment-grade bonds from outside the U.S., with the currency risk hedged back to dollars.'],
    ['VCIT', 'Vanguard Intermediate-Term Corporate Bond ETF', '$67B', '0.03%', 'Medium', 'Investment-grade company bonds maturing in roughly 5 to 10 years.']];
  var ETF_ASOF = 'September 2026';

  var KIND = { B: ['Bill', 'T-bill'], N: ['Note', 'Treasury note'], O: ['Bond', 'Treasury bond'], T: ['TIPS', 'Inflation-protected (TIPS)'], F: ['FRN', 'Floating-rate note'] };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONL = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  function once() {
    if (document.getElementById('p75bonds-css')) return;
    var st = document.createElement('style'); st.id = 'p75bonds-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function day(s) { return new Date(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10))); }
  function fmtD(d) { return MON[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear(); }
  function shortD(s) { var d = day(s); return MON[d.getUTCMonth()] + ' ' + d.getUTCDate(); }

  // ---- pricing math (same model as fetch_bonds.py) ----
  var SETTLE;
  function addM(d, m) { var x = new Date(d); var dd = x.getUTCDate(); x.setUTCDate(1); x.setUTCMonth(x.getUTCMonth() + m); var last = new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + 1, 0)).getUTCDate(); x.setUTCDate(Math.min(dd, last)); return x; }
  function sched(b) { var k = 0, prev; while (true) { prev = addM(b.mat, -6 * (k + 1)); if (prev <= SETTLE) break; k++; } var next = addM(prev, 6); return { N: k + 1, fr: (SETTLE - prev) / (next - prev) }; }
  function dirty(b, y) { var s = sched(b), c = b.cp / 2, r = y / 200, p = 0; for (var i = 1; i <= s.N; i++) p += c / Math.pow(1 + r, i - s.fr); return p + 100 / Math.pow(1 + r, s.N - s.fr); }
  function risk(b) {
    if (b.k === 'B') { var t = (b.mat - SETTLE) / 3.15576e10; return { d: t / (1 + b.y / 100 * t), cx: t * t }; }
    var h = .01, P = dirty(b, b.y), u = dirty(b, b.y + h), dn = dirty(b, b.y - h);
    return { d: (dn - u) / (2 * P * h / 100), cx: (u + dn - 2 * P) / (P * Math.pow(h / 100, 2)) };
  }

  var D = null, ALL = [], open = null, state = { shift: 100, face: 10000 }, shown = 25;
  function prep(j) {
    SETTLE = day(j.asof);
    ALL = j.bonds.map(function (r) {
      var b = { c: r.c, k: r.k, cp: r.cp || 0, mat: day(r.m), m: r.m, issued: r.i, term: r.t, out: r.o, y: r.y, px: r.p, h: r.h || {} };
      b.yrs = (b.mat - SETTLE) / 3.15576e10;
      if (b.y != null) { var x = risk(b); b.dur = x.d; b.cx = x.cx; }
      return b;
    }).filter(function (b) { return b.yrs > 0; });
  }
  function name(b) {
    if (b.k === 'B') return 'Treasury bill · ' + fmtD(b.mat);
    var c = b.k === 'F' ? '' : (b.cp % 1 === 0 ? b.cp.toFixed(0) : String(+b.cp.toFixed(4))) + '% ';
    return c + KIND[b.k][1] + ' · ' + MON[b.mat.getUTCMonth()] + ' ' + b.mat.getUTCFullYear();
  }
  function termLbl(b) { return b.yrs < 1 ? Math.max(1, Math.round(b.yrs * 12)) + ' mo left' : b.yrs.toFixed(b.yrs < 10 ? 1 : 0) + ' yrs left'; }
  function pct(a, b) { return a == null || b == null ? null : (a / b - 1) * 100; }
  function chg(v, tag) { tag = tag || 'b'; if (v == null) return '<' + tag + ' class="flc">—</' + tag + '>'; return '<' + tag + ' class="' + (Math.abs(v) < .005 ? 'flc' : v > 0 ? 'upc' : 'dnc') + '">' + (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2) + '%</' + tag + '>'; }

  // ---- search: CUSIP, prefix, or plain words (type, "10 year", year, month, coupon) ----
  function search(q) {
    q = q.trim();
    if (!q) return { list: ALL.filter(function (b) { return b.k !== 'B'; }).sort(function (a, b) { return a.mat - b.mat; }), note: 'All Treasury notes, bonds, TIPS and FRNs by maturity (search to include bills)' };
    var qc = q.replace(/\s+/g, '').toUpperCase();
    if (!/\s/.test(q) && /^[0-9A-Z]{9}$/.test(qc) && /\d/.test(qc) && !/^(BILLS?|TIPS|NOTES?|BONDS?)\d/.test(qc)) {
      var hit = ALL.filter(function (b) { return b.c === qc; });
      return hit.length ? { list: hit, note: 'CUSIP match' } : { list: [], cusip: qc };
    }
    if (/^9128[0-9A-Z]{0,4}$/.test(qc)) return { list: ALL.filter(function (b) { return b.c.indexOf(qc) === 0; }), note: 'CUSIPs starting ' + qc };
    var t = q.toLowerCase().replace(/,/g, ' ').split(/\s+/).filter(Boolean), kinds = [], tenor = null, year = null, month = null, cp = null, other = [];
    t.forEach(function (w, i) {
      var nextw = t[i + 1] || '';
      if (/^(bill|bills|t-bill|t-bills|tbill|tbills)$/.test(w)) kinds.push('B');
      else if (/^notes?$/.test(w)) kinds.push('N');
      else if (/^bonds?$/.test(w) && !/year|yr/.test(t[i - 1] || '')) kinds.push('O');
      else if (/^tips$|^inflation/.test(w)) kinds.push('T');
      else if (/^(frn|frns|floating|floater|floaters)$/.test(w)) kinds.push('F');
      else if (/^\d+(\.\d+)?%$/.test(w)) cp = parseFloat(w);
      else if (/^\d{4}$/.test(w) && +w >= 2026 && +w <= 2060) year = +w;
      else if (/^\d{1,2}(y|yr|yrs|-year|-yr)$/.test(w)) tenor = parseInt(w, 10);
      else if (/^\d{1,2}$/.test(w) && /^(y|yr|yrs|year|years|-year)$/.test(nextw)) tenor = parseInt(w, 10);
      else if (/^\d{1,2}$/.test(w) && /^(month|months|mo|week|weeks|wk)$/.test(nextw)) tenor = parseInt(w, 10) / (/^w/.test(nextw) ? 52 : 12);
      else if (w.length >= 3 && MONL.some(function (m) { return m.indexOf(w) === 0; })) month = MONL.findIndex(function (m) { return m.indexOf(w) === 0; });
      else if (/^\d+\.\d+$/.test(w) && +w < 15) cp = +w;
      else if (!/^(y|yr|yrs|year|years|month|months|mo|week|weeks|wk|treasury|treasuries|us|u\.s\.|the|a|of|in|matures|maturing|due|t|yield)$/.test(w)) other.push(w);
    });
    var L = ALL.filter(function (b) {
      return (!kinds.length || kinds.indexOf(b.k) > -1) && (!year || b.mat.getUTCFullYear() === year) &&
        (month == null || b.mat.getUTCMonth() === month) && (cp == null || Math.abs(b.cp - cp) < .13);
    });
    if (tenor != null) {
      L = L.map(function (b) { return [Math.abs(b.yrs - tenor) + (kinds.length ? 0 : (b.k === 'T' || b.k === 'F' ? 1.5 : 0)), b]; })
        .filter(function (x) { return x[0] < Math.max(.3, tenor * .2) + 1.5; }).sort(function (a, b) { return a[0] - b[0]; }).map(function (x) { return x[1]; });
    } else L.sort(function (a, b) { return a.mat - b.mat; });
    var bits = [];
    if (kinds.length) bits.push(kinds.map(function (k) { return KIND[k][0]; }).join(' or '));
    if (tenor != null) bits.push('about ' + (tenor < 1 ? Math.round(tenor * 12) + ' months' : tenor + ' years') + ' to maturity');
    if (year) bits.push('maturing in ' + (month != null ? MON[month] + ' ' : '') + year); else if (month != null) bits.push('maturing in ' + MON[month]);
    if (cp != null) bits.push(cp + '% coupon');
    if (!bits.length && other.length) return { list: [], words: q };
    return { list: L, note: 'Showing Treasuries: ' + bits.join(', ') };
  }

  // ---- drawing ----
  var ORDER = ['ytd', '3m', '1m', '1w'];
  function series(b) { var s = ORDER.map(function (k) { return [D.marks[k], b.h[k]]; }).filter(function (p) { return p[1] != null; }); if (b.px != null) s.push([D.asof, b.px]); return s; }
  function spark(b, w, h) {
    var v = series(b).map(function (p) { return p[1]; }); if (v.length < 2) return '<span class="spk"></span>';
    var mn = Math.min.apply(null, v), mx = Math.max.apply(null, v), rg = (mx - mn) || 1;
    return '<svg class="spk" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><polyline fill="none" stroke="#C9A227" stroke-width="1.8" stroke-linejoin="round" points="' +
      v.map(function (x, i) { return (i / (v.length - 1) * w).toFixed(1) + ',' + (h - 3 - (x - mn) / rg * (h - 6)).toFixed(1); }).join(' ') + '"/></svg>';
  }
  function trend(b, host) {
    var pts = series(b); if (pts.length < 2) return '';
    var W = Math.max(320, Math.min(600, (host.querySelector('.p75b-out').clientWidth || 600) - 36)), H = W < 480 ? 170 : 150, L = 46, R = 12, T = 12, Bt = 26;
    var v = pts.map(function (p) { return p[1]; }), mn = Math.min.apply(null, v), mx = Math.max.apply(null, v), pad = (mx - mn) * .15 || .3; mn -= pad; mx += pad;
    var x = function (i) { return L + i / (pts.length - 1) * (W - L - R); }, y = function (p) { return T + (mx - p) / (mx - mn) * (H - T - Bt); };
    var tk = [mn + (mx - mn) * .15, (mn + mx) / 2, mx - (mx - mn) * .15];
    return '<div class="chart"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Estimated value over the year so far">' +
      tk.map(function (t) { return '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" stroke="#2A2B2F"/><text x="' + (L - 7) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="#B8B2A5" font-family="Manrope,sans-serif">' + t.toFixed(1) + '</text>'; }).join('') +
      '<polyline fill="none" stroke="#C9A227" stroke-width="2.4" stroke-linejoin="round" points="' + pts.map(function (p, i) { return x(i).toFixed(1) + ',' + y(p[1]).toFixed(1); }).join(' ') + '"/>' +
      pts.map(function (p, i) { return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p[1]).toFixed(1) + '" r="' + (i === pts.length - 1 ? 5 : 3.5) + '" fill="#C9A227" stroke="#17181B" stroke-width="2"/>'; }).join('') +
      pts.map(function (p, i) { return '<text x="' + x(i).toFixed(1) + '" y="' + (H - 6) + '" text-anchor="' + (i === 0 ? 'start' : i === pts.length - 1 ? 'end' : 'middle') + '" font-size="12" fill="#B8B2A5" font-family="Manrope,sans-serif">' + shortD(p[0]) + '</text>'; }).join('') + '</svg></div>';
  }
  function calcOut(b) {
    if (b.k === 'F' || b.y == null) return '<p class="fine">Floating-rate notes reset their interest every week, so their value barely moves when rates change.</p>';
    var s = state.shift / 100, dy = s / 100, P = b.px, e = P * (1 - b.dur * dy + .5 * b.cx * dy * dy), lin = P * (1 - b.dur * dy), pnl = (e - P) / 100 * state.face;
    return '<div class="facts"><div class="st"><small>New yield</small><b>' + (b.y + s).toFixed(2) + '%</b></div><div class="st"><small>Estimated value</small><b>' + e.toFixed(2) + '</b></div>' +
      '<div class="st"><small>Duration-only estimate</small><b>' + lin.toFixed(2) + '</b></div><div class="st"><small>Gain / loss</small><b class="' + (pnl >= 0 ? 'upc' : 'dnc') + '">' + (pnl < 0 ? '−$' : '+$') + Math.abs(Math.round(pnl)).toLocaleString('en-US') + '</b></div></div>';
  }
  function detail(b, host) {
    var perf = ['1w', '1m', '3m', 'ytd'].map(function (k, i) { return '<div class="st"><small>' + ['1 week', '1 month', '3 months', 'Year to date'][i] + '</small>' + chg(pct(b.px, b.h[k])) + '</div>'; }).join('');
    var facts = '<div class="st"><small>Type</small><b style="font-size:15px">' + KIND[b.k][1] + '</b></div>' +
      '<div class="st"><small>Coupon</small><b' + (b.k === 'B' ? ' style="font-size:14px"' : '') + '>' + (b.k === 'B' ? 'None (sold at a discount)' : b.k === 'F' ? 'Floating' : b.cp + '%') + '</b></div>' +
      '<div class="st"><small>Matures</small><b style="font-size:15px">' + fmtD(b.mat) + '</b></div>' +
      (b.y != null ? '<div class="st"><small>' + (b.k === 'T' ? 'Est. real yield' : 'Est. yield') + '</small><b>' + b.y.toFixed(2) + '%</b></div>' : '') +
      (b.y != null ? '<div class="st"><small>Duration</small><b>' + b.dur.toFixed(2) + ' yrs</b></div><div class="st"><small>DV01 per $10,000</small><b>$' + (b.dur * b.px / 100).toFixed(2) + '</b></div>' : '') +
      (b.term ? '<div class="st"><small>First issued as</small><b style="font-size:15px">' + esc(b.term) + (b.issued ? ', ' + MON[+b.issued.slice(5, 7) - 1] + ' ' + b.issued.slice(0, 4) : '') + '</b></div>' : '') +
      (b.out ? '<div class="st"><small>Amount outstanding</small><b>$' + (b.out >= 1 ? b.out.toFixed(1) + 'B' : Math.round(b.out * 1000) + 'M') + '</b></div>' : '');
    return '<div class="det">' + (b.y != null ? trend(b, host) + '<div class="perf">' + perf + '</div>' : '') + '<div class="facts">' + facts + '</div>' +
      '<div class="calc"><h3>What if rates move?</h3><div class="ctl"><label for="p75b-sh">Yield change</label><input type="range" id="p75b-sh" min="-200" max="200" step="25" value="' + state.shift + '"><output id="p75b-sho">' + (state.shift > 0 ? '+' : '') + (state.shift / 100).toFixed(2) + '%</output></div>' +
      '<div class="ctl"><label for="p75b-fa">You own</label><input type="number" id="p75b-fa" min="1000" step="1000" value="' + state.face + '"> <span style="color:var(--muted);font-size:13px">face value, $</span></div><div id="p75b-co">' + calcOut(b) + '</div></div>' +
      '<p class="fine">CUSIP <b style="color:var(--cream)">' + b.c + '</b> · Values are per $100 of face value, estimated from the Treasury yield curve; a bond’s actual trading price can differ by up to about a point. Performance is value change only; it leaves out the interest paid. ' +
      '<a href="https://www.treasurydirect.gov/auctions/auction-query/" target="_blank" rel="noopener">Look up this CUSIP at the U.S. Treasury</a></p></div>';
  }
  function list(host) {
    var q = host.querySelector('#p75bq').value, r = search(q), out = host.querySelector('.p75b-out'), meta = host.querySelector('.meta');
    if (r.cusip) {
      meta.textContent = '';
      out.innerHTML = '<div class="nope"><b>' + esc(r.cusip) + '</b> isn’t an outstanding U.S. Treasury.<br>If it’s a company or municipal bond, its latest trades are published by FINRA (company bonds) and the MSRB (municipal bonds):<br>' +
        '<a href="https://www.finra.org/finra-data/fixed-income" target="_blank" rel="noopener">Company bonds on FINRA &rarr;</a> &nbsp; <a href="https://emma.msrb.org/" target="_blank" rel="noopener">Municipal bonds on EMMA &rarr;</a></div>';
      return;
    }
    if (r.words) { meta.textContent = ''; out.innerHTML = '<div class="nope">We couldn’t match “' + esc(r.words) + '”. Try a CUSIP, a length like <b>7 year</b>, a maturity like <b>2031</b> or <b>March 2027</b>, a coupon like <b>4.5%</b>, or a type like <b>TIPS</b> or <b>bills</b>.</div>'; return; }
    meta.textContent = r.note + ' · ' + r.list.length + (r.list.length === 1 ? ' security' : ' securities');
    if (!r.list.length) { out.innerHTML = '<div class="nope">No outstanding Treasuries match that. Try widening it, for example just the year.</div>'; return; }
    var rows = r.list.slice(0, shown).map(function (b) {
      var ref = b.h['1m'] != null ? ['1m', '1 month'] : b.h['1w'] != null ? ['1w', '1 week'] : null;
      return '<div class="row"><button class="rb" type="button" data-c="' + b.c + '" aria-expanded="' + (open === b.c) + '"><span class="nm"><b>' + esc(name(b)) + '</b><span>' + b.c + ' · ' + termLbl(b) + '<span class="tag">' + KIND[b.k][0] + '</span></span></span>' + spark(b, 90, 26) +
        '<span class="px num"><b>' + (b.px != null ? b.px.toFixed(2) : '≈100') + '</b><span>' + (b.y == null ? 'floating' : b.y.toFixed(2) + '%' + (b.k === 'T' ? ' real' : '')) + '</span></span>' +
        '<span class="ch num">' + (ref ? chg(pct(b.px, b.h[ref[0]]), 'span') + '<small>' + ref[1] + '</small>' : '<span class="flc">—</span>') + '</span></button>' + (open === b.c ? detail(b, host) : '') + '</div>';
    }).join('');
    out.innerHTML = '<div class="list">' + rows + (r.list.length > shown ? '<button type="button" class="more">Show ' + Math.min(25, r.list.length - shown) + ' more of ' + (r.list.length - shown) + '</button>' : '') + '</div>';
  }

  function page(j) {
    var asof = day(j.asof);
    return '<div class="wrap"><div class="eyebrow">Bonds</div><h1>Find a bond</h1>' +
      '<p class="lede">Search any U.S. Treasury by CUSIP or in plain words. See its yield, what it’s worth, how it has performed and how much it moves when rates change.</p>' +
      '<div class="asof">Yield curve as of <b>' + fmtD(asof) + '</b> · ' + j.count + ' Treasuries · updated every weekday</div>' +
      '<div class="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A227" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>' +
      '<input id="p75bq" type="search" autocomplete="off" placeholder="CUSIP or words, e.g. 10 year, TIPS 2035, bills March" aria-label="Search bonds by CUSIP or description"></div>' +
      '<div class="tries">Try: ' + ['10 year', '30 year bond', 'TIPS', 'bills', '2 year', 'FRN'].map(function (t) { return '<button type="button">' + t + '</button>'; }).join('') + '</div>' +
      '<p class="meta" aria-live="polite"></p><div class="p75b-out"></div>' +
      '<h2>The most-owned bond ETFs</h2><p class="sub">For most people, a fund is an easier way to own bonds than buying single ones. These are the five largest U.S.-listed bond ETFs by money invested.</p><div class="etfs">' +
      ETFS.map(function (e, i) {
        return '<div class="etf"><div><span class="rk">#' + (i + 1) + '</span><span class="tk">' + e[0] + '</span></div><div class="fn">' + e[1] + '</div>' +
          '<dl><dt>Fund size</dt><dd>' + e[2] + '</dd><dt>Yearly fee</dt><dd>' + e[3] + '</dd><dt>Rate sensitivity</dt><dd>' + e[4] + '</dd></dl><p>' + e[5] + '</p></div>';
      }).join('') + '</div><p class="fine" style="margin-top:10px">Fund sizes and fees from ETF Database, ' + ETF_ASOF + '. Rate sensitivity is a plain-English guide to each fund’s duration.</p>' +
      '<p class="foot">The list of Treasuries comes from U.S. Treasury Fiscal Data. Yields and values are Point75 estimates from the Treasury yield curve published by the Federal Reserve Bank of St. Louis (FRED); a bond’s actual trading price can differ slightly. TIPS yields are real yields, before inflation. ' +
      'A simplified tool for learning, not investment advice.<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
  }

  function wire(host) {
    var q = host.querySelector('#p75bq'), t = 0;
    q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { open = null; shown = 25; list(host); }, 150); });
    host.querySelector('.tries').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; q.value = b.textContent; open = null; shown = 25; list(host);
    });
    var out = host.querySelector('.p75b-out');
    out.addEventListener('click', function (e) {
      if (e.target.closest('.more')) { shown += 25; list(host); return; }
      var b = e.target.closest('.rb'); if (!b) return;
      var c = b.getAttribute('data-c'); open = open === c ? null : c; state = { shift: 100, face: 10000 }; list(host);
    });
    out.addEventListener('input', function (e) {
      var b = ALL.find(function (x) { return x.c === open; }); if (!b) return;
      if (e.target.id === 'p75b-sh') { state.shift = +e.target.value; host.querySelector('#p75b-sho').textContent = (state.shift > 0 ? '+' : '') + (state.shift / 100).toFixed(2) + '%'; }
      else if (e.target.id === 'p75b-fa') { var v = +e.target.value; if (!(v > 0)) return; state.face = v; } else return;
      host.querySelector('#p75b-co').innerHTML = calcOut(b);
    });
    // open with the 10-year so first-time visitors see what a result looks like
    q.value = '10 year'; list(host);
    var first = search('10 year').list[0]; if (first) { open = first.c; list(host); }
  }

  var loading = false;
  function load(cb) {
    if (D) return cb(D);
    if (loading) return; loading = true;
    fetch(API).then(function (r) { return r.json(); }).then(function (j) { D = j; loading = false; cb(j); }).catch(function () { loading = false; cb(null); });
  }
  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75bonds')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75bonds';
    host.innerHTML = '<div class="wrap"><div class="eyebrow">Bonds</div><h1>Find a bond</h1><div class="load">Loading today’s Treasuries…</div></div>';
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.bonds) { host.querySelector('.load').textContent = 'Bond data is unavailable right now. Please try again shortly.'; return; }
      prep(j); host.innerHTML = page(j); wire(host);
    });
  }
  function clear() { var h = document.querySelector('.p75bonds'); if (h) h.remove(); }

  window.P75BONDS = { render: render, clear: clear };
})();
