/* Point75 site add-ons: disclaimer, sentiment poll + comments, levels,
   Editor's picks, "All essays" fix, and Listen (read aloud). */
(function () {
  // ---------- Settings ----------
  var TENANT_ID = 'NgvHdCEMvUY';                          // FastComments
  var EXCLUDED  = ['/news', '/bondsummary', '/about'];    // no add-ons on these pages

  // Difficulty level per post
  var LEVELS = {
    '/let-the-fed-be-fed': 'Easy',
    '/the-anxiety-trade': 'Easy',
    '/bond-martinis-shaken-not-stirred': 'Medium',
    '/the-machine-that-doesnt-need-cheap-money': 'Medium',
    '/the-welfare-state-was-always-a-ticking-clock': 'Medium',
    '/right-fear-wrong-reasons-copy': 'Advanced'
  };

  // Editor's picks
  var PICKS = ['/let-the-fed-be-fed', '/the-welfare-state-was-always-a-ticking-clock'];

  var DISCLAIMER = '<b>Disclaimer:</b> The views expressed here are my own and are for informational ' +
    'purposes only. Nothing on this blog constitutes financial, investment, tax, or legal advice. ' +
    'Please do your own research and consult a qualified professional before making any financial decisions.';

  var GOLD = '#c9a227';

  // ---------- FastComments loader ----------
  var queue = [], loading = false;
  function withFastComments(cb) {
    if (window.FastCommentsUI) return cb();
    queue.push(cb);
    if (loading) return;
    loading = true;
    var s = document.createElement('script');
    s.src = 'https://cdn.fastcomments.com/js/embed-v2.min.js';
    s.onload = function () { while (queue.length) queue.shift()(); };
    document.head.appendChild(s);
  }

  // Bullish / Neutral / Bearish buttons, drawn as small images
  function pill(label, color, on) {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="36">' +
      '<rect x="1" y="1" width="118" height="34" rx="17" fill="' + (on ? color : '#000') + '" stroke="' + color + '" stroke-width="2"/>' +
      '<text x="60" y="23" font-family="Arial" font-size="14" font-weight="bold" fill="' + (on ? '#000' : color) +
      '" text-anchor="middle">' + label + '</text></svg>');
  }
  function react(id, label, color) {
    return { id: id, src: pill(label, color, false), selectedSrc: pill(label, color, true) };
  }

  // A full-width black band with centred content
  function band(cls, html) {
    var b = document.createElement('div');
    b.className = cls;
    b.style.cssText = 'background:#000;padding:28px 72px 36px;box-sizing:border-box;width:100%';
    b.innerHTML = '<div style="max-width:800px;margin:0 auto;color:#fff;font-size:14px;line-height:1.6">' + html + '</div>';
    return b;
  }

  // ---------- Listen (read aloud with the reader's device voice) ----------
  var canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  var synth = canSpeak ? window.speechSynthesis : null;
  var speaking = false, paused = false;

  function pickVoice() {
    var voices = synth.getVoices().filter(function (v) { return /^en(-|_|$)/i.test(v.lang); });
    // Soft female voices, best first (which ones exist depends on the reader's device)
    var prefer = [/(aria|jenny|ava|emma|michelle|sonia|libby).*natural/i, /natural.*(aria|jenny|ava|emma|michelle|sonia|libby)/i,
      /samantha/i, /google us english/i, /google uk english female/i, /serena|moira|karen|tessa|fiona|victoria|allison|susan/i,
      /zira|hazel|female/i];
    for (var i = 0; i < prefer.length; i++) {
      for (var j = 0; j < voices.length; j++) if (prefer[i].test(voices[j].name)) return voices[j];
    }
    var notMale = voices.filter(function (v) { return !/\b(david|mark|daniel|alex|fred|george|guy|ryan|james|thomas|male)\b/i.test(v.name); });
    return notMale[0] || voices[0] || null;
  }

  function articleText() {
    var title = document.querySelector('.block-blog-header__title');
    var boxes = [].slice.call(document.querySelectorAll('.page__blocks .text-box'));
    var body = boxes.sort(function (a, b) { return b.innerText.length - a.innerText.length; })[0];
    var text = (title ? title.innerText + '. ' : '') + (body ? body.innerText : '');
    return text.replace(/All essays\s*$/, '').trim();
  }

  // Break text into short pieces; some browsers stop reading long passages part-way
  function chunks(text) {
    var parts = text.split(/\n+/), out = [];
    parts.forEach(function (p) {
      p = p.trim();
      if (!p) return;
      var sentences = p.match(/[^.!?]+[.!?]*["')\]]*\s*/g) || [p], cur = '';
      sentences.forEach(function (s) {
        if ((cur + s).length > 220) { if (cur) out.push(cur); cur = s; } else cur += s;
      });
      if (cur) out.push(cur);
    });
    return out;
  }

  function stopSpeaking() {
    if (!synth) return;
    speaking = false; paused = false;
    synth.cancel();
    renderListen();
  }

  function startSpeaking() {
    synth.cancel();
    var voice = pickVoice(), pieces = chunks(articleText());
    if (!pieces.length) return;
    speaking = true; paused = false;
    pieces.forEach(function (piece, i) {
      var u = new SpeechSynthesisUtterance(piece);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = 0.95; u.pitch = 1.05;   // slightly slower and gentler
      if (i === pieces.length - 1) u.onend = function () { speaking = false; paused = false; renderListen(); };
      synth.speak(u);
    });
    renderListen();
  }

  function btn(label, action) {
    return '<button type="button" data-p75="' + action + '" style="background:transparent;color:' + GOLD +
      ';border:1.5px solid ' + GOLD + ';border-radius:18px;padding:6px 16px;font-family:inherit;font-weight:600;font-size:14px;line-height:1.2;cursor:pointer;margin-right:8px">' +
      label + '</button>';
  }

  function renderListen() {
    var bar = document.querySelector('.p75l');
    if (!bar) return;
    var html;
    if (!speaking) html = btn('&#9654;&nbsp; Listen to this essay', 'play');
    else if (paused) html = btn('&#9654;&nbsp; Resume', 'resume') + btn('&#9632;&nbsp; Stop', 'stop');
    else html = btn('&#10074;&#10074;&nbsp; Pause', 'pause') + btn('&#9632;&nbsp; Stop', 'stop');
    bar.firstChild.innerHTML = html;
  }

  function addListen(target) {
    if (!canSpeak || document.querySelector('.p75l')) return;
    var header = document.querySelector('.block-blog-header');
    var headerSection = header && header.closest('section');
    var bar = document.createElement('div');
    bar.className = 'p75l';
    bar.style.cssText = 'width:100%;box-sizing:border-box;padding:16px;background:#111214';
    bar.innerHTML = '<div style="max-width:800px;margin:0 auto;text-align:center"></div>';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-p75]');
      if (!b) return;
      var a = b.getAttribute('data-p75');
      if (a === 'play') startSpeaking();
      else if (a === 'pause') { synth.pause(); paused = true; renderListen(); }
      else if (a === 'resume') { synth.resume(); paused = false; renderListen(); }
      else if (a === 'stop') stopSpeaking();
    });
    if (headerSection && headerSection.parentNode === target) target.insertBefore(bar, headerSection.nextSibling);
    else target.insertBefore(bar, target.firstChild);
    renderListen();
  }

  // ---------- Main loop (the site swaps pages without reloading) ----------
  var lastPath = null;
  function update() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    var disc = document.querySelector('.p75d'), comments = document.querySelector('.p75c'), listen = document.querySelector('.p75l');

    if (path !== lastPath) {
      if (disc) disc.remove();
      if (comments) comments.remove();
      if (listen) listen.remove();
      disc = comments = null;
      if (speaking) stopSpeaking();
      lastPath = path;
    }

    // Level + Editor's pick next to the reading time (homepage cards and post headers)
    document.querySelectorAll('.blog-list-item-meta__subtitle').forEach(function (s) {
      if (s.querySelector('.p75v')) return;
      var a = s.closest('a'), h = a ? a.getAttribute('href').replace(/\/+$/, '') : path, lvl = LEVELS[h];
      s.insertAdjacentHTML('beforeend', '<span class="p75v">' +
        (lvl ? ' · Level: <b>' + lvl + '</b>' : '') +
        (PICKS.indexOf(h) > -1 ? ' <b style="color:#000!important;background:' + GOLD +
          ';padding:1px 8px;border-radius:9px;white-space:nowrap">&#9733; Editor\'s pick</b>' : '') +
        '</span>');
    });

    // Hide stray "All essays" copies pasted inside articles
    document.querySelectorAll('.page__blocks .p75-float').forEach(function (a) { a.style.display = 'none'; });

    // Hide the floating "All essays" button when there's no room beside the text
    var back = document.getElementById('p75-back'), para = document.querySelector('.page__blocks p');
    if (back && para) back.style.visibility = para.getBoundingClientRect().left < 160 ? 'hidden' : '';

    if (EXCLUDED.indexOf(path) > -1) return;
    var target = document.querySelector('.page__blocks') || document.querySelector('main') || document.body;
    var isPost = path !== '/';

    if (isPost) addListen(target);

    if (!disc) {
      target.appendChild(band('p75d',
        (isPost ? '<a href="/" style="color:' + GOLD + ';text-decoration:none;font-weight:600">&larr; All essays</a><div style="height:14px"></div>' : '') +
        '<div style="border-left:3px solid ' + GOLD + ';padding-left:14px">' + DISCLAIMER + '</div>'));
    }

    if (isPost && !comments) {
      var c = band('p75c', '<div style="text-align:center;font-size:16px;font-weight:600">Where do you stand on this?</div><div></div>');
      c.style.paddingTop = '0';
      target.appendChild(c);
      var widget = c.firstChild.lastChild;
      withFastComments(function () {
        window.FastCommentsUI(widget, {
          tenantId: TENANT_ID,
          urlId: 'point75.io' + path,
          url: 'https://www.point75.io' + path,
          hasDarkBackground: true,
          pageReactConfig: { reacts: [
            react('bullish', 'Bullish', '#2ecc71'),
            react('neutral', 'Neutral', GOLD),
            react('bearish', 'Bearish', '#e74c3c')
          ] }
        });
      });
    }
  }

  if (canSpeak) { synth.getVoices(); window.addEventListener('pagehide', function () { synth.cancel(); }); }
  setInterval(update, 1000);
  update();
})();
