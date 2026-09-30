/* Point75 site search. Loaded on every page by p75.js. Index: search/index.json (built by tools/build_search.py).
   Adds a "Search" button to the header (and to the top of the mobile menu); "/" also opens it. Nothing opens on its own.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75SEARCH) return;
  var INDEX = 'https://rahulmsaxena.github.io/point75-site/search/index.json?v=' + Math.floor(Date.now() / 36e5);
  var ORDER = ['Dictionary', 'Guide', 'Data', 'Company', 'Essay', 'Page'];
  var LABEL = { Dictionary: 'Bond Dictionary', Guide: 'Education guides', Data: 'Data pages', Company: 'Companies on Sector Credit', Essay: 'Essays', Page: 'Pages' };
  var ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>';

  var CSS =
    '.p75s-btn{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 14px;border-radius:19px;border:1px solid rgba(201,162,39,.7);background:rgba(201,162,39,.08);color:#EDE8DC;font:600 14px Manrope,system-ui,sans-serif;cursor:pointer;white-space:nowrap}' +
    '.p75s-btn svg{color:#C9A227}.p75s-btn:hover{background:rgba(201,162,39,.18)}.p75s-btn kbd{font:500 11.5px Manrope,sans-serif;color:#8d887e;border:1px solid #3a3b40;border-radius:5px;padding:0 5px}' +
    '.p75s-li{display:flex;align-items:center;margin-left:8px;list-style:none}' +
    '.p75s-mob{list-style:none;padding:14px 0 6px}.p75s-mob .p75s-btn{width:100%;justify-content:center;height:46px;font-size:16px}.p75s-mob kbd{display:none}' +
    '.p75s-ov{position:fixed;inset:0;z-index:99999;background:rgba(8,9,10,.6);display:flex;justify-content:center;align-items:flex-start;padding:10vh 16px 16px;font-family:Manrope,system-ui,sans-serif}' +
    '.p75s-box{width:100%;max-width:700px;max-height:78vh;display:flex;flex-direction:column;background:#17181B;border:1px solid #3a3b40;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.55);overflow:hidden;color:#EDE8DC}' +
    '.p75s-in{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid #2A2B2F}.p75s-in svg{color:#C9A227;width:20px;height:20px;flex:none}' +
    '.p75s-in input{flex:1;min-width:0;border:0;outline:none;background:transparent;color:#EDE8DC;font:600 19px Manrope,sans-serif}.p75s-in input::-webkit-search-cancel-button{display:none;-webkit-appearance:none}.p75s-in input::placeholder{color:#8d887e;font-weight:500}' +
    '.p75s-x{border:1px solid #3a3b40;background:none;color:#C2BCAF;border-radius:6px;font:600 12px Manrope,sans-serif;padding:3px 8px;cursor:pointer}' +
    '.p75s-res{overflow-y:auto;padding:8px 10px 12px}.p75s-g{padding:10px 10px 4px;font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8d887e}' +
    '.p75s-r{display:block;padding:11px 12px;border-radius:10px;border:1px solid transparent;text-decoration:none!important;color:#EDE8DC!important}' +
    '.p75s-r b{display:block;font-size:15.5px;font-weight:700}.p75s-r span{display:block;font-size:13.5px;line-height:1.5;color:#C2BCAF;margin-top:2px}' +
    '.p75s-r mark{background:none;color:#C9A227}.p75s-r.on{background:#221e12;border-color:rgba(201,162,39,.45)}' +
    '.p75s-empty{padding:22px 14px;color:#C2BCAF;font-size:14.5px;line-height:1.6}.p75s-empty a{color:#C9A227}' +
    '.p75s-ft{padding:9px 20px;border-top:1px solid #2A2B2F;font-size:12px;color:#8d887e;display:flex;gap:16px;flex-wrap:wrap}' +
    '@media (max-width:640px){.p75s-ov{padding:0}.p75s-box{max-width:none;max-height:none;height:100%;border-radius:0;border:0}.p75s-ft{display:none}}';

  function once() {
    if (document.getElementById('p75s-css')) return;
    var st = document.createElement('style'); st.id = 'p75s-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ''); }

  // ---------- index ----------
  var docs = null, loading = null;
  function load() {
    if (docs) return Promise.resolve(docs);
    if (loading) return loading;
    loading = fetch(INDEX).then(function (r) { return r.json(); }).then(function (j) {
      docs = (j.docs || []).map(function (d) {
        d._t = norm(d.title); d._k = norm(d.keys); d._d = norm(d.desc); d._b = norm(d.body); return d;
      });
      return docs;
    }).catch(function () { loading = null; return null; });
    return loading;
  }

  // Score: every word must appear somewhere; title and exact-word hits count most.
  function search(q) {
    var words = norm(q).split(/[^a-z0-9$%.]+/).filter(function (w) { return w.length > 0; });
    if (!words.length) return [];
    var out = [];
    docs.forEach(function (d) {
      var score = 0;
      for (var i = 0; i < words.length; i++) {
        var w = words[i], re = new RegExp('(^|[^a-z0-9])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        var s = 0;
        if (d._t === w) s = 30; else if (re.test(d._t)) s = 12; else if (d._t.indexOf(w) > -1) s = 6;
        if (re.test(d._k)) s = Math.max(s, 8);
        if (!s && re.test(d._d)) s = 4;
        if (!s && re.test(d._b)) s = 2;
        if (!s && w.length > 3 && (d._d.indexOf(w) > -1 || d._b.indexOf(w) > -1)) s = 1;
        if (!s) return;
        score += s;
      }
      if (d._t.indexOf(norm(q).trim()) === 0) score += 10;
      out.push({ d: d, s: score });
    });
    out.sort(function (a, b) { return b.s - a.s || ORDER.indexOf(a.d.type) - ORDER.indexOf(b.d.type); });
    // Keep the best matches, then group them by type (groups ordered by their best match)
    var top = out.slice(0, 12).map(function (x) { return x.d; }), groups = [];
    top.forEach(function (d) { if (groups.indexOf(d.type) < 0) groups.push(d.type); });
    return groups.reduce(function (acc, g) { return acc.concat(top.filter(function (d) { return d.type === g; })); }, []);
  }

  function mark(text, q) {
    var t = esc(text), words = norm(q).split(/[^a-z0-9]+/).filter(function (w) { return w.length > 1; });
    words.forEach(function (w) { t = t.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return t;
  }
  function snippet(d, q) {
    var src = d.desc || d.body || '', w = norm(q).split(/\s+/)[0] || '', i = norm(src).indexOf(w);
    if (src.length <= 170) return src;
    if (i < 60) return src.slice(0, 165).replace(/\s+\S*$/, '') + '…';
    return '…' + src.slice(i - 50, i + 115).replace(/^\S*\s+/, '').replace(/\s+\S*$/, '') + '…';
  }

  // ---------- overlay ----------
  var ov = null, sel = 0, results = [], lastFocus = null;
  function open() {
    if (ov) return;
    once(); lastFocus = document.activeElement;
    ov = document.createElement('div'); ov.className = 'p75s-ov';
    ov.innerHTML = '<div class="p75s-box" role="dialog" aria-modal="true" aria-label="Search Point75">' +
      '<label class="p75s-in">' + ICON + '<input type="search" placeholder="Search essays, guides, terms and data…" aria-label="Search Point75" autocomplete="off"><button type="button" class="p75s-x" aria-label="Close search">Esc</button></label>' +
      '<div class="p75s-res" role="listbox"><div class="p75s-empty">Try “duration”, “yield curve”, “Oracle” or “private credit”.</div></div>' +
      '<div class="p75s-ft"><span>↑↓ to move</span><span>Enter to open</span><span>Esc to close</span></div></div>';
    document.body.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    var input = ov.querySelector('input');
    input.focus();
    load().then(function () { if (input.value) run(input.value); });
    input.addEventListener('input', function () { run(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); move(e.key === 'ArrowDown' ? 1 : -1); }
      else if (e.key === 'Enter' && results[sel]) { e.preventDefault(); location.href = results[sel].url; }
    });
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target.closest('.p75s-x')) close(); });
    ov.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  function close() {
    if (!ov) return;
    ov.remove(); ov = null; document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function move(k) {
    if (!results.length) return;
    sel = (sel + k + results.length) % results.length;
    var items = ov.querySelectorAll('.p75s-r');
    items.forEach(function (a, i) { a.classList.toggle('on', i === sel); a.setAttribute('aria-selected', i === sel); });
    if (items[sel]) items[sel].scrollIntoView({ block: 'nearest' });
  }
  function run(q) {
    var box = ov && ov.querySelector('.p75s-res'); if (!box) return;
    if (!docs) { box.innerHTML = '<div class="p75s-empty">Loading…</div>'; return; }
    if (!q.trim()) { results = []; box.innerHTML = '<div class="p75s-empty">Try “duration”, “yield curve”, “Oracle” or “private credit”.</div>'; return; }
    results = search(q); sel = 0;
    if (!results.length) {
      box.innerHTML = '<div class="p75s-empty">Nothing matches “' + esc(q) + '”. Try a shorter word, or browse the <a href="/bond-dictionary">Bond Dictionary</a> and <a href="/education">Education</a> guides.</div>';
      return;
    }
    var h = '', group = '';
    results.forEach(function (d, i) {
      if (d.type !== group) { group = d.type; h += '<div class="p75s-g">' + esc(LABEL[group] || group) + '</div>'; }
      h += '<a class="p75s-r' + (i === 0 ? ' on' : '') + '" role="option" aria-selected="' + (i === 0) + '" href="' + esc(d.url) + '"><b>' + mark(d.title, q) + '</b>' +
        (snippet(d, q) ? '<span>' + mark(snippet(d, q), q) + '</span>' : '') + '</a>';
    });
    box.innerHTML = h;
  }

  // ---------- entry points ----------
  function button(cls) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'p75s-btn'; b.setAttribute('aria-label', 'Search Point75');
    b.innerHTML = ICON + 'Search' + (cls ? '' : ' <kbd>/</kbd>');
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(); });
    return b;
  }
  function mount() {
    once();
    // Desktop header: after the last menu item
    document.querySelectorAll('.block-header__nav-links').forEach(function (ul) {
      var mobile = !!ul.closest('.block-header-layout-mobile');
      if (ul.querySelector(mobile ? '.p75s-mob' : '.p75s-li')) return;
      var li = document.createElement('li');
      li.className = mobile ? 'p75s-mob' : 'p75s-li';
      li.appendChild(button(mobile));
      if (mobile) ul.insertBefore(li, ul.firstChild); else ul.appendChild(li);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || ov) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    e.preventDefault(); open();
  });

  window.P75SEARCH = { mount: mount, open: open, close: close };
})();
