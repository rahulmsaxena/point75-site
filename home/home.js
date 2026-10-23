/* Point75 home page (/): the rope. A thick three-strand rope tied in a tight knot, both ends worn and slowly coming
   undone, almost imperceptibly drawn tight and eased over thirty seconds, seen through three frames side by side
   (thin page-coloured gaps cut it into a triptych; the middle one, 30%–70% of the width, holds the whole knot), under a quiet caption and today's Treasury readings (from intelsummary/editions.json).
   Every nine seconds (five at rest, four dissolving) it trades places with a second picture under the same frames (a weathered hand with a wedding ring holding a
   baby's tiny hand, "Some bonds are priceless."); see startSlides().
   The header and the left menu come from shell/shell.js. Everything draws in a full-screen layer over the site
   builder's page. p75.js calls render() about once a second, so it is safe to run repeatedly.
   Built from the landing mock (Point75-BusinessPlan/landing/rope-hero.html). (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75HOME) return;
  var BASE = window.P75BASE || 'https://rahulmsaxena.github.io/point75-site/';
  var EDITIONS = 'https://rahulmsaxena.github.io/point75-site/intelsummary/editions.json?v=' + Math.floor(Date.now() / 36e5);
  var CSS = "#p75L .hero{text-align:center;padding:12px 16px 0}\n#p75L .kick{font-size:12.5px;font-weight:400;letter-spacing:.34em;text-transform:uppercase;color:#E6BD3C}\n#p75L h1{margin:8px 0 0;font-family:'Hedvig Letters Serif',Georgia,serif;font-weight:400;font-size:clamp(24px,2.6vw,34px);line-height:1.2;letter-spacing:-.01em;color:#F6F3EC}\n#p75L h1 em{font-style:normal;color:#F2C94C}\n#p75L .sub{margin:6px auto 0;max-width:620px;color:var(--muted);font-size:16px;font-weight:400;line-height:1.55;text-wrap:balance}\n#p75L .first{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin:14px auto 0;padding:0 20px 0 8px;border:1px solid #C9A227;border-radius:999px;color:#F2D27A;font-size:14.5px;font-weight:600;letter-spacing:.02em;text-decoration:none;transition:background .15s,color .15s}\n#p75L .first b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#C9A227;color:#111214;font-size:12px;font-weight:800;letter-spacing:.06em}\n#p75L .first:hover{background:rgba(201,162,39,.14);color:#fff}\n#p75L .first:focus-visible{outline:3px solid #F2D27A;outline-offset:3px}\n@media (prefers-reduced-motion: reduce){#p75L .first{transition:none}}\n#p75L .tape{margin:10px auto 0;padding:0 16px;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 22px;font-family:Jost,sans-serif;font-size:14px;letter-spacing:.04em;color:#F6F3EC}\n#p75L .tape b{font-weight:400;letter-spacing:.06em;color:#B9B3A7;margin-right:4px}\n#p75L .tape i{font-style:normal;font-weight:400;color:#FF6640;margin-left:2px}\n#p75L .tape .asof{color:#B9B3A7}\n#p75L .stage{position:relative;width:min(1360px,100%,calc((100svh - 340px) * 1200 / 580));margin:0 auto;aspect-ratio:1200/580}\n#p75L .stage canvas,#p75L .stage svg{position:absolute;inset:0;width:100%;height:100%}\n#p75L .stage .frames{position:absolute;inset:0;pointer-events:none;--gap:clamp(5px,0.9%,10px);--a:30%;--b:70%;background:linear-gradient(90deg,transparent calc(var(--a) - var(--gap)/2),var(--bg) 0,var(--bg) calc(var(--a) + var(--gap)/2),transparent 0,transparent calc(var(--b) - var(--gap)/2),var(--bg) 0,var(--bg) calc(var(--b) + var(--gap)/2),transparent 0)}\n#p75L .stage .frames span{position:absolute;top:0;bottom:0}\n#p75L .stage .frames span:nth-child(1){left:0;right:calc(100% - var(--a) + var(--gap)/2)}\n#p75L .stage .frames span:nth-child(2){left:calc(var(--a) + var(--gap)/2);right:calc(100% - var(--b) + var(--gap)/2)}\n#p75L .stage .frames span:nth-child(3){left:calc(var(--b) + var(--gap)/2);right:0}\n@media (max-width:700px){#p75L .stage{width:calc(100% - 24px)}}\n#p75L .stage .frames span{border:1px solid rgba(201,164,58,.45);border-radius:3px;box-shadow:inset 0 0 40px rgba(0,0,0,.35)}\n#p75L[data-page=home] .p75main{justify-content:center;padding-bottom:1vh}\n#p75L[data-page=home] .p75foot{padding:2px 16px 8px}\n#p75L[data-page=home] .p75foot .own,#p75L[data-page=home] .p75foot .note{display:none}\n#p75L[data-page=home] .p75foot .mini{display:block;font-size:11px;color:#8E897F;letter-spacing:.03em;overflow:visible}\n#p75L[data-page=home] .p75foot.open .own,#p75L[data-page=home] .p75foot.open .note{display:block;font-size:11.5px;color:#B9B3A7;margin-top:4px}\n#p75L .p75more{background:none;border:0;padding:0 2px;color:#B9B3A7;font:inherit;letter-spacing:inherit;text-decoration:underline;text-decoration-color:#55575e;text-underline-offset:2px;cursor:pointer}\n#p75L .p75more:hover,#p75L .p75more:focus-visible{color:#F3F0EA}\n#p75L .p75more:after{content:' \\25BE'}#p75L .p75foot.open .p75more:after{content:' \\25B4'}\n#p75L .stage{opacity:0;transition:opacity 1.2s ease}\n#p75L .stage.on{opacity:1}\n#p75L .tape i.dn{color:#1FC8FF}\n#p75L .foot{text-align:center;color:#CFCAC0;font-size:13px;letter-spacing:.04em;padding:14px 16px 18px;margin:0}\n#p75L .stage .art{position:absolute;inset:0;overflow:hidden}\n#p75L .stage .slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.035);transition:opacity 4s cubic-bezier(.45,0,.55,1),transform 12s cubic-bezier(.25,0,.25,1)}\n#p75L .stage.s2 .slide{opacity:1;transform:scale(1)}\n#p75L .stage .frames span{transition:border-color 4s cubic-bezier(.45,0,.55,1)}\n#p75L .stage.s2 .frames span{border-color:rgba(222,184,72,.8)}\n#p75L .hero .kick,#p75L .hero h1{display:grid}\n#p75L .hero .t{grid-area:1/1;transition:opacity 2.6s cubic-bezier(.45,0,.55,1)}\n#p75L .hero .t2{opacity:0}\n#p75L .hero.s2 .t1{opacity:0;transition-delay:0s}\n#p75L .hero.s2 .t2{opacity:1;transition-delay:1.4s}\n#p75L .hero .t1{transition-delay:1.4s}\n#p75L .stage .pause{position:absolute;right:10px;bottom:10px;z-index:2;width:44px;height:44px;display:flex;align-items:center;justify-content:center;padding:0;line-height:0;border:1px solid rgba(201,164,58,.45);border-radius:50%;background:rgba(12,13,15,.6);color:#F2D27A;cursor:pointer;opacity:.7;transition:opacity .2s}\n#p75L .stage .pause:hover,#p75L .stage .pause:focus-visible{opacity:1}\n#p75L .stage .pause:focus-visible{outline:3px solid #F2D27A;outline-offset:3px}\n#p75L .stage .pause svg{display:block;width:16px;height:16px;margin:auto}\n@media (prefers-reduced-motion: reduce){#p75L .stage .slide,#p75L .stage .frames span,#p75L .hero .t{transition:none}#p75L .stage .slide{transform:none}}\n@media (prefers-reduced-motion: reduce){#p75L .stage{transition:none}}";
  var MARKUP = "<div class=\"stage\">\n<div class=\"art\" role=\"img\" aria-label=\"A thick rope tied in a tight knot, both ends fraying\"><canvas id=\"p75rope\" aria-hidden=\"true\"></canvas><canvas id=\"p75fibers\" aria-hidden=\"true\"></canvas><img class=\"slide\" src=\"" + BASE + "images/home-priceless.jpg\" alt=\"\" aria-hidden=\"true\" decoding=\"async\"><div class=\"frames\" aria-hidden=\"true\"><span></span><span></span><span></span></div></div><button type=\"button\" class=\"pause\" aria-label=\"Pause slideshow\"></button></div>\n<div class=\"hero\">\n<div class=\"kick\"><span class=\"t t1\">Data on what moves bonds</span><span class=\"t t2\" aria-hidden=\"true\">The ones we hold onto</span></div>\n<h1><span class=\"t t1\">Every bond has a <em>breaking point.</em></span><span class=\"t t2\" aria-hidden=\"true\">Some <em>bonds</em> are <em>priceless.</em></span></h1>\n<p class=\"sub\">Daily analysis, forward odds and the numbers behind every move.</p>\n<a class=\"first\" href=\"/guide\"><b>1st</b>Read this first: how to use Point75 &rsaquo;</a>\n<div class=\"tape\" aria-label=\"Latest Treasury readings\" hidden></div>\n</div>";
  var stopRope = null, stopSlides = null;

  // The rope, drawn at a run of tensions from slack to taut. Slack: the knot's loops open wide and the strands
  // lie in a tight twist. Taut: the ends are hauled outward, the loops cinch in and the strands stretch and
  // untwist. Playing through the run (with a crossfade between neighbours) makes the rope visibly coil and
  // uncoil. Frames after the first are drawn in idle moments so the page appears at once.
  function startRope(rc, fc) {
    var W=1200,H=580,SS=(window.innerWidth<700?1:2),TAU=Math.PI*2,S=Math.sin,K=Math.cos,PI=Math.PI;
    var R=50,FRAY=105,NF=window.innerWidth<700?8:12;
    function hash(n){var x=S(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
    function sm(a,b,x){var t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
    var dpr=Math.min(2,window.devicePixelRatio||1);
    [rc,fc].forEach(function(c){c.width=W*dpr;c.height=H*dpr;});

    // ---------- the centreline at tension u (0 slack, 1 taut) ----------
    function geom(u){
     var KC={x:600,y:252-0.5*u},KS=63*(1.008-0.016*u);
     function tref(t){return{x:KC.x+KS*(S(t)+2*S(2*t)),y:KC.y-KS*0.9*(K(t)-2*K(2*t)),z:-S(3*t)};}
     var tc=0,best=-1e9;for(var a=0;a<TAU;a+=0.002){var p=tref(a);if(p.y>best){best=p.y;tc=a;}}
     var D=0.62,knot=[];for(var tt=tc+D;tt<=tc+TAU-D;tt+=0.004)knot.push(tref(tt));
     function bez(p0,p1,p2,p3,v){var m=1-v;return{x:m*m*m*p0.x+3*m*m*v*p1.x+3*m*v*v*p2.x+v*v*v*p3.x,y:m*m*m*p0.y+3*m*m*v*p1.y+3*m*v*v*p2.y+v*v*v*p3.y};}
     var s0=knot[0],s1=knot[1],e0=knot[knot.length-1],e1=knot[knot.length-2];
     function dir(a,b){var dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy);return{x:dx/l,y:dy/l};}
     var dS=dir(s0,s1),dE=dir(e1,e0);
     var FL={x:166-4*u,y:426-1*u},FR={x:1034+4*u,y:406-0.5*u},sag=0.04*(1-u);
     var raw=[],v;
     for(v=0;v<1;v+=0.0025){var q=bez(FL,{x:FL.x+180,y:FL.y+14+30*sag},{x:s0.x-dS.x*120,y:s0.y-dS.y*120},s0,v);q.z=s0.z;raw.push(q);}
     raw=raw.concat(knot);
     for(v=0.0025;v<=1;v+=0.0025){var q2=bez(e0,{x:e0.x+dE.x*120,y:e0.y+dE.y*120},{x:FR.x-180,y:FR.y-10+30*sag},FR,v);q2.z=e0.z;raw.push(q2);}
     var P=[raw[0]];
     for(var i=1;i<raw.length;i++){var a0=P[P.length-1],b0=raw[i],d=Math.hypot(b0.x-a0.x,b0.y-a0.y);
      while(d>=0.5){var f=0.5/d,np={x:a0.x+(b0.x-a0.x)*f,y:a0.y+(b0.y-a0.y)*f,z:a0.z+(b0.z-a0.z)*f};P.push(np);a0=np;d=Math.hypot(b0.x-a0.x,b0.y-a0.y);}}
     var N=P.length,LEN=N*0.5;
     for(i=0;i<N;i++){var pa=P[Math.max(0,i-3)],pb=P[Math.min(N-1,i+3)],tx=pb.x-pa.x,ty=pb.y-pa.y,tl=Math.hypot(tx,ty)||1;P[i].tx=tx/tl;P[i].ty=ty/tl;P[i].nx=-ty/tl;P[i].ny=tx/tl;P[i].s=i*0.5;}
     for(var pass=0;pass<4;pass++)for(i=1;i<N-1;i++)P[i].z=(P[i-1].z+P[i].z*2+P[i+1].z)/4;
     return {P:P,N:N,LEN:LEN,KC:KC};
    }

    // ---------- raster one tension: three twisted strands, z-buffered, ambient occlusion, shadow, stray hairs ----------
    var L3={x:-0.45,y:-0.6,z:0.66};var ll=Math.hypot(L3.x,L3.y,L3.z);L3.x/=ll;L3.y/=ll;L3.z/=ll;
    var dirs=[];for(var a8=0;a8<10;a8++)dirs.push([K(a8/10*TAU),S(a8/10*TAU)]);
    function raster(g,u){
     var P=g.P,N=g.N,LEN=g.LEN,RW=W*SS,RH=H*SS,img=new ImageData(RW,RH),px=img.data,zb=new Float32Array(RW*RH).fill(-1e9),lum=new Float32Array(RW*RH);
     // under tension the lay stretches (strands untwist) and the whole twist turns along the rope
     var LAY=R*(5+0.12*u),RS=0.6*R,RHO=0.43*R,ZD=2.9*R,turn=u*TAU*0.02;
     for(var j=0;j<3;j++){
      var phi=j*TAU/3+turn;
      for(var i=0;i<N;i++){
       var p=P[i],sEnd=Math.min(p.s,LEN-p.s),loose=sEnd<FRAY?Math.pow(1-sEnd/FRAY,1.7):0;
       if(sEnd<2)continue;
       var dphi=TAU/LAY*0.5*(1-0.9*loose);phi+=dphi;
       var rho=RHO+loose*R*0.55,rs=RS*(1-0.22*loose),cphi=K(phi),sphi=S(phi);
       var cx=p.x+p.nx*rho*cphi,cy=p.y+p.ny*rho*cphi,cz=p.z*ZD+rho*sphi;
       var lean=-rho*sphi*(dphi/0.5),stx=p.tx+p.nx*lean,sty=p.ty+p.ny*lean,sl=Math.hypot(stx,sty);stx/=sl;sty/=sl;
       var snx=-sty,sny=stx,along=p.s+j*97;
       for(var v=-1;v<=1;v+=0.42/rs){
        var c=Math.sqrt(Math.max(0,1-v*v)),x=(cx+snx*v*rs)*SS|0,y=(cy+sny*v*rs)*SS|0,z=cz+rs*c;
        var dif=Math.max(0,snx*v*L3.x+sny*v*L3.y+c*L3.z),sh=(0.07+0.93*dif)*(0.5+0.5*Math.pow(c,0.6));
        var th=Math.asin(v),yq=5*(along/(1.25*R)-th/TAU*1.6),yu=yq-Math.floor(yq),yarn=0.74+0.26*Math.pow(S(PI*yu),0.8);
        var streak=0.82+0.18*hash(Math.floor(v*18+0.6*S(along*0.05))+j*31+Math.floor(yq)*7);
        for(var oy=0;oy<2;oy++)for(var ox=0;ox<2;ox++){var X=x+ox,Y=y+oy;if(X<0||Y<0||X>=RW||Y>=RH)continue;var id=Y*RW+X;
         if(z>zb[id]){zb[id]=z;lum[id]=sh*yarn*streak*(0.9+0.2*hash(X*0.37+Y*1.91));}}
       }
      }
     }
     for(var Y=0;Y<RH;Y++)for(var X=0;X<RW;X++){var id=Y*RW+X,z0=zb[id];if(z0<-1e8)continue;var occ=0;
      for(var d8=0;d8<10;d8++)for(var rr=7*SS/2;rr<=34*SS/2;rr+=13*SS/2){var X2=X+dirs[d8][0]*rr|0,Y2=Y+dirs[d8][1]*rr|0;if(X2<0||Y2<0||X2>=RW||Y2>=RH)continue;var dz=zb[Y2*RW+X2]-z0;if(dz>3)occ+=Math.min(1,dz/(R*0.9));}
      var ao=1-0.62*Math.min(1,occ/12),gg=Math.pow(lum[id]*ao,0.9)*238+8;
      px[id*4]=px[id*4+1]=gg;px[id*4+2]=gg-2;px[id*4+3]=255;}
     var off=document.createElement('canvas');off.width=RW;off.height=RH;off.getContext('2d').putImageData(img,0,0);
     var comp=document.createElement('canvas');comp.width=W*dpr;comp.height=H*dpr;
     var ctx=comp.getContext('2d');ctx.scale(dpr,dpr);
     ctx.save();ctx.filter='blur(16px)';ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.lineWidth=R*2;ctx.lineCap='round';ctx.lineJoin='round';
     ctx.beginPath();for(var i2=0;i2<N;i2+=6){var sp=P[i2];if(i2)ctx.lineTo(sp.x+14,sp.y+22);else ctx.moveTo(sp.x+14,sp.y+22);}ctx.stroke();ctx.restore();
     ctx.imageSmoothingQuality='high';ctx.drawImage(off,0,0,W,H);
     ctx.lineCap='round';
     for(var i3=0;i3<520;i3++){var sI=Math.floor(hash(i3*3.1)*N),pp=P[sI],sg2=hash(i3*7.7)<0.5?-1:1,ends=Math.min(pp.s,LEN-pp.s)<FRAY*1.4;
      if(!ends&&hash(i3*5.3)<0.45)continue;
      var ang=Math.atan2(pp.ny*sg2,pp.nx*sg2)+(hash(i3*9.1)-0.5)*1.6,len=4+hash(i3*2.2)*(ends?20:11),ox3=pp.x+pp.nx*sg2*R*0.96,oy3=pp.y+pp.ny*sg2*R*0.96;
      ctx.strokeStyle='rgba(205,203,198,'+(0.25+0.4*hash(i3*4.4)).toFixed(2)+')';ctx.lineWidth=0.5+0.5*hash(i3*6.6);
      ctx.beginPath();ctx.moveTo(ox3,oy3);ctx.quadraticCurveTo(ox3+K(ang)*len*0.6+(hash(i3)-0.5)*5,oy3+S(ang)*len*0.6,ox3+K(ang)*len,oy3+S(ang)*len);ctx.stroke();}
     return comp;
    }

    // ---------- build the run of frames: the slack one now, the rest when the browser is idle ----------
    var geoms=[],frames=[],stopped=false;
    for(var f=0;f<NF;f++)geoms.push(geom(f/(NF-1)));
    frames[0]=raster(geoms[0],0);
    var idle=window.requestIdleCallback||function(cb){return setTimeout(cb,30);};
    (function next(f){if(stopped||f>=NF)return;idle(function(){if(stopped)return;frames[f]=raster(geoms[f],f/(NF-1));next(f+1);});})(1);
    var ready=function(){for(var f=0;f<NF;f++)if(!frames[f])return false;return true;};

    // ---------- frayed ends: fibres anchored to each end, drifting, splaying under strain ----------
    function endsAt(u){var fu=u*(NF-1),a=Math.floor(fu),b=Math.min(NF-1,a+1),k=fu-a,ga=geoms[a],gb=geoms[b];
     function pt(g,i){return g.P[i];}
     function lerp(pa,pb){return{x:pa.x+(pb.x-pa.x)*k,y:pa.y+(pb.y-pa.y)*k,tx:pa.tx+(pb.tx-pa.tx)*k,ty:pa.ty+(pb.ty-pa.ty)*k,nx:pa.nx+(pb.nx-pa.nx)*k,ny:pa.ny+(pb.ny-pa.ny)*k};}
     return [lerp(pt(ga,4),pt(gb,4)),lerp(pt(ga,ga.N-5),pt(gb,gb.N-5))];}
    var fib=[];
    [[0,-1],[1,1]].forEach(function(e){for(var j=0;j<380;j++){var tuft=j%3,tv=(tuft-1)*0.8+(hash(j*1.3+e[0]*91)-0.5)*0.5;
     fib.push({rel:hash(j*11.3+e[0]*7),free:hash(j*12.9+e[0]*5)<0.16,curl:(hash(j*13.7+e[0])-0.5)*2,dv:hash(j*14.1+e[0]*3),end:e[0],side:e[1],tv:tv,back:hash(j*8.8)*22,da:(tuft-1)*0.42+tv*0.25+(hash(j*2.9+e[0]*91)-0.5)*0.6,len:24+hash(j*4.1+e[0]*91)*(j%9===0?95:62),
      bend:(hash(j*6.2+e[0]*91)-0.5)*0.9,g:Math.floor(120+hash(j*3.3)*115),al:(j%9===0?0.3:0.4)+hash(j*5.5)*0.5,w:(j%9===0?0.45:0.55)+hash(j*7.1)*(j%9===0?0.4:1.0),ph:hash(j*9.9)*TAU,sp:0.08+hash(j*1.7)*0.12});}});
    var UNDO=60,fx=fc.getContext('2d');fx.scale(dpr,dpr);fx.lineCap='round';
    function drawFibers(t,u){fx.clearRect(0,0,W,H);var E=endsAt(u);
     for(var j=0;j<fib.length;j++){var b=fib[j],p=E[b.end],tx2=p.tx*b.side,ty2=p.ty*b.side,base=Math.atan2(ty2,tx2);
      var ox=p.x+p.nx*b.tv*R*1.05-tx2*b.back,oy=p.y+p.ny*b.tv*R*1.05-ty2*b.back;
      var pr=(t%UNDO)/UNDO,st0=b.rel*0.8,k=sm(st0,st0+0.12,pr)*(1-sm(0.9,1,pr)),al=b.al,dx=0,dy=0;if(b.free){var e2=Math.max(0,pr-st0-0.12)*UNDO;dx=K(base+b.da)*e2*(1.2+1.2*b.dv);dy=S(base+b.da)*e2*(1.2+1.2*b.dv)+e2*e2*0.03;al*=(1-sm(5,16,e2))*sm(0,0.05,pr);}var sway=0.06*S(t*b.sp+b.ph)*(b.len/90)*(1+1.5*k),bend=b.bend+0.12*S(t*b.sp*0.7+b.ph*1.3)+0.55*k*b.curl,a=base+b.da*(1+0.08*u+0.6*k)+sway,ln=b.len*(1+0.02*u+0.3*k);ox+=dx;oy+=dy;
      var ex=ox+K(a)*ln,ey=oy+S(a)*ln,mx=ox+K(a)*ln*0.5-S(a)*ln*bend*0.5,my=oy+S(a)*ln*0.5+K(a)*ln*bend*0.5;
      if(al<0.01)continue;fx.strokeStyle='rgba('+b.g+','+b.g+','+(b.g-4)+','+al.toFixed(2)+')';fx.lineWidth=b.w;
      fx.beginPath();fx.moveTo(ox,oy);fx.quadraticCurveTo(mx,my,ex,ey);fx.stroke();}}

    // ---------- one cycle: haul taut, strain (tremble, fibres snap), give way past slack, settle ----------
    var PERIOD=30,BUILD=15,HOLD=15,GIVE=30;
    function tension(t){return (1-K(TAU*t/PERIOD))/2;var c=t%PERIOD;
     if(c<BUILD){var v=c/BUILD;return v*v*(3-2*v);}
     if(c<HOLD)return 1;
     var r=Math.min(1,(c-HOLD)/(GIVE-HOLD));return 1-r*r*(3-2*r);}
    function strain(t){return 0;var c=t%PERIOD;if(c<BUILD-0.4||c>HOLD+0.12)return 0;if(c<BUILD)return sm(BUILD-0.4,BUILD,c);return c>HOLD?1-(c-HOLD)/0.12:1;}
    var view=rc.getContext('2d'),STRIP=4,KCX=600;
    function blit(img,al,sh,t){view.globalAlpha=al;
     if(sh<=0){view.drawImage(img,0,0);return;}
     for(var x=0;x<W;x+=STRIP){var near=1-sm(60,330,Math.abs(x-KCX)),dy=sh*0.35*(1+1.2*near)*(S(t*47+x*0.031)+0.5*S(t*83+x*0.07)),dx=sh*0.25*S(t*61+x*0.02);
      view.drawImage(img,x*dpr,0,STRIP*dpr,H*dpr,(x+dx)*dpr,dy*dpr,(STRIP+0.6)*dpr,H*dpr);}}
    function drawRope(u,sh,t){view.setTransform(1,0,0,1,0,0);view.clearRect(0,0,rc.width,rc.height);
     var fu=u*(NF-1),a=Math.floor(fu),b=Math.min(NF-1,a+1),k=fu-a;
     blit(frames[a],1,sh,t);if(k>0.02&&b!==a)blit(frames[b],k,sh,t);view.globalAlpha=1;}

    // fibres that snap off the knot at full strain: flung outward, falling and fading
    var snaps=[],lastCycle=-1,gT=geoms[NF-1],kIdx=[];
    for(var i=0;i<gT.N;i++){if(Math.abs(gT.P[i].x-gT.KC.x)<150&&Math.min(gT.P[i].s,gT.LEN-gT.P[i].s)>FRAY*2)kIdx.push(i);}
    function spawnSnaps(cycle){snaps=[];for(var q=0;q<0;q++){var h=cycle*13.7+q*3.1,pp=gT.P[kIdx[Math.floor(hash(h)*kIdx.length)]],sg=hash(h+1)<0.5?-1:1,
      a=Math.atan2(pp.ny*sg,pp.nx*sg)+(hash(h+2)-0.5)*1.2,sp=40+hash(h+3)*60;
      snaps.push({x:pp.x+pp.nx*sg*R*0.9,y:pp.y+pp.ny*sg*R*0.9,vx:K(a)*sp,vy:S(a)*sp-50,a:a,spin:(hash(h+4)-0.5)*9,len:12+hash(h+5)*26,
       t0:BUILD+0.1+hash(h+6)*(HOLD-BUILD-0.05),g:Math.floor(175+hash(h+7)*45),w:0.5+hash(h+8)*0.5});}}
    function drawSnaps(t){var cyc=Math.floor(t/PERIOD),c=t%PERIOD;if(cyc!==lastCycle){lastCycle=cyc;spawnSnaps(cyc);}
     for(var q=0;q<snaps.length;q++){var f=snaps[q],e=c-f.t0;if(e<0||e>1.1)continue;var al=0.7*Math.min(1,e*8)*(1-e/1.1);
      var x=f.x+f.vx*e,y=f.y+f.vy*e+160*e*e,a=f.a+f.spin*e;
      fx.strokeStyle='rgba('+f.g+','+f.g+','+(f.g-4)+','+al.toFixed(2)+')';fx.lineWidth=f.w;
      fx.beginPath();fx.moveTo(x-K(a)*f.len/2,y-S(a)*f.len/2);fx.quadraticCurveTo(x+S(a)*3,y-K(a)*3,x+K(a)*f.len/2,y+S(a)*f.len/2);fx.stroke();}}

    view.drawImage(frames[0],0,0);drawFibers(0,0);
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce){var st=null,last=0;
     (function loop(now){if(stopped)return;
      if(ready()&&now-last>=33&&!document.hidden){if(st===null)st=now;last=now;var t=(now-st)/1000,u=tension(t);drawRope(u,strain(t),t);drawFibers(t,u);drawSnaps(t);}
      requestAnimationFrame(loop);})(performance.now());}
    return function(){stopped=true;};
  }

  // The slideshow: the rope (the main picture) and the hands ("Some bonds are priceless") take turns, each resting
  // fully in view for five seconds, under the same three frames, each with its own caption (both captions sit in the markup, stacked).
  // Pictures and captions cross-dissolve slowly (four seconds, eased at both ends), and the photo settles in with a slight zoom. Hovering or focusing the picture holds it;
  // the round button pauses it; with reduced motion it starts paused on the rope.
  var HOLD = 5000, FADE = 4000; // each picture rests fully in view for HOLD ms, then dissolves over FADE ms
  var SLIDES = [
    { alt: 'A thick rope tied in a tight knot, both ends fraying' },
    { alt: "A weathered hand with a wedding ring holding a baby's tiny hand" }
  ];
  var ICON_PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"/><rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5z" fill="currentColor"/></svg>';
  function startSlides(stage, hero) {
    var art = stage.querySelector('.art'), btn = stage.querySelector('.pause'), img = stage.querySelector('.slide');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var idx = 0, paused = !!reduce, hold = false, timer = null;
    function label() { btn.innerHTML = paused ? ICON_PLAY : ICON_PAUSE; btn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); }
    function show(i) {
      idx = i; stage.classList.toggle('s2', i === 1); art.setAttribute('aria-label', SLIDES[i].alt);
      hero.classList.toggle('s2', i === 1);
      hero.querySelectorAll('.t1').forEach(function (el) { el.setAttribute('aria-hidden', i === 1 ? 'true' : 'false'); });
      hero.querySelectorAll('.t2').forEach(function (el) { el.setAttribute('aria-hidden', i === 1 ? 'false' : 'true'); });
    }
    function tick() {
      if (!document.body.contains(stage)) { stop(); return; }
      if (paused || hold || document.hidden || !img.complete || !img.naturalWidth) return;
      show(1 - idx);
    }
    function stop() { clearInterval(timer); }
    btn.addEventListener('click', function () { paused = !paused; label(); });
    stage.addEventListener('mouseenter', function () { hold = true; });
    stage.addEventListener('mouseleave', function () { hold = false; });
    art.addEventListener('focusin', function () { hold = true; });
    art.addEventListener('focusout', function () { hold = false; });
    label();
    timer = setInterval(tick, HOLD + FADE);
    return stop;
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
    // The disclaimer folds into one quiet line; "Disclaimer" opens the full ownership and advice notes
    var ft = document.querySelector('#p75L .p75foot'), mini = ft && ft.querySelector('.mini');
    if (mini && !mini.querySelector('.p75more')) {
      mini.innerHTML = '&copy; ' + new Date().getFullYear() + ' Rahul Saxena &middot; Not financial advice &middot; <button type="button" class="p75more" aria-expanded="false">Disclaimer</button>';
      var more = mini.querySelector('.p75more');
      more.addEventListener('click', function () { var o = ft.classList.toggle('open'); more.setAttribute('aria-expanded', o ? 'true' : 'false'); });
    }
    readings(main.querySelector('.tape'));
    var stage = main.querySelector('.stage');
    // draw the rope after the first paint, then fade it in
    setTimeout(function () {
      if (!document.body.contains(stage)) return;
      stopRope = startRope(stage.querySelector('#p75rope'), stage.querySelector('#p75fibers'));
      stage.classList.add('on');
      stopSlides = startSlides(stage, main.querySelector('.hero'));
    }, 60);
  }
  function render() { withShell(build); }
  function clear() {
    if (stopRope) { stopRope(); stopRope = null; }
    if (stopSlides) { stopSlides(); stopSlides = null; }
    var r = document.getElementById('p75L');
    if (r && r.getAttribute('data-page') === 'home' && window.P75SHELL) window.P75SHELL.unmount();
  }
  window.P75HOME = { render: render, clear: clear };
})();
