/* Category-led Images library. Data is separate from presentation. */
(function () {
  'use strict';
  var current = 'images', D = window.GZR_GALLERY;
  var e = function(v){return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  var slug = function(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-');};
  var url = function(id){return '/wiki/'+id+'/';};
  var link = function(id,title){return '<a href="'+url(id)+'">'+e(title)+'</a>';};
  var artist = function(id){return D.artists.find(function(a){return a.id===id;});};
  var count = function(id){return D.files.filter(function(f){return f.artist===id;}).length;};
  function image(f,full){return '<img src="'+e(full?f.image:f.thumbnail)+'" alt="'+e(f.title)+'" loading="lazy" decoding="async">';}
  function cards(files){return '<div class="collection-grid">'+files.map(function(f){var ratio=Math.max(.5,Math.min(2.4,f.dimensions[0]/f.dimensions[1]));return '<article class="collection-card" style="--art-ratio:'+ratio+'"><a class="collection-picture" data-view-art="'+e(f.id)+'" href="'+url('images-file-'+f.id)+'">'+image(f,false)+'<div class="collection-caption"><h4>'+e(f.title)+'</h4><p>'+e(artist(f.artist).name)+'</p><small>'+f.dimensions.join(' × ')+'</small>'+(f.method==='collection-labelled AI'?'<small>AI-labelled</small>':'')+'</div></a></article>';}).join('')+'</div>';}
  function source(a){var id=a.folderId||a.tierFolderId;return '<a href="https://drive.google.com/drive/folders/'+e(id)+'" target="_blank" rel="noopener">'+(a.folderId?'Open artist source folder':'Find folder in source tier')+' ↗</a>';}
  function categoryCount(id){return D.files.filter(function(f){return id==='volumes'?!!f.volume:f.categories.includes(id);}).length;}
  var subjectKinds={'Fang Yuan':'characters','Bai Ning Bing':'characters','Bo Qing':'characters','Ren Zu':'characters','Little Hu':'characters','Hei Lou Lan':'characters','Fairy Li Shan':'characters','Hope Gu':'gu','Air Bubble Fish Gu':'gu','Footless Bird':'beasts','Divine Bean Palace':'gu-houses','Treasure Yellow Heaven':'locations','Ordinary Abyss':'legends'};
  function heading(title,extra){return '<div class="collection-heading"><h3>'+e(title)+'</h3>'+(extra||'')+'</div>';}
  function subjects(files){return Array.from(new Set(files.flatMap(function(f){return f.subjects;}))).sort(function(a,b){return a.localeCompare(b);});}
  function subjectIndex(files,kind){
    var names=subjects(files).filter(function(n){return !kind||subjectKinds[n]===kind;});
    if(!names.length)return '';
    var groups={};names.forEach(function(n){var key=n[0].toUpperCase();(groups[key]=groups[key]||[]).push(n);});
    return '<section class="collection-subcategories"><h3>Subcategories</h3><p>This collection has '+names.length+' subject subcategories. Counts refer to available image files.</p><div class="collection-subcategory-columns">'+Object.keys(groups).sort().map(function(g){return '<section><h4>'+e(g)+'</h4><ul>'+groups[g].map(function(n){return '<li>'+link('images-subject-'+slug(n),'Images of '+n)+' <small>('+files.filter(function(f){return f.subjects.includes(n);}).length+' F)</small></li>';}).join('')+'</ul></section>';}).join('')+'</div></section>';
  }
  function artistDirectory(){
    return heading('Artists — alphabetical directory','<span>'+D.artists.length+' inventoried folders</span>')+'<p class="collection-note">Names follow the supplied collection inventory. Counts are imported image files—not total works in Drive. An unimported collection is not an empty source folder.</p><label class="collection-search">Find an artist<input id="collection-artist-search" type="search" placeholder="Name or original folder label…"></label><div id="collection-directory"></div>';
  }
  function fillDirectory(q){
    var el=document.getElementById('collection-directory');if(!el)return;
    var rows=D.artists.filter(function(a){return (a.name+' '+a.folderName).toLowerCase().includes((q||'').toLowerCase());}).sort(function(a,b){return a.name.localeCompare(b.name,undefined,{numeric:true});});
    var groups={};rows.forEach(function(a){var letter=/^[a-z]/i.test(a.name)?a.name[0].toUpperCase():/^\d/.test(a.name)?'0–9':'Other scripts';(groups[letter]=groups[letter]||[]).push(a);});
    el.innerHTML='<p role="status">'+rows.length+' matching artist folders</p><nav class="collection-az" aria-label="Artist letters">'+Object.keys(groups).map(function(g){return '<a href="#artists-'+e(g.replace(/\W/g,''))+'">'+e(g)+'</a>';}).join('')+'</nav>'+Object.keys(groups).map(function(g){return '<section class="collection-letter" id="artists-'+e(g.replace(/\W/g,''))+'"><h4>'+e(g)+'</h4><ul>'+groups[g].map(function(a){return '<li>'+link('images-'+a.id,a.name)+'<small>'+ (count(a.id)?count(a.id)+' imported':'Not yet imported')+'</small></li>';}).join('')+'</ul></section>';}).join('')+(rows.length?'':'<p>No artist matches that search.</p>');
  }
  function home(){
    var featuredOrder=['轮回画室丶不修','OSOT','TOUZI','Ullasseu','diouer','瑞光Pro'];
    var covers={'轮回画室丶不修':'limitless','OSOT':'footless-bird','TOUZI':'volume-one-duel','Ullasseu':'ordinary-abyss','diouer':'bai-ning-bing-study','瑞光Pro':'art-119682e8c6894298'};
    var featured=featuredOrder.map(function(n){var a=D.artists.find(function(a){return a.name===n&&!a.ai;});var f=D.files.find(function(x){return a&&x.id===covers[n]&&x.artist===a.id;});if(!a||!f)return '';return '<a href="'+url('images-'+a.id)+'" class="collection-feature">'+image(f,false)+'<strong>Images by '+e(a.name)+'</strong></a>';}).join('');
    featured+='<a href="'+url('images-artists')+'" class="collection-feature collection-feature-more"><span class="collection-directory-mark" aria-hidden="true">A—Z</span><strong>Explore more artists</strong></a>';
    featured+='<a href="'+url('images-artists')+'" class="collection-feature collection-feature-more"><span class="collection-directory-mark collection-upcoming" aria-hidden="true">✦</span><strong>Future Pro spotlight</strong></a>';
    var catN=function(id){return D.files.filter(function(f){return id==='volumes'?!!f.volume:f.categories.includes(id);}).length;};
    var subN=function(s){return D.files.filter(function(f){return f.subjects.includes(s);}).length;};
    var subLinks=function(kind){return Object.keys(subjectKinds).filter(function(s){return subjectKinds[s]===kind;}).map(function(s){return {id:'images-subject-'+slug(s),title:'Images of '+s,n:subN(s)};}).filter(function(x){return x.n>0;});};
    var item=function(it){return '<li>'+link(it.id,it.title)+'<small>'+it.n+'</small></li>';};
    var groups=[
      {title:'Characters',id:'images-characters',children:[{id:'images-characters',title:'All character artwork',n:catN('characters')}].concat(subLinks('characters'))},
      {title:'Gu & cultivation',children:[
        {id:'images-gu',title:'Gu Worms',n:catN('gu')},
        {id:'images-gu-houses',title:'Gu Houses & constructs',n:catN('gu-houses')},
        {id:'images-ranks',title:'Gu Masters & ranks',n:catN('ranks')},
        {id:'images-cultivation',title:'Cultivation & apertures',n:catN('cultivation')},
        {id:'images-objects',title:'Objects & treasures',n:catN('objects')}
      ]},
      {title:'World & places',children:[
        {id:'images-locations',title:'Locations & world',n:catN('locations')},
        {id:'images-factions',title:'Factions & clans',n:catN('factions')},
        {id:'images-maps',title:'Maps & diagrams',n:catN('maps')},
        {id:'images-legends',title:'The Legends of Ren Zu',n:catN('legends')}
      ]},
      {title:'Events & scenes',id:'images-scenes',children:[{id:'images-scenes',title:'Battles & scenes',n:catN('scenes')}]},
      {title:'Creatures & beasts',id:'images-beasts',children:[{id:'images-beasts',title:'Creatures & beasts',n:catN('beasts')}]},
      {title:'Adaptations & fan takes',id:'images-fan-takes',children:[{id:'images-fan-takes',title:'Fan reinterpretations',n:catN('fan-takes')}]},
      {title:'Story placement',id:'images-volumes',children:[
        {id:'images-volumes',title:'Browse volumes 1–6',n:catN('volumes')},
        {id:'images-volume-1',title:'Volume 1: Demonic Nature Never Changes',n:D.files.filter(function(f){return f.volume==='volume-1';}).length},
        {id:'images-volume-unassigned',title:'Without a volume assignment',n:D.files.filter(function(f){return !f.volume;}).length}
      ]},
      {title:'Other collections',children:[
        {id:'images-others',title:'Others',n:catN('others')},
        {id:'images-ai',title:'AI-labelled artwork',n:catN('ai')},
        {id:'images-recent',title:'All imported artwork',n:D.files.length}
      ]}
    ];
    var tree='<div class="collection-tree-columns">'+groups.map(function(g){var head=g.id?link(g.id,g.title):e(g.title);return '<section class="collection-tree-group"><h4>'+head+'</h4><ul>'+g.children.map(item).join('')+'</ul></section>';}).join('')+'</div>';
    return heading('Featured artists',link('images-artists','All artists →'))+'<div class="collection-featured">'+featured+'</div>'+heading('Categories')+tree+heading('Recent uploads',link('images-recent','All uploads →'))+cards(D.files.slice(-6));
  }
  function detail(f){
    var a=artist(f.artist);
    return '<div class="collection-detail">'+('<a class="collection-original" data-view-art="'+e(f.id)+'" href="'+e(f.image)+'" target="_blank" rel="noopener">'+image(f,true)+'</a>')+'<aside><p class="collection-overline">REVEREND INSANITY · '+e(f.format)+'</p><h3>'+e(f.title)+'</h3><p>Art: '+link('images-'+a.id,a.name)+'</p><dl><dt>Collection</dt><dd>Kolev/KolevXD</dd><dt>Volume</dt><dd>'+(f.volume?link('images-'+f.volume,'Volume '+f.volume.slice(7))+' · source filename; not text-verified':'Not yet assigned')+'</dd><dt>Creation method</dt><dd>'+e(f.method)+'</dd><dt>Source tier</dt><dd>'+e(a.tier)+' · collection label, not a quality rating</dd><dt>Original dimensions</dt><dd>'+f.dimensions.join(' × ')+'</dd><dt>Content notes</dt><dd>'+e(f.contentWarnings.join(', ')||'No warning recorded; review is not a safety guarantee')+'</dd></dl>'+(f.chapterLabel?'<p class="collection-note">Source filename references Chapter '+f.chapterLabel+'. Not text-verified; no chapter gallery is created.</p>':'')+'<p><a href="https://drive.google.com/file/d/'+e(f.sourceId)+'/view" target="_blank" rel="noopener">View original Drive file ↗</a></p><p>'+source(a)+'</p><p class="collection-note">Credit follows the source folder. Artwork rights remain with their respective holders; no new licence is asserted.</p>'+(f.hideOriginalFilename?'<p class="collection-note">Original filename withheld here to avoid spoilers.</p>':'<p class="collection-note">Original filename: '+e(f.originalFilename)+'</p>')+'</aside></div>'+heading('Related subjects')+subjectIndex([f])+(f.related.length?heading('Related versions & works')+cards(D.files.filter(function(x){return f.related.includes(x.id);})):'');
  }
  var knownAboutNovel='<section class="collection-note"><h3 style="margin-top:26px">Background on Reverend Insanity (general knowledge, not cited on this wiki)</h3>'+
    '<p>蛊真人 (Gǔ Zhēn Rén) — in English, <b>Reverend Insanity</b> — is a Chinese cultivation/仙侠 serial by <b>不苦 (Bu Ku)</b>, published on <b>Qidian</b> (起点中文网). The original run reached <b>chapter 2,334 and entered hiatus in 2019</b>; the ending was never published. It is one of the most read, imitated and debated xianxia of the 2010s — notorious for an utterly ruthless protagonist and for making “cruel but clever” a fandom baseline. This re-translation covers the opening of the story; the full original text has not had an official English release.</p>'+
    '<p><b>The world:</b> cultivation runs on <b>Gu worms</b> (蛊) — insects, spirits and transformed special materials refined into magical tools, ranked in <b>转 (Revolves): 一转 through 九转</b>, with legendary powers (大道) above. The continent is split into the <b>Five Regions (五域)</b>: 北疆 (Northland), 东荒 (Eastern Wilds), 西漠 (Western Desert), 南疆 (Southern Wilds) and 中州 (Central State), each with its own clans, academies and regional politics.</p>'+
    '<p><b>The protagonist:</b> <b>Fang Yuan (方源)</b> — the serial opens with a man reborn into his younger self by the legendary <b>Spring Autumn Cicada</b> (春秋蝉) after being betrayed, and it follows his rise from an unremarkable young Gu Master into callous power. He is famous precisely because he has almost no sentimentality: he sacrifices, schemes, lies and kills, and still keeps cultivating.</p>'+
    '<p><b>Honesty note:</b> the above is general, widely-available knowledge about a very widely read novel, provided here so this page is never blank. It is <b>not yet cited to the source texts on this wiki</b>, and no claim above is used to place artwork in a volume. Volume titles/boundaries beyond Volume 1 are not on this wiki in a verified form.</p></section>';
  var volumeKnowledge={
    1:'<p>Volume 1 is the verified opening act of the original serial — commonly read as the “comeback volume”: the betrayal in Gu Yue Village, the reincarnation via the Spring Autumn Cicada (春秋蝉), and a cold, cunning young mind behind a harmless face. Only this volume currently has source-labelled artwork in this collection.</p>',
    2:'<p>Commonly described by readers (approximate, uncited): the fall-out of the Gu Yue village act — Fang Yuan consolidating a cultivation base and a long game before leaving the safety of familiar territory. The exact Chinese title and chapter boundaries of this volume are not verified on this wiki and are not invented here.</p>',
    3:'<p>Commonly described by readers (approximate, uncited): the stage widens beyond the village — clan and academy politics across the Five Regions, earlier sets of regional rivals, and Fang Yuan’s advantage shifting from information to raw growth. Boundaries unverified on this wiki.</p>',
    4:'<p>Commonly described by readers (approximate, uncited): higher-rank Gu Masters and regional alliances — the stakes become political as much as personal; Fang Yuan is now feared in certain circles, though still hunted privately. Boundaries unverified on this wiki.</p>',
    5:'<p>Commonly described by readers (approximate, uncited): the world’s deep history and the existence above 九转 (the Great Dao) come into play; the serial’s true scale becomes legible to the protagonist for the first time. Boundaries unverified on this wiki.</p>',
    6:'<p>Commonly described by readers (approximate, uncited): late published chapters, deeply debated in the fandom — the serial ended without a published conclusion when 不苦 went on hiatus in 2019 at chapter 2,334, so every theory about how far Volume 6 reaches is exactly that: a theory. Boundaries unverified on this wiki.</p>'
  };
  var emptyKnowledge={
    ranks:{h:'Gu Masters & ranks',p:'Power in 蛊真人 is measured in 转 (revolves/ranks) — from 一转 (first revolve, beyond which no one without an opened aperture qualifies as a Gu Master) through to 九转, with legendary powers (大道) and the world’s rarest masters above them, the Venerables (尊者). Each revolve deepens a Master’s primeval essence and the quality of Gu they can refine and control. The story itself introduces the ranking system and inherited ranks in its early chapters (this wiki’s Chapter 7 brief covers rank inheritances), but the full rank table has not yet been cited on this wiki.'},
    cultivation:{h:'Cultivation & apertures',p:'Cultivation (修真) in 蛊真人 begins at the Aperture Opening Ceremony, when a child’s aptitude is assessed and a primeval aperture is refined — the mark of a potential Gu Master. Advancement is bought with primeval stones (元石), dangerous killer moves (杀招) and endless refining of Gu from spirits and insects; the story treats every rank as something that must be paid for, in resources and very often in lives. This wiki has Aperture Opening Ceremony and Aptitude Grades articles; the full system has not yet been cited here, so the prose above is general background, not a reference table.'},
    factions:{h:'Factions & clans',p:'The cultivation world of 蛊真人 is organized around clans, lineages and alliances rather than states. The protagonist is born into the Gu Yue clan of Gu Yue Village on Qing Mao Mountain, and the Bai clan is another documented family on this wiki; above and around these sit the larger powers of the Five Regions — academies, alliances and great houses contending for primeval stones and legendary Gu. Specific rankings, histories, symbols and member rosters of these factions are not yet cited on this wiki; do not quote this page as a fact sheet.'},
    objects:{h:'Objects & treasures',p:'Treasures in 蛊真人 range from primeval stones (元石) — the raw currency of cultivation — to legendary Gu such as the Spring Autumn Cicada (春秋蝉), inherited killer moves, contracts and artifacts of the great houses. Artwork in this bucket would include artifact studies, treasure showcases and resource still-lifes; none are imported yet. Symbols of office and clan inheritance would live here too.'},
    maps:{h:'Maps & diagrams',p:'No depiction of the Five Regions (五域 — 北疆 the Northland, 东荒 the Eastern Wilds, 西漠 the Western Desert, 南疆 the Southern Wilds, 中州 the Central State) or of Gu Yue Village and Qing Mao Mountain exists in this collection yet. Cartography of the setting is rare even in fan material. When reviewed maps are imported they will appear here with source labels — placement will never be guessed from resemblance.'}
  };
  function emptyBackground(id){var k=emptyKnowledge[id];if(!k)return '';return '<section class="collection-note"><h3 style="margin-top:26px">'+e(k.h)+' — general knowledge, not cited on this wiki</h3><p>'+k.p+'</p><p class="collection-note">Background supplied so this page is never blank. It is uncited; verify against a copy of the text before quoting. Artwork placement, when imports arrive, follows source labels only.</p></section>';}
  function volumeBackground(v){return knownAboutNovel+'<section class="collection-note"><h3 style="margin-top:26px">What Volume '+v+' covers (general knowledge)</h3>'+(volumeKnowledge[v]||'')+'<p class="collection-note">Everything in this block is uncited, volume boundaries are approximate community knowledge, and none of it replaces the source. Check against a verified copy of the text before quoting. Artwork placement remains strictly filename-labelled.</p></section>';}
  function page(sl){
    if(sl==='images')return home();
    if(sl==='images-artists')return artistDirectory();
    if(sl.startsWith('images-file-')){var f=D.files.find(function(x){return 'images-file-'+x.id===sl;});return f?detail(f):'<p>Artwork not found.</p>';}
    var files=D.files.slice(),intro='',a;
    if(sl.startsWith('images-artist-')){
      a=artist(sl.slice(7));files=files.filter(function(f){return f.artist===a.id;});
      var cover=files[0], socials=(a.socials||[]).filter(function(s){return /^https:\/\//.test(s.url);}).map(function(s){return '<a href="'+e(s.url)+'" target="_blank" rel="noopener noreferrer">'+e(s.name)+' ↗</a>';}).join('');
      intro='<section class="collection-artist-head"'+(cover?' style="--artist-cover:url(&quot;'+e(cover.thumbnail)+'&quot;)"':'')+'><div class="collection-artist-copy"><p class="collection-overline">ARTIST COLLECTION</p><h3>'+e(a.name)+'</h3><p>'+e(a.bio||a.name+' is credited in KolevXD’s Art Collection.')+' '+(files.length?'Explore '+files.length+' imported '+(files.length===1?'image':'images')+' below.':'Images from this collection have not been imported yet.')+'</p><div class="collection-artist-links">'+socials+source(a)+'</div><p class="collection-note">'+(socials?'Social links are based on available public sources. ':'Social profiles have not yet been verified. ')+(a.folderId?'Credit follows the source folder.':'The exact source folder has not yet been reconciled.')+'</p></div></section>';
    }else if(/^images-volume-[1-6]$/.test(sl)){
      var vol=+sl.slice('images-volume-'.length),volKey='volume-'+vol;
      files=files.filter(function(f){return f.volume===volKey;});
      intro=vol===1
        ?'<p>Volume 1: Demonic Nature Never Changes — the only volume currently in this encyclopedia with a source-labelled artwork. Placement is source-labelled, not text-verified.</p>'+volumeBackground(1)
        :'<p>No imported file is yet source-labelled Volume '+vol+'. No artwork placement is guessed; this gallery fills only when reviewed imports carry a verified source placement.</p>'+volumeBackground(vol);
    }else if(sl==='images-volume-unassigned'){files=files.filter(function(f){return !f.volume;});intro='<p>These works have no verified volume placement. General portraits and fan reinterpretations need not be assigned to a volume.</p>';
    }else if(sl==='images-volumes'){
      var panels='';for(var v=1;v<=6;v++){var vKey='volume-'+v,n=D.files.filter(function(f){return f.volume===vKey;}).length;
        panels+='<section class="collection-panel"><h4>'+link('images-volume-'+v,v===1?'Volume 1: Demonic Nature Never Changes':'Volume '+v)+'</h4><p>'+(v===1?n+' source-labelled file'+(n===1?'':'s')+' — placement is source-labelled, not text-verified':'No source-labelled imports yet; general background on the page.')+'</p></section>';
      }
      panels+='<section class="collection-panel"><h4>'+link('images-volume-unassigned','Not yet assigned')+'</h4><p>'+D.files.filter(function(f){return !f.volume;}).length+' imported files have no verified volume placement.</p></section>';
      return heading('Browse by volume')+'<div class="collection-panels">'+panels+'</div>';
    }else if(sl.startsWith('images-subject-')){files=files.filter(function(f){return f.subjects.some(function(s){return 'images-subject-'+slug(s)===sl;});});
    }else if(sl!=='images-recent'){var cat=D.categories.find(function(c){return 'images-'+c.id===sl;});if(cat){files=files.filter(function(f){return f.categories.includes(cat.id);});intro='<p>'+e(cat.description)+'.</p>'+(cat.id==='ai'?'<p class="collection-note">“AI” is a label supplied by the collection folder, not an independent judgement of the image. These files also appear under their depicted subjects.</p>':'')+(files.length===0?emptyBackground(cat.id):'');}}
    return intro+(sl.startsWith('images-subject-')?'':subjectIndex(files,cat?cat.id:null))+heading('Media in this collection')+'<label class="collection-search">Search this collection<input id="collection-file-search" type="search" placeholder="Title, subject or artist…"></label><p id="collection-result-count" role="status"></p><div id="collection-results" data-files="'+e(files.map(function(f){return f.id;}).join(','))+'"></div>';
  }
  window.renderImagesGallery=function(sl){current=sl||'images';return '<section class="collection-library"><div class="collection-warning"><span>Art includes later-story scenes and fan interpretations.</span></div><div id="collection-body">'+page(current)+'</div><p class="collection-footer">KolevXD’s Art Collection · '+D.artists.length+' artist folders indexed · '+D.files.length+' images available. Importing is ongoing. '+ '<a href="https://drive.google.com/drive/folders/'+D.rootId+'" target="_blank" rel="noopener">Browse source collection ↗</a></p></section>';};
  function fillFiles(q){var el=document.getElementById('collection-results');if(!el)return;var ids=el.dataset.files.split(',');var files=D.files.filter(function(f){return ids.includes(f.id)&&(f.title+' '+f.subjects.join(' ')+' '+artist(f.artist).name).toLowerCase().includes((q||'').toLowerCase());});document.getElementById('collection-result-count').textContent=files.length+' imported image files';el.innerHTML=files.length?cards(files):'<div class="collection-empty"><h4>No imported artwork here yet</h4><p>The category is part of the agreed structure. Source review and importing are still in progress; this does not mean the source folder has no artwork.</p>'+link('images','Back to Images')+'</div>';}
  window.renderArticleArtLinks=function(article){
    var files=D.files.filter(function(f){return f.subjects.some(function(s){return s.toLowerCase()===article.t.toLowerCase();});});
    if(!files.length)return '';
    return '<section class="collection-article-link"><h3>Images</h3><p>'+link('images-subject-'+slug(article.t),'Browse '+files.length+' imported image files of '+article.t)+' <small>Artwork may reveal later-story events. Gallery coverage is separate from translation progress.</small></p></section>';
  };
  window.mountImagesGallery=function(){fillDirectory('');fillFiles('');};
  document.addEventListener('input',function(ev){if(ev.target.id==='collection-artist-search')fillDirectory(ev.target.value);if(ev.target.id==='collection-file-search')fillFiles(ev.target.value);});

  var viewer=null, sequence=[], position=0, returnFocus=null;
  function closeViewer(){if(!viewer)return;if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(function(){});viewer.close();viewer.remove();viewer=null;if(returnFocus&&returnFocus.isConnected)returnFocus.focus();}
  function showArtwork(){
    var f=D.files.find(function(f){return f.id===sequence[position];});if(!f)return;
    viewer.querySelector('.art-viewer-stage').innerHTML='<img src="'+e(f.image)+'" alt="'+e(f.title)+'">';
    viewer.querySelector('.art-viewer-info').innerHTML='<h3>'+e(f.title)+'</h3><p>Art: '+link('images-'+f.artist,artist(f.artist).name)+'</p><p>'+f.dimensions.join(' × ')+' · '+(position+1)+' / '+sequence.length+'</p><p>'+link('images-file-'+f.id,'Artwork details & source')+' · <a href="'+e(f.image)+'" target="_blank" rel="noopener">Open image</a></p><p class="collection-note">Rights remain with their respective holders. No licence or permission is inferred.</p>';
    viewer.querySelector('[data-view-prev]').disabled=sequence.length<2;viewer.querySelector('[data-view-next]').disabled=sequence.length<2;
  }
  function openViewer(id,trigger){
    if(viewer)closeViewer();returnFocus=trigger;
    sequence=Array.from(document.querySelectorAll('[data-view-art]')).map(function(a){return a.dataset.viewArt;}).filter(function(id,i,all){return all.indexOf(id)===i;});
    if(!sequence.includes(id))sequence=[id];position=sequence.indexOf(id);
    viewer=document.createElement('dialog');viewer.className='art-viewer';viewer.setAttribute('aria-label','Artwork viewer');
    viewer.innerHTML='<div class="art-viewer-toolbar"><button type="button" data-view-full aria-label="Toggle fullscreen">⛶</button><button type="button" data-view-close aria-label="Close artwork viewer">×</button></div><button type="button" class="art-viewer-prev" data-view-prev aria-label="Previous artwork">‹</button><div class="art-viewer-stage"></div><button type="button" class="art-viewer-next" data-view-next aria-label="Next artwork">›</button><section class="art-viewer-info" aria-live="polite"></section>';
    document.body.appendChild(viewer);showArtwork();viewer.addEventListener('cancel',function(ev){ev.preventDefault();closeViewer();});
    viewer.addEventListener('keydown',function(ev){if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){ev.preventDefault();position=(position+(ev.key==='ArrowLeft'?-1:1)+sequence.length)%sequence.length;showArtwork();}});
    viewer.addEventListener('click',function(ev){if(ev.target.closest('[data-view-close]'))closeViewer();else if(ev.target.closest('[data-view-prev],[data-view-next]')){position=(position+(ev.target.closest('[data-view-prev]')?-1:1)+sequence.length)%sequence.length;showArtwork();}else if(ev.target.closest('[data-view-full]')){if(document.fullscreenElement){if(document.exitFullscreen)document.exitFullscreen().catch(function(){});}else if(viewer.requestFullscreen)viewer.requestFullscreen().catch(function(){});}else if(ev.target.closest('a')&&!ev.target.closest('a[target]'))closeViewer();});
    viewer.showModal();viewer.querySelector('[data-view-close]').focus();
  }
  document.addEventListener('click',function(ev){var a=ev.target.closest('[data-view-art]');if(a&&!ev.ctrlKey&&!ev.metaKey&&!ev.shiftKey&&ev.button===0){ev.preventDefault();openViewer(a.dataset.viewArt,a);}});
  window.addEventListener('popstate',closeViewer);
  window.GZR_MEDIA_SEARCH=function(q){var query=(q||'').toLowerCase();return D.files.filter(function(f){return (f.title+' '+artist(f.artist).name+' '+f.subjects.join(' ')).toLowerCase().includes(query);}).map(function(f){return {slug:'images-file-'+f.id,title:f.title,image:f.thumbnail,kind:'Artwork · '+artist(f.artist).name};});};
})();
