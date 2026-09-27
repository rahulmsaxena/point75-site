import re
def prep(t):
    t = re.sub(r'([.?!])([A-Z])', r'\1 \2', t)
    t = re.sub(r',([a-z])', r', \1', t)
    t = t.replace('interestrate', 'interest rate')
    t = t.replace('3¾', '3 and three quarters')
    t = re.sub(r"'(\d)0s", lambda m: {'9':'nineties','7':'seventies','8':'eighties'}.get(m.group(1), m.group(0)), t)
    t = re.sub(r'\$(\d+) gas', r'\1-dollar gas', t)
    t = re.sub(r'\$(\d[\d,.]*)\s*(trillion|billion|million)', r'\1 \2 dollars', t)
    t = re.sub(r'\$(\d[\d,.]*)', r'\1 dollars', t)
    t = re.sub(r'(\d)%', r'\1 percent', t)
    t = re.sub(r'(\d{4})–(\d{2})\b', r'\1 to \2', t)
    t = t.replace('12-0', '12 to 0')
    for a,b in [('FOMC','F O M C'),('WTI','W T I'),('AWS','A W S'),('ECB','E C B'),('GDP','G D P'),('UAE','U A E'),
                ('H200','H 200'),('MI325X','M I 325 X'),('AMD','A M D'),('capex','cap-ex'),('LLM','L L M')]:
        t = re.sub(r'\b%s\b' % re.escape(a), b, t)
    t = re.sub(r'\bAI\b', 'A.I.', t)
    t = re.sub(r'\bUS\b', 'U.S.', t)
    t = t.replace('—', ', ').replace('–', ', ')
    t = re.sub(r'\s+,', ',', t); t = re.sub(r',\s*,', ',', t); t = re.sub(r'\s{2,}', ' ', t)
    return t.strip()
