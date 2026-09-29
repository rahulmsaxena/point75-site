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

  // History of bonds: [when, headline, plain-English story]
  var HISTORY = [
    ["c. 2000–1700 BC", "Debt written in clay", "In ancient Mesopotamia, loans of grain and silver were recorded on clay tablets, with the amount, the interest and the date to repay. Around 1754 BC the Code of Hammurabi even capped interest rates. The idea of a written promise to repay with interest is more than 3,500 years old."],
    ["1100s–1262", "Venice invents the tradeable government bond", "To pay for its wars, Venice forced wealthy citizens to lend it money. In 1262 it bundled those loans into one fund, the Monte, paying a steady 5% a year. The claims could be bought and sold, and a lively market for them grew up around the Rialto, making this one of the first real secondary markets for government debt."],
    ["1300s–1400s", "Italian city-states follow", "Florence and Genoa built their own public debt funds. Genoa's Casa di San Giorgio, founded in 1407, managed the city's debts and collected taxes to pay bondholders, an early version of a debt office."],
    ["1648", "The bond that still pays", "A Dutch water board, Lekdijk Bovendams, borrowed money to maintain its dikes and promised to pay interest forever. One of these bonds is now kept at Yale University, and it still collects interest today, more than 375 years later."],
    ["1694", "The Bank of England is born to lend to the Crown", "Short of money for war with France, England created the Bank of England, whose first job was to lend the government £1.2 million. Government borrowing became organised, regular and trusted, a big reason Britain could outspend its rivals."],
    ["1751", "Consols: the never-ending bond", "Britain rolled many older debts into a single perpetual bond called the consol, which paid interest with no end date. Consols financed wars for two centuries, and the government finally repaid the last of them in 2015."],
    ["1790–1792", "America earns its credit", "Treasury Secretary Alexander Hamilton had the new federal government take on the states' Revolutionary War debts and issue new bonds, building the country's credit from scratch. In 1792 traders signed the Buttonwood Agreement under a tree on Wall Street; government bonds were among the first things they traded."],
    ["1909", "Bonds get report cards", "John Moody began publishing letter grades for railroad bonds, the start of the credit ratings still used today by Moody's, S&P and Fitch."],
    ["1917–1919", "Everyone becomes a bondholder", "To pay for World War I, the U.S. sold Liberty Bonds directly to the public with parades, posters and movie stars. Millions of ordinary Americans owned a bond for the first time."],
    ["1929", "The first Treasury bills", "The U.S. Treasury began selling short-term bills at auction, creating the ultra-safe, short-dated debt that today anchors the whole financial system."],
    ["1951", "The Fed gets its independence", "During and after World War II, the Fed held interest rates down to keep government borrowing cheap. The 1951 Treasury–Fed Accord ended that, freeing the Fed to set rates for the economy rather than for the Treasury."],
    ["1981", "Yields hit their peak", "To break runaway inflation, Paul Volcker's Fed pushed rates to record highs. The 10-year Treasury yield reached nearly 16%, then began a four-decade decline that made bonds one of the best investments of a generation."],
    ["1980s", "Junk bonds and the modern market", "Riskier companies began borrowing directly from investors through high-yield “junk” bonds. New tools such as zero-coupon bonds and mortgage-backed securities turned bonds into a vast, fast-moving market."],
    ["1997", "Protection against inflation", "The U.S. began issuing TIPS, Treasury bonds whose value rises with inflation, giving savers a safe way to protect their buying power."],
    ["2008–2014", "Quantitative easing", "After the financial crisis, central banks bought trillions of dollars of bonds to push interest rates down and keep money flowing. The bond market and central banks became more intertwined than ever."],
    ["2014–2021", "Paying to lend", "In Europe and Japan, yields fell below zero. At the peak, investors held well over $15 trillion of bonds that were guaranteed to lose money if held to maturity, something unthinkable for most of history."],
    ["2022", "The great bond reset", "With inflation back, central banks raised rates at the fastest pace in decades. Bond prices fell sharply, and 2022 became one of the worst years for bond investors on record."],
    ["Today", "A $40 trillion question", "U.S. federal debt has crossed $40 trillion, and interest costs now rival the biggest items in the budget. The oldest question in finance is back: who lends, at what price, and on what trust?"]
  ];


  // Classification of bonds: [section title, intro, [[name, plain-English explanation], ...]]
  var TYPES = [
    ["U.S. Treasuries", "Debt issued by the U.S. government. Backed by the government's ability to tax, they are treated as the safest dollar investment and the benchmark every other bond is priced against.", [
      ["Treasury bills (T-bills)", "Short-term, maturing in a year or less. They pay no interest along the way; you buy them below face value and get the full amount back at maturity."],
      ["Treasury notes (T-notes)", "Medium-term: 2, 3, 5, 7 or 10 years. They pay interest every six months. The 10-year note is the most watched interest rate in the world."],
      ["Treasury bonds (T-bonds)", "Long-term: 20 or 30 years, paying interest every six months. Their prices swing the most when rates move."],
      ["TIPS", "Treasury Inflation-Protected Securities. The principal rises with inflation, so the interest you receive keeps its buying power."],
      ["Floating-rate notes (FRNs)", "Two-year Treasuries whose interest resets every week with T-bill rates, so their price barely moves when rates change."],
      ["STRIPS", "Treasuries split into separate pieces, one for each interest payment and one for the principal, and sold individually as zero-coupon bonds."],
      ["Savings bonds (I bonds, EE bonds)", "Sold directly to individuals, not traded in the market. I bonds track inflation; EE bonds are guaranteed to double in value if held for 20 years."]
    ]],
    ["Other public-sector bonds", "Bonds from government-linked borrowers that aren't the Treasury itself.", [
      ["Agency bonds", "Issued by government-sponsored agencies such as Fannie Mae, Freddie Mac and the Federal Home Loan Banks. Very safe, and they pay slightly more than Treasuries."],
      ["Municipal bonds (munis)", "Issued by states, cities and local authorities. General-obligation munis are backed by taxes; revenue munis are paid from a specific project, such as a toll road. Interest is often free of federal income tax."],
      ["Sovereign bonds", "National government debt from other countries, such as German Bunds, UK gilts or Japanese JGBs. Risk depends on the country and on the currency the bond is in."]
    ]],
    ["Corporate bonds", "Companies borrow from investors instead of a bank. They pay more than Treasuries because a company can go bust.", [
      ["Investment grade", "Bonds from financially strong companies, rated BBB- or higher. Lower risk, lower yield."],
      ["High yield (junk)", "Bonds rated below BBB-. They pay more because the risk of default is higher. Often used to fund leveraged buyouts."],
      ["Secured vs. unsecured", "Secured bonds are backed by specific assets, such as property or equipment, that bondholders can claim in a default. Unsecured bonds (debentures) rely only on the company's promise."],
      ["Senior vs. subordinated", "Senior bondholders are paid back first if the company fails; subordinated holders only after them, so they earn more to make up for it."],
      ["Callable bonds", "The company can repay early, usually when rates fall, which caps your upside."],
      ["Convertible bonds", "Bonds that can be swapped for the company's shares, giving you a slice of the upside if the stock rises."],
      ["Commercial paper", "Very short-term company IOUs, usually under 270 days, used to cover day-to-day cash needs."]
    ]],
    ["Mortgage-backed securities (MBS)", "Thousands of home loans are pooled together, and investors buy bonds paid by the monthly mortgage payments flowing through the pool.", [
      ["Agency MBS", "Guaranteed by Ginnie Mae (backed by the U.S. government) or by Fannie Mae and Freddie Mac. Credit risk is low; the main risk is timing."],
      ["Non-agency (private-label) MBS", "Pools put together by banks without a government guarantee. These were at the center of the 2008 crisis."],
      ["Prepayment risk", "When rates fall, homeowners refinance and pay off early, so investors get their money back just when they can only reinvest it at lower rates."],
      ["CMOs", "Collateralized mortgage obligations split a pool's payments into slices (tranches) with different maturities and risks."],
      ["CMBS", "The same idea for commercial property loans: offices, malls, hotels and warehouses."]
    ]],
    ["Asset-backed and structured bonds", "Bonds built from pools of other loans or bonds, sliced by risk.", [
      ["ABS", "Asset-backed securities paid by pools of car loans, credit-card balances, student loans or equipment leases."],
      ["CBO (collateralized bond obligation)", "A pool of corporate bonds, often high yield, sold to investors in tranches. The senior tranche is paid first and is safest; the equity tranche is paid last and absorbs losses first."],
      ["CLO (collateralized loan obligation)", "The same structure built from leveraged loans to companies. Today CLOs are far larger than CBOs."],
      ["CDO", "The umbrella name for these structures. CDOs packed with risky mortgage bonds were a major cause of the 2008 financial crisis."]
    ]],
    ["Private equity and private credit", "Private equity firms buy companies using a lot of borrowed money, and a whole corner of the bond market has grown up around them.", [
      ["Buyout (LBO) debt", "When a private equity firm buys a company, most of the price is often borrowed by the company itself through high-yield bonds and leveraged loans. The company, not the firm, owes the debt."],
      ["Private equity firm bonds", "Large listed firms such as KKR, Apollo and Blackstone issue their own corporate bonds, often rated investment grade, backed by their fee income."],
      ["Collateralized fund obligations (CFOs)", "Bonds backed by stakes in a portfolio of private equity funds. Investors are repaid from the cash those funds distribute over time."],
      ["NAV loans and rated feeder notes", "Borrowing against the value of a fund's holdings, or notes that let insurers invest in private funds in bond form. Newer, less transparent and harder to sell."],
      ["Private credit", "Loans made directly by funds to companies, outside the public bond market. Fast-growing, and less regulated and less visible than traded bonds."]
    ]]
  ];

  // Credit rating scale: [S&P / Fitch, Moody's, meaning, grade]
  var RATINGS = [
    ["AAA", "Aaa", "Highest quality. Extremely strong ability to repay.", "Investment grade"],
    ["AA+ / AA / AA-", "Aa1 / Aa2 / Aa3", "Very high quality. Very strong ability to repay.", "Investment grade"],
    ["A+ / A / A-", "A1 / A2 / A3", "High quality, but somewhat more sensitive to bad economic times.", "Investment grade"],
    ["BBB+ / BBB / BBB-", "Baa1 / Baa2 / Baa3", "Adequate. Can repay today, but a downturn could weaken it. BBB- is the lowest investment grade.", "Investment grade"],
    ["BB+ / BB / BB-", "Ba1 / Ba2 / Ba3", "Speculative. Faces real uncertainty; the top of “junk.”", "High yield"],
    ["B+ / B / B-", "B1 / B2 / B3", "Highly speculative. Paying now, but vulnerable to setbacks.", "High yield"],
    ["CCC+ / CCC / CCC-", "Caa1 / Caa2 / Caa3", "Substantial risk. Depends on things going right.", "High yield"],
    ["CC / C", "Ca / C", "Extremely speculative; default is likely or close.", "High yield"],
    ["D", "—", "In default: payments have been missed.", "Default"]
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
    '.p75edu .tl{position:relative;margin:26px 0 0;padding-left:28px;border-left:2px solid var(--line)}' +
    '.p75edu .ev{position:relative;padding:0 0 30px}' +
    '.p75edu .ev:before{content:"";position:absolute;left:-35px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--ink);border:2px solid var(--gold)}' +
    '.p75edu .ev .when{color:var(--gold);font-weight:700;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase}' +
    '.p75edu .ev h3{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:21px;margin:4px 0 6px;color:var(--cream)}' +
    '.p75edu .ev p{margin:0;font-size:15px;line-height:1.7;color:#d9d4c8}' +
    '.p75edu .next{display:inline-block;margin-top:10px;color:var(--gold);font-weight:700;text-decoration:none;font-size:15px}' +
    '.p75edu .sec{margin-top:40px}' +
    '.p75edu .sec h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:26px;margin:0 0 6px;color:var(--cream)}' +
    '.p75edu .sec .intro{color:var(--muted);font-size:15px;line-height:1.65;margin:0 0 8px}' +
    '.p75edu .toc{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 6px}' +
    '.p75edu .toc a{color:var(--cream);background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:6px 12px;font-size:13px;text-decoration:none;cursor:pointer}' +
    '.p75edu .toc a:hover{border-color:var(--gold);color:var(--gold)}' +
    '.p75edu table{width:100%;border-collapse:collapse;margin-top:12px;font-size:14px}' +
    '.p75edu th{color:var(--gold);text-align:left;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:10px 8px;border-bottom:1px solid var(--line)}' +
    '.p75edu td{padding:11px 8px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.55;color:#d9d4c8}' +
    '.p75edu td.r{font-weight:700;color:var(--cream);white-space:nowrap}' +
    '.p75edu .tag{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:9px;white-space:nowrap}' +
    '.p75edu .tag.ig{background:rgba(46,204,113,.15);color:#6fdc9c}.p75edu .tag.hy{background:rgba(231,76,60,.15);color:#f08a7e}.p75edu .tag.df{background:#333;color:#bbb}' +
    '.p75edu .note{margin-top:14px;color:var(--muted);font-size:14px;line-height:1.65}' +
    '@media (max-width:600px){.p75edu table{font-size:13px}.p75edu td,.p75edu th{padding:9px 5px}}' +
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
        '<a class="card" href="/bond-history"><div class="eyebrow">Guide</div><h3>A Short History of Bonds</h3>' +
          '<p>From clay tablets in Mesopotamia to a $40 trillion U.S. debt: how lending to governments shaped the world.</p><span class="go">Read the history &rarr;</span></a>' +
        '<a class="card" href="/bond-types"><div class="eyebrow">Guide</div><h3>Classification of Bonds</h3>' +
          '<p>Treasuries, corporates, mortgage bonds, CBOs, private equity debt, and how ratings from AAA to D work.</p><span class="go">Explore the types &rarr;</span></a>' +
        '<a class="card" href="/bond-dictionary"><div class="eyebrow">Guide</div><h3>Bond Dictionary</h3>' +
          '<p>' + TERMS.length + ' bond terms explained in everyday language, from basis points to yield curves.</p><span class="go">Open the dictionary &rarr;</span></a>' +
        '<div class="card soon"><div class="eyebrow">Coming soon</div><h3>More guides</h3><p>New explainers will appear here as they are written.</p></div>' +
      '</div>' + foot() + '</div>';
  }


  function history() {
    var h = '<div class="wrap text"><div class="eyebrow"><a href="/education" style="color:inherit;text-decoration:none">Education</a></div>' +
      '<h1>A Short History of Bonds</h1><p class="lead">People have been lending to kings, cities and countries for thousands of years. ' +
      'Here is how a promise written in clay became the world’s largest financial market.</p><div class="tl">';
    HISTORY.forEach(function (e) {
      h += '<div class="ev"><div class="when">' + esc(e[0]) + '</div><h3>' + esc(e[1]) + '</h3><p>' + esc(e[2]) + '</p></div>';
    });
    return h + '</div><a class="next" href="/bond-dictionary">New to the jargon? Open the Bond Dictionary &rarr;</a>' +
      '<p class="foot">Dates and figures are rounded for readability; this is a simplified overview for learning, not financial advice.<br>&copy; ' +
      new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
  }


  function types() {
    var h = '<div class="wrap text"><div class="eyebrow"><a href="/education" style="color:inherit;text-decoration:none">Education</a></div>' +
      '<h1>Classification of Bonds</h1><p class="lead">Not all bonds are alike. Here are the main families, who issues them, what backs them, ' +
      'and how the rating agencies grade them.</p><nav class="toc">';
    TYPES.forEach(function (t, i) { h += '<a data-go="s' + i + '">' + esc(t[0]) + '</a>'; });
    h += '<a data-go="ratings">Bond ratings</a></nav>';
    TYPES.forEach(function (t, i) {
      h += '<section class="sec" id="p75-s' + i + '"><h2>' + esc(t[0]) + '</h2><p class="intro">' + esc(t[1]) + '</p>';
      t[2].forEach(function (x) { h += '<div class="term"><h3>' + esc(x[0]) + '</h3><p>' + esc(x[1]) + '</p></div>'; });
      h += '</section>';
    });
    h += '<section class="sec" id="p75-ratings"><h2>Bond ratings: AAA to D</h2><p class="intro">Rating agencies grade how likely a borrower is to pay ' +
      'back. S&amp;P and Fitch use letters like AAA; Moody’s uses Aaa. Everything from BBB- (Baa3) up is “investment grade”; below that is “high yield” or “junk.”</p>' +
      '<table><thead><tr><th>S&amp;P / Fitch</th><th>Moody’s</th><th>What it means</th><th></th></tr></thead><tbody>';
    RATINGS.forEach(function (r) {
      var cls = r[3] === 'Investment grade' ? 'ig' : r[3] === 'Default' ? 'df' : 'hy';
      h += '<tr><td class="r">' + esc(r[0]) + '</td><td class="r">' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td><td><span class="tag ' + cls + '">' + esc(r[3]) + '</span></td></tr>';
    });
    h += '</tbody></table><p class="note">Why it matters: a lower rating means the borrower must pay a higher yield to attract lenders, and many pension funds and insurers ' +
      'may only hold investment-grade bonds. When a bond is cut from BBB- to junk, forced selling can push its price down sharply. Ratings are opinions, not guarantees: ' +
      'in 2008 many mortgage bonds rated AAA suffered heavy losses. As of 2025, all three major agencies rated U.S. government debt one notch below AAA.</p></section>' +
      '<a class="next" href="/bond-dictionary">Look up any term in the Bond Dictionary &rarr;</a>' +
      '<p class="foot">A simplified overview for learning, not financial advice.<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
    return h;
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
    host.innerHTML = path === '/education' ? landing() : path === '/bond-history' ? history() : path === '/bond-types' ? types() : dictionary();
    var blocks = main.querySelector('.page__blocks');
    if (blocks) blocks.appendChild(host); else main.appendChild(host);

    if (path === '/bond-dictionary') {
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
    if (path === '/bond-types') {
      host.querySelector('.toc').addEventListener('click', function (e) {
        var a = e.target.closest('a[data-go]'); if (!a) return;
        var el = document.getElementById('p75-' + a.getAttribute('data-go')); if (!el) return;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 16, behavior: 'smooth' });
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
