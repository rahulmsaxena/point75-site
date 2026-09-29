"""Build indicators/data.json for the Economic Indicators page (/economic-indicators).

Pulls public series from FRED (fredgraph.csv, no API key needed), transforms them
(year-over-year %, monthly change, monthly level), and writes one small JSON file
that indicators/indicators.js reads. Run daily by .github/workflows/indicators.yml.

    python tools/indicators.py            # writes indicators/data.json
"""
import csv, io, json, os, sys, time, urllib.request
from datetime import date, datetime, timezone

START = "2014-01-01"          # 10 years of history plus a year for YoY math
KEEP_MONTHS = 120             # months of history kept for charts
OUT = os.path.join(os.path.dirname(__file__), "..", "indicators", "data.json")

# id, FRED series, name, unit, category, transform, bad direction, decimals, headline label, note
# transform: yoy (12-month % change), level (monthly value), diff (month-over-month change)
# bad: "up" if a rise is bad news, "down" if a fall is bad news, None if neutral
IND = [
    ("cpi",      "CPIAUCSL",          "CPI",                      "% YoY", "inflation", "yoy",   "up",   1, "CPI",          "Consumer prices, all items"),
    ("corecpi",  "CPILFESL",          "Core CPI",                 "% YoY", "inflation", "yoy",   "up",   1, None,           "Consumer prices excluding food and energy"),
    ("ppi",      "PPIFIS",            "PPI",                      "% YoY", "inflation", "yoy",   "up",   1, None,           "Producer prices, final demand"),
    ("corepce",  "PCEPILFE",          "Core PCE",                 "% YoY", "inflation", "yoy",   "up",   1, "Core PCE",     "The Fed's preferred inflation gauge"),
    ("gdp",      "A191RL1Q225SBEA",   "Real GDP",                 "% annualized", "growth", "level", "down", 1, "GDP",      "Quarterly growth, annualized"),
    ("indpro",   "INDPRO",            "Industrial production",    "% YoY", "growth",    "yoy",   "down", 1, None,           "Factories, mines and utilities"),
    ("retail",   "RSAFS",             "Retail sales",             "% YoY", "growth",    "yoy",   "down", 1, None,           "Nominal retail and food services sales"),
    ("unrate",   "UNRATE",            "Unemployment rate",        "%",     "labor",     "level", "up",   1, "Unemployment", "Share of the labor force without a job"),
    ("payrolls", "PAYEMS",            "Nonfarm payrolls",         "K / month", "labor", "diff",  "down", 0, None,           "Jobs added in the month"),
    ("claims",   "ICSA",              "Initial jobless claims",   "K / week",  "labor", "level", "up",   0, None,           "New unemployment filings, monthly average"),
    ("fedfunds", "DFF",               "Fed funds rate",           "%",     "rates",     "level", None,   2, "Fed funds",    "Effective overnight rate, monthly average"),
    ("t10",      "DGS10",             "10-year Treasury",         "%",     "rates",     "level", None,   2, "10Y yield",    "Constant-maturity yield, monthly average"),
    ("t2s10s",   "T10Y2Y",            "2s10s spread",             "pts",   "rates",     "level", "down", 2, None,           "10-year minus 2-year yield; below zero means inverted"),
    ("mortgage", "MORTGAGE30US",      "30-year mortgage rate",    "%",     "housing",   "level", "up",   2, None,           "Freddie Mac average, monthly"),
    ("starts",   "HOUST",             "Housing starts",           "K / yr", "housing",  "level", "down", 0, None,           "New homes started, annual rate"),
]
CATS = [("inflation", "Inflation"), ("growth", "Growth"), ("labor", "Labor"), ("rates", "Rates"), ("housing", "Housing")]


def fetch(series, tries=4):
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series}&cosd={START}"
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "point75-indicators/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                rows = list(csv.reader(io.StringIO(r.read().decode())))
            out = []
            for d, v in rows[1:]:
                if v in (".", ""):
                    continue
                out.append((d[:10], float(v)))
            if not out:
                raise ValueError("no data")
            return out
        except Exception as e:  # noqa: BLE001
            if i == tries - 1:
                raise RuntimeError(f"{series}: {e}")
            time.sleep(3 * (i + 1))


def monthly(obs, how):
    """Collapse daily/weekly observations to one value per month ('YYYY-MM')."""
    buckets = {}
    for d, v in obs:
        buckets.setdefault(d[:7], []).append(v)
    if how == "last":
        return [(m, vs[-1]) for m, vs in sorted(buckets.items())]
    return [(m, sum(vs) / len(vs)) for m, vs in sorted(buckets.items())]


def build_one(spec):
    iid, sid, name, unit, cat, tf, bad, dec, head, note = spec
    raw = fetch(sid)
    freq_q = sid.endswith("Q225SBEA")
    ser = [(d[:7], v) for d, v in raw] if freq_q else monthly(raw, "avg")
    if sid in ("ICSA",):
        ser = [(m, v / 1000) for m, v in ser]
    if tf == "yoy":
        idx = {m: v for m, v in ser}
        res = []
        for m, v in ser:
            y, mo = int(m[:4]), m[5:]
            prev = idx.get(f"{y - 1}-{mo}")
            if prev:
                res.append((m, (v / prev - 1) * 100))
        ser = res
    elif tf == "diff":
        ser = [(ser[i][0], ser[i][1] - ser[i - 1][1]) for i in range(1, len(ser))]
    # A month is only complete for daily/weekly series once it has ended; keep the
    # current partial month so the latest reading stays fresh, but label it.
    ser = ser[-(KEEP_MONTHS // 3 if freq_q else KEEP_MONTHS):]
    rnd = lambda x: round(x, max(dec, 2))
    last_obs = raw[-1][0]
    return {
        "id": iid, "name": name, "unit": unit, "cat": cat, "bad": bad, "dec": dec,
        "headline": head, "note": note, "freq": "Q" if freq_q else "M",
        "latest": {"period": ser[-1][0], "value": rnd(ser[-1][1]), "obs": last_obs},
        "prior": {"period": ser[-2][0], "value": rnd(ser[-2][1])},
        "series": [[m, rnd(v)] for m, v in ser],
        "source": f"https://fred.stlouisfed.org/series/{sid}",
    }


def recessions():
    rows = monthly(fetch("USREC"), "last")
    out, start = [], None
    for m, v in rows:
        if v >= 1 and start is None:
            start = m
        if v < 1 and start is not None:
            out.append([start, prev]); start = None
        prev = m
    if start is not None:
        out.append([start, rows[-1][0]])
    return out


def status(cat, by_id):
    """One plain word per category from the 3-month direction of its lead series."""
    def move(iid, n=3):
        s = by_id[iid]["series"]
        k = 1 if by_id[iid]["freq"] == "Q" else n
        return s[-1][1] - s[-1 - k][1]
    if cat == "inflation":
        d = move("corecpi")
        return ("Heating up", "bad") if d > 0.15 else ("Cooling", "good") if d < -0.15 else ("Steady", "flat")
    if cat == "growth":
        g = by_id["gdp"]["latest"]["value"]
        return ("Contracting", "bad") if g < 0 else ("Slowing", "bad") if g < 1 else ("Solid", "good") if g >= 2 else ("Moderate", "flat")
    if cat == "labor":
        d = move("unrate")
        return ("Softening", "bad") if d > 0.15 else ("Tightening", "good") if d < -0.15 else ("Steady", "flat")
    if cat == "rates":
        d = move("fedfunds")
        return ("Easing", "flat") if d < -0.1 else ("Tightening", "flat") if d > 0.1 else ("On hold", "flat")
    if cat == "housing":
        d = move("starts", 6)
        return ("Picking up", "good") if d > 40 else ("Cooling", "bad") if d < -40 else ("Steady", "flat")
    return ("", "flat")


def main():
    inds, failed = [], []
    for spec in IND:
        try:
            inds.append(build_one(spec))
        except Exception as e:  # noqa: BLE001
            failed.append(str(e)); print("WARN", e, file=sys.stderr)
    if len(inds) < len(IND) - 3:
        sys.exit("Too many series failed; keeping the previous data.json")
    by_id = {i["id"]: i for i in inds}
    cats = []
    for cid, cname in CATS:
        members = [i["id"] for i in inds if i["cat"] == cid]
        if not members:
            continue
        try:
            word, tone = status(cid, by_id)
        except KeyError:
            word, tone = "", "flat"
        cats.append({"id": cid, "name": cname, "status": word, "tone": tone, "items": members})
    data = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": "Federal Reserve Bank of St. Louis (FRED)",
        "recessions": recessions(),
        "categories": cats,
        "indicators": inds,
        "missing": failed,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(data, f, separators=(",", ":"))
    print("wrote", OUT, len(inds), "indicators")


if __name__ == "__main__":
    main()
