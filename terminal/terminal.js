/* Point75 Terminal on point75.io: the same overlay as tools.point75.io (point75-tools components/terminal), in
   vanilla JS. Loaded by shell/shell.js on every page. Opens with "/" (not while typing in a field), Ctrl+K or ⌘K,
   and from Terminal in the left menu (window.P75TERM.open()). Answers come from tools.point75.io/api/v1/terminal,
   called without credentials; 10Y, 2Y, 2s10s and PULSE are answered here from the newest Intelligent Summary edition (tools.point75.io/api/v1/intelsummary) and
   news.point75.io/api/pulse. Every string from the network is escaped before it goes into HTML.
   The CSS is the tools terminal's terminal.css with every selector under #p75T: change the two together.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75TERM) return;   // p75.js and the shell run about once a second: everything here happens once

  var TOOLS = 'https://tools.point75.io';
  var SITE = 'https://www.point75.io';
  var API = TOOLS + '/api/v1/terminal';
  var BASE = window.P75BASE || 'https://rahulmsaxena.github.io/point75-site/';
  var PULSE_API = 'https://news.point75.io/api/pulse';
  var GEIST = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap';
  var RECENT_KEY = 'p75.terminal.recent', MAX_RECENT = 6;
  var TAPS = ['NVDA', 'CMP MSFT GOOGL', 'TOP STRAIN', 'LIQ', 'AI SPEND', 'HELP'];
  var TONE = { good: '#1FC8FF', warn: '#FFB224', bad: '#FF6640', gold: '#FFD23F', neutral: '#F3F0EA' };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var PRICE = '$15';   // point75-tools config/membership.ts PRICES.monthly.early
  var OPEN = true;     // point75-tools config/membership.ts OPEN_ACCESS: no "Members" labels while everything is open

  // The free commands answered on this site, and what each one offers next (as the answer service would)
  var S = function (code, help) { return { code: code, title: code, help: help, access: 'free', kind: 'link' }; };
  var LOCAL = {
    '10Y': { title: '10-year Treasury yield', href: SITE + '/intelligent-summary', next: ['RATES', 'FED', 'LIQ'] },
    '2Y': { title: '2-year Treasury yield', href: SITE + '/intelligent-summary', next: ['RATES', 'FED', 'LIQ'] },
    '2S10S': { title: '2s10s curve', href: SITE + '/intelligent-summary', next: ['RATES', 'FED', 'LIQ'] },
    'PULSE': { title: 'Pulse', href: SITE + '/pulse', next: ['10Y', 'LIQ', 'RATES'] }
  };
  var HELP = {
    '10Y': 'The 10-year Treasury yield today.', '2Y': 'The 2-year Treasury yield today.',
    '2S10S': 'The gap between 2- and 10-year yields.', PULSE: 'The bond market’s vital signs at a glance.',
    RATES: 'Outlook: where rates are heading.', FED: 'Outlook: the Fed’s next moves.',
    LIQ: 'Net liquidity: the Fed’s balance sheet less Treasury cash and reverse repo.',
    NVDA: 'NVIDIA: AI capex against operating cash.', 'CMP MSFT GOOGL': 'Compare Microsoft and Alphabet.',
    'TOP STRAIN': 'The AI builders under the most strain.', 'AI SPEND': 'The 12 biggest AI builders: capex against operating cash.',
    HELP: 'Every command.'
  };
  // Shown before the answer service has replied (the same starters it returns for an empty prompt)
  var STARTERS = ['NVDA', 'CMP MSFT GOOGL', 'TOP STRAIN', 'LIQ', '10Y', 'AI SPEND', 'RATES'].map(function (c) {
    var s = S(c, HELP[c] || ''); if (!OPEN && (c === 'NVDA' || c === 'CMP MSFT GOOGL' || c === 'TOP STRAIN')) s.access = 'members'; return s;
  });

  // How to use: point75-tools lib/terminal/guide.ts (GUIDE_*), copied: change both together
  var GUIDE_WORDS = ['?', 'guide', 'how to use', 'manual', 'how', 'shortcuts', 'keys'];
  var GUIDE_KEYS = [
  ["/", "Open the terminal on any page of either site"],
  ["Ctrl K · ⌘K", "Open it from anywhere, even while typing in a box"],
  ["↵ Enter", "Run what you typed, or the highlighted suggestion"],
  ["↑ ↓", "Move through the suggestions"],
  ["Esc", "Clear the line; press again to close"],
];
  var GUIDE_GROUPS = [
  {
    title: "Markets today",
    line: "Live readings with the date they’re from.",
    examples: [["10Y", "10-year Treasury yield"], ["2S10S", "The curve: 2s against 10s"], ["LIQ", "Net liquidity"], ["PULSE", "The bond market’s vital signs"]],
  },
  {
    title: "Outlook odds",
    line: "Where things are likely in a year, with the odds.",
    examples: [["RATES", "The 10-year in a year"], ["FED", "The Fed’s next moves"], ["OIL", "Brent and the odds of a spike"], ["INFL", "Inflation and stagflation"]],
  },
  {
    title: "AI builders",
    line: "Any of the 12 by ticker or name: “nvidia”, “google”.",
    examples: [["NVDA", "Capex against cash, debt, strain"], ["CMP MSFT GOOGL", "Two or more side by side"], ["TOP STRAIN", "Ranked by financial strain"], ["AI SPEND", "All 12 at a glance"]],
  },
  {
    title: "Find any page",
    line: "Type a page’s name to go there.",
    examples: [["DEBT TRAP", "Debt Trap"], ["EDUCATION", "Bond guides"], ["LEDGER", "Test your portfolio"], ["HELP", "Every command"]],
  },
];
  var GUIDE_TIPS = [
  "Plain words work: “compare microsoft and google”, “how strained is oracle”, “what is the 10 year”.",
  "Tap any answer’s chips to follow on; your last few commands sit under Recent.",
  "Share an answer: tools.point75.io/terminal?q=NVDA opens straight to it.",
];
  function guideHTML() {
    return '<section class="p75t-guide" aria-label="How to use the Terminal"><p class="p75t-gh"><span class="p75t-k">How to use</span> Type a code or plain words and press ↵. Tap any example to try it.</p>' +
      '<div class="p75t-gg">' + GUIDE_GROUPS.map(function (g) {
        return '<div class="p75t-gc"><h3>' + esc(g.title) + '</h3><p>' + esc(g.line) + '</p><ul>' + g.examples.map(function (x) {
          return '<li><button type="button" class="p75t-ge" data-run="' + esc(x[0]) + '"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></button></li>';
        }).join('') + '</ul></div>';
      }).join('') + '</div>' +
      '<div class="p75t-gk"><div><h3>Keys</h3><dl>' + GUIDE_KEYS.map(function (k) {
        return '<div><dt><kbd>' + esc(k[0]) + '</kbd></dt><dd>' + esc(k[1]) + '</dd></div>';
      }).join('') + '</dl></div><div><h3>Tips</h3><ul class="p75t-gtips">' + GUIDE_TIPS.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></div></section>';
  }

  /* ---------- small helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function toneStyle(t) { return TONE[t] ? ' style="color:' + TONE[t] + '"' : ''; }
  /** A link from the answer service: a path is on tools.point75.io, a full https address is used as is. */
  function abs(href) {
    if (typeof href !== 'string' || !href) return null;
    if (href.charAt(0) === '/' && href.charAt(1) !== '/') return TOOLS + href;
    return /^https:\/\//i.test(href) ? href : null;
  }
  function dateLabel(iso) {
    var m = typeof iso === 'string' && iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? MONTHS[Number(m[2]) - 1] + ' ' + Number(m[3]) + ', ' + m[1] : null;
  }
  function readRecent() {
    try { var v = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string'; }).slice(0, MAX_RECENT) : []; }
    catch (e) { return []; }
  }
  function writeRecent(list) { try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch (e) { /* private mode: recents just aren't kept */ } }
  function getJSON(url, signal) {
    return fetch(url, { credentials: 'omit', signal: signal, headers: { accept: 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }
  /** True when the key press belongs to a field someone is typing in, so "/" types a slash there. */
  function typing(t) {
    return !!(t && t.tagName && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)));
  }

  /* ---------- look ---------- */
  var CSS = [
    "#p75T .p75t{--t-bg: #141518;--t-panel: #17181b;--t-cell: #1b1c20;--t-line: #2a2b2f;--t-line2: #34363c;--t-gold: #c9a227;--t-bright: #ffd23f;--t-ink: #f3f0ea;--t-soft: #d9d3c6;--t-muted: #bdb7aa;--t-mono: \"Geist\", \"Manrope\", system-ui, sans-serif;--t-label: Jost, system-ui, sans-serif;--t-serif: \"Hedvig Letters Serif\", Georgia, serif;container-type: inline-size;display: flex;flex-direction: column;min-height: 0;background: var(--t-bg);color: var(--t-ink);font-family: var(--t-mono);font-variant-numeric: tabular-nums;-webkit-font-smoothing: antialiased}",
    "#p75T .p75t *,#p75T .p75t *::before,#p75T .p75t *::after{box-sizing: border-box}",
    "#p75T .p75t .sr{position: absolute;width: 1px;height: 1px;overflow: hidden;clip: rect(0 0 0 0);white-space: nowrap}",
    "#p75T .p75t button{font: inherit;color: inherit;-webkit-appearance: none;appearance: none;cursor: pointer}",
    "#p75T .p75t h2,#p75T .p75t p{margin: 0}",
    "#p75T .p75t a{text-decoration: none}",
    "#p75T .p75t-k{font: 500 12px/1.2 var(--t-label);letter-spacing: 0.16em;text-transform: uppercase;color: var(--t-muted)}",
    "#p75T .p75t-bar{flex: none;display: flex;flex-wrap: wrap;align-items: center;gap: 4px 16px;min-height: 48px;padding: 4px 8px 4px 18px;border-bottom: 1px solid var(--t-line);background: var(--t-panel)}",
    "#p75T .p75t-brand{font: 500 12.5px var(--t-label);letter-spacing: 0.24em;text-transform: uppercase;color: var(--t-gold)}",
    "#p75T .p75t-asof{font: 400 13px var(--t-label);letter-spacing: 0.04em;color: var(--t-muted)}",
    "#p75T .p75t-keys{font: 400 12.5px var(--t-mono);color: var(--t-muted);padding-right: 10px}",
    "#p75T .p75t-help{display: inline-flex;align-items: center;gap: 7px;min-height: 36px;margin-left: auto;padding: 0 12px 0 6px;border: 1px solid var(--t-line2);border-radius: 99px;background: none;font: 500 12px var(--t-label) !important;letter-spacing: 0.14em;text-transform: uppercase;color: var(--t-soft) !important}",
    "#p75T .p75t-help span{display: grid;place-items: center;width: 22px;height: 22px;border-radius: 50%;background: var(--t-line2);color: var(--t-bright);font: 600 13px var(--t-mono);letter-spacing: 0}",
    "#p75T .p75t-help:hover,#p75T .p75t-help.on{border-color: var(--t-gold);color: #fff !important}",
    "#p75T .p75t-help.on span{background: var(--t-gold);color: #111214}",
    "#p75T .p75t-help .p75t-hl{font-style: normal}",
    "#p75T .p75t-help:focus-visible,#p75T .p75t-ge:focus-visible{outline: 3px solid var(--t-bright);outline-offset: 2px}",
    "#p75T .p75t-x{display: grid;place-items: center;width: 44px;height: 44px;border: 1px solid transparent;border-radius: 10px;background: none;color: var(--t-ink)}",
    "#p75T .p75t-x:hover{color: var(--t-bright);border-color: var(--t-line2)}",
    "#p75T .p75t-prompt{flex: none;display: flex;align-items: center;gap: 12px;margin: 0;padding: 10px 12px 10px 18px;border-bottom: 1px solid var(--t-line)}",
    "#p75T .p75t-gt{font: 700 24px/1 var(--t-mono);color: var(--t-bright)}",
    "#p75T .p75t-field{position: relative;flex: 1;min-width: 0;display: flex}",
    "#p75T .p75t-field input{flex: 1;min-width: 0;min-height: 44px;padding: 0;border: 0;outline: none;background: transparent;color: #fff;caret-color: transparent;font: 500 20px var(--t-mono);letter-spacing: 0.01em}",
    "#p75T .p75t-field input::placeholder{color: #8d887e}",
    "#p75T .p75t-field:focus-within{box-shadow: 0 2px 0 -1px var(--t-gold)}",
    "#p75T .p75t-mirror{position: absolute;left: 0;top: 0;visibility: hidden;white-space: pre;font: 500 20px var(--t-mono);letter-spacing: 0.01em}",
    "#p75T .p75t-caret{position: absolute;top: 50%;width: 0.55em;height: 1.2em;font-size: 20px;margin-top: -0.6em;background: var(--t-bright);pointer-events: none;animation: p75t-blink 1.06s steps(1, end) infinite}",
    "@keyframes p75t-blink{50% { opacity: 0; }}",
    "#p75T .p75t-go{flex: none;min-height: 44px;padding: 0 20px;border: 0;border-radius: 10px;background: var(--t-gold);color: #111214 !important;font: 500 13.5px var(--t-label) !important;letter-spacing: 0.18em;text-transform: uppercase}",
    "#p75T .p75t-go:hover{background: var(--t-bright)}",
    "#p75T .p75t-body{flex: 1 1 auto;min-height: 0;overflow-y: auto;overscroll-behavior: contain;padding: 12px 18px 18px}",
    "#p75T .p75t-sugg{display: flex;flex-direction: column;gap: 6px}",
    "#p75T .p75t-try{padding: 2px 12px 4px}",
    "#p75T .p75t-sugg ul{list-style: none;margin: 0;padding: 0;display: flex;flex-direction: column;gap: 2px}",
    "#p75T .p75t-sugg li{display: grid;grid-template-columns: minmax(150px, 210px) minmax(0, 1fr) auto;gap: 14px;align-items: center;min-height: 44px;padding: 6px 12px;border-radius: 10px;border: 1px solid transparent;cursor: pointer}",
    "#p75T .p75t-sugg li:hover{background: #1c1d21}",
    "#p75T .p75t-sugg li.on{background: rgba(201, 162, 39, 0.12);border-color: rgba(201, 162, 39, 0.6)}",
    "#p75T .p75t-sc{font: 600 15.5px var(--t-mono);color: var(--t-bright);overflow-wrap: anywhere}",
    "#p75T .p75t-sh{font-size: 14.5px;line-height: 1.4;color: var(--t-soft)}",
    "#p75T .p75t-sk{font: 400 11.5px var(--t-label);letter-spacing: 0.14em;text-transform: uppercase;color: var(--t-muted)}",
    "#p75T .p75t-none{margin: 6px 12px;font-size: 14.5px;color: var(--t-soft)}",
    "#p75T .p75t-ans{display: flex;flex-direction: column;gap: 12px}",
    "#p75T .p75t-echo{display: flex;flex-wrap: wrap;align-items: baseline;gap: 4px 10px;font: 500 14px var(--t-mono);color: var(--t-muted)}",
    "#p75T .p75t-pr{color: var(--t-gold)}",
    "#p75T .p75t-said{color: var(--t-ink);overflow-wrap: anywhere}",
    "#p75T .p75t-meant{color: var(--t-muted)}",
    "#p75T .p75t-head{display: flex;flex-wrap: wrap;align-items: baseline;gap: 4px 14px}",
    "#p75T .p75t-title{font: 400 28px/1.15 var(--t-serif);color: #fff;overflow-wrap: anywhere}",
    "#p75T .p75t-pill{align-self: center;padding: 3px 11px;border-radius: 99px;color: #111214;font: 600 11.5px/1.3 var(--t-label);letter-spacing: .12em;text-transform: uppercase;white-space: nowrap}",
    "#p75T .p75t-code{font: 600 15px var(--t-mono);letter-spacing: 0.02em;color: var(--t-bright)}",
    "#p75T .p75t-sub{font-size: 15px;line-height: 1.55;color: var(--t-soft)}",
    "#p75T .p75t-cells{display: grid;grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));gap: 10px}",
    "#p75T .p75t-cells.few{grid-template-columns: repeat(auto-fit, minmax(190px, 1fr))}",
    "#p75T .p75t-cell{display: flex;flex-direction: column;gap: 4px;min-width: 0;padding: 11px 14px 12px;border-radius: 12px;background: var(--t-cell);border: 1px solid var(--t-line)}",
    "#p75T .p75t-cell b{font: 400 28px/1.1 var(--t-serif);color: var(--t-ink);overflow-wrap: anywhere}",
    "#p75T .p75t-cs{font-size: 13.5px;line-height: 1.4;color: var(--t-soft)}",
    "#p75T .p75t-tbl{border-radius: 12px;border: 1px solid var(--t-line);overflow: hidden}",
    "#p75T .p75t-tbl table{width: 100%;border-collapse: collapse;font-size: 15px}",
    "#p75T .p75t-tbl thead th{padding: 10px 12px;background: var(--t-cell);text-align: right;font: 500 12px var(--t-label);letter-spacing: 0.14em;text-transform: uppercase;color: var(--t-muted);white-space: nowrap}",
    "#p75T .p75t-tbl thead th:first-child{text-align: left}",
    "#p75T .p75t-tbl tbody th,#p75T .p75t-tbl td{padding: 9px 12px;border-top: 1px solid var(--t-line);vertical-align: middle}",
    "#p75T .p75t-tbl tbody th{text-align: left;font-weight: 500;color: var(--t-soft)}",
    "#p75T .p75t-tbl td{text-align: right;color: var(--t-ink);font-weight: 500}",
    "#p75T .p75t-tbl.stack td:last-child:not(:nth-child(2)){font-size: 14px}",
    "#p75T .p75t-tbl.help td{text-align: left;color: var(--t-soft)}",
    "#p75T .p75t-tbl.help td:last-child{text-align: right;font: 400 11.5px var(--t-label);letter-spacing: 0.14em;text-transform: uppercase;color: var(--t-muted) !important}",
    "#p75T .p75t-run{display: inline-flex;align-items: center;min-height: 36px;padding: 0;border: 0;background: none;color: var(--t-bright) !important;font: 600 15px var(--t-mono) !important;text-align: left}",
    "#p75T .p75t-run:hover{text-decoration: underline;text-underline-offset: 4px}",
    "#p75T .p75t-lock{display: flex;flex-direction: column;gap: 10px;padding: 16px 18px;border-radius: 14px;border: 2px solid var(--t-gold);background: linear-gradient(135deg, #221e12 0%, var(--t-panel) 60%)}",
    "#p75T .p75t-lock .p75t-k{color: var(--t-gold);font-weight: 500}",
    "#p75T .p75t-lock-h{font: 400 19px/1.4 var(--t-serif);color: #fff}",
    "#p75T .p75t-lock-a{display: flex;flex-wrap: wrap;align-items: center;gap: 8px 18px}",
    "#p75T .p75t-lock-p{font-size: 14.5px;color: var(--t-ink)}",
    "#p75T .p75t-lock-p b{color: var(--t-bright)}",
    "#p75T .p75t-btn{display: inline-flex;align-items: center;gap: 8px;min-height: 44px;padding: 0 20px;border-radius: 12px;background: var(--t-gold);color: #111214;font: 500 13.5px var(--t-label);letter-spacing: 0.16em;text-transform: uppercase}",
    "#p75T .p75t-btn:hover,#p75T .p75t-btn:focus-visible{background: var(--t-bright)}",
    "#p75T .p75t-lnk{display: inline-flex;align-items: center;min-height: 44px;color: var(--t-bright);font-weight: 600;font-size: 14.5px}",
    "#p75T .p75t-lnk:hover{color: #fff}",
    "#p75T .p75t-nav{display: flex;flex-wrap: wrap;align-items: center;gap: 8px 16px;padding: 14px 16px;border-radius: 12px;background: var(--t-cell);border: 1px solid var(--t-line)}",
    "#p75T .p75t-nav-t{flex: 1 1 260px;font-size: 15px;line-height: 1.5;color: var(--t-soft)}",
    "#p75T .p75t-chips{display: flex;flex-wrap: wrap;align-items: center;gap: 8px}",
    "#p75T .p75t-chip{display: inline-flex;align-items: center;min-height: 38px;padding: 0 14px;border-radius: 99px;border: 1px solid var(--t-line2);background: transparent;color: var(--t-bright) !important;font: 500 12.5px var(--t-label) !important;letter-spacing: 0.14em;text-transform: uppercase;white-space: nowrap}",
    "#p75T .p75t-chip:hover{border-color: var(--t-gold)}",
    "#p75T .p75t-chip.next{border-color: var(--t-gold);background: rgba(201, 162, 39, 0.12)}",
    "#p75T .p75t-open{display: inline-flex;align-items: center;gap: 6px;min-height: 38px;margin-left: auto;color: var(--t-bright);font: 500 12.5px var(--t-label);letter-spacing: 0.14em;text-transform: uppercase}",
    "#p75T .p75t-open:hover{color: #fff}",
    "#p75T .p75t-err{display: flex;flex-wrap: wrap;align-items: center;gap: 10px 16px;font-size: 15px;color: var(--t-soft)}",
    "#p75T .p75t-err b{color: var(--t-ink)}",
    "#p75T .p75t-foot{flex: none;display: flex;flex-wrap: wrap;align-items: center;gap: 6px 14px;padding: 8px 18px;border-top: 1px solid var(--t-line);background: var(--t-panel)}",
    "#p75T .p75t-recent{display: flex;flex-wrap: wrap;align-items: center;gap: 6px;min-width: 0}",
    "#p75T .p75t-recent .p75t-k{margin-right: 4px}",
    "#p75T .p75t-rc{min-height: 36px;max-width: 220px;padding: 0 12px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;border: 1px solid var(--t-line2);border-radius: 99px;background: transparent;font: 500 13px var(--t-mono) !important;color: var(--t-ink) !important}",
    "#p75T .p75t-rc:hover{border-color: var(--t-gold)}",
    "#p75T .p75t-hint{margin-left: auto;font-size: 12.5px;color: var(--t-muted)}",
    "#p75T .p75t-taps{display: none}",
    "#p75T .p75t-scrim{position: fixed;inset: 0;z-index: 80;display: flex;justify-content: center;align-items: flex-start;padding: 96px 16px 16px;background: rgba(9, 9, 11, 0.74)}",
    "#p75T .p75t-dlg{display: flex;width: 100%;max-width: 880px;max-height: calc(100dvh - 112px);border-radius: 16px;border: 1.5px solid var(--t-gold);background: #141518;box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);overflow: hidden}",
    "#p75T .p75t-dlg > .p75t{flex: 1;min-width: 0}",
    "#p75T .p75t-dlg > .p75t:empty{min-height: 160px}",
    "@container (max-width: 700px){",
    "  #p75T .p75t-tbl.stack{border: 0;border-radius: 0;overflow: visible}",
    "  #p75T .p75t-tbl.stack table,#p75T .p75t-tbl.stack tbody{display: block}",
    "  #p75T .p75t-tbl.stack thead{display: none}",
    "  #p75T .p75t-tbl.stack tr{display: flex;flex-wrap: wrap;align-items: baseline;gap: 2px 14px;margin-bottom: 8px;padding: 8px 12px 10px;border-radius: 12px;background: var(--t-cell);border: 1px solid var(--t-line)}",
    "  #p75T .p75t-tbl.stack tbody th{flex: 1 0 100%;padding: 0;border: 0}",
    "  #p75T .p75t-tbl.stack td{padding: 0;border: 0;text-align: left;font-size: 14.5px}",
    "  #p75T .p75t-tbl.stack td[data-col]::before{content: attr(data-col) \" \";font: 400 11px var(--t-label);letter-spacing: 0.12em;text-transform: uppercase;color: var(--t-muted);margin-right: 4px}",
    "  #p75T .p75t-tbl.stack td:last-child:not(:nth-child(2)){flex-basis: 100%}",
    "  #p75T .p75t-tbl.help td::before{content: none !important}",
    "  #p75T .p75t-tbl.help td:last-child{flex-basis: auto !important;margin-left: auto}",
    "  #p75T .p75t-tbl.help td:nth-child(2){flex: 1 1 100%}",
    "  #p75T .p75t-sugg li{grid-template-columns: minmax(0, 1fr) auto;gap: 2px 10px}",
    "  #p75T .p75t-sh{grid-column: 1 / -1;grid-row: 2;font-size: 13.5px}",
    "  #p75T .p75t-keys{display: none}",
    "  #p75T .p75t-title{font-size: 25px}",
    "  #p75T .p75t-cells,#p75T .p75t-cells.few{grid-template-columns: repeat(2, minmax(0, 1fr));gap: 8px}",
    "  #p75T .p75t-cells.n3{grid-template-columns: repeat(3, minmax(0, 1fr))}",
    "  #p75T .p75t-cell{padding: 10px 12px}",
    "  #p75T .p75t-cell b{font-size: 24px}",
    "}",
    "@media (max-width: 640px){",
    "  #p75T .p75t-scrim{padding: 0;background: #141518}",
    "  #p75T .p75t-dlg{max-width: none;max-height: none;height: 100dvh;border: 0;border-radius: 0;box-shadow: none}",
    "  #p75T .p75t-bar{padding-left: 16px}",
    "  #p75T .p75t-asof{display: none}",
    "  #p75T .p75t-x{border-color: var(--t-line2);border-radius: 12px}",
    "  #p75T .p75t-help{min-height: 44px;min-width: 44px;justify-content: center;padding: 0;border-radius: 12px}",
    "  #p75T .p75t-help .p75t-hl{display: none}",
    "  #p75T .p75t-prompt{margin: 10px 12px;padding: 0 6px 0 12px;border: 1.5px solid var(--t-gold);border-radius: 12px;background: #1b1c20}",
    "  #p75T .p75t-field:focus-within{box-shadow: none}",
    "  #p75T .p75t-field input,#p75T .p75t-mirror{font-size: 18px}",
    "  #p75T .p75t-field input{min-height: 48px}",
    "  #p75T .p75t-caret{font-size: 18px}",
    "  #p75T .p75t-go{padding: 0 14px}",
    "  #p75T .p75t-body{padding: 0 14px 12px}",
    "  #p75T .p75t-foot{display: none}",
    "  #p75T .p75t-chips .p75t-chip{display: none}",
    "  #p75T .p75t-open{margin-left: 0;min-height: 44px}",
    "  #p75T .p75t-chip{min-height: 44px;font-size: 12px !important;letter-spacing: 0.1em;padding: 0 12px}",
    "  #p75T .p75t-taps > div{gap: 6px !important}",
    "  #p75T .p75t-run{min-height: 44px}",
    "  #p75T .p75t-taps{flex: none;display: flex;flex-direction: column;gap: 8px;padding: 10px 12px calc(12px + env(safe-area-inset-bottom));border-top: 1px solid var(--t-line);background: var(--t-panel)}",
    "  #p75T .p75t-taps > div{display: flex;flex-wrap: wrap;gap: 8px}",
    "  #p75T .p75t-lock-h{font-size: 17.5px}",
    "  #p75T .p75t-sugg li{min-height: 48px}",
    "}",
    "#p75T .p75t-guide{color: var(--t-soft)}",
    "#p75T .p75t-gh{font-size: 15px;line-height: 1.5;margin: 2px 0 12px !important;color: var(--t-ink)}",
    "#p75T .p75t-gh .p75t-k{color: var(--t-gold);margin-right: 8px}",
    "#p75T .p75t-guide h3{margin: 0 0 2px;font: 500 12.5px var(--t-label);letter-spacing: 0.16em;text-transform: uppercase;color: var(--t-gold)}",
    "#p75T .p75t-gg{display: grid;grid-template-columns: repeat(4, minmax(0, 1fr));gap: 10px}",
    "#p75T .p75t-gc{min-width: 0;padding: 12px 12px 8px;border: 1px solid var(--t-line);border-radius: 10px;background: var(--t-cell)}",
    "#p75T .p75t-gc > p{margin: 0 0 8px;font-size: 13px;line-height: 1.45;color: var(--t-muted)}",
    "#p75T .p75t-gc ul,#p75T .p75t-gtips{list-style: none;margin: 0;padding: 0}",
    "#p75T .p75t-ge{display: flex;flex-direction: column;gap: 1px;width: 100%;min-height: 44px;padding: 6px 8px;margin: 0 -8px;border: 0;border-radius: 8px;background: none;text-align: left}",
    "#p75T .p75t-ge b{font: 600 14.5px var(--t-mono);color: var(--t-bright)}",
    "#p75T .p75t-ge span{font-size: 13px;line-height: 1.35;color: var(--t-soft)}",
    "#p75T .p75t-ge:hover{background: rgba(201, 162, 39, 0.1)}",
    "#p75T .p75t-gk{display: grid;grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);gap: 10px 24px;margin-top: 14px}",
    "#p75T .p75t-gk dl{margin: 6px 0 0}",
    "#p75T .p75t-gk dl > div{display: grid;grid-template-columns: 112px minmax(0, 1fr);gap: 10px;align-items: baseline;padding: 4px 0}",
    "#p75T .p75t-gk dd{margin: 0;font-size: 14px;line-height: 1.45}",
    "#p75T .p75t-guide kbd{display: inline-block;padding: 2px 7px;border: 1px solid var(--t-line2);border-bottom-width: 2px;border-radius: 6px;background: var(--t-panel);font: 600 12.5px var(--t-mono);color: var(--t-ink);white-space: nowrap}",
    "#p75T .p75t-gtips{margin-top: 6px !important}",
    "#p75T .p75t-gtips li{position: relative;padding: 4px 0 4px 14px;font-size: 14px;line-height: 1.45}",
    "#p75T .p75t-gtips li::before{content: \"\";position: absolute;left: 0;top: 12px;width: 5px;height: 5px;border-radius: 50%;background: var(--t-gold)}",
    "#p75T .p75t-hint b{color: var(--t-bright)}",
    "@container (max-width: 860px){",
    "  #p75T .p75t-gg{grid-template-columns: repeat(2, minmax(0, 1fr))}",
    "}",
    "@container (max-width: 560px){",
    "  #p75T .p75t-gg,#p75T .p75t-gk{grid-template-columns: minmax(0, 1fr)}",
    "  #p75T .p75t-gk dl > div{grid-template-columns: 96px minmax(0, 1fr)}",
    "}",
    "@media (prefers-reduced-motion: reduce){",
    "  #p75T .p75t-caret{animation: none !important}",
    "}"
  ].join('\n');
  // Under the scoped rules: the site builder's own element styles (h2, p, table, a, button, input) don't reach in
  var RESET = [
    '#p75T{position:relative;z-index:2147483000;text-align:left;line-height:normal;letter-spacing:normal;text-transform:none}',
    '#p75T h2,#p75T h3,#p75T p,#p75T ul,#p75T li,#p75T dl,#p75T dt,#p75T dd,#p75T table,#p75T th,#p75T td,#p75T form,#p75T label{margin:0;padding:0;border:0;background:none;text-transform:none;letter-spacing:normal;line-height:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;color:inherit;box-shadow:none}',
    '#p75T li::before,#p75T li::after{content:none}',
    '#p75T kbd{font:inherit;box-shadow:none}',
    '#p75T a{color:inherit;text-decoration:none;box-shadow:none;background-image:none}',
    '#p75T button,#p75T input{margin:0;box-shadow:none;text-shadow:none;width:auto;min-width:0;height:auto;line-height:normal;text-transform:none;letter-spacing:normal;transition:none}',
    '#p75T input{border-radius:0;outline:none}',
    '#p75T :focus-visible{outline:2px solid #FFD23F;outline-offset:2px}',
    '#p75T .p75t-field input:focus-visible{outline:none}'
  ].join('\n');
  function head() {
    if (!document.getElementById('p75T-font')) { var l = document.createElement('link'); l.id = 'p75T-font'; l.rel = 'stylesheet'; l.href = GEIST; document.head.appendChild(l); }
    if (!document.getElementById('p75T-css')) { var st = document.createElement('style'); st.id = 'p75T-css'; st.textContent = RESET + '\n' + CSS; document.head.appendChild(st); }
  }

  /* ---------- rendering an answer (point75-tools answer-view.tsx) ---------- */
  function lockHTML(a) {
    var cmd = a.command || a.input || '';
    return '<div class="p75t-lock"><span class="p75t-k">Members only</span>' +
      '<p class="p75t-lock-h">' + esc(a.lockLine) + '</p><div class="p75t-lock-a">' +
      '<a class="p75t-btn" href="' + TOOLS + '/join">Request access</a>' +
      '<span class="p75t-lock-p"><b>' + PRICE + '</b> a month for founding members</span>' +
      '<a class="p75t-lnk" href="' + esc(TOOLS + '/terminal?q=' + encodeURIComponent(cmd)) + '">Members: open in the full terminal ›</a>' +
      '</div></div>';
  }
  function tableHTML(a) {
    var cols = Array.isArray(a.columns) ? a.columns : [], rows = Array.isArray(a.rows) ? a.rows : [];
    var stack = cols.length > 3 || a.kind === 'help';
    var h = '<div class="p75t-tbl' + (stack ? ' stack' : '') + (a.kind === 'help' ? ' help' : '') + '"><table>';
    if (cols.length) h += '<thead><tr>' + cols.map(function (c) { return '<th scope="col">' + (c ? esc(c) : '<span class="sr">Measure</span>') + '</th>'; }).join('') + '</tr></thead>';
    h += '<tbody>' + rows.map(function (r) {
      var href = abs(r.href), label = esc(r.label);
      var th = r.run ? '<button type="button" class="p75t-run" data-run="' + esc(r.run) + '">' + label + '</button>'
        : href ? '<a class="p75t-run" href="' + esc(href) + '">' + label + '</a>' : label;
      return '<tr><th scope="row">' + th + '</th>' + (r.values || []).map(function (v, i) {
        var col = cols[i + 1];
        return '<td' + (col ? ' data-col="' + esc(col) + '"' : '') + toneStyle(v && v.tone) + '>' + esc(v && v.value) + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    return h;
  }
  function answerHTML(a) {
    var parts = String(a.title || '').split(' · '), name = parts.shift(), rest = parts.join(' · ');
    var echo = a.input && a.echo ? a.echo : (a.input || a.command || '');
    var em = String(echo).split(' → ');
    var isPage = a.kind === 'page' || a.kind === 'link';
    var href = abs(a.href);
    var cells = Array.isArray(a.cells) ? a.cells : [];
    var sugg = Array.isArray(a.suggestions) ? a.suggestions : [];
    var h = '<div class="p75t-ans">';
    if (echo) h += '<p class="p75t-echo"><span class="p75t-pr" aria-hidden="true">›</span><span class="p75t-said">' + esc(em[0]) + '</span>' +
      (em[1] ? '<span class="p75t-meant">→ ' + esc(em[1]) + '</span>' : '') + '</p>';
    h += '<div class="p75t-head"><h2 class="p75t-title">' + esc(name) + '</h2>' + (rest ? '<span class="p75t-code">' + esc(rest) + '</span>' : '') +
      (a.badge && TONE[a.badge.tone] ? '<span class="p75t-pill" style="background:' + TONE[a.badge.tone] + '">' + esc(a.badge.value) + '</span>' : '') + '</div>';
    if (a.sub && !isPage) h += '<p class="p75t-sub">' + esc(a.sub) + '</p>';
    if (cells.length) {
      var n3 = cells.length === 3 && cells.every(function (c) { return String(c.value).length <= 6; });
      h += '<div class="p75t-cells' + (cells.length <= 3 ? ' few' : '') + (n3 ? ' n3' : '') + '">' + cells.map(function (c) {
        return '<div class="p75t-cell"><span class="p75t-k">' + esc(c.label) + '</span><b' + toneStyle(c.tone) + '>' + esc(c.value) + '</b>' +
          (c.sub ? '<span class="p75t-cs">' + esc(c.sub) + '</span>' : '') + '</div>';
      }).join('') + '</div>';
    }
    if (a.locked && a.lockLine) h += lockHTML(a);
    if (a.rows && a.rows.length) h += tableHTML(a);
    if (isPage && href) {
      h += '<div class="p75t-nav"><span class="p75t-k">' + (a.kind === 'link' ? 'On point75.io' : 'Opens') + '</span>' +
        '<p class="p75t-nav-t">' + esc(a.sub) + '</p><a class="p75t-btn" href="' + esc(href) + '">' +
        (a.kind === 'link' ? 'Open on point75.io' : 'Go to ' + esc(name)) + ' <span aria-hidden="true">›</span></a></div>';
    }
    if (sugg.length || (href && !isPage)) {
      var onSite = href && href.indexOf(SITE) === 0;
      h += '<div class="p75t-chips">' + sugg.map(function (s) {
        return '<button type="button" class="p75t-chip" title="' + esc(s.help) + '" data-run="' + esc(s.code) + '">' + esc(s.code) + '</button>';
      }).join('') + (href && !isPage ? '<a class="p75t-open" href="' + esc(href) + '">' + (onSite ? 'Open the page' : 'Open on tools.point75.io') + ' <span aria-hidden="true">›</span></a>' : '') + '</div>';
    }
    return h + '</div>';
  }

  /* ---------- 10Y, 2Y, 2s10s and PULSE, answered here ---------- */
  var editions = null, pulse = null;
  function bp(n) { return (n > 0 ? '+' : n < 0 ? '−' : '') + Math.abs(n) + 'bp'; }
  /** Yields falling is good for bond prices: blue down, red up (as on the home page's readings). */
  function moveTone(n) { return n < 0 ? 'good' : n > 0 ? 'bad' : 'neutral'; }
  function localSugg(codes) { return codes.map(function (c) { return S(c, HELP[c] || ''); }); }
  function yieldAnswer(code, input, echo) {
    var url = 'https://tools.point75.io/api/v1/intelsummary';
    var p = editions || (editions = getJSON(url).catch(function (e) { editions = null; throw e; }));
    return p.then(function (j) {
      var e = j && j.data && j.data.latest;
      var key = code === '2S10S' ? '2s10s' : code;
      var t = e && Array.isArray(e.tape) && e.tape.filter(function (x) { return x && String(x.k).toUpperCase() === key.toUpperCase(); })[0];
      if (!t || typeof t.level !== 'number') throw new Error('no reading');
      var isBp = t.unit === 'bp', meta = LOCAL[code];
      var cells = [{ label: isBp ? 'Spread' : 'Yield', value: isBp ? Math.round(t.level) + 'bp' : t.level.toFixed(2) + '%', tone: 'gold',
        sub: isBp ? (t.level < 0 ? '10-year below the 2-year: inverted' : '10-year above the 2-year') : (e.edition === 'close' ? 'At the close' : 'Latest reading') }];
      // For the curve, a wider gap is steepening rather than good or bad: leave its changes plain
      if (typeof t.d === 'number') cells.push({ label: 'Day', value: bp(t.d), tone: isBp ? 'neutral' : moveTone(t.d), sub: 'Change on the day' });
      if (typeof t.w === 'number') cells.push({ label: 'Week', value: bp(t.w), tone: isBp ? 'neutral' : moveTone(t.w), sub: 'Change on the week' });
      return {
        input: input, command: code, echo: echo, kind: 'yield', title: meta.title + ' · ' + code,
        sub: typeof e.title === 'string' ? e.title : '', cells: cells, href: meta.href,
        suggestions: localSugg(meta.next), asOf: e.market_date
      };
    });
  }
  function pulseAnswer(input, echo) {
    var p = pulse || (pulse = getJSON(PULSE_API).catch(function (e) { pulse = null; throw e; }));
    return p.then(function (j) {
      var g = (j && j.gauges) || {}, b = g.bull || {}, s = g.stress || {};
      if (typeof b.score !== 'number' && typeof s.score !== 'number') throw new Error('no reading');
      var cells = [];
      if (typeof b.score === 'number') cells.push({ label: 'Bull / Bear', value: (b.score > 0 ? '+' : b.score < 0 ? '\u2212' : '') + Math.abs(Math.round(b.score)),
        tone: b.score >= 20 ? 'good' : b.score <= -20 ? 'bad' : 'neutral', sub: (b.label ? b.label + '. ' : '') + '−100 bearish to +100 bullish for bonds' });
      if (typeof s.score === 'number') {
        var sc = Math.round(s.score), word = sc < 30 ? 'Calm' : sc < 55 ? 'Moderate' : sc < 75 ? 'Elevated' : 'High';
        cells.push({ label: 'Stress', value: sc + '/100', tone: sc < 30 ? 'good' : sc < 55 ? 'neutral' : sc < 75 ? 'warn' : 'bad', sub: (s.label || word) + '. 0 is calm, 100 is panic' });
      }
      var d = j.generated_at ? new Date(j.generated_at) : null;
      return {
        input: input, command: 'PULSE', echo: echo, kind: 'pulse', title: 'Pulse · PULSE',
        sub: 'The bond market’s vital signs, from auctions, futures positioning, dealers, funding and rate swings.',
        cells: cells, href: LOCAL.PULSE.href, suggestions: localSugg(LOCAL.PULSE.next),
        asOf: d && !isNaN(d) ? d.toISOString().slice(0, 10) : undefined
      };
    });
  }
  function localAnswer(code, input, echo) { return code === 'PULSE' ? pulseAnswer(input, echo) : yieldAnswer(code, input, echo); }
  /** The plain codes go straight here, without asking tools.point75.io ("2s10s", "10y", "pulse"). */
  function localCode(text) { var c = text.toUpperCase().replace(/[\s/-]+/g, ''); return LOCAL[c] ? c : null; }

  /* ---------- the terminal ---------- */
  var root = null, st = null;

  function markup() {
    return '<div class="p75t-scrim"><div class="p75t-dlg" role="dialog" aria-modal="true" aria-label="Point75 Terminal">' +
      '<div class="p75t p75t-overlay">' +
      '<div class="p75t-bar"><span class="p75t-brand">Point75 Terminal</span><span class="p75t-asof" hidden></span>' +
      '<button type="button" class="p75t-help" aria-pressed="false" aria-label="How to use the Terminal"><span aria-hidden="true">?</span><i class="p75t-hl">How to use</i></button>' +
      '<span class="p75t-keys" aria-hidden="true">↵ run · ↑↓ pick · Esc close</span>' +
      '<button type="button" class="p75t-x" aria-label="Close the terminal"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button></div>' +
      '<form class="p75t-prompt" role="search"><label for="p75T-in" class="p75t-gt"><span aria-hidden="true">›</span><span class="sr">Command</span></label>' +
      '<div class="p75t-field"><input id="p75T-in" type="text" role="combobox" aria-expanded="false" aria-controls="p75T-list" aria-autocomplete="list" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="go" placeholder="NVDA, liquidity, compare microsoft and google, HELP">' +
      '<span class="p75t-mirror" aria-hidden="true"></span><span class="p75t-caret" aria-hidden="true" hidden></span></div>' +
      '<button type="button" class="p75t-go">Run</button></form>' +
      '<div class="p75t-body"><div class="p75t-list"></div><div class="p75t-out" aria-live="polite"></div></div>' +
      '<div class="p75t-foot"></div>' +
      '<div class="p75t-taps"><span class="p75t-k">Tap a command</span><div></div></div>' +
      '</div></div></div>';
  }
  function $(s) { return root.querySelector(s); }

  function typed() { return st.q.trim(); }
  function list() {
    if (typed()) return st.sugg && st.sugg.q === typed() ? st.sugg.list : (st.lastSugg || []);
    return st.answer || st.guide || st.status !== 'idle' ? [] : (st.starters || STARTERS);
  }

  function drawList() {
    var l = list(), t = typed(), el = $('.p75t-list'), input = $('input');
    if (st.active >= l.length) st.active = -1;
    var h = '';
    if (l.length) {
      h = '<div class="p75t-sugg">' + (t ? '' : '<span class="p75t-k p75t-try">Try</span>') + '<ul id="p75T-list" role="listbox" aria-label="Suggestions">' +
        l.map(function (s, i) {
          return '<li id="p75T-o' + i + '" role="option" aria-selected="' + (i === st.active) + '"' + (i === st.active ? ' class="on"' : '') + ' data-run="' + esc(s.code) + '">' +
            '<span class="p75t-sc">' + esc(s.code) + '</span><span class="p75t-sh">' + esc(s.help) + '</span>' +
            '<span class="p75t-sk">' + (s.access === 'members' && !OPEN ? 'Members' : s.kind === 'page' ? 'Page' : 'Free') + '</span></li>';
        }).join('') + '</ul></div>';
    } else if (t && st.sugg && st.sugg.q === t) {
      h = '<p class="p75t-none">Nothing starts with that. Press ↵ to try it anyway, or type HELP.</p>';
    }
    el.innerHTML = h;
    input.setAttribute('aria-expanded', l.length ? 'true' : 'false');
    if (st.active >= 0) input.setAttribute('aria-activedescendant', 'p75T-o' + st.active); else input.removeAttribute('aria-activedescendant');
    var on = el.querySelector('li.on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
    $('.p75t-out').hidden = !!t;
  }

  function drawOut() {
    var out = $('.p75t-out'), h = '';
    if (st.status === 'loading') {
      h = '<p class="p75t-echo"><span class="p75t-pr" aria-hidden="true">›</span><span class="p75t-said">' + esc(st.lastRun) + '</span><span class="p75t-meant">…</span></p>';
    } else if (st.status === 'error') {
      h = '<div class="p75t-err"><p>The terminal couldn’t reach Point75 just now for <b>' + esc(st.lastRun) + '</b>.</p>' +
        '<button type="button" class="p75t-chip" data-run="' + esc(st.lastRun) + '">Try again</button></div>';
    } else if (st.guide) h = guideHTML();
    else if (st.answer) h = answerHTML(st.answer);
    out.innerHTML = h;
    var hb = $('.p75t-help'); hb.classList.toggle('on', !!st.guide); hb.setAttribute('aria-pressed', st.guide ? 'true' : 'false');
    out.parentNode.setAttribute('aria-busy', st.status === 'loading' ? 'true' : 'false');
    var asof = $('.p75t-asof'), d = dateLabel(st.answer && st.answer.asOf);
    asof.textContent = d ? 'Data through ' + d : ''; asof.hidden = !d;
    drawFoot();
  }

  function drawFoot() {
    var r = st.recent, h = '';
    if (r.length) h += '<div class="p75t-recent"><span class="p75t-k">Recent</span>' + r.map(function (x) {
      return '<button type="button" class="p75t-rc" data-run="' + esc(x) + '">' + esc(x) + '</button>';
    }).join('') + '</div>';
    if (r.length <= 3) h += '<span class="p75t-hint">Codes or plain words: “oracle”, “compare microsoft and google” · type <b>?</b> for how to use</span>';
    $('.p75t-foot').innerHTML = h;
    // Phones: the answer's follow-ups first, then the usual commands, six in all
    var fol = ((st.answer && st.answer.suggestions) || []).slice(0, 2).map(function (s) { return s.code; });
    var taps = fol.concat(TAPS).filter(function (c, i, all) { return all.indexOf(c) === i; }).slice(0, 6);
    $('.p75t-taps > div').innerHTML = taps.map(function (c) {
      return '<button type="button" class="p75t-chip' + (fol.indexOf(c) >= 0 ? ' next' : '') + '" data-run="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');
  }

  // The gold block caret, drawn where the input's own (hidden) caret is; steady under reduced motion (CSS)
  function caret() {
    if (!root) return;
    var input = $('input'), m = $('.p75t-mirror'), c = $('.p75t-caret');
    if (document.activeElement !== input || input.selectionStart !== input.selectionEnd) { c.hidden = true; return; }
    m.textContent = input.value.slice(0, input.selectionStart == null ? input.value.length : input.selectionStart);
    c.style.left = (m.offsetWidth - input.scrollLeft) + 'px';
    c.hidden = false;
  }
  var caretFrame = 0;
  function caretSoon() { cancelAnimationFrame(caretFrame); caretFrame = requestAnimationFrame(caret); }

  // Autocomplete from the answer service, debounced; answers for each prompt are kept for the visit
  var suggCache = {}, suggTimer = 0;
  function fetchSugg(q, delay) {
    clearTimeout(suggTimer);
    if (suggCache.hasOwnProperty(q)) { st.sugg = { q: q, list: suggCache[q] }; st.lastSugg = suggCache[q]; drawList(); return; }
    suggTimer = setTimeout(function () {
      getJSON(API + '?mode=suggest&q=' + encodeURIComponent(q)).then(function (j) {
        var l = (j && j.data && Array.isArray(j.data.suggestions)) ? j.data.suggestions.filter(function (s) { return s && typeof s.code === 'string'; }) : [];
        suggCache[q] = l;
        if (!st) return;
        if (q === '') { st.starters = l.length ? l : null; if (!typed()) drawList(); return; }
        if (typed() === q) { st.sugg = { q: q, list: l }; st.lastSugg = l; drawList(); }
      }).catch(function () { /* offline: Enter still runs what was typed */ });
    }, delay == null ? 140 : delay);
  }

  function remember(said) {
    st.recent = [said].concat(st.recent.filter(function (x) { return x.toUpperCase() !== said.toUpperCase(); })).slice(0, MAX_RECENT);
    writeRecent(st.recent);
  }

  function run(text) {
    var input = String(text || '').trim(); if (!input || !st) return;
    if (st.ctl) st.ctl.abort();
    st.guide = false;
    if (GUIDE_WORDS.indexOf(input.toLowerCase()) >= 0) {   // ? or GUIDE: the how-to, no request
      st.seq++; st.q = ''; $('input').value = ''; st.active = -1; st.status = 'idle'; st.guide = true;
      drawList(); drawOut(); $('.p75t-body').scrollTop = 0; caretSoon(); return;
    }
    var ctl = window.AbortController ? new AbortController() : null; st.ctl = ctl;
    var my = ++st.seq;
    st.q = ''; $('input').value = ''; st.active = -1; st.lastRun = input; st.status = 'loading';
    drawList(); drawOut(); caretSoon();
    var done = function (a) {
      if (!st || my !== st.seq) return;
      st.answer = a; st.status = 'idle';
      if (a.kind !== 'unknown') remember(a.fallback && a.command ? a.command : input);
      drawOut(); drawList();
      $('.p75t-body').scrollTop = 0;
      var href = abs(a.href);
      if (a.kind === 'page' && href) { close(false); location.assign(href); }
    };
    var fail = function (err) {
      if (!st || my !== st.seq || (err && err.name === 'AbortError')) return;
      st.status = 'error'; drawOut();
    };
    var code = localCode(input);
    if (code) { localAnswer(code, input, null).then(done, function () { ask(); }); return; }
    ask();
    function ask() {
      getJSON(API + '?q=' + encodeURIComponent(input), ctl && ctl.signal).then(function (j) {
        var a = j && j.data;
        if (!a || typeof a !== 'object') throw new Error('no answer');
        // "ten year", "yield curve", "vital signs": the service says what was meant, the figures come from here
        if (a.kind === 'link' && a.command && LOCAL[a.command]) return localAnswer(a.command, input, a.echo).catch(function () { return a; });
        return a;
      }).then(done, fail);
    }
  }

  function close(refocus) {
    if (!root) return;
    if (st && st.ctl) st.ctl.abort();
    clearTimeout(suggTimer);
    document.removeEventListener('focusin', st.onFocusIn);
    document.removeEventListener('selectionchange', caretSoon);
    window.removeEventListener('resize', caretSoon);
    document.documentElement.style.overflow = st.wasOverflow;
    var back = st.back;
    root.remove(); root = null; st = null;
    if (refocus === false) return;
    var to = back && back.isConnected && back !== document.body ? back : document.getElementById('menuBtn');
    if (to) requestAnimationFrame(function () { try { to.focus({ preventScroll: true }); } catch (e) { to.focus(); } });
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function open(opts) {
    opts = opts || {};
    if (root) { $('input').focus(); if (opts.q) run(opts.q); return; }
    head();
    root = document.createElement('div'); root.id = 'p75T';
    root.innerHTML = markup();
    document.body.appendChild(root);
    st = {
      q: '', active: -1, answer: null, status: 'idle', lastRun: '', recent: readRecent(), seq: 0, ctl: null,
      sugg: null, lastSugg: null, starters: suggCache[''] && suggCache[''].length ? suggCache[''] : null,
      back: opts.returnTo || document.activeElement, wasOverflow: document.documentElement.style.overflow
    };
    document.documentElement.style.overflow = 'hidden';
    var input = $('input'), dlg = $('.p75t-dlg');

    input.addEventListener('input', function () {
      st.q = input.value; st.active = -1;
      var t = typed(); if (t) fetchSugg(t); drawList(); caretSoon();
    });
    input.addEventListener('keydown', function (e) {
      var l = list(), n = l.length;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!n) return; e.preventDefault();
        st.active = e.key === 'ArrowDown' ? (st.active + 1) % n : st.active <= 0 ? n - 1 : st.active - 1;
        drawList();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (st.active >= 0 && l[st.active]) run(l[st.active].code); else if (typed()) run(typed());
      } else if (e.key === 'Escape') {
        e.preventDefault(); e.stopPropagation();
        if (st.q) { st.q = ''; input.value = ''; st.active = -1; drawList(); caretSoon(); } else close();
      }
    });
    ['focus', 'blur', 'scroll', 'click', 'keyup'].forEach(function (ev) { input.addEventListener(ev, caretSoon); });
    document.addEventListener('selectionchange', caretSoon);
    window.addEventListener('resize', caretSoon);
    root.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); });
    $('.p75t-go').addEventListener('click', function () {
      var l = list(); if (st.active >= 0 && l[st.active]) run(l[st.active].code); else if (typed()) run(typed());
      input.focus();
    });
    $('.p75t-x').addEventListener('click', function () { close(); });
    $('.p75t-help').addEventListener('click', function () {
      st.guide = !st.guide; st.q = ''; input.value = ''; st.active = -1;
      if (st.guide) { if (st.ctl) st.ctl.abort(); st.seq++; st.status = 'idle'; $('.p75t-body').scrollTop = 0; }
      drawList(); drawOut(); input.focus();
    });
    // Any command button (suggestion, chip, recent, table row, tap row) runs its command
    root.addEventListener('mousedown', function (e) { if (e.target.closest && e.target.closest('li[data-run]')) e.preventDefault(); });
    root.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-run]');
      if (b && root.contains(b)) { run(b.getAttribute('data-run')); try { input.focus({ preventScroll: true }); } catch (x) { input.focus(); } return; }
      var a = e.target.closest && e.target.closest('a[href]');
      if (a && root.contains(a)) close(false);   // leaving for another page
    });
    $('.p75t-scrim').addEventListener('mousedown', function (e) { if (e.target === e.currentTarget) close(); });
    // A modal dialog: Tab stays inside, Esc closes, focus that wanders out comes back to the prompt
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var items = [].slice.call(dlg.querySelectorAll(FOCUSABLE)).filter(function (el) { return el.offsetParent !== null; });
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    st.onFocusIn = function (e) { if (root && !root.contains(e.target)) input.focus(); };
    document.addEventListener('focusin', st.onFocusIn);

    drawList(); drawOut();
    if (!st.starters) fetchSugg('', 0);
    input.focus({ preventScroll: true });
    caretSoon();
    if (opts.q) run(opts.q);
  }

  // "/" anywhere outside a field, Ctrl+K or ⌘K; Ctrl+K again closes it
  window.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.isComposing) return;
    var isK = (e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key || '').toLowerCase() === 'k';
    var isSlash = e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey;
    if (!isK && !isSlash) return;
    if (root) { if (isK) { e.preventDefault(); close(); } return; }
    if (isSlash && typing(e.target)) return;
    e.preventDefault();
    open();
  });
  // The same open event as tools.point75.io, for any button that wants to open it
  window.addEventListener('p75:terminal-open', function (e) { open((e && e.detail) || {}); });

  window.P75TERM = { open: open, close: close };
})();
