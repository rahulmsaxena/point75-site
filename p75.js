/* Point75 site add-ons: disclaimer, sentiment poll + comments, levels,
   Editor's picks, "All essays" fix, Listen (read aloud), TL;DR summaries, and copy protection.
   Content © Rahul Saxena. All rights reserved. */
(function () {
  // ---------- Settings ----------
  var TENANT_ID = 'NgvHdCEMvUY';                          // FastComments
  var EXCLUDED  = ['/news', '/bondsummary', '/about', '/education', '/bond-introduction', '/bond-history', '/bond-types', '/cash-logistics', '/bond-dictionary', '/bond-players', '/bond-fortunes', '/pulse', '/debt-trap', '/economic-indicators', '/bonds', '/insights', '/sector-credit', '/lenders', '/credit-stress', '/intellegent-summary', '/intelligent-summary', '/kinetics', '/bond-summary', '/start-here', '/contact'];    // no add-ons on these pages

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

  // ---------- Mobile menu: left-aligned list with dividers, gold active item ----------
  (function mobileNav() {
    if (document.getElementById('p75-nav')) return;
    var M = '.block-header-layout-mobile ', L = M + '.block-header__nav-links ';
    var st = document.createElement('style');
    st.id = 'p75-nav';
    st.textContent = '@media (max-width:920px){' +
      '.block-header-layout-mobile__dropdown{background:#111214!important}' +
      // logo: show the mark from the image at 34px tall, and draw the byline as real text
      // (the byline baked into the image is unreadable at phone size). Image: mark+bar = left 50%.
      M + '.block-header-logo{width:auto!important;height:34px!important;display:inline-flex!important;align-items:center!important;text-decoration:none!important}' +
      M + '.block-header-logo__image{width:160px!important;height:34px!important;max-width:none!important;object-fit:contain!important;object-position:left center!important;clip-path:inset(0 50% 0 0);margin-right:-80px!important}' +
      M + '.block-header-logo::after{content:"by Rahul Saxena";font-family:Manrope,"DM Sans",sans-serif;font-size:14.5px;font-weight:600;letter-spacing:.01em;color:#ECEAE4;white-space:nowrap;margin-left:9px;line-height:1}' +
      M + '.block-header__nav{padding:12px 28px 40px!important;width:100%;box-sizing:border-box}' +
      M + '.block-header__nav-links{gap:0!important;text-align:left!important;align-items:stretch!important;width:100%;padding:0!important;margin:0!important}' +
      L.trim() + '>.block-header-item{border-bottom:1px solid rgba(255,255,255,.07);width:100%}' +
      L.trim() + '>.block-header-item>.block-header-item__label{display:block;width:100%}' +
      L.trim() + '>.block-header-item>.block-header-item__label>.block-header-item__item{display:flex!important;justify-content:space-between!important;align-items:center;width:100%;padding:17px 0!important;margin:0!important}' +
      L.trim() + '>.block-header-item .item-content{font-size:19px!important;font-weight:500!important;letter-spacing:.01em;color:#ECEAE4!important;margin:0!important;padding:0!important;text-decoration:none!important}' +
      L + '.block-header-item .item-content-wrapper--active>.item-content{color:#C9A227!important}' +
      M + '.item-content::after,' + M + '.item-content::before{display:none!important}' +
      M + '.item-content__icon-container-wrapper{color:#C9A227!important;margin:0!important}' +
      M + '.item-content__icon-container-wrapper svg{fill:#C9A227!important;color:#C9A227!important;width:14px;height:14px}' +
      M + '.block-header-item__dropdown{margin:0 0 16px 2px!important;gap:0!important;align-items:flex-start!important;padding:0 0 0 16px!important;border-left:1px solid rgba(201,162,39,.45)}' +
      M + '.block-header-item__dropdown .block-header-item__item{padding:9px 0!important;margin:0!important}' +
      L + '.block-header-item__dropdown .block-header-item .item-content{font-size:16px!important;font-weight:400!important;color:#A9A7A1!important;margin:0!important}' +
      L + '.block-header-item__dropdown .block-header-item .item-content-wrapper--active>.item-content{color:#C9A227!important}' +
    '}' +
    // desktop: the dropdown caret hugs its label, so every visible gap in the menu is the same 40px
    '.block-header-layout-desktop .block-header__nav-links .item-content__icon-container-wrapper{width:auto!important;padding:0!important;margin:0!important}' +
    '.block-header-layout-desktop .block-header__nav-links .item-content__icon-container{margin-left:6px!important;width:auto!important;padding:0!important}' +
    '.block-header-layout-desktop .block-header__nav-links .item-content__icon-container svg{margin:0!important}';
    document.head.appendChild(st);
  })();

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
  // ---------- News embed polish ----------
  var NEWS_CSS =
    '.coupon-embed{--bg:#111214!important;--bg-raised:#17181B!important;--panel-border:#2A2B2F!important;--gold:#C9A227!important;' +
      '--paper:#EDE8DC!important;--paper-dim:#CFC9BC!important;--dim:#A9A396!important;' +
      '--serif:"Hedvig Letters Serif",Georgia,serif!important;--mono:Manrope,system-ui,sans-serif!important;font-family:Manrope,system-ui,sans-serif!important}' +
    '.coupon-embed .ce-masthead-title,.coupon-embed .ce-article h2{font-family:"Hedvig Letters Serif",Georgia,serif!important;font-weight:400!important}' +
    '.coupon-embed .ce-masthead-title{font-size:2rem!important}' +
    '.coupon-embed .ce-article h2{font-size:1.2rem!important;line-height:1.35!important}' +
    '.coupon-embed .ce-hero-narrative,.coupon-embed .ce-article p.ce-summary,.coupon-embed .ce-rate-desc{font-family:Manrope,system-ui,sans-serif!important;color:var(--paper-dim)!important}' +
    '.coupon-embed .ce-hero-narrative{font-size:1rem!important;line-height:1.65!important}' +
    '.coupon-embed .ce-article p.ce-summary{font-size:.94rem!important;line-height:1.6!important}' +
    '.coupon-embed .ce-rate-desc{font-size:.84rem!important;line-height:1.5!important}' +
    // one label style everywhere (matches the Pulse card titles)
    '.coupon-embed .ce-tenor-label,.coupon-embed .ce-mini-stat .ce-tenor-label,.coupon-embed .ce-rate-name,.coupon-embed .ce-rates-title{' +
      'font-family:Manrope,system-ui,sans-serif!important;font-size:.86rem!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important;margin-bottom:.4rem!important}' +
    '.coupon-embed .ce-tenor-label,.coupon-embed .ce-rates-title{color:var(--gold)!important}' +
    '.coupon-embed .ce-rate-head{flex-direction:column!important;align-items:flex-start!important;gap:2px!important;margin-bottom:.45rem!important}.coupon-embed .ce-rate-name{white-space:nowrap;margin-bottom:0!important}.coupon-embed .ce-rate-tag{text-align:left!important}' +
    '.coupon-embed .ce-mini-stat .ce-tenor-label,.coupon-embed .ce-rate-name{color:var(--dim)!important}' +
    '.coupon-embed .ce-rate-tag,.coupon-embed .ce-rate-sub,.coupon-embed .ce-weekly,.coupon-embed .ce-article-meta,.coupon-embed .ce-masthead-meta,' +
      '.coupon-embed .ce-hero-attribution,.coupon-embed .ce-rates-src,.coupon-embed .ce-footer,.coupon-embed .ce-count{font-family:Manrope,system-ui,sans-serif!important;font-size:.76rem!important;color:var(--dim)!important}' +
    // numbers: one family, tabular figures
    '.coupon-embed .ce-big-value{font-family:"Hedvig Letters Serif",Georgia,serif!important;font-weight:400!important;font-size:2.9rem!important}' +
    '.coupon-embed .ce-value,.coupon-embed .ce-rate-val,.coupon-embed .ce-delta{font-family:Manrope,system-ui,sans-serif!important;font-weight:700!important;font-variant-numeric:tabular-nums}' +
    '.coupon-embed .ce-rate-sub .ce-delta,.coupon-embed .ce-mini-stat .ce-delta{font-size:.8rem!important}' +
    '.coupon-embed .ce-article h2 a{text-decoration:none}.coupon-embed .ce-article h2 a:hover{text-decoration:underline;text-decoration-color:var(--gold)}' +
    '.coupon-embed .ce-rate-val{font-size:1.5rem!important}.coupon-embed .ce-mini-stat .ce-value{font-size:1.25rem!important}' +
    // controls: search gets its own full-width row with a gold rim
    '.coupon-embed .ce-controls{gap:.75rem!important;font-family:Manrope,system-ui,sans-serif!important;font-size:.85rem!important}' +
    '.coupon-embed .p75-searchrow input[type="search"],.coupon-embed .ce-controls input[type="search"]{order:-1;flex:1 1 100%!important;width:100%;height:48px;font-family:Manrope,system-ui,sans-serif!important;font-size:1rem!important;' +
      'color:var(--paper)!important;background:#17181B url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2718%27 height=%2718%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23C9A227%27 stroke-width=%272.2%27 stroke-linecap=%27round%27%3E%3Ccircle cx=%2711%27 cy=%2711%27 r=%277%27/%3E%3Cpath d=%27m20 20-4-4%27/%3E%3C/svg%3E") no-repeat 16px center!important;' +
      'border:1.5px solid var(--gold)!important;border-radius:10px!important;padding:0 16px 0 46px!important;box-shadow:0 0 0 3px rgba(201,162,39,.10)}' +
    '.coupon-embed .p75-searchrow input[type="search"]::placeholder,.coupon-embed .ce-controls input[type="search"]::placeholder{color:#A9A396;opacity:1}' +
    '.coupon-embed .p75-searchrow input[type="search"]:focus,.coupon-embed .ce-controls input[type="search"]:focus{outline:none!important;box-shadow:0 0 0 4px rgba(201,162,39,.28)}' +
    '.coupon-embed .ce-controls select,.coupon-embed .ce-refresh{height:38px;font-family:Manrope,system-ui,sans-serif!important;font-size:.85rem!important;border-radius:8px!important;padding:0 .75rem!important;color:var(--paper)!important;border-color:#3A3B40!important;background-color:#17181B!important}' +
    '.coupon-embed .ce-refresh:hover{border-color:var(--gold)!important;color:var(--gold)!important}';
  var FONTS = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&family=Manrope:wght@400;500;700&display=swap';
  // Economic indicators strip at the top of the News page (links to /economic-indicators)
  NEWS_CSS +=
    '.coupon-embed .p75-strip{display:block;text-decoration:none;color:inherit;background:var(--bg-raised);border:1px solid var(--panel-border);border-radius:10px;padding:14px 16px 12px;margin:0 0 1.5rem;transition:border-color .2s}' +
    '.coupon-embed .p75-strip:hover,.coupon-embed .p75-strip:focus-visible{border-color:var(--gold);outline:none}' +
    '.coupon-embed .st-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:10px}' +
    '.coupon-embed .st-k{font:700 .86rem Manrope,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}' +
    '.coupon-embed .st-go{font:700 .9rem Manrope,system-ui,sans-serif;color:var(--gold);white-space:nowrap}' +
    '.coupon-embed .st-row{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}' +
    '.coupon-embed .st-t{background:var(--bg);border:1px solid var(--panel-border);border-radius:8px;padding:9px 10px;min-width:0}' +
    '.coupon-embed .st-l{display:block;font:700 .72rem Manrope,system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.coupon-embed .st-v{display:block;font:700 1.25rem Manrope,system-ui,sans-serif;color:var(--paper);font-variant-numeric:tabular-nums;margin:2px 0 1px}' +
    '.coupon-embed .st-c{display:block;font:600 .76rem Manrope,system-ui,sans-serif;color:var(--dim);font-variant-numeric:tabular-nums}' +
    '.coupon-embed .st-c.good{color:var(--up)}.coupon-embed .st-c.bad{color:var(--down)}' +
    '@media (max-width:620px){.coupon-embed .st-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding-bottom:4px}' +
      '.coupon-embed .st-t{flex:0 0 118px;scroll-snap-align:start}.coupon-embed .st-go{font-size:.84rem}.coupon-embed .st-long{display:none}}' +
    '@media (min-width:621px){.coupon-embed .st-short{display:none}}' +
    '@media (max-width:620px){.coupon-embed .ce-hero-narrative{display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}}';
  NEWS_CSS += '.coupon-embed .p75-searchrow{margin:0 0 .8rem}.coupon-embed .p75-searchrow + .ce-controls{margin-bottom:1.6rem!important}.coupon-embed .p75-searchrow input[type="search"]{display:block;box-sizing:border-box}' +
    '.coupon-embed .p75-sr-note{font:600 .8rem Manrope,system-ui,sans-serif;color:var(--dim);margin-top:6px;min-height:1em}';
  // Put the headline search near the top (it filters the list further down), and bring the results into view as people type
  // ---------- Smarter headline search ----------
  // Matches words rather than the exact phrase, ignores word endings (volatility = volatile), knows a few
  // market synonyms, and when today's feed has little on a topic, adds recent articles from elsewhere
  // (news.point75.io/api/websearch).
  NEWS_CSS +=
    '.coupon-embed .p75-web{margin:1.4rem 0 0;padding:16px 18px;background:var(--bg-raised);border:1px solid var(--panel-border);border-radius:10px}' +
    '.coupon-embed .p75-web .w-h{font:700 .86rem Manrope,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}' +
    '.coupon-embed .p75-web .w-sub{font:500 .84rem Manrope,system-ui,sans-serif;color:var(--dim);margin-bottom:10px}' +
    '.coupon-embed .p75-web .w-i{padding:12px 0;border-top:1px solid var(--panel-border)}' +
    '.coupon-embed .p75-web .w-m{font:600 .76rem Manrope,system-ui,sans-serif;color:var(--dim);margin-bottom:3px}' +
    '.coupon-embed .p75-web a.w-t{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:1.08rem;line-height:1.35;color:var(--paper);text-decoration:none}' +
    '.coupon-embed .p75-web a.w-t:hover{text-decoration:underline;text-decoration-color:var(--gold)}' +
    '.coupon-embed .p75-web p{font:400 .9rem/1.55 Manrope,system-ui,sans-serif;color:var(--paper-dim);margin:4px 0 0}' +
    '.coupon-embed .p75-web .w-f{font:500 .74rem Manrope,system-ui,sans-serif;color:var(--dim);margin-top:10px}' +
    '.coupon-embed li.ce-article.p75-hide{display:none!important}';
  var STOP = ['the', 'a', 'an', 'of', 'in', 'on', 'for', 'and', 'or', 'to', 'at', 'by', 'with', 'about', 'is', 'are', 'what', 'how', 'why'];
  var SOFT = ['market', 'markets', 'news', 'latest', 'today', 'update', 'updates', 'report'];
  var SYN = [['volatil', 'turbul', 'turmoil', 'swing', 'vix', 'selloff', 'sell-off', 'jitter', 'rout', 'whipsaw'], ['inflat', 'cpi', 'pce', 'disinflat'],
    ['rate', 'yield'], ['fed', 'fomc', 'powell', 'federal reserve'], ['recess', 'slowdown', 'contraction'], ['job', 'employ', 'payroll', 'labor', 'labour', 'unemploy'],
    ['tariff', 'trade war'], ['treasur', 't-bill', 'tbill'], ['mortgage', 'housing', 'home loan'], ['deficit', 'debt ceiling', 'borrowing'], ['ecb', 'lagarde'], ['boe', 'bank of england'], ['boj', 'bank of japan']];
  function stem(w) { var r = w.replace(/(ilities|ility|ities|ations|ation|ity|ies|ied|ing|ers|er|ed|es|e|s|ly)$/, ''); return r.length >= 3 ? r : w; }
  function variants(w) { var st = stem(w), out = [st]; SYN.forEach(function (g) { if (g.some(function (x) { return x.indexOf(st) === 0 || st.indexOf(x) === 0; })) out = out.concat(g); }); return out; }
  function hits(hayWords, hay, vs) {
    return vs.some(function (v) { return v.indexOf(' ') > -1 ? hay.indexOf(v) > -1 : hayWords.some(function (h) { return h.indexOf(v) === 0 || (h.length >= 4 && v.indexOf(stem(h)) === 0); }); });
  }
  function ago(iso) { var t = Date.parse(iso); if (!t) return ''; var m = Math.round((Date.now() - t) / 6e4); return m < 60 ? Math.max(1, m) + 'm ago' : m < 1440 ? Math.round(m / 60) + 'h ago' : Math.round(m / 1440) + 'd ago'; }
  function escH(x) { return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var WEB = {};

  function moveSearch(d, frame) {
    if (d.getElementById('p75-searchrow')) return;
    var input = d.querySelector('.coupon-embed .ce-controls input[type="search"]'), anchor = d.getElementById('p75-ind-strip') || d.querySelector('.coupon-embed .ce-masthead');
    if (!input || !anchor) return;
    var row = d.createElement('div'); row.id = 'p75-searchrow'; row.className = 'p75-searchrow';
    var note = d.createElement('div'); note.className = 'p75-sr-note'; note.setAttribute('aria-live', 'polite');
    anchor.insertAdjacentElement('afterend', row); row.appendChild(input); row.appendChild(note);
    // the date / region / source filters and Refresh follow the search box, above the day's Treasury note
    var controls = d.querySelector('.coupon-embed .ce-controls'); if (controls) row.insertAdjacentElement('afterend', controls);
    input.placeholder = 'Search headlines, e.g. market volatility, Fed, inflation';
    // take over filtering from the embed (its own filter only matches the exact phrase)
    row.addEventListener('input', function (e) { if (e.target === input) { e.stopImmediatePropagation(); schedule(); } }, true);
    var t = 0, lastQ = null, content = d.getElementById('coupon-content');

    function toResults() {
      var list = d.getElementById('coupon-content') || controls; if (!list) return;
      var top = frame.getBoundingClientRect().top + window.pageYOffset + list.getBoundingClientRect().top - headerHeightSafe() - 8;
      if (Math.abs(window.pageYOffset - top) > 40) window.scrollTo({ top: top, behavior: 'smooth' });
    }
    function webBox() {
      var w = d.getElementById('p75-web');
      if (!w) { w = d.createElement('div'); w.id = 'p75-web'; w.className = 'p75-web'; var c = d.getElementById('coupon-content'); if (c) c.insertAdjacentElement('afterend', w); }
      return w;
    }
    function showWeb(q, found) {
      var w = webBox(), key = q.toLowerCase();
      w.hidden = false;
      w.innerHTML = '<div class="w-h">More from around the web</div><div class="w-sub">' + (found ? 'Only ' + found + ' in today’s briefing, so here’s' : 'Nothing in today’s briefing, so here’s') + ' recent coverage of “' + escH(q) + '” from other outlets.</div><div class="w-sub">Searching…</div>';
      var draw = function (j) {
        if (input.value.trim().toLowerCase() !== key) return;
        var items = (j && j.items) || [];
        if (!items.length) { w.hidden = true; return; }   // nothing extra to show: keep the page clean
        w.innerHTML = '<div class="w-h">More from around the web</div><div class="w-sub">' + (found ? 'Only ' + found + ' in today’s briefing, so here’s' : 'Nothing in today’s briefing, so here’s') + ' recent coverage of “' + escH(q) + '” from other outlets.</div>' +
          (items.length ? items.map(function (a) {
            return '<div class="w-i"><div class="w-m">' + escH(a.source) + (a.date ? ' · ' + ago(a.date) : '') + '</div><a class="w-t" href="' + escH(a.url) + '" target="_blank" rel="noopener noreferrer">' + escH(a.title) + '</a>' + (a.summary ? '<p>' + escH(a.summary) + '</p>' : '') + '</div>';
          }).join('') + '<div class="w-f">From ' + escH((j.sources || []).join(', ') || 'news sources') + '. Links open the original publisher.</div>'
            : '<div class="w-sub">No recent coverage found either. Try a broader word.</div>');
      };
      if (WEB[key]) return draw(WEB[key]);
      fetch('https://news.point75.io/api/websearch?q=' + encodeURIComponent(q)).then(function (r) { return r.json(); })
        .then(function (j) { WEB[key] = j; draw(j); }).catch(function () { draw({ items: [] }); });
    }
    function apply(scroll) {
      var q = input.value.trim(), lis = [].slice.call(d.querySelectorAll('.coupon-embed li.ce-article')), w = d.getElementById('p75-web');
      if (!q) { lis.forEach(function (li) { li.classList.remove('p75-hide'); }); note.textContent = ''; if (w) w.hidden = true; lastQ = q; return; }
      var ql = ' ' + q.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ') + ' ', phrase = [];
      SYN.forEach(function (g) { g.forEach(function (x) { if (x.indexOf(' ') > -1 && ql.indexOf(' ' + x + ' ') > -1) { phrase.push(g); ql = ql.replace(' ' + x + ' ', ' '); } }); });
      var words = ql.split(/\s+/).filter(function (x) { return x && STOP.indexOf(x) < 0; });
      var hard = words.filter(function (x) { return SOFT.indexOf(x) < 0; }); if (!hard.length && !phrase.length) hard = words;
      var groups = phrase.concat(hard.map(variants));
      var scored = lis.map(function (li) {
        var hay = [].map.call(li.querySelectorAll('span,a,p,h2'), function (e) { return e.textContent; }).join(' ').toLowerCase(), hw = hay.split(/[^a-z0-9-]+/).filter(Boolean);
        var n = groups.filter(function (g) { return hits(hw, hay, g); }).length;
        return [li, n];
      });
      var all = scored.filter(function (x) { return x[1] === groups.length; }), some = scored.filter(function (x) { return x[1] > 0; });
      var show = all.length ? all : some, label = all.length ? '' : ' (closest matches)';
      scored.forEach(function (x) { x[0].classList.toggle('p75-hide', show.indexOf(x) < 0); });
      var cnt = d.querySelector('.coupon-embed .ce-count'); if (cnt) cnt.textContent = show.length + ' / ' + lis.length;
      note.textContent = show.length ? show.length + ' matching headline' + (show.length === 1 ? '' : 's') + ' in today’s briefing' + label + '.' : 'No headlines in today’s briefing mention that.';
      if (show.length < 3 && q.length >= 3) showWeb(q, show.length); else if (w) w.hidden = true;
      if (scroll && q !== lastQ) toResults();
      lastQ = q;
    }
    function schedule() { clearTimeout(t); t = setTimeout(function () { apply(true); }, 600); }
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(t); apply(true); input.blur(); } });
    // the embed re-draws the list when the date, region or source changes: re-apply the search
    if (content && window.MutationObserver) new MutationObserver(function () { if (input.value.trim()) apply(false); }).observe(content, { childList: true });
  }
  function headerHeightSafe() { var h = document.querySelector('header, .block-header'); return h && getComputedStyle(h).position === 'fixed' ? h.offsetHeight : 0; }
  // Headlines first: the full yield and Fed-rate panels now live on /economic-indicators ("Rates today");
  // the News page keeps only the day's one-paragraph Treasury note.
  NEWS_CSS +=
    '.coupon-embed .ce-hero-primary,.coupon-embed .ce-hero-secondary,.coupon-embed .ce-hero-attribution,.coupon-embed .ce-rates{display:none!important}' +
    '.coupon-embed .ce-hero{padding:14px 16px!important;border-radius:10px!important;margin-bottom:1.5rem!important}' +
    '.coupon-embed .ce-hero-narrative{margin:0!important;padding:0!important;border:0!important;font-size:.98rem!important;color:var(--paper-dim)!important}' +
    '.coupon-embed .ce-hero-narrative:before{content:"Today in Treasuries";display:block;font:700 .86rem Manrope,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}';
  var MON3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var STRIP = [['t10', '10Y yield'], ['fedfunds', 'Fed funds'], ['cpi', 'CPI'], ['corepce', 'Core PCE'], ['unrate', 'Unemployment'], ['gdp', 'GDP']];
  function addStrip(d) {
    if (d.getElementById('p75-ind-strip')) return;
    var head = d.querySelector('.coupon-embed .ce-masthead'); if (!head) return;
    var a = d.createElement('a'); a.id = 'p75-ind-strip'; a.className = 'p75-strip';
    a.href = 'https://www.point75.io/economic-indicators'; a.target = '_top';
    a.setAttribute('aria-label', 'Economic indicators: see all');
    head.insertAdjacentElement('afterend', a);
    fetch('https://news.point75.io/api/indicators').then(function (r) { return r.json(); }).then(function (j) {
      var by = {}; (j.indicators || []).forEach(function (i) { by[i.id] = i; });
      var tiles = STRIP.map(function (t) {
        var i = by[t[0]]; if (!i) return '';
        var daily = t[0] === 't10' || t[0] === 'fedfunds';   // rates: show the date, not a month-on-month change
        var v = i.latest.value, dv = v - i.prior.value, small = Math.abs(dv) < Math.pow(10, -i.dec) / 2;
        var cls = small || !i.bad ? '' : ((dv > 0) === (i.bad === 'up') ? ' bad' : ' good');
        var unit = /^%/.test(i.unit) ? '%' : i.unit.indexOf('K') === 0 ? 'K' : '';
        var fmt = function (x) { return Math.abs(x) >= 1000 ? Math.round(x).toLocaleString('en-US') : x.toFixed(i.dec); };
        return '<div class="st-t"><span class="st-l">' + t[1] + '</span><span class="st-v">' + fmt(v) + unit + '</span>' +
          '<span class="st-c' + (daily ? '' : cls) + '">' + (daily ? 'as of ' + MON3[+i.latest.obs.slice(5, 7) - 1] + ' ' + (+i.latest.obs.slice(8, 10)) : small ? 'unch.' : (dv > 0 ? '▲ ' : '▼ ') + fmt(Math.abs(dv))) + '</span></div>';
      }).join('');
      if (!tiles) { a.remove(); return; }
      a.innerHTML = '<div class="st-head"><span class="st-k">Economic indicators</span><span class="st-go"><span class="st-long">All indicators and rates </span><span class="st-short">See all </span>&rarr;</span></div><div class="st-row">' + tiles + '</div>';
    }).catch(function () { a.remove(); });
  }


  function polishNews() {
    // The embed's iframe can appear late (Hostinger mounts it lazily) and can be re-created, so watch for it
    // instead of polling for a fixed time. Applying is idempotent.
    function apply(f) {
      var d; try { d = f.contentDocument; } catch (e) { return; }
      if (!d || !d.querySelector('.coupon-embed')) return;
      if (!d.getElementById('p75-news-polish')) {
        var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS; d.head.appendChild(l);
        var st = d.createElement('style'); st.id = 'p75-news-polish'; st.textContent = NEWS_CSS; d.head.appendChild(st);
      }
      addStrip(d);
      moveSearch(d, f);
    }
    function scan() {
      document.querySelectorAll('iframe').forEach(function (f) {
        if (!f.p75News) { f.p75News = true; f.addEventListener('load', function () { apply(f); }); }
        apply(f);
      });
    }
    scan();
    if (!window.p75NewsObs && window.MutationObserver) {
      window.p75NewsObs = new MutationObserver(function () {
        if ((location.pathname.replace(/\/+$/, '') || '/') === '/news') scan();
      });
      window.p75NewsObs.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Gold "$" badge in front of the Bonds menu item
  (function bondsBadge() {
    if (document.getElementById('p75-bonds-badge')) return;
    var st = document.createElement('style'); st.id = 'p75-bonds-badge';
    st.textContent = '.block-header a[href$="/bonds"]::before{content:"$";display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;' +
      'border:1.5px solid #C9A227;color:#C9A227;font:800 11px Manrope,system-ui,sans-serif;margin-right:6px;vertical-align:1px;box-sizing:border-box}';
    document.head.appendChild(st);
  })();


  // ---------- Section hubs: never let a sub-menu hide its main page ----------
  // Reads the live Hostinger menu, so titles and order follow whatever is set in the builder.
  var HUB_LABEL = { '/education': 'All Education guides', '/kinetics': 'All of Kinetics', '/bond-summary': 'Bond Summary overview', '/economic-indicators': 'Economic Indicators', 'https://tools.point75.io/market-intelligence': 'All dashboards' };

  // ---------- Sections that go deeper than the menu ----------
  // The menu shows one level (Kinetics > Pulse, Debt Trap, News, Bond Summary, Economic Indicators). Bond Summary's two
  // pages (Daily Summary, Insights) are cards on its landing page, so the tree lives here. Intelligence (on
  // tools.point75.io) holds the three credit dashboards that live on this site; intelMenu adds them to its menu.
  // (Debt Trap's menu entry is added in hubMenus.)
  // It drives the hub pages (hubs/hubs.js), the back / forward arrows and the Previous / Next cards.
  // Order matters: arrows step through each group in this order.
  var INTEL_HREF = 'https://tools.point75.io/market-intelligence';
  var SECTIONS = [
    { href: '/kinetics', text: 'Kinetics', hub: true, kids: [
      { href: '/pulse', text: 'Pulse' },
      { href: '/debt-trap', text: 'Debt Trap' },
      { href: '/news', text: 'News' },
      { href: '/bond-summary', text: 'Bond Summary', hub: true, kids: [
        { href: '/intelligent-summary', text: 'Daily Summary' },
        { href: '/insights', text: 'Insights' }
      ] },
      { href: '/economic-indicators', text: 'Economic Indicators' }
    ] },
    // Intelligence has no hub page here (its overview is the dashboards site); these are its pages on point75.io
    { href: INTEL_HREF, text: 'Intelligence', kids: [
      { href: '/credit-stress', text: 'Credit Stress' },
      { href: '/sector-credit', text: 'Sector Credit' },
      { href: '/lenders', text: 'Lenders' }
    ] }
  ];
  // Every node with pages under it, flattened: { href, text, hub, kids: [{ href, text, kids }] }
  var SECTION_FAMS = (function () {
    var out = [];
    (function walk(list) { list.forEach(function (n) { if (n.kids) { out.push(n); walk(n.kids); } }); })(SECTIONS);
    return out;
  })();
  function sectionNode(path) {
    var node = null, parent = null;
    SECTION_FAMS.forEach(function (f) {
      if (f.href === path) node = f;
      f.kids.forEach(function (k) { if (k.href === path) parent = f; });
    });
    return node ? { node: node, parent: parent } : null;
  }
  // Menu sections (Education...) as read from the live menu, plus the tree above in place of any menu
  // section it covers (Kinetics), so the deeper levels get arrows too.
  function navFamilies(menuFams) {
    var mine = {}; SECTION_FAMS.forEach(function (f) { mine[f.href] = 1; });
    return menuFams.filter(function (f) { return !mine[f.href]; }).concat(SECTION_FAMS);
  }
  function norm(h) { return (h || '').replace(/[?#].*$/, '').replace(/\/+$/, '') || '/'; }
  function families() {
    var out = [];
    document.querySelectorAll('li.block-header-item').forEach(function (li) {
      var ul = li.querySelector(':scope > label > .block-header-item__dropdown-area > ul.block-header-item__dropdown'); if (!ul) return;
      var top = li.querySelector(':scope > label > .block-header-item__item > a.item-content'); if (!top) return;
      var ph = norm(top.getAttribute('href'));
      var kids = [].slice.call(ul.querySelectorAll(':scope > li a.item-content')).filter(function (a) { return !isHub(a, ph); })
        .map(function (a) { return { href: norm(a.getAttribute('href')), text: a.textContent.trim() }; });
      out.push({ li: li, ul: ul, href: norm(top.getAttribute('href')), text: top.textContent.trim(), kids: kids });
    });
    return out;
  }
  // Our line is real only if its link carries our mark AND still points at the main page. On a direct page load
  // Hostinger's menu can finish loading after we add it and recycle our node as one of its own items.
  function isHub(a, parentHref) { return !!a && a.getAttribute('data-p75hub') === '1' && norm(a.getAttribute('href')) === parentHref; }
  // Let the menu finish loading before touching it: Hostinger's Vue app marks its root with data-v-app once it has
  // mounted (hydration done), so add the overview as soon as that appears; otherwise fall back to a 2.5 s wait.
  var HUB_READY = Date.now() + 2500;
  function hubReady() { return Date.now() >= HUB_READY || !!document.querySelector('[data-v-app]'); }
  function hubMenus(fams) {
    fams.forEach(function (f) {
      [].slice.call(f.ul.querySelectorAll(':scope > li')).forEach(function (li) {   // repair recycled nodes
        var a = li.querySelector('a.item-content');
        if (isHub(a, f.href)) return;
        if (li.classList.contains('p75hub')) li.classList.remove('p75hub');
        if (a && a.hasAttribute('data-p75hub')) a.removeAttribute('data-p75hub');
      });
      // Debt Trap has no entry in the site builder's menu, so it is added under Kinetics, right after Pulse,
      // by copying Pulse's own item so it looks and behaves like its neighbours (desktop and phone menus)
      if (f.href === '/kinetics' && !f.ul.querySelector(':scope > li a.item-content[href$="/debt-trap"]')) {
        var pl = [].slice.call(f.ul.querySelectorAll(':scope > li')).filter(function (x) {
          var xa = x.querySelector('a.item-content'); return xa && /\/pulse\/?$/.test(xa.getAttribute('href') || '');
        })[0];
        if (pl) {
          var dl = pl.cloneNode(true); dl.classList.remove('p75hub');
          var da = dl.querySelector('a.item-content');
          da.setAttribute('href', '/debt-trap'); da.removeAttribute('data-qa'); da.removeAttribute('data-p75hub'); da.removeAttribute('aria-current');
          var leaf = da; while (leaf.children.length === 1) leaf = leaf.children[0];
          leaf.textContent = 'Debt Trap';
          pl.parentNode.insertBefore(dl, pl.nextSibling);
        }
      }
      if (!hubReady() || !f.kids.length) return;
      var has = [].slice.call(f.ul.querySelectorAll(':scope > li a.item-content')).some(function (a) { return isHub(a, f.href); });
      if (has) return;
      var first = f.ul.querySelector(':scope > li'); if (!first) return;
      var li = first.cloneNode(true); li.classList.add('p75hub');
      var a = li.querySelector('a.item-content');
      a.setAttribute('href', f.href); a.removeAttribute('data-qa'); a.setAttribute('data-p75hub', '1');
      a.innerHTML = '<span class="p75hub-t">' + escH(HUB_LABEL[f.href] || (f.text + ' overview')) + '</span>';
      f.ul.insertBefore(li, first);
    });
    if (!document.getElementById('p75hub-css')) {
      var st = document.createElement('style'); st.id = 'p75hub-css';
      st.textContent = 'li.p75hub a.item-content,li.p75hub .p75hub-t{color:' + GOLD + '!important;font-weight:700!important;opacity:1!important}' +
        'li.p75hub .p75hub-t:after{content:" \\2192"}' +
        'li.p75hub{border-bottom:1px solid rgba(201,162,39,.35);margin-bottom:4px;padding-bottom:4px}' +
        '.p75crumb{display:block;width:100%;max-width:none;margin:0;background:#111214;padding:18px max(20px,calc((100% - 860px)/2)) 0;box-sizing:border-box;font-family:Manrope,system-ui,sans-serif;text-align:left}' +
        '.p75crumb a{display:inline-flex;align-items:center;gap:8px;color:' + GOLD + ';font-weight:700;font-size:14px;text-decoration:none;border:1px solid rgba(201,162,39,.55);border-radius:99px;padding:7px 14px;background:rgba(201,162,39,.06)}' +
        '.p75crumb a:hover,.p75crumb a:focus-visible{background:rgba(201,162,39,.16);outline:none}' +
        '.p75crumb span{color:#B8B2A5;font-size:13px;margin-left:10px}' +
        '.p75sib{width:100%;max-width:none;margin:0;background:#111214;padding:10px max(20px,calc((100% - 860px)/2)) 44px;box-sizing:border-box;font-family:Manrope,system-ui,sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:12px;align-self:stretch}' +
        '.p75sib a{display:block;text-decoration:none;background:#17181B;border:1px solid #2A2B2F;border-radius:12px;padding:14px 16px;color:#EDE8DC}' +
        '.p75sib a:hover,.p75sib a:focus-visible{border-color:' + GOLD + ';outline:none}' +
        '.p75sib small{display:block;color:#B8B2A5;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px}' +
        '.p75sib b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:18px}' +
        '.p75sib .nx{text-align:right}.p75sib .hub{grid-column:1/-1;text-align:center;background:none;border-style:dashed}' +
        '.p75sib .hub b{font-family:Manrope,sans-serif;font-weight:700;font-size:14px;color:' + GOLD + '}' +
        '@media (max-width:600px){.p75sib{grid-template-columns:1fr;padding:6px 16px 32px}.p75sib .nx{text-align:left}.p75sib>span{display:none}.p75crumb{padding:14px 16px 0}}';
      document.head.appendChild(st);
    }
  }
  var PAGE_HOSTS = '.p75edu, .p75debt, .p75ins, .p75pulse, .p75bonds, .p75ind, .p75cr, .p75hubpg, .p75start, .p75contact';

  // ---------- Page navigation: back / forward at the top of every page in a series ----------
  // One row at the top of the page: back (or previous) on the left, where you are in the middle, next on
  // the right. When that row scrolls away, the same links follow the reader in a slim bar pinned to the top
  // of the screen (under the site header when it stays on screen). The bottom of the page keeps its
  // Previous / Next cards (p75sib).
  //   Essays: "All essays". Pages in a menu section (Education, Bond Summary, Pulse, News...): previous /
  //   next in menu order; the first page goes back to the section overview and the overview goes on to the
  //   first page. NAV_FIX overrides specific pages. Bond Summary and Intelligent Summary articles live in an
  //   iframe sized to its content: they send {type:'nav'} with older/newer and we send {type:'go'} back.
  var HUB_BACK = ['/kinetics'];   // sections whose pages all go back to the section overview
  var TABBED = [INTEL_HREF];  // sections whose pages are tabs of one another (see tabsRow); Bond Summary uses cards
  function tabFamily(path) {
    var out = null;
    SECTION_FAMS.forEach(function (f) {
      if (TABBED.indexOf(f.href) > -1 && (f.href === path || f.kids.some(function (k) { return k.href === path; }))) out = f;
    });
    return out;
  }
  // The tab strip under the top row on every page of a tabbed section: Overview, then each page.
  function tabsRow(path) {
    var row = document.getElementById('p75tabsrow'), f = tabFamily(path);
    if (!f) { if (row) row.remove(); return; }
    var tabs = [{ href: f.href, text: HUB_LABEL[f.href] || 'Overview' }].concat(f.kids.map(function (k) { return { href: k.href, text: k.text }; }));
    var key = path + '|' + tabs.length;
    if (!row || row.getAttribute('data-k') !== key) {
      if (row) row.remove();
      if (!document.getElementById('p75tabs-css')) {
        var st = document.createElement('style'); st.id = 'p75tabs-css';
        st.textContent =
          '#p75tabsrow{display:flex!important;gap:8px;overflow-x:auto;scrollbar-width:none;width:100%;box-sizing:border-box;margin:0;' +
            'padding:10px max(20px,calc((100% - 860px)/2)) 14px;background:#111214;border-bottom:1px solid #2A2B2F;font-family:Manrope,system-ui,sans-serif}' +
          '#p75tabsrow::-webkit-scrollbar{display:none}' +
          '#p75tabsrow a{flex:none;display:inline-flex!important;align-items:center;min-height:40px;padding:0 17px;border-radius:999px;border:1px solid #3A3C42;' +
            'color:#D9D3C6!important;font-weight:700;font-size:14.5px;text-decoration:none!important;white-space:nowrap;transition:border-color .15s,background .15s,color .15s}' +
          '#p75tabsrow a:hover{border-color:#C9A227;color:#fff!important}' +
          '#p75tabsrow a.on{background:#C9A227;border-color:#C9A227;color:#111214!important}' +
          '#p75tabsrow a:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
          '@media (max-width:600px){#p75tabsrow{padding:8px 16px 12px;gap:6px}#p75tabsrow a{min-height:38px;padding:0 14px;font-size:14px}}';
        document.head.appendChild(st);
      }
      row = document.createElement('nav'); row.id = 'p75tabsrow'; row.setAttribute('aria-label', f.text + ' pages'); row.setAttribute('data-k', key);
      row.innerHTML = tabs.map(function (t) {
        var on = t.href === path;
        return '<a href="' + escH(t.href) + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + escH(t.text) + '</a>';
      }).join('');
    }
    var top = document.getElementById('p75tn');
    if (top && top.parentNode && top.nextSibling !== row) top.parentNode.insertBefore(row, top.nextSibling);
    var on = row.querySelector('a.on');   // phones: keep the current tab in view inside the strip
    if (on && !row.getAttribute('data-scrolled')) { row.setAttribute('data-scrolled', '1'); row.scrollLeft = Math.max(0, on.offsetLeft - 16); }
  }
  var NAV_FIX = {
    // Start here sits outside the menu sections, so it had no way back; it is reached from the homepage
    '/start-here': { prev: { href: '/', text: 'Journal', title: 'Back to the Journal' } },
    '/contact': { prev: { href: '/', text: 'Journal', title: 'Back to the Journal' } }
  };
  var navFrame = null;
  window.addEventListener('message', function (e) {
    var m = e.data;
    if (!m || m.p75 !== true || m.type !== 'nav') return;
    navFrame = m.view === 'article' ? { src: e.source, path: norm(location.pathname), prev: m.older || null, mid: m.up || null, next: m.newer || null } : null;
    var path = norm(location.pathname);
    pageNav(path, navSpecFor(path, navFamilies(families())));
  });
  function navSpecFor(path, fams) {
    if (navFrame && navFrame.path === path) return { prev: navFrame.prev, mid: navFrame.mid, next: navFrame.next, frame: true };
    // Pages inside a tabbed section (Bond Summary) move between each other with the tab strip, so their top
    // row is the section's own: back to Kinetics overview, on to the next Kinetics page.
    // (Intelligence is a top-level section on another site, so its pages keep their own previous / next.)
    var tf = tabFamily(path); if (tf && tf.href !== path && tf.href.charAt(0) === '/') path = tf.href;
    if (path === '/') return null;
    var s = {};
    if (EXCLUDED.indexOf(path) === -1 && document.querySelector('.block-blog-header')) s.prev = { href: '/', text: 'All essays' };
    fams.forEach(function (f) {
      f.kids.forEach(function (k, j) {
        if (k.href !== path) return;
        // back from the first page: to a landing page "overview", or by name to a page that has its own content.
        // Kinetics pages (Pulse, News, Bond Summary, Economic Indicators) stand on their own rather than as a
        // reading sequence, so each goes back to the Kinetics overview.
        var toHub = !j || HUB_BACK.indexOf(f.href) > -1;
        if (HUB_BACK.indexOf(f.href) > -1) s.sibling = true;
        s.prev = toHub ? { href: f.href, text: f.text + (f.hub === false ? '' : ' overview') } : f.kids[j - 1];
        s.next = f.kids[j + 1] || null;
        s.mid = { href: f.href, text: f.text, title: HUB_LABEL[f.href] || (f.text + ' overview') };
      });
    });
    // A page with pages under it goes forward into the first one. Landing pages (hub) already show their
    // pages as cards, so their arrows move on to the next section instead, when there is one.
    // (In a HUB_BACK section, next stays with the section's next page: Pulse -> News, not into Debt Trap.)
    fams.forEach(function (f) { if (f.href === path && f.kids.length && !((f.hub || s.sibling) && s.next)) s.next = f.kids[0]; });
    delete s.sibling;
    var fix = NAV_FIX[path]; if (fix) for (var k in fix) s[k] = fix[k];
    // Arrived from the homepage (its Pulse strip or Explore cards, see home/home.js): back leads home
    var fh = null; try { fh = sessionStorage.getItem('p75fromHome'); } catch (err) {}
    if (fh && fh === path) s.prev = { href: '/', text: 'Journal', title: 'Back to the Journal' };
    return (s.prev || s.next) ? s : null;
  }
  function navCss() {
    if (document.getElementById('p75nav-css')) return;
    var G = GOLD, st = document.createElement('style'); st.id = 'p75nav-css';
    st.textContent =
      // top row
      '#p75tn{display:block!important;width:100%;max-width:none;margin:0;background:#111214;padding:18px max(20px,calc((100% - 860px)/2)) 4px;box-sizing:border-box;font-family:Manrope,system-ui,sans-serif}' +
      '#p75tn .r{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:10px;min-height:38px}' +
      '#p75tn a.pill{display:inline-flex!important;box-sizing:border-box;align-items:center;gap:8px;min-width:0;max-width:100%;justify-self:start;color:' + G + '!important;font-weight:700;font-size:14px;line-height:1.2;text-decoration:none!important;' +
        'border:1px solid rgba(201,162,39,.55);border-radius:99px;padding:8px 15px;background:rgba(201,162,39,.06);opacity:1!important;visibility:visible!important;transition:background .15s}' +
      '#p75tn a.pill:hover,#p75tn a.pill:focus-visible{background:rgba(201,162,39,.18)!important;color:' + G + '!important;outline:none}' +
      '#p75tn a.pill span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:inherit!important}' +
      '#p75tn a.nx{justify-self:end}#p75tn a.up{justify-self:center}' +
      // middle: the section's home page, drawn as a gold ring with a dot (the "." in Point75)
      '#p75tn a.mid{display:inline-flex!important;align-items:center;justify-content:center;box-sizing:border-box;width:36px;height:36px;padding:0;border:1.5px solid ' + G + ';border-radius:50%;' +
        'background:transparent;text-decoration:none!important;opacity:1!important;visibility:visible!important;transition:background .15s}' +
      '#p75tn a.mid:hover,#p75tn a.mid:focus-visible{background:rgba(201,162,39,.16);outline:none}' +
      '.p75dot{display:block;width:6px;height:6px;border-radius:50%;background:' + G + '}' +
      // pinned bar
      '#p75tf{position:fixed!important;left:50%;top:10px;z-index:60;display:flex!important;max-width:calc(100vw - 24px);transform:translate(-50%,-14px);opacity:0;pointer-events:none;' +
        'background:rgba(17,18,20,.95);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(201,162,39,.6);border-radius:99px;' +
        'box-shadow:0 6px 22px rgba(0,0,0,.45);font-family:Manrope,system-ui,sans-serif;transition:opacity .2s,transform .2s}' +
      '#p75tf.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}' +
      '#p75tf a{display:flex!important;align-items:center;gap:6px;min-width:0;padding:9px 15px;color:' + G + '!important;font-weight:700;font-size:13.5px;line-height:1.2;text-decoration:none!important;white-space:nowrap;opacity:1!important;visibility:visible!important}' +
      '#p75tf a+a{border-left:1px solid rgba(201,162,39,.3)}' +
      '#p75tf a:first-child{border-radius:99px 0 0 99px}#p75tf a:last-child{border-radius:0 99px 99px 0}#p75tf a:only-child{border-radius:99px}' +
      '#p75tf a.mid{justify-content:center;padding:9px 17px}' +
      '#p75tf .p75dot{box-shadow:0 0 0 5px rgba(17,18,20,.95),0 0 0 6.5px ' + G + '}' +
      '#p75tf a:hover,#p75tf a:focus-visible{background:rgba(201,162,39,.16)!important;outline:none}' +
      '#p75tf span{min-width:0;overflow:hidden;text-overflow:ellipsis;max-width:230px;color:inherit!important}' +
      '@media (max-width:600px){#p75tn{padding:14px 16px 2px}#p75tn a.pill{font-size:13.5px;padding:8px 12px}#p75tn a.mid{width:34px;height:34px}' +
        '#p75tf a{padding:9px 12px;font-size:13px}#p75tf span{max-width:30vw}}' +
      // Wide screens: the row takes no height; back / next become slim tabs in the side margins, halfway down the screen
      '@media (min-width:1240px){#p75tn{padding:0!important;height:0;overflow:visible}#p75tn .r{display:block;min-height:0}' +
        '#p75tn a.pill{position:fixed;top:50%;z-index:40;flex-direction:column;gap:6px;width:92px;padding:12px 8px;margin-top:-44px;border-radius:16px;text-align:center;font-size:12px;line-height:1.25;' +
          'background:rgba(17,18,20,.88);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}' +
        '#p75tn a.pill span{white-space:normal;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}' +
        '#p75tn a.pill i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;border:1.5px solid ' + G + ';font-style:normal;font-size:16px}' +
        '#p75tn a.pv{left:max(12px,calc((100vw - 1100px)/2 - 108px))}#p75tn a.nx{right:max(12px,calc((100vw - 1100px)/2 - 108px))}' +
        '#p75tn a.nx{flex-direction:column-reverse}#p75tn a.up{position:static;margin:0}}' +
      '@media (max-width:1239px){#p75tn{padding-top:8px;padding-bottom:0}#p75tn .r{min-height:34px}#p75tn a.pill{padding:6px 13px}#p75tn a.pill i{font-style:normal}}' +
      '@media print{#p75tn,#p75tf{display:none!important}}';
    document.head.appendChild(st);
  }
  function navHref(s, it) { return s.frame ? it.hash : it.href; }
  function navAttrs(s, it) {
    return ' href="' + escH(navHref(s, it)) + '" title="' + escH(it.title || it.text) + '" aria-label="' + escH(it.title || it.text) + '"' + (s.frame ? ' data-hash="' + escH(it.hash) + '"' : '');
  }
  function pageNav(path, s) {
    var top = document.getElementById('p75tn'), bar = document.getElementById('p75tf');
    if (!s) { if (top) top.remove(); if (bar) bar.remove(); return; }
    navCss();
    var key = path + '|' + JSON.stringify([s.prev, s.mid, s.next]);
    if (!top || top.getAttribute('data-k') !== key) {
      if (top) top.remove();
      top = document.createElement('div'); top.id = 'p75tn'; top.setAttribute('role', 'navigation'); top.setAttribute('aria-label', 'Page navigation'); top.setAttribute('data-k', key);
      top.innerHTML = '<div class="r">' +
        (s.prev ? '<a class="pill pv"' + navAttrs(s, s.prev) + '><i aria-hidden="true">&larr;</i><span>' + escH(s.prev.text) + '</span></a>' : '<span></span>') +
        // Just two pills: back on the left, next on the right. (The gold-dot link to the section's home page
        // and the floating copy of this row that followed the reader down the page are gone.) An article
        // inside an iframe (Daily Summary) keeps its "up to the list" link as a plain pill in the middle.
        (s.frame && s.mid ? '<a class="pill up"' + navAttrs(s, s.mid) + '><span>' + escH(s.mid.text || 'All') + '</span></a>' : '<span></span>') +
        (s.next ? '<a class="pill nx"' + navAttrs(s, s.next) + '><span>' + escH(s.next.text) + '</span><i aria-hidden="true">&rarr;</i></a>' : '<span></span>') + '</div>';
    }
    if (bar) bar.remove();
    var host = document.querySelector(PAGE_HOSTS);
    var parent = host ? host.parentNode : document.querySelector('.page__blocks');
    if (parent) {
      if (host) { if (top.nextSibling !== host) parent.insertBefore(top, host); }
      else if (parent.firstChild !== top) parent.insertBefore(top, parent.firstChild);
    }
  }
  // (The floating bar that used to follow the reader down the page has been removed; see pageNav.)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#p75tn a[data-hash], #p75tf a[data-hash]');
    if (!a || !navFrame || !navFrame.src) return;
    e.preventDefault();
    try { navFrame.src.postMessage({ p75: true, type: 'go', hash: a.getAttribute('data-hash') }, '*'); } catch (err) {}
  });

  // ---------- Smooth page changes ----------
  // The site is a single-page app: its own menu links swap the page in place. A plain link (like the ones we
  // add) makes the browser reload the whole site instead: a white flash while the header, fonts and scripts
  // load again. So our links borrow the site's own menu link to the same page when there is one, and we
  // redraw our parts as soon as the address changes rather than on the next one-second tick.
  function siteLink(path) {
    var list = document.querySelectorAll('.block-header a[href], header a[href]');
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (a.closest('#p75tn, #p75tf, #p75sib, #p75tabsrow') || a.hasAttribute('data-p75hub')) continue;
      if (norm(a.getAttribute('href')) === path) return a;
    }
    return null;
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('#p75tn a[href], #p75tf a[href], #p75tabsrow a[href], #p75sib a[href], .p75d a[href], .p75edu a[href], .p75pulse a[href], .p75debt a[href], .p75cr a[href], .p75ind a[href], .p75ins a[href], .p75bonds a[href], .p75hubpg a[href], .p75start a[href]');
    if (!a || a.hasAttribute('data-hash') || a.target === '_blank') return;
    var href = a.getAttribute('href') || '';
    if (!/^\/(?!\/)/.test(href) || /[?#]/.test(href)) return;      // same-site page links only
    var path = norm(href);
    if (path === norm(location.pathname)) return;
    var site = siteLink(path);
    if (!site) return;                                             // not in the menu (Credit Stress...): normal page load
    e.preventDefault();
    site.click();
  }, true);
  var soonT = [];
  function soon() {
    soonT.forEach(clearTimeout);
    soonT = [0, 80, 250, 600].map(function (ms) { return setTimeout(function () { try { update(); } catch (err) {} }, ms); });
  }
  ['pushState', 'replaceState'].forEach(function (m) {
    var orig = history[m];
    if (typeof orig !== 'function' || orig.p75) return;
    var wrapped = function () { var r = orig.apply(this, arguments); soon(); return r; };
    wrapped.p75 = true; history[m] = wrapped;
  });
  window.addEventListener('popstate', soon);

  // Bottom of section pages: Previous / Next cards and a link back to the overview
  function familyLinks(path, fams) {
    var fam = null, i = -1;
    fams.forEach(function (f) { f.kids.forEach(function (k, j) { if (k.href === path) { fam = f; i = j; } }); });
    var old = document.getElementById('p75crumb'); if (old) old.remove();
    var sib = document.getElementById('p75sib');
    // Kinetics pages (top row) and tabbed sections (tab strip) have their own navigation: no bottom cards there.
    // They stay on reading sequences such as the Education guides.
    if (!fam || HUB_BACK.indexOf(fam.href) > -1 || TABBED.indexOf(fam.href) > -1) { if (sib) sib.remove(); return; }
    var host = document.querySelector(PAGE_HOSTS);
    if (!host) return;                                   // bottom links wait until the page has drawn
    var parent = host.parentNode;
    var key = path + '|v2|' + fam.kids.map(function (k) { return k.href; }).join(',');
    if (!sib || sib.getAttribute('data-k') !== key) {
      if (sib) sib.remove();
      var prev = fam.kids[i - 1], next = fam.kids[i + 1];
      // A page with its own sub-pages (Pulse > Debt Trap) goes forward into them, matching the top arrow
      var own = null; fams.forEach(function (f) { if (f.href === path && f.hub === false && f.kids.length) own = f; });
      if (own) next = own.kids[0];
      sib = document.createElement('nav'); sib.id = 'p75sib'; sib.className = 'p75sib'; sib.setAttribute('aria-label', 'More in this section'); sib.setAttribute('data-k', key);
      sib.innerHTML = (prev ? '<a href="' + prev.href + '"><small>&larr; Previous</small><b>' + escH(prev.text) + '</b></a>' : '<span></span>') +
        (next ? '<a class="nx" href="' + next.href + '"><small>Next &rarr;</small><b>' + escH(next.text) + '</b></a>' : '<span></span>') +
        '<a class="hub" href="' + fam.href + '"><b>' + escH(HUB_LABEL[fam.href] || ('Back to ' + fam.text)) + '</b></a>';
    }
    if (host.nextSibling !== sib) parent.insertBefore(sib, host.nextSibling);
  }

  // ---------- Reading levels and Start here ----------
  // Every data page and guide carries an Easy / Medium / Advanced label beside its name (essays already show
  // theirs on the cards). Advanced pages add a line pointing to the Bond Dictionary for the terms they use.
  var PAGE_LEVEL = {
    '/education': 'Easy', '/bond-introduction': 'Easy', '/bond-history': 'Easy', '/bond-types': 'Easy', '/cash-logistics': 'Easy',
    '/bond-dictionary': 'Easy', '/bond-players': 'Easy', '/bond-fortunes': 'Easy',
    '/pulse': 'Medium', '/economic-indicators': 'Medium',
    '/debt-trap': 'Advanced', '/credit-stress': 'Advanced', '/sector-credit': 'Advanced', '/lenders': 'Advanced', '/insights': 'Advanced'
  };
  // Terms each Advanced page leans on; each links to its Bond Dictionary entry
  var PAGE_TERMS = {
    // (Debt Trap, a One Shot page, has no help box: it sat between the title and the update note)
    '/credit-stress': ['PIK', 'delinquency'], '/sector-credit': ['Debt to EBITDA', 'interest coverage'],
    '/lenders': ['commercial paper', 'money market fund'], '/insights': ['duration', 'credit spread']
  };
  (function levelCss() {
    if (document.getElementById('p75-lvl')) return;
    var st = document.createElement('style'); st.id = 'p75-lvl';
    st.textContent =
      '.p75lvl{display:inline-block;vertical-align:middle;margin-left:12px;border:1px solid;border-radius:99px;padding:2px 10px;font:800 12px/1.5 Manrope,system-ui,sans-serif;letter-spacing:.02em;text-transform:none}' +
      '.p75lvl--easy{border-color:#6fa8a0;color:#9fd0c8}.p75lvl--medium{border-color:#c9a227;color:#e0b53a}.p75lvl--advanced{border-color:#d08a6a;color:#e8a98a}' +
      '.p75start .p75lvl{margin-left:0}' +
      '.p75help{display:block;margin:14px 0 4px;padding:12px 16px;border:1px solid #2A2B2F;background:#17181B;border-radius:10px;font:500 14.5px/1.5 Manrope,system-ui,sans-serif;color:#D9D3C6;max-width:640px}' +
      '.p75help a{color:#fff;font-weight:700;text-decoration:underline;text-decoration-color:rgba(201,162,39,.6);text-underline-offset:3px}' +
      '.p75help a.go{color:#C9A227;text-decoration:none;font-weight:800;white-space:nowrap;margin-left:6px}' +
      '.p75cta{max-width:1224px;margin:0 auto 30px;flex:none;width:calc(100% - 40px);box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 16px;' +
        'border:1px solid rgba(201,162,39,.5);background:#1a1914;border-radius:12px;padding:14px 20px;text-decoration:none!important;font:500 15.5px/1.5 Manrope,system-ui,sans-serif;color:#D9D3C6!important}' +
      '.p75cta b{color:#fff;font-weight:700}.p75cta .go{color:#C9A227;font-weight:800;white-space:nowrap}' +
      '.p75cta:hover,.p75cta:focus-visible{background:#221f15;outline:none}';
    document.head.appendChild(st);
  })();
  function levelBadges(path) {
    var lvl = PAGE_LEVEL[path]; if (!lvl) return;
    var host = document.querySelector('.p75pulse, .p75debt, .p75cr, .p75ind, .p75ins, .p75edu');
    var h1 = host && host.querySelector('h1'); if (!h1 || host.querySelector('.p75lvl')) return;
    var b = '<span class="p75lvl p75lvl--' + lvl.toLowerCase() + '" title="Reading level: see Start here">' + lvl + '</span>';
    var eb = h1.previousElementSibling;
    if (eb && /eyebrow/.test(eb.className)) eb.insertAdjacentHTML('beforeend', b);
    else h1.insertAdjacentHTML('beforebegin', '<div style="margin-bottom:6px">' + b.replace('margin-left:12px', '') + '</div>');
    var terms = PAGE_TERMS[path];
    if (lvl === 'Advanced' && terms) {
      var link = function (t) { return '<a href="/bond-dictionary?q=' + encodeURIComponent(t) + '">' + t + '</a>'; };
      var after = h1.nextElementSibling && h1.nextElementSibling.tagName === 'P' ? h1.nextElementSibling : h1;
      after.insertAdjacentHTML('afterend', '<p class="p75help">New to terms like ' + link(terms[0]) + ' or ' + link(terms[1]) +
        '? The Bond Dictionary explains them in plain English. <a class="go" href="/bond-dictionary">Open it &rarr;</a></p>');
    }
  }
  function startHereLine(path) {
    if (path !== '/' || document.querySelector('.p75cta')) return;
    var list = document.querySelector('.block-blog-list');
    if (!list) return;
    // First item of the blog list (a flex column), so it sits just above the cards on the dark background
    list.insertAdjacentHTML('afterbegin', '<a class="p75cta" href="/start-here"><span><b>New to bonds?</b> Three short paths, from the basics to the live market.</span><span class="go">Start here &rarr;</span></a>');
  }

  // ---------- Desktop menu (option 3): bigger, bolder items, gold active underline, Tools as a gold button
  // beside Search, and a "Start here" invitation first in the row. Every item is 40px tall with its text
  // centred, so words, buttons and pills share one centre line. ----------
  (function menuCss() {
    if (document.getElementById('p75-menu3')) return;
    var D = '.block-header-layout-desktop .block-header__nav-links', TOP = D + '>.block-header-item>.block-header-item__label>';
    var st = document.createElement('style'); st.id = 'p75-menu3';
    st.textContent =
      // The header is capped at 1224px and the logo takes 356px of it, so the menu has 836px at most: 11px gaps
      // keep every item and Search on one line (at 14px Search wrapped to a second row, a 36px band under the logo)
      D + '{align-items:center!important;gap:11px!important}' +
      // Narrower windows (the header narrows below ~1270px): keep the menu on one line by dropping the
      // "Start here" pill (it is also on the homepage), then a smaller logo and an icon-only Search
      '@media (max-width:1240px){' + D + '{gap:8px!important}' + D + '>.p75start-li{display:none!important}}' +
      '@media (max-width:1100px){.block-header-layout-desktop .block-header-logo__image{height:46px!important}' +
        D + ' .p75s-btn{font-size:0!important;gap:0!important;width:40px!important;padding:0!important;justify-content:center!important}' + D + ' .p75s-btn kbd{display:none!important}}' +
      TOP + '.item-content-wrapper{display:inline-flex!important;align-items:center!important;height:40px!important}' +
      TOP + '.item-content-wrapper>.item-content{font-size:15px!important;font-weight:600!important;color:#fff!important;letter-spacing:.01em}' +
      TOP + '.item-content-wrapper--active>.item-content{text-decoration:underline!important;text-decoration-color:#C9A227!important;text-decoration-thickness:2px!important;text-underline-offset:9px!important}' +
      TOP + '.item-content-wrapper>.item-content:hover{color:#E0B53A!important}' +
      D + ' .item-content__icon-container svg,' + D + ' .item-content__icon-container svg *{fill:#C9A227!important;color:#C9A227!important}' +
      D + '>.p75s-li{order:6;height:auto!important;align-self:center!important;margin-left:0!important}' +
      D + '>.p75tools-li .item-content{display:inline-flex!important;align-items:center;height:40px;padding:0 18px!important;border-radius:20px;background:#C9A227!important;color:#111214!important;font-weight:800!important;font-size:15px!important;text-decoration:none!important}' +
      D + '>.p75tools-li .item-content:hover{background:#E0B53A!important;color:#111214!important}' +
      // the general menu-link rules above (TOP ... .item-content, and its :hover) are more specific than the two Tools
      // rules, so they won: white text on the gold button, and gold-on-gold (invisible) text on hover. Match them and add one class.
      D + '>.p75tools-li.block-header-item>.block-header-item__label>.item-content-wrapper>.item-content,' +
      D + '>.p75tools-li.block-header-item>.block-header-item__label>.item-content-wrapper>.item-content:hover,' +
      D + '>.p75tools-li.block-header-item>.block-header-item__label>.item-content-wrapper>.item-content:focus-visible{color:#111214!important}' +
      D + ' .p75s-btn{height:40px;padding:0 12px;font-size:15px;font-weight:700;border-color:rgba(201,162,39,.8)}' +
      D + '>.p75start-li{order:-1;list-style:none}' +
      D + '>.p75start-li a{display:inline-flex;align-items:center;height:32px;padding:0 10px;border:1px dashed rgba(201,162,39,.6);border-radius:99px;color:#C9A227!important;font:700 13.5px Manrope,system-ui,sans-serif;text-decoration:none!important;white-space:nowrap}' +
      D + '>.p75start-li a:hover,' + D + '>.p75start-li a:focus-visible{border-style:solid;outline:none}' +
      // phone menu: Tools in gold so it stands out there too
      '.block-header-layout-mobile .p75tools-li .item-content{color:#C9A227!important}' +
      // phone header: 12px above and below the logo instead of 24px, since it stays pinned while reading
      '.block-header-layout-mobile{padding-top:12px!important;padding-bottom:12px!important}' +
      // desktop header: 14px above and below instead of 30px, logo 58px tall instead of 73px (133px -> 101px)
      '.block-header-layout-desktop{padding-top:10px!important;padding-bottom:8px!important}' +
      '.block-header-layout-desktop .block-header-logo__image{height:58px!important;width:auto!important;max-width:none!important}';
    document.head.appendChild(st);
  })();
  // ---------- Journal cards: quieter type so the page invites reading instead of shouting.
  // Titles use the serif's real weight (it has no bold, so 700 was a thickened fake), summaries are
  // smaller and capped at three lines, the meta line is smaller, and rows get more air. ----------
  (function cardCss() {
    if (document.getElementById('p75-cards')) return;
    var C = '.block-blog-list .block-blog-list-item';
    var st = document.createElement('style'); st.id = 'p75-cards';
    st.textContent =
      C + ' .block-blog-list-item__title{font-size:22px!important;font-weight:400!important;line-height:1.28!important;letter-spacing:-.005em}' +
      C + ' .block-blog-list-item__description{font-size:15.5px!important;line-height:1.6!important;color:#C4BEB1!important;display:-webkit-box!important;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}' +
      C + ' .blog-list-item-meta__author-name,' + C + ' .blog-list-item-meta__subtitle,' + C + ' .blog-list-item-meta__subtitle *{font-size:13px!important}' +
      '.block-blog-list__list{row-gap:56px!important}';
    document.head.appendChild(st);
  })();
  // ---------- Journal gallery: picture and title only. A small line above each title carries the level and
  // reading time; an Editor's pick wears a gold tag on its painting, and the newest pick is featured large.
  // On hover (desktop) the painting dims and the essay's own closing question appears as a reason to click. ----------
  (function galleryCss() {
    if (document.getElementById('p75-gal')) return;
    var I = '.block-blog-list .block-blog-list-item';
    var st = document.createElement('style'); st.id = 'p75-gal';
    st.textContent =
      '.block-blog-list__list{grid-auto-flow:row dense!important;row-gap:44px!important}' +
      I + ' .block-blog-list-item__description,' + I + ' .blog-list-item-meta,' + I + ' p.categories{display:none!important}' +
      I + ' .block-blog-list-item__content{display:flex!important;flex-direction:column;gap:10px}' +
      I + ' .p75cm{display:flex;align-items:center;gap:10px;font:500 12.5px Manrope,system-ui,sans-serif;color:#A9A396;margin-top:4px}' +
      I + ' .p75cm .p75lvl{margin-left:0}' +
      I + ' .block-blog-list-item__cover-image-wrapper{overflow:hidden;border-radius:4px}' +
      I + ' .p75pick{position:absolute;top:12px;left:12px;z-index:2;background:#C9A227;color:#111214;font:800 11.5px Manrope,system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;border-radius:3px;padding:4px 9px}' +
      I + ' .p75hook{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;gap:12px;padding:22px;background:rgba(17,18,20,.78);opacity:0;transition:opacity .25s;pointer-events:none}' +
      I + ' .p75hook i{font:italic 400 19px/1.4 "Hedvig Letters Serif",Georgia,serif;color:#EDE8DC}' +
      I + ' .p75hook b{font:800 13.5px Manrope,system-ui,sans-serif;color:#C9A227}' +
      '@media (hover:hover){' + I + ':hover .p75hook{opacity:1}' + I + ':hover .block-blog-list-item__title{color:#E0B53A!important}}' +
      I + '.p75feat{grid-column:span 2;grid-row:span 2}' +
      I + '.p75feat .block-blog-list-item__cover-image-container{height:auto!important;flex:1 1 auto;display:flex!important;flex-direction:column}' +
      I + '.p75feat .block-blog-list-item__cover-image-wrapper{height:auto!important;flex:1 1 auto;min-height:420px}' +
      I + '.p75feat .block-blog-list-item__title{font-size:34px!important;line-height:1.15!important}' +
      I + '.p75feat .p75hook i{font-size:24px}' +
      '@media (max-width:920px){' + I + '.p75feat{grid-column:auto;grid-row:auto}' + I + '.p75feat .block-blog-list-item__cover-image-wrapper{min-height:0}' +
        I + '.p75feat .block-blog-list-item__title{font-size:24px!important}}';
    document.head.appendChild(st);
  })();
  function hookFor(href) {
    var m = /<em>([\s\S]*?)<\/em>/.exec(TLDR[href] || '');
    return m ? m[1].replace(/<[^>]+>/g, '') : '';
  }
  function journalGallery(path) {
    if (path !== '/') return;
    var featured = false;
    document.querySelectorAll('.block-blog-list .block-blog-list-item').forEach(function (it) {
      var link = it.querySelector('a.block-blog-list-item__cover-image-container');
      var href = link ? (link.getAttribute('href') || '').replace(/\/+$/, '') : '';
      if (!featured && PICKS.indexOf(href) > -1) { it.classList.add('p75feat'); featured = true; }
      if (it.getAttribute('data-p75c')) return;
      var wrap = it.querySelector('.block-blog-list-item__cover-image-wrapper'), content = it.querySelector('.block-blog-list-item__content');
      if (!wrap || !content) return;
      it.setAttribute('data-p75c', '1');
      var rt = '';
      it.querySelectorAll('.blog-list-item-meta__subtitle span').forEach(function (sp) { if (/min read/.test(sp.textContent)) rt = sp.textContent.trim(); });
      var lvl = LEVELS[href];
      content.insertAdjacentHTML('afterbegin', '<div class="p75cm">' + (lvl ? '<span class="p75lvl p75lvl--' + lvl.toLowerCase() + '">' + lvl + '</span>' : '') + '<span>' + rt + '</span></div>');
      if (PICKS.indexOf(href) > -1) wrap.insertAdjacentHTML('beforeend', '<span class="p75pick">&#9733; Editor&#39;s pick</span>');
      var hook = hookFor(href);
      wrap.insertAdjacentHTML('beforeend', '<div class="p75hook" aria-hidden="true">' + (hook ? '<i>' + hook + '</i>' : '') + '<b>Read the essay &rarr;</b></div>');
    });
  }
  // Intelligence (a link to tools.point75.io) gets a dropdown of its tools, like Kinetics and Education
  // (hubMenus adds the "Intelligence overview" link at the top, as it does for the others).
  // The site styles its dropdowns through scoped attributes, so the pieces are copied from an existing
  // dropdown (its arrow, panel and one item) and added to the Intelligence item in place.
  var INTEL_TOOLS = [
    ['Treasury Finder', 'https://tools.point75.io/market-intelligence/treasury-finder'],
    ['Congressional Trading', 'https://tools.point75.io/market-intelligence/congressional-trading'],
    ['AI Investment', 'https://tools.point75.io/market-intelligence/ai-investment'],
    // the credit dashboards that live on point75.io (they used to sit under Bond Summary)
    ['Credit Stress', '/credit-stress'],
    ['Sector Credit', '/sector-credit'],
    ['Lenders', '/lenders']
  ];
  function intelMenu(ul) {
    var a = ul.querySelector(':scope>.block-header-item>.block-header-item__label a.item-content[href*="tools.point75.io/market-intelligence"]');
    if (!a) return;
    var li = a.closest('li'), label = li.querySelector(':scope>.block-header-item__label');
    if (!label || label.querySelector(':scope>.block-header-item__dropdown-area')) return;
    var tpl = null;
    [].forEach.call(ul.children, function (x) { if (!tpl && x !== li && x.querySelector(':scope>.block-header-item__label>.block-header-item__dropdown-area')) tpl = x; });
    if (!tpl) return;
    var tl = tpl.querySelector(':scope>.block-header-item__label');
    var cb = tl.querySelector(':scope>input'); if (cb && !label.querySelector(':scope>input')) label.insertBefore(cb.cloneNode(true), label.firstChild);
    var wrap = label.querySelector(':scope>.item-content-wrapper'), icon = tl.querySelector('.item-content__icon-container-wrapper');
    if (wrap) { wrap.setAttribute('aria-haspopup', 'true'); if (icon && !wrap.querySelector('.item-content__icon-container-wrapper')) wrap.appendChild(icon.cloneNode(true)); }
    var area = tl.querySelector(':scope>.block-header-item__dropdown-area').cloneNode(true), list = area.querySelector('ul');
    var item = null; [].forEach.call(list.children, function (x) { if (!item && !x.classList.contains('p75hub')) item = x; });
    if (!item) return;
    list.innerHTML = '';
    INTEL_TOOLS.forEach(function (t) {
      var c = item.cloneNode(true), link = c.querySelector('a.item-content'); if (!link) return;
      link.setAttribute('href', t[1]); link.textContent = t[0]; link.removeAttribute('data-qa');
      if (t[1].charAt(0) === '/') { link.removeAttribute('target'); link.removeAttribute('rel'); if (norm(location.pathname) === t[1]) link.setAttribute('aria-current', 'page'); }
      else { link.setAttribute('target', a.getAttribute('target') || ''); if (a.getAttribute('rel')) link.setAttribute('rel', a.getAttribute('rel')); }
      c.classList.remove('p75hub'); c.removeAttribute('data-p75hub');
      list.appendChild(c);
    });
    label.appendChild(area);
    li.classList.add('p75intel-li');
  }
  function decorateMenu() {
    document.querySelectorAll('.block-header__nav-links').forEach(function (ul) {
      intelMenu(ul);
      // The gold button is the link to the Tools home page only (tools.point75.io or tools.point75.io/), not to
      // pages inside it such as Intelligence (tools.point75.io/market-intelligence)
      var links = ul.querySelectorAll(':scope>.block-header-item>.block-header-item__label a.item-content[href*="tools.point75.io"]');
      [].forEach.call(links, function (a) {
        var home = /^https?:\/\/tools\.point75\.io\/?([?#].*)?$/.test(a.getAttribute('href') || '');
        a.closest('li').classList.toggle('p75tools-li', home);
      });
      if (!ul.closest('.block-header-layout-mobile') && !ul.querySelector(':scope>.p75start-li'))
        ul.insertAdjacentHTML('afterbegin', '<li class="p75start-li"><a href="/start-here">Start here &rarr;</a></li>');
    });
  }

  function update() {
    var path = location.pathname.replace(/\/+$/, '') || '/';

    // Site search (search/search.js): a Search button in the header and the mobile menu, and "/" to open
    if (window.P75SEARCH) window.P75SEARCH.mount();
    else if (!document.getElementById('p75s-js')) {
      var sj = document.createElement('script'); sj.id = 'p75s-js';
      sj.src = 'https://rahulmsaxena.github.io/point75-site/search/search.js?v=' + Math.floor(Date.now() / 36e5);
      sj.onload = function () { window.P75SEARCH && window.P75SEARCH.mount(); };
      document.body.appendChild(sj);
    }
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
      // "Came from the homepage" lasts only for the page it was set for (see navSpecFor)
      try { if (sessionStorage.getItem('p75fromHome') !== path) sessionStorage.removeItem('p75fromHome'); } catch (err) {}
    }

    var menuFams = families(); hubMenus(menuFams);
    var fams = navFamilies(menuFams); familyLinks(path, fams);
    if (navFrame && navFrame.path !== path) navFrame = null;
    pageNav(path, navSpecFor(path, fams));
    tabsRow(path);
    startHereLine(path);
    decorateMenu();
    journalGallery(path);
    levelBadges(path);

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

    // The pasted floating "All essays" button is replaced by the page navigation (see pageNav)
    var back = document.getElementById('p75-back');
    if (back) back.style.display = 'none';

    // Mark essay pages so the desktop typography applies only there
    document.documentElement.classList.toggle('p75-essay',
      path !== '/' && EXCLUDED.indexOf(path) === -1 && !!document.querySelector('.block-blog-header'));

    // News (/news): the Coupon briefing is a Hostinger embed (same-origin iframe). Bring it in line with
    // the rest of the site: cream text tones, Manrope + Hedvig type, one label style, and a clear search bar.
    if (path === '/news') polishNews();

    // Homepage (/): Pulse strip, the salon-wall gallery (one painting at a time on phones) and Explore,
    // drawn by home/home.js on top of the Journal cards decorated above
    if (path === '/') {
      if (window.P75HOME) window.P75HOME.render();
      else if (!document.getElementById('p75home-js')) {
        var hm = document.createElement('script'); hm.id = 'p75home-js';
        hm.src = 'https://rahulmsaxena.github.io/point75-site/home/home.js?v=' + Math.floor(Date.now() / 36e5);
        hm.onload = function () { update(); };
        document.body.appendChild(hm);
      }
    } else if (window.P75HOME) window.P75HOME.clear();

    // Contact (/contact) is drawn by contact/contact.js into a blank Hostinger page
    if (path === '/contact') {
      if (window.P75CONTACT) window.P75CONTACT.render();
      else if (!document.getElementById('p75contact-js')) {
        var ct = document.createElement('script'); ct.id = 'p75contact-js';
        ct.src = 'https://rahulmsaxena.github.io/point75-site/contact/contact.js?v=' + Math.floor(Date.now() / 36e5);
        ct.onload = function () { update(); };
        document.body.appendChild(ct);
      }
      return;
    } else if (window.P75CONTACT) window.P75CONTACT.clear();

    // Start here (/start-here) is drawn by starthere/starthere.js
    if (path === '/start-here') {
      if (window.P75START) window.P75START.render();
      else if (!document.getElementById('p75start-js')) {
        var sh = document.createElement('script'); sh.id = 'p75start-js';
        sh.src = 'https://rahulmsaxena.github.io/point75-site/starthere/starthere.js?v=' + Math.floor(Date.now() / 36e5);
        sh.onload = function () { update(); };
        document.body.appendChild(sh);
      }
      return;
    } else if (window.P75START) window.P75START.clear();

    // /intelligent-summary#archive (the Archives card on Bond Summary): the summary sits in a frame inside the
    // site's embed (a same-origin srcdoc frame), so reach in and ask it to open its archive of earlier days.
    // The embed mounts lazily, so keep trying for a while; repeating the request is harmless.
    if (path === '/intelligent-summary' && location.hash === '#archive' && !window.p75arcT) {
      window.p75arcDone = 0;
      // Hostinger can re-create the embed while the page settles, so each tick looks for the current one and
      // starts over on a new one. Done once the summary has said where its archive is (or after 30 s).
      var tries = 0, last = null;
      var done = function () { window.p75arcDone = 1; clearInterval(window.p75arcT); try { history.replaceState(null, '', location.pathname + location.search); } catch (err) {} };
      window.p75arcT = setInterval(function () {
        if (++tries > 60) return done();
        document.querySelectorAll('iframe').forEach(function (f) {
          var w = null, inner = null; try { w = f.contentWindow; inner = f.contentDocument && f.contentDocument.getElementById('p75bond'); } catch (err) {}
          if (!inner || !w || inner === last) return;
          last = inner;
          // keep asking until it answers with where the archive starts (an answer ends the interval)
          var again = setInterval(function () { if (last !== inner || window.p75arcDone) clearInterval(again); else go(); }, 900);
          var go = function () { try { inner.contentWindow.postMessage({ p75: true, type: 'go', hash: '#/archive' }, '*'); } catch (err) {} };
          // the summary says 'nav' each time it draws a view: ask on its first one (it is ready then), and once now in
          // case it already has. It then says where the archive starts: scroll there, under the sticky header.
          w.addEventListener('message', function (ev) {
            var d = ev.data; if (!d || !d.p75 || last !== inner) return;
            if (d.type === 'nav' && !inner.p75asked) { inner.p75asked = 1; go(); }
            if (d.type === 'scrollto') {
              done(); last = {};
              var hdr = document.querySelector('.top-blocks--sticky, header'), off = hdr ? hdr.getBoundingClientRect().height : 0;
              setTimeout(function () { window.scrollTo({ top: Math.max(0, inner.getBoundingClientRect().top + window.scrollY + d.y - off - 12), behavior: 'smooth' }); }, 150);
            }
          });
          go();
        });
      }, 400);
    }
    // Hub pages (/kinetics, /bond-summary) are drawn by hubs/hubs.js from SECTIONS above
    var hub = sectionNode(path);
    if (hub && hub.node.hub) {
      if (window.P75HUBS) window.P75HUBS.render(path, hub.node, hub.parent || null);
      else if (!document.getElementById('p75hub-js')) {
        var hj = document.createElement('script'); hj.id = 'p75hub-js';
        hj.src = 'https://rahulmsaxena.github.io/point75-site/hubs/hubs.js?v=' + Math.floor(Date.now() / 36e5);
        hj.onload = function () { update(); };
        document.body.appendChild(hj);
      }
      return;
    } else if (window.P75HUBS) window.P75HUBS.clear();

    // Education pages (/education and its guides) are drawn by education.js from the same GitHub folder
    var EDU = ['/education', '/bond-introduction', '/bond-history', '/bond-types', '/cash-logistics', '/bond-dictionary', '/bond-players', '/bond-fortunes'];
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

    // Pulse (/pulse) is drawn by pulse/pulse.js; data comes from news.point75.io/api/pulse
    if (path === '/pulse') {
      if (window.P75PULSE) window.P75PULSE.render();
      else if (!document.getElementById('p75pulse-js')) {
        var pj = document.createElement('script'); pj.id = 'p75pulse-js';
        pj.src = 'https://rahulmsaxena.github.io/point75-site/pulse/pulse.js?v=' + Math.floor(Date.now() / 36e5);
        pj.onload = function () { update(); };
        document.body.appendChild(pj);
      }
      return;
    } else if (window.P75PULSE) window.P75PULSE.clear();

    // Debt Trap (/debt-trap, under Pulse) is drawn by debttrap/debttrap.js; data comes from news.point75.io/api/debttrap
    if (path === '/debt-trap') {
      if (window.P75DEBT) window.P75DEBT.render();
      else if (!document.getElementById('p75debt-js')) {
        var dj = document.createElement('script'); dj.id = 'p75debt-js';
        dj.src = 'https://rahulmsaxena.github.io/point75-site/debttrap/debttrap.js?v=' + Math.floor(Date.now() / 36e5);
        dj.onload = function () { update(); };
        document.body.appendChild(dj);
      }
      return;
    } else if (window.P75DEBT) window.P75DEBT.clear();

    // Sector Credit, Lenders and Credit Stress (under Intelligence) are drawn by credit/credit.js; data comes from news.point75.io/api/credit
    if (path === '/sector-credit' || path === '/lenders' || path === '/credit-stress') {
      if (window.P75CREDIT) window.P75CREDIT.render(path);
      else if (!document.getElementById('p75cr-js')) {
        var cj = document.createElement('script'); cj.id = 'p75cr-js';
        cj.src = 'https://rahulmsaxena.github.io/point75-site/credit/credit.js?v=' + Math.floor(Date.now() / 36e5);
        cj.onload = function () { update(); };
        document.body.appendChild(cj);
      }
      return;
    } else if (window.P75CREDIT) window.P75CREDIT.clear();

    // Insights (/insights) is drawn by insights/insights.js from insights/insights.json
    if (path === '/insights') {
      if (window.P75INS) window.P75INS.render();
      else if (!document.getElementById('p75ins-js')) {
        var nj = document.createElement('script'); nj.id = 'p75ins-js';
        nj.src = 'https://rahulmsaxena.github.io/point75-site/insights/insights.js?v=' + Math.floor(Date.now() / 36e5);
        nj.onload = function () { update(); };
        document.body.appendChild(nj);
      }
      return;
    } else if (window.P75INS) window.P75INS.clear();

    // Bonds moved to the tools site as Treasury Finder; old links and bookmarks go straight there
    if (path === '/bonds') {
      location.replace('https://tools.point75.io/market-intelligence/treasury-finder');
      return;
    } else if (window.P75BONDS) window.P75BONDS.clear();

    // Economic Indicators (/economic-indicators, under Kinetics) is drawn by indicators/indicators.js;
    // data comes from news.point75.io/api/indicators
    if (path === '/economic-indicators') {
      if (window.P75IND) window.P75IND.render();
      else if (!document.getElementById('p75ind-js')) {
        var ij = document.createElement('script'); ij.id = 'p75ind-js';
        ij.src = 'https://rahulmsaxena.github.io/point75-site/indicators/indicators.js?v=' + Math.floor(Date.now() / 36e5);
        ij.onload = function () { update(); };
        document.body.appendChild(ij);
      }
      return;
    } else if (window.P75IND) window.P75IND.clear();

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
        (isPost ? '<a href="/" style="color:' + GOLD + ';text-decoration:none;font-weight:600">&larr; All essays</a><div style="height:14px"></div>' +
          '<div style="margin-bottom:18px;font-size:16px;color:#EDE8DC">Disagree, or have a question? <a href="/contact" style="color:' + GOLD + ';text-decoration:none;font-weight:700">Write to me &rarr;</a></div>' : '') +
        '<div style="border-left:3px solid ' + GOLD + ';padding-left:14px">' + DISCLAIMER + '</div>' +
        '<div style="margin-top:12px;color:#9a9a9a;font-size:13px">' + COPYRIGHT +
          ' <a href="/contact" style="color:' + GOLD + ';text-decoration:none;font-weight:700;white-space:nowrap;margin-left:6px">Write to Point75 &rarr;</a></div>'));
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
