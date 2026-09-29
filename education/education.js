/* point75 Education pages: /education (landing) and /bond-dictionary.
   Loaded by p75.js on those pages. Content © Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75EDU) return;
  var GOLD = '#C9A227';

  // [term, also known as, plain-English meaning, example (optional)]
  var TERMS = [
    ["Accrued interest", "", "Interest a bond has earned since its last payment date but hasn't paid out yet. When you buy a bond between payment dates, you pay the seller this amount on top of the price, because they held the bond for part of the period.", "A bond pays interest every six months. You buy it three months in, so you reimburse the seller for those three months of interest."],
    ["Auction", "Treasury auction", "How the U.S. government sells new Treasury debt. Big investors bid, and the bids decide the yield the government has to pay. Weak demand at an auction pushes yields up.", ""],
    ["Basis point", "bp, bps", "One hundredth of one percent (0.01%). Bond people use it to talk about small moves in rates without saying \"point zero something.\"", "A yield rising from 4.50% to 4.75% is a 25 basis point move."],
    ["Bear market (in bonds)", "", "A period when bond prices fall, which means yields are rising. Bonds and yields always move in opposite directions.", ""],
    ["Benchmark yield", "the 10-year", "A widely watched yield that other borrowing costs are measured against. In the U.S. it is usually the 10-year Treasury yield, which strongly influences mortgage rates.", ""],
    ["Bid-to-cover ratio", "", "At a Treasury auction, how much investors tried to buy compared with how much was on sale. A higher number means stronger demand.", "A ratio of 2.5 means buyers asked for $2.50 of bonds for every $1 on offer."],
    ["Bond", "", "A loan you make to a government or company. They promise to pay you interest along the way and return your money on a set date.", ""],
    ["Bond ladder", "", "Owning several bonds that mature in different years, so some money comes back to you regularly and you are never stuck with just one interest rate.", "Bonds maturing in 1, 2, 3, 4 and 5 years; each year one matures and you can reinvest it."],
    ["Bond vigilantes", "", "Investors who sell a government's bonds in protest when they think it is borrowing or spending recklessly. Their selling pushes yields up and makes more borrowing expensive.", ""],
    ["Bull market (in bonds)", "", "A period when bond prices rise, which means yields are falling, usually because investors expect interest rates to drop.", ""],
    ["Callable bond", "", "A bond the borrower is allowed to pay back early. Borrowers usually do this when rates fall, which is bad for you: you get your money back just when you can only reinvest it at lower rates.", ""],
    ["Carry", "carry trade", "What you earn simply by holding a bond, its interest, minus what it costs to fund the position. A carry trade borrows cheap short-term money to buy higher-yielding bonds.", ""],
    ["Clean price / dirty price", "", "The clean price is the quoted price of a bond. The dirty price is what you actually pay, which is the clean price plus accrued interest.", ""],
    ["Convexity", "", "A refinement of duration. It captures the fact that a bond's price doesn't change in a perfectly straight line as rates move. For most everyday purposes, duration tells you enough.", ""],
    ["Corporate bond", "", "A bond issued by a company rather than a government. It usually pays more than a Treasury because there is more risk the company can't pay.", ""],
    ["Coupon", "coupon rate", "The fixed interest a bond pays each year, shown as a percentage of its face value. The name comes from old paper bonds that had coupons you clipped and mailed in to get paid.", "A $1,000 bond with a 5% coupon pays $50 a year."],
    ["Credit rating", "", "A grade from an agency such as S&P, Moody's or Fitch on how likely a borrower is to pay back. AAA is the safest; anything below BBB- is considered junk.", ""],
    ["Credit risk", "default risk", "The risk that the borrower doesn't pay you the interest or your money back in full.", ""],
    ["Credit spread", "spread", "How much extra yield a riskier bond pays compared with a safe government bond of similar length. Wider spreads mean investors are more nervous.", "A company bond yields 6% while the matching Treasury yields 4.5%: the spread is 1.5%, or 150 basis points."],
    ["Current yield", "", "A bond's yearly interest divided by its current market price. It is a quick snapshot and ignores any gain or loss you'll have when the bond matures.", ""],
    ["Default", "", "When a borrower misses an interest payment or can't repay the loan. Bondholders may get back only part of their money, or nothing.", ""],
    ["Discount", "trading below par", "When a bond's price is below its face value. This happens when its coupon is lower than current rates, so buyers pay less for it.", "A $1,000 bond selling for $950 is trading at a discount."],
    ["Duration", "", "A measure of how sensitive a bond's price is to changes in interest rates. The higher the duration, the more the price swings.", "A bond with a duration of 7 would fall roughly 7% if rates rose by 1 percentage point."],
    ["Face value", "par value, principal", "The amount the borrower promises to repay when the bond matures, usually $1,000 per bond. Interest is calculated on this amount.", ""],
    ["Fallen angel", "", "A bond that was investment grade but has been downgraded to junk. Many funds are required to sell these, which can push their prices down sharply.", ""],
    ["Fed funds rate", "", "The short-term interest rate the Federal Reserve sets. When the Fed \"raises rates\" this is the rate it raises, and it ripples out to loans, savings accounts and bond yields.", ""],
    ["Fiscal dominance", "", "When a government's debt is so large that the central bank feels pressured to keep interest rates low so the government can afford its interest bill, even if inflation says rates should go up.", ""],
    ["Fixed income", "", "Another name for bonds and similar investments, because they typically pay a fixed, predictable amount of income.", ""],
    ["Floating-rate note", "floater", "A bond whose interest payments go up and down with a benchmark rate, instead of staying fixed. Its price moves much less when rates change.", ""],
    ["High-yield bond", "junk bond", "A bond rated below investment grade. It pays more interest to make up for a higher chance the borrower can't pay.", ""],
    ["Inflation risk", "", "The risk that rising prices eat away the value of a bond's fixed payments. $50 a year buys less when everything costs more.", ""],
    ["Interest rate risk", "", "The risk that rates rise and the value of the bonds you already own falls. The longer the bond, the bigger this risk.", ""],
    ["Inverted yield curve", "inversion", "When short-term bonds pay more than long-term bonds. It is unusual, and it has often come before recessions, because it suggests investors expect rates to fall.", ""],
    ["Investment grade", "", "Bonds rated BBB- or higher, seen as relatively safe. Many pension funds and insurers are only allowed to own these.", ""],
    ["Issuer", "", "The government, agency or company that borrows money by selling a bond.", ""],
    ["Liquidity", "", "How easily you can buy or sell a bond quickly without moving its price much. Treasuries are very liquid; many small company or municipal bonds are not.", ""],
    ["Long end / short end", "", "The long end is bonds that mature far in the future, such as 10 to 30 years. The short end is bonds that mature soon, from a few months to about two years.", ""],
    ["Maturity", "", "The date the bond ends and the borrower must repay your money.", ""],
    ["Municipal bond", "muni", "A bond issued by a U.S. state, city or local agency to pay for things like schools and roads. The interest is often free of federal income tax.", ""],
    ["Nominal yield", "", "The yield before adjusting for inflation. The yield you see quoted is almost always nominal.", ""],
    ["Premium", "trading above par", "When a bond's price is above its face value. This happens when its coupon is higher than current rates, so buyers pay extra for it.", ""],
    ["Primary / secondary market", "", "The primary market is where new bonds are first sold by the issuer. The secondary market is where investors buy and sell existing bonds from each other afterwards.", ""],
    ["Principal", "", "The original amount lent, which is paid back at maturity. For most bonds it is the same as the face value.", ""],
    ["Quantitative easing", "QE", "When a central bank buys large amounts of bonds to push down long-term interest rates and pump money into the financial system.", ""],
    ["Quantitative tightening", "QT", "The reverse of QE: the central bank shrinks its bond holdings, which tends to push long-term rates up.", ""],
    ["Real yield", "", "A bond's yield minus inflation: what you actually earn in buying power.", "A 4.5% yield with 3% inflation is roughly a 1.5% real yield."],
    ["Refinancing", "rollover", "Paying off old debt by issuing new debt. When old debt was borrowed cheaply and new rates are higher, refinancing raises the borrower's interest bill.", ""],
    ["Reinvestment risk", "", "The risk that when a bond pays you interest or matures, you can only reinvest that money at lower rates than before.", ""],
    ["Repo", "repurchase agreement", "A very short-term loan, often overnight, where one party sells bonds and agrees to buy them back the next day at a slightly higher price. It is a key piece of the financial system's plumbing.", ""],
    ["Seniority", "", "Your place in line if a company goes bust. Senior bondholders get paid back before junior (subordinated) ones, and all bondholders come before shareholders.", ""],
    ["Sovereign bond", "", "A bond issued by a national government, such as U.S. Treasuries, German Bunds or Japanese JGBs.", ""],
    ["Stagflation", "", "The painful mix of weak economic growth and high inflation at the same time. It is hard to fix, because the usual cure for one makes the other worse.", ""],
    ["Steepening / flattening", "", "Describes the gap between long-term and short-term yields. Steepening means the gap is widening; flattening means it is shrinking.", ""],
    ["Term premium", "", "The extra yield investors demand for locking their money up for a long time instead of rolling over short-term bonds.", ""],
    ["TIPS", "Treasury Inflation-Protected Securities", "U.S. government bonds whose principal rises with inflation, so your payments keep their buying power.", ""],
    ["Treasury bills, notes and bonds", "T-bills, T-notes, T-bonds", "U.S. government debt, named by length. Bills mature in a year or less, notes in 2 to 10 years, and bonds in 20 or 30 years.", ""],
    ["Yield", "", "The return you get from a bond, shown as a yearly percentage. When bond prices fall, yields rise, and vice versa, like two ends of a seesaw.", ""],
    ["Yield curve", "", "A chart of yields for bonds of different lengths, from short to long. Normally it slopes upward, because lending for longer usually pays more.", ""],
    ["Yield to maturity", "YTM", "The total yearly return you'd earn if you bought a bond today at its current price and held it until it matures, counting both its interest and any gain or loss on price.", ""],
    ["Zero-coupon bond", "zero", "A bond that pays no interest along the way. You buy it at a deep discount and get the full face value back at maturity; the difference is your return.", "Pay $780 today, get $1,000 back in five years."]
  ];
  TERMS.sort(function (a, b) { return a[0].localeCompare(b[0]); });

  var CSS =
    '.p75edu{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--muted:#B8B2A5;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75edu *{box-sizing:border-box}' +
    '.p75edu .wrap{max-width:760px;margin:0 auto;padding:44px 20px 72px}' +
    '.p75edu .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75edu h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:36px;line-height:1.15;margin:8px 0 10px;color:var(--cream);letter-spacing:-.01em}' +
    '.p75edu .lead{color:var(--muted);font-size:15.5px;line-height:1.65;margin:0 0 26px;max-width:600px}' +
    '.p75edu .search{position:sticky;z-index:5;background:var(--ink);padding:12px 0 10px;border-bottom:1px solid var(--line)}' +
    '.p75edu input{width:100%;background:var(--panel);border:1px solid var(--line);border-radius:10px;color:var(--cream);' +
      'font:500 15px Manrope,system-ui,sans-serif;padding:11px 14px;outline:none}' +
    '.p75edu input:focus{border-color:var(--gold)}' +
    '.p75edu .letters{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px}' +
    '.p75edu .letters a{color:var(--muted);text-decoration:none;font-weight:700;font-size:12px;padding:3px 6px;border-radius:5px;cursor:pointer}' +
    '.p75edu .letters a:hover{color:#111;background:var(--gold)}' +
    '.p75edu .letters a.off{opacity:.25;pointer-events:none}' +
    '.p75edu .group h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;color:var(--gold);font-size:22px;margin:30px 0 4px}' +
    '.p75edu .term{border-top:1px solid var(--line);padding:15px 0}' +
    '.p75edu .term h3{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:18.5px;margin:0 0 5px;color:var(--cream)}' +
    '.p75edu .term h3 small{font-family:Manrope,sans-serif;color:var(--muted);font-size:12px;margin-left:8px;letter-spacing:.02em}' +
    '.p75edu .term p{margin:0;font-size:15px;line-height:1.65;color:#d9d4c8}' +
    '.p75edu .term .eg{margin-top:6px;color:var(--muted);font-size:14px}' +
    '.p75edu .term .eg b{color:var(--gold);font-weight:600}' +
    '.p75edu .empty{color:var(--muted);padding:30px 0;display:none}' +
    '.p75edu .foot{margin-top:48px;color:#8d887e;font-size:13px;line-height:1.6;border-top:1px solid var(--line);padding-top:18px}' +
    '.p75edu .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px;margin-top:10px}' +
    '.p75edu .card{display:block;text-decoration:none;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:22px;color:var(--cream);transition:border-color .2s}' +
    '.p75edu a.card:hover{border-color:var(--gold)}' +
    '.p75edu .card h3{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:19px;margin:6px 0 8px}' +
    '.p75edu .card p{color:var(--muted);font-size:14px;line-height:1.55;margin:0}' +
    '.p75edu .card .go{color:var(--gold);font-weight:700;font-size:14px;margin-top:14px;display:inline-block}' +
    '.p75edu .card.soon{opacity:.55}' +
    '.p75edu .text,.p75edu .text *{-webkit-user-select:none;user-select:none}' +
    '@media (max-width:600px){.p75edu h1{font-size:30px}.p75edu .term h3{font-size:18px}}';

  function once() {
    if (document.getElementById('p75edu-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700&display=swap';
    document.head.appendChild(f);
    var st = document.createElement('style'); st.id = 'p75edu-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  var foot = function () { return '<p class="foot">Definitions are simplified for learning and are not financial advice.<br>&copy; ' +
    new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p>'; };

  function landing() {
    return '<div class="wrap text"><div class="eyebrow">Education</div><h1>Learn the language of bonds</h1>' +
      '<p class="lead">Short, plain-English guides to the ideas behind the essays, so you can follow the argument without a finance degree.</p>' +
      '<div class="cards">' +
        '<a class="card" href="/bond-dictionary"><div class="eyebrow">Guide</div><h3>Bond Dictionary</h3>' +
          '<p>' + TERMS.length + ' bond terms explained in everyday language, from basis points to yield curves.</p><span class="go">Open the dictionary &rarr;</span></a>' +
        '<div class="card soon"><div class="eyebrow">Coming soon</div><h3>More guides</h3><p>New explainers will appear here as they are written.</p></div>' +
      '</div>' + foot() + '</div>';
  }

  function dictionary() {
    return '<div class="wrap"><div class="text"><div class="eyebrow"><a href="/education" style="color:inherit;text-decoration:none">Education</a></div>' +
      '<h1>Bond Dictionary</h1><p class="lead">Bond talk is full of jargon. Here is what the words actually mean, in plain English, with a quick example where it helps.</p></div>' +
      '<div class="search"><input type="search" placeholder="Search a term, e.g. yield, duration, spread…" aria-label="Search the dictionary">' +
      '<nav class="letters" aria-label="Jump to letter"></nav></div>' +
      '<div class="list text"></div><p class="empty">No matching terms. Try a different word.</p>' + foot() + '</div>';
  }

  function renderTerms(root, q) {
    q = (q || '').trim().toLowerCase();
    var groups = {}, html = '', count = 0;
    TERMS.forEach(function (t) {
      if (q && (t[0] + ' ' + t[1] + ' ' + t[2]).toLowerCase().indexOf(q) < 0) return;
      var L = t[0][0].toUpperCase(); (groups[L] = groups[L] || []).push(t); count++;
    });
    Object.keys(groups).sort().forEach(function (L) {
      html += '<section class="group"><h2 data-letter="' + L + '">' + L + '</h2>';
      groups[L].forEach(function (t) {
        html += '<div class="term"><h3>' + esc(t[0]) + (t[1] ? '<small>' + esc(t[1]) + '</small>' : '') + '</h3><p>' + esc(t[2]) + '</p>' +
          (t[3] ? '<p class="eg"><b>Example:</b> ' + esc(t[3]) + '</p>' : '') + '</div>';
      });
      html += '</section>';
    });
    root.querySelector('.list').innerHTML = html;
    root.querySelector('.empty').style.display = count ? 'none' : 'block';
    root.querySelector('.letters').innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (L) {
      return '<a data-go="' + L + '"' + (groups[L] ? '' : ' class="off"') + '>' + L + '</a>';
    }).join('');
  }

  function headerHeight() {
    var h = document.querySelector('.top-blocks--sticky, header');
    return h ? Math.max(0, h.getBoundingClientRect().bottom) : 0;
  }

  // Build (or keep) the page content. Called every second by p75.js.
  function render(path) {
    var main = document.querySelector('main') || document.body;
    var host = document.querySelector('.p75edu');
    if (host && host.getAttribute('data-path') === path) return;
    if (host) host.remove();
    once();
    host = document.createElement('div');
    host.className = 'p75edu'; host.setAttribute('data-path', path);
    host.innerHTML = path === '/education' ? landing() : dictionary();
    var blocks = main.querySelector('.page__blocks');
    if (blocks) blocks.appendChild(host); else main.appendChild(host);

    if (path !== '/education') {
      renderTerms(host, '');
      var search = host.querySelector('.search');
      search.style.top = headerHeight() + 'px';
      host.querySelector('input').addEventListener('input', function (e) { renderTerms(host, e.target.value); });
      host.querySelector('.letters').addEventListener('click', function (e) {
        var a = e.target.closest('a[data-go]'); if (!a) return;
        var h = host.querySelector('h2[data-letter="' + a.getAttribute('data-go') + '"]'); if (!h) return;
        var y = h.getBoundingClientRect().top + window.pageYOffset - headerHeight() - search.offsetHeight - 10;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    }
    // copy protection like the essays (the search box still works normally)
    host.addEventListener('contextmenu', function (e) { if (!e.target.closest('input')) e.preventDefault(); });
    host.addEventListener('copy', function (e) {
      if (e.target.closest && e.target.closest('input')) return;
      e.preventDefault();
      if (e.clipboardData) e.clipboardData.setData('text/plain', '© Rahul Saxena, point75.io. All rights reserved.');
    });
  }

  function clear() { var h = document.querySelector('.p75edu'); if (h) h.remove(); }

  window.P75EDU = { render: render, clear: clear, count: TERMS.length };
})();
