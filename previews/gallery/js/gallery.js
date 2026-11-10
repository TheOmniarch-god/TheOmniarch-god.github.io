/* Images catalogue foundation. Existing published assets only; no Drive hotlinks. */
(function () {
  'use strict';
  var records = [], show = false;
  function esc(v) { return String(v).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function catalogue() {
    var byPath = {};
    Object.keys(window.OMNIARCH_ARTICLES).forEach(function (key) {
      var a = window.OMNIARCH_ARTICLES[key];
      if (!a.img || !a.img.startsWith('/previews/gallery/assets/')) return;
      var item = byPath[a.img];
      if (!item) {
        item = byPath[a.img] = {id: key, image: a.img, title: a.t, artist: a.art || 'Uncredited', subjects: [], kinds: [], work: 'reverend-insanity', volumes: [], method: 'unknown'};
      }
      item.subjects.push({id:key, title:a.t});
      var group = a.k === 'Gu' ? 'Gu' : a.k === 'Character' ? 'Characters' : /Location|Mountain|Region|Village/.test(a.k || '') ? 'World & places' : 'Other subjects';
      if (item.kinds.indexOf(group) < 0) item.kinds.push(group);
    });
    return Object.keys(byPath).map(function (p) { return byPath[p]; });
  }
  function options(values) { return values.sort(function(a,b){return a.localeCompare(b);}).map(function(v){return '<option>'+esc(v)+'</option>';}).join(''); }
  window.renderImagesGallery = function () {
    records = catalogue();
    var artists = Array.from(new Set(records.map(function(r){return r.artist;})));
    var kinds = Array.from(new Set([].concat.apply([],records.map(function(r){return r.kinds;}))));
    return '<section class="art-library" aria-label="Artwork library"><div class="art-intro"><p class="art-eyebrow">THE VISUAL COLLECTION</p><h3>A world worth looking closer at.</h3><p>Explore the artwork already illustrating the encyclopedia. One image, connected to its subjects and credited artist.</p><div class="art-stats">'+records.length+' image files <span>·</span> '+artists.length+' credit labels <span>·</span> Reverend Insanity</div></div>'+
      '<div class="art-tools"><label>Search the collection<input id="art-search" type="search" placeholder="Title, subject or artist…"></label><label>Subject<select id="art-subject"><option value="">All subjects</option>'+options(kinds)+'</select></label><label>Artist<select id="art-artist"><option value="">All artists</option>'+options(artists)+'</select></label><label>Volume<select id="art-volume"><option value="">All placements</option><option value="unassigned">Not yet assigned</option></select></label><button type="button" id="art-reset">Reset filters</button></div>'+
      '<div class="art-notice"><label><input type="checkbox" id="art-reveal"'+(show?' checked':'')+'> Show artwork and titles — may contain spoilers</label><p>Story placement has not yet been verified. Volume collections will appear as placements are reviewed; chapter references belong in artwork details, not separate galleries.</p></div>'+
      '<p id="art-results" role="status" aria-live="polite"></p><div id="art-grid" class="art-grid"></div><div class="art-footnote"><strong>A growing collection, not a completed archive.</strong> The wider Kolev/KolevXD collection is being reviewed separately. Artist labels below are inherited from existing site credits, not newly verified biographies. AI-labelled works will have a distinct collection under Others and retain their subject links when added.</div></section>';
  };
  window.mountImagesGallery = function () { if (document.getElementById('art-grid')) update(); };
  function update() {
    var grid = document.getElementById('art-grid'); if (!grid) return;
    var q = document.getElementById('art-search').value.trim().toLowerCase();
    var subject = document.getElementById('art-subject').value, artist = document.getElementById('art-artist').value;
    var list = records.filter(function(r){return (!subject || r.kinds.indexOf(subject)>=0) && (!artist || r.artist===artist) && (!q || (r.title+' '+r.artist+' '+r.subjects.map(function(s){return s.title;}).join(' ')).toLowerCase().includes(q));});
    document.getElementById('art-results').textContent = list.length+' of '+records.length+' image files';
    grid.innerHTML = list.length ? list.map(function(r){return '<article class="art-card"><button type="button" class="art-open" data-art="'+esc(r.id)+'"'+(!show?' disabled':'')+' aria-label="'+(show?'View '+esc(r.title):'Artwork hidden until spoilers are enabled')+'">'+(show?'<img src="'+esc(r.image)+'" alt="'+esc(r.title)+'" loading="lazy" decoding="async">':'<span class="art-hidden">蛊<small>Artwork hidden</small></span>')+'</button><div class="art-caption"><h4>'+(show?esc(r.title):'Unrevealed artwork')+'</h4><p>Art: '+esc(r.artist)+'</p><span class="art-tag">'+esc(r.kinds.join(' · '))+'</span></div></article>';}).join('') : '<div class="art-empty"><h4>No matching artwork</h4><p>Try another search or reset the filters.</p></div>';
  }
  document.addEventListener('input',function(e){if(e.target.id==='art-search') update();});
  document.addEventListener('change',function(e){if(e.target.id==='art-reveal'){show=e.target.checked;update();} else if(/^art-(subject|artist|volume)$/.test(e.target.id)) update();});
  document.addEventListener('click',function(e){
    if(e.target.closest('#art-reset')){['art-search','art-subject','art-artist','art-volume'].forEach(function(id){document.getElementById(id).value='';});update();return;}
    var button=e.target.closest('[data-art]'); if(!button || !show) return;
    var r=records.find(function(item){return item.id===button.dataset.art;}); if(!r) return;
    var dialog=document.createElement('dialog'); dialog.className='art-dialog';
    dialog.innerHTML='<button type="button" class="art-close" autofocus>Close ×</button><div class="art-view"><img src="'+esc(r.image)+'" alt="'+esc(r.title)+'"></div><div class="art-detail"><h3>'+esc(r.title)+'</h3><p>Art: '+esc(r.artist)+' · Reverend Insanity</p><p>Volume: not yet assigned. Creation method: not assessed.</p><p>Artwork rights remain with their respective holders; no new licence is asserted here.</p><p>Related subjects: '+r.subjects.map(function(s){return '<a href="/previews/gallery/wiki/'+esc(s.id)+'">'+esc(s.title)+'</a>';}).join(' · ')+'</p><a href="'+esc(r.image)+'" target="_blank" rel="noopener">Open full image ↗</a></div>';
    document.body.appendChild(dialog);dialog.addEventListener('close',function(){dialog.remove();if(button.isConnected)button.focus();});
    dialog.querySelector('.art-close').onclick=function(){dialog.close();};
    dialog.addEventListener('click',function(event){if(event.target.closest('a[href^="/previews/gallery/wiki/"]'))dialog.close();});
    dialog.showModal();
  });
  window.addEventListener('popstate',function(){document.querySelectorAll('.art-dialog').forEach(function(d){d.close();});});
})();
