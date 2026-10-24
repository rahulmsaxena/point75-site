/* Point75 - Insights page (/insights): what leading bond investors and the Fed are saying, with dated
   sources, and what households can do. Content comes from tools.point75.io/api/v1/insights so it can be refreshed
   without touching code. Loaded by p75.js. (c) Rahul Saxena. All rights reserved.
   One Shot layout (see ONE-SHOT.md): a Takeaway tab first, then one tab per idea; picking a tab folds the
   title away into a one-line strip. */
(function () {
  if (window.P75INS) return;
  var DATA = 'https://tools.point75.io/api/v1/insights';   // served from the private data branch, point75.io pages only
  var FW_API = 'https://news.point75.io/api/fedspeak';
  var GOLD = '#FFE03A', BLU = '#00E8FF', RED = '#FF6640', NEU = '#C4CAD1';   // bright and crisp on the dark page

  var CSS =
    // the site's one red is a bright warm red (#FF6640); short red words go bold so they read at a glance
    '.p75ins [style*="color:#FF6640"][style]:not(b):not(.tk-head *):not(.fi *){font-weight:800}' +
    '.p75ins{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--soft:#E9E3D6;--muted:#DCD6C9;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +   // no fixed full-screen height: what follows (the page links) sits right under the content
    '.p75ins *{box-sizing:border-box}' +
    '.p75ins,.p75ins *{overflow-anchor:none}' +
    '.p75ins .wrap{max-width:1040px;margin:0 auto;padding:4px 20px 48px}' +
    '.p75ins .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75ins h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:24px;line-height:1.15;margin:0;letter-spacing:-.01em;max-width:100%}' +
    '.p75ins .hd-t{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;margin:10px 0 6px}' +
    '.p75ins .hd-t .asof{margin:0 0 0 auto}' +
    '.p75ins .asof{font-size:12.5px;color:var(--muted)}.p75ins .asof b{color:var(--cream);font-weight:600}' +
    '.p75ins .intro{display:block}' +
    '.p75ins .lede{color:var(--soft);font-size:14.5px;line-height:1.55;margin:0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75ins .lede b{color:#fff}' +
    '.p75ins h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:23px;margin:32px 0 4px}' +
    '.p75ins .view > h2:first-child,.p75ins .view > .tk-back + h2{margin-top:16px}' +
    // tabs
    '.p75ins .tabs{position:sticky;top:var(--tabs-top,0px);z-index:6;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:10px -20px 0;padding:5px 20px;background:var(--ink);border-bottom:1px solid var(--line)}' +
    '.p75ins .tabs::-webkit-scrollbar{display:none}' +
    '.p75ins .tab{flex:1 0 auto;display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 16px;border-radius:999px;border:1px solid #3A3C42;color:#F1ECE2;font-weight:700;font-size:13.5px;text-decoration:none;white-space:nowrap;transition:border-color .15s,background .15s,color .15s}' +
    '.p75ins .tab:hover{border-color:var(--gold);color:#fff}.p75ins .tab.on{background:var(--gold);border-color:var(--gold);color:#111214}' +
    '.p75ins .tab:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75ins .tab .ts{display:none}' +
    '.p75ins .view{padding-top:10px}' +
    // fold-away title
    '.p75ins .top,.p75ins .fstrip{display:grid;transition:grid-template-rows .5s cubic-bezier(.4,0,.2,1),opacity .4s}' +
    '.p75ins .top > div,.p75ins .fstrip > div{min-height:0;overflow:hidden}' +
    '.p75ins .top{grid-template-rows:1fr}.p75ins .fstrip{grid-template-rows:0fr;opacity:0}' +
    '.p75ins.folded .top{grid-template-rows:0fr;opacity:0}.p75ins.folded .fstrip{grid-template-rows:1fr;opacity:1}' +
    '.p75ins:not(.folded) .fstrip{visibility:hidden}.p75ins.folded .top > div{visibility:hidden;transition:visibility 0s .5s}' +
    '.p75ins.folded .fstrip > div{padding-top:6px}' +
    '.p75ins .fold{display:flex;align-items:center;gap:8px 22px;flex-wrap:wrap;width:100%;min-height:44px;margin:0;padding:5px 8px 5px 16px;border-radius:12px;background:var(--panel);border:1px solid var(--line);color:inherit;font:inherit;text-align:left;cursor:pointer}' +
    '.p75ins .fold:hover{border-color:var(--gold)}.p75ins .fold:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75ins .fi{display:inline-flex;align-items:baseline;gap:8px;white-space:nowrap}.p75ins .fi small{color:#D2CCBF;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75ins .fi b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:20px;line-height:1}' +
    '.p75ins .fo{margin-left:auto;display:inline-flex;align-items:center;gap:10px;color:var(--gold);font-size:13px;font-weight:700}' +
    '.p75ins .fo-c{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--gold);display:grid;place-items:center;animation:p75ibob 2.4s ease-in-out infinite}' +
    '.p75ins .fo-c:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '@keyframes p75ibob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}' +
    // takeaway
    '.p75ins .tk{display:flex;flex-direction:column;gap:12px}' +
    '.p75ins .tk-head{margin:0;padding:11px 18px;border-radius:14px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);font-family:"Hedvig Letters Serif",Georgia,serif;font-size:19px;line-height:1.45;color:#fff}' +
    '.p75ins .ov{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}' +
    '.p75ins a.ovc{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border-radius:14px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);color:inherit;text-decoration:none;transition:border-color .15s,transform .15s}' +
    '.p75ins a.ovc:hover,.p75ins a.ovc:focus-visible{border-color:var(--gold);outline:none}' +
    '@media (hover:hover){.p75ins a.ovc:hover{transform:translateY(-2px)}}' +
    '.p75ins .ovh{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:#E2DDD2;font-weight:800}' +
    '.p75ins .go{flex:none;white-space:nowrap;color:var(--gold);letter-spacing:.02em;text-transform:none;font-size:12.5px}' +
    '.p75ins .ovm{display:flex;align-items:center;gap:12px;min-height:72px}' +
    '.p75ins .ovv{flex:0 0 auto;display:flex;align-items:center}' +
    '.p75ins .pills{display:flex;flex-direction:column;gap:6px}.p75ins .pills span{font-size:12.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border:1px solid currentColor;border-radius:99px;padding:3px 10px;text-align:center}' +
    '.p75ins .ovd{flex:0 0 auto;width:96px}.p75ins .ovd svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75ins .ovr{display:flex;flex-direction:column;gap:4px;min-width:0}' +
    '.p75ins .ovr b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:26px;line-height:1.1}' +
    '.p75ins .ovr em{font-style:normal;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}' +
    '.p75ins .ovr > span{font-size:13.5px;line-height:1.45;color:#F1ECE2}' +
    '.p75ins .avs{flex:0 0 auto;display:grid;grid-template-columns:repeat(4,26px);gap:4px}' +
    '.p75ins .avs i{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-weight:800;font-size:10px;color:#111214;background:var(--gold)}' +
    '.p75ins .big6{flex:0 0 auto;width:64px;height:64px;border-radius:50%;display:grid;place-items:center;border:3px solid ' + BLU + ';box-shadow:0 0 18px ' + BLU + '55 inset,0 0 12px ' + BLU + '44;font-family:"Hedvig Letters Serif",Georgia,serif;font-size:30px;color:' + BLU + '}' +
    '.p75ins .p75n{transition:transform 1.25s cubic-bezier(.37,0,.3,1);filter:drop-shadow(0 0 3px rgba(255,255,255,.6))}' +
    '.p75ins .p75f{stroke-dashoffset:100;transition:stroke-dashoffset 1.25s cubic-bezier(.37,0,.3,1)}.p75ins .go-on .p75f{stroke-dashoffset:0}' +
    '.p75ins a.tk-back{display:inline-flex;align-items:center;gap:8px;min-height:40px;margin:0 0 4px;padding:0 16px;border-radius:99px;border:1px solid var(--gold);background:rgba(201,162,39,.1);color:#FFD23F;font-weight:800;font-size:14.5px;text-decoration:none}' +
    '.p75ins a.tk-back:hover,.p75ins a.tk-back:focus-visible{background:rgba(201,162,39,.22);outline:none}' +
    // big picture
    '.p75ins .bp{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:18px;align-items:start}' +
    '.p75ins .mood{display:inline-block;font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:' + GOLD + ';border:1px solid var(--gold);border-radius:99px;padding:4px 12px;margin-bottom:10px}' +
    '.p75ins .bp p{font-size:15px;line-height:1.6;color:var(--soft);margin:0 0 12px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75ins .side{display:flex;flex-direction:column;gap:14px}' +
    '.p75ins .box{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px 16px}' +
    '.p75ins .box h3{font-size:12.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin:0 0 8px}' +
    '.p75ins .box ul{margin:0;padding:0;list-style:none}.p75ins .box li{position:relative;padding-left:18px;font-size:15px;line-height:1.5;color:#F1ECE2;margin:6px 0}' +
    '.p75ins .box li:before{content:"";position:absolute;left:2px;top:.55em;width:8px;height:8px;border-radius:50%;background:currentColor;color:var(--dot,' + GOLD + ');box-shadow:0 0 8px currentColor}' +
    '.p75ins .box li small{display:block;color:var(--muted);font-size:13px;margin-top:2px}' +
    '.p75ins .box li.vs:before{display:none}' +
    '.p75ins .vs{display:block;margin:4px 0 4px 18px;font-size:11px;font-weight:800;letter-spacing:.14em;color:var(--muted)}' +
    // voices: one row per voice, one open at a time, info screen beside
    '.p75ins .vw{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;align-items:start}' +
    '.p75ins .vw.has{grid-template-columns:minmax(0,1fr) 350px}' +
    '.p75ins .hint{display:flex;align-items:center;gap:10px;margin:0 0 10px;font-size:14.5px;color:#F1ECE2}' +
    '.p75ins .hint i{flex:0 0 auto;width:9px;height:9px;border-radius:50%;background:var(--gold);animation:p75iping 1.8s ease-out infinite}' +
    '@keyframes p75iping{0%{box-shadow:0 0 0 0 rgba(242,210,122,.6)}80%,100%{box-shadow:0 0 0 9px rgba(242,210,122,0)}}' +
    '.p75ins .vl{display:flex;flex-direction:column;gap:7px}' +
    '.p75ins .vr{background:var(--panel);border:1px solid var(--line);border-radius:14px;transition:border-color .15s}' +
    '.p75ins .vr.open{border-color:var(--gold);animation:p75iglow 1.2s ease-out 1}' +
    '@keyframes p75iglow{0%{box-shadow:0 0 0 0 rgba(242,210,122,.5)}100%{box-shadow:0 0 0 10px rgba(242,210,122,0)}}' +
    '.p75ins .vb{display:grid;grid-template-columns:40px minmax(0,1fr) auto 32px;align-items:center;gap:12px;width:100%;min-height:52px;padding:6px 10px 6px 12px;background:none;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:14px}' +
    '.p75ins .vb:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '@media (hover:hover){.p75ins .vr:not(.open):hover{border-color:#4A4C52}}' +
    '.p75ins .av{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:14px;color:#111214;background:var(--gold)}' +
    '.p75ins .vn{display:block;font-weight:800;font-size:16px;color:#fff;line-height:1.2}.p75ins .vn small{display:block;font-weight:500;font-size:12.5px;color:var(--muted);margin-top:2px}' +
    '.p75ins .vt{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:16px;color:' + GOLD + ';text-align:right;line-height:1.2}' +
    '.p75ins .vt small{display:block;font-family:Manrope,sans-serif;font-size:12px;color:var(--muted);margin-top:3px;font-weight:600}' +
    '.p75ins .chev{width:30px;height:30px;border-radius:50%;border:1.5px solid #4A4C52;display:grid;place-items:center;transition:transform .25s,border-color .15s}' +
    '.p75ins .chev:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '.p75ins .vr.open .chev{transform:rotate(180deg);border-color:var(--gold)}' +
    '.p75ins .vd{padding:0 16px 14px 64px}' +
    '.p75ins .vd ul{margin:0;padding:0;list-style:none}' +
    '.p75ins .vd li{position:relative;padding-left:16px;font-size:14.5px;line-height:1.55;color:#F1ECE2;margin:6px 0;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75ins .vd li:before{content:"";position:absolute;left:0;top:.6em;width:6px;height:6px;border-radius:50%;background:var(--gold)}' +
    '.p75ins .info{position:sticky;top:calc(var(--tabs-top,0px) + 64px);background:linear-gradient(180deg,#1E2024 0%,#17181B 100%);border:1px solid var(--line);border-top:2px solid var(--gold);border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;gap:12px}' +
    '.p75ins .info .who{display:flex;align-items:center;gap:12px}.p75ins .info .av{width:48px;height:48px;font-size:16px}' +
    '.p75ins blockquote{margin:0;padding:12px 14px;border-left:3px solid var(--gold);background:var(--ink);font-family:"Hedvig Letters Serif",Georgia,serif;font-size:17px;line-height:1.4;color:#fff}' +
    '.p75ins .when{font-size:13px;font-weight:700;color:' + GOLD + '}.p75ins .when span{display:block;color:var(--muted);font-weight:500;margin-top:2px;line-height:1.45}' +
    '.p75ins .srcs{display:flex;flex-direction:column;gap:6px}' +
    '.p75ins .srcs a{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:40px;padding:6px 12px;border-radius:10px;border:1px solid var(--line);color:#F1ECE2;font-size:13.5px;font-weight:600;text-decoration:none}' +
    '.p75ins .srcs a:after{content:"↗";color:var(--gold);font-weight:800}' +
    '.p75ins .srcs a:hover,.p75ins .srcs a:focus-visible{border-color:var(--gold);outline:none}' +
    '.p75ins .vd .info{display:none}' +
    // fed watch
    '.p75ins .fwm{display:grid;grid-template-columns:200px minmax(0,1fr);gap:20px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px 18px}' +
    '.p75ins .fwm svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75ins .fwv b{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.1}' +
    '.p75ins .fwv p{margin:6px 0 0;font-size:15px;line-height:1.55;color:#F1ECE2;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75ins .fwp{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}' +
    '.p75ins .fwp span{font-size:13px;color:#F1ECE2;border:1px solid var(--line);border-radius:99px;padding:3px 10px;white-space:nowrap}.p75ins .fwv .fwp b{display:inline;font-family:Manrope,sans-serif;font-size:13px;font-weight:800;line-height:1.4;color:#fff}' +
    '.p75ins .fws{display:flex;flex-direction:column;gap:8px;margin-top:14px}' +
    '.p75ins .fwr .vb{grid-template-columns:minmax(0,1fr) auto 32px}' +
    '.p75ins .fwr .vd{padding:0 16px 14px 14px}' +
    '.p75ins .fwr .vd p{margin:0;font-size:15px;line-height:1.55;color:#F1ECE2}' +
    '.p75ins .fwr q{display:block;margin-top:8px;font-family:"Hedvig Letters Serif",Georgia,serif;font-size:16px;color:#fff;quotes:"\\201C" "\\201D"}' +
    '.p75ins .fwr .vd a{display:inline-flex;align-items:center;min-height:40px;color:' + GOLD + ';text-decoration:none;font-size:13.5px;font-weight:700}' +
    '.p75ins .tag{display:inline-block;font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;padding:2px 10px;border-radius:99px;border:1px solid currentColor;white-space:nowrap}' +
    // household
    '.p75ins .acts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}' +
    '.p75ins .act{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px 16px}' +
    '.p75ins .act h3{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:800;color:#fff;margin:0 0 6px;line-height:1.3}' +
    '.p75ins .act .n{flex:0 0 auto;width:28px;height:28px;border-radius:50%;border:1.5px solid ' + BLU + ';color:' + BLU + ';display:grid;place-items:center;font-weight:800;font-size:13px;box-shadow:0 0 8px ' + BLU + '55}' +
    '.p75ins .act p{font-size:14.5px;line-height:1.55;color:#F1ECE2;margin:0}' +
    '.p75ins .act a{color:' + GOLD + '}' +
    '.p75ins .wrap > .note{margin-top:28px;color:#A8A398;font-size:12px;line-height:1.6;border-top:1px solid var(--line);padding-top:14px}' +
    '.p75ins .load{color:var(--muted);margin-top:24px}' +
    // desktop: the Takeaway fits one screen with room to spare, so the numbers take it
    '@media (min-width:881px){.p75ins .tk-head{font-size:22px;padding:13px 20px}.p75ins .ovr b{font-size:30px}.p75ins a.ovc{padding:14px 16px}}' +
    // wide screens: the four cards sit in one row, visual above the reading, so the Takeaway fits one screen
    '@media (min-width:1100px){.p75ins .ov{grid-template-columns:repeat(4,minmax(0,1fr))}.p75ins .ovm{flex-direction:column;align-items:flex-start;gap:8px}.p75ins .ovv{height:78px}.p75ins .ovd{width:108px}.p75ins .pills{flex-direction:row}}' +
    '@media (max-width:880px){.p75ins .ov,.p75ins .bp,.p75ins .vw.has{grid-template-columns:minmax(0,1fr)}.p75ins .acts{grid-template-columns:repeat(2,minmax(0,1fr))}' +
      '.p75ins .vw > .info{display:none}.p75ins .vd .info{display:flex;position:static;margin-top:12px}.p75ins .vd .info .who{display:none}' +
      '.p75ins .hd-t .eyebrow{flex-basis:100%}}' +
    '@media (max-width:560px){.p75ins .wrap{padding:4px 16px 40px}.p75ins h1{font-size:22px}' +
      '.p75ins .tabs{margin:10px -16px 0;padding:6px 16px;gap:4px}.p75ins .tab{flex:1 0 auto;justify-content:center;padding:0 8px;font-size:13px}.p75ins .tab .tl{display:none}.p75ins .tab .ts{display:inline}' +
      '.p75ins .fold{gap:6px 12px;flex-wrap:nowrap}.p75ins .fold > .eyebrow,.p75ins .fo-t{display:none}.p75ins .fi{gap:5px}.p75ins .fi small{font-size:10px}.p75ins .fi b{font-size:16px}.p75ins .bp p,.p75ins .vd li,.p75ins .fwv p{text-align:left}.p75ins .tk-head{font-size:17px;padding:11px 14px}' +
      '.p75ins .ovd{width:90px}.p75ins .ovr b{font-size:24px}' +
      '.p75ins .acts{grid-template-columns:minmax(0,1fr)}.p75ins .vb{grid-template-columns:36px minmax(0,1fr) 32px;gap:10px}.p75ins .vb .av{width:36px;height:36px;font-size:13px}' +
      '.p75ins .vb .vt{display:none}.p75ins .vn .th{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:15px;color:' + GOLD + ';margin-top:3px}' +
      '.p75ins .vd{padding:0 14px 14px 14px}.p75ins .fwm{grid-template-columns:minmax(0,1fr);justify-items:center}.p75ins .fwm svg{max-width:220px}.p75ins .fwv{text-align:center}.p75ins .fwp{justify-content:center}' +
      '.p75ins .fwr .vb{grid-template-columns:minmax(0,1fr) 32px}.p75ins .fwr .vb > .tag{display:none}.p75ins .fwr .tagm{display:inline-block}}' +
    '.p75ins .vn .th,.p75ins .fwr .tagm{display:none}' +
    '@media (max-width:560px){.p75ins .vn .th{display:block}.p75ins .fwr .tagm{display:inline-block;margin-top:4px}}' +
    '@media (max-width:430px){.p75ins .fold .fi2{display:none}}' +
    '@media (max-width:370px){.p75ins .hd-t{column-gap:8px}.p75ins .hd-t .asof{font-size:11.5px}.p75ins .tabs{gap:4px}.p75ins .tab{padding:0 8px;font-size:12.5px}.p75ins .ovm{gap:10px}.p75ins .ovd{width:86px}.p75ins .ovr b{font-size:24px}}' +
    '@media (prefers-reduced-motion:reduce){.p75ins .hint i,.p75ins .fo-c,.p75ins .vr.open{animation:none}.p75ins a.ovc:hover{transform:none}.p75ins .top,.p75ins .fstrip{transition:none}}';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function once() {
    if (document.getElementById('p75ins-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(f);
    var st = document.createElement('style'); st.id = 'p75ins-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmt(iso) { var p = iso.split('-'); return MON[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0]; }
  var SMALL = /^(a|an|and|as|at|but|by|for|in|of|on|or|the|to|vs)$/i;
  function title(s) {   // Title Case for the page's main title only
    return String(s).split(' ').map(function (w, i) { return i && SMALL.test(w) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
  }
  function lc1(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : ''; }
  function C(t, col) { return '<span class="hl" style="color:' + col + '">' + esc(t) + '</span>'; }

  // ---------- Dial: tools-style speedometer (same build as Pulse and Debt Trap) ----------
  var DCX = 100, DCY = 96, DR = 80, DSWEEP = 220;
  function dPt(deg, r) { var a = deg * Math.PI / 180; return [(DCX + r * Math.sin(a)).toFixed(2), (DCY - r * Math.cos(a)).toFixed(2)]; }
  function dArc(d0, d1, r) {
    var a = dPt(d0, r), b = dPt(d1, r);
    return 'M' + a[0] + ',' + a[1] + ' A' + r + ',' + r + ' 0 ' + (Math.abs(d1 - d0) > 180 ? 1 : 0) + ' ' + (d1 > d0 ? 1 : 0) + ' ' + b[0] + ',' + b[1];
  }
  // o: { v, min, max, rest, color, ends:[left,right], zones:[[from,to,color]], aria }
  function dial(o) {
    var ang = function (v) { return -DSWEEP / 2 + (Math.max(o.min, Math.min(o.max, v)) - o.min) / (o.max - o.min) * DSWEEP; };
    var a0 = ang(o.rest), a1 = ang(o.v), sw = 11, svg = '';
    svg += '<path d="' + dArc(-DSWEEP / 2, DSWEEP / 2, DR) + '" fill="none" stroke="#2A2C31" stroke-width="' + sw + '" stroke-linecap="round"/>';
    (o.zones || []).forEach(function (z) {
      svg += '<path d="' + dArc(ang(z[0]), ang(z[1]), DR + sw / 2 + 4) + '" fill="none" stroke="' + z[2] + '" stroke-opacity=".6" stroke-width="2.5"/>';
    });
    if (Math.abs(a1 - a0) > .5)
      svg += '<path class="p75f" pathLength="100" stroke-dasharray="100 200" d="' + dArc(a0, a1, DR) + '" fill="none" stroke="' + o.color + '" stroke-width="' + sw + '" stroke-linecap="round" style="filter:drop-shadow(0 0 5px ' + o.color + '66)"/>';
    if (o.ends) [[-DSWEEP / 2, o.ends[0]], [DSWEEP / 2, o.ends[1]]].forEach(function (e) {
      var p = dPt(e[0], DR);
      svg += '<text x="' + p[0] + '" y="' + (+p[1] + sw / 2 + 19).toFixed(1) + '" text-anchor="middle" font-size="18" font-weight="800" fill="#C9C4B8" font-family="Manrope,sans-serif">' + e[1] + '</text>';
    });
    var len = DR - 26, nw = 5, as = ang(o.min);   // needle starts at the left end of the scale
    svg += '<g class="p75n" data-a="' + a1.toFixed(1) + '" style="transform-origin:' + DCX + 'px ' + DCY + 'px;transform:rotate(' + as.toFixed(1) + 'deg)">' +
      '<path d="M' + (DCX - nw) + ',' + DCY + ' L' + DCX + ',' + (DCY - len) + ' L' + (DCX + nw) + ',' + DCY + ' Z" fill="#F4F1EA"/>' +
      '<line x1="' + DCX + '" y1="' + DCY + '" x2="' + DCX + '" y2="' + (DCY + 14) + '" stroke="#F4F1EA" stroke-width="4.5" stroke-linecap="round"/></g>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="11" fill="#17181B" stroke="' + o.color + '" stroke-width="3"/>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="3.6" fill="#F4F1EA"/>';
    return '<svg viewBox="' + (o.ends ? '0 6 200 148' : '2 6 196 124') + '" role="img" aria-label="' + esc(o.aria || '') + '">' + svg + '</svg>';
  }

  // Fed watch tilt: -2 dovish … +2 hawkish. Hawkish is bad news for bond prices (red), dovish good (blue).
  function tiltCol(t) { return t >= 0.5 ? RED : t <= -0.5 ? BLU : NEU; }
  function tone(sc) { return sc >= 0.5 ? ['▲', RED] : sc <= -0.5 ? ['▼', BLU] : ['●', NEU]; }
  function fwDial(f) {
    return dial({ v: f.tilt, min: -2, max: 2, rest: 0, color: tiltCol(f.tilt), ends: ['Dove', 'Hawk'], zones: [[-2, -0.5, BLU], [0.5, 2, RED]],
      aria: 'Fed Board tilt ' + f.tilt.toFixed(1) + ' on a scale from -2 dovish to +2 hawkish' });
  }

  // ---------- Page ----------
  var TABS = [
    { key: 'takeaway', tab: 'Takeaway' },
    { key: 'picture', tab: 'Big picture', short: 'Picture' },
    { key: 'voices', tab: 'The voices', short: 'Voices' },
    { key: 'fed', tab: 'Fed watch', short: 'Fed' },
    { key: 'household', tab: 'Your household', short: 'Household' }
  ];
  var FOLD = !!location.hash.slice(1) && location.hash !== '#takeaway', FOLD_ANIM = false, FROM_TK = false;
  var OPEN = { voices: 0, fed: 0 };   // which row is open in each tab (one at a time; -1 none)

  // the shared opening words of the two sides of the split ("Long-term Treasuries …") name what they split on
  function splitTopic(dif) {
    if (!dif || dif.length < 2) return '';
    var a = dif[0][0].split(' '), b = dif[1][0].split(' '), n = 0;
    while (n < a.length && n < b.length && a[n].toLowerCase() === b[n].toLowerCase()) n++;
    return n >= 2 ? lc1(a.slice(0, n).join(' ')) : '';
  }

  function page(d, f) {
    var SEC = {}, V = d.voices || [];
    var hasFw = !!(f && f.tilt != null);

    // Title, update note, intro and illustration: fold into a one-line strip once a tab is picked
    var top = '<div class="hd-t"><span class="eyebrow">Insights</span><h1>' + esc(title(d.headline)) + '</h1>' +
      '<div class="asof">Updated <b>' + fmt(d.updated) + '</b></div></div>' +
      '<div class="intro"><p class="lede">The Fed chair, the Treasury Secretary and the biggest names in bond investing, in plain English: <b>' + V.length +
      ' voices</b>, comments from <b>' + esc(d.window) + '</b>, every one dated and linked to its source. Then what it means for your household.</p>' +
      '</div>';   // the illustration (d.hero) stays in the JSON but is no longer shown
    var strip = '<button type="button" class="fold" data-unfold aria-label="Show the title and introduction"><span class="eyebrow">Insights</span>' +
      '<span class="fi"><small>Mood</small><b style="color:' + GOLD + '">' + esc(d.mood) + '</b></span>' +
      (hasFw ? '<span class="fi fi2"><small>Fed</small><b style="color:' + tiltCol(f.tilt) + '">' + esc(f.tilt_label) + '</b></span>' : '') +
      '<span class="fo"><span class="fo-t">Show intro</span><span class="fo-c" aria-hidden="true"></span></span></button>';

    // ---- Takeaway: a headline written from the content by simple rules, one card per tab ----
    var topic = splitTopic(d.differ);
    var head = 'The mood is ' + C(lc1(d.mood), GOLD) + '.' +
      (d.agree && d.agree[0] ? ' They agree ' + C(lc1(d.agree[0]), RED) : '') +
      (topic ? '; they split on ' + C(topic, BLU) + '.' : d.agree && d.agree[0] ? '.' : '');
    var ov = function (k, h, visual, big, col, word, line) {
      return '<a class="ovc" href="#' + k + '" data-tab="' + k + '"><span class="ovh"><span>' + h + '</span><span class="go">See why ›</span></span>' +
        '<span class="ovm">' + (visual ? '<span class="ovv">' + visual + '</span>' : '') + '<span class="ovr"><b style="color:' + col + '">' + big + '</b>' + (word ? '<em style="color:' + col + '">' + word + '</em>' : '') +
        (line ? '<span>' + line + '</span>' : '') + '</span></span></a>';
    };
    var latest = V[0];
    SEC.takeaway = '<div class="tk"><p class="tk-head">' + head + '</p><div class="ov">' +
      ov('picture', 'Big picture', '<span class="pills" aria-hidden="true"><span style="color:' + RED + '">' + d.agree.length + ' agree</span>' + (d.differ.length > 1 ? '<span style="color:' + BLU + '">1 split</span>' : '') + '</span>', esc(d.mood), GOLD, '', '') +
      ov('voices', 'The voices', '<span class="avs" aria-hidden="true">' + V.map(function (v) { return '<i>' + esc(v.initials) + '</i>'; }).join('') + '</span>',
        V.length + ' voices', '#fff', '', latest ? 'Led by ' + esc(latest.name) + ': ' + C(latest.theme, GOLD) + '.' : '') +
      (hasFw ? ov('fed', 'Fed watch', '<span class="ovd">' + fwDial(f) + '</span>', esc(f.tilt_label), tiltCol(f.tilt), '',
        'average of ' + f.tilt_count + ' Fed Board speeches, last 90 days.') : '') +
      ov('household', 'Your household', '<span class="big6" aria-hidden="true">' + d.actions.length + '</span>', 'Steps to take', BLU, '',
        'Start with: ' + esc(lc1(d.actions[0][0])) + '.') +
      '</div></div>';

    // ---- Big picture ----
    SEC.picture = '<div class="bp"><div>' + d.bigPicture.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      '<div class="side"><div class="box"><h3>Where they agree</h3><ul>' + d.agree.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="box"><h3>Where they differ</h3><ul>' + d.differ.map(function (a, i) {
        var col = d.differ.length === 2 ? (i ? RED : BLU) : NEU;
        return (i ? '<li class="vs" aria-hidden="true" style="padding:0">VS</li>' : '') + '<li style="--dot:' + col + '">' + esc(a[0]) + '<small>' + esc(a[1]) + '</small></li>';
      }).join('') + '</ul></div></div></div>';

    // ---- Voices: one row each, one open at a time; the info screen shows the open voice's quote and sources ----
    var info = function (v) {
      return '<div class="info"><div class="who"><span class="av" aria-hidden="true">' + esc(v.initials) + '</span><span class="vn">' + esc(v.name) + '<small>' + esc(v.role) + '</small></span></div>' +
        (v.quote ? '<blockquote>“' + esc(v.quote) + '”</blockquote>' : '') +
        '<div class="when">' + esc(v.when) + '<span>' + esc(v.where) + '</span></div>' +
        '<div class="srcs">' + v.sources.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a>'; }).join('') + '</div></div>';
    };
    var ov0 = OPEN.voices, openV = V[ov0];
    SEC.voices = '<p class="hint"><i aria-hidden="true"></i>Tap a name to read what they said.</p>' +
      '<div class="vw' + (openV ? ' has' : '') + '"><div class="vl">' + V.map(function (v, i) {
        var on = i === ov0;
        return '<div class="vr' + (on ? ' open' : '') + '"><button type="button" class="vb" data-row="voices" data-i="' + i + '" aria-expanded="' + on + '" aria-controls="p75iv' + i + '">' +
          '<span class="av" aria-hidden="true">' + esc(v.initials) + '</span><span class="vn">' + esc(v.name) + '<small>' + esc(v.role) + '</small><span class="th">' + esc(v.theme) + '</span></span>' +
          '<span class="vt">' + esc(v.theme) + '<small>' + esc(v.when) + '</small></span><span class="chev" aria-hidden="true"></span></button>' +
          (on ? '<div class="vd" id="p75iv' + i + '"><ul>' + v.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' + info(v) + '</div>' : '') + '</div>';
      }).join('') + '</div>' + (openV ? info(openV) : '') + '</div>';

    // ---- Fed watch: Fed Board speeches scored hawkish / dovish ----
    if (hasFw) {
      var of = OPEN.fed;
      SEC.fed = '<div class="fwm">' + fwDial(f) + '<div class="fwv"><b style="color:' + tiltCol(f.tilt) + '">' + esc(f.tilt_label) + '</b>' +
        '<p>Average of ' + f.tilt_count + ' speeches on rates by Federal Reserve Board members in the last 90 days. ' + C('Hawkish', RED) + ' leans toward higher rates, which usually pushes bond yields up; ' + C('dovish', BLU) + ' leans toward lower rates.</p>' +
        (f.people && f.people.length ? '<div class="fwp">' + f.people.slice().sort(function (a, b) { return b.last.localeCompare(a.last); }).map(function (p) {
          var t = tone(p.avg); return '<span><b>' + esc(p.name) + '</b> <span style="border:0;padding:0;color:' + t[1] + '">' + t[0] + '</span> ' + esc(p.label) + '</span>';
        }).join('') + '</div>' : '') + '</div></div>' +
        '<h2>Latest speeches</h2><div class="fws">' + (f.recent || []).slice(0, 5).map(function (r, i) {
          var t = tone(r.score), on = i === of, tag = '<span class="tag" style="color:' + t[1] + '">' + t[0] + ' ' + esc(r.label) + '</span>';
          return '<div class="vr fwr' + (on ? ' open' : '') + '"><button type="button" class="vb" data-row="fed" data-i="' + i + '" aria-expanded="' + on + '">' +
            '<span class="vn">' + esc(r.speaker) + '<small>' + fmt(r.date) + '</small><span class="tagm">' + tag + '</span></span>' + tag + '<span class="chev" aria-hidden="true"></span></button>' +
            (on ? '<div class="vd"><p>' + esc(r.summary) + '</p>' + (r.quote ? '<q>' + esc(r.quote) + '</q>' : '') +
              '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(r.title) + ' &rarr;</a></div>' : '') + '</div>';
        }).join('') + '</div>' +
        '<p class="src" style="margin:12px 0 0;font-size:12px;color:#A8A398">Scores and summaries are written by AI from the full text of each speech and can miss nuance; quotes are checked word-for-word against the original. ' +
        'Speeches not about rates or the economy (bank supervision, payments and so on) are left out. Source: Federal Reserve Board. Updated each weekday evening.</p>';
    }

    // ---- Household ----
    SEC.household = '<div class="acts">' + d.actions.map(function (a, i) {
      var body = esc(a[1]).replace('The Bonds page', '<a href="/bonds">The Bonds page</a>');
      return '<div class="act"><h3><span class="n">' + (i + 1) + '</span>' + esc(a[0]) + '</h3><p>' + body + '</p></div>';
    }).join('') + '</div>';

    var view = location.hash.slice(1), live = TABS.filter(function (x) { return SEC[x.key]; });
    var cur = live.filter(function (x) { return x.key === view; })[0] || live[0];
    var h = '<div class="wrap"><div class="top"><div>' + top + '</div></div><div class="fstrip"><div>' + strip + '</div></div>' +
      '<nav class="tabs" role="tablist" aria-label="Insights views">' + live.map(function (x) {
        var on = x.key === cur.key;
        return '<a role="tab" class="tab' + (on ? ' on' : '') + '" href="#' + x.key + '" data-tab="' + x.key + '" aria-selected="' + on + '"' + (on ? ' aria-current="page"' : '') + '>' +
          (x.short ? '<span class="tl">' + x.tab + '</span><span class="ts" aria-hidden="true">' + x.short + '</span>' : x.tab) + '</a>';
      }).join('') + '</nav><div class="view" role="tabpanel" aria-label="' + esc(cur.tab) + '">' +
      (FROM_TK && cur.key !== 'takeaway' ? '<a class="tk-back" href="#takeaway" data-tab="takeaway"><span aria-hidden="true">←</span> Back to the takeaway</a>' : '') +
      SEC[cur.key] + '</div>';
    h += '<p class="note">' + esc(d.note) + ' &copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
    return h;
  }

  function sweep(host) {   // needles rest at the left end, pause, then glide to their reading
    setTimeout(function () { requestAnimationFrame(function () {
      host.querySelectorAll('.view svg').forEach(function (s) {
        var n = s.querySelector('.p75n'); if (!n) return;
        s.parentNode.classList.add('go-on'); n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)';
      });
    }); }, 350);
  }
  function draw(host) {
    host.innerHTML = page(D, FW);
    var tb = document.querySelector('.top-blocks--sticky');   // keep the sticky tab bar clear of the site's sticky header
    host.style.setProperty('--tabs-top', (tb ? Math.round(tb.getBoundingClientRect().height) : 0) + 'px');
    if (!FOLD) host.classList.remove('folded'); else if (!FOLD_ANIM) host.classList.add('folded');
    sweep(host);
  }

  // On the Takeaway the title folds away as soon as the reader scrolls down and returns at the top (as Debt Trap)
  var SCROLL_TICK = false, SCROLL_HOLD = 0, SCROLL_SC = null;
  document.addEventListener('scroll', function (e) {
    var t = e.target, sc = t && t.nodeType === 1 ? t : (document.scrollingElement || document.documentElement);
    if (sc.scrollHeight < sc.clientHeight + 40) return;
    SCROLL_SC = sc;
    if (SCROLL_TICK) return; SCROLL_TICK = true;
    requestAnimationFrame(foldOnScroll);
  }, { passive: true, capture: true });
  function foldOnScroll() {
    SCROLL_TICK = false;
    var sc = SCROLL_SC; if (!sc) return;
    var y = sc === document.scrollingElement || sc === document.documentElement || sc === document.body ? Math.max(window.pageYOffset, sc.scrollTop) : sc.scrollTop;
    var dy = y - (sc.__p75iy == null ? 0 : sc.__p75iy); sc.__p75iy = y;
    var host = document.querySelector('.p75ins'), strip = host && host.querySelector('.fstrip'), top = host && host.querySelector('.top');
    if (!dy || !strip || !top) return;
    var on = host.querySelector('.tab.on');
    if (on && on !== host.querySelector('.tab')) return;
    if (Date.now() < SCROLL_HOLD) return;
    var tb = document.querySelector('.top-blocks--sticky'), hdr = tb ? tb.getBoundingClientRect().height : 0;
    if (dy > 0 && !FOLD && y > 6) {
      if (sc.scrollHeight - top.offsetHeight < sc.clientHeight + 80) return;
      FOLD = true; host.classList.add('folded'); SCROLL_HOLD = Date.now() + 600;
    } else if (dy < 0 && FOLD && strip.getBoundingClientRect().top >= hdr - 1) {
      FOLD = false; host.classList.remove('folded'); SCROLL_HOLD = Date.now() + 600;
    }
  }
  function wire(host) {
    if (host.getAttribute('data-wired')) return; host.setAttribute('data-wired', '1');
    host.addEventListener('click', function (e) {
      if (e.target.closest('[data-unfold]')) {
        FOLD = false; host.classList.remove('folded');
        window.scrollTo({ top: Math.max(0, host.getBoundingClientRect().top + window.pageYOffset - 110), behavior: 'smooth' });
        return;
      }
      var row = e.target.closest('button[data-row]');
      if (row) {   // one section open at a time; tapping the open one closes it
        var k = row.getAttribute('data-row'), i = +row.getAttribute('data-i');
        OPEN[k] = OPEN[k] === i ? -1 : i;
        var y0 = row.getBoundingClientRect().top;
        draw(host);
        var nb = host.querySelector('button[data-row="' + k + '"][data-i="' + i + '"]');
        if (nb) { window.scrollBy(0, nb.getBoundingClientRect().top - y0); nb.focus({ preventScroll: true }); }
        return;
      }
      var a = e.target.closest('a[data-tab]'); if (!a) return;
      e.preventDefault();
      var t = a.getAttribute('data-tab');
      FROM_TK = !!a.closest('.ovc');
      if (t === 'takeaway') { FOLD = false; host.classList.remove('folded'); }
      else if (!FOLD) {
        FOLD = true; FOLD_ANIM = true;
        requestAnimationFrame(function () { requestAnimationFrame(function () { host.classList.add('folded'); FOLD_ANIM = false; }); });
      }
      history.replaceState(history.state, '', location.pathname + location.search + '#' + t);
      draw(host);
      var bar = host.querySelector('.tabs');
      if (bar && bar.getBoundingClientRect().top < 0) window.scrollTo({ top: bar.getBoundingClientRect().top + window.pageYOffset - 110 });
    });
  }

  var D = null, FW = null, loading = false, waiting = [];
  function load(cb) {
    // Queue every caller: the site can rebuild the page while data is loading, and the redrawn page must hear back too
    if (D) return cb(D);
    waiting.push(cb); if (loading) return; loading = true;
    fetch(DATA).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { D = j && j.data || null; })
      .catch(function () { D = null; }).then(function () { loading = false; var w = waiting; waiting = []; w.forEach(function (f) { f(D); }); });
  }
  var fwAsked = false;
  function loadFw(cb) {
    if (FW) return cb();
    if (fwAsked) return; fwAsked = true;
    fetch(FW_API).then(function (r) { return r.ok ? r.json() : null; }).then(function (f) { if (f && f.tilt != null) { FW = f; cb(); } }).catch(function () {});
  }

  var onHash = null;
  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75ins')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75ins';
    host.innerHTML = '<div class="wrap"><div class="eyebrow">Insights</div><div class="load">Loading…</div></div>';
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.voices) { host.querySelector('.load').textContent = 'Insights are unavailable right now. Please try again shortly.'; return; }
      draw(host); wire(host);
      loadFw(function () { if (document.body.contains(host)) draw(host); });
      if (!onHash) { onHash = function () { var h = document.querySelector('.p75ins'); if (h && D) draw(h); }; window.addEventListener('hashchange', onHash); }
    });
  }
  function clear() {
    var h = document.querySelector('.p75ins'); if (h) h.remove();
    if (onHash) { window.removeEventListener('hashchange', onHash); onHash = null; }
  }

  // page(data[, fedwatch]) returns the markup, for checking a content update without the site
  window.P75INS = { render: render, clear: clear, page: function (d, f) { return page(d, f || null); } };
})();
