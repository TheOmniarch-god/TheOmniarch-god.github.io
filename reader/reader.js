(function(){
  'use strict';
  var chapters=window.READER_DATA&&window.READER_DATA.chapters;
  if(!Array.isArray(chapters)||!chapters.length)return;
  var $=function(id){return document.getElementById(id);};
  var prefsKey='gzr-reading-room-settings', progressKey='gzr-reading-room-progress';
  var defaults={theme:'paper',font:'serif',size:20,width:68,leading:1.9};
  function get(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback;}catch(e){return fallback;}}
  function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
  var stored=get(prefsKey,{}), prefs={
    theme:['paper','light','night'].includes(stored.theme)?stored.theme:defaults.theme,
    font:['serif','sans'].includes(stored.font)?stored.font:defaults.font,
    size:Math.min(28,Math.max(16,Number(stored.size)||defaults.size)),
    width:Math.min(80,Math.max(48,Number(stored.width)||defaults.width)),
    leading:Math.min(2.3,Math.max(1.5,Number(stored.leading)||defaults.leading))
  };
  var pathMatch=location.pathname.match(/^\/reader\/chapter-(\d+)\/?$/);
  // Existing shared query links remain valid; clean chapter paths take priority.
  var raw=pathMatch?pathMatch[1]:new URLSearchParams(location.search).get('chapter');
  var number=/^\d+$/.test(raw||'')?Number(raw):1;
  var chapter=chapters.find(function(c){return c.number===number;})||chapters[0];
  var index=chapters.indexOf(chapter),words=['ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN','ELEVEN'];
  function pad(n){return String(n).padStart(2,'0');}
  function chapterUrl(n){return '/reader/chapter-'+n+'/';}
  function makeLink(c){var a=document.createElement('a'),b=document.createElement('b'),t=document.createElement('span');a.className='chapter-link';a.href=chapterUrl(c.number);if(c.number===chapter.number)a.setAttribute('aria-current','page');b.textContent=pad(c.number);t.textContent=c.title;a.append(b,t);return a;}
  chapters.forEach(function(c){$('chapter-rail').appendChild(makeLink(c));$('mobile-chapters').appendChild(makeLink(c));});
  $('chapter-number').textContent=pad(chapter.number);$('hero-chapter').textContent=words[index]||pad(chapter.number);$('bar-chapter').textContent='CHAPTER '+pad(chapter.number);$('chapter-count').textContent=pad(chapter.number)+' / '+pad(chapters.length);$('chapter-title').textContent=chapter.title;
  document.title='Chapter '+chapter.number+': '+chapter.title+' · Reading Room';
  var prose=$('chapter-prose');
  chapter.paragraphs.forEach(function(p){var el=document.createElement('p');if(p.scene)el.classList.add('scene-break');if(p.poem)el.classList.add('prose-poem');el.innerHTML=p.html;prose.appendChild(el);});
  var count=(prose.textContent.trim().match(/\S+/g)||[]).length;$('reading-words').textContent=count.toLocaleString()+' WORDS';$('reading-estimate').textContent='~'+Math.max(1,Math.ceil(count/220))+' MIN READ';
  $('wiki-guide').href='/wiki/chapter-'+chapter.number+'/';$('source-chapter').href='https://ri.theomniarch.com.ng/chapter-'+chapter.number;$('rail-source').href=$('source-chapter').href;
  function nav(id,offset){var el=$(id),next=chapters[index+offset];if(!next){el.setAttribute('aria-disabled','true');el.removeAttribute('href');el.querySelector('strong').textContent=offset<0?'Beginning of Volume I':'You’re caught up';return;}el.href=chapterUrl(next.number);el.querySelector('strong').textContent=next.title;}
  nav('previous-chapter',-1);nav('next-chapter',1);
  function apply(){var root=document.documentElement;root.dataset.readerTheme=prefs.theme;root.dataset.readerFont=prefs.font;root.style.setProperty('--reader-size',prefs.size+'px');root.style.setProperty('--reader-width',prefs.width+'ch');root.style.setProperty('--reader-leading',prefs.leading);$('size-output').textContent=prefs.size+' px';$('width-output').textContent=prefs.width+' ch';$('leading-output').textContent=Number(prefs.leading).toFixed(1);$('font-size').value=prefs.size;$('line-width').value=prefs.width;$('line-height').value=prefs.leading;document.querySelectorAll('[data-theme]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.theme===prefs.theme));});document.querySelectorAll('[data-font]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.font===prefs.font));});save(prefsKey,prefs);}
  document.querySelectorAll('[data-theme]').forEach(function(b){b.addEventListener('click',function(){prefs.theme=b.dataset.theme;apply();});});
  document.querySelectorAll('[data-font]').forEach(function(b){b.addEventListener('click',function(){prefs.font=b.dataset.font;apply();});});
  [['font-size','size'],['line-width','width'],['line-height','leading']].forEach(function(pair){$(pair[0]).addEventListener('input',function(e){prefs[pair[1]]=Number(e.target.value);apply();});});
  $('settings-reset').addEventListener('click',function(){prefs=Object.assign({},defaults);apply();});
  function openSettings(open){$('reader-settings').hidden=!open;$('settings-toggle').setAttribute('aria-expanded',String(open));if(open)$('settings-close').focus();else $('settings-toggle').focus();}
  $('settings-toggle').addEventListener('click',function(){openSettings($('reader-settings').hidden);});$('settings-close').addEventListener('click',function(){openSettings(false);});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!$('reader-settings').hidden)openSettings(false);});
  var savedProgress=get(progressKey,{});
  if(savedProgress.chapter===chapter.number && savedProgress.percent>2){$('resume-reading').hidden=false;$('resume-reading').textContent='Resume · '+savedProgress.percent+'%';$('resume-reading').addEventListener('click',function(){var top=prose.getBoundingClientRect().top+window.scrollY;var range=Math.max(0,prose.offsetHeight-window.innerHeight);window.scrollTo({top:top+range*Math.min(100,Math.max(0,savedProgress.percent))/100,behavior:'smooth'});$('resume-reading').hidden=true;});}
  function progress(){var rect=prose.getBoundingClientRect(), total=Math.max(1,prose.offsetHeight-window.innerHeight), traversed=Math.max(0,Math.min(1,-rect.top/total)),percent=Math.round(traversed*100);$('progress-bar').style.width=percent+'%';document.querySelector('.reading-progress').setAttribute('aria-valuenow',percent);if(rect.top<window.innerHeight && rect.bottom>0)save(progressKey,{chapter:chapter.number,percent:percent});}
  window.addEventListener('scroll',progress,{passive:true});apply();
})();
