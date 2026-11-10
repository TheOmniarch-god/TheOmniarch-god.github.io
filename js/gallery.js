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
    var chosen=['TOUZI','OSOT','Ullasseu'].map(function(n){return D.artists.find(function(a){return a.name===n;});});
    var covers=['bo-qing-1','footless-bird','ordinary-abyss'];
    var featured=chosen.map(function(a,i){var f=D.files.find(function(f){return f.id===covers[i];});return '<a href="'+url('images-'+a.id)+'" class="collection-feature">'+image(f,false)+'<strong>Images by '+e(a.name)+'</strong></a>';}).join('');
    featured+='<a class="collection-feature collection-all-artists" href="'+url('images-artists')+'"><span class="collection-directory-mark" aria-hidden="true">A–Z</span><strong>Images by other artists</strong><span>Alphabetical directory</span></a>';
    var panels=D.categories.filter(function(c){return c.id!=='ai';}).map(function(c){
      var files=D.files.filter(function(f){return c.id==='volumes'?!!f.volume:f.categories.includes(c.id);});
      var subs=subjects(files).filter(function(s){return subjectKinds[s]===c.id;});
      var content=c.id==='volumes'?'<li>'+link('images-volume-1','Volume 1: Demonic Nature Never Changes')+'</li><li>'+link('images-volume-unassigned','Images without a volume assignment')+'</li>':c.id==='others'?'<li>'+link('images-ai','AI-labelled images')+'</li><li>'+link('images-fan-takes','Fan reinterpretations')+'</li>':c.id==='scenes'||c.id==='fan-takes'?files.slice(0,5).map(function(f){return '<li>'+link('images-file-'+f.id,f.title)+'</li>';}).join(''):subs.map(function(sub){return '<li>'+link('images-subject-'+slug(sub),'Images of '+sub)+'</li>';}).join('');
      return '<section class="collection-panel"><h4>'+link('images-'+c.id,c.title)+'</h4>'+(content?'<ul>'+content+'</ul>':'<p>'+e(c.description)+'</p>')+'</section>';
    }).join('');
    return heading('Featured artists')+'<div class="collection-featured">'+featured+'</div>'+heading('Categories')+'<div class="collection-panels">'+panels+'</div>'+heading('Available artwork',link('images-recent','All images →'))+cards(D.files.slice(-6));
  }
  function detail(f){
    var a=artist(f.artist);
    return '<div class="collection-detail">'+('<a class="collection-original" data-view-art="'+e(f.id)+'" href="'+e(f.image)+'" target="_blank" rel="noopener">'+image(f,true)+'</a>')+'<aside><p class="collection-overline">REVEREND INSANITY · '+e(f.format)+'</p><h3>'+e(f.title)+'</h3><p>Art: '+link('images-'+a.id,a.name)+'</p><dl><dt>Collection</dt><dd>Kolev/KolevXD</dd><dt>Volume</dt><dd>'+(f.volume?link('images-volume-1','Volume 1')+' · source filename; not text-verified':'Not yet assigned')+'</dd><dt>Creation method</dt><dd>'+e(f.method)+'</dd><dt>Source tier</dt><dd>'+e(a.tier)+' · collection label, not a quality rating</dd><dt>Original dimensions</dt><dd>'+f.dimensions.join(' × ')+'</dd><dt>Content notes</dt><dd>'+e(f.contentWarnings.join(', ')||'No warning recorded; review is not a safety guarantee')+'</dd></dl>'+(f.chapterLabel?'<p class="collection-note">Source filename references Chapter '+f.chapterLabel+'. Not text-verified; no chapter gallery is created.</p>':'')+'<p><a href="https://drive.google.com/file/d/'+e(f.sourceId)+'/view" target="_blank" rel="noopener">View original Drive file ↗</a></p><p>'+source(a)+'</p><p class="collection-note">Credit follows the source folder. Artwork rights remain with their respective holders; no new licence is asserted.</p><p class="collection-note">Original filename: '+e(f.originalFilename)+'</p></aside></div>'+heading('Related subjects')+subjectIndex([f])+(f.related.length?heading('Related versions & works')+cards(D.files.filter(function(x){return f.related.includes(x.id);})):'');
  }
  function page(sl){
    if(sl==='images')return home();
    if(sl==='images-artists')return artistDirectory();
    if(sl.startsWith('images-file-')){var f=D.files.find(function(x){return 'images-file-'+x.id===sl;});return f?detail(f):'<p>Artwork not found.</p>';}
    var files=D.files.slice(),intro='',a;
    if(sl.startsWith('images-artist-')){
      a=artist(sl.slice(7));files=files.filter(function(f){return f.artist===a.id;});
      intro='<div class="collection-artist-head"><p class="collection-overline">ARTIST COLLECTION</p><h3>'+e(a.name)+'</h3><p>'+files.length+' imported files · '+e(a.folderName)+'</p><p>'+source(a)+'</p><p class="collection-note">'+(a.folderId?'Artist source folder verified.':'Artist name comes from the supplied inventory; the exact source-folder link has not yet been reconciled.')+' No biography or total source-work count is inferred.</p></div>';
    }else if(sl==='images-volume-1'){
      files=files.filter(function(f){return f.volume==='volume-1';});intro='<p>Volume 1: Demonic Nature Never Changes. Current placement is source-labelled, not text-verified.</p>';
    }else if(sl==='images-volume-unassigned'){files=files.filter(function(f){return !f.volume;});intro='<p>These works have no verified volume placement. General portraits and fan reinterpretations need not be assigned to a volume.</p>';
    }else if(sl==='images-volumes'){return heading('Browse by volume')+'<div class="collection-panels"><section class="collection-panel"><h4>'+link('images-volume-1','Volume 1: Demonic Nature Never Changes')+'</h4><p>'+D.files.filter(function(f){return f.volume==='volume-1';}).length+' source-labelled file</p></section><section class="collection-panel"><h4>'+link('images-volume-unassigned','Not yet assigned')+'</h4><p>Other volumes will be added when source placements are established—not as empty navigation.</p></section></div>';
    }else if(sl.startsWith('images-subject-')){files=files.filter(function(f){return f.subjects.some(function(s){return 'images-subject-'+slug(s)===sl;});});
    }else if(sl!=='images-recent'){var cat=D.categories.find(function(c){return 'images-'+c.id===sl;});if(cat){files=files.filter(function(f){return f.categories.includes(cat.id);});intro='<p>'+e(cat.description)+'.</p>'+(cat.id==='ai'?'<p class="collection-note">“AI” is a label supplied by the collection folder, not an independent judgement of the image. These files also appear under their depicted subjects.</p>':'');}}
    return intro+(sl.startsWith('images-subject-')?'':subjectIndex(files,cat?cat.id:null))+heading('Media in this collection')+'<label class="collection-search">Search this collection<input id="collection-file-search" type="search" placeholder="Title, subject or artist…"></label><p id="collection-result-count" role="status"></p><div id="collection-results" data-files="'+e(files.map(function(f){return f.id;}).join(','))+'"></div>';
  }
  window.renderImagesGallery=function(sl){current=sl||'images';return '<section class="collection-library"><nav class="collection-nav" aria-label="Image collections">'+link('images','Images')+link('images-artists','Artists')+link('images-characters','Characters')+link('images-volumes','Volumes')+link('images-recent','All imported artwork')+'<button type="button" data-media-search>Search media</button></nav><div class="collection-warning"><span>Art includes later-story scenes and fan interpretations.</span></div><div id="collection-body">'+page(current)+'</div><p class="collection-footer">KolevXD’s Art Collection · '+D.artists.length+' artist folders indexed · '+D.files.length+' images available. Importing is ongoing. '+ '<a href="https://drive.google.com/drive/folders/'+D.rootId+'" target="_blank" rel="noopener">Browse source collection ↗</a></p></section>';};
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
