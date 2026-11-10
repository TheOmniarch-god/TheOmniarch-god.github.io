/* ---- clean URLs: real paths like /wiki/chapter-9 (no #). Legacy /wiki/... links are rewritten on load. ---- */
function hashOf(){
  var p = location.pathname;
  if(p && p !== '/' && p !== '/index.html') return '#' + p.replace(/\/+$/,'');
  return location.hash || '';
}
function goTo(h){
  var path = (!h || h === '#main' || h === '#') ? '/' : (h.charAt(0) === '#' ? h.slice(1) : h);
  if(path !== location.pathname) history.pushState(null, '', path);
  window.dispatchEvent(new Event('route'));
}
if('scrollRestoration' in history) history.scrollRestoration = 'manual';
(function(){
  if(location.hash.indexOf('#/') === 0){ history.replaceState(null, '', location.hash.slice(1)); }
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var h = a.getAttribute('href');
    if(h === '#main' || h.indexOf('#/') === 0 || h.indexOf('/wiki/') === 0){ e.preventDefault(); goTo(h); window.scrollTo(0,0); }
  });
  window.addEventListener('popstate', function(){ window.dispatchEvent(new Event('route')); });
  window.addEventListener('hashchange', function(){ if(location.hash.indexOf('#/')===0){ history.replaceState(null, '', location.hash.slice(1)); window.dispatchEvent(new Event('route')); } });
})();
(function(){
  var S = window.OMNIARCH_STATE, A = window.OMNIARCH_ARTICLES;
  var fmt = function(n){ return n.toLocaleString('en-US'); };
  var esc = function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };

  /* spoiler-free narrator briefs, one per typeset chapter; the bench adds new entries as chapters are typeset */
  var BRIEFS = {
    1: "Before the first page turns, the narrator sets you on a mountaintop where a standoff has reached its height. The voice is cold and sure of itself, and it does not explain itself yet. Then the scene moves to the Gu Yue clan on Qing Mao Mountain, where the Aperture Opening Ceremony is approaching and every family is watching who will be chosen.",
    2: "The narrator now slows and turns the story back on itself. Expect the ground to shift: this chapter asks you to watch a familiar figure begin again, and it offers very little explanation at first. Read it for the questions it raises rather than the answers it withholds.",
    3: "A chapter of blunt, sharp exchanges. The narrator leans into the everyday friction of the clan and the people who live inside it. Read it for the voices and the tempers, and let the consequences arrive on their own.",
    4: "The clan and its protagonist are named aloud, placing you firmly inside the Gu Yue household and its daily rhythm. The narrator treats the ordinary as important here, because the chapter is building the ground that later events will stand on.",
    5: "This chapter reaches back to the myth of Ren Zu. Its title names an ancestral tradition of Gu, and the narrator invites you to read it as the deep foundation beneath the story rather than a detour from it.",
    6: "A chapter that looks ahead. Its title is a promise about what is to come, and the narrator asks you to hold on to the uncertainty it creates. Pay attention to who is planning and who is only reacting.",
    7: "The chapter introduces the idea of ranks and the inheritances passed down among masters. Watch how a legacy is set up and how the ranking system frames every ambition in the volume. The narrator treats the rules here as the rules the characters live by.",
    11: "The title is a warning about a lure: something that looks like a gift may be the bait. The narrator keeps the details close, so watch who offers help, and what each offer quietly asks in return.",
    8: "A chapter about change, and about the people who remain. The narrator asks you to read the quiet moments as closely as the dramatic ones, because the shifts here are gradual and easy to miss.",
    9: "The title gives the tone away: relationships are pulling apart. The narrator keeps the focus on the spaces between characters, so read the silences and the distances as closely as the lines they speak.",
    10: "The title is a warning in itself: heaven does not behave predictably, and refining Gu is hard work that costs something at every step. The narrator asks you to watch what each choice demands, and to read the effort as closely as the outcome that the chapter lets you guess at."
  };
  /* ---- generate chapter articles + chapter index from the ledger ---- */
  S.chapters.forEach(function(c,i){
    var prev = S.chapters[i-1], next = S.chapters[i+1];
    var rows = [["Volume","Volume 1: Demonic Nature Never Changes"],["Number","Chapter "+c.n],["Position",(prev?"After Chapter "+prev.n:"Opens the volume")+(next?" · before Chapter "+next.n:"")]];
    var body;
    body = BRIEFS[c.n] ? [BRIEFS[c.n]] : ["This chapter’s brief is being written from the translation bench."];
    A["chapter-"+c.n] = { t:"Chapter "+c.n+": "+c.title, k:"Chapter", ib:rows, b:body,
      see:[ prev?"chapter-"+prev.n:"volume-1", next?"chapter-"+next.n:"chapters", "chapters" ],
      cat:["Chapters","Volume 1"] };
  });
  A.chapters.indexList = S.chapters.map(function(c){ return "chapter-"+c.n; });

  /* ---- category pages: every category used by an article gets its own page, with a description and its members ---- */
  function catKey(c){ return 'category-'+String(c).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  var CATDESC = {
    'Gu': 'Gu are the true essence of heaven and earth, refined, cultivated and used by Gu Masters. Articles here cover individual Gu and how they are used.',
    'Legendary': 'Legendary Gu are the rarest and most storied Gu of the novel, whose names carry weight across the world.',
    'Myth': 'Myth gathers the legends, mythic figures and parables of the Gu world, including the companion scripture The Legends of Ren Zu.',
    'Concepts': 'Concepts are the ideas the story relies on: principles, systems and terms of the Gu world.',
    'Cultivation': 'Cultivation covers the ranks, methods and paths by which Gu Masters grow in power.',
    'Characters': 'Characters are the people of the story: protagonists, clan members, masters and others.',
    'Men': 'Men are the humans of the Gu world. Ren Zu is called the first human (Ch. 5), and the people of the story are gathered here.',
    'Gu Yue Clan': 'The Gu Yue clan is the family into which the protagonist is born; its members are gathered here.',
    'Gu Masters': 'Gu Masters are the practitioners of Gu, with their ranks, lineages and deeds.',
    'Demonic Path': 'The Demonic Path is the road the protagonist walks without compromise.',
    'Bai Clan': 'The Bai clan is one of the clans of the Gu world, with its own members and history.',
    'Locations': 'Locations are the places of the Gu world, from clan lands to regions, mountains and cosmic realms.',
    'Cosmology': 'Cosmology covers the structure of the heavens, the world and the origins of things.',
    'Clans': 'Clans are the families and organisations of the Gu world, each with its own lineage and inheritance.',
    'Factions': 'Factions are the powers and alliances that shape the politics of the Gu world.',
    'Paths': 'Paths are the cultivation roads followed by Gu Masters, each with its own philosophy and rules.',
    'Works': 'Works are the books, volumes and texts that make up the translation and its companion scripture.',
    'Volumes': 'Volumes are the book divisions of the translation, each with its own chapters.',
    'Volume 1': 'Volume 1, Demonic Nature Never Changes, is the opening volume of the translation.',
    'Gu Zhen Ren': 'Gu Zhen Ren is the novel by Gu Zhen Ren, translated into English by The Omniarch.',
    'Front matter': 'Front matter is the material that opens the book: prefaces and the author’s own words.',
    'Portals': 'Portals are index pages that gather articles on a single topic.',
    'Timeline': 'The timeline gathers the events and dates of the story and of the translation.',
    'Glossary': 'The glossary gathers the terms and names of the Gu world, with short explanations.',
    'Community': 'Community covers the readers’ spaces: the Discord clan hall, the channels and the discussion.',
    'People': 'People covers the people behind the work and the wider world of the story.',
    'Translators': 'Translators are the people who put the novel into English.',
    'Authors': 'Authors are the people who wrote the novel and its companion works.',
    'Indexes': 'Indexes are lists that help readers find articles by topic.',
    'Events': 'Events are the happenings of the story and the translation’s timeline.',
    'Rites': 'Rites are the ceremonies and rituals of the Gu world.',
    'Chapters': 'Chapters lists the chapters typeset so far, in order, with the translator’s titles.'
  };
  /* Every person named so far is a human of the Gu world (see chapter notes). Other races get their own categories only once the translation names them. */
  ['fang-yuan','fang-zheng','shen-cui','granny-shen','bai-ning-bing','ren-zu'].forEach(function(k){
    if(A[k] && A[k].cat && A[k].cat.indexOf('Men')<0) A[k].cat.push('Men');
  });
  var catMembers = {};
  Object.keys(A).forEach(function(k){
    (A[k].cat||[]).forEach(function(c){ (catMembers[c] = catMembers[c] || []).push(k); });
  });
  Object.keys(catMembers).forEach(function(c){
    var key = catKey(c), mem = catMembers[c].filter(function(k){ return k !== key; });
    var desc = CATDESC[c] || ('Pages filed under '+c+'.');
    A[key] = { t:'Category: '+c, k:'Category', b:[desc],
      ib:[['Pages', String(mem.length)], ['Name', c]], members: mem, see: [], cat: [] };
  });

  /* ---- growth counters on the main page ---- */
  var typeset = S.chapters.length;
  var cap = document.getElementById('today-caption');
  if(cap) cap.innerHTML = 'Today’s date at the translation bench: <b><a href="/wiki/chapters">Chapter '+S.atBench+'</a> typesetting</b> · '+typeset+' of '+fmt(S.total)+' chapters typeset';
  var now = document.getElementById('now-bullet');
  if(now) now.innerHTML = '<b><a href="/wiki/timeline">Now</a></b> - <a href="/wiki/the-omniarch">The Omniarch</a> re-translation typesets the opening volume; <a href="/wiki/chapter-'+S.chapters[typeset-1].n+'">Chapter '+S.chapters[typeset-1].n+'</a> is live and Chapter '+S.atBench+' sits at the bench.';
  var stats = document.getElementById('browse-stats');
  if(stats) stats.textContent = typeset+' chapters typeset of '+fmt(S.total)+' · '+S.parables+' parables of Ren Zu in the companion scripture · curated by The Omniarch';
  var list = document.getElementById('dir-chapters-list');
  if(list){
    list.innerHTML = S.chapters.map(function(c){ return '<a href="/wiki/chapter-'+c.n+'">'+c.n+' · '+esc(c.title)+'</a>'; }).join(' · ')
      + ' (<i><b><a href="/wiki/chapters">'+fmt(S.total-typeset)+' chapters to go, Chapter '+S.atBench+' at the bench</a></b></i>)';
  }

  /* ---- wiki router ---- */
  var mainView = document.getElementById('main-view'),
      wikiView = document.getElementById('wiki-view'),
      articleEl = document.getElementById('wiki-article'),
      crumbEl = document.getElementById('crumb-here'),
      retrievedEl = document.getElementById('wiki-retrieved');

  function link(slug,label){ return '<a href="/wiki/'+slug+'">'+esc(label||A[slug].t)+'</a>'; }

  function indexBlock(kind){
    var keys = Object.keys(A).filter(function(k){ return (A[k].cat||[]).some(function(c){return c.toLowerCase()===kind;}) || k.indexOf('chapter-')===0&&kind==='chapters'; });
    if(kind==='chapters') keys = (A.chapters.indexList||[]).slice();
    if(!keys.length) return '';
    return '<h2>Index</h2><ul class="index-list">'+keys.map(function(k){return '<li>'+link(k)+'</li>';}).join('')+'</ul>';
  }

  var sideEl = document.getElementById('wiki-side'),
      titleEl = document.getElementById('wiki-title'),
      subEl = document.getElementById('wiki-sub'),
      talkTab = document.getElementById('talk-tab'),
      talkLabel = document.getElementById('talk-tab-label'),
      routeMode = 'article', curSlug = null;

  function indexKeys(kind){
    var keys = Object.keys(A).filter(function(k){ return (A[k].cat||[]).some(function(c){return c.toLowerCase()===kind;}) || (k.indexOf('chapter-')===0 && kind==='chapters'); });
    if(kind==='chapters') keys = (A.chapters.indexList||[]).slice();
    return keys;
  }

  var PORTALS = [['chapters','Volumes & Chapters'],['characters','Characters'],['gu','Gu Worms'],['cultivation','Cultivation System'],['the-legends-of-ren-zu','Legends of Ren Zu'],['locations','Locations & World'],['clans','Factions & Clans'],['timeline','Timeline & History'],['images','Gallery'],['glossary','Glossary & Concepts'],['adaptations','Adaptations & Media'],['community','Community Hub']];

  /* Category boxes for each portal, following Tolkien Gateway's labelled boxes.
     [slug, label] links to a page that exists; [null, label] is an Open slot
     for an item that is not yet cited to a chapter. */
  var PORTAL_CATS = {
    chapters: [
      ['By Volume', [['volume-1','Volume 1'], [null,'Volume 2 onward']]],
      ['By Arc', [[null,'Arcs not yet named']]]
    ],
    characters: [
      ['By Rank', [['fang-yuan','Protagonist: Fang Yuan'], [null,'Venerables'], [null,'Immortal characters'], [null,'Mortal characters']]],
      ['By Clan', [['gu-yue-clan','Gu Yue Clan'], ['bai-clan','Bai Clan'], [null,'Other clans']]]
    ],
    gu: [
      ['By Kind', [['moonlight-gu','Moonlight Gu'], ['liquor-worm','Liquor Worm'], ['hope-gu','Hope Gu'], [null,'Mortal Gu'], [null,'Immortal Gu']]],
      ['By Recipe', [[null,'Recipes and refinements']]]
    ],
    cultivation: [
      ['By Stage', [['aperture','Aperture'], ['aptitude-grades','Aptitude grades'], ['primeval-essence','Primeval Essence'], [null,'Immortal Essence'], [null,'Dao Marks'], [null,'Tribulations']]],
      ['By Path', [['righteous-path','Righteous Path'], ['demonic-path','Demonic Path'], ['ancestral-path','Ancestral Path'], [null,'Blood, Time, Refinement and other paths']]]
    ],
    'the-legends-of-ren-zu': [
      ['By Figure', [['ren-zu','Ren Zu'], [null,'Other figures']]],
      ['By Kind', [[null,'Internal mythos'], [null,'Parables'], [null,'Human ancestor stories']]]
    ],
    locations: [
      ['By Region', [['five-regions','Five Regions'], [null,'Nine Heavens'], [null,'Blessed Lands and Grotto-Heavens']]],
      ['By Place', [['gu-yue-village','Gu Yue Village'], [null,'Other places']]]
    ],
    clans: [
      ['By Kind', [['gu-yue-clan','Gu Yue Clan'], ['bai-clan','Bai Clan'], [null,'Super Forces'], [null,'Heavenly Court'], [null,'Shadow Sect'], [null,'Regional alliances']]]
    ],
    timeline: [
      ['By Era', [[null,'Eras not yet named']]],
      ['By Event', [[null,'Major wars and events']]]
    ],
    images: [],
    glossary: [
      ['By Kind', [[null,'Terminology'], [null,'Materials'], [null,'Killer Moves'], [null,'World mechanics']]]
    ],
    adaptations: [
      ['By Medium', [[null,'Manhua'], [null,'Audiobooks'], [null,'Official artwork sources'], [null,'External media']]]
    ]
  };

  function catBoxes(slug){
    var g=PORTAL_CATS[slug]||[];
    if(!g.length) return '';
    return '<div class="tg-section-divider"><span>Categories</span></div><div class="portal-boxes">'+g.map(function(b){
      return '<div class="portal-box"><h4>'+esc(b[0])+'</h4><ul>'+b[1].map(function(it){
        return (it[0] && A[it[0]]) ? '<li>'+link(it[0],it[1])+'</li>' : '<li class="open-slot">Open: '+esc(it[1])+'</li>';
      }).join('')+'</ul></div>';
    }).join('')+'</div>';
  }

  function letterList(keys,prefix,all){
    var g={}, order=[];
    keys.filter(function(k){return A[k];}).sort(function(x,y){return A[x].t.localeCompare(A[y].t);}).forEach(function(k){
      var L=A[k].t.charAt(0).toUpperCase(); if(!g[L]){ g[L]=[]; order.push(L); } g[L].push(k);
    });
    if(all){ order='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); order.forEach(function(L){ if(!g[L]) g[L]=[]; }); }
    return '<div class="cat-cols">'+order.map(function(L){
      var items=g[L]||[];
      var body = items.length ? '<ul class="index-list">'+items.map(function(k){return '<li>'+link(k)+'</li>';}).join('')+'</ul>' : '';
      return '<div class="cat-letter"'+(prefix?' id="'+prefix+L+'"':'')+'><h5>'+esc(L)+'</h5>'+body+'</div>';
    }).join('')+'</div>';
  }

  function portalHTML(slug,a){
    if(slug==='characters'){
      var tabs0='<div class="tabs-wrap"><button class="tab-arrow" data-dir="-1" aria-label="Scroll tabs left">&#8249;</button><div class="portal-tabs">'+PORTALS.map(function(t){return '<a href="/wiki/'+t[0]+'" class="'+(t[0]===slug?'on':'')+'">'+t[1]+'</a>';}).join('')+'</div><button class="tab-arrow" data-dir="1" aria-label="Scroll tabs right">&#8250;</button></div>';
      var open='<div class="open-tile"><div class="sq"></div><div class="lb">Open</div></div>';
      return tabs0+'<div class="tg-section-divider"><span>Featured</span></div><div class="portal-grid">'
        +'<a href="/wiki/category-men"><div class="sq" style="background-image:url(\'/assets/inline/art-ren-zu.webp\')"></div><div class="lb">Men</div></a>'
        +open+open+open+open+open+'</div>'+catBoxes('characters');
    }
    if((slug==='images' || a.index==='art-library') && window.renderImagesGallery) return window.renderImagesGallery(slug);
    var kind=a.index, keys=indexKeys(kind).filter(function(k){return k!==slug;});
    var tabs='<div class="tabs-wrap"><button class="tab-arrow" data-dir="-1" aria-label="Scroll tabs left">&#8249;</button><div class="portal-tabs">'+PORTALS.map(function(t){return '<a href="/wiki/'+t[0]+'" class="'+(t[0]===slug?'on':'')+'">'+t[1]+'</a>';}).join('')+'</div><button class="tab-arrow" data-dir="1" aria-label="Scroll tabs right">&#8250;</button></div>';
    var gridKeys = keys.filter(function(k){return A[k].img;});
    var grid = gridKeys.length ? '<div class="tg-section-divider"><span>Featured</span></div><div class="portal-grid">'+gridKeys.map(function(k){return '<a href="/wiki/'+k+'"><div class="sq" style="background-image:url(\''+A[k].img+'\')"></div><div class="lb">'+esc(A[k].t)+'</div></a>';}).join('')+'</div>' : '';
    var groups={};
    keys.forEach(function(k){ var g=A[k].k||'Other'; (groups[g]=groups[g]||[]).push(k); });
    var gk=Object.keys(groups);
    var boxes=PORTAL_CATS[slug]?catBoxes(slug):'<div class="tg-section-divider"><span>Categories</span></div><div class="portal-boxes">'+gk.slice(0,4).map(function(g){
      return '<div class="portal-box"><h4>By '+esc(g)+'</h4><ul>'+groups[g].map(function(k){return '<li>'+link(k)+'</li>';}).join('')+'</ul></div>';
    }).join('')+'</div>';
    var have={}; keys.forEach(function(k){ if(A[k]) have[A[k].t.charAt(0).toUpperCase()]=true; });
    var az='<div class="tg-section-divider"><span>'+esc(a.t)+' A-Z</span></div><div class="az-bar"><span class="az-label">Browse</span>'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(c){
      return '<a href="#" data-sec="az-'+c+'"'+(have[c]?'':' class="az-off"')+'>'+c+'</a>';
    }).join('')+'</div>';
    var all='<div class="tg-section-divider"><span>All pages</span></div>'+letterList(keys,'az-',true);
    return tabs+az+grid+boxes;
  }

  function infoboxHTML(a){
    var rows=(a.ib||[]).map(function(r){return '<tr><th>'+esc(r[0])+'</th><td>'+esc(r[1])+'</td></tr>';}).join('');
    var img=a.img ? '<div class="ib-img"><img src="'+a.img+'" alt="'+esc(a.t)+'"><div class="ib-cap">Art: '+esc(a.art||'community artist')+', '+esc(a.t)+'.</div></div>' : '';
    return '<aside class="infobox"><div class="ib-name">'+esc(a.t)+'</div><div class="ib-kind">'+esc(a.k||'')+'</div>'+img
      +(rows ? '<div class="ib-gen">General Information</div><table class="ib-table">'+rows+'</table>' : '')+'</aside>';
  }
  function sideHTML(a){
    var isArt = a.k!=='Index' && a.k!=='Category';
    var toc = (isArt || a.index) ? [] : [['sec-overview','Overview']];
    if(!isArt && a.ib&&a.ib.length) toc.push(['sec-details','Details']);
    
    if(a.see&&a.see.length) toc.push(['sec-see','See also']);
    return '<div class="side-box"><h4>Last modified</h4><div class="toc"><div class="row"><span><svg style="width:14px;height:14px;vertical-align:-2px;opacity:.7"><use href="#glyph-history"/></svg> Today · The Omniarch</span></div></div></div>'
      +(toc.length ? '<div class="side-box"><h4>Contents</h4><div class="toc">'+toc.map(function(t){return '<a href="#" data-sec="'+t[0]+'">'+t[1]+'<span class="caret">⌄</span></a>';}).join('')+'</div></div>' : '');
  }

  function talkHTML(a,slug){
    return '<div class="talk-banner"><h3>Want to talk about '+esc(a.t)+' in real-time?</h3><p>Join the Discord server for discussions, readings and theories between typesettings.</p><a class="tg-button tg-button--progressive" href="https://discord.gg/UgwTKn4sQf" target="_blank" rel="noreferrer noopener">Join our Discord</a></div>'
      + '<h2 class="sec" id="sec-overview"><span class="caret">⌃</span>Start a discussion about '+esc(a.t)+'</h2><div class="sec-body"><p>Discussion pages are where readers weigh how to make the encyclopedia the best it can be, corrections, glossary notes, theories. The bench gathers on Discord; pull up a chair and start the thread for '+link(slug)+'.</p><a class="tg-button" href="https://discord.gg/UgwTKn4sQf" target="_blank" rel="noreferrer noopener">Start a discussion</a></div>';
  }

  function render(slug){
    var a = A[slug];
    if(!a){ // A-to-Z or unknown
      if(slug && slug.indexOf('atoz/')===0){
        var L = slug.slice(5).toUpperCase();
        var keys = Object.keys(A).filter(function(k){ return A[k].t.toUpperCase().indexOf(L)===0; }).sort(function(x,y){return A[x].t.localeCompare(A[y].t);});
        titleEl.textContent='Index · '+L; subEl.textContent='From the Gu Zhen Ren Encyclopedia'; talkLabel.textContent='Discussion';
        articleEl.innerHTML = (keys.length ? '<ul class="index-list">'+keys.map(function(k){return '<li>'+link(k)+'</li>';}).join('')+'</ul>' : '<div class="stub-note">No articles under this letter yet, the encyclopedia grows with the bench.</div>');
        sideEl.innerHTML='';
        crumbEl.textContent = 'Index · '+L;
        retrievedEl.textContent = 'Retrieved from “Gu Zhen Ren Encyclopedia, Index: '+L+'”. Growth ledger: '+S.chapters.length+' of '+fmt(S.total)+' chapters typeset.';
        return true;
      }
      return false;
    }
    curSlug = slug;
    var talk = routeMode==='talk';
    titleEl.textContent = (talk?'Talk: ':'')+a.t;
    subEl.textContent = talk ? 'Discussion page of '+a.t  : (a.k && a.k!=='Index' ? a.k+' · From the Gu Zhen Ren Encyclopedia' : 'From the Gu Zhen Ren Encyclopedia');
    talkLabel.textContent = talk ? 'Page' : 'Discussion';
    document.querySelectorAll('[data-act="talk"]').forEach(function(e){ e.style.display = (A[slug].k==='Index' && !talk) ? 'none' : ''; });
    if(talkTab) talkTab.style.display = (A[slug].k==='Index' && !talk) ? 'none' : '';
    crumbEl.textContent = (talk?'Talk · ':'')+((a.k && a.k!=='Category') ? a.k+' · '+a.t : a.t);
    var html='';
    if(talk){ html = talkHTML(a,slug); }
    else{
      if(/^chapter-\d+$/.test(slug)) html += '<p class="read-cta"><a href="https://ri.theomniarch.com.ng/'+slug+'" target="_blank" rel="noopener">Read '+esc(a.t.split(":")[0])+' on The Omniarch Translation →</a></p>';
      var lean = a.k==='Index' || a.k==='Category' || a.index;
      var isArt = a.k!=='Index' && a.k!=='Category';
      if(isArt){
        html += infoboxHTML(a);
        html += '<div class="lead">'+a.b.map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+'</div>';
      } else {
        if(a.img && !a.index) html += '<div class="wiki-fig"><img src="'+a.img+'" alt="'+esc(a.t)+'"><div class="cap">Art: '+esc(a.art||'community artist')+', '+esc(a.t)+'.</div></div>';
        if(!lean) html += '<h2 class="sec" id="sec-overview"><span class="caret">⌃</span>Overview</h2><div class="sec-body">'+a.b.map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+'</div>';
        if(!lean && a.ib&&a.ib.length) html += '<h2 class="sec" id="sec-details"><span class="caret">⌃</span>Details</h2><div class="sec-body"><table class="wiki-table">'+a.ib.map(function(r){return '<tr><th>'+esc(r[0])+'</th><td>'+esc(r[1])+'</td></tr>';}).join('')+'</table></div>';
      }
      if(a.index && (slug==='images' || a.index==='art-library')) html += portalHTML(slug,a);
      else if(a.index) html += '<h2 class="sec" id="sec-portal"><span class="caret">⌃</span>Explore</h2><div class="sec-body">'+portalHTML(slug,a)+'</div>';
      if(!lean && window.renderArticleArtLinks) html += window.renderArticleArtLinks(a);
      if(!lean && a.see&&a.see.length) html += '<h2 class="sec" id="sec-see"><span class="caret">⌃</span>See also</h2><div class="sec-body"><ul class="index-list">'+a.see.filter(function(x){return A[x];}).map(function(x){return '<li>'+link(x)+'</li>';}).join('')+'</ul></div>';
      if(!lean && a.members&&a.members.length) html += '<h2 class="sec" id="sec-members"><span class="caret">⌃</span>Pages in this category</h2><div class="sec-body">'+letterList(a.members)+'</div>';
      if(!lean && a.cat&&a.cat.length) html += '<div class="wiki-cats">Categories: '+a.cat.map(function(c){return '<a class="chip" href="/wiki/'+catKey(c)+'">'+esc(c)+'</a>';}).join(' ')+'</div>';
    }
    articleEl.innerHTML = html;
    if((slug==='images' || a.index==='art-library') && !talk && window.mountImagesGallery) window.mountImagesGallery();
    sideEl.innerHTML = (talk || a.k==='Index' || a.k==='Category' || a.index) ? '' : sideHTML(a);
    retrievedEl.innerHTML = (a.cat&&a.cat.length ? '<div class="pf-h">Categories</div><div class="pf-chips">'+a.cat.map(function(c){return '<a class="pf-chip" href="/wiki/'+catKey(c)+'">'+esc(c)+'</a>';}).join('')+'</div>' : '')+'<div class="pf-cols"><div><div class="pf-h">Last modified</div><div>This page was last edited on '+new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})+'.</div></div>'+'<div><div class="pf-h">Copyright</div><div>Content is available under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">Creative Commons Attribution-ShareAlike 4.0 License</a> unless otherwise noted.</div></div></div>';
    return true;
  }

  var stickyEl=document.createElement('div'); stickyEl.className='sticky-head'; stickyEl.id='sticky-head';
  stickyEl.innerHTML='<div class="sticky-inner"><span class="sticky-title"></span><span class="sticky-tools">'+'<a data-act="share" href="#"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M14 5l7 7-7 7v-4c-5 0-8 1.5-10 6 1-6 4-10 10-11z\" fill=\"currentColor\"/></svg><span class="lbl">Share</span></a>'+'<a data-act="talk" href="#"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M3 4h18v12H8l-5 4z\" fill=\"currentColor\"/></svg><span class="lbl">Discussion</span></a>'+'<a data-act="search" href="#"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"6.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M16 16l5 5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg><span class="lbl">Search</span></a>'+'</span></div>';
  document.body.appendChild(stickyEl);
  stickyEl.addEventListener('click', function(e){
    var b=e.target.closest('a[data-act]'); if(!b) return; e.preventDefault();
    var act=b.getAttribute('data-act');
    if(act==='share'){ if(navigator.clipboard) navigator.clipboard.writeText(location.href); var l=b.querySelector('.lbl')||b; l.textContent='Copied'; setTimeout(function(){ l.textContent='Share'; },1200); }
    if(act==='talk' && talkTab) talkTab.click();
    if(act==='search') toggleSearch();
  });
  window.addEventListener('scroll', function(){
    var show = window.scrollY > 170 && !wikiView.hidden;
    stickyEl.classList.toggle('on', show);
    stickyEl.querySelector('.sticky-title').textContent = titleEl.textContent;
    stickyEl.querySelector('[data-act="talk"]').style.display = talkTab ? talkTab.style.display : '';
  }, {passive:true});

  wikiView.addEventListener('click', function(e){
    var b=e.target.closest('#page-tools a[data-act]'); if(!b) return; e.preventDefault();
    var act=b.getAttribute('data-act');
    if(act==='share'){ if(navigator.clipboard) navigator.clipboard.writeText(location.href); var l=b.querySelector('.lbl')||b; l.textContent='Copied'; setTimeout(function(){ l.textContent='Share'; },1200); }
    if(act==='talk' && talkTab) talkTab.click();
    if(act==='search') toggleSearch();
  });

  if(talkTab) talkTab.addEventListener('click', function(e){
    e.preventDefault();
    if(!curSlug) return;
    routeMode = routeMode==='talk' ? 'article' : 'talk';
    render(curSlug);
  });

  wikiView.addEventListener('click', function(e){
    var caret=e.target.closest('h2.sec .caret');
    if(caret){ caret.parentElement.classList.toggle('collapsed'); e.preventDefault(); return; }
    var t=e.target.closest('a[data-sec]');
    if(t){ e.preventDefault(); var el=document.getElementById(t.getAttribute('data-sec')); if(el) el.scrollIntoView({behavior:'smooth'}); }
  });

  var BASE_TITLE='Gu Zhen Ren Encyclopedia | Reverend Insanity';
  function setPageMeta(slug){
    var a=A[slug]; if(!a) return;
    var t=(a.t||slug)+' | Gu Zhen Ren Encyclopedia | Reverend Insanity';
    document.title=t;
    var d=(a.b&&a.b[0])?String(a.b[0]).replace(/\s+/g,' ').slice(0,155):'';
    var m=document.querySelector('meta[name="description"]'); if(m&&d) m.setAttribute('content',d);
    var og=document.querySelector('meta[property="og:title"]'); if(og) og.setAttribute('content',t);
    var c=document.querySelector('link[rel="canonical"]');
    if(!c){ c=document.createElement('link'); c.setAttribute('rel','canonical'); document.head.appendChild(c); }
    c.setAttribute('href','https://www.reverendinsanity.com.ng/wiki/'+slug);
  }
  function route(){
    var h = hashOf() || '#main';
    if(h.indexOf('#/wiki/')===0){
      var slug = h.slice(7);
      if(slug!==curSlug) routeMode='article';
      if(render(slug)){
        setPageMeta(slug);
        mainView.hidden = true; wikiView.hidden = false;
        wikiView.classList.toggle('wide', A[slug].k==='Index' || A[slug].k==='Category');
        wikiView.classList.toggle('is-index', A[slug].k==='Index');
        wikiView.classList.toggle('is-article', A[slug].k!=='Index' && A[slug].k!=='Category');
        window.scrollTo(0,0);
        return;
      }
    }
    document.title=BASE_TITLE;
    mainView.hidden = false; wikiView.hidden = true;
    window.dispatchEvent(new Event('resize'));
    if(h==='#main') window.scrollTo(0,0);
  }
  window.addEventListener('route', route);
  route();

  /* ---- random article ---- */
  var rnd = document.getElementById('random-article');
  if(rnd) rnd.addEventListener('click', function(e){
    e.preventDefault();
    var keys = Object.keys(A).filter(function(k){return k.indexOf('atoz')!==0;});
    goTo('/wiki/'+keys[Math.floor(Math.random()*keys.length)]);
  });

  /* ---- search ---- */
  var box=document.getElementById('search-box'), input=document.getElementById('search-input'), sug=document.getElementById('search-suggest');
  function toggleSearch(){ box.classList.toggle('open'); if(box.classList.contains('open')) input.focus(); }
  ['search-trigger','rail-search'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('click',toggleSearch); });
  document.addEventListener('keydown',function(e){ if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();toggleSearch();} if(e.key==='Escape'){sug.style.display='none';} });
  /* search: titles and categories rank first; article text and info rows (incl. Chinese) match too */
  function bodyText(k){
    var a=A[k]||{}, parts=[];
    (a.b||[]).forEach(function(x){ parts.push(String(x)); });
    (a.ib||[]).forEach(function(r){ parts.push(r.join(' ')); });
    return parts.join(' ').toLowerCase();
  }
  function findHits(q){
    var titles=[], bodies=[];
    Object.keys(A).forEach(function(k){
      if(!A[k] || k.indexOf('atoz')===0) return;
      var t=(A[k].t||'').toLowerCase(), kind=(A[k].k||'').toLowerCase();
      if(t.indexOf(q)>-1 || kind.indexOf(q)>-1) titles.push(k);
      else if(bodyText(k).indexOf(q)>-1) bodies.push(k);
    });
    titles.sort(function(x,y){ var px=(A[x].t||'').toLowerCase().indexOf(q)===0?0:1, py=(A[y].t||'').toLowerCase().indexOf(q)===0?0:1; return px-py; });
    return titles.concat(bodies).slice(0,8);
  }
  function renderHits(q){
    var hits=findHits(q);
    if(!hits.length){ sug.innerHTML='<div class="s-empty">No entries match “'+esc(q)+'”.</div>'; sug.style.display='block'; return; }
    sug.innerHTML = hits.map(function(k){
      var img = A[k].img ? ' style="background-image:url(\'' + A[k].img + '\')"' : '';
      return '<button data-slug="'+k+'"><span class="s-thumb'+(A[k].img?'':' empty')+'"'+img+'></span><span class="s-txt"><span class="s-title">'+esc(A[k].t)+'</span><span class="s-kind">'+esc(A[k].k||'')+'</span></span></button>';
    }).join('');
    sug.style.display='block';
  }
  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    if(!q){ sug.style.display='none'; return; }
    renderHits(q);
  });
  input.addEventListener('keydown', function(e){
    if(e.key!=='Enter') return;
    e.preventDefault();
    var q = input.value.trim().toLowerCase();
    if(!q) return;
    var first = findHits(q)[0];
    if(first){ goTo('/wiki/'+first); sug.style.display='none'; box.classList.remove('open'); input.value=''; }
    else { renderHits(q); }
  });
  sug.addEventListener('click', function(e){
    var b = e.target.closest('button[data-slug]'); if(!b) return;
    goTo('/wiki/'+b.getAttribute('data-slug'));
    sug.style.display='none'; box.classList.remove('open'); input.value='';
  });

  /* sticky bar: once the article heading scrolls away, the top bar shows the page title (Gateway-style) */
  (function(){
    var bar=document.getElementById('wiki-topbar'), tt=document.getElementById('wiki-topbar-title');
    if(!bar||!tt) return;
    function update(){
      var h=wikiView.querySelector('h1, h2'), show=false, txt='';
      if(!wikiView.hidden && h){ txt=h.textContent.trim(); var r=h.getBoundingClientRect(); show = r.bottom < 56 && window.scrollY > 0; }
      bar.classList.toggle('has-title', show);
      if(tt.textContent!==txt) tt.textContent=txt;
    }
    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('route', function(){ setTimeout(update,0); });
    update();
  })();

  /* ---- seal: hover swaps to home (CSS); click scrolls top ---- */
  var seal=document.getElementById('seal-btn');
  if(seal) seal.addEventListener('click', function(){
    /* tap: flash the home icon for a few seconds, then return to the 蛊 seal */
    seal.classList.add('tap-home');
    clearTimeout(seal._tapT); seal._tapT=setTimeout(function(){ seal.classList.remove('tap-home'); }, 2600);
    goTo('#main');
  });

  /* ---- drawer (right side) ---- */
  var drawer=document.getElementById('drawer');
  function setDrawer(open){ drawer.classList.toggle('open', open); }
  var menuBtn=document.getElementById('rail-menu');
  if(menuBtn) menuBtn.addEventListener('click', function(){ setDrawer(!drawer.classList.contains('open')); });
  var dclose=document.getElementById('drawer-close');
  if(dclose) dclose.addEventListener('click', function(){ setDrawer(false); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') setDrawer(false); });
  drawer.addEventListener('click', function(e){ if(e.target.closest('a')) setDrawer(false); });
  var drand=document.getElementById('drawer-random');
  if(drand) drand.addEventListener('click', function(e){
    e.preventDefault();
    var keys=Object.keys(A);
    goTo('/wiki/'+keys[Math.floor(Math.random()*keys.length)]);
  });
  var sp=document.getElementById('stat-pages'); if(sp) sp.textContent=Object.keys(A).length;
  var si=document.getElementById('stat-imgs'); if(si) si.textContent=10;
  var sc=document.getElementById('stat-ch'); if(sc) sc.textContent=S.chapters.length;
  var spar=document.getElementById('stat-par'); if(spar) spar.textContent=S.parables;

  /* ---- live date ---- */
  (function(){
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var short=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var nowD=new Date();
    var h=document.getElementById('today-heading');
    if(h)h.textContent=nowD.getDate()+' '+months[nowD.getMonth()];
    for(var o=-2;o<=2;o++){
      var el=document.getElementById(o===0?'d0':'d'+o);
      if(!el)continue;
      var t=new Date(nowD);t.setDate(nowD.getDate()+o);
      el.textContent=t.getDate()+' '+short[t.getMonth()];
    }
  })();
})();

/* inner-page topbar: reuse the masthead wordmark; Enter jumps to the main search */
(function(){
  var logo=document.getElementById('wiki-topbar-logo'), src=document.querySelector('.tg-mainpage-header .wordmark-img');
  if(logo){ document.querySelectorAll('.tg-mainpage-header .wordmark-img').forEach(function(s){ var im=s.cloneNode(true); im.className='wiki-topbar-img '+(s.classList.contains('logo-dark')?'logo-dark':'logo-light'); logo.appendChild(im); }); }
  var f=document.getElementById('wiki-topbar-search'), wi=document.getElementById('wiki-topbar-input');
  if(f&&wi) f.addEventListener('submit',function(e){
    e.preventDefault(); var v=wi.value.trim(); goTo('#main');
    var mi=document.getElementById('search-input'), trig=document.getElementById('search-trigger');
    setTimeout(function(){ if(mi){ mi.value=v; mi.dispatchEvent(new Event('input')); mi.focus(); } if(trig&&!document.getElementById('search-box').classList.contains('open')) trig.click(); },60);
  });
})();

/* masthead: span from the left rail to the right edge of the window, at any width */
(function(){
  function fit(){
    var h=document.querySelector('.tg-mainpage-header');
    if(!h) return;
    var rail=document.querySelector('.rail'), rr=rail?rail.getBoundingClientRect():null, railW=(rr&&rr.width<document.documentElement.clientWidth/2)?rr.right:0;
    h.style.position='relative'; h.style.marginLeft='0'; h.style.marginRight='0'; h.style.maxWidth='none';
    h.style.width=(document.documentElement.clientWidth-railW)+'px'; h.style.left='0px';
    var cur=h.getBoundingClientRect().left;
    h.style.left=(railW-cur)+'px';
  }
  addEventListener('resize',fit); addEventListener('load',fit); fit();
})();

/* tab rail arrows: scroll the category tab strip; arrows dim at either end */
function updTabArrows(){
  document.querySelectorAll('.tabs-wrap').forEach(function(w){
    var strip=w.querySelector('.portal-tabs'); if(!strip) return;
    var max=strip.scrollWidth-strip.clientWidth;
    var l=w.querySelector('.tab-arrow[data-dir="-1"]'), r=w.querySelector('.tab-arrow[data-dir="1"]');
    if(l) l.disabled = strip.scrollLeft<=2;
    if(r) r.disabled = strip.scrollLeft>=max-2;
  });
}
document.addEventListener('scroll', function(e){ if(e.target && e.target.classList && e.target.classList.contains('portal-tabs')) updTabArrows(); }, true);
window.addEventListener('resize', updTabArrows);
window.addEventListener('route', function(){ setTimeout(updTabArrows, 60); });
document.addEventListener('click', function(e){
  var b=e.target.closest && e.target.closest('.tab-arrow'); if(!b) return;
  var strip=b.parentNode.querySelector('.portal-tabs'); if(strip){
    var dir=parseInt(b.getAttribute('data-dir'),10);
    strip.setAttribute('data-user','1');
    /* one category per tap: the row moves by exactly one category's width in the tapped direction */
    var sr=strip.getBoundingClientRect(), tabs=Array.prototype.slice.call(strip.querySelectorAll('a'));
    var gap=parseFloat(getComputedStyle(strip).columnGap)||0, first=-1;
    for(var i=0;i<tabs.length;i++){ var r=tabs[i].getBoundingClientRect(); if(r.left>=sr.left-1 && r.right<=sr.right+1){ first=i; break; } }
    var step=0;
    if(dir>0){ var t=tabs[first>=0?first:0]; if(t) step=t.getBoundingClientRect().width+gap; }
    else { var pv=tabs[(first>0?first:1)-1]; if(pv) step=-(pv.getBoundingClientRect().width+gap); }
    if(step) strip.scrollTo({left: Math.max(0,Math.min(strip.scrollLeft+step, strip.scrollWidth-strip.clientWidth)), behavior:'smooth'});
  }
  setTimeout(updTabArrows, 350);
});

/* Mobile/desktop menu: all 12 categories, a blurred backdrop behind the open menu, and labelled header figures */
(function(){
  var d=document.getElementById('drawer'); if(!d) return;
  var P=[['chapters','Volumes & Chapters'],['characters','Characters'],['gu','Gu Worms'],['cultivation','Cultivation System'],['the-legends-of-ren-zu','Legends of Ren Zu'],['locations','Locations & World'],['clans','Factions & Clans'],['timeline','Timeline & History'],['images','Gallery'],['glossary','Glossary & Concepts'],['adaptations','Adaptations & Media'],['community','Community Hub']];
  var cols=d.querySelectorAll('.drawer-cols > div');
  if(cols[1]) cols[1].innerHTML='<h4>Categories</h4>'+P.map(function(t){return '<a href="/wiki/'+t[0]+'">'+t[1]+'</a>';}).join('');
  d.querySelectorAll('.drawer-stats span[title]').forEach(function(sp){
    if(sp.querySelector('.stat-l')) return;
    var l=document.createElement('small'); l.className='stat-l'; l.textContent=sp.getAttribute('title'); sp.appendChild(l);
  });
  var scrim=document.createElement('div'); scrim.className='menu-scrim'; scrim.setAttribute('aria-hidden','true');
  document.body.appendChild(scrim);
  scrim.addEventListener('click', function(){ var c=document.getElementById('drawer-close'); if(c) c.click(); });
  new MutationObserver(function(){ document.body.classList.toggle('menu-open', d.classList.contains('open')); })
    .observe(d,{attributes:true,attributeFilter:['class']});
})();

/* Category rail: on every page the current category is brought to the middle of the rail (clamped at the two ends).
   Arrows still move the rail manually. */
(function(){
  function place(strip){
    var a=strip.querySelector('a.on'); if(!a) return;
    var sr=strip.getBoundingClientRect(), ar=a.getBoundingClientRect();
    var target=strip.scrollLeft+(ar.left-sr.left)-(strip.clientWidth-ar.width)/2;
    strip.scrollTo({left:Math.max(0,Math.min(target, strip.scrollWidth-strip.clientWidth)), behavior:'instant'});
  }
  function ensure(strip,tries){
    if(strip.clientWidth===0 && tries<60){ setTimeout(function(){ ensure(strip,tries+1); },80); return; }
    place(strip);
  }
  function scan(root){
    var list=(root.matches && root.matches('.tabs-wrap .portal-tabs')) ? [root] : Array.prototype.slice.call(root.querySelectorAll ? root.querySelectorAll('.tabs-wrap .portal-tabs') : []);
    list.forEach(function(strip){
      if(strip.getAttribute('data-centred')) return;
      strip.setAttribute('data-centred','1');
      ensure(strip,0);
      [350,1000,2000].forEach(function(t){ setTimeout(function(){ if(strip.isConnected && strip.clientWidth && !strip.getAttribute('data-user')) place(strip); }, t); });
    });
  }
  new MutationObserver(function(muts){
    muts.forEach(function(m){ m.addedNodes.forEach(function(n){ if(n.nodeType===1) scan(n); }); });
  }).observe(document.body,{childList:true,subtree:true});
  scan(document);
})();
/* once the reader touches the rail themselves, the automatic centring stops for that rail */
document.addEventListener('touchstart', function(e){ var st=e.target.closest && e.target.closest('.tabs-wrap'); if(st){ var p=st.querySelector('.portal-tabs'); if(p) p.setAttribute('data-user','1'); } }, {passive:true});
document.addEventListener('wheel', function(e){ var st=e.target.closest && e.target.closest('.tabs-wrap'); if(st){ var p=st.querySelector('.portal-tabs'); if(p) p.setAttribute('data-user','1'); } }, {passive:true});

