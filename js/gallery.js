/* Category-led Images library. Data is separate from presentation. */
(function () {
  'use strict';
  var current = 'gallery', D = window.GZR_GALLERY;
  var e = function(v){return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  // Brand paths from Simple Icons (CC0); Douyin and TikTok use the shared note mark.
  var socialPaths = {"Bilibili":"M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z","Douyin":"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z","TikTok":"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z","ArtStation":"M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z","Instagram":"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077","Rednote":"M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z"};
  function socialLink(s){
    var path=Object.prototype.hasOwnProperty.call(socialPaths,s.name)?socialPaths[s.name]:null, label=s.name+' (opens in a new tab)';
    var icon=path?'<svg aria-hidden="true" viewBox="0 0 24 24"><path d="'+path+'"/></svg>':'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4h6v6M20 4l-9 9"/><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg><span>'+e(s.name)+'</span>';
    return '<a class="collection-social'+(path?'':' collection-social-fallback')+'" href="'+e(s.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+e(label)+'" title="'+e(label)+'">'+icon+'</a>';
  }
  var slug = function(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-');};
  var url = function(id){return '/wiki/'+id+'/';};
  var link = function(id,title){return '<a href="'+url(id)+'">'+e(title)+'</a>';};
  var artist = function(id){return D.artists.find(function(a){return a.id===id;});};
  var count = function(id){return visible(D.files).filter(function(f){return f.artist===id;}).length;};
  // Works imported from a mature room stay in the catalogue so the record is
  // never lost, but they are not browsable anywhere by default. Enabling the
  // gate is a deliberate, session-local act: the preference lives in
  // localStorage under one key and never enters the published data.
  var MATURE_KEY = 'ri-gallery-mature';
  // Confirmation is deliberately in memory only: a reload forgets it.
  var confirmed = {};
  function mature(f){return !!(f && f.mature);}
  // What a browse page may list: ordinary records, plus mature ones once this
  // browser has opted in. Listing a mature record is not the same as showing
  // it: the tile stays blurred and still needs a tap.
  function visible(files){return gateOpen()?files.slice():files.filter(function(f){return !mature(f);});}
  function gateOpen(){
    try{return window.localStorage.getItem(MATURE_KEY)==='open';}catch(err){return false;}
  }
  function setGate(open){
    try{ if(open)window.localStorage.setItem(MATURE_KEY,'open'); else window.localStorage.removeItem(MATURE_KEY); }catch(err){}
  }
  function matureNotice(count,what){
    if(!count)return '';
    return '<section class="collection-mature-notice" aria-labelledby="mature-notice-title"><h4 id="mature-notice-title">'+count+' '+(what||'artwork files')+' held behind the mature gate</h4>'+
      '<p>These were imported from a source folder the collection owner labelled as mature. They are kept out of ordinary browsing, search, counts and the artwork viewer until this browser opts in, and each file is still opened behind a confirmation.</p>'+
      '<p><button type="button" class="collection-mature-open" data-mature="open">Show mature artwork in this browser</button></p></section>';
  }
  // Collection numbers stay on cards. A creator project title or provisional
  // related subjects give the opened artwork useful context without inventing a scene.
  function artworkName(f){
    if(f.creatorAssetTitle)return {name:f.creatorAssetTitle, basis:'Creator’s image label'};
    if(f.creatorTitle)return {name:f.creatorTitle, basis:'Creator’s project title'};
    if(f.collectionSeries)return {name:f.collectionSeries, basis:'Collection series label · unverified for this individual image'};
    if(f.subjects.length)return {name:f.subjects.join(' · '), basis:'Related subjects · provisional collection labels'};
    return {name:'Artwork title not yet identified', basis:'No confirmed title or individual subject recorded'};
  }
  function artworkNaming(f){
    var n=artworkName(f);
    var shared=sharedTitleCount(f);
    return '<h3>'+e(n.name)+'</h3><p class="collection-note">'+e(n.basis)+'</p>'+
      (shared>1?'<p class="collection-note">The collection gives this source title to '+shared+' different artworks. No separate title is known for this one, so none is invented; the credited artist distinguishes it.</p>':'')+
      (f.creatorAssetTitle?'<p class="collection-note">Creator’s project: '+e(f.creatorTitle)+'</p>':'')+
      (f.creatorScene?'<p class="collection-scene-context">'+e(f.creatorScene)+' <span class="collection-note">Artist’s description; story placement not independently checked.</span></p>':'')+
      (f.collectionSeries?'<p class="collection-note">This names the collection’s series, not necessarily the exact moment or people shown in this frame.</p>':'')+
      '<p class="collection-note">Collection: '+e(f.title)+'</p>'+identicalNotice(f);
  }
  // A different rendering of the same picture. Stated as a fact about the
  // collection, and linked: the source keeps both files, so the site keeps both
  // records, but a visitor should not open the same artwork twice unaware.
  function variantNotice(f){
    var same=window.GZR_SAME_PICTURE&&window.GZR_SAME_PICTURE[f.id];
    if(!same||!same.length)return '';
    var total=same.length+1;
    return '<div class="collection-variants">'+heading('Another file shows this same picture')+
      '<p class="collection-note">The collection keeps '+total+' files of this artwork as different '+
      'encodings or copies. Both are published as separate records, as the source holds them; '+
      'this note only saves you opening them all.</p><div class="collection-variant-links">'+
      same.map(function(id){var other=D.files.find(function(x){return x.id===id;});
        return other?'<a data-view-art="'+e(other.id)+'" href="'+url('gallery-file-'+other.id)+'">'+e(other.title)+'</a>':'';}).join('')+
      '</div></div>';
  }
  // Images this collection holds more than once, from the private duplicate
  // review (pixel comparison of the published files). Stated as a fact about
  // the collection; nothing is merged and no title or attribution changes.
  function identicalNotice(f){
    var same=window.GZR_IDENTICAL&&window.GZR_IDENTICAL[f.id];
    if(!same||!same.length)return '';
    return '<p class="collection-note">The collection holds '+(same.length+1)+
      ' copies of this same image as separate files. They are kept as separate records; '+
      'this note only saves you opening all of them.</p>';
  }
  function artworkSearch(f){return (f.mature?'NSFW mature adult ':'')+f.title+' '+(f.creatorTitle||'')+' '+(f.creatorAssetTitle||'')+' '+(f.creatorScene||'')+' '+(f.collectionSeries||'')+' '+f.subjects.join(' ')+' '+artist(f.artist).name;}
  function image(f,full,style){return '<img src="'+e(full?f.image:f.thumbnail)+'" alt="'+e(full?artworkName(f).name+' — '+f.title:f.title)+'"'+(style?' style="'+style+'"':'')+' loading="lazy" decoding="async">';}
  // NSFW tiles follow the pattern the collection owner asked for: the artwork
  // is in the grid, blurred, and tapping opens it. The blur is a CSS filter on
  // the real thumbnail rather than a cover image, so the tile keeps the
  // artwork's own shape, and the unblurred file is never a separate URL a
  // crawler could index.
  function matureTile(f,revealed){
    return '<span class="collection-blur'+(revealed?' is-revealed':'')+'">'+
      '<img src="'+e(f.thumbnail)+'" alt="" aria-hidden="true" loading="lazy" decoding="async">'+
      '</span>'+
      '<span class="collection-nsfw">NSFW</span>'+
      (revealed?'':'<span class="collection-blur-hint">Tap to view</span>');
  }
  // The collection reuses source titles: "Reverend Insanity artwork 38" names
  // five different pictures, and several artists each number their own files
  // from "Artwork 1". Neither is a real title, so neither is invented here.
  // When a source title is shared, the credited artist is appended, which is a
  // fact from the source folder, and the count is stated rather than hidden.
  var sharedTitles=null;
  function sharedTitleCount(f){
    if(!sharedTitles){
      sharedTitles={};
      D.files.forEach(function(x){sharedTitles[x.title]=(sharedTitles[x.title]||0)+1;});
    }
    return sharedTitles[f.title]||1;
  }
  // How many files are still waiting in the private archive for each artist.
  // Written by the exporter; absent when the queue manifest is not loaded.
  var queueCounts=(window.GZR_PENDING||null);
  function queueNote(artistId){
    var p=queueCounts&&queueCounts[artistId];
    if(!p)return '';
    return 'This collection holds '+p.files+' image '+(p.files===1?'file':'files')+
      ' across '+p.folders+' source '+(p.folders===1?'folder':'folders')+
      ' in the private Drive archive, and none has been published yet. They are queued behind checksum, content and rights review.';
  }
  function cardTitle(f){
    var n=sharedTitleCount(f);
    return n>1?f.title+' — '+artist(f.artist).name:f.title;
  }
  function cards(files){
    return '<div class="collection-grid">'+files.map(function(f){
      var ratio=Math.max(.5,Math.min(2.4,f.dimensions[0]/f.dimensions[1]));
      var held=mature(f),revealed=held&&confirmed[f.id];
      return '<article class="collection-card'+(held?' collection-card-mature':'')+'" style="--art-ratio:'+ratio+'">'+
        '<a class="collection-picture" data-view-art="'+e(f.id)+'"'+(held&&!revealed?' data-mature-tap="'+e(f.id)+'"':'')+' href="'+url('gallery-file-'+f.id)+'">'+
        (held?matureTile(f,revealed):image(f,false))+
        '<div class="collection-caption"><h4>'+e(held?'NSFW':cardTitle(f))+'</h4>'+
        '<p>'+e(f.creatorCredit||artist(f.artist).name)+'</p><small>'+f.dimensions.join(' × ')+'</small>'+
        (f.creatorCredit?'<small>Credit on the artwork</small>':'')+
        (f.method==='collection-labelled AI'?'<small>AI-labelled</small>':'')+
        (held&&revealed?'<small>Shown for this visit</small>':'')+
        (/^gallery-volume-[1-6]$/.test(current)?'<small>'+(f.volume===current.slice(8)?'Volume in collection filename':'Related subject · scene unverified')+'</small>':'')+
        '</div></a></article>';
    }).join('')+'</div>';
  }
  function source(a){var id=a.folderId||a.tierFolderId;return '<a href="https://drive.google.com/drive/folders/'+e(id)+'" target="_blank" rel="noopener">'+(a.folderId?'Open artist source folder':'Find folder in source tier')+' ↗</a>';}
  function volumeFiles(v){return D.files.filter(function(f){return f.volume==='volume-'+v.number || (!f.volume && f.subjects.some(function(subject){return v.subjects.includes(subject);}));});}
  function volumeTitle(v){return 'Volume '+v.number+': '+v.title;}
  var subjectKinds={'Fang Yuan':'characters','Bai Ning Bing':'characters','Bo Qing':'characters','Ren Zu':'characters','Little Hu':'characters','Hei Lou Lan':'characters','Fairy Li Shan':'characters','Fang Zheng':'characters','Gu Yue Yao Le':'characters','Red Lotus':'characters','Xie Han Mo':'characters','Genesis Lotus':'characters','Giant Sun':'characters','Limitless':'characters','Meng Qiu Zhen':'characters','Reckless Savage':'characters','Paradise Earth':'characters','Primordial Origin':'characters','Spectral Soul':'characters','Star Constellation':'characters','Tao Zhu':'characters','Thieving Heaven':'characters','Wu Shuai':'characters','Wu Yong':'characters','Nezha':'characters','Heavenly Origin Great Immortal':'characters','Pale Immortal Maiden':'characters','Ancestor of Insects':'characters','Sangeng Tongzi':'characters','Lord of Black City':'characters','Feng Jiu Ge':'characters','Shang Xin Ci':'characters','Hei Fan':'characters','Feng Tian Yu':'characters','Xia Lin':'characters','Ye Fan':'characters','Chen Yi':'characters','Hope Gu':'gu','Air Bubble Fish Gu':'gu','Heavenly Essence Treasure Lotus':'gu','Blood Skull Gu':'gu','Spring Autumn Cicada':'gu','Attitude Gu':'gu','Star Thought Gu':'gu','Fate Gu':'gu','Fixed Immortal Travel Gu':'gu','Regret Gu':'gu','Footless Bird':'beasts','Divine Bean Palace':'gu-houses','Treasure Yellow Heaven':'locations','Dang Hun Mountain':'locations','Luo Po Valley':'locations','Snowy Mountain Blessed Land':'locations','River of Time':'locations','Reverse Flow River':'locations','Crazed Demon Cave':'locations','Three Kings Inheritance':'locations','Ordinary Abyss':'legends'};
  ['Qin Bai Sheng','Duke Long','Chu Du','Bing Sai Chuan','Feng Jin Huang','Shen Cui','Ge Yao','Purple Mountain','Qiao Si Liu','Liu Shu Xian','Shen Cong Sheng','Tai Bai Yun Sheng','Thunder Ghost True Monarch','Verdant Great Sun','Fairy Zi Wei','Bai Zu','Blazing Heaven Demoness','Dong Fang Chang Fan','Fang Gong','Fang Di Chang','He Chun Qiu','Lady White Rabbit','Li Xiao Bai','Lu Wei Yin','Old Ancestor Xue Hu','Shen Shang','Zhan Bu Du'].forEach(function(n){subjectKinds[n]='characters';});
  ['Mao Li Qiu','Zuo Ye Hui','Di Zang Sheng','Qing Chou'].forEach(function(n){subjectKinds[n]='beasts';});
  subjectKinds['Yi Tian Mountain']='locations';subjectKinds['Eighty-Eight True Yang Building']='gu-houses';
  // Subjects the filename pass identified from collection filenames and the
  // story's own naming: variant-human kin (Rockman, Eggman, Mushroomman, …), a
  // handful of named figures, and places. Each is here because a collection
  // names it, not because the name looks like one.
  ['Shadow Sect','Northern Dark Ice Soul','Variant Humans','Rockman','Eggman','Mushroomman',
   'Beastman','Featherman','Merman','Miniman','Hairyman','Snowman','Flesh Whip Immortal',
   'Madara','Gu Yue First Ancestor','Blazing Glory Lightning Brilliance','Li Huowang',
   'Boundless Forest Samsara','Carefree Wisdom Heart','Great Strength True Martial',
   'Jing Lan','Suan Bu Jin','Plump Lady'].forEach(function(n){subjectKinds[n]='characters';});
  ['Heavenly Court','Refinement Path Convention','Northern Plains','Eastern Sea'].forEach(function(n){subjectKinds[n]='locations';});
  // Fallback for the long tail of subjects that only appear on a handful of
  // files. Without a kind, a subject gets no subcategory entry and its page
  // is reachable only by direct link. This resolves only the cases the naming
  // makes unambiguous and returns null for everything else, so a name is
  // never classified on a guess. scripts/verify-art-catalogue.py lists every
  // unresolved name for editorial review.
  function subjectKindOf(name){
    if(Object.prototype.hasOwnProperty.call(subjectKinds,name))return subjectKinds[name];
    // "X Gu" names a Gu worm. The collection already treats creature-like Gu
    // this way (Air Bubble Fish Gu is filed under Gu), so the suffix decides.
    if(/Gu$/.test(name))return 'gu';
    if(/ (Mountain|Valley|River|Cave|Pool|City|Pavilion|Tower|Hall|Palace|Realm|Cemetery|Battlefield|Door|Stage)$/.test(name))return 'locations';
    if(/ (Blessed Land|Sacred Land)$/.test(name))return 'locations';
    // Honorifics are unambiguous for a person in this setting.
    if(/^(Fairy|Lady|Daoist|Old Ancestor|Great Grandmaster) /.test(name))return 'characters';
    if(/ Land Spirit$/.test(name))return 'characters';
    return null;
  }
  window.GZR_SUBJECT_KIND=subjectKindOf;
  function heading(title,extra,kind){return '<div class="collection-heading'+(kind?' '+e(kind):'')+'"><h3>'+e(title)+'</h3>'+(extra||'')+'</div>';}
  function subjects(files){return Array.from(new Set(files.flatMap(function(f){return f.subjects;}))).sort(function(a,b){return a.localeCompare(b);});}
  function subjectIndex(files,kind){
    var names=subjects(files).filter(function(n){return !kind||subjectKindOf(n)===kind;});
    if(!names.length)return '';
    var groups={};names.forEach(function(n){var key=n[0].toUpperCase();(groups[key]=groups[key]||[]).push(n);});
    return '<section class="collection-subcategories"><h3>Subcategories</h3><p>This collection has '+names.length+' subject subcategories. Counts refer to available image files.</p><div class="collection-subcategory-columns">'+Object.keys(groups).sort().map(function(g){return '<section><h4>'+e(g)+'</h4><ul>'+groups[g].map(function(n){return '<li>'+link('gallery-subject-'+slug(n),'Images of '+n)+' <small>('+files.filter(function(f){return f.subjects.includes(n);}).length+' F)</small></li>';}).join('')+'</ul></section>';}).join('')+'</div></section>';
  }
  function artistCategories(files){
    return D.categories.map(function(c){return {id:c.id,title:c.title,count:files.filter(function(f){return f.categories.includes(c.id);}).length};}).filter(function(c){return c.count>0;});
  }
  function artistCategoryFilters(files){
    var cats=artistCategories(files);if(!cats.length)return '';
    return '<section class="collection-artist-categories"><h3>Categories in this collection</h3><p class="collection-note">Filter this artist’s imported artwork by category. An image may appear in more than one category; labels are provisional.</p><div class="collection-category-filters" aria-label="Filter artwork by category"><button type="button" data-artist-category="" aria-pressed="true">All <small>'+files.length+'</small></button>'+cats.map(function(c){return '<button type="button" data-artist-category="'+e(c.id)+'" aria-pressed="false">'+e(c.title)+' <small>'+c.count+'</small></button>';}).join('')+'</div></section>';
  }
  function artistNavigation(files){
    var cats=artistCategories(files);
    return '<nav class="collection-artist-nav" aria-label="Gallery navigation"><strong>Explore the gallery</strong><p>Browse other artists or explore the full categories represented here.</p><div>'+link('gallery','Gallery home')+link('gallery-artists','All artists')+cats.map(function(c){return link('gallery-'+c.id,c.title);}).join('')+'</div></nav>';
  }
  function artistDirectory(){
    return heading('Artists — alphabetical directory','<span>'+D.artists.length+' inventoried folders</span>')+'<p class="collection-note">Names follow the supplied collection inventory. Counts are imported image files—not total works in Drive. An unimported collection is not an empty source folder.</p><label class="collection-search">Find an artist<input id="collection-artist-search" type="search" placeholder="Name or original folder label…"></label><div id="collection-directory"></div>';
  }
  function fillDirectory(q){
    var el=mountedDirectory&&mountedDirectory.isConnected?mountedDirectory:(mountedBody||document).querySelector('#collection-directory');if(!el)return;
    var rows=D.artists.filter(function(a){return (a.name+' '+a.folderName).toLowerCase().includes((q||'').toLowerCase());}).sort(function(a,b){return a.name.localeCompare(b.name,undefined,{numeric:true});});
    var groups={};rows.forEach(function(a){var letter=/^[a-z]/i.test(a.name)?a.name[0].toUpperCase():/^\d/.test(a.name)?'0–9':'Other scripts';(groups[letter]=groups[letter]||[]).push(a);});
    var nsfwCount=D.files.filter(mature).length;
    var nsfwHint=(q&&/^(nsfw|mature|adult)$/i.test(q.trim())&&nsfwCount)?'<p class="collection-note">No artist is named that. '+link('gallery-mature','NSFW artwork')+' is a tier, not an artist: '+nsfwCount+' '+(nsfwCount===1?'file is':'files are')+' blurred behind it.</p>':'';
    el.innerHTML='<p role="status">'+rows.length+' matching artist folders</p>'+nsfwHint+'<nav class="collection-az" aria-label="Artist letters">'+Object.keys(groups).map(function(g){return '<a href="#artists-'+e(g.replace(/\W/g,''))+'">'+e(g)+'</a>';}).join('')+'</nav>'+Object.keys(groups).map(function(g){return '<section class="collection-letter" id="artists-'+e(g.replace(/\W/g,''))+'"><h4>'+e(g)+'</h4><ul>'+groups[g].map(function(a){return '<li>'+link('gallery-'+a.id,a.name)+'<small>'+ (count(a.id)?count(a.id)+' imported':'Not yet imported')+'</small></li>';}).join('')+'</ul></section>';}).join('')+(rows.length?'':'<p>No artist matches that search.</p>');
  }
  function home(){
    var featuredOrder=['轮回画室丶不修','OSOT','TOUZI','Ullasseu','diouer','瑞光Pro','pakawad','春天'];
    var covers={'轮回画室丶不修':'limitless','OSOT':'footless-bird','TOUZI':'volume-one-duel','Ullasseu':'ordinary-abyss','diouer':'bai-ning-bing-study','瑞光Pro':'art-119682e8c6894298','pakawad':'pakawad-limitless','春天':'chuntian-bai-ning-bing'};
    var featured=featuredOrder.map(function(n){var a=D.artists.find(function(a){return a.name===n&&!a.ai;});var f=D.files.find(function(x){return a&&x.id===covers[n]&&x.artist===a.id&&!mature(x);});if(!a||!f)return '';return '<a href="'+url('gallery-'+a.id)+'" class="collection-feature">'+image(f,false)+'<strong>Images by '+e(a.name)+'</strong></a>';}).join('');
    var catN=function(id){return D.files.filter(function(f){return f.categories.includes(id);}).length;};
    var item=function(it){return '<li>'+link(it.id,it.title)+'<small>'+it.n+'</small></li>';};
    var groups=[
      {title:'Browse by volume',id:'gallery-volumes',children:[]},
      {title:'Characters',id:'gallery-characters',children:[]},
      {title:'Gu & cultivation',children:[
        {id:'gallery-gu',title:'Gu Worms',n:catN('gu')},
        {id:'gallery-gu-houses',title:'Gu Houses & constructs',n:catN('gu-houses')},
        {id:'gallery-ranks',title:'Gu Masters & ranks',n:catN('ranks')},
        {id:'gallery-cultivation',title:'Cultivation & apertures',n:catN('cultivation')},
        {id:'gallery-objects',title:'Objects & treasures',n:catN('objects')}
      ]},
      {title:'World & places',children:[
        {id:'gallery-locations',title:'Locations & world',n:catN('locations')},
        {id:'gallery-factions',title:'Factions & clans',n:catN('factions')},
        {id:'gallery-maps',title:'Maps & diagrams',n:catN('maps')},
        {id:'gallery-legends',title:'The Legends of Ren Zu',n:catN('legends')}
      ]},
      {title:'Events & scenes',children:[{id:'gallery-scenes',title:'All scenes',n:catN('scenes')}].concat(D.eventCollections.map(function(c){return {id:'gallery-'+c.id,title:c.title,n:c.files.length};}))},
      {title:'Creatures & beasts',id:'gallery-beasts',children:[{id:'gallery-beasts',title:'Creatures & beasts',n:catN('beasts')}]},
      {title:'Adaptations & fan takes',id:'gallery-fan-takes',children:[{id:'gallery-fan-takes',title:'Fan reinterpretations',n:catN('fan-takes')}]},
      {title:'Other collections',children:[
        {id:'gallery-others',title:'Others',n:catN('others')},
        {id:'gallery-ai',title:'AI-labelled artwork',n:catN('ai')},
        {id:'gallery-recent',title:'All imported artwork',n:visible(D.files).length},
        {id:'gallery-mature',title:'NSFW artwork (blurred)',n:D.files.filter(mature).length}
      ]}
    ];
    var tree='<div class="collection-tree-columns">'+groups.map(function(g){var head=g.id?link(g.id,g.title):e(g.title);return '<section class="collection-tree-group"><h4>'+head+'</h4>'+(g.children.length?'<ul>'+g.children.map(item).join('')+'</ul>':'')+'</section>';}).join('')+'</div>';
    return heading('Featured artists',link('gallery-artists','All artists →'))+'<div class="collection-featured">'+featured+'</div>'+heading('Categories','','collection-categories-heading')+tree+heading('Recent uploads',link('gallery-recent','All uploads →'))+cards(visible(D.files).slice(-6))+matureNotice(D.files.filter(mature).length);
  }
  // A mature file is never rendered until this browser has both opened the
  // gate page and pressed through a confirmation on this specific artwork.
  function matureInterstitial(f){
    var a=artist(f.artist);
    return '<div class="collection-mature-gate"><p class="collection-overline">NSFW</p><h3>Adult artwork</h3>'+
      '<p>This file is adult material. It is blurred in the gallery until it is opened.</p>'+
      '<dl><dt>Collection</dt><dd>'+e(f.title)+'</dd><dt>Credited collection</dt><dd>'+e(a?a.name:'Unresolved')+'</dd><dt>Original dimensions</dt><dd>'+f.dimensions.join(' × ')+'</dd></dl>'+
      '<p><button type="button" class="collection-mature-open" data-mature="confirm" data-file="'+e(f.id)+'">Show the artwork</button> '+
      '<button type="button" class="collection-mature-open" data-mature="close">Keep this tier blurred</button></p>'+
      '<p class="collection-note">Opening it lasts for this visit only; the blur comes back next time. '+link('gallery-mature','About the NSFW tier')+' · '+link('gallery','Back to the gallery')+'</p></div>';
  }
  // The gate room: the only place mature files are listed, and even here the
  // tiles stay inert until the browser has opted in.
  function matureRoom(){
    var held=D.files.filter(mature),a;
    var head='<section class="collection-mature-gate"><p class="collection-overline">NSFW</p><h3>Mature artwork</h3>'+
      '<p>'+held.length+' imported '+(held.length===1?'file':'files')+' '+(held.length===1?'is':'are')+' adult material. They are blurred in every grid and open when you tap them; the tile then stays revealed for this visit only.</p>'+
      '<p>Tap open is deliberately not a cookie. Nothing is remembered about which files you have opened, and the blur returns on your next visit unless you keep the tier switched on below.</p>'+
      '<p class="collection-mature-state" role="status">'+(gateOpen()?'This browser keeps the NSFW tier switched on.':'This browser blurs the NSFW tier and opens one file at a time.')+'</p>'+
      '<p>'+(gateOpen()?'<button type="button" class="collection-mature-open" data-mature="close">Blur the NSFW tier again in this browser</button>':'<button type="button" class="collection-mature-open" data-mature="open">Keep the NSFW tier switched on in this browser</button>')+'</p>'+
      '<p class="collection-note">This tier covers adult material only. Artwork depicting sexualised minors is excluded from publication outright: it is not in this tier, it is not blurrable, and it is not reachable from this page or any other.</p></section>';
    if(!held.length)return head+'<p>No mature artwork has been imported yet. Source folders are still being reviewed.</p>';
    return head+heading('Adult artwork in this collection','<span>'+held.length+' '+(held.length===1?'file':'files')+'</span>')+cards(held)+
      '<p class="collection-note">Counts elsewhere on the site leave this tier out. To see these files in ordinary browsing, switch the tier on above.</p>';
  }
  function detail(f){
    var a=artist(f.artist);
    return '<div class="collection-detail">'+('<a class="collection-original" data-view-art="'+e(f.id)+'" href="'+e(f.image)+'" target="_blank" rel="noopener">'+image(f,true)+'</a>')+'<aside><p class="collection-overline">REVEREND INSANITY · '+e(f.format)+'</p>'+artworkNaming(f)+'<p>Art: '+link('gallery-'+a.id,a.name)+'</p>'+(f.creatorCredit?'<p><strong>Artist credit on the artwork: '+e(f.creatorCredit)+'</strong></p><p class="collection-note">The source folder files this under '+e(a.name)+', but the artwork itself is signed or watermarked to '+e(f.creatorCredit)+' as a private commission. The signature is used here; the folder credit is not treated as attribution.</p>':'')+'<dl><dt>Collection</dt><dd>Kolev/KolevXD</dd><dt>Volume</dt><dd>'+(f.volume?link('gallery-'+f.volume,'Volume '+f.volume.slice(7))+' · source filename; not text-verified':'Not yet assigned')+'</dd><dt>Creation method</dt><dd>'+e(f.method)+'</dd><dt>Source tier</dt><dd>'+e(a.tier)+' · collection label, not a quality rating</dd><dt>Original dimensions</dt><dd>'+f.dimensions.join(' × ')+'</dd><dt>Content notes</dt><dd>'+e(f.contentWarnings.join(', ')||'No warning recorded; review is not a safety guarantee')+'</dd></dl>'+(f.chapterLabel?'<p class="collection-note">Source filename references Chapter '+f.chapterLabel+'. Not text-verified; no chapter gallery is created.</p>':'')+'<p><a href="https://drive.google.com/file/d/'+e(f.sourceId)+'/view" target="_blank" rel="noopener">View original Drive file ↗</a></p><p>'+source(a)+'</p>'+(f.creatorSource && /^https:\/\//.test(f.creatorSource)?'<p><a class="collection-creator-source" href="'+e(f.creatorSource)+'" target="_blank" rel="noopener noreferrer">View matched creator post ↗</a></p><p class="collection-note">The image has been visually matched to this creator post; other details may remain provisional.</p>':'')+'<p class="collection-note">Credit follows the source folder. Artwork rights remain with their respective holders; no new licence is asserted.</p>'+(f.originalFilename?'<p class="collection-note">Original filename: '+e(f.originalFilename)+'</p>':'<p class="collection-note">The original filename is kept in the private catalogue and is not published here.</p>')+'</aside></div>'+variantNotice(f)+heading('Related subjects')+(f.classificationEvidence?(f.creatorSource?'<p class="collection-note">Some subject and category labels may still be provisional, even where a creator post is matched.</p>':'<p class="collection-note">Subject and category labels are based on collection filenames or folder labels and image review; they are not independently verified against the artist’s original posts.</p>'):'')+subjectIndex([f])+(f.related.length?heading('Related versions & works')+cards(D.files.filter(function(x){return f.related.includes(x.id);})):'');
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
    if(sl==='gallery')return home();
    if(sl==='gallery-artists')return artistDirectory();
    if(sl==='gallery-mature')return matureRoom();
    if(sl.startsWith('gallery-file-')){var f=D.files.find(function(x){return 'gallery-file-'+x.id===sl;});return f?(mature(f)&&!confirmed[f.id]?matureInterstitial(f):detail(f)):'<p>Artwork not found.</p>';}
    // While the tier is shut, mature files are still listed where they live so
    // the folder has a visible home, and they render blurred.
    var files=D.files.slice(),intro='',a;
    if(sl.startsWith('gallery-artist-')){
      a=artist(sl.slice(8));files=files.filter(function(f){return f.artist===a.id;});
      var cover=files[0], portrait=a.profileImage|| (cover&&cover.thumbnail), socials=(a.socials||[]).filter(function(s){return /^https:\/\//.test(s.url);}).map(socialLink).join('');
      // Profile images are local reviewed assets. Fallback artwork is labelled, never represented as a portrait.
      var visual=portrait?'<figure class="collection-artist-visual"><img src="'+e(portrait)+'" alt="'+e(a.profileImage?'Profile image for '+a.name:'Artwork from '+a.name+' collection')+'"><figcaption>'+ (a.profileImage?'Artist profile image':'Collection artwork · profile image unverified')+'</figcaption></figure>':'';
      intro='<section class="collection-artist-head"'+(portrait?' style="--artist-cover:url(&quot;'+e(portrait)+'&quot;)"':'')+'><div class="collection-artist-inner"><div class="collection-artist-copy"><p class="collection-overline">ARTIST COLLECTION</p><h3>'+e(a.name)+'</h3><p>'+e(a.bio||a.name+' is credited in KolevXD’s Art Collection.')+' '+(files.length?'Explore '+files.length+' imported '+(files.length===1?'image':'images')+' below.':''+(queueNote(a.id)||'Images from this collection have not been imported yet.')+'')+'</p><div class="collection-artist-links">'+socials+source(a)+'</div><p class="collection-note">'+(socials?'Social links are based on available public sources. ':'Social profiles have not yet been verified. ')+(a.folderId?'Credit follows the source folder.':'The exact source folder has not yet been reconciled.')+'</p></div>'+visual+'</div></section>';
    }else if(/^gallery-volume-[1-6]$/.test(sl)){
      var vol=D.volumes.find(function(v){return sl==='gallery-volume-'+v.number;});
      files=volumeFiles(vol);
      intro='<p><b>'+e(volumeTitle(vol))+'</b> — Chapters '+e(vol.chapters)+'.</p>'+
        '<p>Gallery coverage includes the whole novel, independently of translation progress.</p>'+
        '<p class="collection-note">This gallery includes source-labelled works and art of related subjects: '+e(vol.subjects.join(', '))+'. Subject connections are not verified scene or chapter placements; portraits may depict another point in the story. Subject labels are provisional, based on collection filenames, folders and image review, not necessarily artist-confirmed. A work can appear in more than one gallery.</p>';
    }else if(sl==='gallery-volume-unassigned'){files=files.filter(function(f){return !f.volume;});intro='<p>These works have no explicit volume placement. Some also appear in volume galleries because of their related subjects; that does not assign them to a specific scene or chapter.</p>';
    }else if(sl==='gallery-volumes'){
      var panels=D.volumes.map(function(v){var matches=volumeFiles(v),cover=D.files.find(function(f){return f.id===v.coverId;});
        return '<section class="collection-panel"><h4>'+link('gallery-volume-'+v.number,volumeTitle(v))+'</h4>'+(cover?'<a class="volume-cover" href="'+url('gallery-volume-'+v.number)+'">'+image(cover,false,'width:100%;height:180px;object-fit:cover;display:block')+'</a>':'')+'<p>Chapters '+e(v.chapters)+' · '+matches.length+' related images'+(cover?'<br>Cover art: '+link('gallery-file-'+cover.id,artist(cover.artist).name):'')+'</p></section>';
      }).join('');
      panels+='<section class="collection-panel"><h4>'+link('gallery-volume-unassigned','Without an explicit volume assignment')+'</h4><p>'+D.files.filter(function(f){return !f.volume;}).length+' imported files have no explicit placement; some appear above as related-subject artwork.</p></section>';
      return heading('Browse by volume')+'<p>Explore all six volumes. Images include labelled artwork and related subjects, not necessarily scenes from that volume.</p><div class="collection-panels">'+panels+'</div>';
    }else if(D.eventCollections.some(function(c){return 'gallery-'+c.id===sl;})){
      var event=D.eventCollections.find(function(c){return 'gallery-'+c.id===sl;});files=files.filter(function(f){return event.files.includes(f.id);});intro='<p>'+e(event.description)+'</p>';
    }else if(sl.startsWith('gallery-subject-')){files=files.filter(function(f){return f.subjects.some(function(s){return 'gallery-subject-'+slug(s)===sl;});});
    }else if(sl==='gallery-recent'){files=D.files.slice();}else{var cat=D.categories.find(function(c){return 'gallery-'+c.id===sl;});if(cat){files=files.filter(function(f){return f.categories.includes(cat.id);});intro='<p>'+e(cat.description)+'.</p>'+(cat.id==='ai'?'<p class="collection-note">“AI” is a label supplied by the collection folder, not an independent judgement of the image. These files also appear under their depicted subjects.</p>':'')+(files.length===0?emptyBackground(cat.id):'');}}
    var isArtist=sl.startsWith('gallery-artist-');
    return intro+(isArtist?artistCategoryFilters(files):sl.startsWith('gallery-subject-')?'':subjectIndex(files,cat?cat.id:null))+heading(/^gallery-volume-[1-6]$/.test(sl)?'Related artwork':'Media in this collection')+'<label class="collection-search">Search this collection<input id="collection-file-search" type="search" placeholder="Title, subject or artist…"></label><p id="collection-result-count" role="status"></p><div id="collection-results" data-files="'+e(files.map(function(f){return f.id;}).join(','))+'"></div>'+(isArtist?artistNavigation(files):'');
  }
  window.renderImagesGallery=function(sl){current=sl||'gallery';return '<section class="collection-library"><div class="collection-warning"><span>Art includes later-story scenes and fan interpretations.</span></div><div id="collection-body">'+page(current)+'</div><p class="collection-footer">KolevXD’s Art Collection · '+D.artists.length+' artist folders indexed · '+visible(D.files).length+' images available.'+(D.files.length-visible(D.files).length?' ('+(D.files.length-visible(D.files).length)+' more behind the '+link('gallery-mature','mature gate')+')':'')+' Importing is ongoing. '+ '<a href="https://drive.google.com/drive/folders/'+D.rootId+'" target="_blank" rel="noopener">Browse source collection ↗</a></p></section>';};
  function fillFiles(q){var el=mountedResults&&mountedResults.isConnected?mountedResults:(mountedBody||document).querySelector('#collection-results');if(!el)return;var ids=el.dataset.files.split(',');var files=D.files.filter(function(f){return ids.includes(f.id)&&(!el.dataset.category||f.categories.includes(el.dataset.category))&&artworkSearch(f).toLowerCase().includes((q||'').toLowerCase());});var counter=mountedCount&&mountedCount.isConnected?mountedCount:(mountedBody||document).querySelector('#collection-result-count');if(counter)counter.textContent=files.length+' imported image files';el.innerHTML=files.length?cards(files):(q||el.dataset.category?'<div class="collection-empty"><h4>No artwork matches these filters</h4><p>Try another category or search term.</p></div>':'<div class="collection-empty"><h4>No imported artwork here yet</h4><p>The category is part of the agreed structure. Source review and importing are still in progress; this does not mean the source folder has no artwork.</p>'+link('gallery','Back to Gallery')+'</div>');}
  window.renderArticleArtLinks=function(article){
    var files=visible(D.files).filter(function(f){return f.subjects.some(function(s){return s.toLowerCase()===article.t.toLowerCase();});});
    if(!files.length)return '';
    return '<section class="collection-article-link"><h3>Images</h3><p>'+link('gallery-subject-'+slug(article.t),'Browse '+files.length+' imported image files of '+article.t)+' <small>Artwork may reveal later-story events. Gallery coverage is separate from translation progress.</small></p></section>';
  };
  // Record the mounted surfaces once. A document can hold more than one
  // gallery shell; filling results by document-wide id would write into
  // whichever shell happens to come first.
  var mountedResults=null, mountedDirectory=null, mountedCount=null;
  window.mountImagesGallery=function(){
    // Follow the most recently rendered library. In the site there is exactly
    // one; a document that holds more than one (the routed article plus a
    // harness, or two shells mid-transition) must not bind the wrong one.
    var libs=document.querySelectorAll('.collection-library');
    var root=libs.length?libs[libs.length-1]:document;
    mountedBody=root.querySelector('#collection-body')||document.getElementById('collection-body');
    mountedResults=mountedBody?mountedBody.querySelector('#collection-results'):null;
    mountedCount=mountedBody?mountedBody.querySelector('#collection-result-count'):null;
    mountedDirectory=mountedBody?mountedBody.querySelector('#collection-directory'):null;
    fillDirectory('');fillFiles('');bindMatureControls();
  };
  document.addEventListener('input',function(ev){if(ev.target.id==='collection-artist-search')fillDirectory(ev.target.value);if(ev.target.id==='collection-file-search')fillFiles(ev.target.value);});
  document.addEventListener('click',function(ev){var button=ev.target.closest('[data-artist-category]');if(!button)return;var results=document.getElementById('collection-results');if(!results)return;results.dataset.category=button.dataset.artistCategory;document.querySelectorAll('[data-artist-category]').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});fillFiles((document.getElementById('collection-file-search')||{}).value||'');});

  var viewer=null, sequence=[], position=0, returnFocus=null;
  function closeViewer(){if(!viewer)return;if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(function(){});viewer.close();viewer.remove();viewer=null;if(returnFocus&&returnFocus.isConnected)returnFocus.focus();}
  function showArtwork(){
    var f=D.files.find(function(f){return f.id===sequence[position];});if(!f)return;
    if(mature(f)&&!confirmed[f.id]){viewer.querySelector('.art-viewer-stage').innerHTML='<div class="collection-mature-tile"><span>Mature</span><small>Open this file from its detail page to see the warning</small></div>';viewer.querySelector('.art-viewer-info').innerHTML='<h3>Mature artwork held</h3><p>'+link('gallery-mature','Open the mature gate settings')+'</p>';return;}
    viewer.querySelector('.art-viewer-stage').innerHTML='<img src="'+e(f.image)+'" alt="'+e(artworkName(f).name+' — '+f.title)+'">';
    viewer.querySelector('.art-viewer-info').innerHTML=artworkNaming(f)+'<p>Art: '+link('gallery-'+f.artist,artist(f.artist).name)+'</p><p>'+f.dimensions.join(' × ')+' · '+(position+1)+' / '+sequence.length+'</p><p>'+link('gallery-file-'+f.id,'Artwork details & source')+' · <a href="'+e(f.image)+'" target="_blank" rel="noopener">Open image</a>'+(f.creatorSource && /^https:\/\//.test(f.creatorSource)?' · <a href="'+e(f.creatorSource)+'" target="_blank" rel="noopener noreferrer">Creator post ↗</a>':'')+'</p><p class="collection-note">Rights remain with their respective holders. No licence or permission is inferred.</p>';
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
  // Mature gate controls. Re-rendering the current route keeps every other
  // surface consistent instead of patching tiles one at a time.
  // The mounted view is recorded at mount time. A page can legitimately hold
  // more than one gallery shell (the routed article and a test harness both
  // can), and re-rendering must hit the one the visitor is looking at.
  var mountedBody=null;
  function rerender(){
    if(!window.renderImagesGallery)return;
    var body=mountedBody&&mountedBody.isConnected?mountedBody:document.getElementById('collection-body');
    if(body)body.innerHTML=page(current);
    if(window.mountImagesGallery)window.mountImagesGallery();
  }
  function gateControl(ev){
    var gate=ev.currentTarget;
    ev.preventDefault();
    var action=gate.getAttribute('data-mature');
    if(action==='open'){setGate(true);rerender();return;}
    // Turning the tier off means blurred again, immediately: the reveals held
    // for this page load go with it.
    if(action==='close'){setGate(false);confirmed={};rerender();return;}
    if(action==='room'){if(window.go)window.go('gallery-mature');else location.href=url('gallery-mature');return;}
    if(action==='confirm'){
      var target=D.files.find(function(f){return f.id===gate.getAttribute('data-file');});
      if(!target)return;
      confirmed[target.id]=true;
      rerender();
    }
  }
  // Bind the gate controls to the nodes that actually exist after a render.
  // Doing it here keeps the controls working whatever routed the page, instead
  // of depending on one delegated listener catching the event.
  function bindMatureControls(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-mature]'),function(el){
      if(el._matureBound)return;
      el._matureBound=true;
      el.addEventListener('click',gateControl);
    });
  }
  // A tap on a blurred tile reveals it in place. It does not navigate, and it
  // records nothing beyond this page load.
  document.addEventListener('click',function(ev){
    var tap=ev.target.closest('[data-mature-tap]');if(!tap)return;
    ev.preventDefault();ev.stopPropagation();
    var id=tap.getAttribute('data-mature-tap');
    confirmed[id]=true;
    rerender();
  },true);
  document.addEventListener('click',function(ev){var a=ev.target.closest('[data-view-art]');if(a&&!ev.ctrlKey&&!ev.metaKey&&!ev.shiftKey&&!ev.altKey&&ev.button===0){ev.preventDefault();openViewer(a.dataset.viewArt,a);}});
  window.addEventListener('popstate',closeViewer);
  window.GZR_MEDIA_SEARCH=function(q){var query=(q||'').toLowerCase();return D.files.filter(function(f){return artworkSearch(f).toLowerCase().includes(query);}).map(function(f){return {slug:'gallery-file-'+f.id,title:f.title,image:f.thumbnail,mature:!!f.mature,kind:(f.mature?'NSFW artwork · ':'Artwork · ')+artist(f.artist).name};});};
})();
