(function(){
  document.querySelectorAll('.tg-card').forEach(function(c){
    var a=c.querySelector('a[href^="#/"]'); if(!a) return;
    c.setAttribute('data-href',a.getAttribute('href'));
    c.addEventListener('click',function(e){ if(e.target.closest('a,button,input')) return; goTo(a.getAttribute('href')); });
  });
  var sc=document.getElementById('slide-card');
  if(sc){ var slides=sc.querySelectorAll('.slide'), dots=sc.querySelectorAll('#slide-dots button'), i=0, t=null;
    function go(n){ i=(n+slides.length)%slides.length; slides.forEach(function(s,k){s.classList.toggle('on',k===i)}); dots.forEach(function(d,k){d.classList.toggle('on',k===i)}); }
    function auto(){ clearInterval(t); if(!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) t=setInterval(function(){go(i+1)},7000); }
    dots.forEach(function(d,k){ d.addEventListener('click',function(e){e.stopPropagation();go(k);auto();}); });
    sc.addEventListener('mouseenter',function(){clearInterval(t)});
    sc.addEventListener('mouseleave',auto);
    auto();
    if(window.matchMedia){var motion=window.matchMedia('(prefers-reduced-motion: reduce)'); if(motion.addEventListener) motion.addEventListener('change',auto);}
    /* drag or swipe by hand (touch or mouse); a real drag does not count as a tap */
    var sx=null, sy=null, dragging=false;
    sc.addEventListener('pointerdown',function(e){ if(e.button>0) return; if(e.target.closest && e.target.closest('#slide-dots')) return; sx=e.clientX; sy=e.clientY; dragging=false; });
    sc.addEventListener('pointermove',function(e){ if(sx===null) return; var dx=e.clientX-sx, dy=e.clientY-sy;
      if(!dragging && Math.abs(dx)>8 && Math.abs(dx)>Math.abs(dy)) dragging=true;
      if(dragging) sc.classList.add('dragging'); });
    function endDrag(e){ if(sx===null) return; var dx=e.clientX-sx; sx=null;
      if(dragging){ sc.dataset.dragged='1'; setTimeout(function(){ delete sc.dataset.dragged; },0); sc.classList.remove('dragging');
        if(Math.abs(dx)>40){ go(dx<0? i+1 : i-1); } auto(); } }
    sc.addEventListener('pointerup',endDrag);
    sc.addEventListener('pointercancel',function(){ sx=null; dragging=false; sc.classList.remove('dragging'); });
  }
  var pop=document.getElementById('settings-pop'), gear=document.getElementById('rail-gear');
  var prefs={text:'standard',color:'auto',width:'standard'};
  try{ Object.assign(prefs, JSON.parse(localStorage.getItem('omniarch-prefs')||'{}')); }catch(e){}
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  function apply(){ var el=document.documentElement;
    el.setAttribute('data-text',prefs.text); el.setAttribute('data-width',prefs.width);
    var dark = prefs.color==='dark' || (prefs.color==='auto' && mq.matches);
    el.setAttribute('data-theme', dark?'dark':'light');
    document.querySelectorAll('.settings-pop .seg').forEach(function(seg){ var p=seg.getAttribute('data-pref');
      seg.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-v')===prefs[p]); }); });
  }
  if(mq.addEventListener) mq.addEventListener('change',apply);
  if(gear&&pop){ gear.addEventListener('click',function(e){ e.stopPropagation(); pop.classList.toggle('open'); });
    document.addEventListener('click',function(e){ if(!pop.contains(e.target)&&!gear.contains(e.target)) pop.classList.remove('open'); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') pop.classList.remove('open'); });
    pop.querySelectorAll('.seg button').forEach(function(b){ b.addEventListener('click',function(){ prefs[b.parentElement.getAttribute('data-pref')]=b.getAttribute('data-v'); localStorage.setItem('omniarch-prefs',JSON.stringify(prefs)); apply(); }); });
  }
  var proxTargets=[].slice.call(document.querySelectorAll('.tg-card,.template-navpill'));
  var pTick=false;
  document.addEventListener('mousemove',function(e){
    if(pTick) return; pTick=true;
    requestAnimationFrame(function(){ pTick=false;
      for(var i=0;i<proxTargets.length;i++){ var el=proxTargets[i], r=el.getBoundingClientRect();
        var dx=Math.max(r.left-e.clientX,0,e.clientX-r.right), dy=Math.max(r.top-e.clientY,0,e.clientY-r.bottom);
        var d=Math.sqrt(dx*dx+dy*dy); var f=Math.max(0,1-d/90);
        el.style.setProperty('--prox',f.toFixed(3));
      }
    });
  });
  apply();
})();

/* omni-nav v2: full on main, compact on pages, proximity expand */
(function(){
  var nav=document.getElementById('omni-nav'); if(!nav) return;
  var page=document.getElementById('omni-page');
  function label(){
    var h=hashOf()||'#/';
    if(h==='#'||h==='#/'||h===''||h.indexOf('#explore')===0) return 'Main';
    var m=h.replace(/^#\/(wiki\/)?/,'').split('?')[0].replace(/\/+$/,'');
    if(!m) return 'Main';
    var a=window.OMNIARCH_ARTICLES&&window.OMNIARCH_ARTICLES[m];
    if(a&&a.t) return a.t;
    return m.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase()});
  }
  function isMain(){ return (hashOf()||'').indexOf('#/wiki')===-1; }
  function state(){
    if(page) page.textContent=label();
    nav.classList.toggle('is-collapsed', !isMain() && !nav.classList.contains('near'));
    var mp=nav.querySelector('.nv-main'); if(mp) mp.classList.toggle('on', isMain());
  }
  document.addEventListener('mousemove',function(e){
    var r=nav.getBoundingClientRect();
    var near=e.clientX>r.left-80&&e.clientX<r.right+80&&e.clientY>r.top-80&&e.clientY<r.bottom+80;
    if(near!==nav.classList.contains('near')){nav.classList.toggle('near',near);state();}
  },{passive:true});
  addEventListener('route',state); state();
})();
/* search proximity: opens wide when cursor approaches */
(function(){
  var zone=document.getElementById('search-zone'); if(!zone || zone.dataset.proximity!=='on') return;
  var box=document.getElementById('search-box'), input=document.getElementById('search-input'), btn=document.getElementById('search-trigger');
  var open=false,timer=null;
  function setOpen(v){
    if(v===open) return; open=v;
    if(v){ box.style.display='block'; requestAnimationFrame(function(){box.classList.add('wide')}); }
    else { box.classList.remove('wide'); setTimeout(function(){ if(!open) box.style.display='none'; },380); }
  }
  document.addEventListener('mousemove',function(e){
    var r=zone.getBoundingClientRect();
    var near=e.clientX>r.left-90&&e.clientX<r.right+90&&e.clientY>r.top-90&&e.clientY<r.bottom+90;
    if(near) { clearTimeout(timer); setOpen(true); }
    else if(open && document.activeElement!==input && !input.value){ timer=setTimeout(function(){setOpen(false)},450); }
  },{passive:true});
  input.addEventListener('blur',function(){ if(!input.value) setTimeout(function(){setOpen(false)},300); });
})();

/* spotlight: a tap anywhere on the card (not the dots) opens the current slide's site */
(function(){ var sc=document.getElementById('slide-card'); if(!sc) return; sc.style.cursor='pointer';
  sc.addEventListener('click', function(e){ if(e.target.closest && e.target.closest('#slide-dots')) return; if(sc.dataset.dragged) { e.preventDefault(); e.stopPropagation(); return; }
    e.preventDefault(); e.stopPropagation();
    var cur=sc.querySelector('.slide.on'); if(cur && cur.getAttribute('data-link')) window.open(cur.getAttribute('data-link'),'_blank','noopener'); }, true); })();

// Load the third-party player only after an explicit click.
(function(){
  var button=document.getElementById('play-donghua');
  if(!button)return;
  button.addEventListener('click',function(){
    var frame=document.createElement('iframe');
    frame.title='Gu Zhen Ren fan-made donghua episode 23 on YouTube';
    frame.src='https://www.youtube-nocookie.com/embed/KBN76u1Z3YI?autoplay=1';
    frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    document.getElementById('donghua-video').replaceChildren(frame);
    document.querySelector('.editorial-watch').classList.add('is-playing');
  });
})();

/* Motion is progressive enhancement: content is visible without JS and on reduced motion. */
(function(){
  var home=document.getElementById('main-view');
  if(!home || !('IntersectionObserver' in window) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches))return;
  var items=home.querySelectorAll('.featured-row > .template-flexbox-item, .editorial-lead, .editorial-heading, .editorial-card, .editorial-watch, .editorial-reader, .home-visual-heading, .home-visual-card, .home-section-head, .home-library-panel, .home-chapter-guide, .tg-card--discover');
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}});},{threshold:0.08,rootMargin:'0px 0px 40px 0px'});
  items.forEach(function(el,i){el.style.setProperty('--reveal-delay',Math.min(i%3,2)*65+'ms');el.classList.add('motion-reveal');observer.observe(el);});
  // Reveal immediately when keyboard focus reaches an element, even before intersection fires.
  home.addEventListener('focusin',function(e){var el=e.target.closest('.motion-reveal');if(el){el.classList.add('is-revealed');observer.unobserve(el);}});
})();

/* Keep the wiki backdrop in the same viewport position on every route. */
(function(){
  var hero=document.querySelector('.wiki-view .wiki-hero'); if(!hero)return;
  function align(){if(!hero.offsetParent)return;var rect=hero.getBoundingClientRect();hero.style.setProperty('--hero-left',rect.left+'px');hero.style.setProperty('--hero-top',(rect.top+window.scrollY)+'px');}
  window.addEventListener('resize',align,{passive:true});window.addEventListener('route',function(){requestAnimationFrame(align)});requestAnimationFrame(align);
})();
/* Restrained glows at a few homepage moments, never on article or index pages. */
(function(){
  var home=document.getElementById('main-view'),wiki=document.getElementById('wiki-view'),header=document.querySelector('.site-header');
  if(!home||!wiki||!header)return;
  var media=window.matchMedia('(prefers-reduced-motion: reduce)'),pending=false,lastY=window.scrollY;
  var moments=home.querySelectorAll('.editorial-heading,.home-visual-shelf,.home-chapter-guide');
  function paint(){
    pending=false;var onHome=!home.hidden;document.body.classList.toggle('home-glow-active',onHome);
    if(onHome){
      header.classList.remove('is-scrolling-away');
      var level=0,center=window.innerHeight*.48;
      moments.forEach(function(el){var r=el.getBoundingClientRect(),mid=r.top+r.height/2;level=Math.max(level,Math.max(0,1-Math.abs(mid-center)/(window.innerHeight*1.15)));});
      document.body.style.setProperty('--glow-opacity',(level*.85).toFixed(3));
    }else{
      document.body.style.removeProperty('--glow-opacity');
      if(window.scrollY<30) header.classList.remove('is-scrolling-away');
      else if(window.scrollY>lastY+2) header.classList.add('is-scrolling-away');
      else if(window.scrollY<lastY-2) header.classList.remove('is-scrolling-away');
    }
    lastY=window.scrollY;
  }
  function request(){if(!pending){pending=true;requestAnimationFrame(paint)}}
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});
  window.addEventListener('route',function(){header.classList.remove('is-scrolling-away');lastY=window.scrollY;request()});
  if(media.addEventListener)media.addEventListener('change',request);request();
})();
(function(){
  var shelf=document.getElementById('home-visual-grid');if(!shelf)return;
  var hint=shelf.parentElement.querySelector('.shelf-drag-hint');
  if(hint && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var hintObserver=new IntersectionObserver(function(entries){if(entries.some(function(e){return e.isIntersecting})){hint.classList.add('show');setTimeout(function(){hint.classList.remove('show')},1000);hintObserver.disconnect();}},{threshold:.4});hintObserver.observe(shelf);
  }
  document.querySelectorAll('[data-shelf-dir]').forEach(function(button){button.addEventListener('click',function(){var card=shelf.querySelector('.home-visual-card');var step=card?card.getBoundingClientRect().width+16:240;shelf.scrollBy({left:step*Number(button.dataset.shelfDir),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});});
  var start=null,dragged=false;
  shelf.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;start={x:e.clientX,left:shelf.scrollLeft};dragged=false;});
  window.addEventListener('pointermove',function(e){if(!start)return;var delta=e.clientX-start.x;if(Math.abs(delta)>7)dragged=true;if(dragged){shelf.scrollLeft=start.left-delta;e.preventDefault();}});
  window.addEventListener('pointerup',function(){start=null;});
  shelf.addEventListener('click',function(e){if(dragged){e.preventDefault();e.stopPropagation();dragged=false;}},true);
})();
(function(){
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var titles=document.querySelectorAll('#main-view .editorial-heading h2, #main-view .home-visual-heading h2, #main-view .home-section-head h2, #main-view .home-chapter-intro h2');
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('type-visible');observer.unobserve(entry.target);}});},{threshold:.1});
  titles.forEach(function(el){el.classList.add('type-reveal');observer.observe(el);});
})();
