// Render check for intelsummary/editions.json, used by the daily scheduled task.
// Loads the Intelligent Summary page from a local clone of rahulmsaxena/coupon-news-ui,
// serves this editions.json in place of the live file, opens the list and every edition,
// and fails on any page error or if the page falls back to the sample editions.
//
//   NODE_PATH=$(npm root -g) node intelsummary/check.js /path/to/coupon-news-ui
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ui = process.argv[2] || path.join(__dirname, "../../coupon-news-ui");
const pageFile = path.join(ui, "intellegent-summary/index.html");
const editions = JSON.parse(fs.readFileSync(path.join(__dirname, "editions.json"), "utf8"));
const list = editions.summaries || [];
if (!list.length) { console.error("editions.json has no summaries"); process.exit(1); }
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }).catch(() => chromium.launch());
  const p = await b.newPage();
  const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await p.route("**/*", r => {
    const u = r.request().url();
    if (u.startsWith("https://point75.test/")) return r.fulfill({ contentType: "text/html", body: fs.readFileSync(pageFile, "utf8") });
    if (u.includes("/intelsummary/editions.json")) return r.fulfill({ contentType: "application/json", body: JSON.stringify(editions) });
    if (u.includes("/api/")) return r.fulfill({ status: 404, body: "{}" });
    return r.continue().catch(() => r.abort());
  });
  await p.goto("https://point75.test/intellegent-summary/", { waitUntil: "load" });
  await p.waitForTimeout(1500);
  const sample = await p.evaluate(() => !document.getElementById("sampleDisclaimer").hidden);
  if (sample) errs.push("page fell back to SAMPLE editions");
  for (const s of list) {
    const id = s.market_date + (s.edition === "morning" ? "-am" : "");
    await p.evaluate(h => { location.hash = h; }, "#/" + id);
    await p.waitForTimeout(400);
    const txt = await p.evaluate(() => document.body.innerText);
    if (!txt.includes(s.title)) errs.push(`edition ${id}: title not rendered`);
  }
  await b.close();
  if (errs.length) { console.error("FAIL\n" + errs.join("\n")); process.exit(1); }
  console.log(`OK: ${list.length} edition(s) rendered`);
})();
