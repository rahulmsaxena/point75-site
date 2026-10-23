/* Point75 home page (/): the rope. A thick three-strand rope tied in a tight knot, both ends fraying, slowly pulled
   apart and released, seen through three frames side by side (thin page-coloured gaps cut it into a triptych), under a quiet caption and today's Treasury readings (from intelsummary/editions.json).
   The header and the left menu come from shell/shell.js. Everything draws in a full-screen layer over the site
   builder's page. p75.js calls render() about once a second, so it is safe to run repeatedly.
   Built from the landing mock (Point75-BusinessPlan/landing/rope-hero.html). (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75HOME) return;
  var BASE = window.P75BASE || 'https://rahulmsaxena.github.io/point75-site/';
  var EDITIONS = 'https://rahulmsaxena.github.io/point75-site/intelsummary/editions.json?v=' + Math.floor(Date.now() / 36e5);
  var CSS = "#p75L .hero{text-align:center;padding:18px 16px 0}\n#p75L .kick{font-size:12.5px;font-weight:400;letter-spacing:.34em;text-transform:uppercase;color:#E6BD3C}\n#p75L h1{margin:14px 0 0;font-family:'Hedvig Letters Serif',Georgia,serif;font-weight:400;font-size:clamp(24px,2.6vw,34px);line-height:1.2;letter-spacing:-.01em;color:#F6F3EC}\n#p75L h1 em{font-style:normal;color:#F2C94C}\n#p75L .sub{margin:10px auto 0;max-width:620px;color:var(--muted);font-size:16px;font-weight:400;line-height:1.55;text-wrap:balance}\n#p75L .tape{margin:16px auto 0;padding:0 16px;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 22px;font-family:Jost,sans-serif;font-size:14px;letter-spacing:.04em;color:#F6F3EC}\n#p75L .tape b{font-weight:400;letter-spacing:.06em;color:#B9B3A7;margin-right:4px}\n#p75L .tape i{font-style:normal;font-weight:400;color:#FF6640;margin-left:2px}\n#p75L .tape .asof{color:#B9B3A7}\n#p75L .stage{position:relative;width:min(1060px,100%,calc((100svh - 345px) * 1200 / 580));margin:2vh auto 0;aspect-ratio:1200/580}\n#p75L .stage canvas,#p75L .stage svg{position:absolute;inset:0;width:100%;height:100%}\n#p75L .stage .frames{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr 1fr;--gap:clamp(5px,0.9%,10px);gap:var(--gap);pointer-events:none;background:linear-gradient(90deg,transparent calc(33.333% - var(--gap)/2),var(--bg) 0,var(--bg) calc(33.333% + var(--gap)/2),transparent 0,transparent calc(66.667% - var(--gap)/2),var(--bg) 0,var(--bg) calc(66.667% + var(--gap)/2),transparent 0)}\n@media (max-width:700px){#p75L .stage{width:calc(100% - 24px)}}\n#p75L .stage .frames span{border:1px solid rgba(201,164,58,.45);border-radius:3px;box-shadow:inset 0 0 40px rgba(0,0,0,.35)}\n#p75L[data-page=home] .p75main{justify-content:center;padding-bottom:4vh}\n#p75L .stage{opacity:0;transition:opacity 1.2s ease}\n#p75L .stage.on{opacity:1}\n#p75L .tape i.dn{color:#1FC8FF}\n#p75L .foot{text-align:center;color:#CFCAC0;font-size:13px;letter-spacing:.04em;padding:14px 16px 18px;margin:0}\n@media (prefers-reduced-motion: reduce){#p75L .stage{transition:none}}";
  var MARKUP = "<div class=\"stage\" role=\"img\" aria-label=\"A thick rope tied in a tight knot, both ends fraying\">\n<canvas id=\"p75rope\" aria-hidden=\"true\"></canvas><canvas id=\"p75fibers\" aria-hidden=\"true\"></canvas><div class=\"frames\" aria-hidden=\"true\"><span></span><span></span><span></span></div></div>\n<div class=\"hero\">\n<div class=\"kick\">Data on what moves bonds</div>\n<h1>Every bond has a <em>breaking point.</em></h1>\n<p class=\"sub\">Daily analysis, forward odds and the numbers behind every move.</p>\n<div class=\"tape\" aria-label=\"Latest Treasury readings\" hidden></div>\n</div>";
  var stopRope = null;

  function startRope(rc, fc) {
    
    var W=1200,H=580,SS=(window.innerWidth<700?1:2),TAU=Math.PI*2,S=Math.sin,K=Math.cos,PI=Math.PI;
    var R=50;                       // rope radius (logical px)
    var KC={x:600,y:252},KS=63;     // knot centre and scale
    // ---------- centreline: an open trefoil (overhand knot) with two long tails ----------
    function tref(t){return{x:KC.x+KS*(S(t)+2*S(2*t)),y:KC.y-KS*0.9*(K(t)-2*K(2*t)),z:-S(3*t)};}
    // lowest lobe apex (largest screen y)
    var tc=0,best=-1e9;for(var a=0;a<TAU;a+=0.001){var p=tref(a);if(p.y>best){best=p.y;tc=a;}}
    var D=0.62,knot=[];
    for(var tt=tc+D;tt<=tc+TAU-D;tt+=0.004)knot.push(tref(tt));
    function bez(p0,p1,p2,p3,u){var m=1-u;return{x:m*m*m*p0.x+3*m*m*u*p1.x+3*m*u*u*p2.x+u*u*u*p3.x,y:m*m*m*p0.y+3*m*m*u*p1.y+3*m*u*u*p2.y+u*u*u*p3.y};}
    var s0=knot[0],s1=knot[1],e0=knot[knot.length-1],e1=knot[knot.length-2];
    function dir(a,b){var dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy);return{x:dx/l,y:dy/l};}
    var dS=dir(s0,s1),dE=dir(e1,e0);
    var FL={x:165,y:426},FR={x:1035,y:406};
    var tailL=[],tailR=[],u;
    for(u=0;u<1;u+=0.0025){var q=bez(FL,{x:FL.x+180,y:FL.y+14},{x:s0.x-dS.x*120,y:s0.y-dS.y*120},s0,u);q.z=s0.z;tailL.push(q);}
    for(u=0.0025;u<=1;u+=0.0025){var q2=bez(e0,{x:e0.x+dE.x*120,y:e0.y+dE.y*120},{x:FR.x-180,y:FR.y-10},FR,u);q2.z=e0.z;tailR.push(q2);}
    var raw=tailL.concat(knot,tailR);
    // resample evenly every 0.5px
    var P=[raw[0]],acc=0;
    for(var i=1;i<raw.length;i++){var a0=P[P.length-1],b0=raw[i],d=Math.hypot(b0.x-a0.x,b0.y-a0.y);
     while(d>=0.5){var f=0.5/d;var np={x:a0.x+(b0.x-a0.x)*f,y:a0.y+(b0.y-a0.y)*f,z:a0.z+(b0.z-a0.z)*f};P.push(np);a0=np;d=Math.hypot(b0.x-a0.x,b0.y-a0.y);}}
    var N=P.length,LEN=N*0.5;
    for(i=0;i<N;i++){var pa=P[Math.max(0,i-3)],pb=P[Math.min(N-1,i+3)],tx=pb.x-pa.x,ty=pb.y-pa.y,tl=Math.hypot(tx,ty)||1;P[i].tx=tx/tl;P[i].ty=ty/tl;P[i].nx=-ty/tl;P[i].ny=tx/tl;P[i].s=i*0.5;}
    // smooth z so the depth ordering changes gently
    for(var pass=0;pass<4;pass++)for(i=1;i<N-1;i++)P[i].z=(P[i-1].z+P[i].z*2+P[i+1].z)/4;
    
    // ---------- raster the rope: three twisted strands, z-buffered, with ambient occlusion ----------
    var RW=W*SS,RH=H*SS,img=new ImageData(RW,RH),px=img.data,zb=new Float32Array(RW*RH).fill(-1e9),lum=new Float32Array(RW*RH);
    function hash(n){var x=S(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
    var L3={x:-0.45,y:-0.6,z:0.66};var ll=Math.hypot(L3.x,L3.y,L3.z);L3.x/=ll;L3.y/=ll;L3.z/=ll;
    var LAY=5.0*R,FRAY=105,RS=0.6*R,RHO=0.43*R,ZD=2.9*R;
    for(var j=0;j<3;j++){
     var phi=j*TAU/3;
     for(i=0;i<N;i++){
      var p=P[i],sEnd=Math.min(p.s,LEN-p.s),loose=sEnd<FRAY?Math.pow(1-sEnd/FRAY,1.7):0;
      if(sEnd<2)continue;
      var dphi=TAU/LAY*0.5*(1-0.9*loose);phi+=dphi;
      var rho=RHO+loose*R*0.55,rs=RS*(1-0.22*loose);
      var cphi=K(phi),sphi=S(phi);
      var cx=p.x+p.nx*rho*cphi,cy=p.y+p.ny*rho*cphi,cz=p.z*ZD+rho*sphi;
      // the strand's own screen direction (a helix seen from the side leans)
      var lean=-rho*sphi*(dphi/0.5),stx=p.tx+p.nx*lean,sty=p.ty+p.ny*lean,sl=Math.hypot(stx,sty);stx/=sl;sty/=sl;
      var snx=-sty,sny=stx;
      var along=p.s*1.0+j*97;
      for(var v=-1;v<=1;v+=0.42/rs){
       var c=Math.sqrt(Math.max(0,1-v*v)),x=(cx+snx*v*rs)*SS|0,y=(cy+sny*v*rs)*SS|0,z=cz+rs*c;
       // light on the strand surface
       var nx3=snx*v,ny3=sny*v,nz3=c,dif=Math.max(0,nx3*L3.x+ny3*L3.y+nz3*L3.z);
       var sh=0.07+0.93*dif;sh*=0.5+0.5*Math.pow(c,0.6);
       // yarns: a finer twist the other way, plus fibre streaks and grain
       var th=Math.asin(v),yq=5*(along/(1.25*R)-th/TAU*1.6),yu=yq-Math.floor(yq),yarn=0.74+0.26*Math.pow(S(PI*yu),0.8);
       var streak=0.82+0.18*hash(Math.floor(v*18+0.6*S(along*0.05))+j*31+Math.floor(yq)*7);
       for(var oy=0;oy<2;oy++)for(var ox=0;ox<2;ox++){var X=x+ox,Y=y+oy;if(X<0||Y<0||X>=RW||Y>=RH)continue;var id=Y*RW+X;
        if(z>zb[id]){zb[id]=z;lum[id]=sh*yarn*streak*(0.9+0.2*hash(X*0.37+Y*1.91));}}
      }
     }
    }
    // ambient occlusion from the depth buffer: grooves, crossings and the inside of the knot go dark
    var dirs=[];for(var a8=0;a8<10;a8++)dirs.push([K(a8/10*TAU),S(a8/10*TAU)]);
    for(var Y=0;Y<RH;Y++)for(var X=0;X<RW;X++){var id=Y*RW+X,z0=zb[id];if(z0<-1e8)continue;var occ=0;
     for(var d8=0;d8<10;d8++)for(var rr=7;rr<=34;rr+=13){var X2=X+dirs[d8][0]*rr|0,Y2=Y+dirs[d8][1]*rr|0;if(X2<0||Y2<0||X2>=RW||Y2>=RH)continue;var dz=zb[Y2*RW+X2]-z0;if(dz>3)occ+=Math.min(1,dz/(R*0.9));}
     var ao=1-0.62*Math.min(1,occ/12),g=Math.pow(lum[id]*ao,0.9)*238+8;
     px[id*4]=px[id*4+1]=g;px[id*4+2]=g-2;px[id*4+3]=255;}
    var off=document.createElement('canvas');off.width=RW;off.height=RH;off.getContext('2d').putImageData(img,0,0);
    
    // ---------- paint once into an offscreen layer: shadow, rope, stray hairs ----------
    var dpr=Math.min(2,window.devicePixelRatio||1);
    
    [rc,fc].forEach(function(c){c.width=W*dpr;c.height=H*dpr;});
    var comp=document.createElement('canvas');comp.width=W*dpr;comp.height=H*dpr;
    var ctx=comp.getContext('2d');ctx.scale(dpr,dpr);
    ctx.save();ctx.filter='blur(16px)';ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.lineWidth=R*2;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();for(i=0;i<N;i+=6){var sp=P[i];if(i)ctx.lineTo(sp.x+14,sp.y+22);else ctx.moveTo(sp.x+14,sp.y+22);}ctx.stroke();ctx.restore();
    ctx.imageSmoothingQuality='high';ctx.drawImage(off,0,0,W,H);
    ctx.lineCap='round';
    for(i=0;i<520;i++){var sI=Math.floor(hash(i*3.1)*N),pp=P[sI],sg2=hash(i*7.7)<0.5?-1:1,ends=Math.min(pp.s,LEN-pp.s)<FRAY*1.4;
     if(!ends&&hash(i*5.3)<0.45)continue;
     var ang=Math.atan2(pp.ny*sg2,pp.nx*sg2)+(hash(i*9.1)-0.5)*1.6,len=4+hash(i*2.2)*(ends?20:11),ox3=pp.x+pp.nx*sg2*R*0.96,oy3=pp.y+pp.ny*sg2*R*0.96;
     ctx.strokeStyle='rgba(205,203,198,'+(0.25+0.4*hash(i*4.4)).toFixed(2)+')';ctx.lineWidth=0.5+0.5*hash(i*6.6);
     ctx.beginPath();ctx.moveTo(ox3,oy3);ctx.quadraticCurveTo(ox3+K(ang)*len*0.6+(hash(i)-0.5)*5,oy3+S(ang)*len*0.6,ox3+K(ang)*len,oy3+S(ang)*len);ctx.stroke();}
    
    // ---------- tension: the ends are drawn outward, the knot cinches, then it all eases back ----------
    var view=rc.getContext('2d');
    var CX=KC.x,CY=KC.y+20,INN=170,OUT=330,PULL=24,CINCH=0.045;
    function sm(a,b,x){var t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
    function mapX(x,T){var d=x-CX,ad=Math.abs(d),w=sm(INN,OUT,ad);return x+T*((d<0?-1:1)*PULL*w-CINCH*d*(1-w));}
    function scaleY(x,T){return 1-T*CINCH*1.2*(1-sm(INN,OUT,Math.abs(x-CX)));}
    var STRIP=3;
    function drawRope(T){view.setTransform(1,0,0,1,0,0);view.clearRect(0,0,rc.width,rc.height);
     if(T<=0.0005){view.drawImage(comp,0,0);return;}
     for(var x=0;x<W;x+=STRIP){var x0=mapX(x,T),x1=mapX(x+STRIP,T),k=scaleY(x+STRIP/2,T),hy=H*k,y0=CY-CY*k;
      view.drawImage(comp,x*dpr,0,STRIP*dpr,H*dpr,x0*dpr,y0*dpr,(x1-x0+0.6)*dpr,hy*dpr);}}
    
    // ---------- frayed ends: fibres that drift, and splay a little more under strain ----------
    var fib=[];
    [[4,-1],[N-5,1]].forEach(function(e){var p=P[e[0]],sgn=e[1],tx2=p.tx*sgn,ty2=p.ty*sgn,base=Math.atan2(ty2,tx2);
     for(var j=0;j<260;j++){var tuft=j%3,tv=(tuft-1)*0.8+(hash(j*1.3+e[0])-0.5)*0.5;
      var rr=R*1.05;fib.push({side:sgn,base:base,x:p.x+p.nx*tv*rr-tx2*hash(j*8.8)*22,y:p.y+p.ny*tv*rr-ty2*hash(j*8.8)*22,
       a:base+(tuft-1)*0.42+tv*0.25+(hash(j*2.9+e[0])-0.5)*0.6,len:24+hash(j*4.1+e[0])*(j%9===0?95:62),
       bend:(hash(j*6.2+e[0])-0.5)*0.9,g:Math.floor(120+hash(j*3.3)*115),al:(j%9===0?0.3:0.4)+hash(j*5.5)*0.5,w:(j%9===0?0.45:0.55)+hash(j*7.1)*(j%9===0?0.4:1.0),ph:hash(j*9.9)*TAU,sp:0.25+hash(j*1.7)*0.35});}});
    var fx=fc.getContext('2d');fx.scale(dpr,dpr);fx.lineCap='round';
    function drawFibers(t,T){fx.clearRect(0,0,W,H);
     for(var j=0;j<fib.length;j++){var b=fib[j],sway=0.06*S(t*b.sp+b.ph)*(b.len/90),bend=b.bend+0.12*S(t*b.sp*0.7+b.ph*1.3);
      var ox=b.x+b.side*PULL*T,oy=b.y,a=b.base+(b.a-b.base)*(1+0.45*T)+sway,ln=b.len*(1+0.07*T);
      var ex=ox+K(a)*ln,ey=oy+S(a)*ln,mx=ox+K(a)*ln*0.5-S(a)*ln*bend*0.5,my=oy+S(a)*ln*0.5+K(a)*ln*bend*0.5;
      fx.strokeStyle='rgba('+b.g+','+b.g+','+(b.g-4)+','+b.al.toFixed(2)+')';fx.lineWidth=b.w;
      fx.beginPath();fx.moveTo(ox,oy);fx.quadraticCurveTo(mx,my,ex,ey);fx.stroke();}}
    
    var PERIOD=10;
    function tension(t){var c=(1-K(TAU*t/PERIOD))/2;return Math.pow(c*c*(3-2*c),1.2);}
    drawRope(0);drawFibers(0,0);
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stopped=false;
    if(!reduce){var st=performance.now(),last=0;(function loop(now){if(stopped)return;if(now-last>=40&&!document.hidden){last=now;var t=(now-st)/1000,T=tension(t);drawRope(T);drawFibers(t,T);}requestAnimationFrame(loop);})(st);}
    return function(){stopped=true;};
  }

  function withShell(cb) {
    if (window.P75SHELL) return cb();
    if (document.getElementById('p75shell-js')) return;
    var s = document.createElement('script'); s.id = 'p75shell-js';
    s.src = BASE + 'shell/shell.js?v=' + Math.floor(Date.now() / 36e5);
    s.onload = cb; document.body.appendChild(s);
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function readings(el) {
    fetch(EDITIONS).then(function (r) { return r.json(); }).then(function (j) {
      var e = (j.summaries || j)[0]; if (!e || !e.tape) return;
      var h = e.tape.map(function (t) {
        var bp = t.unit === 'bp', lv = bp ? Math.round(t.level) + 'bp' : Number(t.level).toFixed(2) + '%';
        var d = t.d == null ? '' : (t.d > 0 ? '+' : t.d < 0 ? '\u2212' : '') + Math.abs(t.d) + 'bp';
        return '<span><b>' + esc(t.k) + '</b> ' + lv + (d && t.d !== 0 ? ' <i class="' + (t.d < 0 ? 'dn' : 'up') + '">' + d + '</i>' : '') + '</span>';
      }).join('');
      var day = new Date((e.market_date || '') + 'T12:00:00');
      var when = isNaN(day) ? '' : day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + (e.edition === 'close' ? ' close' : '');
      el.innerHTML = h + (when ? '<span class="asof">' + when + '</span>' : '');
      el.hidden = false;
    }).catch(function () {});
  }
  function build() {
    var main = window.P75SHELL.mount('home');
    if (main.querySelector('.stage')) return;
    if (!document.getElementById('p75home-css')) { var st = document.createElement('style'); st.id = 'p75home-css'; st.textContent = CSS; document.head.appendChild(st); }
    main.innerHTML = MARKUP;
    readings(main.querySelector('.tape'));
    var stage = main.querySelector('.stage');
    // draw the rope after the first paint, then fade it in
    setTimeout(function () {
      if (!document.body.contains(stage)) return;
      stopRope = startRope(stage.querySelector('#p75rope'), stage.querySelector('#p75fibers'));
      stage.classList.add('on');
    }, 60);
  }
  function render() { withShell(build); }
  function clear() {
    if (stopRope) { stopRope(); stopRope = null; }
    var r = document.getElementById('p75L');
    if (r && r.getAttribute('data-page') === 'home' && window.P75SHELL) window.P75SHELL.unmount();
  }
  window.P75HOME = { render: render, clear: clear };
})();
