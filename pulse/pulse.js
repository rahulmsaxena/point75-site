/* Point75 - Bond Pulse page (/pulse). Loaded by p75.js; data from news.point75.io/api/pulse.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75PULSE) return;
  var API = 'https://news.point75.io/api/pulse';
  var BULL = '#3D8BFF', BEAR = '#E5484D', NEUT = '#9AA0A6';

  // The overview shows the two gauges and one card per section; a card opens that section on its own (/pulse#auctions)
  var SECTIONS = [
    { key: 'why', title: 'Why the needles are where they are', blurb: 'Every signal behind the two gauges, with the rule it follows. Nothing hidden in a black box.', cta: 'See every signal' },
    { key: 'auctions', title: 'Who’s buying the debt?', blurb: 'Each Treasury auction graded against the last six of the same maturity, and what’s coming up.', cta: 'See the auctions' },
    { key: 'plumbing', title: 'The pros and the plumbing', blurb: 'What big money is doing in futures, dealer balance sheets, funding, rates swings and inflation expectations.', cta: 'Open the gauges' },
    { key: 'wire', title: 'Live wire', blurb: 'The latest bond, central-bank and macro headlines, linking to the source.', cta: 'Read the headlines' }
  ];

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
    '.p75pulse .dtlink{display:block;margin-top:40px;background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:14px;padding:18px 20px;color:var(--soft);text-decoration:none;font-size:14.5px;line-height:1.5}' +
    '.p75pulse .dtlink:hover{border-color:var(--gold)}' +
    '.p75pulse .dtlink span{color:var(--gold);font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-right:10px}' +
    '.p75pulse .dtlink b{color:#fff;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:19px;margin-right:8px}' +
    '.p75pulse .wire{border:1px dashed var(--line);border-radius:14px;padding:20px;color:var(--soft);font-size:14px}' +
    '.p75pulse .wire.on{border:1px solid var(--line);padding:6px 20px;background:var(--panel)}' +
    '.p75pulse .wire a.h{display:block;padding:13px 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--cream)}' +
    '.p75pulse .wire a.h:last-of-type{border-bottom:0}.p75pulse .wire a.h b{display:block;font-size:15px;font-weight:600;line-height:1.4}' +
    '.p75pulse .wire a.h:hover b{color:var(--gold)}.p75pulse .wire a.h span{display:block;font-size:12.5px;color:var(--muted);margin-top:3px}' +
    '.p75pulse .wire .more{display:inline-block;margin:10px 0 8px;color:var(--gold);font-weight:700;text-decoration:none;font-size:14px}' +
    // overview cards (same look as the Bond Summary page) and the one-section view
    '.p75pulse .secs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:22px}' +
    '.p75pulse a.sec{display:flex;flex-direction:column;gap:10px;min-height:210px;padding:26px 26px 22px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);' +
      'border-radius:4px;color:var(--cream);text-decoration:none;transition:border-color .15s,background .15s}' +
    '.p75pulse a.sec:hover,.p75pulse a.sec:focus-visible{border-color:var(--gold);background:var(--panel2);outline:none}' +
    '.p75pulse a.sec .n{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:15px;color:var(--gold)}' +
    '.p75pulse a.sec .nm{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:26px;line-height:1.15;color:#fff}' +
    '.p75pulse a.sec .bl{font-size:14.5px;line-height:1.6;color:var(--soft)}' +
    '.p75pulse a.sec .now{margin-top:auto;font-size:13.5px;line-height:1.5;color:var(--cream);border-top:1px solid var(--line);padding-top:12px}' +
    '.p75pulse a.sec .now b{color:var(--gold);font-weight:800;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;margin-right:8px}' +
    '.p75pulse a.sec .go{font-size:14.5px;font-weight:700;color:var(--gold)}' +
    '.p75pulse .crumb{font-size:13.5px;color:#8D887E;margin:0 0 18px}.p75pulse .crumb a{color:var(--gold);text-decoration:none;font-weight:700}' +
    '.p75pulse .strip{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 18px;margin:18px 0 6px;font-size:14px;color:var(--soft)}' +
    '.p75pulse .strip b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:20px;margin-right:6px}' +
    '.p75pulse .strip a{margin-left:auto;color:var(--gold);font-weight:700;text-decoration:none}' +
    '.p75pulse .pn{display:flex;justify-content:space-between;gap:12px;margin-top:40px;border-top:1px solid var(--line);padding-top:16px}' +
    '.p75pulse .pn a{color:var(--soft);font-weight:600;text-decoration:none;font-size:15px}.p75pulse .pn a.nx{color:var(--gold);font-weight:800}' +
    '.p75pulse .view > h2:first-child{margin-top:28px}' +
    '@media (max-width:700px){.p75pulse .secs{grid-template-columns:1fr;gap:14px}.p75pulse a.sec{min-height:0;padding:22px 20px}.p75pulse a.sec .nm{font-size:23px}.p75pulse .strip a{margin-left:0}}' +
    // cockpit (the #why view): one instrument per signal, plus an info screen that explains the one you tap
    '.p75pulse .ck{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start;margin-top:8px}' +
    '.p75pulse .ck-main{flex:999 1 600px;min-width:0;display:flex;flex-direction:column;gap:16px;padding:20px;border-radius:16px;' +
      'background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 18px 40px rgba(0,0,0,.45)}' +
    '.p75pulse .ck-h{color:var(--gold);font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}' +
    '.p75pulse .ck-h2{color:var(--muted);font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-top:4px}' +
    '.p75pulse .ck-bb{display:flex;flex-wrap:wrap;gap:16px}' +
    '.p75pulse .ck-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:14px}' +
    '.p75pulse .ck-i{display:flex;flex-direction:column;width:100%;padding:10px;border-radius:14px;cursor:pointer;font:inherit;color:inherit;text-align:left;' +
      'background:#1E2024;border:2px solid #8C7424;box-shadow:0 0 10px rgba(201,162,39,.10);transition:border-color .15s,box-shadow .15s,background .15s}' +
    '.p75pulse .ck-i:hover{border-color:var(--gold)}' +
    '.p75pulse .ck-i:focus-visible{outline:3px solid #F2D27A;outline-offset:3px}' +
    '.p75pulse .ck-i[aria-pressed="true"]{background:#2A2C31;border-color:#F2D27A;box-shadow:0 0 0 4px rgba(242,210,122,.18),0 0 22px rgba(242,210,122,.22)}' +
    '.p75pulse .ck-i svg{display:block;width:100%;max-width:220px;height:auto;margin:0 auto}' +
    '.p75pulse .ck-att{flex:0 1 280px;min-width:220px;width:auto}.p75pulse .ck-att svg{max-width:260px}' +
    '.p75pulse .ck-nm{font-size:14px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#fff;line-height:1.2;margin-top:8px;display:flex;justify-content:space-between;align-items:center;gap:8px}' +
    '.p75pulse .ck-v{display:flex;align-items:baseline;gap:6px;margin-top:6px}' +
    '.p75pulse .ck-v b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:32px;line-height:1;font-variant-numeric:tabular-nums}' +
    '.p75pulse .ck-v small{color:var(--muted);font-size:13px}' +
    '.p75pulse .ck-chip{margin-left:auto;padding:3px 9px;border-radius:99px;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#0b0c0e;white-space:nowrap}' +
    '.p75pulse .ck-w{color:var(--muted);font-size:12px;margin-top:4px}' +
    '.p75pulse .ck-lamp{flex:0 0 auto;width:11px;height:11px;border-radius:50%}' +
    '.p75pulse .ck-count{flex:1 1 280px;min-width:0;display:flex;flex-direction:column;gap:14px;padding:18px;border-radius:14px;background:#151619;border:2px solid #8C7424}' +
    '.p75pulse .ck-tally{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}' +
    '.p75pulse .ck-tally div{display:flex;flex-direction:column;align-items:center;gap:3px;padding:12px 4px;border-radius:10px;border:2px solid}' +
    '.p75pulse .ck-tally b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:38px;line-height:1}' +
    '.p75pulse .ck-tally span{font-size:13px;font-weight:800;letter-spacing:.12em}' +
    '.p75pulse .ck-line{margin:0;font-size:17px;line-height:1.6;color:#fff}' +
    '.p75pulse .ck-how{padding:12px 14px;border-radius:10px;background:#1E2024;font-size:15px;line-height:1.6;color:var(--soft)}' +
    '.p75pulse .ck-how p{margin:0}.p75pulse .ck-how p + p{margin-top:6px}' +
    '.p75pulse .ck-how .k{display:block;color:var(--gold);font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}' +
    '.p75pulse .ck-mfdw{flex:1 1 300px;min-width:0;position:sticky;top:var(--ck-top,16px);max-height:calc(100vh - var(--ck-top,16px) - 16px);overflow-y:auto;padding:12px;border-radius:16px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold)}' +
    '.p75pulse .ck-mfd{display:flex;flex-direction:column;gap:16px;min-height:380px;padding:20px;border-radius:10px;background:#050807;border:2px solid #0F1512;' +
      'box-shadow:inset 0 0 40px rgba(60,220,120,.06);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#7CE0A0}' +
    '.p75pulse .ck-mfd .tp{display:flex;justify-content:space-between;gap:8px;font-size:11px;letter-spacing:.14em;color:#4E9C6C;text-transform:uppercase}' +
    '.p75pulse .ck-mfd .tt{font-size:21px;font-weight:700;color:#A9F0C2;text-transform:uppercase;line-height:1.2}' +
    '.p75pulse .ck-mfd .st{font-size:13px;color:#7CE0A0;margin-top:4px}' +
    '.p75pulse .ck-mfd .k{font-size:11px;letter-spacing:.14em;color:#E8C766;margin-bottom:5px}' +
    '.p75pulse .ck-mfd .x{font-family:Manrope,system-ui,sans-serif;font-size:16px;line-height:1.6;color:#D6F7E2}' +
    '.p75pulse .ck-mfd .gl{font-family:Manrope,system-ui,sans-serif;font-size:13px;color:#8FCBA6}' +
    '.p75pulse .ck-mfd button{align-self:flex-start;min-height:44px;padding:0 16px;border-radius:6px;border:1px solid var(--gold);background:#0B1410;color:#E8C766;' +
      'font:inherit;font-size:13px;letter-spacing:.1em;cursor:pointer}' +
    '.p75pulse .ck-mfd .bk{display:none}' +
    '.p75pulse .ck-n,.p75pulse .ck-hz{transition:transform 1.8s cubic-bezier(.25,1.4,.5,1)}' +
    '.p75pulse .ck-snap{transition:none!important}' +
    '@media (prefers-reduced-motion:reduce){.p75pulse .ck-n,.p75pulse .ck-hz{transition:none}}' +
    '@media (max-width:880px){.p75pulse .ck-mfdw{position:static;max-height:none;overflow:visible}.p75pulse .ck-mfd{min-height:0}.p75pulse .ck-mfd .bk{display:inline-block}}' +
    '@media (max-width:560px){.p75pulse .ck-main{padding:14px}.p75pulse .ck-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
      '.p75pulse .ck-v b{font-size:26px}.p75pulse .ck-nm{font-size:12.5px}.p75pulse .ck-att{flex-basis:100%}}' +
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

  // ---------- Cockpit (the #why view) ----------
  // Each signal from the feed becomes an instrument. Tapping one swings its needle to today's reading and the
  // info screen explains it. "What it means" and "why you might care" are plain-English and fixed per signal;
  // "right now" is the feed's own live sentence, so the words always match the numbers.
  var CK_TEXT = {
    bull: { what: 'Which way the bond market is leaning. Each signal below casts a vote, and the score is their average. Bullish means bond prices rising and interest rates falling; bearish means the opposite. Read it like a plane’s attitude: nose up is bullish, nose down is bearish.',
      care: 'A bearish bond market usually means mortgage and loan rates are drifting higher. A bullish one means they may be heading lower.' },
    stress: { what: 'How much strain the bond market is under, combining the readings below by their weights. 0 is calm, 100 is panic.',
      care: 'When stress runs high, borrowing costs for mortgages, car loans and businesses get less predictable, and bond funds can swing more.' },
    v_auctions: { what: 'How eagerly investors buy new government bonds at Treasury auctions. Strong demand is bullish; weak demand is bearish.',
      care: 'When the government can borrow cheaply, rates on mortgages and loans tend to follow it down.' },
    v_positioning: { what: 'What long-term investors such as pension and mutual funds are doing in Treasury futures. Steady buying from this patient money is bullish.',
      care: 'This money moves slowly, so when it turns, the trend usually lasts.' },
    v_dealers: { what: 'How many Treasuries the big bank dealers are holding. Dealers piling up bonds they can’t pass on to end buyers is bearish.',
      care: 'Dealers with room to spare can absorb selling, which keeps markets calm.' },
    v_trend: { what: 'Whether the 10-year interest rate is trending up or down. Rising yields mean falling bond prices, which is bearish.',
      care: 'The 10-year yield is the anchor for most U.S. mortgage rates.' },
    v_inflation: { what: 'How much inflation the bond market expects over the next 10 years. Rising expectations are bearish for bonds.',
      care: 'Higher expected inflation makes lenders demand more interest to protect their money.' },
    v_term_premium: { what: 'The extra interest investors demand to lock money into a 10-year bond. When it rises, investors are wary of lending long, which is bearish.',
      care: 'A rising term premium pushes long-term borrowing costs up even when the Fed does nothing.' },
    s_rates_vol: { what: 'How wildly interest rates swing from day to day. Think of it as turbulence: the higher the needle, the bumpier the ride.',
      care: 'Bumpy rates make lenders cautious, so mortgage quotes jump around and bond funds swing more than usual.' },
    s_term_premium: { what: 'The extra interest investors demand for holding a 10-year bond. A high premium means they want more pay for the risk of lending for a long time.',
      care: 'A high term premium keeps long-term rates, including mortgage rates, elevated.' },
    s_funding: { what: 'How hard it is for banks to borrow cash overnight. Like oil pressure in an engine, it shows whether money is flowing where it’s needed.',
      care: 'Smooth funding means banks keep lending. Trouble here is often when the Federal Reserve steps in.' },
    s_dealers: { what: 'How loaded the big bank dealers are with Treasuries. Full dealers have less room to absorb selling, which makes markets jumpy.',
      care: 'Dealers with spare room keep trading smooth in the background.' },
    s_auctions: { what: 'How many recent Treasury auctions drew weak demand from buyers.',
      care: 'If the government has to pay more to borrow, rates on everyday loans often follow.' }
  };
  var CK_STRESS_WORD = function (p) { return p < 30 ? 'Calm' : p < 55 ? 'Moderate' : p < 75 ? 'Elevated' : 'High'; };
  var CK_VOTE = { '1': ['▲ Bull', BULL], '0': ['• Hold', NEUT], '-1': ['▼ Bear', BEAR] };
  var CK_ITEMS = {};

  function ckBezel() {
    return '<rect x="4" y="4" width="192" height="192" rx="18" fill="#17181B" stroke="#33353B" stroke-width="2"/>' +
      '<circle cx="18" cy="18" r="4" fill="#33353B"/><circle cx="182" cy="18" r="4" fill="#33353B"/>' +
      '<circle cx="18" cy="182" r="4" fill="#33353B"/><circle cx="182" cy="182" r="4" fill="#33353B"/>' +
      '<circle cx="100" cy="100" r="90" fill="url(#p75ckBezel)"/>';
  }
  var CK_NEEDLE = '<path d="M100 116 L97 104 L99 32 L100 26 L101 32 L103 104 Z" fill="#F4F1EA"/><path d="M99 32 L100 26 L101 32 L101 46 L99 46 Z" fill="#FF7A3D"/>';
  var CK_CAP = '<circle cx="100" cy="100" r="9" fill="url(#p75ckCap)" stroke="#05060A" stroke-width="1.5"/><ellipse cx="82" cy="58" rx="58" ry="30" fill="#fff" opacity=".05"/>';
  function ckPt(r, deg) { var a = deg * Math.PI / 180; return [(100 + r * Math.sin(a)).toFixed(2), (100 - r * Math.cos(a)).toFixed(2)]; }
  function ckArc(r, d0, d1, col, w) {
    var a = ckPt(r, d0), b = ckPt(r, d1), large = Math.abs(d1 - d0) > 180 ? 1 : 0, sweep = d1 > d0 ? 1 : 0;
    return '<path d="M' + a[0] + ' ' + a[1] + ' A' + r + ' ' + r + ' 0 ' + large + ' ' + sweep + ' ' + b[0] + ' ' + b[1] + '" fill="none" stroke="' + col + '" stroke-width="' + w + '"/>';
  }
  function ckTicks(d0, d1, step, majorEvery) {
    var s = '';
    for (var i = 0, d = d0; d <= d1 + .01; d += step, i++) {
      var maj = i % majorEvery === 0, p = ckPt(maj ? 66 : 71, d), q = ckPt(78, d);
      s += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="#E4DED1" stroke-width="' + (maj ? 2.4 : 1.1) + '"/>';
    }
    return s;
  }
  function ckLabel(x, y, t, size, col) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + (size || 16) + '" font-weight="800" font-family="Manrope,sans-serif" fill="' + (col || '#fff') + '">' + t + '</text>';
  }

  // Stress dial: 0 at lower-left, 100 at lower-right (270° sweep), banded like the overview gauge
  var ckStressAng = function (v) { return -135 + Math.max(0, Math.min(100, v)) * 2.7; };
  function ckStressDial(code, value) {
    var bands = [[0, 30, '#2BD17E'], [30, 55, '#B8D43A'], [55, 75, '#F2A33A'], [75, 100, '#FF4D4D']], z = '';
    bands.forEach(function (b, i) { z += ckArc(84, ckStressAng(b[0] + (i ? .5 : 0)), ckStressAng(b[1] - (i < 3 ? .5 : 0)), b[2], 5); });
    var nums = [0, 20, 40, 60, 80, 100].map(function (n) { var p = ckPt(53, ckStressAng(n)); return ckLabel(p[0], (+p[1] + 5.5).toFixed(2), n, 15); }).join('');
    var col = stressColor(value);
    return '<circle cx="100" cy="100" r="84" fill="url(#p75ckDial)" stroke="#05060A" stroke-width="2"/>' + z + ckTicks(-135, 135, 13.5, 4) + nums +
      ckLabel(100, 78, esc(code), 11, '#C2BCAF') +
      '<rect x="70" y="126" width="60" height="30" rx="4" fill="#05060A" stroke="#44474E"/>' +
      '<text x="100" y="148" text-anchor="middle" font-size="21" font-weight="700" font-family="ui-monospace,Menlo,Consolas,monospace" fill="' + col + '">' + Math.round(value) + '</text>';
  }
  // Vote dial (like a vertical-speed indicator): 0 at 9 o'clock, +1 up into the blue, −1 down into the red
  function ckVoteDial() {
    return '<circle cx="100" cy="100" r="84" fill="url(#p75ckDial)" stroke="#05060A" stroke-width="2"/>' +
      ckArc(84, -66, 80, BULL, 6) + ckArc(84, -114, -66, '#6B6F76', 6) + ckArc(84, -114, -260, BEAR, 6) +
      ckTicks(-260, 80, 17, 5) +
      ckLabel(44, 106, '0', 18) + ckLabel(111, 54, '+1', 18) + ckLabel(111, 160, '−1', 18) +
      ckLabel(130, 79, 'BULL ▲', 13, BULL) + ckLabel(130, 131, 'BEAR ▼', 13, BEAR);
  }
  function ckAttitude() {
    return '<g clip-path="url(#p75ckClip)"><g class="ck-hz">' +
      '<rect x="-60" y="-220" width="320" height="320" fill="url(#p75ckSky)"/><rect x="-60" y="100" width="320" height="320" fill="url(#p75ckGround)"/>' +
      '<line x1="-60" y1="100" x2="260" y2="100" stroke="#fff" stroke-width="2.5"/>' +
      '<path d="M85 80H115M75 60H125M85 120H115M75 140H125" stroke="#fff" stroke-width="2"/>' +
      ckLabel(146, 64, '+80', 13) + ckLabel(136, 84, '+40', 13) + ckLabel(136, 124, '−40', 13) + ckLabel(146, 144, '−80', 13) +
      ckLabel(100, 42, 'BULL', 16) + ckLabel(100, 170, 'BEAR', 16) +
      '</g></g><circle cx="100" cy="100" r="80" fill="none" stroke="#05060A" stroke-width="3"/>' +
      '<path d="M100 22 L94 33 H106 Z" fill="#FF9F1C"/>' +
      '<path d="M56 100 H84 L91 109M144 100 H116 L109 109" fill="none" stroke="#FF9F1C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="100" cy="100" r="4.5" fill="#FF9F1C"/><ellipse cx="82" cy="58" rx="58" ry="30" fill="#fff" opacity=".06"/>';
  }
  var CK_DEFS = '<svg width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' +
    '<radialGradient id="p75ckDial" cx="50%" cy="40%" r="65%"><stop offset="0%" stop-color="#202328"/><stop offset="100%" stop-color="#0B0C0F"/></radialGradient>' +
    '<linearGradient id="p75ckBezel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4A4D55"/><stop offset="50%" stop-color="#2A2C32"/><stop offset="100%" stop-color="#15161A"/></linearGradient>' +
    '<radialGradient id="p75ckCap" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#8A8F98"/><stop offset="100%" stop-color="#2A2C32"/></radialGradient>' +
    '<clipPath id="p75ckClip"><circle cx="100" cy="100" r="80"/></clipPath>' +
    '<linearGradient id="p75ckSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1B4F86"/><stop offset="100%" stop-color="#3D8BD1"/></linearGradient>' +
    '<linearGradient id="p75ckGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7A4E26"/><stop offset="100%" stop-color="#4A2E14"/></linearGradient>' +
    '</defs></svg>';

  function ckButton(key, aria, svgInner, mover, label, extraClass) {
    return '<button type="button" class="ck-i' + (extraClass ? ' ' + extraClass : '') + '" data-ck="' + key + '" aria-pressed="false" aria-label="' + esc(aria).replace(/"/g, '&quot;') + '">' +
      '<svg viewBox="0 0 200 200" aria-hidden="true">' + ckBezel() + svgInner + (mover === 'needle' ? '<g class="ck-n">' + CK_NEEDLE + '</g>' + CK_CAP : '') + '</svg>' + label + '</button>';
  }
  function signedInt(n) { return (n > 0 ? '+' : n < 0 ? '−' : '') + Math.abs(n); }

  function cockpit(b, s) {
    CK_ITEMS = {};
    var votes = b.votes || [], comps = s.components || [];
    var nb = 0, nr = 0, nh = 0, bulls = [], bears = [];
    votes.forEach(function (v) {
      if (v.vote > 0) { nb++; bulls.push(v.name.toLowerCase()); } else if (v.vote < 0) { nr++; bears.push(v.name.toLowerCase()); } else nh++;
    });
    var list = function (a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; };
    var score = b.score != null ? b.score : 0, word = esc(b.label || '');
    var line = votes.length ? nh + ' of ' + votes.length + ' signals say Hold. ' +
      (nr ? nr + ' say Bear: ' + list(bears) + '. ' : 'None say Bear. ') + (nb ? nb + ' say Bull: ' + list(bulls) + '. ' : 'None say Bull. ') +
      'That adds up to a score of ' + signedInt(score) + (b.label ? ', ' + b.label.toLowerCase() : '') + '.' : '';
    var bc = bullColor(score);

    CK_ITEMS.bull = { mover: 'horizon', target: score, name: 'Bull / bear score', sub: 'Now ' + signedInt(score) + (b.label ? ' · ' + b.label.toLowerCase() : ''),
      what: CK_TEXT.bull.what, now: line, care: CK_TEXT.bull.care };
    var h = CK_DEFS + '<div class="ck"><div class="ck-main">' +
      '<div class="ck-h">Bull / bear vote</div><div class="ck-bb">' +
      ckButton('bull', 'Bull / bear score ' + signedInt(score) + ', ' + (b.label || '') + '. Show what it means.', ckAttitude(), 'horizon',
        '<div class="ck-nm">Bull / bear score</div><div class="ck-v"><b style="color:' + bc + '">' + signedInt(score) + '</b><span class="ck-chip" style="background:' + bc + '">' + word + '</span></div>', 'ck-att') +
      '<div class="ck-count"><div class="ck-nm" style="margin:0">Vote count</div><div class="ck-tally">' +
        '<div style="background:' + BULL + '1f;border-color:' + BULL + '"><b style="color:' + BULL + '">' + nb + '</b><span style="color:' + BULL + '">▲ BULL</span></div>' +
        '<div style="background:#9AA0A61a;border-color:' + NEUT + '"><b style="color:#E4DED1">' + nh + '</b><span style="color:#E4DED1">• HOLD</span></div>' +
        '<div style="background:' + BEAR + '1f;border-color:' + BEAR + '"><b style="color:' + BEAR + '">' + nr + '</b><span style="color:' + BEAR + '">▼ BEAR</span></div>' +
      '</div><p class="ck-line">' + esc(line) + '</p>' +
      '<div class="ck-how"><span class="k">How the vote works</span><p>Each signal casts one vote: <b style="color:' + BULL + '">Bull +1</b>, <b style="color:#E4DED1">Hold 0</b> or <b style="color:' + BEAR + '">Bear −1</b>. The score is the average, times 100.</p>' +
        '<p>Bull means bond prices up and interest rates down. Bear means the opposite.</p></div></div></div>' +
      '<div class="ck-h2">The ' + (votes.length === 6 ? 'six' : votes.length) + ' voters · tap any instrument</div><div class="ck-grid">';

    votes.forEach(function (v) {
      var key = 'v_' + v.key, t = CK_TEXT[key] || {}, c = CK_VOTE[String(Math.max(-1, Math.min(1, v.vote)))];
      var verdict = v.vote > 0 ? ' That counts as a Bull vote.' : v.vote < 0 ? ' That counts as a Bear vote.' : ' That’s not a big enough move to count either way, so it votes Hold.';
      CK_ITEMS[key] = { mover: 'vote', target: v.vote * 60, name: v.name, sub: 'Votes ' + c[0].slice(2) + ' (' + signedInt(v.vote) + ')',
        what: t.what || '', now: (v.why || '') + verdict, care: t.care || '' };
      h += ckButton(key, v.name + ': votes ' + c[0].slice(2) + '. Show what it means.', ckVoteDial(), 'needle',
        '<div class="ck-nm">' + esc(v.name) + '</div><div class="ck-v"><b style="color:' + c[1] + '">' + signedInt(v.vote) + '</b><span class="ck-chip" style="background:' + c[1] + '">' + c[0] + '</span></div>');
    });

    var sc = s.score != null ? Math.round(s.score) : 0, scol = stressColor(sc);
    var top = comps.slice().sort(function (x, y) { return y.pct * y.weight - x.pct * x.weight; }).slice(0, 2).map(function (c) { return c.name.toLowerCase(); });
    CK_ITEMS.stress = { mover: 'stress', target: sc, name: 'Overall stress', sub: 'Now ' + sc + '/100 · ' + (s.label || CK_STRESS_WORD(sc)).toLowerCase(),
      what: CK_TEXT.stress.what, now: sc + ' out of 100, which is ' + (s.label || CK_STRESS_WORD(sc)).toLowerCase() + '.' + (top.length ? ' The biggest contributors right now are ' + list(top) + '.' : ''),
      care: CK_TEXT.stress.care };
    h += '</div><div class="ck-h" style="margin-top:8px">Stress monitor</div><div class="ck-grid">' +
      ckButton('stress', 'Overall stress ' + sc + ' out of 100, ' + (s.label || '') + '. Show what it means.', ckStressDial('MASTER', sc), 'needle',
        '<div class="ck-nm">Overall stress<span class="ck-lamp" style="background:' + scol + ';box-shadow:0 0 9px ' + scol + '"></span></div>' +
        '<div class="ck-v"><b style="color:' + scol + '">' + sc + '</b><small>/100</small><span class="ck-chip" style="background:' + scol + '">' + esc(s.label || CK_STRESS_WORD(sc)) + '</span></div><div class="ck-w">All readings, weighted</div>');
    comps.forEach(function (c) {
      var key = 's_' + c.key, t = CK_TEXT[key] || {}, p = Math.round(c.pct), col = stressColor(p), w = CK_STRESS_WORD(p);
      CK_ITEMS[key] = { mover: 'stress', target: p, name: c.name, sub: 'Now ' + p + '/100 · ' + w.toLowerCase() + ' · weight ' + c.weight + '%',
        what: t.what || '', now: (c.why || '') + ' That ranks ' + p + ' out of 100 against the past year.', care: t.care || '' };
      var code = c.name.toUpperCase().replace('VOLATILITY', 'VOL').replace('PRESSURE', '').replace('INVENTORY', '').trim();
      h += ckButton(key, c.name + ' ' + p + ' out of 100, ' + w + '. Show what it means.', ckStressDial(code, p), 'needle',
        '<div class="ck-nm">' + esc(c.name) + '<span class="ck-lamp" style="background:' + col + ';box-shadow:0 0 9px ' + col + '"></span></div>' +
        '<div class="ck-v"><b style="color:' + col + '">' + p + '</b><small>/100</small><span class="ck-chip" style="background:' + col + '">' + w + '</span></div><div class="ck-w">Weight ' + c.weight + '%</div>');
    });
    h += '</div><div class="note">' + esc(s.note || '') + '</div></div>' +
      '<aside class="ck-mfdw" aria-live="polite"><div class="ck-mfd" data-ck-mfd></div></aside></div>';
    return h;
  }

  function ckApply(btn, it, val) {
    if (it.mover === 'horizon') { var hz = btn.querySelector('.ck-hz'); if (hz) hz.style.transform = 'translateY(' + (val * 0.5).toFixed(1) + 'px)'; return; }
    var n = btn.querySelector('.ck-n'); if (!n) return;
    var deg = it.mover === 'vote' ? -90 + val * 1.7 : ckStressAng(val);
    n.style.transformOrigin = '100px 100px'; n.style.transform = 'rotate(' + deg.toFixed(1) + 'deg)';
  }
  function ckScreen(box, it, key) {
    if (!it) {
      box.innerHTML = '<div class="tp"><span>Info screen</span><span>Standby</span></div><div class="tt" style="font-size:19px">Select an instrument</div>' +
        '<div class="x">Tap any gauge. Its needle swings to today’s reading, and this screen explains what it measures in plain words.</div>';
      return;
    }
    var gl = /bp\b/.test(it.now) ? '<div class="gl">bp = basis point, one hundredth of a percentage point (0.01%).</div>' : '';
    box.innerHTML = '<div class="tp"><span>Info screen</span><span>' + esc(it.name) + '</span></div>' +
      '<div><div class="tt">' + esc(it.name) + '</div><div class="st">' + esc(it.sub) + '</div></div>' +
      '<div><div class="k">WHAT IT MEANS</div><div class="x">' + esc(it.what) + '</div></div>' +
      '<div><div class="k">RIGHT NOW</div><div class="x">' + esc(it.now) + '</div>' + gl + '</div>' +
      '<div><div class="k">WHY YOU MIGHT CARE</div><div class="x">' + esc(it.care) + '</div></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px"><button type="button" data-ck-replay="' + key + '">REPLAY NEEDLE</button><button type="button" class="bk" data-ck-back="' + key + '">↑ BACK TO THE PANEL</button></div>';
  }
  function wireCockpit(host) {
    var box = host.querySelector('[data-ck-mfd]'); if (!box) return;
    var btns = host.querySelectorAll('.ck-i[data-ck]');
    ckScreen(box, null);
    var ckTop = function () {   // keep the sticky info screen clear of the site's sticky header, whatever its height
      var tb = document.querySelector('.top-blocks--sticky');
      host.style.setProperty('--ck-top', ((tb ? tb.getBoundingClientRect().height : 0) + 14) + 'px');
    };
    ckTop();
    btns.forEach(function (bt) { var it = CK_ITEMS[bt.getAttribute('data-ck')]; if (it) ckApply(bt, it, 0); });
    setTimeout(function () { btns.forEach(function (bt) { var it = CK_ITEMS[bt.getAttribute('data-ck')]; if (it) ckApply(bt, it, it.target); }); }, 250);   // power-on sweep
    if (host.getAttribute('data-ck-wired')) return;   // the page redraws on every section switch; listen only once
    host.setAttribute('data-ck-wired', '1');
    window.addEventListener('resize', ckTop);
    function play(key, scroll) {
      var box = host.querySelector('[data-ck-mfd]'), btns = host.querySelectorAll('.ck-i[data-ck]');
      var it = CK_ITEMS[key], bt = host.querySelector('.ck-i[data-ck="' + key + '"]'); if (!it || !bt || !box) return;
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === bt ? 'true' : 'false'); });
      ckScreen(box, it, key);
      var mv = bt.querySelector('.ck-n, .ck-hz');
      if (mv) mv.classList.add('ck-snap');
      ckApply(bt, it, 0);
      if (mv) void mv.getBoundingClientRect();
      requestAnimationFrame(function () { if (mv) mv.classList.remove('ck-snap'); requestAnimationFrame(function () { ckApply(bt, it, it.target); }); });
      if (scroll && window.innerWidth <= 880) {   // phones: jump to the explanation, landing just below the sticky header
        var tb = document.querySelector('.top-blocks--sticky'), off = (tb ? tb.getBoundingClientRect().height : 0) + 12;
        window.scrollTo({ top: box.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' });
      }
    }
    host.addEventListener('click', function (e) {
      var r = e.target.closest('[data-ck-replay]'); if (r) { play(r.getAttribute('data-ck-replay'), false); return; }
      var k = e.target.closest('[data-ck-back]');
      if (k) { var t = host.querySelector('.ck-i[data-ck="' + k.getAttribute('data-ck-back') + '"]'); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); t.focus({ preventScroll: true }); } return; }
      var bt = e.target.closest('.ck-i[data-ck]'); if (bt) play(bt.getAttribute('data-ck'), true);
    });
  }

  // ---------- Page ----------
  function page(j) {
    var g = j.gauges || {}, b = g.bull || {}, s = g.stress || {};
    var h = '<div class="wrap"><div class="eyebrow">Pulse</div><h1>The bond market’s vital signs</h1>' +
      '<p class="lede">Two readings, taken from where real money moves: Treasury auctions, futures positioning, dealer balance sheets, overnight funding, the term premium and rate swings. No opinions, no chatter.</p>' +
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
        '<div class="hint" style="margin:4px 0 12px">Higher means more strain in volatility, funding, dealer balance sheets and auction demand. Biggest drivers right now:</div>' +
        (s.components || []).slice().sort(function (x, y) { return y.pct * y.weight - x.pct * x.weight; }).slice(0, 3).map(function (c) {
          return '<div style="display:grid;grid-template-columns:1fr 34px;gap:10px;align-items:center;font-size:13px;margin-top:7px"><div>' + esc(c.name) +
            '<div class="bar" style="margin-top:5px"><i style="width:' + Math.max(3, c.pct) + '%;background:' + stressColor(c.pct) + '"></i></div></div>' +
            '<b class="num" style="text-align:right;color:' + stressColor(c.pct) + '">' + Math.round(c.pct) + '</b></div>';
        }).join('') + '</div></div>' +
      '</div>';

    var head = h; h = '';
    // why: the cockpit, one instrument per signal (see Cockpit above)
    h += '<h2>Why the needles are where they are</h2><p class="sub">Every signal behind the two gauges, as its own instrument. Tap one to see what it measures, what it says right now and why it matters. Nothing is hidden in a black box.</p>' +
      cockpit(b, s);

    var SEC = { why: h }; h = '';
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

    SEC.auctions = h; h = '';
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
    var fu = j.funding;
    if (fu) cards.push(statCard('Funding pressure', signed(fu.spread_avg20_bp, 0, 'bp'), 'Tighter than ' + Math.round(fu.pct_1y) + '% of the past year', stressColor(fu.pct_1y),
      'Overnight repo rate (SOFR) minus what the Fed pays banks on reserves (IORB), 20-day average. Above zero means cash is scarce. ' +
      'Reserves: $' + (fu.reserves.value / 1000).toFixed(2) + 'T.' + (fu.srf.days_used_20d ? ' Banks borrowed $1bn+ from the Fed’s standing repo facility on ' + fu.srf.days_used_20d + ' of the last 20 days.' : ''),
      fu.history, stressColor(fu.pct_1y), function (v) { return signed(v, 1, 'bp'); },
      'FRED · NY Fed SOFR, Fed Board IORB · ' + fmtDate(fu.date)));
    if (tp) cards.push(statCard('Term premium', tp.value.toFixed(2) + '%', signed(tp.change * 100, 0, 'bp') + ' in 4 weeks', tone(tp.change),
      'Extra yield investors demand to lock money up for 10 years instead of rolling short bills. Rising = less trust in the long end.', tp.history, '#5FD0C5', function (v) { return v.toFixed(2) + '%'; },
      'FRED · Fed Board (Kim-Wright) · ' + fmtDate(tp.date)));
    if (be) cards.push(statCard('Inflation expectations', be.value.toFixed(2) + '%', signed(be.change * 100, 0, 'bp') + ' in 4 weeks', tone(be.change),
      'Inflation the bond market expects over the next 10 years (the breakeven between regular and inflation-protected Treasuries).', be.history, '#D88BFF', function (v) { return v.toFixed(2) + '%'; },
      'FRED · ' + fmtDate(be.date)));
    if (cards.length) h += '<h2>The pros and the plumbing</h2><p class="sub">What big money is doing, and the stress points underneath. Hover or tap a chart for past values.</p><div class="grid">' + cards.join('') + '</div>';

    SEC.plumbing = h;
    SEC.wire = '<h2>Live wire</h2><p class="sub wire-sub">The latest bond, central-bank and macro headlines. Updated daily.</p><div class="wire" data-wire>Loading headlines…</div>';
    var dt = '<a class="dtlink" href="/debt-trap"><span>Next</span><b>The debt trap</b> How much U.S. debt has to be refinanced, what it costs and who is still buying it &rarr;</a>';

    var view = location.hash.slice(1), idx = -1;
    SECTIONS.forEach(function (x, i) { if (x.key === view && SEC[x.key]) idx = i; });
    if (idx < 0) {
      // Overview: the two gauges, then one card per section with what it says right now
      var votes = b.votes || [], bear = votes.filter(function (v) { return v.vote < 0; }).length, bull = votes.filter(function (v) { return v.vote > 0; }).length;
      var last = a && a.recent && a.recent[0];
      var now = {
        why: votes.length ? votes.length + ' signals: ' + [[bull, 'bullish'], [bear, 'bearish'], [votes.length - bull - bear, 'neutral']].filter(function (x) { return x[0]; })
          .map(function (x) { return x[0] + ' ' + x[1]; }).join(', ') + ((s.components || []).length ? ' · ' + s.components.length + ' stress readings' : '') : '',
        auctions: last ? esc(last.term.replace(' ', '-')) + ' auction, ' + fmtDate(last.date) + ': ' + last.grade + ' demand' : '',
        plumbing: tp ? 'Term premium ' + tp.value.toFixed(2) + '%' + (r ? ' · 10-year swinging ' + r.vol.value.toFixed(1) + 'bp a day' : '') : '',
        wire: '<span data-wire-top>The latest headlines</span>'
      };
      h = head + '<div class="secs">' + SECTIONS.filter(function (x) { return SEC[x.key]; }).map(function (x, i) {
        return '<a class="sec" href="#' + x.key + '" data-sec="' + x.key + '"><span class="n">0' + (i + 1) + '</span><span class="nm">' + x.title + '</span><span class="bl">' + x.blurb + '</span>' +
          (now[x.key] ? '<span class="now"><b>Now</b>' + now[x.key] + '</span>' : '') + '<span class="go">' + x.cta + ' &rarr;</span></a>';
      }).join('') + '</div>' + dt;
    } else {
      var cur = SECTIONS[idx], prev = SECTIONS[idx - 1], next = SECTIONS[idx + 1];
      h = '<div class="wrap"><p class="crumb"><a href="#" data-sec="">&larr; Pulse overview</a></p><div class="eyebrow">Pulse · ' + cur.title + '</div>' +
        '<div class="strip"><span><b class="num" style="color:' + bullColor(b.score) + '">' + (b.score > 0 ? '+' : '') + (b.score != null ? b.score : '–') + '</b>' + esc(b.label || '') + '</span>' +
        '<span><b class="num" style="color:' + stressColor(s.score) + '">' + (s.score != null ? Math.round(s.score) : '–') + '</b>stress, ' + esc(s.label || '') + '</span>' +
        '<a href="#" data-sec="">See the gauges</a></div><div class="view">' + SEC[cur.key] + '</div>' +
        '<nav class="pn" aria-label="Pulse sections">' + (prev ? '<a href="#' + prev.key + '" data-sec="' + prev.key + '">&larr; ' + prev.title + '</a>' : '<a href="#" data-sec="">&larr; Pulse overview</a>') +
        (next ? '<a class="nx" href="#' + next.key + '" data-sec="' + next.key + '">Next: ' + next.title + ' &rarr;</a>' : '<a class="nx" href="/debt-trap">Next: The debt trap &rarr;</a>') + '</nav>';
    }

    h += '<p class="foot">Pulse is built from public data: U.S. Treasury (Fiscal Data), CFTC Traders in Financial Futures, Federal Reserve Bank of New York, and FRED (Federal Reserve Bank of St. Louis), including SOFR from the Federal Reserve Bank of New York. This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis. ' +
      'Signals are simple rules for education and are not financial advice.<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
    return h;
  }

  // Live wire: the newest headlines from the daily news feed (news.point75.io/api/news), linking out to the source.
  var NEWS = 'https://news.point75.io/api/news';
  function ago(t) {
    var m = Math.round((Date.now() - new Date(t).getTime()) / 60000);
    if (!(m >= 0)) return '';
    if (m < 60) return m + ' min ago';
    if (m < 60 * 24) return Math.round(m / 60) + ' h ago';
    return Math.round(m / 1440) + ' d ago';
  }
  function wire(host) {
    var box = host.querySelector('[data-wire]'), top = host.querySelector('[data-wire-top]');
    if (!box && !top) return;
    var e = function (x) { return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
    fetch(NEWS).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      var a = ((j && j.articles) || []).filter(function (x) { return x.title && /^https?:/.test(x.url || '') && (x.tags || []).indexOf('newsdata') === -1; })  // skip general-news wire items, keep central banks and markets
        .sort(function (x, y) { return String(y.published_at).localeCompare(String(x.published_at)); }).slice(0, 8);
      if (top) { top.textContent = a.length ? a[0].title : 'Headlines are unavailable right now.'; if (!box) return; }
      if (!a.length) { box.textContent = 'Headlines are unavailable right now.'; return; }
      box.className = 'wire on';
      box.innerHTML = a.map(function (x) {
        return '<a class="h" href="' + e(x.url) + '" target="_blank" rel="noopener"><b>' + e(x.title) + '</b><span>' + e(x.source) +
          (x.published_at ? ' · ' + ago(x.published_at) : '') + '</span></a>';
      }).join('') + '<a class="more" href="/news">All of today’s headlines &rarr;</a>';
    }).catch(function () { if (box) box.textContent = 'Headlines are unavailable right now.'; if (top) top.textContent = 'Headlines are unavailable right now.'; });
  }

  function animate(host) {
    var m = host.querySelector('.hg'); if (!m) return;
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      m.setAttribute('y', m.getAttribute('data-y')); m.setAttribute('height', m.getAttribute('data-h'));
    }); });
  }

  var cache = null, loading = false, waiting = [];
  function load(cb) {
    // Queue every caller: the site can rebuild the page while data is loading, and the redrawn page must hear back too
    if (cache) return cb(cache);
    waiting.push(cb); if (loading) return; loading = true;
    fetch(API).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { cache = j; })
      .catch(function () { cache = null; }).then(function () { loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(cache); }); });
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
      draw(host, j);
      host.addEventListener('click', function (e) {
        var a = e.target.closest('a[data-sec]'); if (!a) return;
        e.preventDefault();
        var k = a.getAttribute('data-sec');
        history.replaceState(history.state, '', location.pathname + location.search + (k ? '#' + k : ''));
        draw(host, j);
        window.scrollTo({ top: 0 });
      });
    });
  }
  function draw(host, j) { host.innerHTML = page(j); wireSparks(host); animate(host); wire(host); wireCockpit(host); }
  window.addEventListener('hashchange', function () {
    var host = document.querySelector('.p75pulse'); if (host && cache) draw(host, cache);
  });
  function clear() { var h = document.querySelector('.p75pulse'); if (h) h.remove(); }

  window.P75PULSE = { render: render, clear: clear };
})();
