"""Build search/index.json for the Point75 site search (search/search.js).

Sources:
  - point75.io/sitemap.xml and each listed page: title, meta description and visible text
    (essays and any page Hostinger renders on the server).
  - This repo: Bond Dictionary terms and Education guide cards (education/education.js),
    bond types (Classification of Bonds), essay summaries (p75.js TLDR).
  - A fixed list of the data pages, and the companies on Sector Credit (news.point75.io/api/credit).

Every source is optional: if one fails, the rest still build. Run: python tools/build_search.py
"""
import html
import json
import os
import re
import sys
from html.parser import HTMLParser

import requests

SITE = "https://www.point75.io"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "search", "index.json")
UA = {"User-Agent": "Point75 site-search indexer (github.com/rahulmsaxena/point75-site)"}
TIMEOUT = 30
BODY_CHARS = 1500

# Pages drawn by our scripts (their text isn't in the server HTML), described by hand.
PAGES = [
    ("/pulse", "Pulse", "Data", "The bond market’s vital signs: positioning, rates volatility, funding pressure, term premium, inflation expectations and live headlines."),
    ("/debt-trap", "The Debt Trap", "Data", "How much U.S. debt has to be refinanced, what it costs in interest and who is still buying Treasuries."),
    ("/intelligent-summary", "Bond Summary", "Data", "Daily close summary of the Treasury market: why yields moved, the yield curve, Fed pricing, the day’s data and what to watch next."),
    ("/sector-credit", "Sector Credit", "Data", "Corporate debt sector by sector: the biggest borrowers, debt, Debt/EBITDA, interest coverage, how they are financed and who holds their commercial paper."),
    ("/lenders", "Lenders", "Data", "Who lends corporate America its short-term money: commercial paper holders, money market funds, insurers, pension funds, banks and private credit."),
    ("/credit-stress", "Credit Stress", "Data", "Where corporate credit is showing cracks: loan delinquencies, write-offs, commercial real estate, companies that can’t cover interest, private credit PIK and corporate debt to GDP."),
    ("/bonds", "Bonds", "Data", "Every outstanding U.S. Treasury with curve-based estimates."),
    ("/economic-indicators", "Economic Indicators", "Data", "The latest U.S. economic data: inflation, jobs, growth and more."),
    ("/insights", "Insights", "Data", "What the big bond investors are saying: where they agree, where they differ and what they are doing."),
    ("/news", "News", "Data", "Today’s bond, rates and central bank headlines."),
    ("/education", "Education", "Guide", "Short, plain-English guides to bonds, from the basics to the bond market’s biggest players."),
]


class Text(HTMLParser):
    """Visible text, title and meta description from a page."""
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.parts, self.title, self.desc, self.in_title = [], "", "", False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg", "header", "footer", "nav"):
            self.skip += 1
        if tag == "title":
            self.in_title = True
        if tag == "meta" and (a.get("name") == "description" or a.get("property") == "og:description") and not self.desc:
            self.desc = a.get("content") or ""

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg", "header", "footer", "nav") and self.skip:
            self.skip -= 1
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif not self.skip and data.strip():
            self.parts.append(data.strip())


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()


def crawl():
    docs = {}
    try:
        xml = requests.get(SITE + "/sitemap.xml", headers=UA, timeout=TIMEOUT).text
    except requests.RequestException as e:
        print(f"  [warn] sitemap: {e}")
        return docs
    for loc in re.findall(r"<loc>([^<]+)</loc>", xml):
        path = re.sub(r"^https?://[^/]+", "", loc).rstrip("/") or "/"
        try:
            r = requests.get(loc, headers=UA, timeout=TIMEOUT)
            r.raise_for_status()
        except requests.RequestException as e:
            print(f"  [warn] {path}: {e}")
            continue
        p = Text()
        p.feed(r.text)
        title = re.sub(r"\s*[|–-]\s*Point75\s*$", "", clean(p.title), flags=re.I)
        docs[path] = {"url": path, "title": title or path, "type": "Page", "desc": clean(p.desc), "body": clean(" ".join(p.parts))[:BODY_CHARS]}
    print(f"  [ok] crawled {len(docs)} pages")
    return docs


def repo_content():
    out = []
    edu = open(os.path.join(ROOT, "education", "education.js"), encoding="utf-8").read()
    terms = json.loads(re.search(r"var TERMS = (\[.*?\n  \]);", edu, re.S).group(1))
    for t in terms:
        out.append({"url": "/bond-dictionary?q=" + requests.utils.quote(t[0]), "title": t[0], "type": "Dictionary",
                    "keys": t[1], "desc": t[2], "body": t[3]})
    for href, title, desc in re.findall(r'<a class="card" href="([^"]+)"><div class="eyebrow">[^<]*</div><h3>([^<]+)</h3>\'\s*\+\s*\'<p>(.*?)</p>', edu, re.S):
        desc = desc.replace("' + TERMS.length + '", str(len(terms)))
        out.append({"url": href, "title": clean(title), "type": "Guide", "desc": clean(re.sub(r"'\s*\+[^+]*\+\s*'", "", desc))})
    for sec in json.loads(re.search(r"var TYPES = (\[.*?\n  \]);", edu, re.S).group(1)):
        out.append({"url": "/bond-types", "title": sec[0], "type": "Guide", "desc": sec[1], "keys": ", ".join(x[0] for x in sec[2]),
                    "body": " ".join(x[1] for x in sec[2])[:BODY_CHARS]})
    p75 = open(os.path.join(ROOT, "p75.js"), encoding="utf-8").read()
    tldr = re.search(r"var TLDR = (\{.*?\n  \});", p75, re.S)
    summaries = {}
    if tldr:
        for path, val in re.findall(r"'(/[^']+)':\s*\"((?:[^\"\\]|\\.)*)\"", tldr.group(1)):
            summaries[path] = clean(json.loads('"' + val + '"'))
    return out, summaries


def companies():
    try:
        j = requests.get("https://news.point75.io/api/credit", headers=UA, timeout=TIMEOUT).json()
    except (requests.RequestException, ValueError) as e:
        print(f"  [warn] credit api: {e}")
        return []
    return [{"url": "/sector-credit?tk=" + c["tk"], "title": c["name"], "type": "Company", "keys": c["tk"] + " " + c["sector"],
             "desc": f"{c['sector']}: debt, Debt/EBITDA, interest coverage and who holds its paper, on Sector Credit."}
            for c in j.get("companies", [])]


def main():
    crawled = crawl()
    structured, summaries = repo_content()
    docs = []
    fixed = {p[0] for p in PAGES}
    for path, title, typ, desc in PAGES:
        d = crawled.get(path, {})
        docs.append({"url": path, "title": title, "type": typ, "desc": desc, "body": d.get("body", "")})
    skip = fixed | {"/bond-dictionary", "/bond-types"} | {d["url"] for d in structured if d["type"] == "Guide"}
    for path, d in crawled.items():
        if path in skip or path == "/":
            continue
        if path in summaries:
            d["type"], d["desc"] = "Essay", summaries[path]
        docs.append(d)
    for path, s in summaries.items():  # essays the crawl missed
        if path not in crawled:
            docs.append({"url": path, "title": path.strip("/").replace("-", " ").capitalize(), "type": "Essay", "desc": s})
    docs += structured + companies()
    for d in docs:
        for k in ("keys", "desc", "body"):
            if not d.get(k):
                d.pop(k, None)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump({"docs": docs}, fh, ensure_ascii=False, separators=(",", ":"))
    kinds = {}
    for d in docs:
        kinds[d["type"]] = kinds.get(d["type"], 0) + 1
    print(f"  [ok] wrote {len(docs)} entries {kinds} -> {OUT}")
    return 0 if docs else 1


if __name__ == "__main__":
    sys.exit(main())
