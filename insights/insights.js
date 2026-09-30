/* Point75 - Insights page (/insights): what leading bond investors and the Fed are saying, with dated
   sources, and what households can do. Content lives in insights/insights.json so it can be refreshed
   without touching code. Loaded by p75.js. (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75INS) return;
  var DATA = 'https://rahulmsaxena.github.io/point75-site/insights/insights.json?v=' + Math.floor(Date.now() / 36e5);

  var CSS =
    '.p75ins{--ink:#111214;--panel:#17181B;--panel2:#1C1D21;--line:#2A2B2F;--cream:#EDE8DC;--soft:#E4DED1;--muted:#B8B2A5;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75ins *{box-sizing:border-box}' +
    '.p75ins .wrap{max-width:900px;margin:0 auto;padding:40px 20px 72px}' +
    '.p75ins .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75ins h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:38px;line-height:1.12;margin:8px 0 8px;text-wrap:balance}' +
    '.p75ins .asof{font-size:12.5px;color:var(--muted)}.p75ins .asof b{color:var(--cream);font-weight:600}' +
    '.p75ins figure{margin:22px 0 0}' +
    '.p75ins figure img{display:block;width:100%;height:auto;border-radius:14px;border:1px solid var(--line)}' +
    '.p75ins figcaption{font-size:12.5px;color:var(--muted);margin-top:8px;line-height:1.5}' +
    '.p75ins h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;margin:44px 0 12px}' +
    '.p75ins .mood{display:inline-block;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);border:1px solid var(--gold);border-radius:99px;padding:4px 12px;margin-bottom:12px}' +
    '.p75ins .big p{font-size:16.5px;line-height:1.7;color:var(--soft);margin:0 0 12px;max-width:68ch}' +
    '.p75ins .ad{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}' +
    '.p75ins .adbox{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px 18px}' +
    '.p75ins .adbox h3{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin:0 0 8px}' +
    '.p75ins .adbox ul{margin:0;padding-left:18px}.p75ins .adbox li{font-size:15px;line-height:1.55;color:var(--soft);margin:4px 0}' +
    '.p75ins .adbox li small{display:block;color:var(--muted);font-size:13px}' +
    '.p75ins .voices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}' +
    '.p75ins .v{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px;display:flex;flex-direction:column;gap:10px}' +
    '.p75ins .v:last-child:nth-child(odd){grid-column:1/-1}' +
    '.p75ins .vh{display:flex;align-items:center;gap:12px}' +
    '.p75ins .av{flex:0 0 auto;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:15px;color:#111214;background:var(--gold)}' +
    '.p75ins .vn{font-weight:800;font-size:17px;color:#fff;line-height:1.2}.p75ins .vr{font-size:13px;color:var(--muted)}' +
    '.p75ins .th{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:20px;color:var(--cream)}' +
    '.p75ins .when{font-size:12.5px;font-weight:700;color:var(--gold);letter-spacing:.02em}.p75ins .when span{color:var(--muted);font-weight:500}' +
    '.p75ins .v ul{margin:0;padding-left:18px}.p75ins .v li{font-size:14.5px;line-height:1.6;color:var(--soft);margin:5px 0}' +
    '.p75ins blockquote{margin:2px 0 0;padding:10px 14px;border-left:3px solid var(--gold);background:var(--ink);border-radius:0;font-family:"Hedvig Letters Serif",Georgia,serif;font-size:16.5px;line-height:1.45;color:#fff}' +
    '.p75ins .src{font-size:12.5px;color:var(--muted);line-height:1.6}.p75ins .src a{color:var(--gold);text-decoration:none}.p75ins .src a:hover{text-decoration:underline}' +
    '.p75ins .acts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}' +
    '.p75ins .act{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px 18px;display:grid;grid-template-columns:30px 1fr;gap:12px}' +
    '.p75ins .act .n{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--gold);color:var(--gold);display:grid;place-items:center;font-weight:800;font-size:13px}' +
    '.p75ins .act h3{font-size:16px;font-weight:800;color:#fff;margin:3px 0 4px}.p75ins .act p{font-size:14.5px;line-height:1.6;color:var(--soft);margin:0}' +
    '.p75ins .act a{color:var(--gold)}' +
    '.p75ins .note{margin-top:34px;color:var(--muted);font-size:12.5px;line-height:1.6;border-top:1px solid var(--line);padding-top:16px}' +
    '.p75ins .load{color:var(--muted);margin-top:24px}' +
    '.p75ins .fw{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px}' +
    '.p75ins .fw .sub{font-size:15px;line-height:1.55;color:var(--soft);margin:-4px 0 14px;max-width:68ch}' +
    '.p75ins .fwm{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:center}' +
    '.p75ins .fwt{position:relative;height:10px;border-radius:5px;background:linear-gradient(90deg,#3D8BFF,#3a3b40 50%,#E5484D)}' +
    '.p75ins .fwt i{position:absolute;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#fff;border:3px solid #17181B;box-shadow:0 0 0 2px #fff}' +
    '.p75ins .fwl{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:8px}' +
    '.p75ins .fwv{text-align:right}.p75ins .fwv b{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:26px;color:#fff}.p75ins .fwv span{font-size:12.5px;color:var(--muted)}' +
    '.p75ins .fwp{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 4px}' +
    '.p75ins .fwp span{font-size:13px;color:var(--soft);border:1px solid var(--line);border-radius:99px;padding:4px 11px}.p75ins .fwp b{color:#fff}' +
    '.p75ins .fws{margin-top:10px}' +
    '.p75ins .fwr{border-top:1px solid var(--line);padding:12px 0}' +
    '.p75ins .fwr .h{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px;color:var(--muted)}.p75ins .fwr .h b{color:#fff;font-size:14.5px}' +
    '.p75ins .fwr .h em{font-style:normal;font-weight:700;font-size:12px;padding:1px 9px;border-radius:99px;border:1px solid var(--line);color:var(--soft)}' +
    '.p75ins .fwr p{margin:6px 0 0;font-size:14.5px;line-height:1.55;color:var(--soft)}' +
    '.p75ins .fwr q{display:block;margin-top:6px;font-family:"Hedvig Letters Serif",Georgia,serif;font-size:15px;color:#fff;quotes:"\\201C" "\\201D"}' +
    '.p75ins .fwr a{color:var(--gold);text-decoration:none;font-size:12.5px;font-weight:700}' +
    '@media (max-width:560px){.p75ins .fwm{grid-template-columns:1fr}.p75ins .fwv{text-align:left}}' +
    '@media (max-width:720px){.p75ins .voices,.p75ins .acts,.p75ins .ad{grid-template-columns:1fr}}' +
    '@media (max-width:560px){.p75ins .wrap{padding:28px 16px 56px}.p75ins h1{font-size:30px}.p75ins h2{font-size:24px}}';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function once() { if (document.getElementById('p75ins-css')) return; var st = document.createElement('style'); st.id = 'p75ins-css'; st.textContent = CSS; document.head.appendChild(st); }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmt(iso) { var p = iso.split('-'); return MON[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0]; }

  function page(d) {
    var h = '<div class="wrap"><div class="eyebrow">Insights</div><h1>' + esc(d.headline) + '</h1>' +
      '<div class="asof">Updated <b>' + fmt(d.updated) + '</b> · comments from ' + esc(d.window) + '</div>';
    if (d.hero && d.hero.src) h += '<figure><img src="' + esc(d.hero.src) + '" srcset="' + esc(d.hero.small) + ' 704w, ' + esc(d.hero.src) + ' 1408w" sizes="(max-width: 900px) 100vw, 860px" alt="' + esc(d.hero.alt) + '" loading="eager">' +
      (d.hero.caption ? '<figcaption>' + esc(d.hero.caption) + '</figcaption>' : '') + '</figure>';
    h += '<h2>The big picture</h2><div class="big"><div class="mood">Mood: ' + esc(d.mood) + '</div>' + d.bigPicture.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '<div class="ad"><div class="adbox"><h3>Where they agree</h3><ul>' + d.agree.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="adbox"><h3>Where they differ</h3><ul>' + d.differ.map(function (a) { return '<li>' + esc(a[0]) + '<small>' + esc(a[1]) + '</small></li>'; }).join('') + '</ul></div></div></div>';
    h += '<h2>What they’re saying</h2><div class="voices">' + d.voices.map(function (v) {
      return '<article class="v"><div class="vh"><div class="av" aria-hidden="true">' + esc(v.initials) + '</div><div><div class="vn">' + esc(v.name) + '</div><div class="vr">' + esc(v.role) + '</div></div></div>' +
        '<div class="th">' + esc(v.theme) + '</div><div class="when">' + esc(v.when) + ' <span>· ' + esc(v.where) + '</span></div>' +
        '<ul>' + v.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        (v.quote ? '<blockquote>“' + esc(v.quote) + '”</blockquote>' : '') +
        '<div class="src">Sources: ' + v.sources.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a>'; }).join(' · ') + '</div></article>';
    }).join('') + '</div>';
    h += '<div id="p75fw"></div>';
    h += '<h2>How to insulate your household</h2><div class="acts">' + d.actions.map(function (a, i) {
      var body = esc(a[1]).replace('The Bonds page', '<a href="/bonds">The Bonds page</a>');
      return '<div class="act"><div class="n">' + (i + 1) + '</div><div><h3>' + esc(a[0]) + '</h3><p>' + body + '</p></div></div>';
    }).join('') + '</div>';
    h += '<p class="note">' + esc(d.note) + '<br>&copy; ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.</p></div>';
    return h;
  }

  var D = null, loading = false;
  // ---------- Fed watch: Fed Board speeches scored hawkish / dovish ----------
  var FW_API = 'https://news.point75.io/api/fedspeak';
  function tone(sc) { return sc >= 0.5 ? ['▲', '#E5484D'] : sc <= -0.5 ? ['▼', '#3D8BFF'] : ['●', '#9AA0A6']; }
  function fwHTML(f) {
    if (!f || f.tilt == null) return '';
    var pos = (f.tilt + 2) / 4 * 100;
    return '<h2>Fed watch: hawk or dove?</h2><div class="fw"><p class="sub">Every speech and testimony by a Federal Reserve Board member, scored for what it signals about interest rates. ' +
      'Hawkish means leaning toward higher rates to fight inflation, which usually pushes bond yields up; dovish means leaning toward lower rates.</p>' +
      '<div class="fwm"><div><div class="fwt" role="img" aria-label="Board tilt ' + f.tilt.toFixed(1) + ' on a scale from -2 dovish to +2 hawkish"><i style="left:' + pos.toFixed(1) + '%"></i></div>' +
      '<div class="fwl"><span>Dovish</span><span>Balanced</span><span>Hawkish</span></div></div>' +
      '<div class="fwv"><b>' + esc(f.tilt_label) + '</b><span>average of ' + f.tilt_count + ' speeches on rates, last 90 days</span></div></div>' +
      (f.people && f.people.length ? '<div class="fwp">' + f.people.slice().sort(function (a, b) { return b.last.localeCompare(a.last); }).map(function (p) {
        var t = tone(p.avg); return '<span><b>' + esc(p.name) + '</b> <span style="border:0;padding:0;color:' + t[1] + '">' + t[0] + '</span> ' + esc(p.label) + '</span>';
      }).join('') + '</div>' : '') +
      '<div class="fws">' + f.recent.slice(0, 4).map(function (r) {
        var t = tone(r.score);
        return '<div class="fwr"><div class="h"><b>' + esc(r.speaker) + '</b><span>' + fmt(r.date) + '</span><em><span style="color:' + t[1] + '">' + t[0] + '</span> ' + esc(r.label) + '</em></div>' +
          '<p>' + esc(r.summary) + '</p>' + (r.quote ? '<q>' + esc(r.quote) + '</q>' : '') +
          '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(r.title) + ' &rarr;</a></div>';
      }).join('') + '</div>' +
      '<p class="src" style="margin:10px 0 0">Scores and summaries are written by AI from the full text of each speech and can miss nuance; quotes are checked word-for-word against the original. ' +
      'Speeches not about rates or the economy (bank supervision, payments and so on) are left out. Source: Federal Reserve Board. Updated each weekday evening.</p></div>';
  }
  function loadFw(host) {
    var box = host.querySelector('#p75fw'); if (!box) return;
    fetch(FW_API).then(function (r) { return r.json(); }).then(function (f) { box.innerHTML = fwHTML(f); }).catch(function () {});
  }

  function load(cb) {
    if (D) return cb(D); if (loading) return; loading = true;
    fetch(DATA).then(function (r) { return r.json(); }).then(function (j) { D = j; loading = false; cb(j); }).catch(function () { loading = false; cb(null); });
  }
  function render() {
    var main = document.querySelector('main') || document.body;
    if (document.querySelector('.p75ins')) return;
    once();
    var host = document.createElement('div'); host.className = 'p75ins';
    host.innerHTML = '<div class="wrap"><div class="eyebrow">Insights</div><div class="load">Loading…</div></div>';
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
    load(function (j) {
      if (!document.body.contains(host)) return;
      if (!j || !j.voices) { host.querySelector('.load').textContent = 'Insights are unavailable right now. Please try again shortly.'; return; }
      host.innerHTML = page(j); loadFw(host);
    });
  }
  function clear() { var h = document.querySelector('.p75ins'); if (h) h.remove(); }

  window.P75INS = { render: render, clear: clear, page: page };
})();
