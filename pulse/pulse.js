/* Point75 - Bond Pulse page (/pulse). Loaded by p75.js; data from news.point75.io/api/pulse.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75PULSE) return;
  var API = 'https://news.point75.io/api/pulse';
  var BULL = '#1FC8FF', BEAR = '#E5484D', NEUT = '#9AA0A6';

  // The page shows the two gauges, then a tab bar: each tab swaps the view below it in place (/pulse#auctions).
  // Signals is open by default.
  var SECTIONS = [
    { key: 'takeaway', tab: 'Takeaway', title: 'The takeaway', blurb: 'Everything on Pulse in one screen.', cta: 'See the takeaway' },
    { key: 'why', tab: 'Signals', title: 'Why the needles are where they are', blurb: 'Every signal behind the two gauges, with the rule it follows. Nothing hidden in a black box.', cta: 'See every signal' },
    { key: 'auctions', tab: 'Auctions', title: 'Who’s buying the debt?', blurb: 'Each Treasury auction graded against the last six of the same maturity, and what’s coming up.', cta: 'See the auctions' },
    { key: 'plumbing', tab: 'Plumbing', title: 'The pros and the plumbing', blurb: 'What big money is doing in futures, dealer balance sheets, funding, rates swings and inflation expectations.', cta: 'Open the gauges' },
    { key: 'wire', tab: 'Live wire', title: 'Live wire', blurb: 'The latest bond, central-bank and macro headlines, linking to the source.', cta: 'Read the headlines' }
  ];

  var CSS =
    '.p75pulse{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--muted:#C2BCAF;--soft:#E4DED1;--gold:#C9A227;' +
      '--bull:' + BULL + ';--bear:' + BEAR + ';background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75pulse *{box-sizing:border-box}' +
    '.p75pulse .wrap{max-width:1040px;margin:0 auto;padding:4px 20px 72px}' +
    '.p75pulse .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75pulse h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:6px 0 6px;letter-spacing:-.01em}' +
    '.p75pulse .lede{color:var(--soft);font-size:15px;line-height:1.55;margin:0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75pulse .hd{display:flex;flex-direction:column;gap:8px}' +
    // fold: the top block and the strip swap places with a smooth height change
    '.p75pulse .top,.p75pulse .fstrip{display:grid;transition:grid-template-rows .5s cubic-bezier(.4,0,.2,1),opacity .4s}' +
    '.p75pulse .top > div,.p75pulse .fstrip > div{min-height:0;overflow:hidden}' +
    '.p75pulse .top{grid-template-rows:1fr}.p75pulse .fstrip{grid-template-rows:0fr;opacity:0}' +
    '.p75pulse.folded .top{grid-template-rows:0fr;opacity:0}.p75pulse.folded .fstrip{grid-template-rows:1fr;opacity:1}' +
    '.p75pulse:not(.folded) .fstrip{visibility:hidden}.p75pulse.folded .top > div{visibility:hidden;transition:visibility 0s .5s}' +
    '.p75pulse,.p75pulse *{overflow-anchor:none}' +   // the fold must slide the content up, not be hidden by scroll anchoring
    '.p75pulse .fold{display:flex;align-items:center;gap:8px 22px;flex-wrap:wrap;width:100%;min-height:48px;margin:2px 0 0;padding:8px 10px 8px 16px;border-radius:12px;' +
      'background:var(--panel);border:1px solid var(--line);color:inherit;font:inherit;text-align:left;cursor:pointer;transition:border-color .15s}' +
    '.p75pulse .fold:hover{border-color:var(--gold)}.p75pulse .fold:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75pulse .fi{display:inline-flex;align-items:baseline;gap:8px;white-space:nowrap}' +
    '.p75pulse .fi small{color:var(--muted);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75pulse .fi b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:22px;line-height:1;font-variant-numeric:tabular-nums}' +
    '.p75pulse .fi em{font-style:normal;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}' +
    '.p75pulse .fo{margin-left:auto;display:inline-flex;align-items:center;gap:10px;color:var(--gold);font-size:13px;font-weight:700}' +
    '.p75pulse .fo-c{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--gold);display:grid;place-items:center;animation:p75bob 2.4s ease-in-out infinite}' +
    '.p75pulse .fo-c:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '@keyframes p75bob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}' +
    '@media (max-width:560px){.p75pulse .fold{gap:6px 14px}.p75pulse .fo-t{display:none}.p75pulse .fi em{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.p75pulse .top,.p75pulse .fstrip{transition:none}.p75pulse .fo-c{animation:none}}' +
    '.p75pulse.folded .tabs{margin-top:10px}' +
    '.p75pulse .hd-t{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px}.p75pulse .hd-t h1{margin:0}' +
    '.p75pulse .hd-t .asof{margin:0 0 0 auto}' +
    '@media (max-width:880px){.p75pulse .hd-t{flex-direction:column;align-items:flex-start;gap:2px}.p75pulse .hd-t .asof{margin:4px 0 0}}' +
    '.p75pulse .asof{font-size:12.5px;color:var(--muted);margin-top:6px}' +
    '.p75pulse .asof b{color:var(--cream);font-weight:600}' +
    '.p75pulse h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:23px;margin:32px 0 4px}' +
    '.p75pulse h2 + .sub{color:var(--soft);font-size:14.5px;line-height:1.55;margin:0 0 12px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    // instruments
    '.p75pulse .inst{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;margin-top:18px}' +
    '.p75pulse .inst .card{display:flex;flex-direction:column;padding:16px 18px}' +
    '.p75pulse .card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:22px}' +
    '.p75pulse .card h3{margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:700}' +
    '.p75pulse .meter{display:flex;gap:16px;align-items:center}' +
    '.p75pulse .dial{flex:0 0 auto;width:176px}.p75pulse .dial svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75pulse .reading{flex:1;min-width:0}' +
    '.p75pulse .big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:48px;line-height:1;margin:0 0 2px;font-variant-numeric:tabular-nums}' +
    '.p75pulse .big small{font-family:Manrope,sans-serif;font-size:14px;color:var(--muted);margin-left:4px}' +
    '.p75pulse .verdict{font-size:12.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px}' +
    '.p75pulse .hint{color:var(--soft);font-size:13.5px;line-height:1.5;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    // Needle sweeps stay on even with Reduce motion: the sweep is how the reading is shown, and it is slow and even.
    '.p75pulse .p75n{transition:transform 4.5s cubic-bezier(.37,0,.3,1)}' +
    '.p75pulse .p75f{stroke-dashoffset:100;transition:stroke-dashoffset 4.5s cubic-bezier(.37,0,.3,1)}.p75pulse .inst.on .p75f{stroke-dashoffset:0}' +
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
    '.p75pulse .dtlink{display:block;margin-top:20px;background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:14px;padding:18px 20px;color:var(--soft);text-decoration:none;font-size:14.5px;line-height:1.5}' +
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
    '.p75pulse .view > h2:first-child{margin-top:16px}' +
    '.p75pulse .tabs{position:sticky;top:var(--tabs-top,0px);z-index:6;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:22px -20px 0;padding:10px 20px;background:var(--ink);border-bottom:1px solid var(--line)}' +
    '.p75pulse .tabs::-webkit-scrollbar{display:none}' +
    // the tab bar is what follows the reader down this page, so the site's floating back/next bar stays hidden here
    'html.p75tabs #p75tf{display:none!important}' +
    '.p75pulse .tab{flex:none;display:inline-flex;align-items:center;min-height:40px;padding:0 18px;border-radius:999px;border:1px solid #3A3C42;color:var(--soft);font-weight:700;font-size:14.5px;text-decoration:none;white-space:nowrap;transition:border-color .15s,background .15s,color .15s}' +
    '.p75pulse .tab:hover{border-color:var(--gold);color:#fff}' +
    '.p75pulse .tab.on{background:var(--gold);border-color:var(--gold);color:#111214}' +
    '.p75pulse .tab:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '@media (max-width:560px){.p75pulse .tabs{margin:28px -16px 0;padding:10px 16px;gap:6px}.p75pulse .tab{min-height:38px;padding:0 15px;font-size:14px}}' +
    '@media (max-width:460px){.p75pulse .tabs{gap:5px}.p75pulse .tab{flex:1 1 auto;justify-content:center;padding:0 6px;font-size:13px}}' +
    '@media (max-width:400px){.p75pulse .tab{flex:none;min-height:36px;padding:0 12px}}' +   // one row that slides sideways: a second row cost ~40px
    '@media (max-width:700px){.p75pulse .secs{grid-template-columns:1fr;gap:14px}.p75pulse a.sec{min-height:0;padding:22px 20px}.p75pulse a.sec .nm{font-size:23px}.p75pulse .strip a{margin-left:0}}' +
    // cockpit (the #why view): one instrument per signal, plus an info screen that explains the one you tap
    '.p75pulse .ck{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start;margin-top:8px}' +
    '.p75pulse .ck-main{flex:999 1 560px;min-width:0;display:flex;flex-direction:column;gap:16px;padding:20px;border-radius:16px;' +
      'background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 18px 40px rgba(0,0,0,.45)}' +
    '.p75pulse .ck-h{color:var(--gold);font-size:13px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}' +
    '.p75pulse .ck-main{gap:0;padding:6px 20px}' +
    '.p75pulse .ck-sec + .ck-sec{border-top:1px solid #34363C}' +
    '.p75pulse .ck-tg{display:flex;align-items:center;gap:14px;width:100%;min-height:56px;padding:10px 0;background:none;border:0;color:inherit;font:inherit;cursor:pointer;text-align:left}' +
    '.p75pulse .ck-tg:focus-visible{outline:3px solid #F2D27A;outline-offset:2px;border-radius:6px}' +
    '.p75pulse .ck-tg:hover .ck-h{color:#F2D27A}' +
    '.p75pulse .ck-sum{margin-left:auto;display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--soft);white-space:nowrap}' +
    '.p75pulse .ck-sum b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:22px;line-height:1}' +
    '.p75pulse .ck-car{flex:0 0 auto;width:28px;height:28px;border-radius:50%;border:1.5px solid #8C7424;display:grid;place-items:center;transition:transform .2s,border-color .15s}' +
    '.p75pulse .ck-car:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '.p75pulse .ck-tg[aria-expanded="true"] .ck-car{transform:rotate(180deg);border-color:var(--gold)}' +
    '.p75pulse .ck-body{padding:2px 0 18px}' +
    '.p75pulse .ck-body[hidden]{display:none}' +
    '.p75pulse .ck-hint{display:flex;align-items:center;gap:10px;margin:0 0 12px;font-size:14px;color:var(--soft)}' +
    '.p75pulse .ck-hint i{flex:0 0 auto;width:9px;height:9px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 0 rgba(242,210,122,.6);animation:p75ping 1.8s ease-out infinite}' +
    '@keyframes p75ping{0%{box-shadow:0 0 0 0 rgba(242,210,122,.6)}80%,100%{box-shadow:0 0 0 9px rgba(242,210,122,0)}}' +
    '.p75pulse .ck-tap{display:block;margin-top:8px;padding-top:7px;border-top:1px solid #34363C;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--gold)}' +
    '.p75pulse .ck-tap .b{display:none;color:#A9F0C2}' +
    '.p75pulse .ck-i[aria-pressed="true"] .ck-tap .a{display:none}.p75pulse .ck-i[aria-pressed="true"] .ck-tap .b{display:inline}' +
    '@media (hover:hover){.p75pulse .ck-i{transition:border-color .15s,box-shadow .15s,background .15s,transform .15s}.p75pulse .ck-i:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.45),0 0 14px rgba(201,162,39,.25)}}' +
    '.p75pulse .ck-i.ck-nudge{animation:p75nudge 1.1s ease-in-out 2}' +
    '@keyframes p75nudge{0%,100%{box-shadow:0 0 10px rgba(201,162,39,.10)}50%{box-shadow:0 0 0 3px rgba(242,210,122,.35),0 0 22px rgba(242,210,122,.35);border-color:#F2D27A}}' +
    '@media (max-width:880px){.p75pulse .ck-tap .b{font-size:0}.p75pulse .ck-tap .b:after{content:"Showing below ▾";font-size:12px}}' +
    '@media (prefers-reduced-motion:reduce){.p75pulse .ck-hint i,.p75pulse .ck-i.ck-nudge{animation:none}.p75pulse .ck-i:hover{transform:none}}' +
    '.p75pulse .ck:not(.ck-on) .ck-mfdw{display:none}' +
    '.p75pulse .ck-votes{flex:1 1 260px;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:12px}' +
    '.p75pulse .ck-pills{display:flex;flex-wrap:wrap;gap:8px}' +
    '.p75pulse .ck-pill{display:inline-flex;align-items:center;gap:6px;padding:5px 12px 5px 10px;border-radius:99px;border:1px solid;font-size:13px;font-weight:700;white-space:nowrap}' +
    '.p75pulse .ck-pill b{font-size:17px;font-variant-numeric:tabular-nums}' +
    // takeaway
    '.p75pulse .tk{display:flex;flex-direction:column;gap:12px}' +
    '.p75pulse .tk-head{margin:0;padding:18px 22px;border-radius:16px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);' +
      'font-family:"Hedvig Letters Serif",Georgia,serif;font-size:24px;line-height:1.45;color:#fff}' +
    '.p75pulse .tk .hl{text-shadow:0 0 12px currentColor}' +
    '.p75pulse .tk-watch{display:flex;align-items:center;gap:10px;margin:0;font-size:17px;color:#F1ECE2}.p75pulse .tk-watch b{color:#FFD23F}' +
    '.p75pulse .tk-watch i{flex:0 0 auto;width:9px;height:9px;border-radius:50%;background:#FF3D5E;animation:p75ping 1.8s ease-out infinite}' +
    '.p75pulse .tk-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}' +
    '.p75pulse a.tk-c{display:flex;flex-direction:column;gap:10px;padding:14px 16px;border-radius:14px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);color:inherit;text-decoration:none;transition:border-color .15s,transform .15s}' +
    '.p75pulse a.tk-c:hover,.p75pulse a.tk-c:focus-visible{border-color:var(--gold);outline:none}' +
    '@media (hover:hover){.p75pulse a.tk-c:hover{transform:translateY(-2px)}}' +
    '.p75pulse .tk-h{display:flex;align-items:center;justify-content:space-between}.p75pulse .tk-go{color:var(--gold);font-size:14.5px;font-weight:800}' +
    '.p75pulse .tk-b{display:flex;align-items:center;gap:16px}' +
    '.p75pulse .tk-d{flex:0 0 auto;width:108px}.p75pulse .tk-d svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75pulse .tk-t{display:flex;flex-direction:column;gap:3px;min-width:0}' +
    '.p75pulse .tk-t > b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:34px;line-height:1;text-shadow:0 0 14px currentColor}.p75pulse .tk-t > b small{font-size:16px;opacity:.75}' +
    '.p75pulse .tk-t em{font-style:normal;font-size:13.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75pulse .tk-l{font-size:16.5px;line-height:1.5;color:#F1ECE2}.p75pulse .tk-news{display:block;font-size:17.5px;color:#fff;font-weight:600;line-height:1.45}' +
    '.p75pulse .tk.go .p75f{stroke-dashoffset:0}' +
    '.p75pulse a.tk-back{display:inline-flex;align-items:center;gap:8px;min-height:40px;margin:12px 0 -4px;padding:0 16px;border-radius:99px;border:1px solid var(--gold);background:rgba(201,162,39,.1);color:#FFD23F;font-weight:800;font-size:14.5px;text-decoration:none}' +
    '.p75pulse a.tk-back:hover,.p75pulse a.tk-back:focus-visible{background:rgba(201,162,39,.22);outline:none}' +
    '@media (max-width:760px){.p75pulse .tk-grid{grid-template-columns:1fr}.p75pulse .tk-head{font-size:20px;padding:14px 16px}.p75pulse .tk-l{font-size:15.5px}.p75pulse .tk-d{width:80px}}' +
    // plumbing gauge board
    '.p75pulse .pl-rows{display:flex;flex-direction:column;gap:6px}' +
    '.p75pulse .pl-board .ck-sum{font-size:13px;gap:6px}.p75pulse .pl-sep{color:var(--muted)}' +
    '@media (max-width:700px){.p75pulse .pl-board .ck-sum{display:none}}' +
    '.p75pulse .ck-i.pl{display:grid;grid-template-columns:100px minmax(0,1fr) auto minmax(70px,1fr) 12px;align-items:center;gap:16px;padding:12px 16px 12px 12px;border-width:1px;border-radius:14px;box-shadow:none}' +
    '.p75pulse .pl-rows{gap:10px}' +
    '.p75pulse .pl-board .p75f{filter:drop-shadow(0 0 6px currentColor)}' +
    '.p75pulse .pl-board .p75n{filter:drop-shadow(0 0 4px rgba(255,255,255,.85))}.p75pulse .pl-board .p75n path,.p75pulse .pl-board .p75n line{fill:#fff;stroke:#fff}' +
    '.p75pulse .pl-board .pl-d path[stroke="#2A2C31"]{stroke:#3A3D44}' +
    '.p75pulse .pl-board .pl-v b{text-shadow:0 0 14px currentColor}' +
    '.p75pulse .pl-board .pl-v small{filter:drop-shadow(0 0 5px currentColor)}' +
    '.p75pulse .pl-board .spark path:nth-of-type(2){stroke-width:2.6;filter:brightness(1.25) drop-shadow(0 0 3px rgba(255,255,255,.35))}' +
    '.p75pulse .pl-board .pl-n small,.p75pulse .pl-board .pl-d small{color:#E2DDD2}' +
    '.p75pulse .pl-d{display:flex;flex-direction:column;align-items:center}.p75pulse .ck-i .pl-d svg{width:100px;max-width:none;height:auto;margin:0;overflow:visible}' +
    '.p75pulse .pl-d small{font-size:12.5px;color:var(--muted);font-weight:700;letter-spacing:.04em;margin-top:-2px}' +
    '.p75pulse .pl-n b{display:block;font-size:17px;color:#fff;font-weight:800;line-height:1.2}.p75pulse .pl-n small{display:block;font-size:14px;color:var(--muted);line-height:1.3;margin-top:2px}' +
    '.p75pulse .pl-v b{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:29px;line-height:1;color:#fff;white-space:nowrap}' +
    '.p75pulse .pl-v small{display:block;font-size:14px;font-weight:700;margin-top:6px}' +
    '.p75pulse .pl-v{max-width:150px}.p75pulse .pl-n b{text-wrap:balance}' +
    '.p75pulse .pl-s .spark{margin:0}.p75pulse .ck-i .pl-s svg{height:70px;max-width:none;margin:0}' +
    '.p75pulse .pl-go{color:var(--gold);font-size:28px;line-height:1}' +
    '@media (max-width:700px){.p75pulse .ck-i.pl{grid-template-columns:72px minmax(0,1fr) minmax(0,auto);gap:12px;padding:10px 12px 10px 8px}.p75pulse .ck-i .pl-d svg{width:70px}.p75pulse .pl-n b{font-size:16px}.p75pulse .pl-n small{font-size:12.5px}.p75pulse .pl-v b{font-size:24px}.p75pulse .pl-v small{font-size:12.5px}.p75pulse .pl-s,.p75pulse .pl-go{display:none}.p75pulse .pl-v{text-align:right;max-width:120px}.p75pulse .pl-v small{line-height:1.25}}' +
    // auctions
        '.p75pulse .auc-meter{display:flex;flex-wrap:wrap;align-items:center;gap:18px}' +
    '.p75pulse .auc-meter svg{flex:0 0 auto;width:170px;height:auto}' +
    '.p75pulse .auc-mt{flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:8px}' +
    '.p75pulse .auc-w{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:28px;line-height:1.1}' +
        '.p75pulse .auc-up{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr));column-gap:28px}' +
    '.p75pulse .auc-up li{display:grid;grid-template-columns:52px minmax(0,1fr) auto auto;gap:10px;align-items:baseline;padding:7px 0;border-top:1px solid var(--line);font-size:13.5px}' +
        '.p75pulse .auc-up .ud{color:var(--muted);font-variant-numeric:tabular-nums}.p75pulse .auc-up b{color:#fff;font-weight:700}' +
    '.p75pulse .auc-up .us{color:var(--soft);font-variant-numeric:tabular-nums}' +
    '.p75pulse .auc-up .ui{color:var(--gold);font-size:12px;font-weight:800;letter-spacing:.04em;white-space:nowrap}' +
    '.p75pulse .ac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}' +
    '.p75pulse .ac{display:flex;flex-direction:column;gap:4px;padding:12px 14px 10px;border-radius:14px;background:#17181B;border:1px solid var(--line);border-top:3px solid}' +
    '.p75pulse .ck-i .am svg{width:100%;max-width:96px;margin:0 auto}.p75pulse .ck-i.auc-meter > svg{width:170px;max-width:none;margin:0}' +
    '.p75pulse .auc .ac-grid{grid-template-columns:repeat(auto-fill,minmax(min(270px,100%),1fr));gap:10px}' +
    '.p75pulse .ck-i.ac{border-width:1px;border-top-width:3px;border-color:var(--line);box-shadow:none;padding:12px 14px 10px}' +
    '.p75pulse .ck-i.ac[aria-pressed="true"]{border-color:#F2D27A}' +
    '.p75pulse .ck-i.auc-meter{flex-direction:row;flex-wrap:wrap;align-items:center;gap:18px;padding:12px 14px;border-width:1px;border-color:var(--line);box-shadow:none}' +
    '.p75pulse .ck-i.auc-meter[aria-pressed="true"]{border-color:#F2D27A}.p75pulse .ck-i.auc-meter .ck-tap{margin-top:4px}' +
    '.p75pulse .ac-h{display:flex;align-items:center;gap:8px}' +
    '.p75pulse .ac-t{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:24px;line-height:1;color:#fff}' +
    '.p75pulse .ac-r{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}' +
    '.p75pulse .ac-g{margin-left:auto;padding:3px 10px;border-radius:99px;border:1px solid;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}' +
    '.p75pulse .ac-d{font-size:12.5px;color:var(--muted);font-variant-numeric:tabular-nums}' +
    '.p75pulse .ac-m{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:4px}' +
    '.p75pulse .am{display:flex;flex-direction:column;align-items:center;text-align:center;gap:1px}' +
    '.p75pulse .am svg{display:block;width:100%;max-width:104px;height:auto;overflow:visible}' +
    '.p75pulse .am .mv{font-size:17px;font-weight:800;line-height:1.1;margin-top:2px;font-variant-numeric:tabular-nums}' +
    '.p75pulse .am .mn{font-size:11.5px;font-weight:700;color:var(--cream);line-height:1.25;white-space:nowrap}' +
    '.p75pulse .am .ma{font-size:11px;color:#F2D27A;font-variant-numeric:tabular-nums}' +
    '.p75pulse .ck-body.go .p75f{stroke-dashoffset:0}' +
    '@media (max-width:560px){.p75pulse .auc-meter svg{width:140px}.p75pulse .ac-grid{grid-template-columns:1fr}.p75pulse .auc-up li{grid-template-columns:46px minmax(0,1fr) auto;gap:8px}.p75pulse .auc-up .us{display:none}}' +
    '.p75pulse .ck-how1{margin:0;font-size:14px;line-height:1.55;color:var(--soft)}' +
    '@media (max-width:560px){.p75pulse .ck-main{padding:4px 14px}.p75pulse .ck-sum{font-size:12.5px}.p75pulse .ck-sum b{font-size:19px}.p75pulse .ck-sum .w{display:none}}' +
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
    '.p75pulse .ck-nm{font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#fff;line-height:1.2;margin-top:8px;display:flex;justify-content:space-between;align-items:center;gap:8px}' +
    '.p75pulse .ck-v{display:flex;align-items:baseline;gap:6px;margin-top:6px}' +
    '.p75pulse .ck-v b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:32px;line-height:1;font-variant-numeric:tabular-nums}' +
    '.p75pulse .ck-v small{color:var(--muted);font-size:13px}' +
    '.p75pulse .ck-chip{margin-left:auto;padding:3px 7px;border-radius:99px;font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#0b0c0e;white-space:nowrap}' +
    '.p75pulse .ck-w{color:var(--muted);font-size:12px;margin-top:4px}' +
    '.p75pulse .ck-lamp{flex:0 0 auto;width:11px;height:11px;border-radius:50%}' +
    '.p75pulse .ck-mfdw{flex:1 1 350px;min-width:0;position:sticky;top:var(--ck-top,16px);max-height:calc(100vh - var(--ck-top,16px) - 16px);overflow-y:auto;padding:12px;border-radius:16px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold)}' +
    '.p75pulse .ck-mfd{display:flex;flex-direction:column;gap:13px;min-height:380px;padding:20px;border-radius:10px;background:#050807;border:2px solid #0F1512;' +
      'box-shadow:inset 0 0 40px rgba(60,220,120,.06);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#7CE0A0}' +
    '.p75pulse .ck-mfd .tp{display:flex;justify-content:space-between;gap:8px;font-size:11px;letter-spacing:.14em;color:#4E9C6C;text-transform:uppercase}' +
    '.p75pulse .ck-mfd .tt{font-size:18px;font-weight:700;color:#A9F0C2;text-transform:uppercase;line-height:1.2}' +
    '.p75pulse .ck-mfd .st{font-size:12px;color:#7CE0A0;margin-top:4px}' +
    '.p75pulse .ck-mfd .k{font-size:11px;letter-spacing:.14em;color:#E8C766;margin-bottom:5px}' +
    '.p75pulse .ck-mfd .x{font-family:Manrope,system-ui,sans-serif;font-size:14.5px;line-height:1.55;color:#D6F7E2}' +
    '.p75pulse .ck-mfd .gl{font-family:Manrope,system-ui,sans-serif;font-size:12px;color:#8FCBA6}' +
    '.p75pulse .ck-mfd button{align-self:flex-start;min-height:44px;padding:0 16px;border-radius:6px;border:1px solid var(--gold);background:#0B1410;color:#E8C766;' +
      'font:inherit;font-size:13px;letter-spacing:.1em;cursor:pointer}' +
    '.p75pulse .ck-mfd .bk{display:none}' +
    '.p75pulse .ck-n,.p75pulse .ck-hz{transition:transform 4.5s cubic-bezier(.37,0,.3,1)}' +
    '.p75pulse .ck-snap{transition:none!important}' +
    // Phones and small tablets: the info screen opens as a bottom sheet over the panel (built by ckSheet below),
    // so the tapped gauge stays in view instead of the page scrolling away from it
    '@media (max-width:880px){.p75pulse .ck-mfdw{display:none}}' +
    '.p75ck-sheet{--cream:#EDE8DC;--muted:#C2BCAF;--line:#2A2B2F;--gold:#C9A227;position:fixed;inset:0;z-index:2147483000;pointer-events:none;visibility:hidden;' +
      'transition:visibility 0s .3s;font-family:Manrope,system-ui,sans-serif;color:var(--cream)}' +
    '.p75ck-sheet *{box-sizing:border-box}' +
    '.p75ck-sheet.open{pointer-events:auto;visibility:visible;transition:none}' +
    '.p75ck-sheet .sh-bd{position:absolute;inset:0;background:rgba(0,0,0,.4);opacity:0;transition:opacity .3s;touch-action:none}' +
    '.p75ck-sheet.open .sh-bd{opacity:1}' +
    '.p75ck-sheet .sh{position:absolute;left:0;right:0;bottom:0;max-height:52vh;display:flex;flex-direction:column;padding:0 10px calc(10px + env(safe-area-inset-bottom));' +
      'background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);border-bottom:0;border-radius:18px 18px 0 0;' +
      'transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1)}' +
    '.p75ck-sheet.open .sh{transform:none}' +
    '.p75ck-sheet .sh-hd{flex:0 0 auto;padding:8px 2px;touch-action:none}' +
    '.p75ck-sheet .sh-grab{width:44px;height:5px;border-radius:3px;background:#5A5C62;margin:0 auto 8px}' +
    '.p75ck-sheet .sh-bar{display:flex;align-items:center;gap:8px}' +
    '.p75ck-sheet .sh-bar button{min-width:44px;min-height:44px;border-radius:10px;border:1px solid #3A3C42;background:#111214;color:var(--cream);font:inherit;font-size:18px;cursor:pointer}' +
    '.p75ck-sheet .sh-bar button:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75ck-sheet .sh-pos{flex:1;text-align:center;color:var(--muted);font-size:13px;letter-spacing:.06em}' +
    '.p75ck-sheet .sh-dial{float:right;width:112px;margin:6px 4px 4px 10px}.p75ck-sheet .sh-dial svg{display:block;width:100%;height:auto}' +
    '.p75ck-sheet .sh-dial.wide{float:none;width:auto;margin:4px 0 8px;padding:8px 6px 6px;border-radius:12px;background:#17181B;border:1px solid #2A2B2F}' +
    '.p75ck-sheet .sh-dial .ac-m{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}' +
    '.p75ck-sheet .sh-dial .am{display:flex;flex-direction:column;align-items:center;text-align:center;gap:1px}.p75ck-sheet .sh-dial .am svg{max-width:92px;margin:0 auto;overflow:visible}' +
    '.p75ck-sheet .sh-dial .am .mv{font:800 16px/1.1 Manrope,sans-serif}.p75ck-sheet .sh-dial .am .mn{font:700 11.5px/1.25 Manrope,sans-serif;color:#EDE8DC}.p75ck-sheet .sh-dial .am .ma{font:600 11px Manrope,sans-serif;color:#F2D27A}' +
    '.p75ck-sheet .sh-dial .p75f{stroke-dashoffset:0}' +
    '.p75ck-sheet .ck-mfd .tp{flex-wrap:nowrap;white-space:nowrap}.p75ck-sheet .ck-mfd .tp span:last-child{overflow:hidden;text-overflow:ellipsis;min-width:0}' +
    '.p75ck-sheet .sh-dial .ck-n,.p75ck-sheet .sh-dial .ck-hz,.p75ck-sheet .sh-dial .p75n{transition:transform 4.5s cubic-bezier(.37,0,.3,1)}.p75ck-sheet .sh-dial .ck-snap{transition:none!important}' +
    '.p75ck-sheet .sh-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}' +
    '@media (min-width:600px){.p75ck-sheet .sh{left:50%;right:auto;width:560px;margin-left:-280px}}' +
    '@media (prefers-reduced-motion:reduce){.p75ck-sheet .sh,.p75ck-sheet .sh-bd{transition:none}}' +
    '@media (max-width:560px){.p75pulse .ck-main{padding:14px}.p75pulse .ck-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
      '.p75pulse .ck-v{flex-wrap:wrap;row-gap:4px}.p75pulse .ck-chip{font-size:10px;padding:2px 6px}.p75pulse .ck-v b{font-size:26px}.p75pulse .ck-nm{font-size:12.5px}.p75pulse .ck-att{flex-basis:100%}}' +
    '.p75pulse .foot{color:#77736a;font-size:12px;line-height:1.6;margin-top:48px;border-top:1px solid var(--line);padding-top:18px}' +
    '.p75pulse .load{color:var(--muted);padding:40px 0}' +
    '@media (max-width:980px){.p75pulse .grid{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:880px){.p75pulse .why{grid-template-columns:1fr}}' +
    // Phones and small tablets: the two gauges sit side by side, smaller, so the tabs are close at hand.
    // Their notes are left out here; the Signals tab right below explains every reading.
    '@media (max-width:880px){.p75pulse .inst{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;margin-top:20px}' +
      '.p75pulse .inst .card{padding:12px 10px 14px;align-items:center;text-align:center}.p75pulse .inst .card h3{font-size:10.5px;letter-spacing:.1em}' +
      '.p75pulse .inst .meter{flex-direction:column;gap:2px;align-items:center}.p75pulse .inst .dial{width:100%;max-width:170px}' +
      '.p75pulse .inst .reading{text-align:center}.p75pulse .inst .big{font-size:34px;margin:0}.p75pulse .inst .verdict{font-size:11px;margin:0}' +
      '.p75pulse .inst .hint{display:none}.p75pulse .lede{text-align:left}}' +
    '@media (max-width:560px){.p75pulse .wrap{padding:4px 16px 56px}.p75pulse h1{font-size:24px}.p75pulse .grid{grid-template-columns:1fr}' +
      '.p75pulse .card{padding:18px}' +
      '.p75pulse .hide-s{display:none}.p75pulse table{font-size:13px}}';

  function once() {
    if (document.getElementById('p75pulse-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(f);
    // The bottom sheet lives at the end of <body>, outside .p75pulse, so it reuses the info-screen rules under its own class
    var sheetMfd = (CSS.match(/\.p75pulse \.ck-mfd[^{]*\{[^}]*\}/g) || []).map(function (r) { return r.replace(/\.p75pulse \.ck-mfd/g, '.p75ck-sheet .ck-mfd'); }).join('');
    var st = document.createElement('style'); st.id = 'p75pulse-css';
    st.textContent = CSS + sheetMfd + '.p75ck-sheet .ck-mfd{min-height:0}.p75ck-sheet .ck-mfd .bk{display:none}';
    document.head.appendChild(st);
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

  // ---------- Dials (same build as the speedometers in Point75 Tools) ----------
  // A 220° sweep, slim track, coloured fill from a resting point to the reading, tapered needle and hub.
  // Needle and fill start at rest and swing to the reading when the page appears (see animate()).
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
    svg += '<path d="' + dArc(-DSWEEP / 2, DSWEEP / 2, DR) + '" fill="none" stroke="' + (o.big ? '#2A2C31' : '#3A3D45') + '" stroke-width="' + sw + '" stroke-linecap="round"/>';
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
  // Bull / Bear: −100 (bear) on the left, 0 at the top, +100 (bull) on the right; the fill grows out of the middle
  function bullDial(score) {
    return dial({ v: score, min: -100, max: 100, rest: 0, color: bullColor(score), big: true,
      zones: [[-100, -20, BEAR], [20, 100, BULL]],
      labels: [[-100, '−100', BEAR], [0, '0'], [100, '+100', BULL]],
      aria: 'Bull / Bear reading ' + score + ' on a scale from −100 (bearish) to +100 (bullish)' });
  }
  function stressDial(stress, label) {
    return dial({ v: stress, min: 0, max: 100, rest: 0, color: stressColor(stress), big: true,
      zones: [[0, 30, '#2BD17E'], [30, 55, '#B8D43A'], [55, 75, '#F2A33A'], [75, 100, '#FF4D4D']],
      labels: [[0, '0'], [50, '50'], [100, '100']],
      aria: 'Stress reading ' + stress + ' out of 100' + (label ? ', ' + label : '') });
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
    bull: { what: 'Which way the bond market is leaning. Each signal below casts a vote, and the score is their average. Bullish means bond prices rising and interest rates falling; bearish means the opposite. Read it like a dial: needle right of the top is bullish, left is bearish.',
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
  var CK_ITEMS = {}, CK_OPEN = null;   // CK_OPEN: which cockpit section is open (bull, voters, stress or none)

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
  // Bull / Bear dial: −100 (bear) at lower-left, 0 at the top, +100 (bull) at lower-right, same build as the stress dials
  var ckBBAng = function (v) { return Math.max(-100, Math.min(100, v)) * 1.35; };
  function ckBBDial(score, lo, hi) {
    var z = ckArc(84, ckBBAng(-100), ckBBAng(-20.5), BEAR, 5) + ckArc(84, ckBBAng(-19.5), ckBBAng(19.5), '#6B6F76', 5) + ckArc(84, ckBBAng(20.5), ckBBAng(100), BULL, 5);
    var nums = [[-50, '−50'], [0, '0'], [50, '+50']].map(function (n) {
      var p = ckPt(53, ckBBAng(n[0])); return ckLabel(p[0], (+p[1] + 5.5).toFixed(2), n[1], 15);
    }).join('');
    var e1 = ckPt(52, ckBBAng(-83)), e2 = ckPt(52, ckBBAng(83));
    var col = bullColor(score);
    return '<circle cx="100" cy="100" r="84" fill="url(#p75ckDial)" stroke="#05060A" stroke-width="2"/>' + z + ckTicks(-135, 135, 13.5, 5) + nums +
      ckLabel(e1[0], (+e1[1] + 4).toFixed(2), lo || 'BEAR', 11, BEAR) + ckLabel(e2[0], (+e2[1] + 4).toFixed(2), hi || 'BULL', 11, BULL) +
      '<rect x="70" y="126" width="60" height="30" rx="4" fill="#05060A" stroke="#44474E"/>' +
      '<text x="100" y="148" text-anchor="middle" font-size="21" font-weight="700" font-family="ui-monospace,Menlo,Consolas,monospace" fill="' + col + '">' + signedInt(score) + '</text>';
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
    '<linearGradient id="p75ckSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A5BD6"/><stop offset="100%" stop-color="#27B8FF"/></linearGradient>' +
    '<linearGradient id="p75ckGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7A4E26"/><stop offset="100%" stop-color="#4A2E14"/></linearGradient>' +
    '</defs></svg>';

  function ckButton(key, aria, svgInner, mover, label, extraClass) {
    return '<button type="button" class="ck-i' + (extraClass ? ' ' + extraClass : '') + '" data-ck="' + key + '" aria-pressed="false" aria-label="' + esc(aria).replace(/"/g, '&quot;') + '">' +
      '<svg viewBox="0 0 200 200" aria-hidden="true">' + ckBezel() + svgInner + (mover === 'needle' ? '<g class="ck-n">' + CK_NEEDLE + '</g>' + CK_CAP : '') + '</svg>' + label +
      '<span class="ck-tap" aria-hidden="true"><span class="a">What it means ›</span><span class="b">Showing ▸</span></span></button>';
  }
  // A collapsible row: title on the left, its headline reading on the right, a round arrow; the body opens below it
  function ckSec(k, title, sum) {
    var on = CK_OPEN === k;
    return '<section class="ck-sec"><button type="button" class="ck-tg" data-ck-sec="' + k + '" aria-expanded="' + on + '" aria-controls="cks-' + k + '">' +
      '<span class="ck-h">' + title + '</span><span class="ck-sum">' + sum + '</span><span class="ck-car" aria-hidden="true"></span></button>' +
      '<div class="ck-body" id="cks-' + k + '"' + (on ? '' : ' hidden') + '><p class="ck-hint"><i aria-hidden="true"></i>' + (CK_HINT[k] || 'Tap any dial to swing its needle and see what it means.') + '</p>';
  }
  var CK_HINT = {
    pl_money: 'Tap a row to see what it means. Each dial shows where today sits against its past year.',
    pl_plumb: 'Tap a row to see what it means. Each dial shows where today sits against its past year.',
    pl_long: 'Tap a row to see what it means. Each dial shows where today sits against its past year.',
    a_meter: 'Each recent auction votes: strong +1, average 0, weak −1. The needle is the average × 100.',
    a_recent: 'On each gauge the gold notch is the average of the last six auctions of that maturity. Blue beat it, Red fell short.',
    a_up: 'The next auctions on the Treasury’s calendar.'
  };
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

    CK_ITEMS.bull = { mover: 'bb', target: score, name: 'Bull / Bear score', sub: 'Now ' + signedInt(score) + (b.label ? ' · ' + b.label.toLowerCase() : ''),
      what: CK_TEXT.bull.what, now: line, care: CK_TEXT.bull.care };
    var sec = ckSec;
    var pill = function (n, word, col) { return '<span class="ck-pill" style="color:' + col + ';border-color:' + col + '66;box-shadow:0 0 10px ' + col + '22"><b>' + n + '</b>' + word + '</span>'; };
    var h = CK_DEFS + '<div class="ck' + (CK_OPEN ? ' ck-on' : '') + '"><div class="ck-main">' +
      sec('bull', 'Bull / Bear vote', '<b style="color:' + bc + '">' + signedInt(score) + '</b><span class="w" style="color:' + bc + '">' + word + '</span>') +
      '<div class="ck-bb">' +
      ckButton('bull', 'Bull / Bear score ' + signedInt(score) + ', ' + (b.label || '') + '. Show what it means.', ckBBDial(score), 'needle',
        '<div class="ck-nm">Bull / Bear score</div><div class="ck-v"><b style="color:' + bc + '">' + signedInt(score) + '</b><span class="ck-chip" style="background:' + bc + '">' + word + '</span></div>', 'ck-att') +
      '<div class="ck-votes"><div class="ck-pills">' + pill(nb, '▲ Bull', BULL) + pill(nh, '• Hold', '#C2BCAF') + pill(nr, '▼ Bear', BEAR) + '</div>' +
        '<p class="ck-how1">Each signal votes <b style="color:' + BULL + '">+1</b>, <b style="color:#E4DED1">0</b> or <b style="color:' + BEAR + '">−1</b>, and the score is the average × 100. Bull means bond prices up and rates down; bear is the opposite.</p></div>' +
      '</div></div></section>' +
      sec('voters', 'The ' + (votes.length === 6 ? 'six' : votes.length) + ' voters',
        '<span style="color:' + BULL + '">' + nb + ' bull</span> · ' + nh + ' hold · <span style="color:' + BEAR + '">' + nr + ' bear</span>') +
      '<div class="ck-grid">';

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
    h += '</div></div></section>' +
      sec('stress', 'Stress monitor', '<b style="color:' + scol + '">' + sc + '</b><span class="w" style="color:' + scol + '">' + esc(s.label || CK_STRESS_WORD(sc)) + '</span>') +
      '<div class="ck-grid">' +
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
    h += '</div><div class="note">' + esc(s.note || '') + '</div></div></section></div>' +
      '<aside class="ck-mfdw" aria-live="polite"><div class="ck-mfd" data-ck-mfd></div></aside></div>';
    return h;
  }

  function ckApply(btn, it, val) {
    if (it.mover === 'horizon') { var hz = btn.querySelector('.ck-hz'); if (hz) hz.style.transform = 'translateY(' + (val * 0.5).toFixed(1) + 'px)'; return; }
    var n = btn.querySelector('.ck-n'); if (!n) return;
    var deg = it.mover === 'vote' ? -90 + val * 1.7 : it.mover === 'bb' ? ckBBAng(val) : ckStressAng(val);
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
      (it.src ? '<div class="gl">Source: ' + esc(it.src) + '</div>' : '') +
      '<div style="display:flex;flex-wrap:wrap;gap:10px"><button type="button" data-ck-replay="' + key + '">REPLAY NEEDLE</button><button type="button" class="bk" data-ck-back="' + key + '">↑ BACK TO THE PANEL</button></div>';
  }
  // ---------- Phone bottom sheet for the info screen ----------
  // Tap a gauge: the needle swings and the explanation slides up over the lower part of the screen.
  // The tapped gauge is nudged into the clear space above, so the reader never loses their place.
  // Close with ×, a tap above the sheet, a swipe down or Escape; ← → (or a sideways swipe) step through the gauges.
  var SH = { el: null, host: null, key: null, play: null };
  function ckPhone() { return window.innerWidth <= 880; }
  function ckKeys(host) { return [].map.call(host.querySelectorAll('.ck-i[data-ck]'), function (b) { return b.getAttribute('data-ck'); }); }
  function ckSheet() {
    if (SH.el && document.body.contains(SH.el)) return SH.el;
    var s = document.createElement('div');
    s.className = 'p75ck-sheet'; s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<div class="sh-bd" data-sh-close></div>' +
      '<div class="sh" role="dialog" aria-modal="true" aria-label="What this gauge means">' +
        '<div class="sh-hd"><div class="sh-grab" aria-hidden="true"></div><div class="sh-bar">' +
          '<button type="button" data-sh-step="-1" aria-label="Previous gauge">&larr;</button><span class="sh-pos"></span>' +
          '<button type="button" data-sh-step="1" aria-label="Next gauge">&rarr;</button>' +
          '<button type="button" data-sh-close data-sh-x aria-label="Close">&times;</button></div></div>' +
        '<div class="sh-body"><div class="sh-dial" aria-hidden="true"></div><div class="ck-mfd" aria-live="polite"></div></div></div>';
    document.body.appendChild(s);
    SH.el = s;
    s.addEventListener('click', function (e) {
      if (e.target.closest('[data-sh-close]')) { ckSheetClose(); return; }
      var st = e.target.closest('[data-sh-step]'); if (st) { ckSheetStep(+st.getAttribute('data-sh-step')); return; }
      var r = e.target.closest('[data-ck-replay]'); if (r && SH.play) SH.play(r.getAttribute('data-ck-replay'), false);
    });
    // Swipe down on the handle bar to close
    var hd = s.querySelector('.sh-hd'), sh = s.querySelector('.sh'), y0 = null, dy = 0;
    hd.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; dy = 0; sh.style.transition = 'none'; }, { passive: true });
    hd.addEventListener('touchmove', function (e) { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); sh.style.transform = 'translateY(' + dy + 'px)'; }, { passive: true });
    hd.addEventListener('touchend', function () { sh.style.transition = ''; sh.style.transform = ''; y0 = null; if (dy > 70) ckSheetClose(); });
    // Swipe sideways on the text to move to the previous / next gauge
    var body = s.querySelector('.sh-body'), sx = null, sy = null;
    body.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    body.addEventListener('touchend', function (e) {
      if (sx == null) return;
      var t = e.changedTouches[0], dx = t.clientX - sx, dv = t.clientY - sy; sx = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > 2 * Math.abs(dv)) ckSheetStep(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', function (e) {
      if (!s.classList.contains('open')) return;
      if (e.key === 'Escape') ckSheetClose();
      else if (e.key === 'ArrowRight') ckSheetStep(1);
      else if (e.key === 'ArrowLeft') ckSheetStep(-1);
    });
    window.addEventListener('resize', function () { if (s.classList.contains('open') && !ckPhone()) ckSheetClose(); });
    window.addEventListener('hashchange', ckSheetClose);
    return s;
  }
  function ckSheetOpen(host, key, it, bt, play) {
    var s = ckSheet(), keys = ckKeys(host), was = s.classList.contains('open');
    SH.host = host; SH.key = key; SH.play = play;
    ckScreen(s.querySelector('.ck-mfd'), it, key);
    s.querySelector('.sh-pos').textContent = (keys.indexOf(key) + 1) + ' of ' + keys.length;
    s.querySelector('.sh-body').scrollTop = 0;
    if (!was) {
      s.classList.add('open'); s.setAttribute('aria-hidden', 'false');
      var x = s.querySelector('[data-sh-x]'); if (x) x.focus({ preventScroll: true });
    }
    // Keep the tapped dial visible in the space above the sheet, measured from the sheet's real height
    var tb = document.querySelector('.top-blocks--sticky'), bar = host.querySelector('.tabs');
    var top = (tb ? tb.getBoundingClientRect().height : 0) + (bar ? bar.getBoundingClientRect().height : 0) + 8;
    var dv = bt.querySelector('svg') || bt, r = dv.getBoundingClientRect(), room = window.innerHeight - s.querySelector('.sh').offsetHeight - 8;
    if (r.top < top || r.bottom > room) {
      var want = r.top + window.pageYOffset - top - Math.max(0, (room - top - r.height) / 2);
      window.scrollTo({ top: Math.max(0, want), behavior: 'smooth' });
    }
  }
  function ckSheetStep(d) {
    if (!SH.host || !SH.play) return;
    var keys = ckKeys(SH.host), i = keys.indexOf(SH.key); if (i < 0 || !keys.length) return;
    SH.play(keys[(i + d + keys.length) % keys.length], false);
  }
  function ckSheetClose() {
    var s = SH.el; if (!s || !s.classList.contains('open')) return;
    s.classList.remove('open'); s.setAttribute('aria-hidden', 'true');
    var bt = SH.host && SH.host.querySelector('.ck-i[data-ck="' + SH.key + '"]');
    if (bt) bt.focus({ preventScroll: true });   // back on the gauge you were reading about, page not moved
  }

  function wireCockpit(host) {
    var box = host.querySelector('[data-ck-mfd]');   // the info screen (Signals only; Auctions has sections but no screen)
    var btns = host.querySelectorAll('.ck-i[data-ck]');
    if (box) ckScreen(box, null);
    var ckTop = function () {   // keep the sticky info screen clear of the site's sticky header, whatever its height
      var tb = document.querySelector('.top-blocks--sticky');
      var bar = host.querySelector('.tabs');   // the sticky tab bar sits under the header too
      host.style.setProperty('--tabs-top', (tb ? Math.round(tb.getBoundingClientRect().height) : 0) + 'px');
      host.style.setProperty('--ck-top', ((tb ? tb.getBoundingClientRect().height : 0) + (bar ? bar.getBoundingClientRect().height : 0) + 14) + 'px');
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
      bt.querySelectorAll('.p75n').forEach(function (n) {
        n.style.transition = 'none'; n.style.transform = 'rotate(' + (n.getAttribute('data-r') || 0) + 'deg)'; void n.getBoundingClientRect();
        n.style.transition = ''; setTimeout(function () { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; }, 120);
      });
      if (ckPhone()) {   // phones: explanation slides up from the bottom, with its own copy of the dial so the needle is always in view
        ckSheetOpen(host, key, it, bt, play);
        var sd = SH.el && SH.el.querySelector('.sh-dial'), row = bt.querySelector('.ac-m'), sv = row || bt.querySelector('svg');
        if (sd && sv) {
          sd.innerHTML = sv.outerHTML; sd.classList.toggle('wide', !!row);
          var smv = sd.querySelector('.ck-n, .ck-hz');
          if (smv) {
            smv.classList.add('ck-snap'); ckApply(sd, it, 0); void smv.getBoundingClientRect();
            requestAnimationFrame(function () { smv.classList.remove('ck-snap'); setTimeout(function () { ckApply(sd, it, it.target); }, 250); });
          }
          sd.querySelectorAll('.p75n').forEach(function (n) {
            n.style.transition = 'none'; n.style.transform = 'rotate(' + (n.getAttribute('data-r') || 0) + 'deg)'; void n.getBoundingClientRect();
            n.style.transition = ''; setTimeout(function () { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; }, 250);
          });
        }
      }
    }
    // Open one section at a time. Opening one shows the info screen beside it, swings that section's needles
    // and (on wider screens) puts its first instrument on the info screen so it is never blank.
    function toggle(k) {
      var ck = host.querySelector('.ck'); if (!ck) return;
      CK_OPEN = CK_OPEN === k ? null : k;
      ck.querySelectorAll('.ck-tg').forEach(function (t) {
        var on = t.getAttribute('data-ck-sec') === CK_OPEN, body = host.querySelector('#cks-' + t.getAttribute('data-ck-sec'));
        t.setAttribute('aria-expanded', on ? 'true' : 'false'); if (body) body.hidden = !on;
      });
      ck.classList.toggle('ck-on', !!CK_OPEN && !!(host.querySelector('#cks-' + CK_OPEN + ' .ck-i[data-ck]')));
      if (!CK_OPEN) return;
      var body = host.querySelector('#cks-' + CK_OPEN), first = body && body.querySelector('.ck-i[data-ck]');
      if (body) body.querySelectorAll('.ck-i[data-ck]').forEach(function (bt) {
        var it = CK_ITEMS[bt.getAttribute('data-ck')], mv = bt.querySelector('.ck-n, .ck-hz'); if (!it) return;
        if (mv) mv.classList.add('ck-snap'); ckApply(bt, it, 0); if (mv) void mv.getBoundingClientRect();
        requestAnimationFrame(function () { if (mv) mv.classList.remove('ck-snap'); setTimeout(function () { ckApply(bt, it, it.target); }, 450); });
      });
      if (body) { body.classList.remove('go'); void body.offsetWidth; setTimeout(function () { body.classList.add('go'); }, 450); }   // fill arcs grow with the needles
      if (body) body.querySelectorAll('.p75n, .ck-n[data-a]').forEach(function (n) {   // plain dials: back to rest, then sweep
        n.style.transition = 'none'; n.style.transform = 'rotate(' + (n.getAttribute('data-r') || 0) + 'deg)'; void n.getBoundingClientRect();
        n.style.transition = ''; setTimeout(function () { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; }, 450);
      });
      if (first && !ckPhone()) play(first.getAttribute('data-ck'), false);
      if (body && !body.getAttribute('data-nudged')) {   // first time a section opens, the dials glow twice to say "tap me"
        body.setAttribute('data-nudged', '1');
        setTimeout(function () { body.querySelectorAll('.ck-i[aria-pressed="false"]').forEach(function (bt) { bt.classList.add('ck-nudge'); }); }, 900);
        setTimeout(function () { body.querySelectorAll('.ck-nudge').forEach(function (bt) { bt.classList.remove('ck-nudge'); }); }, 3400);
      }
    }
    host.addEventListener('click', function (e) {
      var tg = e.target.closest('.ck-tg[data-ck-sec]'); if (tg) { toggle(tg.getAttribute('data-ck-sec')); return; }
      var r = e.target.closest('[data-ck-replay]'); if (r) { play(r.getAttribute('data-ck-replay'), false); return; }
      var k = e.target.closest('[data-ck-back]');
      if (k) { var t = host.querySelector('.ck-i[data-ck="' + k.getAttribute('data-ck-back') + '"]'); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); t.focus({ preventScroll: true }); } return; }
      var bt = e.target.closest('.ck-i[data-ck]'); if (bt) play(bt.getAttribute('data-ck'), true);
    });
  }

  // ---------- Page ----------
  function page(j) {
    var g = j.gauges || {}, b = g.bull || {}, s = g.stress || {};
    var h = '<div class="wrap"><div class="hd"><div class="hd-t"><span class="eyebrow">Pulse</span><h1>The Bond Market’s Vital Signs</h1>' +
      '<div class="asof">Updated <b>' + new Date(j.generated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }) +
      '</b> · refreshed hourly on weekdays</div></div>' +
      '<p class="lede">Two readings, taken from where real money moves: Treasury auctions, futures positioning, dealer balance sheets, overnight funding, the term premium and rate swings. No opinions, no chatter.</p></div>';

    // instruments: two dials, each with its reading and a short note beside it; the Signals tab has the detail
    var bc = bullColor(b.score), sc = s.score != null ? Math.round(s.score) : null, scol = stressColor(sc);
    h += '<div class="inst">' +
      '<div class="card"><h3>Bull / Bear</h3><div class="meter">' +
        (b.score != null ? '<div class="dial">' + bullDial(b.score) + '</div>' : '') +
        '<div class="reading"><div class="big num" style="color:' + bc + '">' + (b.score > 0 ? '+' : '') + (b.score != null ? b.score : '–') + '</div>' +
        '<div class="verdict" style="color:' + bc + '">' + esc(b.label || 'No reading') + '</div>' +
        '<div class="hint"><b style="color:' + BULL + '">Blue</b> is bullish for bonds: prices up, yields down. <b style="color:' + BEAR + '">Red</b> is bearish: prices down, yields up. The needle runs from −100 to +100.</div></div></div>' +
      '</div>' +
      '<div class="card"><h3>Stress monitor</h3><div class="meter">' +
        (sc != null ? '<div class="dial">' + stressDial(sc, s.label) + '</div>' : '') +
        '<div class="reading"><div class="big num" style="color:' + scol + '">' + (sc != null ? sc : '–') + '<small>/100</small></div>' +
        '<div class="verdict" style="color:' + scol + '">' + esc(s.label || (sc != null ? CK_STRESS_WORD(sc) : 'No reading')) + '</div>' +
        '<div class="hint">How much strain the bond market is under, from rate swings, funding, dealer balance sheets and auction demand. 0 is calm, 100 is panic.</div></div></div>' +
      '</div>' +
      '</div>';

    // Folded strip: once a tab is picked, the header and dials fold into this one line; the arrow brings them back
    var strip = '<button type="button" class="fold" data-unfold aria-label="Show the full readings and dials">' +
      '<span class="eyebrow">Pulse</span>' +
      '<span class="fi"><small>Bull / Bear</small><b style="color:' + bc + '">' + (b.score > 0 ? '+' : '') + (b.score != null ? b.score : '–') + '</b><em style="color:' + bc + '">' + esc(b.label || '') + '</em></span>' +
      '<span class="fi"><small>Stress</small><b style="color:' + scol + '">' + (sc != null ? sc : '–') + '</b><em style="color:' + scol + '">' + esc(s.label || (sc != null ? CK_STRESS_WORD(sc) : '')) + '</em></span>' +
      '<span class="fo"><span class="fo-t">Show dials</span><span class="fo-c" aria-hidden="true"></span></span></button>';
    var head = '<div class="top"><div>' + h.replace('<div class="wrap">', '') + '</div></div><div class="fstrip"><div>' + strip + '</div></div>';
    h = '';
    // why: the cockpit, one instrument per signal (see Cockpit above)
    h += '<h2>Why the needles are where they are</h2><p class="sub">Every signal behind the two gauges, as its own instrument, with the rule it follows. Nothing is hidden in a black box.</p>' +
      cockpit(b, s);

    var SEC = { why: h }; h = '';
    // auctions
    var a = j.auctions;
    if (a && a.recent && a.recent.length) {
      // Demand meter: each auction votes Strong +1, Average 0, Weak −1; the meter is the average × 100
      var GV = { strong: 1, average: 0, weak: -1 }, gn = { strong: 0, average: 0, weak: 0 }, gsum = 0;
      a.recent.forEach(function (r) { gn[r.grade] = (gn[r.grade] || 0) + 1; gsum += GV[r.grade] || 0; });
      var dm = Math.round(gsum / a.recent.length * 100);
      var dword = dm >= 34 ? 'Buyers are hungry' : dm >= 10 ? 'Healthy appetite' : dm > -10 ? 'Steady demand' : dm > -34 ? 'Appetite is thinning' : 'Buyers are scarce';
      var dcol = dm >= 10 ? BULL : dm <= -10 ? BEAR : '#C2BCAF';
      var gcol = { strong: BULL, weak: BEAR, average: '#C2BCAF' };
      var apill = function (n, w, c) { return '<span class="ck-pill" style="color:' + c + ';border-color:' + c + '66;box-shadow:0 0 10px ' + c + '22"><b>' + n + '</b>' + w + '</span>'; };
      // one mini gauge: gold notch = average of the last six auctions; needle left or right of it = this auction
      var gauge = function (v, avg, span, good, fmt, name) {
        var better = good > 0 ? v >= avg : v <= avg, c = Math.abs(v - avg) < span * .04 ? '#C2BCAF' : better ? BULL : BEAR;
        return '<div class="am">' + dial({ v: v, min: avg - span, max: avg + span, rest: avg, from: avg - span, notch: avg, color: c,
            aria: name + ' ' + fmt(v) + ', average ' + fmt(avg) }) +
          '<b class="mv" style="color:' + c + '">' + fmt(v) + '</b><span class="mn">' + name + '</span><span class="ma">avg ' + fmt(avg) + '</span></div>';
      };
      var x2 = function (v) { return v.toFixed(2) + '×'; }, pc = function (v) { return v.toFixed(0) + '%'; };
      var today = new Date(); today.setHours(12, 0, 0, 0);
      var inDays = function (d) { var n = Math.round((new Date(String(d).slice(0, 10) + 'T12:00:00') - today) / 864e5); return n <= 0 ? 'today' : n === 1 ? 'tomorrow' : 'in ' + n + ' days'; };

      var nx = a.upcoming && a.upcoming.length ? a.upcoming[0] : null;
      h += '<h2>Who’s buying the debt?</h2><p class="sub">Every Treasury auction, graded against the last six of the same maturity: how many bids came in, who won the bonds, and how much the dealers were left holding.</p>' +
        '<div class="ck auc"><div class="ck-main">' +
        ckSec('a_meter', 'Demand meter', '<b style="color:' + dcol + '">' + signedInt(dm) + '</b><span class="w" style="color:' + dcol + '">' + dword + '</span>') +
          '<button type="button" class="ck-i auc-meter" data-ck="a_dm" aria-pressed="false" aria-label="Demand meter ' + signedInt(dm) + ', ' + dword + '. Show what it means."><svg viewBox="0 0 200 200" aria-hidden="true">' + ckBezel() + ckBBDial(dm, 'WEAK', 'STRONG') +
            '<g class="ck-n" data-a="' + ckBBAng(dm).toFixed(1) + '" data-r="-135" style="transform-origin:100px 100px;transform:rotate(-135deg)">' + CK_NEEDLE + '</g>' + CK_CAP + '</svg>' +
            '<div class="auc-mt"><div class="auc-w" style="color:' + dcol + '">' + dword + '</div>' +
            '<div class="ck-pills">' + apill(gn.strong, '▲ Strong', BULL) + apill(gn.average, '• Average', '#C2BCAF') + apill(gn.weak, '▼ Weak', BEAR) + '</div>' +
            '<p class="ck-how1">Strong means more bids per bond and less left with the dealers. Foreign and fund buyers show up as “indirect” bidders.</p>' + '<span class="ck-tap" aria-hidden="true"><span class="a">What it means ›</span><span class="b">Showing ▸</span></span>' + '</div></button>' +
        '</div></section>' +
        ckSec('a_recent', 'Recent auctions', '<span style="color:' + BULL + '">' + gn.strong + ' strong</span> · ' + gn.average + ' average · <span style="color:' + BEAR + '">' + gn.weak + ' weak</span>') +
        '<div class="ac-grid">' + a.recent.map(function (r) {
          var gc = gcol[r.grade] || '#C2BCAF', ri = a.recent.indexOf(r), nm = r.term.replace(' ', '-');
          var cmp = function (v, avg, good, f) { var better = good > 0 ? v >= avg : v <= avg, same = Math.abs(v - avg) / (avg || 1) < .02; return f(v) + ' vs ' + f(avg) + ' average (' + (same ? 'about the same' : better ? 'better' : 'worse') + ')'; };
          CK_ITEMS['a_r' + ri] = { mover: 'none', target: 0, name: nm + ' auction', sub: fmtDate(r.date, true) + ' · $' + r.size_bn + 'bn · graded ' + r.grade,
            what: 'Each auction is graded against the last six of the same maturity on three things: bids per dollar sold (more is better), the share won by foreign and fund buyers (more is better), and the share left with the big bank dealers (less is better).',
            now: 'Bids per $1: ' + cmp(r.btc, r.avg_btc, 1, x2) + '. Foreign buyers: ' + cmp(r.indirect, r.avg_indirect, 1, pc) + '. Dealers kept: ' + cmp(r.dealer, r.avg_dealer, -1, pc) + '. It sold at a ' + r.high_yield.toFixed(3) + '% yield' + (r.reopening ? ', as a reopening of an existing bond.' : '.'),
            care: r.grade === 'strong' ? 'Plenty of demand: the Treasury sold this debt easily, which helps keep yields and loan rates in check.' : r.grade === 'weak' ? 'Buyers were scarce, so dealers had to absorb more and the Treasury paid up. Weak auctions can push yields, and loan rates, higher.' : 'Demand was in line with recent auctions of this maturity, so no signal either way.' };
          return '<button type="button" class="ck-i ac" data-ck="a_r' + ri + '" aria-pressed="false" aria-label="' + esc(nm + ' auction, graded ' + r.grade + '. Show what it means.') + '" style="border-top-color:' + gc + '">' +
            '<div class="ac-h"><b class="ac-t">' + esc(r.term.replace(' ', '-')) + '</b>' + (r.reopening ? '<span class="ac-r">reopening</span>' : '') +
              '<span class="ac-g" style="color:' + gc + ';border-color:' + gc + '88;background:' + gc + '14">' + esc(r.grade.charAt(0).toUpperCase() + r.grade.slice(1)) + '</span></div>' +
            '<div class="ac-d">' + fmtDate(r.date, true) + ' · $' + r.size_bn + 'bn · sold at ' + r.high_yield.toFixed(3) + '%</div>' +
            '<div class="ac-m">' +
              gauge(r.btc, r.avg_btc, .6, 1, x2, 'Bids per $1') +
              gauge(r.indirect, r.avg_indirect, 15, 1, pc, 'Foreign buyers') +
              gauge(r.dealer, r.avg_dealer, 12, -1, pc, 'Dealers kept') +
            '</div>' + '<span class="ck-tap" aria-hidden="true"><span class="a">What it means ›</span><span class="b">Showing ▸</span></span>' + '</button>';
        }).join('') + '</div>' +
        '<div class="note">Bids per $1: dollars bid for each dollar sold. Foreign buyers: the share won by “indirect” bidders, mostly foreign buyers and funds. Dealers kept: what the big banks had to take because nobody else wanted it (lower is better). Source: U.S. Treasury, Fiscal Data. Nominal notes and bonds only.</div>' +
        '</div></section>' +
        (nx ? ckSec('a_up', 'Coming up', 'Next: <b style="font-family:Manrope,sans-serif;font-size:14px;color:#fff">' + esc(nx.label) + '</b> <span style="color:var(--gold)">' + inDays(nx.date) + '</span>') +
          '<ol class="auc-up">' + a.upcoming.map(function (u) {
            return '<li><span class="ud">' + fmtDate(u.date) + '</span><b>' + esc(u.label) + '</b><span class="us">' + (u.size_bn ? '$' + u.size_bn + 'bn' : '') + '</span><span class="ui">' + inDays(u.date) + '</span></li>';
          }).join('') + '</ol></div></section>' : '') +
        '</div><aside class="ck-mfdw" aria-live="polite"><div class="ck-mfd" data-ck-mfd></div></aside></div>';
      CK_ITEMS.a_dm = { mover: 'bb', target: dm, name: 'Demand meter', sub: 'Now ' + signedInt(dm) + ' · ' + dword.toLowerCase(),
        what: 'How hungry buyers are at Treasury auctions. Each recent auction is graded against the last six of the same maturity: strong counts +1, average 0 and weak −1, and the needle shows the average × 100.',
        now: gn.strong + ' of the last ' + a.recent.length + ' auctions were strong, ' + gn.average + ' average and ' + gn.weak + ' weak, which adds up to ' + signedInt(dm) + ': ' + dword.toLowerCase() + '.',
        care: 'When auctions go well the government borrows cheaply, and mortgage and loan rates tend to stay lower. A run of weak auctions pushes yields up.' };
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
    // Gauge board: one slim row per reading. Mini dial = where today sits against its past year;
    // tap a row and the info screen explains it (the long notes and sources live there now).
    var rows = [];
    var pctOf = function (hist, v) { if (!hist || !hist.length) return null; var n = 0; hist.forEach(function (x) { if (x.value <= v) n++; }); return Math.round(n / hist.length * 100); };
    var yr = function (pc, word) { pc = Math.round(pc); return pc >= 99 ? 'highest in a year' : pc <= 1 ? 'lowest in a year' : word + ' than ' + pc + '% of year'; };
    var ord = function (n) { var k = n % 100; return n + (k > 10 && k < 14 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' })[n % 10] || 'th'); };
    var NEON = function (pc) { return pc < 30 ? '#2BFF88' : pc < 55 ? '#D8FF3D' : pc < 75 ? '#FFB224' : '#FF3D5E'; };
    var addRow = function (grp, key, o) {   // o: name, short, value, change, changeColor, pct, bad (+1 high is bad, −1 high is good, 0 neutral), hist, color, fmt, what, care, src
      var pc = o.pct == null ? null : Math.max(0, Math.min(100, Math.round(o.pct)));
      var dc = pc == null ? NEUT : o.bad > 0 ? NEON(pc) : o.bad < 0 ? NEON(100 - pc) : '#C8A8FF';
      CK_ITEMS[key] = { mover: 'none', target: 0, name: o.name, sub: o.value + ' · ' + o.change,
        what: o.what, now: o.value + ', ' + o.change + '.' + (pc != null && !/year/.test(o.change) ? ' That is ' + (pc >= 99 ? 'the highest reading of the past year.' : pc <= 1 ? 'the lowest reading of the past year.' : 'higher than ' + pc + '% of readings over the past year.') : ''), care: o.care, src: o.src };
      rows.push({ grp: grp, nm: o.name, pc: pc, bad: o.bad, dc: dc, sum: '<span style="color:' + dc + '">' + esc(o.tag || o.name) + ' ' + o.value + '</span>', html: '<button type="button" class="ck-i pl" data-ck="' + key + '" aria-pressed="false" aria-label="' + esc(o.name + ': ' + o.value + ', ' + o.change + '. Show what it means.').replace(/"/g, '&quot;') + '">' +
        '<span class="pl-d">' + (pc != null ? dial({ v: pc, min: 0, max: 100, rest: 0, from: 0, color: dc, aria: o.name + ' at the ' + ord(pc) + ' percentile of its past year' }) : '') +
          '<small>' + (pc != null ? ord(pc) + ' pct' : '') + '</small></span>' +
        '<span class="pl-n"><b>' + esc(o.name) + '</b><small>' + esc(o.short) + '</small></span>' +
        '<span class="pl-v"><b class="num" style="color:' + dc + '">' + o.value + '</b><small style="color:' + (o.changeColor === NEUT ? '#D6DAE0' : o.changeColor === BEAR ? '#FF3D5E' : o.changeColor === BULL ? '#1FE0FF' : o.changeColor) + '">' + o.change + '</small></span>' +
        '<span class="pl-s">' + spark(o.hist, o.color, o.fmt) + '</span>' +
        '<span class="pl-go" aria-hidden="true">›</span></button>' });
    };
    if (p) {
      var am = p.asset_managers, hf = p.hedge_funds;
      addRow('Big money', 'p_am', { tag: 'Asset mgrs', name: 'Asset managers', short: 'Pension & fund bets on Treasuries', value: bn(am.value), change: signed(am.change_4w, 0, 'bn') + ' in 4 wks', changeColor: am.change_4w >= 0 ? BULL : BEAR,
        pct: pctOf(am.history, am.value), bad: -1, hist: am.history, color: '#1FE0FF', fmt: bn,
        what: 'Pension and mutual-fund money, net long Treasury futures. These are real, patient buyers.', care: 'When this rises, real buyers are adding to bonds, which tends to support prices and keep rates lower.',
        src: 'CFTC, week of ' + fmtDate(am.date) + ', 10-year-note equivalent' });
      addRow('Big money', 'p_hf', { tag: 'Hedge funds', name: 'Hedge funds', short: 'Mostly the “basis trade”', value: bn(hf.value), change: signed(hf.change_4w, 0, 'bn') + ' in 4 wks', changeColor: NEUT,
        pct: pctOf(hf.history, hf.value), bad: 0, hist: hf.history, color: '#C8A8FF', fmt: bn,
        what: 'Mostly the “basis trade”: hedge funds short futures against bonds they own, so a big short position is normal.', care: 'The risk is a sudden unwind: if funds rush out together, they dump bonds and rates can jump.',
        src: 'CFTC, week of ' + fmtDate(hf.date) + ', 10-year-note equivalent' });
    }
    if (dl) addRow('Plumbing', 'p_dl', { tag: 'Dealers', name: 'Dealer inventory', short: 'Treasuries the big banks hold', value: '$' + Math.round(dl.value) + 'bn', change: signed(dl.change_4w_pct, 1, '%') + ' in 4 wks', changeColor: dl.change_4w_pct > 0 ? BEAR : BULL,
      pct: pctOf(dl.history, dl.value), bad: 1, hist: dl.history, color: '#FFD23F', fmt: function (v) { return '$' + Math.round(v) + 'bn'; },
      what: 'Treasuries the big bank dealers are holding on their own books.', care: 'Piling up means end buyers aren’t absorbing new supply, and full dealers have less room to calm a selloff.',
      src: 'NY Fed, week of ' + fmtDate(dl.date) });
    var fu = j.funding;
    if (fu) addRow('Plumbing', 'p_fu', { tag: 'Funding', name: 'Funding pressure', short: 'Overnight cash vs the Fed’s rate', value: signed(fu.spread_avg20_bp, 0, 'bp'), change: yr(fu.pct_1y, 'tighter'), changeColor: NEON(fu.pct_1y),
      pct: fu.pct_1y, bad: 1, hist: fu.history, color: NEON(fu.pct_1y), fmt: function (v) { return signed(v, 1, 'bp'); },
      what: 'The overnight repo rate (SOFR) minus what the Fed pays banks on reserves (IORB), 20-day average. Above zero means cash is scarce.',
      care: 'Smooth funding keeps banks lending. Bank reserves stand at $' + (fu.reserves.value / 1000).toFixed(2) + 'T' + (fu.srf && fu.srf.days_used_20d ? ', and banks tapped the Fed’s standing repo facility on ' + fu.srf.days_used_20d + ' of the last 20 days.' : '.'),
      src: 'FRED, NY Fed SOFR and Fed Board IORB, ' + fmtDate(fu.date) });
    if (r) addRow('Plumbing', 'p_rv', { tag: 'Vol', name: 'Rates volatility', short: 'Daily swing in the 10-year yield', value: r.vol.value.toFixed(1) + 'bp/day', change: yr(r.vol.pct_1y, 'higher'), changeColor: NEON(r.vol.pct_1y),
      pct: r.vol.pct_1y, bad: 1, hist: r.vol.history, color: NEON(r.vol.pct_1y), fmt: function (v) { return v.toFixed(1) + 'bp/day'; },
      what: 'How much the 10-year yield swings on a typical day (20-day average). The free cousin of the MOVE index.',
      care: 'Bumpy rates make lenders cautious, so mortgage quotes jump around and bond funds swing more.',
      src: 'FRED, 10-year at ' + r.yield.value.toFixed(2) + '% on ' + fmtDate(r.yield.date) });
    if (tp) addRow('The long end', 'p_tp', { tag: 'Term prem', name: 'Term premium', short: 'Extra pay for lending 10 years', value: tp.value.toFixed(2) + '%', change: signed(tp.change * 100, 0, 'bp') + ' in 4 wks', changeColor: tone(tp.change),
      pct: pctOf(tp.history, tp.value), bad: 1, hist: tp.history, color: '#3FFFE0', fmt: function (v) { return v.toFixed(2) + '%'; },
      what: 'The extra yield investors demand to lock money up for 10 years instead of rolling short-term bills.',
      care: 'A rising term premium means less trust in the long end, and it pushes up mortgage rates even if the Fed does nothing.',
      src: 'FRED, Fed Board (Kim-Wright), ' + fmtDate(tp.date) });
    if (be) addRow('The long end', 'p_be', { tag: 'Inflation', name: 'Inflation expectations', short: 'What the market expects for 10 years', value: be.value.toFixed(2) + '%', change: signed(be.change * 100, 0, 'bp') + ' in 4 wks', changeColor: tone(be.change),
      pct: pctOf(be.history, be.value), bad: 1, hist: be.history, color: '#E59BFF', fmt: function (v) { return v.toFixed(2) + '%'; },
      what: 'The inflation the bond market expects over the next 10 years: the breakeven between regular and inflation-protected Treasuries.',
      care: 'Higher expected inflation makes lenders demand more interest, which pushes long-term rates up.',
      src: 'FRED, ' + fmtDate(be.date) });
    if (rows.length) {
      var GK = { 'Big money': 'pl_money', 'Plumbing': 'pl_plumb', 'The long end': 'pl_long' }, order = [], by = {}, board = '';
      rows.forEach(function (x) { if (!by[x.grp]) { by[x.grp] = []; order.push(x.grp); } by[x.grp].push(x); });
      order.forEach(function (g) {
        board += ckSec(GK[g], g, by[g].map(function (x) { return x.sum; }).join('<span class="pl-sep">·</span>')) +
          '<div class="pl-rows">' + by[g].map(function (x) { return x.html; }).join('') + '</div></div></section>';
      });
      h += '<h2>The pros and the plumbing</h2><p class="sub">What big money is doing, and the stress points underneath. Each dial shows where today sits against its past year; tap a row to see what it means.</p>' +
        '<div class="ck' + (/^pl_/.test(CK_OPEN || '') ? ' ck-on' : '') + '"><div class="ck-main pl-board">' + board + '</div>' +
        '<aside class="ck-mfdw" aria-live="polite"><div class="ck-mfd" data-ck-mfd></div></aside></div>';
    }

    SEC.plumbing = h;

    // Takeaway: the whole of Pulse in one screen, written from the live numbers by simple rules
    (function () {
      var lc = function (x) { return String(x || '').toLowerCase(); };
      var list = function (xs) { return xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]; };
      var bsc = b.score != null ? b.score : null, ssc = s.score != null ? Math.round(s.score) : null;
      var lean = bsc == null ? '' : bsc >= 20 ? 'Bonds lean bullish, so rates are drifting lower' : bsc <= -20 ? 'Bonds lean bearish, so rates are drifting higher' : 'Bonds are on the fence';
      var sw = ssc == null ? '' : ssc < 30 ? 'calm' : ssc < 55 ? 'moderate' : ssc < 75 ? 'elevated' : 'high';
      var drv = (s.components || []).slice().sort(function (x, y) { return y.pct * y.weight - x.pct * x.weight; }).slice(0, 2).map(function (c) { return lc(c.name); });
      var C = function (txt, col) { return '<span class="hl" style="color:' + col + '">' + esc(txt) + '</span>'; };
      var leanH = bsc == null ? '' : bsc >= 20 ? 'Bonds lean ' + C('bullish', BULL) + ', so rates are drifting ' + C('lower', BULL) : bsc <= -20 ? 'Bonds lean ' + C('bearish', BEAR) + ', so rates are drifting ' + C('higher', BEAR) : 'Bonds are ' + C('on the fence', '#E6E2D8');
      var head = leanH + (sw ? (leanH ? ', and stress is ' : 'Stress is ') + C(sw, stressColor(ssc)) + (ssc >= 55 && drv.length ? ', mostly from ' + drv.map(function (d) { return C(d, '#FFB224'); }).join(' and ') : '') : '') + '.';
      if (typeof dword !== 'undefined' && dword) head += ' At Treasury auctions: ' + C(lc(dword), dcol) + '.';
      // the most extreme plumbing readings
      var hot = rows.filter(function (x) { return x.pc != null && x.bad && (x.bad > 0 ? x.pc : 100 - x.pc) >= 75; })
        .sort(function (x, y) { return (y.bad > 0 ? y.pc : 100 - y.pc) - (x.bad > 0 ? x.pc : 100 - x.pc); });
      var watch = hot.length ? C(hot[0].nm, hot[0].dc) + (hot[0].pc >= 99 ? ' is at its highest in a year' : hot[0].pc <= 1 ? ' is at its lowest in a year' : ' is higher than ' + hot[0].pc + '% of the past year') + '.' : '';
      var votes = b.votes || [], vb = [], vr = [];
      votes.forEach(function (v) { if (v.vote > 0) vb.push(lc(v.name)); else if (v.vote < 0) vr.push(lc(v.name)); });
      var card = function (key, tab, dialHtml, big, bigCol, word, line) {
        return '<a class="tk-c" href="#' + key + '" data-sec="' + key + '">' +
          '<span class="tk-h"><span class="ck-h">' + tab + '</span><span class="tk-go">See why ›</span></span>' +
          '<span class="tk-b">' + (dialHtml ? '<span class="tk-d">' + dialHtml + '</span>' : '') +
            '<span class="tk-t"><b style="color:' + bigCol + '">' + big + '</b>' + (word ? '<em style="color:' + bigCol + '">' + word + '</em>' : '') +
            '<span class="tk-l">' + line + '</span></span></span></a>';
      };
      var cards = '';
      if (bsc != null) cards += card('why', 'Signals', dial({ v: bsc, min: -100, max: 100, rest: 0, from: -100, color: bullColor(bsc), aria: 'Bull / Bear ' + signedInt(bsc) }),
        signedInt(bsc), bullColor(bsc), esc(b.label || ''),
        (vr.length ? C('Bear', BEAR) + ': ' + vr.map(function (v) { return C(v, BEAR); }).join(', ') + '. ' : '') + (vb.length ? C('Bull', BULL) + ': ' + vb.map(function (v) { return C(v, BULL); }).join(', ') + '. ' : '') +
        (votes.length - vr.length - vb.length) + ' of ' + votes.length + ' signals hold.' + (ssc != null && drv.length ? ' Stress ' + C(String(ssc), stressColor(ssc)) + ', led by ' + drv.map(function (d) { return C(d, '#FFB224'); }).join(' and ') + '.' : ''));
      if (typeof dm !== 'undefined') cards += card('auctions', 'Auctions', dial({ v: dm, min: -100, max: 100, rest: 0, from: -100, color: dcol, aria: 'Auction demand ' + signedInt(dm) }),
        signedInt(dm), dcol, esc(dword),
        C(gn.strong + ' strong', BULL) + ', ' + gn.average + ' average, ' + C(gn.weak + ' weak', BEAR) + ' of the last ' + a.recent.length + '.' +
        (a.recent[0] ? ' Latest: ' + esc(a.recent[0].term.replace(' ', '-')) + ', ' + C(a.recent[0].grade, gcol[a.recent[0].grade] || '#E6E2D8') + '.' : '') +
        (nx ? ' Next: ' + esc(nx.label) + ' ' + inDays(nx.date) + '.' : ''));
      if (rows.length) cards += card('plumbing', 'Plumbing', '',
        hot.length + '<small>/' + rows.length + '</small>', hot.length ? '#FF3D5E' : '#2BFF88', hot.length ? 'flashing' : 'all quiet',
        hot.length ? list(hot.slice(0, 3).map(function (x) { return C(x.nm, x.dc) + ' (' + (x.pc >= 99 ? 'year high' : x.pc + 'th pct') + ')'; })) + '.' : 'No reading is in the top quarter of its past year.');
      cards += card('wire', 'Live wire', '', '', '#fff', '', '<span class="tk-news" data-wire-top>Loading the latest headline…</span>');
      SEC.takeaway = '<h2>The takeaway</h2><p class="sub">Everything on this page in one screen, written from today’s readings. Tap a card for the detail behind it.</p>' +
        '<div class="tk"><p class="tk-head">' + head + '</p>' +
        (watch ? '<p class="tk-watch"><i aria-hidden="true"></i><span><b>Watch:</b> ' + watch + '</span></p>' : '') +
        '<div class="tk-grid">' + cards + '</div></div>';
    })();
    SEC.wire = '<h2>Live wire</h2><p class="sub wire-sub">The latest bond, central-bank and macro headlines. Updated daily.</p><div class="wire" data-wire>Loading headlines…</div>';
    var dt = '<a class="dtlink" href="/debt-trap"><span>Next</span><b>The debt trap</b> How much U.S. debt has to be refinanced, what it costs and who is still buying it &rarr;</a>';

    var view = location.hash.slice(1), live = SECTIONS.filter(function (x) { return SEC[x.key]; });
    var cur = live.filter(function (x) { return x.key === view; })[0] || live[0];
    h = '<div class="wrap">' + head + '<nav class="tabs" role="tablist" aria-label="Pulse views">' + live.map(function (x) {
      var on = x.key === cur.key;
      return '<a role="tab" class="tab' + (on ? ' on' : '') + '" href="#' + x.key + '" data-sec="' + x.key + '" aria-selected="' + on + '"' + (on ? ' aria-current="page"' : '') + '>' + x.tab + '</a>';
    }).join('') + '</nav><div class="view" role="tabpanel" aria-label="' + esc(cur.tab) + '">' +
      (FROM_TK && cur.key !== 'takeaway' ? '<a class="tk-back" href="#takeaway" data-sec="takeaway"><span aria-hidden="true">←</span> Back to the takeaway</a>' : '') +
      SEC[cur.key] + '</div>' + dt;

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
    var tk = host.querySelector('.tk');   // takeaway: sweep its dials once the page settles
    if (tk) setTimeout(function () { requestAnimationFrame(function () {
      tk.classList.add('go');
      tk.querySelectorAll('.p75n').forEach(function (n) { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; });
    }); }, 650);
    var inst = host.querySelector('.inst'); if (!inst) return;
    setTimeout(function () { requestAnimationFrame(function () {   // a short pause so the eye lands first
      inst.classList.add('on');
      inst.querySelectorAll('.p75n').forEach(function (n) { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; });
    }); }, 650);
  }

  var FOLD = !!location.hash.slice(1), FOLD_ANIM = false, FROM_TK = false;   // header and dials folded into the strip?
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
    host.innerHTML = '<div class="wrap"><div class="eyebrow">Pulse</div><h1>The Bond Market’s Vital Signs</h1><div class="load">Taking the market’s pulse…</div></div>';
    var blocks = main.querySelector('.page__blocks');
    (blocks || main).appendChild(host);
    // The Hostinger page keeps an empty section (it only holds the embed); left alone it shows as a tall blank band
    // above Pulse. Hide any section with nothing visible in it; clear() puts them back.
    if (blocks) [].forEach.call(blocks.children, function (sec) {
      if (sec.tagName !== 'SECTION' || (sec.innerText || '').trim() || sec.querySelector('img, iframe, video, canvas, svg, form')) return;
      sec.setAttribute('data-p75pulse-hid', '1'); sec.style.display = 'none';
    });
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.gauges) { host.querySelector('.load').textContent = 'Pulse data is unavailable right now. Please try again shortly.'; return; }
      draw(host, j);
      host.addEventListener('click', function (e) {
        if (e.target.closest('[data-unfold]')) {   // the down arrow: bring the full readings back
          FOLD = false; host.classList.remove('folded');
          window.scrollTo({ top: Math.max(0, host.getBoundingClientRect().top + window.pageYOffset - tabsTop() - 8), behavior: 'smooth' });
          return;
        }
        var a = e.target.closest('a[data-sec]'); if (!a) return;
        if (!FOLD) {   // first tab pick: fold the top away smoothly (draw below leaves it open for one frame so the change animates)
          FOLD = true; FOLD_ANIM = true;
          requestAnimationFrame(function () { requestAnimationFrame(function () { host.classList.add('folded'); FOLD_ANIM = false; }); });
        }
        e.preventDefault();
        var k = a.getAttribute('data-sec');
        FROM_TK = !!a.closest('.tk-c');   // a Takeaway card leaves a "Back to the takeaway" link on the tab it opens
        // Switch the view in place. If the reader had scrolled past the tab bar, bring the bar back to the
        // top (under the site header) so the new view starts in sight; otherwise leave the page where it is.
        var bar = host.querySelector('.tabs'), barTop = bar ? bar.getBoundingClientRect().top + window.pageYOffset : 0;
        var stuck = bar && window.pageYOffset > barTop - tabsTop() - 2;
        history.replaceState(history.state, '', location.pathname + location.search + (k ? '#' + k : ''));
        draw(host, j);
        var bar2 = host.querySelector('.tabs');
        if (stuck && bar2) window.scrollTo({ top: bar2.getBoundingClientRect().top + window.pageYOffset - tabsTop() });
        var on = host.querySelector('.tab.on');
        if (on && bar2) {
          on.focus({ preventScroll: true });
          // On phones the bar scrolls sideways: bring the chosen tab into view within the bar only
          // (scrollIntoView would also move the page, because the bar is sticky)
          var l = on.offsetLeft - 16, r = on.offsetLeft + on.offsetWidth + 16;
          if (l < bar2.scrollLeft) bar2.scrollLeft = l; else if (r > bar2.scrollLeft + bar2.clientWidth) bar2.scrollLeft = r - bar2.clientWidth;
        }
      });
    });
  }
  function tabsTop() { var tb = document.querySelector('.top-blocks--sticky'); return tb ? Math.round(tb.getBoundingClientRect().height) : 0; }
  function draw(host, j) {
    host.innerHTML = page(j);
    if (!FOLD) host.classList.remove('folded'); else if (!FOLD_ANIM) host.classList.add('folded'); host.style.setProperty('--tabs-top', tabsTop() + 'px');
    document.documentElement.classList.add('p75tabs');
    wireSparks(host); animate(host); wire(host); wireCockpit(host);
  }

  // On the Takeaway, the header and dials fold away as soon as the reader scrolls down, so the content below
  // slides up into the space; scrolling back up to the top brings them back. Other tabs keep the strip until it is tapped.
  var SCROLL_TICK = false, LAST_Y = window.pageYOffset, SCROLL_HOLD = 0;
  window.addEventListener('scroll', function () {
    if (SCROLL_TICK) return; SCROLL_TICK = true;
    requestAnimationFrame(function () {
      SCROLL_TICK = false;
      var y = window.pageYOffset, dy = y - LAST_Y; LAST_Y = y;
      if (!dy) return;
      var host = document.querySelector('.p75pulse'), strip = host && host.querySelector('.fstrip');
      if (!strip) return;
      var on = host.querySelector('.tab.on');   // only on the Takeaway (the first tab), however it was reached (#takeaway or no hash)
      if (on && on !== host.querySelector('.tab')) return;
      var tb = document.querySelector('.top-blocks--sticky'), hdr = tb ? tb.getBoundingClientRect().height : 0;
      if (Date.now() < SCROLL_HOLD) return;   // let a fold finish before reading the scroll again
      var top = host.querySelector('.top');
      if (dy > 0 && !FOLD && y > 6) {
        // only when the page stays scrollable once folded; otherwise it would bounce open and shut on a short page
        if (document.documentElement.scrollHeight - top.offsetHeight < window.innerHeight + 80) return;
        FOLD = true; host.classList.add('folded'); SCROLL_HOLD = Date.now() + 600;
      } else if (dy < 0 && FOLD && strip.getBoundingClientRect().top >= hdr - 1) {
        FOLD = false; host.classList.remove('folded'); SCROLL_HOLD = Date.now() + 600;
      }
    });
  }, { passive: true });
  window.addEventListener('hashchange', function () {
    var host = document.querySelector('.p75pulse'); if (host && cache) draw(host, cache);
  });
  function clear() {
    var h = document.querySelector('.p75pulse'); if (h) h.remove();
    document.documentElement.classList.remove('p75tabs');
    if (SH.el) { SH.el.remove(); SH.el = null; SH.host = null; }
    document.querySelectorAll('[data-p75pulse-hid]').forEach(function (s) { s.style.display = ''; s.removeAttribute('data-p75pulse-hid'); });
  }

  window.P75PULSE = { render: render, clear: clear };
})();
