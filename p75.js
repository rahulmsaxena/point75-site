/* Point75 site add-ons: disclaimer, sentiment poll + comments, levels,
   Editor's picks, "All essays" fix, Listen (read aloud), TL;DR summaries, and copy protection.
   Content © Rahul Saxena. All rights reserved. */
(function () {
  // ---------- Settings ----------
  var TENANT_ID = 'NgvHdCEMvUY';                          // FastComments
  var EXCLUDED  = ['/news', '/bondsummary', '/about', '/education', '/bond-dictionary'];    // no add-ons on these pages

  // Difficulty level per post
  var LEVELS = {
    '/let-the-fed-be-fed': 'Easy',
    '/the-anxiety-trade': 'Easy',
    '/bond-martinis-shaken-not-stirred': 'Medium',
    '/the-machine-that-doesnt-need-cheap-money': 'Medium',
    '/the-welfare-state-was-always-a-ticking-clock': 'Medium',
    '/right-fear-wrong-reasons-copy': 'Advanced',
    '/nightmare-on-bond-street': 'Medium'
  };

  // Editor's picks
  var PICKS = ['/let-the-fed-be-fed', '/the-welfare-state-was-always-a-ticking-clock'];

  // TL;DR summaries. Posts listed here open summary-first, with the full essay folded under "Continue reading".
  var TLDR = {
    '/let-the-fed-be-fed': "The U.S. now spends over $1 trillion a year just on interest, which gives politicians every reason to pressure the Fed to keep rates low. History shows how that ends: Arthur Burns gave in and got a decade of inflation, while Paul Volcker held firm and broke it. The real fix is a Congress that stops overspending. <em>So does today's Fed have Volcker's nerve?</em>",
    '/the-anxiety-trade': "Oil near $95, 10-year yields at 4.8%, and a trillion-dollar AI spending spree all look scary, especially when strung together into one doomsday story. But they're separate, real risks, not a countdown clock. The market is sorting AI winners from losers exactly as it should. <em>Uncertain isn't the same as doomed, so what's actually worth watching?</em>",
    '/right-fear-wrong-reasons-copy': "Everyone is watching AI stocks and the next Fed meeting, but the real warning signs are in the financial system's plumbing. Consumers are tapped out, big investors are avoiding long-term bonds, young workers are stuck behind boomers who can't afford to retire, and high mortgage rates have frozen housing. <em>Add it up, and the word that comes out isn't \u201csoft landing.\u201d</em>",
    '/the-machine-that-doesnt-need-cheap-money': "The Fed just raised rates, yet AI spending keeps growing because Big Tech pays for it with its own cash, not borrowed money. That has turned chips into a bargaining chip between the U.S. and China, while Europe absorbs an energy shock from the Iran war and the BRICS nations slowly gain influence. <em>Right now these forces are pushing everyone toward the negotiating table, but for how long?</em>",
    '/bond-martinis-shaken-not-stirred': "Long-term Treasury yields are climbing, and the comforting idea that \u201cthe economy grows faster than our debt costs\u201d is getting harder to believe. Higher yields lock the government into paying more interest for years, squeeze Big Tech's AI borrowing, and help explain gold's rally. <em>It's not a five-alarm fire yet, but the ingredients for stagflation are on the table.</em>",
    '/nightmare-on-bond-street': "Bonds, the \u201csafe\u201d corner of finance, just had a scary stretch: the 30-year Treasury yield touched levels last seen in 2007 as U.S. debt crossed $40 trillion. The Treasury's answer, bigger bond buybacks, is a few billion dollars thrown at a $30 trillion market, and the Fed is staying quiet. Higher yields don't stay on Wall Street; they show up in mortgages, loans and prices. <em>So how long will this Halloween last?</em>",
    '/the-welfare-state-was-always-a-ticking-clock': "Welfare promises were made when many workers supported each retiree. Japan is down to about two, and the U.S. faces soaring healthcare costs and nearly $40 trillion in debt. Now AI could wipe out jobs just as those bills peak, forcing governments to spend even more, and opening a window for China. <em>Is this just another cycle, or a countdown?</em>"
  };
  var expanded = {};   // posts the reader has opened in full, by path

  var DISCLAIMER = '<b>Disclaimer:</b> The views expressed here are my own and are for informational ' +
    'purposes only. Nothing on this blog constitutes financial, investment, tax, or legal advice. ' +
    'Please do your own research and consult a qualified professional before making any financial decisions.';

  var YEAR = new Date().getFullYear();
  var COPYRIGHT = '&copy; ' + YEAR + ' Rahul Saxena. All rights reserved. No part of these essays may be ' +
    'copied, reproduced or republished without written permission.';

  var GOLD = '#c9a227';

  // ---------- Essay typography on desktop: a little smaller and more refined ----------
  (function typography() {
    var st = document.createElement('style');
    st.id = 'p75-type';
    st.textContent = '@media (min-width: 920px) {' +
      '.p75-essay .page__blocks .text-box p, .p75-essay .page__blocks .text-box li {' +
        'font-size:17.5px !important; line-height:1.78 !important; letter-spacing:.005em !important }' +
      '.p75-essay .page__blocks .text-box p { margin-bottom:14px !important }' +
      '.p75-essay .page__blocks .text-box h2 { font-size:26px !important; line-height:1.3 !important; margin-top:30px !important }' +
      '.p75-essay .page__blocks .text-box h3 { font-size:21px !important; line-height:1.35 !important }' +
      '.p75-essay .block-blog-header__title { font-size:42px !important; line-height:1.15 !important; letter-spacing:-.01em !important }' +
    '}';
    document.head.appendChild(st);
  })();

  // ---------- Copy protection (a deterrent: it stops casual copying, not screenshots) ----------
  var PROTECTED = '.page__blocks .text-box, .block-blog-header, .blog-list-item, .p75t';
  (function protect() {
    var st = document.createElement('style');
    st.textContent = '.page__blocks .text-box, .page__blocks .text-box *, .block-blog-header, .block-blog-header *,' +
      '.blog-list-item, .blog-list-item *, .p75t, .p75t * { -webkit-user-select:none !important; user-select:none !important; -webkit-touch-callout:none !important }' +
      '.page__blocks img { -webkit-user-drag:none; user-drag:none }';
    document.head.appendChild(st);
    function inside(t) { return t && t.closest && (t.closest(PROTECTED) || (t.tagName === 'IMG' && t.closest('.page__blocks'))); }
    document.addEventListener('contextmenu', function (e) { if (inside(e.target)) e.preventDefault(); });
    document.addEventListener('dragstart', function (e) { if (inside(e.target)) e.preventDefault(); });
    document.addEventListener('selectstart', function (e) { if (inside(e.target)) e.preventDefault(); });
    // If text gets copied anyway, the clipboard receives a notice instead of the essay
    document.addEventListener('copy', function (e) {
      var sel = window.getSelection && window.getSelection();
      var node = sel && sel.anchorNode;
      if (node && node.nodeType === 3) node = node.parentNode;
      if (!inside(node) || !e.clipboardData) return;
      e.preventDefault();
      e.clipboardData.setData('text/plain', '\u00a9 ' + YEAR + ' Rahul Saxena. All rights reserved. ' +
        'Read this essay at ' + location.href.split('?')[0]);
    });
  })();

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

  // ---------- Listen ----------
  // Recorded narration (opening theme + warm American voice) lives in the GitHub repo's audio folder.
  // Posts not listed here fall back to the reader's device voice.
  var AUDIO_BASE = 'https://cdn.jsdelivr.net/gh/rahulmsaxena/point75-site@main/audio/';
  var RECORDED = {
    '/let-the-fed-be-fed': 1,
    '/the-anxiety-trade': 1,
    '/bond-martinis-shaken-not-stirred': 1,
    '/the-machine-that-doesnt-need-cheap-money': 1,
    '/the-welfare-state-was-always-a-ticking-clock': 1,
    '/right-fear-wrong-reasons-copy': 1,
    '/nightmare-on-bond-street': 1
  };

  var canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  var synth = canSpeak ? window.speechSynthesis : null;
  var speaking = false, paused = false;
  var aud = null, audPath = null;

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

  function fmt(sec) {
    if (!isFinite(sec)) return '0:00';
    sec = Math.floor(sec); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);
  }

  function btn(label, action) {
    return '<button type="button" data-p75="' + action + '" style="background:transparent;color:' + GOLD +
      ';border:1.5px solid ' + GOLD + ';border-radius:18px;padding:6px 16px;font-family:inherit;font-weight:600;font-size:14px;line-height:1.2;cursor:pointer;margin:0 4px">' +
      label + '</button>';
  }

  function stopAll() {
    if (aud) { aud.pause(); aud.currentTime = 0; }
    if (synth && speaking) synth.cancel();
    speaking = false; paused = false;
  }

  function renderListen() {
    var bar = document.querySelector('.p75l');
    if (!bar) return;
    var box = bar.firstChild, html;
    if (bar.getAttribute('data-mode') === 'audio') {
      var playing = aud && !aud.paused, started = aud && (aud.currentTime > 0 || playing);
      if (!started) {
        html = btn('&#9654;&nbsp; Listen to this essay' + (aud && isFinite(aud.duration) ? ' &middot; ' + Math.round(aud.duration / 60) + ' min' : ''), 'aplay');
      } else {
        html = '<div style="display:flex;align-items:center;gap:12px;max-width:560px;margin:0 auto">' +
          btn(playing ? '&#10074;&#10074;' : '&#9654;', playing ? 'apause' : 'aplay') +
          '<div data-p75="seek" style="flex:1;height:6px;background:#333;border-radius:3px;cursor:pointer;position:relative">' +
          '<div class="p75prog" style="height:100%;width:' + (aud.duration ? aud.currentTime / aud.duration * 100 : 0) + '%;background:' + GOLD + ';border-radius:3px"></div></div>' +
          '<span class="p75time" style="color:#bbb;font-size:13px;min-width:92px;text-align:right">' + fmt(aud.currentTime) + ' / ' + fmt(aud.duration) + '</span>' +
          btn('&#9632;', 'astop') + '</div>';
      }
    } else {
      if (!speaking) html = btn('&#9654;&nbsp; Listen to this essay', 'play');
      else if (paused) html = btn('&#9654;&nbsp; Resume', 'resume') + btn('&#9632;&nbsp; Stop', 'stop');
      else html = btn('&#10074;&#10074;&nbsp; Pause', 'pause') + btn('&#9632;&nbsp; Stop', 'stop');
    }
    box.innerHTML = html;
  }

  function tick() {  // update progress without rebuilding the buttons
    var p = document.querySelector('.p75l .p75prog'), t = document.querySelector('.p75l .p75time');
    if (p && aud && aud.duration) p.style.width = (aud.currentTime / aud.duration * 100) + '%';
    if (t && aud) t.textContent = fmt(aud.currentTime) + ' / ' + fmt(aud.duration);
  }

  function addListen(target, path) {
    if (document.querySelector('.p75l')) return;
    var recorded = !!RECORDED[path];
    if (!recorded && !canSpeak) return;
    var header = document.querySelector('.block-blog-header');
    var headerSection = header && header.closest('section');
    var bar = document.createElement('div');
    bar.className = 'p75l';
    bar.setAttribute('data-mode', recorded ? 'audio' : 'speech');
    bar.style.cssText = 'width:100%;box-sizing:border-box;padding:16px;background:#111214';
    bar.innerHTML = '<div style="max-width:800px;margin:0 auto;text-align:center"></div>';

    if (recorded && audPath !== path) {
      if (aud) aud.pause();
      aud = new Audio(AUDIO_BASE + path.replace(/^\//, '') + '.mp3');
      aud.preload = 'metadata';
      audPath = path;
      aud.addEventListener('loadedmetadata', renderListen);
      aud.addEventListener('play', renderListen);
      aud.addEventListener('pause', renderListen);
      aud.addEventListener('ended', function () { aud.currentTime = 0; renderListen(); });
      aud.addEventListener('timeupdate', tick);
      aud.addEventListener('error', function () {  // recording missing: use the device voice instead
        var b2 = document.querySelector('.p75l');
        if (b2 && canSpeak) { b2.setAttribute('data-mode', 'speech'); renderListen(); }
      });
    }

    bar.addEventListener('click', function (e) {
      var seek = e.target.closest('[data-p75="seek"]');
      if (seek && aud && aud.duration) {
        var r = seek.getBoundingClientRect();
        aud.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * aud.duration;
        tick(); return;
      }
      var b = e.target.closest('button[data-p75]');
      if (!b) return;
      var a = b.getAttribute('data-p75');
      if (a === 'aplay') aud.play();
      else if (a === 'apause') aud.pause();
      else if (a === 'astop') { aud.pause(); aud.currentTime = 0; renderListen(); }
      else if (a === 'play') startSpeaking();
      else if (a === 'pause') { synth.pause(); paused = true; renderListen(); }
      else if (a === 'resume') { synth.resume(); paused = false; renderListen(); }
      else if (a === 'stop') stopSpeaking();
    });
    if (headerSection && headerSection.parentNode === target) target.insertBefore(bar, headerSection.nextSibling);
    else target.insertBefore(bar, target.firstChild);
    renderListen();
  }

  // ---------- TL;DR: summary first, full essay folded under "Continue reading" ----------
  function articleSections(target) {
    var header = document.querySelector('.block-blog-header');
    var headerSection = header && header.closest('section');
    return [].filter.call(target.children, function (el) {
      return el.tagName === 'SECTION' && el !== headerSection && !/\bp75/.test(el.className) && el.querySelector('.text-box');
    });
  }

  function applyTldr(target, path) {
    var summary = TLDR[path];
    var box = document.querySelector('.p75t'), more = document.querySelector('.p75m');
    var secs = articleSections(target);
    if (!summary || !secs.length) return;

    if (!box) {
      var mins = null;
      [].forEach.call(document.querySelectorAll('.block-blog-header .blog-list-item-meta__subtitle span'), function (sp) {
        var m = sp.textContent.match(/^\s*(\d+)\s*min/); if (m) mins = m[1];
      });
      var bodyP = document.querySelector('.page__blocks .text-box p');
      var font = bodyP ? getComputedStyle(bodyP).fontFamily : 'inherit';
      box = document.createElement('div');
      box.className = 'p75t';
      box.style.cssText = 'width:100%;box-sizing:border-box;padding:4px 16px 24px;background:#111214';
      box.innerHTML = '<div style="max-width:720px;margin:0 auto;border:1px solid ' + GOLD + ';border-left:4px solid ' + GOLD +
        ';border-radius:6px;padding:18px 22px;background:#16171a">' +
        '<div style="color:' + GOLD + ';font-weight:700;letter-spacing:.12em;font-size:12px;margin-bottom:8px">TL;DR</div>' +
        '<div style="color:#ede8dc;font-size:17px;line-height:1.65;font-family:' + font.replace(/"/g, "'") + '">' + summary + '</div></div>';
      var listen = document.querySelector('.p75l');
      var anchor = listen && listen.parentNode === target ? listen : null;
      if (!anchor) { var h = document.querySelector('.block-blog-header'); anchor = h && h.closest('section'); }
      target.insertBefore(box, anchor ? anchor.nextSibling : secs[0]);

      more = document.createElement('div');
      more.className = 'p75m';
      more.style.cssText = 'width:100%;box-sizing:border-box;padding:8px 16px 40px;background:#111214;text-align:center';
      more.innerHTML = '<button type="button" style="background:' + GOLD + ';color:#111;border:0;border-radius:22px;padding:11px 26px;' +
        'font-family:inherit;font-weight:700;font-size:15px;cursor:pointer">Continue reading &darr;' + (mins ? ' &middot; ' + mins + ' min' : '') + '</button>';
      more.querySelector('button').addEventListener('click', function () {
        expanded[path] = true;
        applyTldr(target, path);
        var first = articleSections(target)[0];
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      var last = secs[secs.length - 1];
      target.insertBefore(more, last.nextSibling);
    }

    // Fold (or unfold) the essay; re-applied every tick because the site can re-render sections
    secs.forEach(function (sec, i) {
      if (expanded[path]) {
        sec.style.maxHeight = ''; sec.style.overflow = ''; sec.style.display = '';
        sec.style.webkitMaskImage = ''; sec.style.maskImage = '';
      } else if (i === 0) {
        sec.style.maxHeight = '420px'; sec.style.overflow = 'hidden';
        // fade the teaser into the page; the dark backdrop keeps the faded part from showing white
        sec.style.webkitMaskImage = sec.style.maskImage = 'linear-gradient(to bottom, #000 45%, transparent 100%)';
        target.style.backgroundColor = '#111214';
      } else {
        sec.style.display = 'none';
      }
    });
    if (expanded[path] && more) more.remove();
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
      var t0 = document.querySelector('.p75t'), m0 = document.querySelector('.p75m');
      if (t0) t0.remove(); if (m0) m0.remove();
      disc = comments = null;
      stopAll();
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

    // Mark essay pages so the desktop typography applies only there
    document.documentElement.classList.toggle('p75-essay',
      path !== '/' && EXCLUDED.indexOf(path) === -1 && !!document.querySelector('.block-blog-header'));

    // Education pages (/education and its guides) are drawn by education.js from the same GitHub folder
    var EDU = ['/education', '/bond-dictionary'];
    if (EDU.indexOf(path) > -1) {
      if (window.P75EDU) window.P75EDU.render(path);
      else if (!document.getElementById('p75edu-js')) {
        var ej = document.createElement('script'); ej.id = 'p75edu-js';
        ej.src = 'https://rahulmsaxena.github.io/point75-site/education/education.js?v=' + Math.floor(Date.now() / 36e5);
        ej.onload = function () { update(); };
        document.body.appendChild(ej);
      }
      return;
    } else if (window.P75EDU) window.P75EDU.clear();

    if (EXCLUDED.indexOf(path) > -1) return;
    var target = document.querySelector('.page__blocks') || document.querySelector('main') || document.body;
    var isPost = path !== '/';

    if (isPost) addListen(target, path);
    if (isPost) applyTldr(target, path);
    // On posts with a TL;DR, hide the description under the title (it repeats the opening line).
    // It still shows on the homepage cards and in search results.
    if (isPost) {
      var desc = document.querySelector('.block-blog-header .block-blog-header__description');
      if (desc) desc.style.display = TLDR[path] ? 'none' : '';
    }

    if (!disc) {
      target.appendChild(band('p75d',
        (isPost ? '<a href="/" style="color:' + GOLD + ';text-decoration:none;font-weight:600">&larr; All essays</a><div style="height:14px"></div>' : '') +
        '<div style="border-left:3px solid ' + GOLD + ';padding-left:14px">' + DISCLAIMER + '</div>' +
        '<div style="margin-top:12px;color:#9a9a9a;font-size:13px">' + COPYRIGHT + '</div>'));
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
  window.addEventListener('pagehide', function () { if (aud) aud.pause(); });
  setInterval(update, 1000);
  update();
})();
