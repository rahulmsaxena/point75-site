/* Point75 shell: the header (Menu, logo, Sign in) and the left menu panel shared by the new home page and Journal.
   Draws a full-screen layer over the site builder's page, so it does not depend on the builder's layout.
   window.P75SHELL.mount(page) returns the layer's main area; unmount() removes it.
   Built from the landing mock (Point75-BusinessPlan/landing/rope-hero.html). (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75SHELL) return;
  var FONTS = 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Hedvig+Letters+Serif:opsz@12..24&display=swap';
  var CSS = "#p75L{position:fixed;inset:0;z-index:9990;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;-webkit-font-smoothing:antialiased;line-height:normal;text-align:left}\n#p75L a{text-decoration:none}#p75L button{font-family:inherit;-webkit-appearance:none;appearance:none}\n#p75L h1,#p75L h2,#p75L h3,#p75L p,#p75L ul,#p75L ol{margin:0;padding:0}\n#p75L .p75main{flex:1;display:flex;flex-direction:column;min-height:0}\n#p75L .p75hdr{width:100%;flex:none}\nhtml.p75L-on,html.p75L-on body{overflow:hidden!important}\n#p75L{--bg:#0D0E10;--ink:#F3F0EA;--muted:#A9A69F;--line:#D8D4CB;--gold:#FFD23F}\n#p75L,#p75L *{box-sizing:border-box}\n#p75L [hidden]{display:none!important}\n#p75L{margin:0;background:var(--bg);color:var(--ink);font-family:Jost,system-ui,sans-serif;overflow-x:hidden}\n#p75L .p75hdr{max-width:1240px;margin:0 auto;padding:20px 16px;display:flex;justify-content:space-between;align-items:center}\n#p75L .logo{font-family:'Hedvig Letters Serif',Georgia,serif;font-size:30px;line-height:1;color:var(--ink);text-decoration:none;letter-spacing:-.005em;display:inline-flex;align-items:center;min-height:44px}\n#p75L .dlogo{font-size:30px}\n#p75L .logo span{color:var(--gold)}\n#p75L .signin{font-size:13px;letter-spacing:.16em;text-transform:uppercase;min-height:44px;display:inline-flex;align-items:center;padding:0 18px;border:1px solid #3A3B40;border-radius:999px;color:var(--ink);text-decoration:none}\n#p75L .p75hdr{display:grid!important;grid-template-columns:1fr auto 1fr}\n#p75L .p75hdr .logo{justify-self:center}\n#p75L .p75hdr .signin{justify-self:end}\n#p75L .menu-btn{justify-self:start;display:inline-flex;align-items:center;gap:12px;min-height:44px;padding:0 4px;background:none;border:0;color:var(--ink);font:500 13px Jost,sans-serif;letter-spacing:.22em;text-transform:uppercase;cursor:pointer}\n#p75L .menu-btn .bars{display:grid;gap:6px;width:22px}\n#p75L .menu-btn .bars i{display:block;height:1.5px;background:currentColor}\n#p75L .menu-btn:hover{color:var(--gold)}\n@media (max-width:520px){#p75L .menu-btn .mlabel{display:none}\n#p75L .signin{padding:0 14px}\n#p75L .logo{font-size:30px}}\n#p75L .scrim{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:20;opacity:0;transition:opacity .35s}\n#p75L .scrim.on{opacity:1}\n#p75L .drawer{position:fixed;inset:0 auto 0 0;z-index:30;width:min(820px,100vw);background:#0A0B0C;border-right:1px solid #222327;display:flex;flex-direction:column;transform:translateX(-100%);transition:transform .45s cubic-bezier(.2,.7,.1,1)}\n#p75L .drawer.on{transform:none}\n#p75L .dtop{padding:20px 28px}\n#p75L .close{display:inline-flex;align-items:center;gap:12px;min-height:44px;background:none;border:0;color:var(--ink);font:500 13px Jost,sans-serif;letter-spacing:.22em;text-transform:uppercase;cursor:pointer}\n#p75L .close:hover{color:var(--gold)}\n#p75L .panes{flex:1;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:0}\n#p75L .pane{padding:24px 40px 32px;overflow:auto}\n#p75L .pane ul{list-style:none;margin:0;padding:0}\n#p75L .main li{border-bottom:1px solid #1E1F23}\n#p75L .main button,#p75L .main .leaf{display:block;width:100%;text-align:left;background:none;border:0;padding:18px 0;color:var(--ink);font-family:Jost,sans-serif;font-weight:400;font-size:19px;letter-spacing:.16em;text-transform:uppercase;line-height:1.2;cursor:pointer;text-decoration:none}\n#p75L .main em{display:block;margin-top:7px;font:300 13px Jost,sans-serif;font-style:normal;color:var(--muted);letter-spacing:.04em;text-transform:none}\n#p75L .main button:hover,#p75L .main .leaf:hover,#p75L .main button[aria-expanded=true]{color:var(--gold)}\n#p75L .main .soon{color:#8E8A80}\n#p75L .subpane h2{font-weight:400!important;letter-spacing:.3em!important}\n#p75L .dfoot{display:flex;flex-direction:column;gap:4px;margin-top:36px}\n#p75L .dfoot a{min-height:40px;display:flex;align-items:center;color:var(--muted);text-decoration:none;font:400 12px Jost,sans-serif;letter-spacing:.16em;text-transform:uppercase}\n#p75L .dfoot a:hover{color:var(--ink)}\n#p75L .subpane{border-left:1px solid #1E1F23}\n#p75L .subpane .back{display:none}\n#p75L .subpane h2{margin:8px 0 18px;font:500 12px Jost,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#C9A227}\n#p75L .subpane a{width:100%;display:flex;flex-direction:column;padding:13px 0;border-bottom:1px solid #1A1B1F;color:var(--ink);text-decoration:none;font:400 14px Jost,sans-serif;letter-spacing:.16em;text-transform:uppercase}\n#p75L .subpane a strong{font-weight:400}\n#p75L .subpane a span{margin-top:6px;font-size:13px;font-weight:300;color:var(--muted);letter-spacing:.04em;text-transform:none}\n#p75L .subpane a:hover{color:var(--gold)}\n#p75L .subpane h3{margin:26px 0 2px;font:400 11px Jost,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#8E8A80}\n#p75L .subpane p{color:var(--muted);font-size:15px;line-height:1.6}\n@media (max-width:760px){#p75L .panes{grid-template-columns:1fr;position:relative}\n#p75L .pane{padding:12px 24px 28px}\n#p75L .subpane{position:absolute;inset:0;background:#0A0B0C;border-left:0;transform:translateX(100%);transition:transform .35s}\n#p75L .subpane.on{transform:none}\n#p75L .subpane .back{display:inline-flex;align-items:center;gap:8px;min-height:44px;background:none;border:0;color:var(--muted);font:500 13px Jost,sans-serif;letter-spacing:.18em;text-transform:uppercase;padding:0;margin-bottom:8px;cursor:pointer}\n#p75L .main button,#p75L .main .leaf{font-size:17px;padding:16px 0}}\n@media (prefers-reduced-motion: reduce){#p75L .drawer,#p75L .scrim,#p75L .subpane{transition:none}}\n#p75L .foot{text-align:center;color:#8E8A80;font-size:11.5px;letter-spacing:.04em;padding:14px 16px 18px;margin:0}";
  var MARKUP = "<header class=\"p75hdr\">\n<button class=\"menu-btn\" id=\"menuBtn\" aria-expanded=\"false\" aria-controls=\"drawer\"><span class=\"bars\" aria-hidden=\"true\"><i></i><i></i></span><span class=\"mlabel\">Menu</span></button>\n<a class=\"logo\" href=\"/\">Point<span>75</span></a>\n<a class=\"signin\" href=\"https://tools.point75.io/signin\">Sign in</a>\n</header>\n<div class=\"scrim\" id=\"scrim\" hidden></div>\n<aside class=\"drawer\" id=\"drawer\" aria-label=\"Site menu\" hidden>\n<div class=\"dtop\" style=\"display:flex;justify-content:space-between;align-items:center\"><button class=\"close\" id=\"closeBtn\" aria-label=\"Close menu\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"M5 5l14 14M19 5L5 19\"/></svg><span>Close</span></button><a class=\"logo dlogo\" href=\"/\">Point<span>75</span></a></div>\n<div class=\"panes\">\n<nav class=\"pane main\" aria-label=\"Sections\">\n<ul>\n<li><button data-k=\"intelligence\">Intelligence<em>Every move, explained</em></button></li>\n<li><button data-k=\"outlook\">Outlook<em>The odds ahead</em></button></li>\n<li><button data-k=\"kinetics\">Kinetics<em>The forces moving the bond market</em></button></li>\n<li><button data-k=\"tools\">Tools<em>Portfolio, credit, markets, tax</em></button></li>\n<li><button data-k=\"journal\">Journal<em>Essays, insights and guides</em></button></li>\n<li><button data-k=\"terminal\" class=\"soon\">Terminal<em>Ask for any number \u00b7 coming soon</em></button></li>\n<li><button data-k=\"sectors\" class=\"soon\">Sectors<em>Coming next</em></button></li>\n</ul>\n<div class=\"dfoot\"><a href=\"https://www.point75.io/start-here\">New to bonds? Start here</a><a href=\"https://www.point75.io/about\">About</a><a href=\"https://www.point75.io/contact\">Contact</a></div>\n</nav>\n<div class=\"pane subpane\" id=\"sub\" aria-live=\"polite\"></div>\n</div>\n</aside>";
  function wireMenu(root){
  var SITE='https://www.point75.io',TOOLS='https://tools.point75.io';
  var MENU={
   intelligence:{t:'Intelligence',groups:[[null,[
    ['Today’s summary','The latest close, move by move',SITE+'/intelligent-summary'],
    ['Archive','Every summary, by date',SITE+'/intelligent-summary#archive'],
    ['Bond Summary','The daily recap',SITE+'/bond-summary']]]]},
   outlook:{t:'Outlook',groups:[
    [null,[['All outlooks','The odds, the range, the reasoning',TOOLS+'/outlook'],
     ['Rates Outlook','The 10-year a year from now',TOOLS+'/outlook/rates'],
     ['AI: Boom or Bust','Odds of an AI bust',TOOLS+'/outlook/ai'],
     ['Who’s paying for AI?','Capex, cash and debt of 12 builders',TOOLS+'/outlook/ai-spending']]],
    ['Situations',[['Fed readiness','',TOOLS+'/outlook/fed'],['Inflation','',TOOLS+'/outlook/inflation'],['Government debt','',TOOLS+'/outlook/government-debt'],
     ['Oil','',TOOLS+'/outlook/oil'],['Metals','',TOOLS+'/outlook/metals'],['Geopolitics','',TOOLS+'/outlook/geopolitics'],['Emerging markets','',TOOLS+'/outlook/emerging-markets']]]]},
   kinetics:{t:'Kinetics',groups:[[null,[
    ['All of Kinetics','The forces moving the bond market',SITE+'/kinetics'],
    ['Pulse','Today’s readings at a glance',SITE+'/pulse'],
    ['Debt Trap','The cost of carrying the debt',SITE+'/debt-trap'],
    ['Economic Indicators','The data behind the moves',SITE+'/economic-indicators'],
    ['News','What the market is reading',SITE+'/news']]]]},
   tools:{t:'Tools',groups:[
    ['Portfolio',[['Treasury Finder','Every outstanding Treasury',TOOLS+'/portfolio/treasury-finder'],['The Ledger','Build and stress-test a portfolio',TOOLS+'/portfolio/ledger']]],
    ['Credit',[['Credit Stress','Where corporate credit is cracking',TOOLS+'/market-intelligence/credit-stress'],['Sector Credit','',TOOLS+'/market-intelligence/sector-credit'],['Lenders','',TOOLS+'/market-intelligence/lenders']]],
    ['Markets',[['AI Investment','',TOOLS+'/market-intelligence/ai-investment'],['Congressional Trading','',TOOLS+'/market-intelligence/congressional-trading'],['Geopolitical Risk','',TOOLS+'/macro-geopolitics/geopolitical-risk'],['Market Crashes','',TOOLS+'/macro-geopolitics/market-crashes']]],
    ['Tax & retirement',[['Retirement Accounts','',TOOLS+'/tax-retirement/retirement-accounts'],['Tax Alpha','',TOOLS+'/tax-retirement/tax-alpha']]]]},
   journal:{t:'Journal',groups:[[null,[
    ['All essays','Long-form analysis',SITE+'/journal'],
    ['Insights','What the biggest voices in bonds are saying',SITE+'/insights'],
    ['Education','Bond guides from the ground up',SITE+'/education'],
    ['New to bonds?','Start here',SITE+'/start-here']]]]},
   terminal:{t:'Terminal',note:'A command bar for every number on Point75: type a ticker, a yield or a question. Being built now.'},
   sectors:{t:'Sectors',note:'The parts of the economy that move bonds: power, defense, healthcare, minerals, freight. Coming next.'}
  };
  var btn=root.querySelector('#menuBtn'),dr=root.querySelector('#drawer'),sc=root.querySelector('#scrim'),cl=root.querySelector('#closeBtn'),sub=root.querySelector('#sub');
  var keys=[].slice.call(dr.querySelectorAll('[data-k]'));
  function show(k){var m=MENU[k];keys.forEach(function(b){b.setAttribute('aria-expanded',b.dataset.k===k?'true':'false');});
   var h='<button class="back" type="button">← Back</button><h2>'+m.t+'</h2>';
   if(m.groups)m.groups.forEach(function(g){if(g[0])h+='<h3>'+g[0]+'</h3>';h+=g[1].map(function(it){return '<a href="'+it[2]+'"><strong>'+it[0]+'</strong>'+(it[1]?'<span>'+it[1]+'</span>':'')+'</a>';}).join('');});
   if(m.note)h+='<p>'+m.note+'</p>';
   sub.innerHTML=h;sub.classList.add('on');sub.querySelector('.back').onclick=function(){sub.classList.remove('on');keys.forEach(function(b){b.setAttribute('aria-expanded','false');});(dr.querySelector('[data-k="'+k+'"]')||cl).focus();};}
  keys.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.k);});
   b.addEventListener('mouseenter',function(){if(window.matchMedia('(min-width:761px)').matches)show(b.dataset.k);});});
  function open(){dr.hidden=false;sc.hidden=false;requestAnimationFrame(function(){dr.classList.add('on');sc.classList.add('on');});btn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';
   if(window.matchMedia('(min-width:761px)').matches)show('intelligence');cl.focus();}
  function close(){dr.classList.remove('on');sc.classList.remove('on');btn.setAttribute('aria-expanded','false');document.body.style.overflow='';sub.classList.remove('on');
   setTimeout(function(){dr.hidden=true;sc.hidden=true;},450);btn.focus();}
  btn.onclick=open;cl.onclick=close;sc.onclick=close;
  dr.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  function head() {
    if (!document.getElementById('p75L-fonts')) { var l = document.createElement('link'); l.id = 'p75L-fonts'; l.rel = 'stylesheet'; l.href = FONTS; document.head.appendChild(l); }
    if (!document.getElementById('p75L-css')) { var st = document.createElement('style'); st.id = 'p75L-css'; st.textContent = CSS; document.head.appendChild(st); }
  }
  function mount(page) {
    var r = document.getElementById('p75L');
    if (r && r.getAttribute('data-page') === page) return r.querySelector('.p75main');
    if (r) unmount();
    head();
    r = document.createElement('div'); r.id = 'p75L'; r.setAttribute('data-page', page);
    r.innerHTML = MARKUP + '<div class="p75main"></div>';
    document.body.appendChild(r); document.documentElement.classList.add('p75L-on');
    wireMenu(r);
    return r.querySelector('.p75main');
  }
  function unmount() {
    var r = document.getElementById('p75L'); if (r) r.remove();
    document.documentElement.classList.remove('p75L-on');
  }
  window.P75SHELL = { mount: mount, unmount: unmount };
})();
