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


  // ---------- Players page data (sources and dates shown on the page) ----------
  // Validated categorical palette for the dark surface (fixed order, never cycled)
  var PAL = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9'];

  // U.S. bond market by sector, $ trillions
  var SECTORS = [
    ['U.S. Treasuries', 31.1, 'Borrowed by the federal government to pay its bills. The deepest, most-traded bond market on earth.', 'U.S. Treasury'],
    ['Corporate bonds', 12.1, 'Borrowed by companies of every size, from tech giants to airlines and utilities.', 'Companies'],
    ['Mortgage-backed', 9.5, 'Pools of home loans guaranteed by Ginnie Mae, Fannie Mae and Freddie Mac (agency MBS, Dec 2025).', 'Ginnie Mae, Fannie Mae, Freddie Mac'],
    ['Municipal bonds', 4.5, 'Borrowed by states, cities, school districts, hospitals and toll roads.', 'States and local governments'],
    ['Agency debt', 2.2, 'Borrowed by government-sponsored agencies such as the Federal Home Loan Banks.', 'Government-sponsored agencies'],
    ['Commercial paper', 1.5, 'Very short-term IOUs from companies and banks (approximate).', 'Companies and banks']
  ];

  // Who holds U.S. government debt, $ trillions (March 2026, total $39.0T)
  var HOLDERS = [
    ['Foreign investors', 9.3, 'Central banks and investors abroad.', 'Japan $1.2T · United Kingdom $0.9T · China $0.7T · others $6.5T'],
    ['Government trust funds', 7.6, 'The government owing itself: money borrowed from trust funds.', 'Social Security $2.6T · other trust funds $5.1T'],
    ['Mutual & pension funds', 6.6, 'The buy side and pensions, investing savers’ and retirees’ money.', 'BlackRock · Vanguard · Fidelity · PIMCO · CalPERS'],
    ['Other U.S. holders', 5.7, 'Insurers, state and local governments, companies and hedge funds.', 'Insurance companies · hedge funds · corporate treasuries'],
    ['Federal Reserve', 4.4, 'America’s central bank, largely from its bond-buying programs.', 'Federal Reserve System'],
    ['Individual investors', 3.0, 'Households, including savings bonds and TreasuryDirect accounts.', 'Everyday savers'],
    ['Banks & dealers', 2.4, 'The sell side: banks and primary dealers that make markets in Treasuries.', 'JPMorgan · Bank of America · Citi · Goldman Sachs · Morgan Stanley']
  ];

  // Big players: [name, $ trillions (total assets managed, all asset classes), note, as-of]
  var PLAYERS = [
    ['Buy side: asset managers', 'They invest money for savers, funds and institutions, and are among the biggest bond owners in the world.', [
      ['BlackRock', 15.3, 'World’s largest asset manager; huge in bond ETFs (iShares). Also owns a private-credit arm, but it is not a private equity firm.', 'Jun 2026'],
      ['Vanguard', 12.0, 'Index-fund giant; runs some of the largest bond funds.', 'Dec 2025'],
      ['Fidelity', 7.8, 'Mutual funds, retirement accounts and bond funds.', 'Jun 2026'],
      ['State Street', 6.3, 'Index funds and ETFs for institutions.', 'Jun 2026'],
      ['PIMCO', 2.5, 'The best-known bond specialist.', 'Jun 2026']
    ]],
    ['Pension & sovereign funds', 'Long-term money for retirees and nations; big buyers of long-dated bonds.', [
      ['Norway GPFG', 2.0, 'Norway’s oil-wealth fund (“Government Pension Fund Global”); over $2 trillion.', '2025'],
      ['Japan GPIF', 2.0, 'Japan’s public pension fund, about ¥293 trillion.', 'Dec 2025'],
      ['CalPERS', 0.6, 'Largest U.S. public pension, about $600 billion.', 'Dec 2025']
    ]],
    ['Private equity & private credit', 'They buy companies with borrowed money and increasingly lend directly, becoming major players in credit.', [
      ['Blackstone', 1.35, 'Largest alternative asset manager: private equity, real estate and credit.', 'Jun 2026'],
      ['Apollo', 1.05, 'Credit-focused; owns the insurer Athene.', 'Jun 2026'],
      ['KKR', 0.796, 'Private equity pioneer; about $300 billion of it in credit.', 'Jun 2026']
    ]]
  ];
  // Galaxy explorer: solar systems (groups) and planets (players). v = $ trillions (null = not sized).
  var SYSTEMS = [
    { name: 'Buy side', sub: 'Asset managers', color: '#3987e5', what: 'total assets managed',
      planets: [['BlackRock', 15.3, 'Jun 2026', 'World’s largest asset manager; huge in bond ETFs (iShares). Not a private equity firm, though it owns a private-credit arm.'],
                ['Vanguard', 12.0, 'Dec 2025', 'Index-fund giant; runs some of the largest bond funds.'],
                ['Fidelity', 7.8, 'Jun 2026', 'Mutual funds, retirement accounts and bond funds.'],
                ['State Street', 6.3, 'Jun 2026', 'Index funds and ETFs for institutions.'],
                ['PIMCO', 2.5, 'Jun 2026', 'The best-known bond specialist.']] },
    { name: 'Central banks', sub: 'Official holders of Treasuries', color: '#c98500', what: 'U.S. Treasuries held',
      planets: [['Federal Reserve', 4.4, 'Mar 2026', 'America’s central bank, from its bond-buying programs.'],
                ['Japan', 1.2, 'Mar 2026', 'The largest foreign holder of U.S. Treasuries.'],
                ['United Kingdom', 0.9, 'Mar 2026', 'Includes holdings by investors based in London.'],
                ['China', 0.7, 'Mar 2026', 'Has been trimming its Treasury holdings for years.']] },
    { name: 'Pensions', sub: 'Pension & sovereign funds', color: '#199e70', what: 'total assets',
      planets: [['Norway GPFG', 2.0, '2025', 'Norway’s oil-wealth fund, over $2 trillion.'],
                ['Japan GPIF', 2.0, 'Dec 2025', 'Japan’s public pension fund, about ¥293 trillion.'],
                ['CalPERS', 0.6, 'Dec 2025', 'Largest U.S. public pension, about $600 billion.']] },
    { name: 'Private equity', sub: 'Private equity & private credit', color: '#d95926', what: 'total assets managed',
      planets: [['Blackstone', 1.35, 'Jun 2026', 'Largest alternative asset manager: private equity, real estate and credit.'],
                ['Apollo', 1.05, 'Jun 2026', 'Credit-focused; owns the insurer Athene.'],
                ['KKR', 0.796, 'Jun 2026', 'Private equity pioneer; about $300 billion of it in credit.']] },
    { name: 'Sell side', sub: 'Primary dealers', color: '#d55181', what: 'market makers (holdings change daily)',
      planets: [['J.P. Morgan', null, '', 'Primary dealer: bids at every Treasury auction and makes markets.'],
                ['Goldman Sachs', null, '', 'Primary dealer.'], ['Bank of America', null, '', 'Primary dealer.'],
                ['Citigroup', null, '', 'Primary dealer.'], ['Morgan Stanley', null, '', 'Primary dealer.'], ['Barclays', null, '', 'Primary dealer.']] }
  ];
  var DEALERS = ['J.P. Morgan', 'Goldman Sachs', 'Bank of America', 'Citigroup', 'Morgan Stanley', 'Barclays', 'Wells Fargo', 'Jefferies'];

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
    '.p75edu .tiles{width:100%;box-sizing:border-box;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:10px 0 8px;padding:22px;border-radius:16px;' +
      'background:radial-gradient(120% 90% at 50% 0%,#1d2a3f 0%,#151b26 55%,#121418 100%);border:1px solid #243247}' +
    '.p75edu .tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 8px 12px;border-radius:12px;cursor:pointer;text-decoration:none;' +
      'background:rgba(255,255,255,.02);border:1px solid transparent;transition:transform .25s,border-color .25s,background .25s}' +
    '.p75edu .tile svg{width:86px;height:86px;transition:transform .35s;filter:drop-shadow(0 6px 14px rgba(224,181,58,.18))}' +
    '.p75edu .tile span{color:var(--cream);font-weight:600;font-size:13.5px;text-align:center;line-height:1.3}' +
    '.p75edu .tile:hover{transform:translateY(-3px);border-color:rgba(201,162,39,.45);background:rgba(201,162,39,.06)}' +
    '.p75edu .tile:hover svg{transform:scale(1.08) rotate(-2deg)}' +
    '@media (max-width:600px){.p75edu .tiles{gap:8px;padding:14px}.p75edu .tile svg{width:56px;height:56px}.p75edu .tile span{font-size:12px}}' +
    '.p75edu .chartbox{display:grid;grid-template-columns:minmax(260px,340px) 1fr;gap:26px;align-items:center;margin:14px 0 6px;padding:20px;border-radius:16px;' +
      'background:radial-gradient(120% 90% at 30% 0%,#1d2a3f 0%,#151b26 55%,#121418 100%);border:1px solid #243247}' +
    '.p75edu .donut{width:100%;height:auto;overflow:visible}' +
    '.p75edu .donut path{cursor:pointer;transition:transform .2s,opacity .2s;transform-origin:170px 170px}' +
    '.p75edu .donut.hov path{opacity:.35}.p75edu .donut path.on{opacity:1;transform:scale(1.045)}' +
    '.p75edu .ctr1{font:700 26px Manrope,sans-serif;fill:var(--cream)}.p75edu .ctr2{font:600 12px Manrope,sans-serif;fill:var(--muted);letter-spacing:.06em;text-transform:uppercase}' +
    '.p75edu .legend{list-style:none;margin:0;padding:0}' +
    '.p75edu .legend li{display:grid;grid-template-columns:14px 1fr auto;gap:10px;align-items:baseline;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background .2s}' +
    '.p75edu .legend li.on{background:rgba(255,255,255,.06)}' +
    '.p75edu .legend .sw{width:12px;height:12px;border-radius:3px;align-self:center}' +
    '.p75edu .legend .nm{color:var(--cream);font-weight:600;font-size:14px}.p75edu .legend .vl{color:var(--cream);font-weight:700;font-size:14px;white-space:nowrap}' +
    '.p75edu .legend .dt{grid-column:2 / 4;color:var(--muted);font-size:13px;line-height:1.5;display:none}' +
    '.p75edu .legend li.on .dt{display:block}' +
    '.p75edu .legend .who{display:block;color:#e8d9a8;margin-top:3px}' +
    '.p75edu .src{color:#8d887e;font-size:12.5px;margin-top:8px;line-height:1.5}' +
    '.p75edu .pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-top:10px}' +
    '.p75edu .pcard{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px}' +
    '.p75edu .pcard .n{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:19px;color:var(--cream)}' +
    '.p75edu .pcard .v{font-weight:700;font-size:20px;color:var(--gold);margin:4px 0 2px}' +
    '.p75edu .pcard .v small{font-size:12px;color:var(--muted);font-weight:600;margin-left:6px}' +
    '.p75edu .pcard .bar{height:6px;border-radius:3px;background:#262a31;margin:8px 0 10px;overflow:hidden}' +
    '.p75edu .pcard .bar i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#c98500,#E0B53A)}' +
    '.p75edu .pcard p{margin:0;font-size:13.5px;line-height:1.55;color:#d9d4c8}' +
    '.p75edu .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}' +
    '.p75edu .chips span{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:6px 12px;font-size:13px;color:var(--cream)}' +
    '@media (max-width:700px){.p75edu .chartbox{grid-template-columns:1fr;padding:14px}.p75edu .donut{max-width:300px;margin:0 auto;display:block}}' +
    '.p75edu .solar{position:relative;margin-top:14px;border-radius:18px;overflow:hidden;border:1px solid #1f2533;padding:0 0 26px;' +
      'background:radial-gradient(60% 40% at 85% 55%,rgba(126,44,120,.28),transparent 70%),radial-gradient(55% 35% at 12% 78%,rgba(40,90,140,.25),transparent 70%),' +
      'radial-gradient(40% 30% at 20% 30%,rgba(150,60,110,.18),transparent 70%),linear-gradient(#0a0b12,#06070b)}' +
    '.p75edu .sl-sky{position:absolute;inset:0;pointer-events:none}' +
    '.p75edu .sl-sun{position:absolute;left:50%;top:-150px;width:560px;height:560px;margin-left:-280px;pointer-events:none;border-radius:50%;' +
      'background:radial-gradient(circle,#fffbe8 0,#ffe39a 9%,#ffc35c 16%,rgba(255,170,60,.55) 24%,rgba(255,150,50,.16) 38%,transparent 62%)}' +
    '.p75edu .sl-sun i{position:absolute;inset:-40% -40% 0;transform-origin:50% 40%;' +
      'background:repeating-conic-gradient(from 90deg at 50% 40%,rgba(255,221,140,.16) 0 2.2deg,transparent 2.2deg 9deg);' +
      '-webkit-mask:radial-gradient(circle at 50% 40%,#000 8%,transparent 62%);mask:radial-gradient(circle at 50% 40%,#000 8%,transparent 62%);animation:p75rays 18s ease-in-out infinite alternate}' +
    '.p75edu .sl-sun i+i{animation-duration:26s;animation-direction:alternate-reverse;opacity:.7}' +
    '@keyframes p75rays{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}' +
    '.p75edu .sl-head{position:relative;text-align:center;padding:150px 20px 6px}' +
    '.p75edu .sl-k{color:#fff3cf;font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;text-shadow:0 1px 8px rgba(0,0,0,.6)}' +
    '.p75edu .sl-big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:40px;color:#fff;line-height:1.1;margin:4px 0 8px;text-shadow:0 2px 14px rgba(0,0,0,.55)}' +
    '.p75edu .sl-hint{color:#e8e2d4;font-size:14.5px;line-height:1.55;max-width:440px;margin:0 auto}' +
    '.p75edu .sl-list{position:relative;list-style:none;margin:0;padding:10px 22px 0}' +
    '.p75edu .sl-row{margin:18px 0 0}' +
    '.p75edu .sl-btn{display:flex;align-items:center;gap:22px;width:100%;background:none;border:1px solid transparent;border-radius:16px;padding:8px 12px;cursor:pointer;color:inherit;font:inherit;text-align:left;transition:background .25s,border-color .25s}' +
    '.p75edu .sl-row.alt .sl-btn{flex-direction:row-reverse;text-align:right}' +
    '.p75edu .sl-btn:hover,.p75edu .sl-row.open .sl-btn{background:rgba(255,255,255,.035);border-color:rgba(201,162,39,.35)}' +
    '.p75edu .sl-btn:focus-visible{outline:2px solid var(--gold);outline-offset:2px}' +
    '.p75edu .sl-planet{flex:0 0 auto;width:calc(var(--d)*1px);height:calc(var(--d)*1px);display:grid;place-items:center;animation:p75bob var(--bob) ease-in-out infinite alternate}' +
    '.p75edu .sl-planet.ringed{width:calc(var(--d)*1.65px)}' +
    '.p75edu .sl-planet svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 10px 22px rgba(0,0,0,.55))}' +
    '.p75edu .sl-btn:hover .sl-planet svg{filter:drop-shadow(0 0 18px rgba(255,214,120,.35)) drop-shadow(0 10px 22px rgba(0,0,0,.55))}' +
    '@keyframes p75bob{from{transform:translateY(-4px)}to{transform:translateY(4px)}}' +
    '.p75edu .pl-turn{animation:p75turn linear infinite}' +
    '@keyframes p75turn{from{transform:translateX(0)}to{transform:translateX(100px)}}' +
    '.p75edu .sl-info{display:flex;flex-direction:column;gap:2px;min-width:0}' +
    '.p75edu .sl-sub{color:#cfc9bc;font-weight:700;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase}' +
    '.p75edu .sl-name{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:27px;color:#fff;line-height:1.15}' +
    '.p75edu .sl-val{font-weight:800;font-size:30px;color:#f2c94c;line-height:1.15;font-variant-numeric:tabular-nums;text-shadow:0 2px 10px rgba(0,0,0,.5)}' +
    '.p75edu .sl-val.sm{font-size:22px}' +
    '.p75edu .sl-what{color:#d9d3c6;font-size:13.5px}' +
    '.p75edu .sl-more{color:var(--gold);font-weight:700;font-size:14px;margin-top:6px}' +
    '.p75edu .sl-more b{display:inline-block;transition:transform .25s}.p75edu .sl-row.open .sl-more b{transform:rotate(180deg)}' +
    '.p75edu .sl-moons{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin:12px 0 4px}' +
    '.p75edu .sl-moons[hidden]{display:none}' +
    '.p75edu .sl-moon{background:rgba(17,18,24,.88);border:1px solid #2c3140;border-radius:12px;padding:14px 16px;backdrop-filter:blur(2px)}' +
    '.p75edu .sl-mh{display:flex;align-items:center;gap:10px}' +
    '.p75edu .sl-dot{width:14px;height:14px;border-radius:50%;flex:0 0 auto;box-shadow:inset -3px -3px 5px rgba(0,0,0,.45),inset 2px 2px 3px rgba(255,255,255,.35)}' +
    '.p75edu .sl-mn{color:#fff;font-weight:700;font-size:16px;flex:1;min-width:0}' +
    '.p75edu .sl-mv{color:#f2c94c;font-weight:800;font-size:19px;font-variant-numeric:tabular-nums}' +
    '.p75edu .sl-bar{height:5px;border-radius:3px;background:#262a33;margin:10px 0 8px;overflow:hidden}.p75edu .sl-bar i{display:block;height:100%;background:linear-gradient(90deg,#c98500,#f2c94c)}' +
    '.p75edu .sl-moon p{margin:6px 0 0;color:#ddd8cc;font-size:14px;line-height:1.55}.p75edu .sl-asof{color:#a9a396}' +
    '@media (prefers-reduced-motion:reduce){.p75edu .sl-sun i,.p75edu .sl-planet,.p75edu .pl-turn{animation:none}}' +
    '@media (max-width:600px){.p75edu .sl-sun{width:420px;height:420px;margin-left:-210px;top:-120px}.p75edu .sl-head{padding-top:118px}.p75edu .sl-big{font-size:32px}' +
      '.p75edu .sl-list{padding:6px 10px 0}.p75edu .sl-btn{gap:14px;padding:8px}.p75edu .sl-planet{width:calc(var(--d)*.62px);height:calc(var(--d)*.62px)}' +
      '.p75edu .sl-planet.ringed{width:calc(var(--d)*1.02px)}.p75edu .sl-name{font-size:22px}.p75edu .sl-val{font-size:25px}.p75edu .sl-moons{grid-template-columns:1fr}}' +
    '.p75edu details.list{margin-top:14px}.p75edu details.list summary{color:var(--gold);cursor:pointer;font-weight:700;font-size:14px}' +
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
        '<a class="card" href="/bond-players"><div class="eyebrow">Guide</div><h3>The Players</h3>' +
          '<p>Interactive charts of the $61 trillion U.S. bond market, who owns the national debt, and the giants who move it.</p><span class="go">Meet the players &rarr;</span></a>' +
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



  // ---------- Icon tiles for the Classification page (original SVG drawings) ----------
  var DEFS = '<defs>' +
    '<radialGradient id="pg" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FFE9A8"/><stop offset=".45" stop-color="#E0B53A"/><stop offset="1" stop-color="#8A6512"/></radialGradient>' +
    '<radialGradient id="pb" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#BFE6FF"/><stop offset=".45" stop-color="#3B9BE0"/><stop offset="1" stop-color="#16456E"/></radialGradient>' +
    '<radialGradient id="po" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#FFD1A6"/><stop offset=".45" stop-color="#F07A2A"/><stop offset="1" stop-color="#8C3A0B"/></radialGradient>' +
    '<filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '</defs>';
  var ICONS = {
    treasury: '<g filter="url(#gl)"><path d="M18 34 L50 18 L82 34 Z" fill="url(#pg)"/><rect x="20" y="36" width="60" height="5" rx="1.5" fill="url(#pg)"/>' +
      '<rect x="25" y="44" width="7" height="26" rx="2" fill="url(#pb)"/><rect x="38" y="44" width="7" height="26" rx="2" fill="url(#pb)"/>' +
      '<rect x="55" y="44" width="7" height="26" rx="2" fill="url(#pb)"/><rect x="68" y="44" width="7" height="26" rx="2" fill="url(#pb)"/>' +
      '<rect x="16" y="72" width="68" height="7" rx="2" fill="url(#pg)"/></g>',
    muni: '<g filter="url(#gl)"><rect x="14" y="44" width="16" height="36" rx="2" fill="url(#pb)"/><rect x="34" y="30" width="18" height="50" rx="2" fill="url(#pg)"/>' +
      '<rect x="56" y="38" width="14" height="42" rx="2" fill="url(#pb)"/><rect x="73" y="52" width="13" height="28" rx="2" fill="url(#po)"/>' +
      '<g fill="#111214" opacity=".55"><rect x="39" y="37" width="3" height="4"/><rect x="45" y="37" width="3" height="4"/><rect x="39" y="47" width="3" height="4"/><rect x="45" y="47" width="3" height="4"/><rect x="39" y="57" width="3" height="4"/><rect x="45" y="57" width="3" height="4"/></g></g>',
    agency: '<g filter="url(#gl)"><path d="M50 16 L78 28 V50 C78 66 66 78 50 84 C34 78 22 66 22 50 V28 Z" fill="url(#pb)"/>' +
      '<path d="M36 54 L50 42 L64 54 V66 H36 Z" fill="url(#pg)"/><rect x="47" y="57" width="6" height="9" fill="#111214" opacity=".5"/></g>',
    corporate: '<g filter="url(#gl)"><rect x="30" y="18" width="40" height="64" rx="3" fill="url(#pg)"/>' +
      '<g fill="#111214" opacity=".5"><rect x="36" y="26" width="8" height="6" rx="1"/><rect x="56" y="26" width="8" height="6" rx="1"/><rect x="36" y="38" width="8" height="6" rx="1"/><rect x="56" y="38" width="8" height="6" rx="1"/><rect x="36" y="50" width="8" height="6" rx="1"/><rect x="56" y="50" width="8" height="6" rx="1"/><rect x="45" y="66" width="10" height="16" rx="1"/></g>' +
      '<circle cx="76" cy="26" r="9" fill="url(#pb)"/></g>',
    highyield: '<g filter="url(#gl)"><circle cx="50" cy="52" r="26" fill="url(#po)" opacity=".9"/>' +
      '<path d="M54 22 L36 56 H49 L44 82 L66 44 H53 Z" fill="url(#pg)" stroke="#FFF1C2" stroke-width="1"/></g>',
    mbs: '<g filter="url(#gl)"><path d="M16 50 L30 38 L44 50 V66 H16 Z" fill="url(#pb)"/><path d="M36 42 L50 30 L64 42 V58 H36 Z" fill="url(#pg)"/>' +
      '<path d="M56 50 L70 38 L84 50 V66 H56 Z" fill="url(#po)"/><rect x="14" y="70" width="72" height="6" rx="3" fill="url(#pg)"/>' +
      '<path d="M22 80 H78" stroke="#E0B53A" stroke-width="2" stroke-dasharray="3 4"/></g>',
    tranches: '<g filter="url(#gl)"><rect x="22" y="20" width="56" height="14" rx="5" fill="url(#pg)"/><rect x="22" y="38" width="56" height="14" rx="5" fill="url(#pb)"/>' +
      '<rect x="22" y="56" width="56" height="14" rx="5" fill="url(#po)"/><circle cx="50" cy="80" r="4" fill="#E0B53A"/>' +
      '<path d="M50 70 V76" stroke="#E0B53A" stroke-width="2"/></g>',
    privateequity: '<g filter="url(#gl)"><rect x="18" y="36" width="64" height="40" rx="6" fill="url(#pb)"/><path d="M38 36 V29 a4 4 0 0 1 4 -4 H58 a4 4 0 0 1 4 4 V36" fill="none" stroke="#E0B53A" stroke-width="4"/>' +
      '<rect x="18" y="50" width="64" height="5" fill="#111214" opacity=".35"/><circle cx="50" cy="53" r="7" fill="url(#pg)"/></g>',
    ratings: '<g filter="url(#gl)"><circle cx="50" cy="44" r="26" fill="url(#pg)"/><path d="M36 64 L30 86 L42 80 L48 90 L50 68" fill="url(#pb)"/><path d="M64 64 L70 86 L58 80 L52 90 L50 68" fill="url(#pb)"/>' +
      '<text x="50" y="51" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="700" fill="#3a2a05">AAA</text></g>'
  };
  // [icon, label, section to jump to]
  var TILES = [
    ['treasury', 'U.S. Treasuries', 's0'], ['muni', 'Municipal Bonds', 's1'], ['agency', 'Agency Bonds', 's1'],
    ['corporate', 'Corporate Bonds', 's2'], ['highyield', 'High-Yield (Junk)', 's2'], ['mbs', 'Mortgage-Backed', 's3'],
    ['tranches', 'CBOs, CLOs & CDOs', 's4'], ['privateequity', 'Private Equity Debt', 's5'], ['ratings', 'Bond Ratings', 'ratings']
  ];
  function tiles() {
    return '<div class="tiles">' + TILES.map(function (t) {
      return '<a class="tile" data-go="' + t[2] + '"><svg viewBox="0 0 100 100" aria-hidden="true">' + DEFS + ICONS[t[0]] + '</svg><span>' + t[1] + '</span></a>';
    }).join('') + '</div>';
  }

  function types() {
    var h = '<div class="wrap text"><div class="eyebrow"><a href="/education" style="color:inherit;text-decoration:none">Education</a></div>' +
      '<h1>Classification of Bonds</h1><p class="lead">Not all bonds are alike. Here are the main families, who issues them, what backs them, ' +
      'and how the rating agencies grade them.</p><nav class="toc">' + tiles();
    h += '</nav>';
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


  // Donut chart with hover/tap details; the legend doubles as the data table.
  function donut(id, items, unit, centerLabel) {
    var total = items.reduce(function (a, b) { return a + b[1]; }, 0);
    var R = 150, r = 92, C = 170, a0 = -Math.PI / 2, paths = '';
    items.forEach(function (it, i) {
      var a1 = a0 + it[1] / total * Math.PI * 2, large = a1 - a0 > Math.PI ? 1 : 0;
      var p = function (rad, ang) { return (C + rad * Math.cos(ang)).toFixed(2) + ' ' + (C + rad * Math.sin(ang)).toFixed(2); };
      paths += '<path data-i="' + i + '" fill="' + PAL[i] + '" stroke="#151a22" stroke-width="2" d="M' + p(R, a0) + ' A' + R + ' ' + R + ' 0 ' + large + ' 1 ' + p(R, a1) +
        ' L' + p(r, a1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 0 ' + p(r, a0) + 'Z"><title>' + esc(it[0]) + ': $' + it[1] + 'T</title></path>';
      a0 = a1;
    });
    var legend = items.map(function (it, i) {
      return '<li data-i="' + i + '"><span class="sw" style="background:' + PAL[i] + '"></span><span class="nm">' + esc(it[0]) + '</span>' +
        '<span class="vl">$' + it[1].toFixed(1) + 'T · ' + Math.round(it[1] / total * 100) + '%</span>' +
        '<span class="dt">' + esc(it[2]) + '<span class="who">' + esc(it[3]) + '</span></span></li>';
    }).join('');
    return '<div class="chartbox" id="' + id + '"><svg class="donut" viewBox="0 0 340 340" role="img" aria-label="' + esc(centerLabel) + '">' + paths +
      '<text class="ctr1" x="170" y="168" text-anchor="middle">$' + total.toFixed(1) + 'T</text>' +
      '<text class="ctr2" x="170" y="192" text-anchor="middle">' + esc(centerLabel) + '</text></svg><ul class="legend">' + legend + '</ul></div>';
  }

  function wireDonut(host, id, items, centerLabel) {
    var box = host.querySelector('#' + id); if (!box) return;
    var svg = box.querySelector('svg'), total = items.reduce(function (a, b) { return a + b[1]; }, 0);
    var t1 = svg.querySelector('.ctr1'), t2 = svg.querySelector('.ctr2');
    function show(i) {
      svg.classList.toggle('hov', i !== null);
      [].forEach.call(svg.querySelectorAll('path'), function (p) { p.classList.toggle('on', +p.getAttribute('data-i') === i); });
      [].forEach.call(box.querySelectorAll('li'), function (li) { li.classList.toggle('on', +li.getAttribute('data-i') === i); });
      if (i === null) { t1.textContent = '$' + total.toFixed(1) + 'T'; t2.textContent = centerLabel; }
      else { t1.textContent = '$' + items[i][1].toFixed(1) + 'T'; t2.textContent = Math.round(items[i][1] / total * 100) + '% · ' + items[i][0]; }
    }
    [].forEach.call(box.querySelectorAll('path, li'), function (el) {
      var i = +el.getAttribute('data-i');
      el.addEventListener('mouseenter', function () { show(i); });
      el.addEventListener('click', function () { show(i); });
    });
    box.addEventListener('mouseleave', function () { show(null); });
  }


  function sysTotal(sy) { return sy.planets.reduce(function (a, p) { return a + (p[1] || 0); }, 0); }
  function money(v) { return v == null ? '' : v >= 1 ? '$' + (Math.round(v * 100) / 100) + 'T' : '$' + Math.round(v * 1000) + 'B'; }

  // ---------- Solar lineup (players by group, drawn as planets under the market's sun) ----------
  // Planet looks are original SVG drawings; each group gets a planet type. Surfaces drift slowly so the
  // planets appear to turn; everything holds still for readers who prefer reduced motion.
  var LOOKS = ['jupiter', 'saturn', 'earth', 'mars', 'neptune'];
  function periodic(fn) { var s = ''; for (var k = -2; k <= 1; k++) s += fn(k * 100); return s; }   // features repeat every 100 units
  function planetSVG(kind, id) {
    var R = 50, clip = id + 'c', light = id + 'l', rim = id + 'r', surf = '', base = '#888', extra = '', over = '', vb = '-60 -60 120 120';
    if (kind === 'jupiter') {
      base = '#d9b48a';
      var bands = [[-44, 8, '#f1dfc4'], [-33, 7, '#b77a4e'], [-24, 6, '#e8cfae'], [-16, 7, '#a8663f'], [-6, 6, '#f3e3cb'], [3, 8, '#c98d5c'],
        [13, 6, '#efd9ba'], [21, 7, '#9b5a36'], [30, 7, '#e2c39d'], [40, 9, '#b98359']];
      surf = bands.map(function (b) { return '<rect x="-160" y="' + b[0] + '" width="320" height="' + b[1] + '" fill="' + b[2] + '" opacity=".9"/>'; }).join('') +
        periodic(function (o) { return '<ellipse cx="' + (o + 30) + '" cy="16" rx="11" ry="6.5" fill="#b4492c" opacity=".85"/><ellipse cx="' + (o + 30) + '" cy="16" rx="6" ry="3.4" fill="#d8744c"/>' +
          '<path d="M' + (o - 40) + ',-18 q12,-5 24,0 t24,0" stroke="#f5e6cf" stroke-width="2.2" fill="none" opacity=".6"/>' +
          '<path d="M' + (o - 10) + ',7 q10,4 20,0 t20,0" stroke="#8e4f2d" stroke-width="1.6" fill="none" opacity=".5"/>'; });
    } else if (kind === 'saturn') {
      base = '#e3cf9a'; vb = '-100 -60 200 120';
      surf = [[-48, 14, '#efe0b4'], [-30, 9, '#cdb178'], [-18, 10, '#f3e6c2'], [-6, 8, '#d7bd86'], [4, 12, '#ecdcae'], [18, 9, '#c4a66c'], [30, 18, '#e8d6a4']]
        .map(function (b) { return '<rect x="-160" y="' + b[0] + '" width="320" height="' + b[1] + '" fill="' + b[2] + '"/>'; }).join('') +
        periodic(function (o) { return '<path d="M' + (o - 30) + ',-2 q15,-3 30,0 t30,0" stroke="#fff4d2" stroke-width="1.5" fill="none" opacity=".5"/>'; });
      var ring = function (half) {
        return '<g transform="rotate(-16)"><path d="M-92,0 A92,20 0 0,' + (half === 'back' ? 1 : 0) + ' 92,0" fill="none" stroke="#d9c08a" stroke-width="9" opacity=".75"/>' +
          '<path d="M-78,0 A78,16 0 0,' + (half === 'back' ? 1 : 0) + ' 78,0" fill="none" stroke="#f1e2b8" stroke-width="6" opacity=".85"/>' +
          '<path d="M-68,0 A68,13 0 0,' + (half === 'back' ? 1 : 0) + ' 68,0" fill="none" stroke="#b89c63" stroke-width="3" opacity=".7"/></g>';
      };
      extra = ring('back'); over = ring('front');
    } else if (kind === 'earth') {
      base = '#1f5fae';
      surf = '<rect x="-160" y="-60" width="320" height="120" fill="#2067b8"/>' +
        periodic(function (o) {
          return '<path d="M' + (o - 38) + ',-30 c10,-8 26,-6 30,4 c3,9 -6,12 -3,22 c3,10 -9,16 -16,8 c-6,-7 -18,-6 -16,-18 c1,-8 0,-12 5,-16z" fill="#4d8f3f"/>' +
            '<path d="M' + (o + 8) + ',-14 c9,-6 22,-2 24,8 c2,10 -4,22 -14,26 c-9,3 -8,-8 -13,-14 c-4,-6 -6,-15 3,-20z" fill="#6b9a45"/>' +
            '<path d="M' + (o - 20) + ',18 c6,-3 14,0 13,6 c-1,6 -9,8 -14,5 c-4,-3 -3,-9 1,-11z" fill="#b69a62"/>';
        }) +
        '<rect x="-160" y="-60" width="320" height="10" fill="#e9f1f7"/><rect x="-160" y="50" width="320" height="10" fill="#e9f1f7"/>';
      var clouds = periodic(function (o) {
        return '<path d="M' + (o - 45) + ',-8 q14,-6 30,0 t32,-2" stroke="#fff" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>' +
          '<path d="M' + (o - 5) + ',24 q12,-5 26,0 t22,2" stroke="#fff" stroke-width="3.5" fill="none" opacity=".5" stroke-linecap="round"/>' +
          '<path d="M' + (o + 15) + ',-34 q10,-4 20,0" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>';
      });
      surf = '<g class="pl-turn" style="animation-duration:70s">' + surf + '</g><g class="pl-turn" style="animation-duration:48s">' + clouds + '</g>';
    } else if (kind === 'mars') {
      base = '#c1592f';
      surf = '<rect x="-160" y="-60" width="320" height="120" fill="#c4603a"/>' +
        periodic(function (o) {
          return '<ellipse cx="' + (o - 25) + '" cy="-10" rx="18" ry="9" fill="#8f3d20" opacity=".7"/><ellipse cx="' + (o + 18) + '" cy="14" rx="14" ry="7" fill="#a14a28" opacity=".7"/>' +
            '<ellipse cx="' + (o + 35) + '" cy="-26" rx="9" ry="5" fill="#e08a5d" opacity=".6"/><circle cx="' + (o - 5) + '" cy="30" r="3" fill="#7e3219" opacity=".7"/>';
        }) + '<ellipse cx="0" cy="-52" rx="160" ry="8" fill="#f3dccd" opacity=".8"/>';
    } else {
      base = '#2f5fd0';
      surf = [[-50, 16, '#3a6fe0'], [-30, 10, '#2c56c2'], [-16, 14, '#4a82ea'], [2, 10, '#2a50b8'], [16, 16, '#3d73e2'], [36, 20, '#2346a6']]
        .map(function (b) { return '<rect x="-160" y="' + b[0] + '" width="320" height="' + b[1] + '" fill="' + b[2] + '"/>'; }).join('') +
        periodic(function (o) { return '<ellipse cx="' + (o + 10) + '" cy="-4" rx="10" ry="5" fill="#1b3486" opacity=".8"/><path d="M' + (o - 30) + ',20 q10,-3 22,0" stroke="#bcd3ff" stroke-width="1.6" fill="none" opacity=".6"/>'; });
    }
    var turning = kind === 'earth' ? surf : '<g class="pl-turn" style="animation-duration:' + (kind === 'jupiter' ? 60 : kind === 'saturn' ? 80 : 90) + 's">' + surf + '</g>';
    return '<svg viewBox="' + vb + '" aria-hidden="true" focusable="false"><defs>' +
      '<clipPath id="' + clip + '"><circle r="' + R + '"/></clipPath>' +
      // sunlight from above: bright top, deep shadow at the bottom
      '<radialGradient id="' + light + '" cx="42%" cy="18%" r="85%"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#000" stop-opacity="0"/>' +
        '<stop offset=".8" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>' +
      '<radialGradient id="' + rim + '" r="50%"><stop offset=".86" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#bfe0ff" stop-opacity=".35"/></radialGradient>' +
      '</defs>' + extra +
      '<g clip-path="url(#' + clip + ')"><circle r="' + R + '" fill="' + base + '"/>' + turning + '<circle r="' + R + '" fill="url(#' + light + ')"/></g>' +
      '<circle r="' + R + '" fill="url(#' + rim + ')"/>' + over + '</svg>';
  }

  function solarView() {
    var totals = SYSTEMS.map(sysTotal), maxT = Math.max.apply(null, totals);
    var h = '<div class="solar"><canvas class="sl-sky" aria-hidden="true"></canvas><div class="sl-sun" aria-hidden="true"><i></i><i></i></div>' +
      '<div class="sl-head"><div class="sl-k">The U.S. bond market</div><div class="sl-big">$61 trillion</div>' +
      '<div class="sl-hint">Each planet is a group of players, sized by the money it manages. Tap a planet to meet its players.</div></div><ol class="sl-list">';
    SYSTEMS.forEach(function (sy, k) {
      var t = totals[k], d = Math.round(t ? 86 + 110 * Math.sqrt(t / maxT) : 82), kind = LOOKS[k % LOOKS.length];
      h += '<li class="sl-row' + (k % 2 ? ' alt' : '') + '" style="--d:' + d + ';--bob:' + (5 + k) + 's">' +
        '<button type="button" class="sl-btn" aria-expanded="false" aria-controls="sl-m' + k + '">' +
        '<span class="sl-planet' + (kind === 'saturn' ? ' ringed' : '') + '">' + planetSVG(kind, 'pl' + k) + '</span>' +
        '<span class="sl-info"><span class="sl-sub">' + esc(sy.sub) + '</span><span class="sl-name">' + esc(sy.name) + '</span>' +
        '<span class="sl-val' + (t ? '' : ' sm') + '">' + (t ? money(t) : sy.planets.length + ' primary dealers') + '</span><span class="sl-what">' + (t ? esc(sy.what) : 'market makers; holdings change daily') + '</span>' +
        '<span class="sl-more">Meet the ' + sy.planets.length + ' players <b aria-hidden="true">&#9662;</b></span></span></button>' +
        '<div class="sl-moons" id="sl-m' + k + '" hidden>' + sy.planets.map(function (p, i) {
          var share = p[1] && t ? Math.max(4, Math.round(p[1] / sy.planets[0][1] * 100)) : 0;
          return '<div class="sl-moon"><div class="sl-mh"><span class="sl-dot" style="background:' + PAL[(PAL.indexOf(sy.color) + i + 1) % PAL.length] + '"></span>' +
            '<span class="sl-mn">' + esc(p[0]) + '</span>' + (p[1] != null ? '<span class="sl-mv">' + money(p[1]) + '</span>' : '') + '</div>' +
            (share ? '<div class="sl-bar"><i style="width:' + share + '%"></i></div>' : '') +
            '<p>' + esc(p[3]) + (p[2] ? ' <span class="sl-asof">As of ' + esc(p[2]) + '.</span>' : '') + '</p></div>';
        }).join('') + '</div></li>';
    });
    return h + '</ol></div>';
  }

  function wireSolar(host) {
    var box = host.querySelector('.solar'); if (!box) return;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.sl-btn'); if (!b) return;
      var m = document.getElementById(b.getAttribute('aria-controls')), open = m.hidden;
      m.hidden = !open; b.setAttribute('aria-expanded', open); b.parentNode.classList.toggle('open', open);
    });
    // starfield with twinkle and a few drifting asteroids (canvas, paused when off screen or when motion is reduced)
    var cv = box.querySelector('.sl-sky'), ctx = cv.getContext && cv.getContext('2d'); if (!ctx) return;
    var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches, stars = [], rocks = [], w = 0, hgt = 0, seen = true, raf = 0, x = 11;
    function rnd() { x = (x * 9301 + 49297) % 233280; return x / 233280; }
    function size() {
      var dpr = Math.min(2, window.devicePixelRatio || 1); w = box.clientWidth; hgt = box.clientHeight;
      cv.width = w * dpr; cv.height = hgt * dpr; cv.style.width = w + 'px'; cv.style.height = hgt + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = []; rocks = []; var n = Math.round(w * hgt / 2600);
      for (var i = 0; i < n; i++) stars.push({ x: rnd() * w, y: rnd() * hgt, r: rnd() < .92 ? .4 + rnd() * .8 : 1.1 + rnd() * .9, a: .25 + rnd() * .65, p: rnd() * 6.28, s: .4 + rnd() * 1.4 });
      for (var j = 0; j < 14; j++) rocks.push({ x: rnd() * w, y: rnd() * hgt, r: .8 + rnd() * 1.8, vx: .06 + rnd() * .12, vy: .03 + rnd() * .08, c: rnd() < .5 ? '#a58f76' : '#cbb89c' });
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, hgt);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], a = still ? s.a : s.a * (.65 + .35 * Math.sin(t / 900 * s.s + s.p));
        ctx.globalAlpha = a; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = .9;
      for (var j = 0; j < rocks.length; j++) {
        var r = rocks[j];
        if (!still) { r.x += r.vx; r.y += r.vy; if (r.x > w + 4) r.x = -4; if (r.y > hgt + 4) r.y = -4; }
        ctx.fillStyle = r.c; ctx.beginPath(); ctx.ellipse(r.x, r.y, r.r * 1.3, r.r, .6, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function loop(t) { draw(t); if (!still && seen) raf = requestAnimationFrame(loop); }
    size(); draw(0);
    if (window.ResizeObserver) new ResizeObserver(function () { size(); draw(performance.now()); }).observe(box);
    if (!still && window.IntersectionObserver) {
      new IntersectionObserver(function (es) { seen = es[0].isIntersecting; cancelAnimationFrame(raf); if (seen) raf = requestAnimationFrame(loop); }).observe(box);
    } else if (!still) raf = requestAnimationFrame(loop);
  }

  function players() {
    var max = 15.3;
    var h = '<div class="wrap text"><div class="eyebrow"><a href="/education" style="color:inherit;text-decoration:none">Education</a></div>' +
      '<h1>The Players</h1><p class="lead">Who borrows, who lends, and how big the money really is. Hover over (or tap) a slice to see who is behind it.</p>' +
      '<section class="sec"><h2>How big is the U.S. bond market?</h2><p class="intro">About $61 trillion of U.S. bonds are outstanding. Treasuries alone are half of it.</p>' +
      donut('p75-d1', SECTORS, 'T', 'U.S. bond market') +
      '<p class="src">Source: SIFMA (Q2 2026); agency mortgage-backed securities as of Dec 2025. Commercial paper is approximate.</p></section>' +
      '<section class="sec"><h2>Who owns U.S. government debt?</h2><p class="intro">The $39 trillion the government owes is spread across foreign governments, the Fed, funds, banks and ordinary savers.</p>' +
      donut('p75-d2', HOLDERS, 'T', 'Federal debt') +
      '<p class="src">Source: U.S. Treasury, Federal Reserve and TIC data, compiled by Visual Capitalist (March 2026).</p></section>';
    h += '<section class="sec"><h2>The bond solar system: who moves the money</h2><p class="intro">The market is the sun. Each planet is a group of players, sized by the money it manages. Tap a planet to meet its biggest players.</p>' + solarView() +
      '<details class="list"><summary>Show the players as a list</summary><div class="pgrid">';
    SYSTEMS.forEach(function (sy) {
      sy.planets.forEach(function (p) {
        h += '<div class="pcard"><div class="n">' + esc(p[0]) + '</div><div class="v">' + (p[1] != null ? money(p[1]) + '<small>' + esc(p[2]) + '</small>' : '<small>' + esc(sy.sub) + '</small>') + '</div>' +
          '<p>' + esc(sy.sub) + ': ' + esc(p[3]) + '</p></div>';
      });
    });
    h += '</div></details><p class="src">Sources: company results and industry trackers (dates shown); Treasury holdings from U.S. Treasury TIC data via Visual Capitalist (Mar 2026); ' +
      'primary dealers from the Federal Reserve Bank of New York (2026).</p></section>' +
      '<p class="note">Figures for firms are total assets managed across all investments (stocks, bonds, property and more), not bonds alone, as reported by each firm or ' +
      'industry trackers for the date shown. Numbers are rounded and change quarter to quarter.</p>' +
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
    host.innerHTML = path === '/education' ? landing() : path === '/bond-history' ? history() : path === '/bond-types' ? types() : path === '/bond-players' ? players() : dictionary();
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
    if (path === '/bond-players') {
      wireDonut(host, 'p75-d1', SECTORS, 'U.S. bond market');
      wireDonut(host, 'p75-d2', HOLDERS, 'Federal debt');
      wireSolar(host);
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
