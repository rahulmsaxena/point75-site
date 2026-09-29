/* Point75 site add-ons: disclaimer, sentiment poll + comments, levels,
   Editor's picks, "All essays" fix, Listen (read aloud), TL;DR summaries, and copy protection.
   Content © Rahul Saxena. All rights reserved. */
(function () {
  // ---------- Settings ----------
  var TENANT_ID = 'NgvHdCEMvUY';                          // FastComments
  var EXCLUDED  = ['/news', '/bondsummary', '/about', '/education', '/bond-history', '/bond-types', '/bond-dictionary', '/bond-players', '/pulse', '/economic-indicators'];    // no add-ons on these pages

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
    '}';
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
  NEWS_CSS += '.coupon-embed .p75-searchrow{margin:0 0 1.6rem}.coupon-embed .p75-searchrow input[type="search"]{display:block;box-sizing:border-box}' +
    '.coupon-embed .p75-sr-note{font:600 .8rem Manrope,system-ui,sans-serif;color:var(--dim);margin-top:6px;min-height:1em}';
  // Put the headline search near the top (it filters the list further down), and bring the results into view as people type
  function moveSearch(d, frame) {
    if (d.getElementById('p75-searchrow')) return;
    var input = d.querySelector('.coupon-embed .ce-controls input[type="search"]'), anchor = d.getElementById('p75-ind-strip') || d.querySelector('.coupon-embed .ce-masthead');
    if (!input || !anchor) return;
    var row = d.createElement('div'); row.id = 'p75-searchrow'; row.className = 'p75-searchrow';
    var note = d.createElement('div'); note.className = 'p75-sr-note'; note.setAttribute('aria-live', 'polite');
    anchor.insertAdjacentElement('afterend', row); row.appendChild(input); row.appendChild(note);
    var t = 0, count = d.querySelector('.coupon-embed .ce-count');
    function toResults() {
      var list = d.querySelector('.coupon-embed .ce-controls'); if (!list) return;
      var top = frame.getBoundingClientRect().top + window.pageYOffset + list.getBoundingClientRect().top - headerHeightSafe() - 8;
      if (Math.abs(window.pageYOffset - top) > 40) window.scrollTo({ top: top, behavior: 'smooth' });
    }
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var q = input.value.trim(), c = count ? count.textContent.split('/')[0].trim() : '';
        note.textContent = q ? (c === '0' ? 'No headlines match.' : c + ' matching headlines below.') : '';
        if (q) toResults();
      }, 700);
    });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(t); toResults(); input.blur(); } });
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

    // News (/news): the Coupon briefing is a Hostinger embed (same-origin iframe). Bring it in line with
    // the rest of the site: cream text tones, Manrope + Hedvig type, one label style, and a clear search bar.
    if (path === '/news') polishNews();

    // Education pages (/education and its guides) are drawn by education.js from the same GitHub folder
    var EDU = ['/education', '/bond-history', '/bond-types', '/bond-dictionary', '/bond-players'];
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

    // Economic Indicators (/economic-indicators, under News) is drawn by indicators/indicators.js;
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
