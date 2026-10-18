/* Point75 - Contact page (/contact): "Write to Point75". Loaded by p75.js.
   The Hostinger page is left blank; this draws the form into it. Messages go through Formspree to Rahul's
   inbox, so no email address appears on the site. A hidden honeypot field catches most bots.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75CONTACT) return;
  var ENDPOINT = 'https://formspree.io/f/xdeajldn';
  var TOPICS = ['A question', 'Tool idea', 'Suggest a topic', 'Collaboration', 'Just saying hi'];

  var CSS =
    '.p75contact{--ink:#111214;--panel:#17181B;--line:#34363C;--cream:#EDE8DC;--soft:#D9D3C6;--muted:#B8B2A5;--gold:#C9A227;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box}' +
    '.p75contact *{box-sizing:border-box}' +
    '.p75contact .wrap{max-width:640px;margin:0 auto;padding:36px 20px 64px}' +
    '.p75contact .eyebrow{color:var(--gold);letter-spacing:.12em;font-size:12.5px;font-weight:800;text-transform:uppercase}' +
    '.p75contact h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:44px;line-height:1.1;margin:8px 0 12px;color:#fff;letter-spacing:-.01em}' +
    '.p75contact .lede{color:var(--soft);font-size:17px;line-height:1.6;margin:0 0 28px}' +
    '.p75contact .card{background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);border-radius:8px;padding:26px 24px}' +
    '.p75contact fieldset{border:0;margin:0 0 20px;padding:0}' +
    '.p75contact legend,.p75contact label{display:block;font-size:13px;font-weight:700;letter-spacing:.03em;color:var(--soft);margin:0 0 8px}' +
    '.p75contact .chips{display:flex;flex-wrap:wrap;gap:8px}' +
    '.p75contact .chip{min-height:40px;padding:0 16px;border-radius:20px;border:1px solid #4A4C52;background:transparent;color:var(--soft);font:600 14px Manrope,system-ui,sans-serif;cursor:pointer;transition:background .15s,border-color .15s,color .15s}' +
    '.p75contact .chip:hover{border-color:var(--gold)}' +
    '.p75contact .chip[aria-pressed="true"]{background:rgba(201,162,39,.16);border-color:var(--gold);color:#F2D27A}' +
    '.p75contact .chip:focus-visible,.p75contact .send:focus-visible,.p75contact .again:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75contact .row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;margin-bottom:16px}' +
    '.p75contact input,.p75contact textarea{width:100%;padding:12px 14px;border-radius:8px;border:1px solid #4A4C52;background:#111214;color:#fff;font:500 16px/1.5 Manrope,system-ui,sans-serif}' +
    '.p75contact input:focus,.p75contact textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,162,39,.2)}' +
    '.p75contact input::placeholder,.p75contact textarea::placeholder{color:#7D786E}' +
    '.p75contact textarea{min-height:150px;resize:vertical}' +
    '.p75contact .hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}' +
    '.p75contact .err{min-height:20px;margin:10px 0 0;font-size:14px;font-weight:600;color:#FF8A8A}' +
    '.p75contact .foot{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;margin-top:14px}' +
    '.p75contact .send{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 24px;border:0;border-radius:24px;background:var(--gold);color:#111214;font:800 15px Manrope,system-ui,sans-serif;cursor:pointer}' +
    '.p75contact .send:hover{background:#E0B53A}.p75contact .send[disabled]{opacity:.7;cursor:progress}' +
    '.p75contact .note{font-size:13px;color:var(--muted)}' +
    '.p75contact .done{text-align:center;padding:16px 0 6px}' +
    '.p75contact .done h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:30px;margin:16px 0 6px;color:#fff}' +
    '.p75contact .done p{color:var(--soft);font-size:16px;line-height:1.6;margin:0 0 20px}' +
    '.p75contact .again{min-height:44px;padding:0 20px;border-radius:22px;border:1px solid var(--gold);background:transparent;color:#F2D27A;font:700 14px Manrope,system-ui,sans-serif;cursor:pointer}' +
    '@keyframes p75seal{0%{transform:scale(2.2) rotate(-25deg);opacity:0}70%{transform:scale(.92) rotate(4deg);opacity:1}100%{transform:scale(1) rotate(0)}}' +
    '.p75contact .seal{animation:p75seal .6s ease-out both}' +
    '@media (prefers-reduced-motion:reduce){.p75contact .seal{animation:none}}' +
    '@media (max-width:600px){.p75contact .wrap{padding:22px 16px 48px}.p75contact h1{font-size:34px}.p75contact .lede{font-size:16px;margin-bottom:20px}' +
      '.p75contact .card{padding:20px 16px}.p75contact .row{grid-template-columns:1fr;gap:12px}}';

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  var SEAL = '<svg class="seal" width="104" height="104" viewBox="0 0 96 96" aria-hidden="true">' +
    '<path d="M48 4 C60 6 64 2 72 10 C82 16 92 22 90 36 C94 48 88 56 90 66 C86 80 74 86 62 90 C52 94 42 92 32 90 C18 86 8 76 6 62 C2 50 6 40 6 30 C10 16 22 8 34 6 C40 4 44 4 48 4Z" fill="#9E2A2A"/>' +
    '<circle cx="48" cy="48" r="30" fill="none" stroke="#E07B7B" stroke-width="1.5"/>' +
    '<text x="48" y="56" text-anchor="middle" font-family="Hedvig Letters Serif,Georgia,serif" font-size="22" fill="#FBE3E3">P75</text></svg>';

  function form() {
    return '<form class="card" novalidate>' +
      '<fieldset><legend>What’s it about?</legend><div class="chips">' +
        TOPICS.map(function (t) { return '<button type="button" class="chip" aria-pressed="false">' + t + '</button>'; }).join('') + '</div></fieldset>' +
      '<div class="row"><div><label for="p75c-name">Name</label><input id="p75c-name" name="name" autocomplete="name" placeholder="Your name"></div>' +
        '<div><label for="p75c-email">Email</label><input id="p75c-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="name@company.com"></div></div>' +
      '<label for="p75c-msg">Your note</label><textarea id="p75c-msg" name="message" placeholder="A question about a post, an idea for a tool, a topic you’d like covered…"></textarea>' +
      '<div class="hp" aria-hidden="true"><label for="p75c-hp">Leave this empty</label><input id="p75c-hp" name="_gotcha" tabindex="-1" autocomplete="off"></div>' +
      '<p class="err" role="alert"></p>' +
      '<div class="foot"><button type="submit" class="send">Seal and send &rarr;</button><span class="note">Your email is only used to reply.</span></div>' +
      '</form>';
  }
  function page() {
    return '<div class="wrap"><div class="eyebrow">Correspondence</div><h1>Write to Point75</h1>' +
      '<p class="lede">A question about an essay, an idea for a tool, a topic you’d like covered, or just a hello. Every note is read.</p>' +
      '<div data-p75c-box>' + form() + '</div></div>';
  }

  function wire(host) {
    var box = host.querySelector('[data-p75c-box]'), f = box.querySelector('form'); if (!f || f.getAttribute('data-wired')) return;
    f.setAttribute('data-wired', '1');
    var topic = '', err = f.querySelector('.err');
    var chips = f.querySelectorAll('.chip');
    [].forEach.call(chips, function (c) {
      c.addEventListener('click', function () {
        [].forEach.call(chips, function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        topic = c.textContent; err.textContent = '';
      });
    });
    f.addEventListener('input', function () { err.textContent = ''; });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var el = function (n) { return f.elements.namedItem(n); };   // (f.name would be the form's own name)
      var name = el('name').value.trim(), email = el('email').value.trim(), msg = el('message').value.trim();
      if (!topic) { err.textContent = 'Pick what your note is about first.'; return; }
      if (!name) { err.textContent = 'Add your name.'; el('name').focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Enter a valid email so a reply can reach you.'; el('email').focus(); return; }
      if (msg.length < 5) { err.textContent = 'Write a short note first.'; el('message').focus(); return; }
      var btn = f.querySelector('.send'); btn.disabled = true; btn.textContent = 'Sealing…';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, topic: topic, message: msg, _gotcha: el('_gotcha').value,
          _subject: 'Point75: ' + topic + ' from ' + name, page: location.href })
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error((res.j && res.j.errors && res.j.errors[0] && res.j.errors[0].message) || 'send failed');
          box.innerHTML = '<div class="card done" tabindex="-1">' + SEAL + '<h2>Sealed and sent</h2>' +
            '<p>Thanks, ' + esc(name) + '. Your note about “' + esc(topic.toLowerCase()) + '” is on its way.</p>' +
            '<button type="button" class="again">Write another</button></div>';
          var d = box.querySelector('.done'); d.focus({ preventScroll: true });
          box.querySelector('.again').addEventListener('click', function () { box.innerHTML = form(); wire(host); });
        })
        .catch(function () {
          btn.disabled = false; btn.innerHTML = 'Seal and send &rarr;';
          err.textContent = 'That didn’t go through. Please check your connection and try again in a moment.';
        });
    });
  }

  function render() {
    if (document.querySelector('.p75contact')) return;
    if (!document.getElementById('p75contact-css')) {
      var st = document.createElement('style'); st.id = 'p75contact-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var main = document.querySelector('main') || document.body;
    var host = document.createElement('div'); host.className = 'p75contact';
    host.innerHTML = page();
    var blocks = main.querySelector('.page__blocks'); (blocks || main).appendChild(host);
    // The Hostinger page is blank; hide its empty sections so they don't show as a tall band above the form
    if (blocks) [].forEach.call(blocks.children, function (sec) {
      if (sec.tagName !== 'SECTION' || (sec.innerText || '').trim() || sec.querySelector('img, iframe, video, canvas, svg, form')) return;
      sec.setAttribute('data-p75contact-hid', '1'); sec.style.display = 'none';
    });
    wire(host);
  }
  function clear() {
    var h = document.querySelector('.p75contact'); if (h) h.remove();
    document.querySelectorAll('[data-p75contact-hid]').forEach(function (s) { s.style.display = ''; s.removeAttribute('data-p75contact-hid'); });
  }

  window.P75CONTACT = { render: render, clear: clear };
})();
