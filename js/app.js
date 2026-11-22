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
    if(e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
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
    'Gu Zhen Ren': 'Gu Zhen Ren is the novel by Gu Zhen Ren.',
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

  // Community profiles are registered before export so each has a real, shareable route.
  var COMMUNITY_PROFILES = {
    'community-webnovel': {title:'Webnovel', type:'Books & comics', image:'/assets/community/webnovel-logo.png', site:'https://www.webnovel.com/', description:'Read Reverend Insanity on Webnovel.', projects:[
      {title:'Reverend Insanity', type:'COMIC · RANHUI CULTURE', image:'https://book-pic.webnovel.com/bookcover/16914029906866101?imageMogr2/thumbnail/600&imageId=1589359237640', url:'https://www.webnovel.com/comic/reverend-insanity_16914029906866101'},
      {title:'Reverend Insanity', type:'ENGLISH NOVEL', image:'/assets/inline/ri-cover.jpg', url:'https://www.webnovel.com/book/7996858406002505/'},
      {title:'Reverend Insanity', type:'GERMAN EDITION', image:'/assets/inline/ri-cover.jpg', url:'https://en.webnovel.com/book/31307176808182105'}]},
    'community-omniarch': {title:'The Omniarch', type:'Archive & projects', image:'/assets/inline/omniarch-logo-gold.webp', site:'https://theomniarch.com.ng/', description:'A personal archive for fiction, translation and creative projects.', projects:[
      {title:'The Omniarch', type:'PERSONAL WEBSITE', image:'/assets/inline/omniarch-spotlight.webp', url:'https://theomniarch.com.ng/'},
      {title:'Reverend Insanity', type:'TRANSLATION READER', image:'/assets/inline/ri-cover.jpg', url:'https://ri.theomniarch.com.ng/'},
      {title:'The Legends of Ren Zu', type:'COMPANION READER', image:'/assets/inline/art-the-legends-of-ren-zu.webp', url:'https://thelegendsofrenzu.theomniarch.com.ng/', credit:'Artwork: Kodoku Studio'},
      {title:'Fan-Made Donghua', type:'VIDEO · 纵横AIGC', image:'https://i.ytimg.com/vi/e8SkqCzoqDs/maxresdefault.jpg', url:'https://www.youtube.com/watch?v=e8SkqCzoqDs'}], socials:[['YouTube','https://www.youtube.com/@GodofPeakFiction'],['TikTok','https://www.tiktok.com/@GodOfPeakFiction'],['X','https://x.com/GodofPeakFic'],['Discord','https://discord.gg/UgwTKn4sQf']]},
    'community-kodoku': {title:'Kodoku Studio', type:'Fan manhua', image:'/assets/collection/art-5c74a5ce3b04e09d.webp', site:'https://kodokustudio.com/manhua/reverend-insanity-manhwa-en/', description:'A fan-led Reverend Insanity adaptation.', projects:[{title:'Reverend Insanity', type:'FAN MANHUA', image:'/assets/collection/art-5c74a5ce3b04e09d.webp', url:'https://kodokustudio.com/manhua/reverend-insanity-manhwa-en/',credit:'Artwork: Kodoku Studio'}]},
    'community-reddit': {title:'Reddit', type:'Discussion', image:'/assets/community/reddit-logo.png', site:'https://www.reddit.com/r/ReverendInsanity/', description:'Community discussion and fan creations.', projects:[{title:'r/ReverendInsanity', type:'COMMUNITY', image:'/assets/community/reddit-logo.png', url:'https://www.reddit.com/r/ReverendInsanity/'},{title:'r/NeverEndInsanity', type:'COMMUNITY', image:'/assets/community/reddit-logo.png', url:'https://www.reddit.com/r/NeverEndInsanity/'}]},
    'community-infinite-aperture': {title:'Infinite Aperture', type:'Fan game', image:'/assets/community/social/tiktok.svg', site:'https://discord.com/channels/1542846232815341569/1549502947027583046', description:'A Roblox fan project in development.', projects:[{title:'Infinite Aperture on TikTok', type:'FAN GAME · TIKTOK', image:'/assets/community/social/tiktok.svg', url:'https://www.tiktok.com/@infiniteaperturee'}],socials:[['Discord channel','https://discord.com/channels/1542846232815341569/1549502947027583046'],['TikTok','https://www.tiktok.com/@infiniteaperturee']]},
    'community-saga-of-gu': {title:'Saga of Gu', type:'Companion wiki', image:'/assets/inline/saga-of-gu.svg', site:'https://sagaofgu.com', description:'A companion wiki for the Gu world.', projects:[{title:'Saga of Gu', type:'WIKI', image:'/assets/inline/saga-of-gu.svg', url:'https://sagaofgu.com'}],socials:[['Discord channel','https://discord.com/channels/1533739700941095036/1564533989736456244']]},
    'community-gu-art': {title:'Gu Zhen Ren Art', type:'Art community', image:'/assets/inline/art-gu-zhen-ren.webp', site:'https://discord.com/channels/1408047207575453796/1408076789582135307', description:'A community for Gu Zhen Ren art.', projects:[{title:'Gu Zhen Ren Art', type:'DISCORD CHANNEL', image:'/assets/inline/art-gu-zhen-ren.webp', url:'https://discord.com/channels/1408047207575453796/1408076789582135307',credit:'Artwork: mc人祖'}]},
    'community-readers-discord': {title:'Heaven', type:'The Omniarch community', image:'/assets/inline/discord-heaven.webp', site:'https://discord.gg/UgwTKn4sQf', description:'Join The Omniarch community to discuss chapters and help with translation.', projects:[{title:'Heaven', type:'THE OMNIARCH COMMUNITY', image:'/assets/inline/discord-heaven.webp', url:'https://discord.gg/UgwTKn4sQf'}],socials:[['YouTube','https://www.youtube.com/@Oudenarch']]},
    'community-immortal-gu-land': {title:'Immortal Gu Land', type:'Translation community', image:'https://cdn.discordapp.com/icons/344030613663252481/a_59f546468f2c4c709c5ed6c936277a25.png?size=512', site:'https://discord.com/channels/344030613663252481/390202548121894912', description:'Skyfarrow and ChibiGeneral contributed to the early English translation.', projects:[{title:'Reverend Insanity', type:'ZELSKY TRANSLATIONS', image:'/assets/inline/ri-cover.jpg', url:'https://zelskytranslations.wordpress.com/novels/reverend-insanity/'}],socials:[['Discord channel','https://discord.com/channels/344030613663252481/390202548121894912']]}
  };
  Object.keys(COMMUNITY_PROFILES).forEach(function(slug){var p=COMMUNITY_PROFILES[slug];A[slug]={t:p.title,k:'Index',index:'community-profile',b:[p.description],ib:[],see:['community'],cat:[]};});

  /* ---- growth counters on the main page ---- */
  var typeset = S.chapters.length;
  var stats = document.getElementById('browse-stats');
  if(stats) stats.textContent = typeset+' chapters typeset of '+fmt(S.total)+' · '+S.parables+' parables of Ren Zu in the companion scripture';
  var list = document.getElementById('dir-chapters-list');
  if(list){
    list.innerHTML = S.chapters.map(function(c){ return '<a href="/wiki/chapter-'+c.n+'">'+c.n+' · '+esc(c.title)+'</a>'; }).join(' · ')
      + ' (<i><b><a href="/wiki/chapters">'+fmt(S.total-typeset)+' chapters to go, Chapter '+S.atBench+' at the bench</a></b></i>)';
  }

  /* ---- wiki router ---- */
  /* One skip link, two mutually exclusive views: it must point at whichever one
     is on screen, or it silently does nothing on every article. */
  var skipLink = document.querySelector('.skip-link');
  function setSkipTarget(view){
    if(!skipLink || !view || !view.id) return;
    skipLink.setAttribute('href', '#' + view.id);
  }
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

  var PORTALS = [['chapters','Volumes & Chapters'],['characters','Characters'],['gu','Gu Worms'],['cultivation','Cultivation System'],['the-legends-of-ren-zu','Legends of Ren Zu'],['locations','Locations & World'],['clans','Factions & Clans'],['timeline','Timeline & History'],['gallery','Gallery'],['glossary','Glossary'],['adaptations','Adaptations & Media'],['community','Community Hub']];
  function portalTabs(slug){
    return '<div class="tabs-wrap"><button class="tab-arrow" data-dir="-1" aria-label="Scroll tabs left">&#8249;</button><div class="portal-tabs">'+PORTALS.map(function(t){return '<a href="/wiki/'+t[0]+'" class="'+(t[0]===slug?'on':'')+'">'+t[1]+'</a>';}).join('')+'</div><button class="tab-arrow" data-dir="1" aria-label="Scroll tabs right">&#8250;</button></div>';
  }

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
    gallery: [],
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

  /* Community Hub, modelled on a wiki community portal: the portal rail first,
     then a short welcome, then the ways to get involved. Channel handles are the
     ones the community shares; the Discord invite matches the Talk banner. */
  function communityTile(slug){var p=COMMUNITY_PROFILES[slug], direct=['community-gu-art','community-immortal-gu-land','community-readers-discord'].indexOf(slug)>=0;return '<a class="community-tile" href="'+(direct?esc(p.site):'/wiki/'+slug+'/')+'"'+(direct?' target="_blank" rel="noopener noreferrer"':'')+'><span class="community-tile-art community-brand '+esc(slug)+'"><img src="'+esc(p.image)+'" alt="" loading="lazy"></span><strong>'+esc(p.title)+'</strong><small>'+esc(p.type)+(direct?' · Discord ↗':' →')+'</small></a>';}
  function renderCommunityPortal(slug,a){
    var artists=['limitless','footless-bird','volume-one-duel','ordinary-abyss'];
    return portalTabs(slug)+'<section class="community-hub"><h2 class="community-hub-label">Featured</h2><div class="community-tiles">'
      + ['community-webnovel','community-omniarch','community-kodoku','community-reddit'].map(communityTile).join('')
      + '</div><h2 class="community-hub-label">Communities</h2><div class="community-tiles">'
      + ['community-infinite-aperture','community-saga-of-gu','community-gu-art','community-immortal-gu-land','community-readers-discord'].map(communityTile).join('')
      + '</div><h2 class="community-hub-label">Artists</h2><div class="community-tiles"><a class="community-tile" href="/wiki/gallery-artists/"><span class="community-tile-art community-art-grid">'
      + artists.map(function(id){return '<img src="/assets/collection/'+id+'.webp" alt="" loading="lazy">';}).join('')+'</span><strong>Featured artists</strong><small>Explore all artists →</small></a></div><p class="community-hub-note">Artist artwork: 轮回画室丶不修, OSOT, TOUZI and Ullasseu. External spaces may contain spoilers; Discord channels require access.</p></section>';
  }
  function renderCommunityProfile(slug){
    var p=COMMUNITY_PROFILES[slug];
    var primaryLabel = p.site.indexOf('https://discord.com/channels/') === 0 ? 'Discord channel' : p.site.indexOf('https://discord.gg/') === 0 ? 'Join Discord' : p.site.indexOf('reddit.com/') >= 0 ? 'Visit Reddit' : 'Visit website';
    var links=[[primaryLabel,p.site]].concat((p.socials||[]).filter(function(l){return l[1]!==p.site;}));
    function profileLink(l){var brand=/discord/i.test(l[0])?'discord':/youtube/i.test(l[0])?'youtube':/tiktok/i.test(l[0])?'tiktok':l[0]==='X'?'x':/reddit/i.test(l[0])?'reddit':null;return '<a href="'+esc(l[1])+'" target="_blank" rel="noopener noreferrer">'+(brand?'<img class="community-social-icon" src="/assets/community/social/'+brand+'.svg" alt="">':'')+esc(l[0])+' ↗</a>';}
    return portalTabs('community')+'<section class="community-profile"><a class="community-back" href="/wiki/community/">← Community Hub</a><div class="community-profile-head" style="--community-cover:url(&quot;'+esc(p.image)+'&quot;)"><div class="community-profile-copy"><small>'+esc(p.type)+'</small><h2>'+esc(p.title)+'</h2><p>'+esc(p.description)+'</p><div class="community-profile-links">'+links.map(profileLink).join('')+'</div></div><img src="'+esc(p.image)+'" alt="'+esc(p.title)+'" loading="lazy"></div><h3 class="community-hub-label">Explore</h3><div class="community-project-grid">'+p.projects.map(function(item){return '<a class="community-project" href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer"><span class="community-project-image"><img src="'+esc(item.image)+'" alt="" loading="lazy"></span><small>'+esc(item.type)+'</small><strong>'+esc(item.title)+'</strong>'+(item.credit?'<span>'+esc(item.credit)+'</span>':'')+'</a>';}).join('')+'</div>'+(slug==='community-reddit'?redditShelf():'')+(slug==='community-infinite-aperture'?tiktokShelf():'')+'<p class="community-hub-note">External links may contain spoilers. Discord channels require server access.</p></section>';
  }

  function tiktokShelf(){return '<section class="community-tiktok"><h3 class="community-hub-label">Latest from TikTok</h3><p>Watch Infinite Aperture’s latest videos on TikTok.</p><button type="button" id="load-tiktok">Load TikTok profile</button> <a href="https://www.tiktok.com/@infiniteaperturee" target="_blank" rel="noopener noreferrer">Open TikTok ↗</a><div id="tiktok-embed"></div></section>';}
  function redditShelf(){return '<section class="reddit-feed"><h3 class="community-hub-label">Trending on Reddit</h3><p>Posts may contain spoilers beyond the translation. Rankings are provided by Reddit.</p><div id="reddit-week"><h4>Top this week</h4><p>Loading posts…</p></div><div id="reddit-all"><h4>Top of all time</h4><p>Loading posts…</p></div></section>';}
  function mountCommunityExtras(slug){
    if(slug==='community-infinite-aperture'){var button=document.getElementById('load-tiktok');button.addEventListener('click',function(){var el=document.getElementById('tiktok-embed');el.innerHTML='<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@infiniteaperturee" data-unique-id="infiniteaperturee" data-embed-type="creator" style="max-width:780px;min-width:288px"><section><a href="https://www.tiktok.com/@infiniteaperturee">@infiniteaperturee on TikTok</a></section></blockquote>';var script=document.createElement('script');script.src='https://www.tiktok.com/embed.js';document.body.appendChild(script);button.disabled=true;button.textContent='Loading TikTok…';});}
    if(slug!=='community-reddit')return;
    ['week','all'].forEach(function(period){
      var box=document.getElementById('reddit-'+period), key='community-reddit-'+period, cached;
      function show(posts,stamp){if(!box.isConnected)return;var heading=box.querySelector('h4');box.replaceChildren(heading);var note=document.createElement('p');note.className='reddit-updated';note.textContent='Reddit ranking · updated '+new Date(stamp).toLocaleDateString();box.appendChild(note);var grid=document.createElement('div');grid.className='reddit-post-grid';posts.forEach(function(p){var a=document.createElement('a');a.className='reddit-post';a.href='https://www.reddit.com'+p.permalink;a.target='_blank';a.rel='noopener noreferrer';var tag=document.createElement('small');tag.textContent='r/ReverendInsanity · '+Number(p.score).toLocaleString()+' votes';var title=document.createElement('strong');title.textContent=p.title;a.append(tag,title);grid.appendChild(a);});box.appendChild(grid);}
      function fail(){if(!box.isConnected)return;if(cached && Array.isArray(cached.posts) && cached.posts.length){show(cached.posts,cached.stamp);return;}box.querySelector('p').innerHTML='Posts are temporarily unavailable. <a href="https://www.reddit.com/r/ReverendInsanity/top/?t='+period+'" target="_blank" rel="noopener noreferrer">View Reddit’s ranking ↗</a>';}
      try{cached=JSON.parse(localStorage.getItem(key)||'null');if(cached && Date.now()-cached.stamp<7*86400000 && Array.isArray(cached.posts) && cached.posts.length){show(cached.posts,cached.stamp);return;}}catch(e){}
      if(typeof fetch!=='function'){fail();return;}
      fetch('https://www.reddit.com/r/ReverendInsanity/top.json?t='+period+'&limit=15',{credentials:'omit'}).then(function(r){if(!r.ok)throw Error('Reddit unavailable');return r.json();}).then(function(data){var posts=data.data.children.map(function(c){return c.data;}).filter(function(p){return !p.over_18 && typeof p.title==='string' && /^\/r\/ReverendInsanity\/comments\/[a-z0-9]+\//i.test(p.permalink);}).slice(0,5).map(function(p){return {title:p.title,permalink:p.permalink,score:p.score};});if(!posts.length)throw Error('No posts');var stamp=Date.now();try{localStorage.setItem(key,JSON.stringify({stamp:stamp,posts:posts}));}catch(e){}show(posts,stamp);}).catch(fail);
    });
  }
  function chapterRefs(text){return esc(text).replace(/\b(Chapter|Chp\.?|Ch\.)\s*(\d+)\b/gi,function(match,kind,num){return S.chapters.some(function(c){return c.n===Number(num);})?'<a class="chapter-reference" href="/reader/chapter-'+Number(num)+'/">'+match+'</a>':match;});}
  // The main index is a curated door into the story, not a gallery-file dump.
  function encyclopediaIndex(){
    var subjects=[
      ['characters','Characters','People of the Gu world','/assets/inline/liu-guanyi-fang-yuan.webp','Liu Guanyi'],
      ['gu','Gu Worms','Refine · nurture · use','/assets/inline/art-spring-autumn-cicada.webp','mc人祖'],
      ['cultivation','Cultivation','Ranks, apertures and paths','/assets/inline/tile-cultivation.webp','Artist not credited'],
      ['locations','Locations & World','Places of the story','/assets/inline/qing-mao-mountain.webp','Artist not credited'],
      ['clans','Factions & Clans','Clans and paths','/assets/inline/tile-clans.webp','Artist not credited'],
      ['the-legends-of-ren-zu','Legends of Ren Zu','The ancestral stories','/assets/inline/art-ren-zu.webp','mc人祖'],
      ['glossary','Glossary','Terms and ideas','/assets/inline/tile-glossary.webp','Artist not credited'],
      ['chapters','Chapters','Guides to the story','/assets/inline/ri-cover.jpg','Artist not credited']
    ];
    var feature=['fang-yuan','spring-autumn-cicada','ren-zu','fang-zheng','bai-ning-bing','qing-mao-mountain'];
    var excluded=['contents','community','gallery','adaptations','about','privacy'];
    var keys=Object.keys(A).filter(function(k){return A[k].k!=='Category' && excluded.indexOf(k)<0 && !/^gallery-/.test(k) && !/^community-/.test(k);});
    var groups={};keys.sort(function(a,b){return A[a].t.localeCompare(A[b].t);}).forEach(function(k){var letter=A[k].t.charAt(0).toUpperCase();(groups[letter]=groups[letter]||[]).push(k);});
    var letters=Object.keys(groups).sort();
    return portalTabs('contents')+'<div class="encyclopedia-index"><header class="encyclopedia-intro"><span>THE GU ZHEN REN ENCYCLOPEDIA</span><h2>Explore the Gu world.</h2><p>Characters, Gu, places and ideas from the translation so far.</p><a href="/reader/">Open the reading room →</a></header>'
      +'<section aria-labelledby="index-subjects"><div class="index-heading"><div><small>EXPLORE BY SUBJECT</small><h2 id="index-subjects">Browse the encyclopedia</h2></div></div><div class="index-subjects">'+subjects.map(function(item){return '<a class="index-subject" href="/wiki/'+item[0]+'/"><div class="index-subject-image"><img src="'+item[3]+'" alt="" loading="lazy"><span>'+esc(item[4]==='Artist not credited'?item[4]:'Art: '+item[4])+'</span></div><strong>'+esc(item[1])+'</strong><small>'+esc(item[2])+' →</small></a>';}).join('')+'</div></section>'
      +'<section aria-labelledby="index-featured"><div class="index-heading"><div><small>START HERE</small><h2 id="index-featured">Featured articles</h2></div></div><div class="index-features">'+feature.filter(function(k){return A[k]&&A[k].img;}).map(function(k){var a=A[k];return '<a class="index-feature" href="/wiki/'+k+'/"><img src="'+esc(a.img)+'" alt="" loading="lazy"><div><small>'+esc(a.k)+' · '+esc(a.art||'Artist not credited')+'</small><strong>'+esc(a.t)+'</strong><span>Read article →</span></div></a>';}).join('')+'</div></section>'
      +'<section class="index-directory" aria-labelledby="index-directory-title"><div class="index-heading"><div><small>FIND A PAGE</small><h2 id="index-directory-title">Encyclopedia A–Z</h2></div><span>'+keys.length+' pages</span></div><label for="index-filter">Filter pages by title</label><input type="search" id="index-filter" placeholder="Search the index" autocomplete="off"><p id="index-filter-status" role="status">'+keys.length+' pages</p><nav class="index-alphabet" aria-label="Browse index by letter">'+letters.map(function(c){return '<a href="#index-letter-'+esc(c)+'" data-index-letter="'+esc(c)+'">'+esc(c)+'</a>';}).join('')+'</nav><div class="index-directory-grid">'+letters.map(function(c){return '<section class="index-letter" id="index-letter-'+esc(c)+'"><h3>'+esc(c)+'</h3><ul>'+groups[c].map(function(k){return '<li data-index-title="'+esc(A[k].t.toLowerCase())+'">'+link(k)+'</li>';}).join('')+'</ul></section>';}).join('')+'</div><p id="index-no-results" hidden>No pages match your search.</p></section>'
      +'<section class="index-more" aria-labelledby="index-more-title"><div class="index-heading"><div><small>BEYOND THE STORY</small><h2 id="index-more-title">Art & community</h2></div></div><div class="index-more-grid"><a href="/wiki/gallery/"><strong>Artwork gallery →</strong><span>Explore the collection. May contain later-story spoilers.</span></a><a href="/wiki/community/"><strong>Community hub →</strong><span>Meet readers and creators. External spaces may contain spoilers.</span></a></div></section></div>';
  }
  function mountEncyclopediaIndex(){
    var input=document.getElementById('index-filter'), status=document.getElementById('index-filter-status'), empty=document.getElementById('index-no-results');
    function filter(){var q=input.value.trim().toLocaleLowerCase(), count=0;articleEl.querySelectorAll('.index-letter').forEach(function(group){var shown=0;group.querySelectorAll('li').forEach(function(row){var match=row.getAttribute('data-index-title').indexOf(q)>=0;row.hidden=!match;if(match){shown++;count++;}});group.hidden=!shown;});status.textContent=count+' '+(count===1?'page':'pages');empty.hidden=count!==0;}
    input.addEventListener('input',filter);
    articleEl.querySelectorAll('[data-index-letter]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();if(input.value){input.value='';filter();}var target=document.getElementById('index-letter-'+a.getAttribute('data-index-letter'));if(target)target.scrollIntoView({behavior:'smooth',block:'start'});});});
  }

  function portalHTML(slug,a){
    if(slug==='characters'){
      var tabs0=portalTabs(slug);
      var open='<div class="open-tile"><div class="sq"></div><div class="lb">Open</div></div>';
      return tabs0+'<div class="tg-section-divider"><span>Featured</span></div><div class="portal-grid">'
        +'<a href="/wiki/category-men"><div class="sq" style="background-image:url(\'/assets/inline/art-ren-zu.webp\')"></div><div class="lb">Men</div></a>'
        +open+open+open+open+open+'</div>'+catBoxes('characters');
    }
    if((slug==='gallery' || a.index==='art-library') && window.renderImagesGallery) return portalTabs(slug)+window.renderImagesGallery(slug);
    var kind=a.index, keys=indexKeys(kind).filter(function(k){return k!==slug;});
    if(!keys.length && a.see) keys=a.see.filter(function(k){return k!==slug && A[k];});
    var tabs=portalTabs(slug);
    if(!keys.length) return tabs+(PORTAL_CATS[slug]?catBoxes(slug):'');
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
    return tabs+az+grid+boxes+all;
  }

  function infoboxHTML(a){
    var rows=(a.ib||[]).map(function(r){return '<tr><th>'+esc(r[0])+'</th><td>'+chapterRefs(r[1])+'</td></tr>';}).join('');
    var img=a.img ? '<div class="ib-img"><img src="'+a.img+'" alt="'+esc(a.t)+'"><div class="ib-cap">Art: '+esc(a.art||'community artist')+', '+esc(a.t)+'.</div></div>' : '';
    return '<aside class="infobox"><div class="ib-name">'+esc(a.t)+'</div><div class="ib-kind">'+esc(a.k||'')+'</div>'+img
      +(rows ? '<div class="ib-gen">General Information</div><table class="ib-table">'+rows+'</table>' : '')+'</aside>';
  }
  function sideHTML(a){
    var isArt = a.k!=='Index' && a.k!=='Category';
    var toc = (isArt || a.index) ? [] : [['sec-overview','Overview']];
    if(!isArt && a.ib&&a.ib.length) toc.push(['sec-details','Details']);
    
    if(a.see&&a.see.length) toc.push(['sec-see','See also']);
    return (toc.length ? '<div class="side-box"><h4>Contents</h4><div class="toc">'+toc.map(function(t){return '<a href="#" data-sec="'+t[0]+'">'+t[1]+'<span class="caret">⌄</span></a>';}).join('')+'</div></div>' : '');
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
    subEl.innerHTML = talk ? 'Discussion page of '+esc(a.t) : (a.k && a.k!=='Index' ? '<span class="wiki-kind">'+esc(a.k)+' · </span>' : '')+'<span class="wiki-source">From the Gu Zhen Ren Encyclopedia</span>';
    talkLabel.textContent = talk ? 'Page' : 'Discussion';
    document.querySelectorAll('[data-act="talk"]').forEach(function(e){ e.style.display = (A[slug].k==='Index' && !talk) ? 'none' : ''; });
    if(talkTab) talkTab.style.display = (A[slug].k==='Index' && !talk) ? 'none' : '';
    crumbEl.textContent = (talk?'Talk · ':'')+((a.k && a.k!=='Category') ? a.k+' · '+a.t : a.t);
    var html='';
    if(talk){ html = talkHTML(a,slug); }
    else{
      if(/^chapter-\d+$/.test(slug)) html += '<p class="read-cta"><a href="/reader/chapter-'+slug.slice(8)+'/">Read '+esc(a.t.split(":")[0])+' in the reading room →</a></p>';
      if(slug==='chapters') html += '<p class="read-cta"><a href="/reader/chapter-1/">Begin reading in the reading room →</a></p>';
      var lean = a.k==='Index' || a.k==='Category' || a.index;
      var isArt = a.k!=='Index' && a.k!=='Category';
      if(isArt){
        html += infoboxHTML(a);
        html += '<div class="lead">'+a.b.map(function(p){return '<p>'+chapterRefs(p)+'</p>';}).join('')+'</div>';
      } else {
        if(a.img && !a.index) html += '<div class="wiki-fig"><img src="'+a.img+'" alt="'+esc(a.t)+'"><div class="cap">Art: '+esc(a.art||'community artist')+', '+esc(a.t)+'.</div></div>';
        if(!lean) html += '<h2 class="sec" id="sec-overview"><span class="caret">⌃</span>Overview</h2><div class="sec-body">'+a.b.map(function(p){return '<p>'+chapterRefs(p)+'</p>';}).join('')+'</div>';
        if(!lean && a.ib&&a.ib.length) html += '<h2 class="sec" id="sec-details"><span class="caret">⌃</span>Details</h2><div class="sec-body"><table class="wiki-table">'+a.ib.map(function(r){return '<tr><th>'+esc(r[0])+'</th><td>'+chapterRefs(r[1])+'</td></tr>';}).join('')+'</table></div>';
      }
      if(a.index && slug==='contents') html += encyclopediaIndex();
      else if(a.index && slug==='community') html += renderCommunityPortal(slug,a);
      else if(a.index==='community-profile') html += renderCommunityProfile(slug);
      else if(a.index && (slug==='gallery' || a.index==='art-library')) html += portalHTML(slug,a);
      else if(a.index) html += '<h2 class="sec" id="sec-portal"><span class="caret">⌃</span>Explore</h2><div class="sec-body">'+portalHTML(slug,a)+'</div>';
      if(!lean && window.renderArticleArtLinks) html += window.renderArticleArtLinks(a);
      if(!lean && a.see&&a.see.length) html += '<h2 class="sec" id="sec-see"><span class="caret">⌃</span>See also</h2><div class="sec-body"><ul class="index-list">'+a.see.filter(function(x){return A[x];}).map(function(x){return '<li>'+link(x)+'</li>';}).join('')+'</ul></div>';
      if(a.k==='Category' && a.b&&a.b.length) html += '<div class="category-description">'+a.b.map(function(p){return '<p>'+chapterRefs(p)+'</p>';}).join('')+'</div>';
      if(a.members&&a.members.length) html += '<h2 class="sec" id="sec-members"><span class="caret">⌃</span>Pages in this category</h2><div class="sec-body">'+letterList(a.members)+'</div>';
      if(!lean && a.cat&&a.cat.length) html += '<div class="wiki-cats">Categories: '+a.cat.map(function(c){return '<a class="chip" href="/wiki/'+catKey(c)+'">'+esc(c)+'</a>';}).join(' ')+'</div>';
    }
    articleEl.innerHTML = html;
    if(!talk && slug==='contents') mountEncyclopediaIndex();
    if(!talk) mountCommunityExtras(slug);
    if((slug==='gallery' || a.index==='art-library') && !talk && window.mountImagesGallery) window.mountImagesGallery();
    sideEl.innerHTML = (talk || a.k==='Index' || a.k==='Category' || a.index) ? '' : sideHTML(a);
    retrievedEl.innerHTML = (a.cat&&a.cat.length ? '<div class="pf-h">Categories</div><div class="pf-chips">'+a.cat.map(function(c){return '<a class="pf-chip" href="/wiki/'+catKey(c)+'">'+esc(c)+'</a>';}).join('')+'</div>' : '')+'<div class="pf-cols"><div><div class="pf-h">About this project</div><div>Novel and artwork rights belong to their respective holders.</div></div></div>';
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
    // Preserve old Images links (including browser history and query/fragment)
    // while keeping Gallery as the address shown to visitors.
    var galleryPath=location.pathname.replace(/^\/wiki\/images(?=-|\/|$)/, '/wiki/gallery');
    if(galleryPath!==location.pathname) history.replaceState(history.state, '', galleryPath+location.search+location.hash);
    var h = hashOf() || '#main';
    if(h.indexOf('#/wiki/')===0){
      var slug = h.slice(7);
      if(slug!==curSlug) routeMode='article';
      if(render(slug)){
        setPageMeta(slug);
        mainView.hidden = true; wikiView.hidden = false; setSkipTarget(wikiView);
        wikiView.classList.toggle('wide', A[slug].k==='Index' || A[slug].k==='Category');
        wikiView.classList.toggle('is-index', A[slug].k==='Index');
        wikiView.classList.toggle('is-article', A[slug].k!=='Index' && A[slug].k!=='Category');
        window.scrollTo(0,0);
        return;
      }
    }
    document.title=BASE_TITLE;
    mainView.hidden = false; wikiView.hidden = true; setSkipTarget(mainView);
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
  document.body.appendChild(box);
  var searchClose=document.getElementById('search-close');
  function searchEmpty(){sug.innerHTML='<div class="s-empty"><strong>Search the Gu Zhen Ren Encyclopedia</strong><p>Type to search articles, artists and artwork.</p></div>';sug.style.display='block';}
  function toggleSearch(){ box.classList.toggle('open');document.body.classList.toggle('search-active',box.classList.contains('open')); if(box.classList.contains('open')){input.focus();if(!input.value)searchEmpty();} }
  if(searchClose)searchClose.addEventListener('click',function(){box.classList.remove('open');document.body.classList.remove('search-active');sug.style.display='none';});
  document.addEventListener('click',function(ev){if(box.classList.contains('open')&&!box.contains(ev.target)&&!ev.target.closest('[data-act="search"],#search-trigger,#rail-search,#wiki-topbar-search')){box.classList.remove('open');document.body.classList.remove('search-active');}});

  ['search-trigger','rail-search'].forEach(function(id){ var el=document.getElementById(id); if(el) el.addEventListener('click',toggleSearch); });
  document.addEventListener('keydown',function(e){ if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();toggleSearch();} if(e.key==='Escape'){sug.style.display='none';box.classList.remove('open');document.body.classList.remove('search-active');} });
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
  function searchRecords(q){
    if(!q) return [];
    var entries=findHits(q).map(function(k){var record=A[k],art=window.GZR_GALLERY&&window.GZR_GALLERY.files.find(function(f){return 'gallery-file-'+f.id===k;});return {slug:k,title:record.t,image:art?art.thumbnail:record.img,mature:!!(art&&art.mature),kind:art?(art.mature?'NSFW artwork':'Artwork'):(record.k||'')};});
    var media=(window.GZR_MEDIA_SEARCH?window.GZR_MEDIA_SEARCH(q):[]);
    return entries.concat(media).slice(0,12);
  }
  function renderHits(q){
    var hits=searchRecords(q);
    function marked(t){if(!q)return esc(t);var i=t.toLowerCase().indexOf(q);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length));}
    sug.innerHTML=(hits.length?hits.map(function(r){return '<button data-slug="'+esc(r.slug)+'"><span class="s-thumb'+(r.image?'':' empty')+(r.mature?' s-thumb-nsfw':'')+'">'+(r.image?'<img src="'+esc(r.image)+'" alt="">':'◇')+(r.mature?'<b class="s-nsfw">NSFW</b>':'')+'</span><span class="s-txt"><span class="s-title">'+marked(r.title)+'</span><span class="s-kind">'+esc(r.kind)+'</span></span></button>';}).join(''):'<div class="s-empty">No entries match “'+esc(q)+'”.</div>');
    sug.style.display='block';
  }
  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    if(!q){searchEmpty();return;}
    renderHits(q);
  });
  input.addEventListener('keydown', function(e){
    if(e.key!=='Enter') return;
    e.preventDefault();
    var q = input.value.trim().toLowerCase();
    if(!q) return;
    var firstRecord=searchRecords(q)[0], first=firstRecord&&firstRecord.slug;
    if(first){ goTo('/wiki/'+first); sug.style.display='none'; box.classList.remove('open'); document.body.classList.remove('search-active'); input.value=''; }
    else { renderHits(q); }
  });
  sug.addEventListener('click', function(e){
    var b = e.target.closest('button[data-slug]'); if(!b) return;
    goTo('/wiki/'+b.getAttribute('data-slug'));
    sug.style.display='none'; box.classList.remove('open'); document.body.classList.remove('search-active'); input.value='';
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
  var P=[['chapters','Volumes & Chapters'],['characters','Characters'],['gu','Gu Worms'],['cultivation','Cultivation System'],['the-legends-of-ren-zu','Legends of Ren Zu'],['locations','Locations & World'],['clans','Factions & Clans'],['timeline','Timeline & History'],['gallery','Gallery'],['glossary','Glossary'],['adaptations','Adaptations & Media'],['community','Community Hub']];
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

