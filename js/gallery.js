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
  function image(f,full,style){return '<img src="'+e(full?f.image:f.thumbnail)+'" alt="'+e(f.title)+'"'+(style?' style="'+style+'"':'')+' loading="lazy" decoding="async">';}
  function cards(files){return '<div class="collection-grid">'+files.map(function(f){var ratio=Math.max(.5,Math.min(2.4,f.dimensions[0]/f.dimensions[1]));return '<article class="collection-card" style="--art-ratio:'+ratio+'"><a class="collection-picture" data-view-art="'+e(f.id)+'" href="'+url('images-file-'+f.id)+'">'+image(f,false)+'<div class="collection-caption"><h4>'+e(f.title)+'</h4><p>'+e(artist(f.artist).name)+'</p><small>'+f.dimensions.join(' × ')+'</small>'+(f.method==='collection-labelled AI'?'<small>AI-labelled</small>':'')+(/^images-volume-[1-6]$/.test(current)?'<small>'+(f.volume===current.slice(7)?'Volume in collection filename':'Related subject · scene unverified')+'</small>':'')+'</div></a></article>';}).join('')+'</div>';}
  function source(a){var id=a.folderId||a.tierFolderId;return '<a href="https://drive.google.com/drive/folders/'+e(id)+'" target="_blank" rel="noopener">'+(a.folderId?'Open artist source folder':'Find folder in source tier')+' ↗</a>';}
  function volumeFiles(v){return D.files.filter(function(f){return f.volume==='volume-'+v.number || (!f.volume && f.subjects.some(function(subject){return v.subjects.includes(subject);}));});}
  function volumeTitle(v){return 'Volume '+v.number+': '+v.title;}
  var subjectKinds={'Fang Yuan':'characters','Bai Ning Bing':'characters','Bo Qing':'characters','Ren Zu':'characters','Little Hu':'characters','Hei Lou Lan':'characters','Fairy Li Shan':'characters','Fang Zheng':'characters','Gu Yue Yao Le':'characters','Red Lotus':'characters','Xie Han Mo':'characters','Genesis Lotus':'characters','Giant Sun':'characters','Limitless':'characters','Meng Qiu Zhen':'characters','Reckless Savage':'characters','Paradise Earth':'characters','Primordial Origin':'characters','Spectral Soul':'characters','Star Constellation':'characters','Tao Zhu':'characters','Thieving Heaven':'characters','Wu Shuai':'characters','Wu Yong':'characters','Feng Jiu Ge':'characters','Shang Xin Ci':'characters','Hei Fan':'characters','Feng Tian Yu':'characters','Xia Lin':'characters','Ye Fan':'characters','Chen Yi':'characters','Hope Gu':'gu','Air Bubble Fish Gu':'gu','Heavenly Essence Treasure Lotus':'gu','Blood Skull Gu':'gu','Spring Autumn Cicada':'gu','Attitude Gu':'gu','Star Thought Gu':'gu','Fate Gu':'gu','Fixed Immortal Travel Gu':'gu','Regret Gu':'gu','Footless Bird':'beasts','Divine Bean Palace':'gu-houses','Treasure Yellow Heaven':'locations','Dang Hun Mountain':'locations','Luo Po Valley':'locations','Snowy Mountain Blessed Land':'locations','River of Time':'locations','Reverse Flow River':'locations','Crazed Demon Cave':'locations','Three Kings Inheritance':'locations','Ordinary Abyss':'legends'};
  ['Qin Bai Sheng','Duke Long','Chu Du','Bing Sai Chuan','Feng Jin Huang','Shen Cui','Ge Yao','Purple Mountain','Qiao Si Liu','Liu Shu Xian','Shen Cong Sheng','Tai Bai Yun Sheng','Thunder Ghost True Monarch','Verdant Great Sun','Fairy Zi Wei','Bai Zu','Blazing Heaven Demoness','Dong Fang Chang Fan','Fang Gong','Fang Di Chang','He Chun Qiu','Lady White Rabbit','Li Xiao Bai','Lu Wei Yin','Old Ancestor Xue Hu','Shen Shang','Zhan Bu Du'].forEach(function(n){subjectKinds[n]='characters';});
  ['Mao Li Qiu','Zuo Ye Hui','Di Zang Sheng','Qing Chou'].forEach(function(n){subjectKinds[n]='beasts';});
  subjectKinds['Yi Tian Mountain']='locations';subjectKinds['Eighty-Eight True Yang Building']='gu-houses';
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
    var catN=function(id){return D.files.filter(function(f){return id==='volumes'?D.volumes.some(function(v){return f.volume==='volume-'+v.number||(!f.volume&&f.subjects.some(function(s){return v.subjects.includes(s);}));}):f.categories.includes(id);}).length;};
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
        ].concat(D.volumes.map(function(v){return {id:'images-volume-'+v.number,title:volumeTitle(v),n:volumeFiles(v).length};}),[
        {id:'images-volume-unassigned',title:'Without a volume assignment',n:D.files.filter(function(f){return !f.volume;}).length}
      ])},
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
    return '<div class="collection-detail">'+('<a class="collection-original" data-view-art="'+e(f.id)+'" href="'+e(f.image)+'" target="_blank" rel="noopener">'+image(f,true)+'</a>')+'<aside><p class="collection-overline">REVEREND INSANITY · '+e(f.format)+'</p><h3>'+e(f.title)+'</h3><p>Art: '+link('images-'+a.id,a.name)+'</p><dl><dt>Collection</dt><dd>Kolev/KolevXD</dd><dt>Volume</dt><dd>'+(f.volume?link('images-'+f.volume,'Volume '+f.volume.slice(7))+' · source filename; not text-verified':'Not yet assigned')+'</dd><dt>Creation method</dt><dd>'+e(f.method)+'</dd><dt>Source tier</dt><dd>'+e(a.tier)+' · collection label, not a quality rating</dd><dt>Original dimensions</dt><dd>'+f.dimensions.join(' × ')+'</dd><dt>Content notes</dt><dd>'+e(f.contentWarnings.join(', ')||'No warning recorded; review is not a safety guarantee')+'</dd></dl>'+(f.chapterLabel?'<p class="collection-note">Source filename references Chapter '+f.chapterLabel+'. Not text-verified; no chapter gallery is created.</p>':'')+'<p><a href="https://drive.google.com/file/d/'+e(f.sourceId)+'/view" target="_blank" rel="noopener">View original Drive file ↗</a></p><p>'+source(a)+'</p><p class="collection-note">Credit follows the source folder. Artwork rights remain with their respective holders; no new licence is asserted.</p>'+(f.hideOriginalFilename?'<p class="collection-note">Original filename withheld here to avoid spoilers.</p>':'<p class="collection-note">Original filename: '+e(f.originalFilename)+'</p>')+'</aside></div>'+heading('Related subjects')+(f.classificationEvidence?'<p class="collection-note">Subject and category labels are based on collection filenames or folder labels and image review; they are not independently verified against the artist’s original posts.</p>':'')+subjectIndex([f])+(f.related.length?heading('Related versions & works')+cards(D.files.filter(function(x){return f.related.includes(x.id);})):'');
  }
  var emptyKnowledge={
    ranks:{h:'Gu Masters & ranks',p:'Power in 蛊真人 is measured in 转 (revolves/ranks) — from 一转 (first revolve, beyond which no one without an opened aperture qualifies as a Gu Master) through to 九转, with legendary powers (大道) and the world’s rarest masters above them, the Venerables (尊者). Each revolve deepens a Master’s primeval essence and the quality of Gu they can refine and control. The story itself introduces the ranking system and inherited ranks in its early chapters (this wiki’s Chapter 7 brief covers rank inheritances), but the full rank table has not yet been cited on this wiki.'},
    cultivation:{h:'Cultivation & apertures',p:'Cultivation (修真) in 蛊真人 begins at the Aperture Opening Ceremony, when a child’s aptitude is assessed and a primeval aperture is refined — the mark of a potential Gu Master. Advancement is bought with primeval stones (元石), dangerous killer moves (杀招) and endless refining of Gu from spirits and insects; the story treats every rank as something that must be paid for, in resources and very often in lives. This wiki has Aperture Opening Ceremony and Aptitude Grades articles; the full system has not yet been cited here, so the prose above is general background, not a reference table.'},
    factions:{h:'Factions & clans',p:'The cultivation world of 蛊真人 is organized around clans, lineages and alliances rather than states. The protagonist is born into the Gu Yue clan of Gu Yue Village on Qing Mao Mountain, and the Bai clan is another documented family on this wiki; above and around these sit the larger powers of the Five Regions — academies, alliances and great houses contending for primeval stones and legendary Gu. Specific rankings, histories, symbols and member rosters of these factions are not yet cited on this wiki; do not quote this page as a fact sheet.'},
    objects:{h:'Objects & treasures',p:'Treasures in 蛊真人 range from primeval stones (元石) — the raw currency of cultivation — to legendary Gu such as the Spring Autumn Cicada (春秋蝉), inherited killer moves, contracts and artifacts of the great houses. Artwork in this bucket would include artifact studies, treasure showcases and resource still-lifes; none are imported yet. Symbols of office and clan inheritance would live here too.'},
    maps:{h:'Maps & diagrams',p:'No depiction of the Five Regions (五域 — 北疆 the Northland, 东荒 the Eastern Wilds, 西漠 the Western Desert, 南疆 the Southern Wilds, 中州 the Central State) or of Gu Yue Village and Qing Mao Mountain exists in this collection yet. Cartography of the setting is rare even in fan material. When reviewed maps are imported they will appear here with source labels — placement will never be guessed from resemblance.'}
  };
  function emptyBackground(id){var k=emptyKnowledge[id];if(!k)return '';return '<section class="collection-note"><h3 style="margin-top:26px">'+e(k.h)+' — general knowledge, not cited on this wiki</h3><p>'+k.p+'</p><p class="collection-note">Background supplied so this page is never blank. It is uncited; verify against a copy of the text before quoting. Artwork placement, when imports arrive, follows source labels only.</p></section>';}
  function page(sl){
    if(sl==='images')return home();
    if(sl==='images-artists')return artistDirectory();
    if(sl.startsWith('images-file-')){var f=D.files.find(function(x){return 'images-file-'+x.id===sl;});return f?detail(f):'<p>Artwork not found.</p>';}
    var files=D.files.slice(),intro='',a;
    if(sl.startsWith('images-artist-')){
      a=artist(sl.slice(7));files=files.filter(function(f){return f.artist===a.id;});
      var cover=files[0], portrait=a.profileImage|| (cover&&cover.thumbnail), socials=(a.socials||[]).filter(function(s){return /^https:\/\//.test(s.url);}).map(function(s){return '<a href="'+e(s.url)+'" target="_blank" rel="noopener noreferrer">'+e(s.name)+' ↗</a>';}).join('');
      // Profile images are local reviewed assets. Fallback artwork is labelled, never represented as a portrait.
      var visual=portrait?'<figure class="collection-artist-visual"><img src="'+e(portrait)+'" alt="'+e(a.profileImage?'Profile image for '+a.name:'Artwork from '+a.name+' collection')+'"><figcaption>'+ (a.profileImage?'Artist profile image':'Collection artwork · profile image unverified')+'</figcaption></figure>':'';
      intro='<section class="collection-artist-head"'+(portrait?' style="--artist-cover:url(&quot;'+e(portrait)+'&quot;)"':'')+'><div class="collection-artist-inner"><div class="collection-artist-copy"><p class="collection-overline">ARTIST COLLECTION</p><h3>'+e(a.name)+'</h3><p>'+e(a.bio||a.name+' is credited in KolevXD’s Art Collection.')+' '+(files.length?'Explore '+files.length+' imported '+(files.length===1?'image':'images')+' below.':'Images from this collection have not been imported yet.')+'</p><div class="collection-artist-links">'+socials+source(a)+'</div><p class="collection-note">'+(socials?'Social links are based on available public sources. ':'Social profiles have not yet been verified. ')+(a.folderId?'Credit follows the source folder.':'The exact source folder has not yet been reconciled.')+'</p></div>'+visual+'</div></section>';
    }else if(/^images-volume-[1-6]$/.test(sl)){
      var vol=D.volumes.find(function(v){return sl==='images-volume-'+v.number;});
      files=volumeFiles(vol);
      intro='<p><b>'+e(volumeTitle(vol))+'</b> — Chapters '+e(vol.chapters)+'.</p>'+
        '<p>Also known as <i>'+e(vol.wikiTitle)+'</i> in the <a href="https://reverend-insanity.fandom.com/wiki/Volumes" target="_blank" rel="noopener noreferrer">Reverend Insanity Wiki</a>. Gallery coverage includes the whole novel, independently of translation progress.</p>'+
        '<p class="collection-note">This gallery includes source-labelled works and art of related subjects: '+e(vol.subjects.join(', '))+'. Subject connections are not verified scene or chapter placements; portraits may depict another point in the story. Subject labels are provisional, based on collection filenames, folders and image review, not necessarily artist-confirmed. A work can appear in more than one gallery.</p>';
    }else if(sl==='images-volume-unassigned'){files=files.filter(function(f){return !f.volume;});intro='<p>These works have no explicit volume placement. Some also appear in volume galleries because of their related subjects; that does not assign them to a specific scene or chapter.</p>';
    }else if(sl==='images-volumes'){
      var panels=D.volumes.map(function(v){var matches=volumeFiles(v),cover=matches[0];
        return '<section class="collection-panel"><h4>'+link('images-volume-'+v.number,volumeTitle(v))+'</h4>'+(cover?'<a class="volume-cover" href="'+url('images-volume-'+v.number)+'">'+image(cover,false,'width:100%;height:180px;object-fit:cover;display:block')+'</a>':'')+'<p>Chapters '+e(v.chapters)+' · '+matches.length+' related images<br>Wiki: '+e(v.wikiTitle)+'</p></section>';
      }).join('');
      panels+='<section class="collection-panel"><h4>'+link('images-volume-unassigned','Without an explicit volume assignment')+'</h4><p>'+D.files.filter(function(f){return !f.volume;}).length+' imported files have no explicit placement; some appear above as related-subject artwork.</p></section>';
      return heading('Browse by volume')+'<p>Explore all six volumes. Images include labelled artwork and related subjects, not necessarily scenes from that volume. Titles and chapter ranges: <a href="https://reverend-insanity.fandom.com/wiki/Volumes" target="_blank" rel="noopener noreferrer">Reverend Insanity Wiki ↗</a>.</p><div class="collection-panels">'+panels+'</div>';
    }else if(sl.startsWith('images-subject-')){files=files.filter(function(f){return f.subjects.some(function(s){return 'images-subject-'+slug(s)===sl;});});
    }else if(sl!=='images-recent'){var cat=D.categories.find(function(c){return 'images-'+c.id===sl;});if(cat){files=files.filter(function(f){return f.categories.includes(cat.id);});intro='<p>'+e(cat.description)+'.</p>'+(cat.id==='ai'?'<p class="collection-note">“AI” is a label supplied by the collection folder, not an independent judgement of the image. These files also appear under their depicted subjects.</p>':'')+(files.length===0?emptyBackground(cat.id):'');}}
    return intro+(sl.startsWith('images-subject-')?'':subjectIndex(files,cat?cat.id:null))+heading(/^images-volume-[1-6]$/.test(sl)?'Related artwork':'Media in this collection')+'<label class="collection-search">Search this collection<input id="collection-file-search" type="search" placeholder="Title, subject or artist…"></label><p id="collection-result-count" role="status"></p><div id="collection-results" data-files="'+e(files.map(function(f){return f.id;}).join(','))+'"></div>';
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
