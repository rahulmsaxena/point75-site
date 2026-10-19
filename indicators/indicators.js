/* Point75 - Economic Indicators page (/economic-indicators, under Kinetics). Loaded by p75.js;
   data from news.point75.io/api/indicators (fetch_indicators.py in Finance-NewsFeed-Aggregator, weekdays).
   One Shot layout (ONE-SHOT.md): dials up top, a Takeaway tab first, one tab per category, the yield curve,
   and a top that folds away when a tab is picked or the reader scrolls down the Takeaway.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75IND) return;
  var DATA = 'https://news.point75.io/api/indicators';
  var GOOD = '#1FC8FF', BAD = '#E5484D', MID = '#F2A33A', FLAT = '#B4BAC1', GOLD = '#C9A227';

  var CSS =
    '.p75ind{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--soft:#D9D3C6;--muted:#A9A396;--gold:' + GOLD + ';' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box;min-height:calc(100vh - 90px)}' +
    '.p75ind *{box-sizing:border-box}.p75ind,.p75ind *{overflow-anchor:none}' +
    '.p75ind .wrap{max-width:1040px;margin:0 auto;padding:4px 20px 40px}' +
    '.p75ind .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75ind h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:0;letter-spacing:-.01em}' +
    '.p75ind .hd-t{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px}' +
    '.p75ind .asof{margin-left:auto;font-size:12.5px;color:var(--muted)}.p75ind .asof b{color:var(--cream);font-weight:600}' +
    '.p75ind .lede{color:var(--soft);font-size:16px;line-height:1.55;margin:6px 0 0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75ind .num{font-variant-numeric:tabular-nums}' +
    '.p75ind button{font:inherit;color:inherit}' +
    // overview dials
    '.p75ind .ov{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:12px 0 0}' +
    '.p75ind .og{display:flex;flex-direction:column;gap:2px;padding:9px 12px 10px;border-radius:14px;background:var(--panel);border:1px solid var(--line);color:inherit;text-decoration:none;cursor:pointer;transition:border-color .15s}' +
    '.p75ind .og:hover,.p75ind .og:focus-visible{border-color:var(--gold);outline:none}' +
    '.p75ind .og .k{font-size:12.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#DCD6C9}' +
    '.p75ind .ogb{display:flex;align-items:center;gap:10px}.p75ind .ogv{display:flex;flex-direction:column;gap:4px;min-width:0}' +
    '.p75ind .og .gd{flex:0 0 auto;width:140px}.p75ind .og svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75ind .og .v{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:36px;line-height:1;text-shadow:0 0 14px currentColor}.p75ind .og .v small{font-family:Manrope,sans-serif;font-size:13px;margin-left:3px;opacity:.8;text-shadow:none}' +
    '.p75ind .og .c{font-size:13.5px;font-weight:700;white-space:nowrap}.p75ind .og .c span{display:block;color:var(--muted);font-weight:500;margin-top:2px}' +
    // dials
    '.p75ind .p75n{transition:transform 2.2s cubic-bezier(.37,0,.3,1)}' +
    '.p75ind .p75f{stroke-dashoffset:100;transition:stroke-dashoffset 2.2s cubic-bezier(.37,0,.3,1)}.p75ind .go .p75f{stroke-dashoffset:0}' +
    // fold-away top
    '.p75ind .top,.p75ind .fstrip{display:grid;transition:grid-template-rows .5s cubic-bezier(.4,0,.2,1),opacity .4s}' +
    '.p75ind .top > div,.p75ind .fstrip > div{min-height:0;overflow:hidden}' +
    '.p75ind .top{grid-template-rows:1fr}.p75ind .fstrip{grid-template-rows:0fr;opacity:0}' +
    '.p75ind.folded .top{grid-template-rows:0fr;opacity:0}.p75ind.folded .fstrip{grid-template-rows:1fr;opacity:1}' +
    '.p75ind:not(.folded) .fstrip{visibility:hidden}.p75ind.folded .top > div{visibility:hidden;transition:visibility 0s .5s}' +
    '.p75ind .fold{display:flex;align-items:center;gap:6px 20px;flex-wrap:wrap;width:100%;min-height:46px;margin:0;padding:6px 8px 6px 16px;border-radius:12px;background:var(--panel);border:1px solid var(--line);text-align:left;cursor:pointer;transition:border-color .15s}' +
    '.p75ind .fold:hover{border-color:var(--gold)}.p75ind .fold:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75ind .fi{display:inline-flex;align-items:baseline;gap:7px;white-space:nowrap}' +
    '.p75ind .fi small{color:var(--muted);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75ind .fi b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:20px;line-height:1}' +
    '.p75ind .fo{margin-left:auto;display:inline-flex;align-items:center;gap:10px;color:var(--gold);font-size:13px;font-weight:700}' +
    '.p75ind .fo-c{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--gold);display:grid;place-items:center;animation:p75ibob 2.4s ease-in-out infinite}' +
    '.p75ind .fo-c:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '@keyframes p75ibob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}' +
    // tabs
    '.p75ind .tabs{position:sticky;top:var(--tabs-top,0px);z-index:6;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:12px -20px 0;padding:8px 20px;background:var(--ink);border-bottom:1px solid var(--line)}' +
    '.p75ind .tabs::-webkit-scrollbar{display:none}' +
    '.p75ind .tab{flex:none;display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:0 16px;border-radius:999px;border:1px solid #3A3C42;color:var(--soft);font-weight:700;font-size:14.5px;text-decoration:none;white-space:nowrap;transition:border-color .15s,background .15s,color .15s}' +
    '.p75ind .tab:hover{border-color:var(--gold);color:#fff}' +
    '.p75ind .tab.on{background:var(--gold);border-color:var(--gold);color:#111214}' +
    '.p75ind .tab:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75ind .tab i{width:7px;height:7px;border-radius:50%;flex:none}' +
    '.p75ind .view{padding-top:14px}' +
    '.p75ind a.tk-back{display:inline-flex;align-items:center;gap:8px;min-height:36px;margin:0 0 10px;padding:0 14px;border-radius:99px;border:1px solid var(--gold);background:rgba(201,162,39,.1);color:#FFD23F;font-weight:800;font-size:14px;text-decoration:none}' +
    // takeaway
    '.p75ind .tk{display:flex;flex-direction:column;gap:12px}' +
    '.p75ind .tk-head{margin:0;padding:16px 20px;border-radius:16px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);font-family:"Hedvig Letters Serif",Georgia,serif;font-size:24px;line-height:1.45;color:#fff}' +
    '.p75ind .hl{text-shadow:0 0 12px currentColor}' +
    '.p75ind .tk-watch{display:flex;align-items:center;gap:10px;margin:0;font-size:16.5px;color:#F1ECE2}.p75ind .tk-watch b{color:#FFD23F}' +
    '.p75ind .tk-watch i{flex:0 0 auto;width:9px;height:9px;border-radius:50%;background:#FF3D5E;animation:p75iping 1.8s ease-out infinite}' +
    '@keyframes p75iping{0%{box-shadow:0 0 0 0 rgba(255,61,94,.6)}100%{box-shadow:0 0 0 10px rgba(255,61,94,0)}}' +
    '.p75ind .tk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}' +
    '.p75ind a.tk-c{display:flex;flex-direction:column;gap:6px;padding:12px 14px;border-radius:14px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);color:inherit;text-decoration:none;transition:border-color .15s,transform .15s}' +
    '.p75ind a.tk-c:hover,.p75ind a.tk-c:focus-visible{border-color:var(--gold);outline:none}' +
    '@media (hover:hover){.p75ind a.tk-c:hover{transform:translateY(-2px)}}' +
    '.p75ind .tk-h{display:flex;align-items:center;justify-content:space-between;gap:8px}.p75ind .tk-h b{font-size:12.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#DCD6C9}.p75ind .tk-go{color:var(--gold);font-size:13.5px;font-weight:800;white-space:nowrap}' +
    '.p75ind .tk-b{display:flex;align-items:center;gap:12px}' +
    '.p75ind .tk-d{flex:0 0 auto;width:104px}.p75ind .tk-d svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75ind .tk-t{display:flex;flex-direction:column;gap:2px;min-width:0}' +
    '.p75ind .tk-t > b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:33px;line-height:1;text-shadow:0 0 14px currentColor}.p75ind .tk-t > b small{font-family:Manrope,sans-serif;font-size:13px;margin-left:3px;opacity:.8;text-shadow:none}' +
    '.p75ind .tk-t em{font-style:normal;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75ind .tk-l{font-size:15px;line-height:1.45;color:#E4DED1}' +
    // category tab: indicator dial cards, chart below
    '.p75ind .ch{display:flex;align-items:center;gap:10px;margin:0 0 10px;flex-wrap:wrap}.p75ind .ch h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:23px;margin:0}' +
    '.p75ind .pill{font-size:12.5px;font-weight:800;padding:3px 11px;border-radius:99px;border:1px solid currentColor}' +
    '.p75ind .hint{display:flex;align-items:center;gap:8px;margin-left:auto;font-size:13px;color:var(--muted)}.p75ind .hint i{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:p75iping2 1.8s ease-out infinite}' +
    '@keyframes p75iping2{0%{box-shadow:0 0 0 0 rgba(201,162,39,.6)}100%{box-shadow:0 0 0 9px rgba(201,162,39,0)}}' +
    '.p75ind .ics{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:10px}' +
    '.p75ind .ic{display:flex;flex-direction:column;gap:4px;padding:10px 14px 10px;border-radius:14px;background:var(--panel);border:1px solid var(--line);text-align:left;cursor:pointer;transition:border-color .15s,transform .15s}' +
    '.p75ind .ic:hover{border-color:var(--gold)}.p75ind .ic:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75ind .ic[aria-expanded="true"]{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold) inset}' +
    '.p75ind .ic-h{display:flex;justify-content:space-between;align-items:baseline;gap:8px}.p75ind .ic-h b{font-size:14.5px;font-weight:800}.p75ind .ic-h small{font-size:12px;color:var(--muted);white-space:nowrap}' +
    '.p75ind .ic-b{display:flex;align-items:center;gap:12px}' +
    '.p75ind .ic-d{flex:0 0 auto;width:112px}.p75ind .ic-d svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75ind .ic-v{display:flex;flex-direction:column;gap:3px;min-width:0}' +
    '.p75ind .ic-v > b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:32px;line-height:1;text-shadow:0 0 14px currentColor}.p75ind .ic-v > b small{font-family:Manrope,sans-serif;font-size:12.5px;margin-left:3px;opacity:.8;text-shadow:none}' +
    '.p75ind .ic-v em{font-style:normal;font-size:12.5px;font-weight:700}' +
    '.p75ind .ic-v span{font-size:11.5px;color:var(--muted)}' +
    '.p75ind .ic-s{font-size:12px;color:var(--gold);font-weight:700}' +
    '.p75ind .idet{margin-top:10px;padding:12px 16px 12px;border-radius:14px;background:var(--panel);border:1px solid var(--gold)}' +
    '.p75ind .idet h3{display:flex;align-items:baseline;gap:10px;margin:0;font-size:15px;font-weight:800}.p75ind .idet h3 span{font-weight:500;font-size:12.5px;color:var(--muted)}' +
    '.p75ind .idet .x{margin-left:auto;width:32px;height:32px;border-radius:50%;border:1px solid var(--line);background:none;cursor:pointer;color:var(--muted);font-size:18px;line-height:1}' +
    '.p75ind .ranges{display:flex;gap:6px;margin:8px 0}' +
    '.p75ind .rb{font-size:12px;font-weight:700;padding:5px 12px;border-radius:7px;border:1px solid var(--line);background:var(--panel2);color:var(--muted);cursor:pointer}' +
    '.p75ind .rb[aria-pressed="true"]{border-color:var(--gold);color:var(--gold)}' +
    '.p75ind .rb:focus-visible{outline:2px solid var(--gold)}' +
    '.p75ind .chart{position:relative}.p75ind .chart svg{display:block;width:100%;height:auto}' +
    '.p75ind .tip{position:absolute;top:0;transform:translateX(-50%);background:#0b0c0e;border:1px solid var(--line);border-radius:6px;padding:3px 8px;font-size:12px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}' +
    '.p75ind .foot{color:var(--muted);font-size:12.5px;line-height:1.55;margin-top:8px}.p75ind .foot a{color:var(--gold);text-decoration:none}' +
    '.p75ind .note{color:var(--muted);font-size:12px;line-height:1.55;margin-top:14px}' +
    '.p75ind .load{color:var(--muted);margin-top:24px}' +
    // rates tab: the live rates panels
    '.p75ind .rates{margin-top:14px}' +
    '.p75ind .rcard{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:10px}' +
    '.p75ind .rlab{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);font-weight:700}' +
    '.p75ind .r10{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap}' +
    '.p75ind .r10 .big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:40px;line-height:1.05;margin-top:4px}' +
    '.p75ind .r10 .dl{font-family:Manrope,system-ui,sans-serif;font-weight:700;font-size:15px;margin-left:10px}.p75ind .r10 .wk{color:var(--muted);font-size:13px;margin-top:4px}' +
    '.p75ind .r10 svg{flex:1 1 220px;max-width:340px;height:64px}' +
    '.p75ind .rnarr{color:#E4DED1;font-size:15px;line-height:1.6;margin:12px 0 0;padding-top:12px;border-top:1px solid var(--line)}' +
    '.p75ind .rmini{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}' +
    '.p75ind .rm{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:10px 14px}' +
    '.p75ind .rm .v{font-weight:700;font-size:20px;margin:4px 0 6px}.p75ind .rm .v span{font-size:13px;margin-left:8px}' +
    '.p75ind .rm svg{width:100%;height:34px;display:block}' +
    '.p75ind .rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}' +
    '.p75ind .rc{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:12px 14px}' +
    '.p75ind .rc .n{font-weight:700;font-size:13.5px;letter-spacing:.08em;text-transform:uppercase;color:#CFC9BC}' +
    '.p75ind .rc .t{color:var(--muted);font-size:12px;margin-top:2px}' +
    '.p75ind .rc .v{font-weight:700;font-size:22px;margin:6px 0 2px;font-variant-numeric:tabular-nums}' +
    '.p75ind .rc .s{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;color:var(--muted)}' +
    '.p75ind .rc p{color:#DDD7CA;font-size:13.5px;line-height:1.5;margin:6px 0 0}' +
    '.p75ind .rsrc{color:var(--muted);font-size:12px;margin-top:8px}' +
    '.p75ind .fd{background:var(--panel);border:1px solid var(--line);border-radius:14px;margin-bottom:10px}' +
    '.p75ind .fd summary{list-style:none;display:flex;align-items:center;gap:12px;min-height:50px;padding:8px 16px;cursor:pointer}' +
    '.p75ind .fd summary::-webkit-details-marker{display:none}' +
    '.p75ind .fd summary:focus-visible{outline:2px solid var(--gold);outline-offset:-2px;border-radius:14px}' +
    '.p75ind .fd .fn{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:19px;flex:1;min-width:0}' +
    '.p75ind .fd .fs{font-size:14px;color:var(--muted);white-space:nowrap}.p75ind .fd .fs b{color:#fff;font-weight:700;margin-right:4px}' +
    '.p75ind .chev{width:16px;height:16px;color:var(--muted);transition:transform .2s;flex:none}.p75ind .fd[open] .chev{transform:rotate(180deg)}' +
    '.p75ind .fd .in{padding:0 14px 12px}.p75ind .fd .rcard{background:none;border:0;padding:0;margin:0}' +
    // yield curve tab
    '.p75ind .ycd{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}' +
    '.p75ind .ycread{font-size:15.5px;line-height:1.6;color:var(--cream);border-left:3px solid var(--gold);padding-left:14px;margin:12px 0}' +
    '.p75ind .yct{width:100%;border-collapse:collapse;font-size:13.5px}' +
    '.p75ind .yct th{text-align:left;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:700;padding:0 8px 8px 0;border-bottom:1px solid var(--line)}' +
    '.p75ind .yct td{padding:8px 8px 8px 0;border-bottom:1px solid var(--line)}.p75ind .yct .r{text-align:right}' +
    '.p75ind .ychart{position:relative}.p75ind .ychart svg{display:block;width:100%}' +
    // phones and tablets
    '@media (max-width:880px){.p75ind .hd-t{flex-direction:column;align-items:flex-start;gap:2px}.p75ind .asof{margin:2px 0 0}.p75ind .tk-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:720px){.p75ind .ov{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.p75ind .rmini{grid-template-columns:1fr}}' +
    '@media (max-width:560px){.p75ind .wrap{padding:4px 16px 32px}.p75ind h1{font-size:24px}.p75ind .lede{text-align:left;font-size:15px}' +
      '.p75ind .tabs{margin:10px -16px 0;padding:8px 16px;gap:6px}.p75ind .tab{min-height:36px;padding:0 12px;font-size:14px}' +
      '.p75ind .og{padding:8px 10px}.p75ind .og .gd{width:84px}.p75ind .og .v{font-size:24px}' +
      '.p75ind .tk-grid{grid-template-columns:1fr}.p75ind .tk-head{font-size:19px;padding:13px 15px}.p75ind .tk-watch{font-size:15px}' +
      '.p75ind .fold{gap:4px 14px}.p75ind .fo-t{display:none}.p75ind .ics{grid-template-columns:1fr}' +
      '.p75ind .ycd{grid-template-columns:1fr 1fr}.p75ind .ycd > :last-child{grid-column:1/-1}.p75ind .yct .hs{display:none}.p75ind .hint{margin-left:0;flex-basis:100%}}' +
    '@media (max-width:900px){.p75ind .og .gd{width:84px}.p75ind .og .v{font-size:25px}.p75ind .ic-d{width:80px}.p75ind .ic-v > b{font-size:25px}}' +
    '@media (max-width:560px){.p75ind .og svg text{display:none}}' +   // range labels are too small to read on phones
    '@media (max-width:400px){.p75ind .og{padding:8px}.p75ind .og .gd{width:66px}.p75ind .ogb{gap:6px}.p75ind .og .v{font-size:22px}.p75ind .ycd{grid-template-columns:1fr}.p75ind .ycd > :last-child{grid-column:auto}}' +
    '@media (prefers-reduced-motion:reduce){.p75ind .top,.p75ind .fstrip{transition:none}.p75ind .fo-c,.p75ind .tk-watch i,.p75ind .hint i{animation:none}.p75ind .chev,.p75ind .tip{transition:none}}';

  function once() {
    if (document.getElementById('p75ind-css2')) return;
    var st = document.createElement('style'); st.id = 'p75ind-css2'; st.textContent = CSS; document.head.appendChild(st);
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
    var box = document.querySelector('.p75ind .idet'), bw = box ? box.clientWidth - 32 : 640;
    var W = Math.round(Math.max(300, Math.min(1100, bw))), H = W < 480 ? 180 : 200, L = 42, R = 10, T = 12, B = 26;   // draw at real width so labels stay readable on phones
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
      '<div class="foot">' + esc(ind.note) + '. Shaded bands are U.S. recessions. <a href="' + esc(ind.source) + '" target="_blank" rel="noopener">Source: FRED</a></div>';
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
  var CHEV = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
  function ratesHTML(s) {
    var y = s.yields || {}, t = y.DGS10, h = '';
    if (t) {
      h += '<details class="fd"><summary><span class="fn">Rates today</span><span class="fs">10-year <b class="num">' + t.value.toFixed(2) + '%</b> ' +
        '<span style="color:' + bcol(t.change_1d_bps) + '">' + bps(t.change_1d_bps) + '</span></span>' + CHEV + '</summary>' +
        '<div class="in"><p class="rsub">Treasury yields, updated every weekday.</p><div class="rcard"><div class="r10"><div><div class="rlab">US 10-year Treasury</div><div class="big num">' + t.value.toFixed(2) + '%<span class="dl" style="color:' + bcol(t.change_1d_bps) + '">' + bps(t.change_1d_bps) + ' today</span></div>' +
        (t.change_1w_bps != null ? '<div class="wk">' + (t.change_1w_bps >= 0 ? '+' : '') + Math.round(t.change_1w_bps) + 'bp over the past week · as of ' + asof(t.date) + '</div>' : '') + '</div>' + mini(t.history, 340, 70) + '</div>' +
        (s.narrative ? '<p class="rnarr">' + esc(s.narrative) + '</p>' : '') +
        '<div class="rmini">' + ['DGS2', 'DGS30'].filter(function (k) { return y[k]; }).map(function (k) {
          var m = y[k]; return '<div class="rm"><div class="rlab" style="color:#CFC9BC">' + esc(m.label) + '</div><div class="v num">' + m.value.toFixed(2) + '%<span style="color:' + bcol(m.change_1d_bps) + '">' + bps(m.change_1d_bps) + '</span></div>' + mini(m.history, 220, 34) + '</div>';
        }).join('') + '</div></div></div></details>';
    }
    var r = s.policy_rates || {}, cards = POL.filter(function (p) { return r[p[0]] && typeof r[p[0]].value === 'number'; }).map(function (p) {
      var x = r[p[0]], val = p[0] === 'FFR' && typeof x.lower === 'number' ? x.lower.toFixed(2) + '–' + x.value.toFixed(2) + '%' : x.value.toFixed(2) + '%';
      return '<div class="rc"><div class="n">' + p[1] + '</div><div class="t">' + p[2] + '</div><div class="v num">' + val + '</div>' +
        '<div class="s"><span style="color:' + bcol(x.change_1w_bps) + '">' + bps(x.change_1w_bps) + (x.change_1w_bps != null ? ' 1w' : '') + '</span><span>as of ' + asof(x.date) + '</span></div><p>' + p[3] + '</p></div>';
    }).join('');
    var ffr = r.FFR, ffrTxt = ffr && typeof ffr.value === 'number' ? (typeof ffr.lower === 'number' ? ffr.lower.toFixed(2) + '–' : '') + ffr.value.toFixed(2) + '%' : '';
    if (cards) h += '<details class="fd"><summary><span class="fn">Fed policy and overnight funding rates</span>' +
      (ffrTxt ? '<span class="fs">Fed funds <b class="num">' + ffrTxt + '</b></span>' : '') + CHEV + '</summary>' +
      '<div class="in"><div class="rcard"><div class="rgrid">' + cards + '</div>' +
      '<p class="rsrc">Source: FRED. EFFR and SOFR are published by the Federal Reserve Bank of New York. This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis.</p></div></div></details>';
    return h;
  }
  function fillRates(host) { var box = host.querySelector('#p75rates'); if (box && RS) box.innerHTML = ratesHTML(RS); }
  function loadRates(host) {
    fetch(NEWS_API).then(function (r) { return r.json(); }).then(function (j) {
      var s = j && j.market_snapshot; if (!s || (!s.yields && !s.policy_rates)) return;
      RS = s; if (document.body.contains(host)) fillRates(host);
    }).catch(function () {});
  }

  // ---------- Dials (the same build as Pulse and the Tools speedometers) ----------
  // A 220° sweep, slim track, a coloured fill from the left end to the reading, tapered needle and hub.
  // Needles start at the left end and glide to the reading after a short pause (see sweep()).
  var DCX = 100, DCY = 96, DR = 80, DSWEEP = 220;
  function dPt(deg, r) { var a = deg * Math.PI / 180; return [(DCX + r * Math.sin(a)).toFixed(2), (DCY - r * Math.cos(a)).toFixed(2)]; }
  function dArc(d0, d1, r) {
    var a = dPt(d0, r), b = dPt(d1, r);
    return 'M' + a[0] + ',' + a[1] + ' A' + r + ',' + r + ' 0 ' + (Math.abs(d1 - d0) > 180 ? 1 : 0) + ' ' + (d1 > d0 ? 1 : 0) + ' ' + b[0] + ',' + b[1];
  }
  // o: { v, min, max, color, zones:[[from,to,color]], notch, labels:[[value,text,color]], big, aria }
  function dial(o) {
    var ang = function (v) { return -DSWEEP / 2 + (Math.max(o.min, Math.min(o.max, v)) - o.min) / (o.max - o.min) * DSWEEP; };
    var rest = o.rest != null ? o.rest : o.min, a0 = ang(rest), a1 = ang(o.v), sw = o.big ? 7 : 11, svg = '';
    svg += '<path d="' + dArc(-DSWEEP / 2, DSWEEP / 2, DR) + '" fill="none" stroke="' + (o.big ? '#2A2C31' : '#3A3D45') + '" stroke-width="' + sw + '" stroke-linecap="round"/>';
    (o.zones || []).forEach(function (z) {
      svg += '<path d="' + dArc(ang(z[0]), ang(z[1]), DR + sw / 2 + 4) + '" fill="none" stroke="' + z[2] + '" stroke-opacity=".55" stroke-width="2"/>';
    });
    if (o.notch != null) {
      var nq = ang(o.notch), n1 = dPt(nq, DR - sw / 2 - 5), n2 = dPt(nq, DR + sw / 2 + 6);
      svg += '<line x1="' + n1[0] + '" y1="' + n1[1] + '" x2="' + n2[0] + '" y2="' + n2[1] + '" stroke="#F2D27A" stroke-width="3" stroke-linecap="round"/>';
    }
    if (Math.abs(a1 - a0) > .5)
      svg += '<path class="p75f" pathLength="100" stroke-dasharray="100 200" d="' + dArc(Math.min(a0, a1), Math.max(a0, a1), DR) + '" fill="none" stroke="' + o.color + '" stroke-width="' + sw + '" stroke-linecap="round" style="filter:drop-shadow(0 0 5px ' + o.color + '66)"/>';
    if (o.big) {
      for (var t = 0; t <= 40; t++) {
        var d = -DSWEEP / 2 + DSWEEP * t / 40, maj = t % 10 === 0, p = dPt(d, DR - (maj ? 16 : 13)), q = dPt(d, DR - 9);
        svg += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="' + (maj ? '#8A8D93' : '#3A3C42') + '" stroke-width="' + (maj ? 1.6 : 1) + '"/>';
      }
    }
    (o.labels || []).forEach(function (l) {
      var d = ang(l[0]), p = dPt(d, DR + (o.big ? 20 : 24)), anc = Math.abs(d) > 95 ? 'middle' : d < -20 ? 'end' : d > 20 ? 'start' : 'middle';
      svg += '<text x="' + p[0] + '" y="' + p[1] + '" dy=".35em" text-anchor="' + anc + '" font-size="' + (o.big ? 12 : 17) + '" font-weight="700" fill="' + (l[2] || '#A9A396') + '" font-family="Manrope,sans-serif">' + l[1] + '</text>';
    });
    var len = o.big ? DR - 22 : DR - 26, nw = o.big ? 3.2 : 5, as = ang(o.min);
    svg += '<g class="p75n" data-a="' + a1.toFixed(1) + '" style="transform-origin:' + DCX + 'px ' + DCY + 'px;transform:rotate(' + as.toFixed(1) + 'deg)">' +
      '<path d="M' + (DCX - nw) + ',' + DCY + ' L' + DCX + ',' + (DCY - len) + ' L' + (DCX + nw) + ',' + DCY + ' Z" fill="#F4F1EA"/>' +
      '<line x1="' + DCX + '" y1="' + DCY + '" x2="' + DCX + '" y2="' + (DCY + (o.big ? 12 : 14)) + '" stroke="#F4F1EA" stroke-width="' + (o.big ? 3 : 4.5) + '" stroke-linecap="round"/></g>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="' + (o.big ? 8 : 11) + '" fill="#17181B" stroke="' + o.color + '" stroke-width="' + (o.big ? 2 : 3) + '"/>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="' + (o.big ? 2.6 : 3.6) + '" fill="#F4F1EA"/>';
    return '<svg viewBox="' + (o.big ? '-14 -12 228 128' : o.labels ? '-22 2 244 128' : '2 6 196 112') + '" role="img" aria-label="' + esc(o.aria || '') + '">' + svg + '</svg>';
  }

  // Where a reading sits in its own last ten years: the dial runs from the 10-year low to the 10-year high.
  // Colour says whether that is good or bad news: blue good, amber middling, red bad (gold when neither).
  function stats(ind) {
    var v = ind.series.map(function (p) { return p[1]; }), lo = Math.min.apply(null, v), hi = Math.max.apply(null, v), x = ind.latest.value;
    var pos = hi > lo ? (x - lo) / (hi - lo) : .5;
    var badness = ind.bad === 'up' ? pos : ind.bad === 'down' ? 1 - pos : null;
    return { lo: lo, hi: hi, pos: pos, col: badness == null ? GOLD : badness < .4 ? GOOD : badness < .7 ? MID : BAD };
  }
  function indDial(ind, big) {
    var s = stats(ind);
    return dial({ v: ind.latest.value, min: s.lo, max: s.hi, color: s.col, big: big,
      labels: big ? [[s.lo, fmt(s.lo, ind.dec)], [s.hi, fmt(s.hi, ind.dec)]] : null,
      aria: ind.name + ' ' + fmt(ind.latest.value, ind.dec) + ' ' + ind.unit + ', between its 10-year low of ' + fmt(s.lo, ind.dec) + ' and high of ' + fmt(s.hi, ind.dec) });
  }
  // How long since the reading was this high (or low)? Used for the Watch line.
  function extreme(ind) {
    if (!ind.bad) return null;
    var v = ind.series.map(function (p) { return p[1]; }), x = v[v.length - 1], up = ind.bad === 'up', k = v.length - 2;
    while (k >= 0 && (up ? v[k] < x : v[k] > x)) k--;
    var per = ind.freq === 'Q' ? 4 : 12, n = v.length - 1 - k;
    return { years: n / per, all: k < 0, word: up ? 'highest' : 'lowest' };
  }
  function yrs(e) { return e.all ? 'in ten years' : e.years >= 2 ? 'in ' + Math.floor(e.years) + ' years' : e.years >= 1 ? 'in a year' : 'in ' + Math.round(e.years * 12) + ' months'; }

  var LEAD = { inflation: 'cpi', growth: 'gdp', labor: 'unrate', rates: 't10', housing: 'starts' };
  var SHORT = { cpi: 'CPI', corecpi: 'Core CPI', ppi: 'PPI', corepce: 'Core PCE', gdp: 'GDP', indpro: 'Industry', retail: 'Retail', unrate: 'Jobless', payrolls: 'Payrolls', claims: 'Claims', fedfunds: 'Fed funds', t10: '10Y', t2s10s: '2s10s', starts: 'Starts' };
  function toneCol(t) { return t === 'good' ? GOOD : t === 'bad' ? BAD : FLAT; }
  function unitTag(ind) { var u = unitShort(ind.unit); return u === '%' ? '%' : u === 'pts' ? ' pts' : u === 'K' ? 'K' : ' ' + u; }
  function valHTML(ind) { return fmt(ind.latest.value, ind.dec) + '<small>' + esc(unitShort(ind.unit) === '%' ? '%' : unitShort(ind.unit)) + '</small>'; }
  function oddsCol(p) { return p < 20 ? GOOD : p < 40 ? MID : BAD; }

  var TABS;   // [{key, name, cat}]
  function tabsOf(d) {
    var t = [{ key: 'takeaway', name: 'Takeaway' }];
    d.categories.forEach(function (c) { t.push({ key: c.id, name: c.name, cat: c }); });
    if (d.curve && d.curve.series) t.push({ key: 'curve', name: 'Yield curve' });
    return t;
  }

  // ---------- The page ----------
  function head(d, by) {
    var asof = new Date(d.generated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
    var hl = d.indicators.filter(function (i) { return i.headline && i.id !== 'fedfunds' && i.id !== 't10'; });
    var top = '<div class="hd-t"><span class="eyebrow">Kinetics</span><h1>Economic Indicators</h1><span class="asof">Updated <b>' + asof + '</b> · every weekday from FRED</span></div>' +
      '<p class="lede">The numbers that move bonds. Each dial runs from the indicator’s 10-year low to its high; blue is good news for the economy, red is bad. Tap a dial or a tab for the detail.</p>' +
      '<div class="ov">' + hl.map(function (i) {
        var c = change(i), cat = d.categories.filter(function (x) { return x.items.indexOf(i.id) >= 0; })[0];
        return '<a class="og" href="#' + (cat ? cat.id : 'takeaway') + '" data-tab="' + (cat ? cat.id : 'takeaway') + '" data-open="' + i.id + '"><span class="k">' + esc(i.headline) + '</span><span class="ogb"><span class="gd">' + indDial(i, true) + '</span><span class="ogv">' +
          '<span class="v num" style="color:' + stats(i).col + '">' + valHTML(i) + '</span><span class="c num" style="color:' + c.col + '">' + c.txt + '<span>' + period(i.latest.period, i.freq) + '</span></span></span></span></a>';
      }).join('') + '</div>';
    var strip = '<button type="button" class="fold" data-unfold aria-label="Show the dials">' + hl.map(function (i) {
      return '<span class="fi"><small>' + esc(SHORT[i.id] || i.headline) + '</small><b class="num" style="color:' + stats(i).col + '">' + fmt(i.latest.value, i.dec) + '</b></span>';
    }).join('') + '<span class="fo"><span class="fo-t">Show dials</span><span class="fo-c" aria-hidden="true"></span></span></button>';
    return '<div class="top"><div>' + top + '</div></div><div class="fstrip"><div>' + strip + '</div></div>';
  }
  function tabsHTML(cur) {
    return '<nav class="tabs" role="tablist" aria-label="Economic Indicators views">' + TABS.map(function (t) {
      var on = t.key === cur, dot = t.cat && t.cat.status ? '<i style="background:' + toneCol(t.cat.tone) + '"></i>' : '';
      return '<a role="tab" class="tab' + (on ? ' on' : '') + '" href="#' + t.key + '" data-tab="' + t.key + '" aria-selected="' + on + '">' + dot + esc(t.name) + '</a>';
    }).join('') + '</nav>';
  }

  function takeaway(d, by) {
    var C = {}; d.categories.forEach(function (c) { C[c.id] = c; });
    var w = function (c, word) { return c && c.status ? '<span class="hl" style="color:' + toneCol(c.tone) + '">' + esc((word || c.status).toLowerCase()) + '</span>' : ''; };
    var n = function (id, lab) { var i = by[id]; return i ? lab + ' <span class="hl" style="color:' + stats(i).col + '">' + fmt(i.latest.value, i.dec) + unitTag(i).replace('K / yr', 'K') + '</span>' : ''; };
    var parts = [];
    if (C.inflation) parts.push('Inflation is ' + w(C.inflation) + ' (' + n('cpi', 'CPI') + ')');
    if (C.growth) parts.push('growth ' + w(C.growth) + ' (' + n('gdp', 'GDP') + ')');
    if (C.labor) parts.push('jobs ' + w(C.labor) + ' (' + n('unrate', 'unemployment') + ')');
    if (C.housing) parts.push('housing ' + w(C.housing));
    var s = parts.length ? parts.slice(0, -1).join(', ') + (parts.length > 1 ? ' and ' : '') + parts[parts.length - 1] + '. ' : '';
    var cv = d.curve;
    if (C.rates) s += 'Rates are ' + w(C.rates);
    if (cv && cv.month) s += (C.rates ? '; the' : 'The') + ' yield curve is <span class="hl" style="color:' + (cv.inverted ? BAD : GOOD) + '">' + (cv.inverted ? 'inverted' : 'positive') + '</span>, with recession odds of <span class="hl" style="color:' + oddsCol(cv.month.prob) + '">' + Math.round(cv.month.prob) + '%</span>.';
    else if (C.rates) s += '.';
    // Watch: the indicator furthest into bad territory, by how long since it was this bad
    var best = null;
    d.indicators.forEach(function (i) { var e = extreme(i); if (e && e.years >= 1 && (!best || e.years > best.e.years)) best = { i: i, e: e }; });
    var watch = best ? '<p class="tk-watch"><i aria-hidden="true"></i><span><b>Watch:</b> <span class="hl" style="color:' + BAD + '">' + esc(best.i.name) + '</span> at ' + fmt(best.i.latest.value, best.i.dec) + unitTag(best.i) + ' is its ' + best.e.word + ' ' + yrs(best.e) + '.</span></p>' : '';
    var cards = TABS.slice(1).map(function (t) {
      var dd, val, word, col, line;
      if (t.key === 'curve') {
        var p = cv.month.prob; col = oddsCol(p);
        dd = dial({ v: p, min: 0, max: 100, color: col, aria: 'Recession odds ' + Math.round(p) + '%' });
        val = Math.round(p) + '<small>%</small>'; word = 'recession odds'; line = '10Y minus 3M ' + (cv.latest.value > 0 ? '+' : '') + cv.latest.value.toFixed(2) + ' pts, ' + (cv.inverted ? 'inverted' : 'positive') + '.';
      } else {
        var c = t.cat, L = by[LEAD[c.id] || c.items[0]] || by[c.items[0]]; if (!L) return '';
        col = stats(L).col; dd = indDial(L, false); val = valHTML(L); word = c.status || ''; col = col;
        line = c.items.filter(function (id) { return id !== L.id && by[id]; }).map(function (id) { var i = by[id]; return (SHORT[id] || i.name) + ' <b class="num">' + fmt(i.latest.value, i.dec) + '</b>'; }).join(' · ') || esc(L.note);
        word = '<span style="color:' + toneCol(c.tone) + '">' + esc(word) + '</span> · ' + esc(SHORT[L.id] || L.name);
      }
      return '<a class="tk-c" href="#' + t.key + '" data-tab="' + t.key + '"><span class="tk-h"><b>' + esc(t.name) + '</b><span class="tk-go">See why ›</span></span>' +
        '<span class="tk-b"><span class="tk-d">' + dd + '</span><span class="tk-t"><b class="num" style="color:' + col + '">' + val + '</b><em>' + word + '</em></span></span>' +
        '<span class="tk-l">' + line + '</span></a>';
    }).join('');
    return '<div class="tk"><p class="tk-head">' + s + '</p>' + watch + '<div class="tk-grid">' + cards + '</div></div>';
  }

  function catView(c, by) {
    var items = c.items.filter(function (id) { return by[id]; });
    return '<div class="ch"><h2>' + esc(c.name) + '</h2>' + (c.status ? '<span class="pill" style="color:' + toneCol(c.tone) + '">' + esc(c.status) + '</span>' : '') +
      '<span class="hint"><i aria-hidden="true"></i>Tap a dial for its history</span></div>' +
      '<div class="ics">' + items.map(function (id) {
        var i = by[id], ch = change(i), s = stats(i);
        return '<button type="button" class="ic" data-i="' + id + '" aria-expanded="false" aria-controls="p75idet"><span class="ic-h"><b>' + esc(i.name) + '</b><small>' + period(i.latest.period, i.freq) + '</small></span>' +
          '<span class="ic-b"><span class="ic-d">' + indDial(i, false) + '</span><span class="ic-v"><b class="num" style="color:' + s.col + '">' + valHTML(i) + '</b>' +
          '<em class="num" style="color:' + ch.col + '">' + ch.txt + ' <span>vs prior</span></em><span class="num">10y ' + fmt(s.lo, i.dec) + ' – ' + fmt(s.hi, i.dec) + '</span></span></span></button>';
      }).join('') + '</div><div class="idet" id="p75idet" hidden></div>' +
      (c.id === 'rates' ? '<section class="rates" id="p75rates"></section>' : '');
  }

  function curveView(c) {
    var l = c.latest, pr = c.month.prob, e = c.episodes;
    var spread = dial({ v: l.value, min: -2, max: 4, rest: 0, notch: 0, color: l.value < 0 ? BAD : GOOD, labels: [[-2, '−2'], [4, '+4']], big: true,
      aria: '10-year minus 3-month spread ' + l.value.toFixed(2) + ' points' });
    var odds = dial({ v: pr, min: 0, max: 100, color: oddsCol(pr), labels: [[0, '0'], [100, '100']], big: true, zones: [[0, 20, GOOD], [20, 40, MID], [40, 100, BAD]],
      aria: 'Recession odds ' + Math.round(pr) + '% in the next 12 months' });
    var card = function (k, svg, v, col, sub) { return '<div class="og" style="cursor:default"><span class="k">' + k + '</span><span class="ogb"><span class="gd">' + svg + '</span><span class="ogv"><span class="v num" style="color:' + col + '">' + v + '</span><span class="c" style="white-space:normal;color:var(--muted);font-weight:500">' + sub + '</span></span></span></div>'; };
    return '<div class="ycd">' +
      card('10Y minus 3M', spread, (l.value > 0 ? '+' : '') + l.value.toFixed(2) + '<small>pts</small>', l.value < 0 ? BAD : GOOD, asof(l.date)) +
      card('Recession odds', odds, Math.round(pr) + '<small>%</small>', oddsCol(pr), 'next 12 months, NY Fed model') +
      '<div class="og" style="cursor:default;justify-content:center"><span class="k">Status</span><span class="v" style="margin:10px 0 4px;color:' + (c.inverted ? BAD : GOOD) + '">' + (c.inverted ? 'Inverted' : 'Positive') + '</span>' +
        '<span class="c" style="white-space:normal;text-align:center">' + (c.inverted ? 'short rates above long rates' : c.months_since_uninversion != null ? 'for ' + c.months_since_uninversion + ' months' : 'normal shape') + '</span></div></div>' +
      '<p class="ycread">' + esc(ycReading(c)) + '</p>' +
      '<div class="ychart chart" id="p75yc-chart"></div>' +
      '<details class="fd" style="margin-top:12px"><summary><span class="fn">Past inversions</span><span class="fs">' + e.filter(function (x) { return x.recession; }).length + ' of ' + e.length + ' led to recession</span>' + CHEV + '</summary><div class="in">' +
      '<table class="yct"><thead><tr><th>Curve inverted</th><th class="hs">Months</th><th>Turned positive</th><th>Recession began</th><th class="r">After turning positive</th></tr></thead><tbody>' +
      e.map(function (x) {
        return '<tr><td>' + ym(x.inverted) + '</td><td class="hs">' + x.months_inverted + '</td><td>' + (x.uninverted ? ym(x.uninverted) : 'still inverted') + '</td><td>' + (x.recession ? ym(x.recession) : 'none') + '</td>' +
          '<td class="r num">' + (x.lead_from_uninversion == null ? '–' : x.lead_from_uninversion < 0 ? (-x.lead_from_uninversion) + ' mo before' : x.lead_from_uninversion + ' mo') + '</td></tr>';
      }).join('') + '</tbody></table></div></details>' +
      '<p class="foot">Monthly average since ' + c.series[0][0].slice(0, 4) + '; red marks inverted stretches, gray bands are recessions; hover for the odds in any month. A handful of episodes is a small sample, and the 2020 recession was caused by the pandemic. Odds use the New York Fed’s published model, odds = N(−0.5333 − 0.6330 × spread), on the monthly average spread, so they can differ slightly from the NY Fed’s own figure. Recession dates: NBER via FRED.</p>';
  }

  var TAB = 'takeaway', FOLD = false, FROM_TK = false, RS = null;
  function curTab() { var h = location.hash.slice(1); return TABS && TABS.some(function (t) { return t.key === h; }) ? h : 'takeaway'; }
  function viewHTML(d, by) {
    var t = TABS.filter(function (x) { return x.key === TAB; })[0] || TABS[0];
    var back = FROM_TK && TAB !== 'takeaway' ? '<a class="tk-back" href="#takeaway" data-tab="takeaway"><span aria-hidden="true">←</span> Back to the takeaway</a>' : '';
    return back + (t.key === 'takeaway' ? takeaway(d, by) : t.key === 'curve' ? curveView(d.curve) : catView(t.cat, by));
  }
  function page(d) {
    var by = {}; d.indicators.forEach(function (i) { by[i.id] = i; });
    return '<div class="wrap">' + head(d, by) + tabsHTML(TAB) + '<div class="view">' + viewHTML(d, by) + '</div>' +
      '<p class="note foot">Dials run from each indicator’s 10-year low to its high. Changes compare the latest reading with the one before it; blue and red show good or bad news for the economy (for rates, red means up). Data: Federal Reserve Bank of St. Louis (FRED) and the agencies that publish each series. This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis. Not investment advice.</p></div>';
  }

  function sweep(root) {
    setTimeout(function () { requestAnimationFrame(function () {
      root.classList.add('go');
      root.querySelectorAll('.p75n').forEach(function (n) { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; });
    }); }, 350);
  }
  function hdrH() { var tb = document.querySelector('.top-blocks--sticky'); return tb ? Math.round(tb.getBoundingClientRect().height) : 0; }

  function drawView(host) {
    var by = {}; D.indicators.forEach(function (i) { by[i.id] = i; });
    var v = host.querySelector('.view'); v.classList.remove('go'); v.innerHTML = viewHTML(D, by);
    host.querySelectorAll('.tabs .tab').forEach(function (a) { var on = a.getAttribute('data-tab') === TAB; a.classList.toggle('on', on); a.setAttribute('aria-selected', on); });
    if (TAB === 'curve') drawYc(host);
    if (TAB === 'rates') { if (RS) fillRates(host); else loadRates(host); }
    sweep(v);
  }
  function setFold(host, on) { FOLD = on; host.classList.toggle('folded', on); }

  function openInd(host, id) {
    var by = {}; D.indicators.forEach(function (i) { by[i.id] = i; });
    var b = host.querySelector('.ic[data-i="' + id + '"]'), box = host.querySelector('#p75idet'); if (!b || !box) return;
    var was = b.getAttribute('aria-expanded') === 'true';
    host.querySelectorAll('.ic').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
    if (was) { box.hidden = true; return; }
    b.setAttribute('aria-expanded', 'true'); box.hidden = false;
    var i = by[id];
    box.innerHTML = '<h3>' + esc(i.name) + '<span>' + esc(i.unit) + '</span><button type="button" class="x" aria-label="Close">×</button></h3>' + detail(i, 60);
    wireChart(box);
    var r = box.getBoundingClientRect();
    if (r.bottom > window.innerHeight || r.top < hdrH()) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function wire(host) {
    host.addEventListener('click', function (e) {
      if (e.target.closest('[data-unfold]')) { setFold(host, false); window.scrollTo({ top: Math.max(0, host.getBoundingClientRect().top + window.pageYOffset - hdrH() - 8), behavior: 'smooth' }); return; }
      var rb = e.target.closest('.rb');
      if (rb) { var p = rb.getAttribute('data-r').split(':'), box = host.querySelector('#p75idet'), by = {}; D.indicators.forEach(function (i) { by[i.id] = i; });
        box.querySelectorAll('.ranges,.chart,.foot').forEach(function (n) { n.remove(); }); box.insertAdjacentHTML('beforeend', detail(by[p[0]], +p[1])); wireChart(box); return; }
      if (e.target.closest('.idet .x')) { host.querySelectorAll('.ic').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); }); host.querySelector('#p75idet').hidden = true; return; }
      var ic = e.target.closest('.ic'); if (ic) { openInd(host, ic.getAttribute('data-i')); return; }
      var a = e.target.closest('a[data-tab]'); if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-tab'), open = a.getAttribute('data-open');
      FROM_TK = !!a.closest('.tk-c');
      TAB = k;
      if (k === 'takeaway') setFold(host, false); else if (!FOLD) setFold(host, true);
      history.replaceState(history.state, '', location.pathname + location.search + (k === 'takeaway' ? '' : '#' + k));
      var bar = host.querySelector('.tabs'), barTop = bar.getBoundingClientRect().top + window.pageYOffset, stuck = window.pageYOffset > barTop - hdrH() - 2;
      drawView(host);
      if (stuck) window.scrollTo({ top: host.querySelector('.tabs').getBoundingClientRect().top + window.pageYOffset - hdrH() });
      var on = host.querySelector('.tab.on');
      if (on) { var l = on.offsetLeft - 16, r = on.offsetLeft + on.offsetWidth + 16; if (l < bar.scrollLeft) bar.scrollLeft = l; else if (r > bar.scrollLeft + bar.clientWidth) bar.scrollLeft = r - bar.clientWidth; }
      if (open) setTimeout(function () { openInd(host, open); }, 30);
    });
    // Rates panels: one open at a time (details' toggle event doesn't bubble, so listen in the capture phase)
    host.addEventListener('toggle', function (e) { if (e.target.matches && e.target.matches('details.fd') && e.target.open) host.querySelectorAll('details.fd[open]').forEach(function (x) { if (x !== e.target) x.open = false; }); }, true);
  }

  // On the Takeaway, the dials fold away as soon as the reader scrolls down so the content rises into the space;
  // back at the top they return. Listens on the document so it works whichever element scrolls the page.
  var SCROLL_TICK = false, SCROLL_HOLD = 0, SCROLL_SC = null;
  document.addEventListener('scroll', function (e) {
    var t = e.target, sc = t && t.nodeType === 1 ? t : (document.scrollingElement || document.documentElement);
    if (sc.scrollHeight < sc.clientHeight + 40) return;
    SCROLL_SC = sc; if (SCROLL_TICK) return; SCROLL_TICK = true;
    requestAnimationFrame(function () {
      SCROLL_TICK = false;
      var host = document.querySelector('.p75ind'), strip = host && host.querySelector('.fstrip'), top = host && host.querySelector('.top');
      var y = sc === document.scrollingElement || sc === document.documentElement || sc === document.body ? Math.max(window.pageYOffset, sc.scrollTop) : sc.scrollTop;
      var dy = y - (sc.__p75iy == null ? 0 : sc.__p75iy); sc.__p75iy = y;
      if (!dy || !strip || !top || TAB !== 'takeaway' || Date.now() < SCROLL_HOLD) return;
      if (dy > 0 && !FOLD && y > 6) {
        if (sc.scrollHeight - top.offsetHeight < sc.clientHeight + 80) return;   // a page that would stop scrolling once folded would bounce
        setFold(host, true); SCROLL_HOLD = Date.now() + 600;
      } else if (dy < 0 && FOLD && strip.getBoundingClientRect().top >= hdrH() - 1) { setFold(host, false); SCROLL_HOLD = Date.now() + 600; }
    });
  }, { passive: true, capture: true });

  var loading = false, waiting = [];
  function load(cb) {
    // Queue every caller: the site can rebuild the page while data is loading, and the redrawn page must hear back too
    if (D) return cb(D);
    waiting.push(cb); if (loading) return; loading = true;
    fetch(DATA).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { D = j; })
      .catch(function () { D = null; }).then(function () { loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(D); }); });
  }

  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75ind')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75ind';
    host.innerHTML = '<div class="wrap"><div class="hd-t"><span class="eyebrow">Kinetics</span><h1>Economic Indicators</h1></div><div class="load">Loading the latest readings…</div></div>';
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.indicators) { host.querySelector('.load').textContent = 'Indicator data is unavailable right now. Please try again shortly.'; return; }
      TABS = tabsOf(j); TAB = curTab(); FOLD = TAB !== 'takeaway'; FROM_TK = false;
      host.innerHTML = page(j); host.classList.toggle('folded', FOLD);
      host.style.setProperty('--tabs-top', hdrH() + 'px');
      wire(host); sweep(host.querySelector('.top')); sweep(host.querySelector('.view'));
      if (TAB === 'curve') drawYc(host);
      if (TAB === 'rates') loadRates(host);
      var lw = host.clientWidth, tt; window.addEventListener('resize', function () { clearTimeout(tt); tt = setTimeout(function () { if (document.body.contains(host) && host.clientWidth !== lw) { lw = host.clientWidth; host.style.setProperty('--tabs-top', hdrH() + 'px'); if (TAB === 'curve') drawYc(host); } }, 150); });
    });
  }
  function clear() { var h = document.querySelector('.p75ind'); if (h) h.remove(); }
  window.addEventListener('hashchange', function () { var host = document.querySelector('.p75ind'); if (host && D && TABS) { var k = curTab(); if (k !== TAB) { TAB = k; setFold(host, k !== 'takeaway'); drawView(host); } } });

  window.P75IND = { render: render, clear: clear };
})();
