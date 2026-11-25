/* Fan animation & community video carousel for the homepage, plus the full
 * pool behind "See all videos" (rendered as its own page, /wiki/videos/).
 *
 * This file is a plain data file, not hand-styled markup: js/app.js reads
 * window.OMNIARCH_DONGHUA and renders the carousel (and the videos page)
 * from it. It starts as a hand-curated seed (source:"curated") and is
 * designed to be overwritten by .github/workflows/update-donghua.yml once a
 * YOUTUBE_API_KEY repo secret exists, at which point `source` becomes
 * "youtube-api" and `updatedAt` reflects the real refresh time. That workflow
 * already runs daily, comfortably inside the 3-5 day refresh window the pool
 * needs; if it ever has no key, fails, or the API quota is hit, it leaves
 * this file untouched rather than breaking the carousel, so the site always
 * has something real to show.
 *
 * featured: the single highlighted episode — always the latest upload from
 * the curated fan-donghua playlist linked below (verified against the
 * playlist directly; the workflow keeps this true automatically once live).
 *
 * videos: a small, rotating "passing by" selection for the homepage strip —
 * a mix of The Omniarch's own channel picks ("own") and independently found
 * community videos about Gu Zhen Ren / Reverend Insanity ("community").
 * It is intentionally short and curated, not exhaustive.
 *
 * trending: the full community pool behind "See all videos" (js/app.js's
 * renderDonghuaVideosPortal, at /wiki/videos/) — 50+ independently found
 * videos about Gu Zhen Ren / Reverend Insanity: fan donghua/AI animation,
 * AMVs and edits, chapter recaps and "explained" breakdowns, audiobooks,
 * reactions, memes and analysis. Most community videos live here rather than
 * crowding the homepage strip; the videos page shows this entire pool.
 *
 * Every entry carries a `creator` (the channel/person who made that
 * specific video) credited in the UI next to its title. That is separate
 * from site-wide attribution: the lore, translation notes and wiki
 * write-ups that this whole site is built from are The Omniarch's own
 * worldbuilding reference work, credited once in the carousel copy below
 * rather than repeated on every video card. Inclusion of a video here is
 * not an endorsement or a claim of affiliation unless stated. Views were
 * recorded at curation time and age as the pool refreshes.
 */
window.OMNIARCH_DONGHUA = {
  "updatedAt": "2026-11-16T00:00:00Z",
  "source": "curated",
  "featured": {
    "id": "laGz47uazB4",
    "title": "Fan-made donghua, episode 29: A Demon Walks in the Light",
    "channel": "纵横AIGC · subtitles by The Omniarch",
    "creator": "纵横AIGC (original animation) · The Omniarch (EN/AR subtitles)",
    "creatorUrl": "https://www.youtube.com/@Oudenarch",
    "url": "https://www.youtube.com/watch?v=laGz47uazB4",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLMSNfaCG3cUk",
    "thumbnail": "https://i.ytimg.com/vi/laGz47uazB4/maxresdefault.jpg"
  },
  "videos": [
    {"id":"e8SkqCzoqDs","title":"Fan-made donghua, episode 5: Twenty-Seven Steps, Heaven's Decree","channel":"纵横AIGC · subtitles by The Omniarch","creator":"纵横AIGC · subtitles by The Omniarch","creatorUrl":"https://www.youtube.com/@Oudenarch","url":"https://www.youtube.com/watch?v=e8SkqCzoqDs","thumbnail":"https://i.ytimg.com/vi/e8SkqCzoqDs/maxresdefault.jpg","kind":"own"},
    {"id":"awdRGKpqOCM","title":"Fang Yuan's Quotes — 2hr compilation, ambient sound","channel":"The Omniarch","creator":"The Omniarch","creatorUrl":"https://www.youtube.com/@Oudenarch","url":"https://www.youtube.com/watch?v=awdRGKpqOCM","thumbnail":"https://i.ytimg.com/vi/awdRGKpqOCM/maxresdefault.jpg","kind":"own"},
    {"id":"r-CDGJ__JFY","title":"Fang Yuan Quotes — 2hr compilation, no background music (raw)","channel":"The Omniarch","creator":"The Omniarch","creatorUrl":"https://www.youtube.com/@Oudenarch","url":"https://www.youtube.com/watch?v=r-CDGJ__JFY","thumbnail":"https://i.ytimg.com/vi/r-CDGJ__JFY/hqdefault.jpg","kind":"own"},
    {"id":"-bjwbmwmXCY","title":"Gu Zhen Ren’s Genius: The Metaphysics of the Gu World","channel":"The Omniarch","creator":"The Omniarch","creatorUrl":"https://www.youtube.com/@Oudenarch","url":"https://www.youtube.com/watch?v=-bjwbmwmXCY","thumbnail":"https://i.ytimg.com/vi/-bjwbmwmXCY/maxresdefault.jpg","kind":"own"},
    {"id":"5eWCGeQzbZ4","title":"'Gu Yue Fang Yuan' — song by a Brazilian RI fan","channel":"The Omniarch","creator":"The Omniarch","creatorUrl":"https://www.youtube.com/@Oudenarch","url":"https://www.youtube.com/watch?v=5eWCGeQzbZ4","thumbnail":"https://i.ytimg.com/vi/5eWCGeQzbZ4/hqdefault.jpg","kind":"own"},
    {"id":"KiTMqhpp8rs","title":"Reverend Insanity, Chapter 1 — anime-style adaptation","channel":"Reverend Insanity (fan channel)","creator":"Reverend Insanity (fan channel)","creatorUrl":"https://www.youtube.com/@reverendinsanity-anime","url":"https://www.youtube.com/watch?v=KiTMqhpp8rs","thumbnail":"https://i.ytimg.com/vi/KiTMqhpp8rs/maxresdefault.jpg","kind":"community"},
    {"id":"J_LFtREMZdM","title":"The Story of Fang Yuan — a view of what his first life could have been","channel":"cornwilae","creator":"cornwilae","creatorUrl":"https://www.youtube.com/@Historian_Cults","url":"https://www.youtube.com/watch?v=J_LFtREMZdM","thumbnail":"https://i.ytimg.com/vi/J_LFtREMZdM/maxresdefault.jpg","kind":"community"},
    {"id":"6-hqIh56MNM","title":"Venerables of the Gu World","channel":"jiral","creator":"jiral","creatorUrl":"https://www.youtube.com/@sshhh8773","url":"https://www.youtube.com/watch?v=6-hqIh56MNM","thumbnail":"https://i.ytimg.com/vi/6-hqIh56MNM/maxresdefault.jpg","kind":"community"}
  ],
  "trending": [
    {"id":"I_yTrsPG4fE","title":"Heavens Worst Nightmare - Fang Yuan","channel":"Kaizen天帝","creator":"Kaizen天帝","creatorUrl":"https://www.youtube.com/@Ka1zen_Ae","url":"https://www.youtube.com/watch?v=I_yTrsPG4fE","thumbnail":"https://i.ytimg.com/vi/I_yTrsPG4fE/hqdefault.jpg","kind":"community","views":1059140},
    {"id":"KejJ4yjkUoE","title":"Reverend Insanity Volume 1 FULLY Explained","channel":"Mr.Mysteries","creator":"Mr.Mysteries","creatorUrl":"https://www.youtube.com/@Mr.Mysteriess","url":"https://www.youtube.com/watch?v=KejJ4yjkUoE","thumbnail":"https://i.ytimg.com/vi/KejJ4yjkUoE/hqdefault.jpg","kind":"community","views":194028},
    {"id":"zmGQlxVb90o","title":"Fang Yuan Vs Klein Moretti | Reverend Insanity Vs Lord Of The Mysteries","channel":"SaberX","creator":"SaberX","creatorUrl":"https://www.youtube.com/@SaberXena","url":"https://www.youtube.com/watch?v=zmGQlxVb90o","thumbnail":"https://i.ytimg.com/vi/zmGQlxVb90o/hqdefault.jpg","kind":"community","views":184000},
    {"id":"lJiINdGDYio","title":"P E A K ! ! ! REVEREND INSANITY.","channel":"Blue D Mood","creator":"Blue D Mood · animation by fangyuanglazer69 · edit by cornwilae","creatorUrl":"https://www.youtube.com/@BlueDMood","url":"https://www.youtube.com/watch?v=lJiINdGDYio","thumbnail":"https://i.ytimg.com/vi/lJiINdGDYio/hqdefault.jpg","kind":"community","views":135962},
    {"id":"Zw4ODLmARWg","title":"This Ruthless MC Turns Hidden Gu Treasures Into Pure Power","channel":"Manhwa Enjoyer","creator":"Manhwa Enjoyer","creatorUrl":"https://www.youtube.com/@Manhwa_Enjoyer666","url":"https://www.youtube.com/watch?v=Zw4ODLmARWg","thumbnail":"https://i.ytimg.com/vi/Zw4ODLmARWg/maxresdefault.jpg","kind":"community","views":151539},
    {"id":"aX1fIM19U9s","title":"Gu Daoist Master FULL Chapter 1-96(END) - Manhwa Recap","channel":"Pikachu Recap","creator":"Pikachu Recap","creatorUrl":"https://www.youtube.com/@recapqin","url":"https://www.youtube.com/watch?v=aX1fIM19U9s","thumbnail":"https://i.ytimg.com/vi/aX1fIM19U9s/maxresdefault.jpg","kind":"community","views":74338},
    {"id":"RTbi7Id6Leo","title":"Reverend Insanity Audiobook Chapters 1-63","channel":"The Crazed Eccentric","creator":"The Crazed Eccentric","creatorUrl":"https://www.youtube.com/@The_Crazed_Eccentric","url":"https://www.youtube.com/watch?v=RTbi7Id6Leo","thumbnail":"https://i.ytimg.com/vi/RTbi7Id6Leo/hqdefault.jpg","kind":"community","views":61886},
    {"id":"SlfQo1FuCKQ","title":"(COMPLETE) Reverend Insanity -FULL Chapter- Manhwa Recap","channel":"Manhwa Mirar","creator":"Manhwa Mirar","creatorUrl":"https://www.youtube.com/@manhwa_mirar","url":"https://www.youtube.com/watch?v=SlfQo1FuCKQ","thumbnail":"https://i.ytimg.com/vi/SlfQo1FuCKQ/maxresdefault.jpg","kind":"community","views":31927},
    {"id":"l1ghTIUiBmw","title":"GU Daoist Master [MMV]","channel":"HONTER ADM","creator":"HONTER ADM","creatorUrl":"https://www.youtube.com/@honteradm","url":"https://www.youtube.com/watch?v=l1ghTIUiBmw","thumbnail":"https://i.ytimg.com/vi/l1ghTIUiBmw/hqdefault.jpg","kind":"community","views":25563},
    {"id":"Byo2dPZDelw","title":"The Golden Age of Humanity | Stories of the Ten Venerables","channel":"Reverend Insanity Audiobook","creator":"Reverend Insanity Audiobook","creatorUrl":"https://www.youtube.com/@ReverendInsanityAudiobook","url":"https://www.youtube.com/watch?v=Byo2dPZDelw","thumbnail":"https://i.ytimg.com/vi/Byo2dPZDelw/hqdefault.jpg","kind":"community","views":22682},
    {"id":"r_HSYDqawoo","title":"Fang Yuan - 2 Phut Hon Funk (MMV)","channel":"Kurorius","creator":"Kurorius","creatorUrl":"https://www.youtube.com/@Kurorius","url":"https://www.youtube.com/watch?v=r_HSYDqawoo","thumbnail":"https://i.ytimg.com/vi/r_HSYDqawoo/hqdefault.jpg","kind":"community","views":10153},
    {"id":"1GBke7tDFcc","title":"Reverend Insanity Audiobook Chapters 1-50","channel":"EtherealArcs","creator":"EtherealArcs","creatorUrl":"https://www.youtube.com/@EtherealArcs","url":"https://www.youtube.com/watch?v=1GBke7tDFcc","thumbnail":"https://i.ytimg.com/vi/1GBke7tDFcc/hqdefault.jpg","kind":"community","views":10106},
    {"id":"1cQzJmWYVCE","title":"蛊真人 & 平凡之路 - 方源的坚持 (Fang Yuan MMV)","channel":"Fang Yuan","creator":"Fang Yuan (channel)","creatorUrl":"https://www.youtube.com/@fangyuan2192","url":"https://www.youtube.com/watch?v=1cQzJmWYVCE","thumbnail":"https://i.ytimg.com/vi/1cQzJmWYVCE/hqdefault.jpg","kind":"community","views":9852},
    {"id":"rAJA59vSBes","title":"Reverend Insanity: The GREATEST Series You’ve Never Heard Of","channel":"Uyak","creator":"Uyak","creatorUrl":"https://www.youtube.com/@UyakNo","url":"https://www.youtube.com/watch?v=rAJA59vSBes","thumbnail":"https://i.ytimg.com/vi/rAJA59vSBes/maxresdefault.jpg","kind":"community","views":9900},
    {"id":"ajlNqqhRZ-w","title":"Reverend Insanity Is Getting Unbanned This Year!!!","channel":"Peak Seeker (Lee-On)","creator":"Peak Seeker (Lee-On)","creatorUrl":"https://www.youtube.com/@peakseekerleeon","url":"https://www.youtube.com/watch?v=ajlNqqhRZ-w","thumbnail":"https://i.ytimg.com/vi/ajlNqqhRZ-w/hqdefault.jpg","kind":"community","views":8661},
    {"id":"DTE9wpSIUMA","title":"Gu Yue Fang Yuan (edit)","channel":"Blue D Mood","creator":"Blue D Mood","creatorUrl":"https://www.youtube.com/@BlueDMood","url":"https://www.youtube.com/watch?v=DTE9wpSIUMA","thumbnail":"https://i.ytimg.com/vi/DTE9wpSIUMA/hqdefault.jpg","kind":"community","views":8012},
    {"id":"4PmadsyACDs","title":"Reverend Insanity Reacts to Fang Yuan (All 3 Parts)","channel":"VOID SOVEREIGN","creator":"VOID SOVEREIGN","creatorUrl":"https://www.youtube.com/@VOID-SOVEREIGN02","url":"https://www.youtube.com/watch?v=4PmadsyACDs","thumbnail":"https://i.ytimg.com/vi/4PmadsyACDs/hqdefault.jpg","kind":"community","views":7300},
    {"id":"hK4IlDGfGdI","title":"Fang Yuan Edit — \"I Have Lived 500 Years\"","channel":"Lotmxpity","creator":"Lotmxpity","creatorUrl":"https://www.youtube.com/@lotmxpity","url":"https://www.youtube.com/watch?v=hK4IlDGfGdI","thumbnail":"https://i.ytimg.com/vi/hK4IlDGfGdI/hqdefault.jpg","kind":"community","views":7000},
    {"id":"V8Jl4p4ae1g","title":"Battle of Yi Tian Mountain, Ai-mated","channel":"Peak Seeker (Lee-On)","creator":"Peak Seeker (Lee-On)","creatorUrl":"https://www.youtube.com/@peakseekerleeon","url":"https://www.youtube.com/watch?v=V8Jl4p4ae1g","thumbnail":"https://i.ytimg.com/vi/V8Jl4p4ae1g/hqdefault.jpg","kind":"community","views":6890},
    {"id":"Il1_uTADHVc","title":"Reverend Insanity Best Edits/Quotes Compilation #1","channel":"Peak Fiction","creator":"RAUNAK GAMER YT (Peak Fiction)","creatorUrl":"https://www.youtube.com/@R.EDITS.R","url":"https://www.youtube.com/watch?v=Il1_uTADHVc","thumbnail":"https://i.ytimg.com/vi/Il1_uTADHVc/hqdefault.jpg","kind":"community","views":6259},
    {"id":"gqo4X_rwmYo","title":"Reverend Insanity Edits #12 That Shows Why It's Peak Fiction","channel":"AniMangHwa","creator":"AniMangHwa","creatorUrl":"https://www.youtube.com/@AniMangHwa_","url":"https://www.youtube.com/watch?v=gqo4X_rwmYo","thumbnail":"https://i.ytimg.com/vi/gqo4X_rwmYo/hqdefault.jpg","kind":"community","views":4487},
    {"id":"Rt8X6x7z60Q","title":"Fang Yuan vs Heavens | Eternal Life Doesn't Exist","channel":"SAINT OGRE","creator":"SAINT OGRE","creatorUrl":"https://www.youtube.com/@SAINT-OGRE","url":"https://www.youtube.com/watch?v=Rt8X6x7z60Q","thumbnail":"https://i.ytimg.com/vi/Rt8X6x7z60Q/hqdefault.jpg","kind":"community","views":4895},
    {"id":"E1qpALDSdow","title":"Reverend Insanity Power System Explained (Hindi)","channel":"Dreamless","creator":"Dreamless","creatorUrl":"https://www.youtube.com/@dreamless_reader","url":"https://www.youtube.com/watch?v=E1qpALDSdow","thumbnail":"https://i.ytimg.com/vi/E1qpALDSdow/hqdefault.jpg","kind":"community","views":4643},
    {"id":"d8lpSFndAgs","title":"Fang Yuan Edit — \"Sem Controle\"","channel":"@XiaoMo_editzs","creator":"@XiaoMo_editzs","creatorUrl":"https://www.youtube.com/@XiaoMo_editzs","url":"https://www.youtube.com/watch?v=d8lpSFndAgs","thumbnail":"https://i.ytimg.com/vi/d8lpSFndAgs/hqdefault.jpg","kind":"community","views":3400},
    {"id":"Wz4uX_tW8CE","title":"Bai Ning Bing Is NOT Normal (edit)","channel":"REVÍVE ANIMATION","creator":"REVÍVE ANIMATION","creatorUrl":"https://www.youtube.com/@reviveanimation","url":"https://www.youtube.com/watch?v=Wz4uX_tW8CE","thumbnail":"https://i.ytimg.com/vi/Wz4uX_tW8CE/hqdefault.jpg","kind":"community","views":3600},
    {"id":"kiOcj58sBr8","title":"Reverend Insanity | Memes 7","channel":"Anime Vega","creator":"Anime Vega","creatorUrl":"https://www.youtube.com/@animevega","url":"https://www.youtube.com/watch?v=kiOcj58sBr8","thumbnail":"https://i.ytimg.com/vi/kiOcj58sBr8/hqdefault.jpg","kind":"community","views":2753},
    {"id":"FoBgVpbvbyA","title":"\"Let The World Down\" — Fang Yuan Edit","channel":"BLINKER","creator":"BLINKER","creatorUrl":"https://www.youtube.com/@BLINKING_GOD","url":"https://www.youtube.com/watch?v=FoBgVpbvbyA","thumbnail":"https://i.ytimg.com/vi/FoBgVpbvbyA/hqdefault.jpg","kind":"community","views":2300},
    {"id":"hzSehODmEOs","title":"Reverend Insanity Power System Explained, Pt. 1","channel":"Eternal Aura","creator":"Eternal Aura","creatorUrl":"https://www.youtube.com/@EternalAuraAnime","url":"https://www.youtube.com/watch?v=hzSehODmEOs","thumbnail":"https://i.ytimg.com/vi/hzSehODmEOs/hqdefault.jpg","kind":"community","views":1901},
    {"id":"5noHiXBt3I4","title":"Reverend Insanity, Episódio 1 (Legendado PT-BR)","channel":"Old Man Baka","creator":"Old Man Baka · animation by 异类Outliers","creatorUrl":"https://www.youtube.com/@VelhoBaka","url":"https://www.youtube.com/watch?v=5noHiXBt3I4","thumbnail":"https://i.ytimg.com/vi/5noHiXBt3I4/hqdefault.jpg","kind":"community","views":996},
    {"id":"x5S-ipAY1M4","title":"The Most Evil Protagonist | Reverend Insanity Manhua Ch. 1 (Hindi)","channel":"ANIUSIVE","creator":"ANIUSIVE","creatorUrl":"https://www.youtube.com/@Aniusive","url":"https://www.youtube.com/watch?v=x5S-ipAY1M4","thumbnail":"https://i.ytimg.com/vi/x5S-ipAY1M4/hqdefault.jpg","kind":"community","views":372},
    {"id":"xUiobAHYUpY","title":"Reverend Insanity Animation Compilations","channel":"Peak Seeker (Lee-On)","creator":"Peak Seeker (Lee-On)","creatorUrl":"https://www.youtube.com/@peakseekerleeon","url":"https://www.youtube.com/watch?v=xUiobAHYUpY","thumbnail":"https://i.ytimg.com/vi/xUiobAHYUpY/hqdefault.jpg","kind":"community","views":1423},
    {"id":"yIq6KLTWrwc","title":"Demon Path — Raising Gu Insects to Cultivate Immortality (Manhwa Recap)","channel":"Abril Aril","creator":"Abril Aril","creatorUrl":"https://www.youtube.com/@AbrilAril","url":"https://www.youtube.com/watch?v=yIq6KLTWrwc","thumbnail":"https://i.ytimg.com/vi/yIq6KLTWrwc/maxresdefault.jpg","kind":"community","views":1287},
    {"id":"IvbVz7xpBpo","title":"Fang Yuan Reborn! Ch. 1-2 Explained (Hindi)","channel":"Masum Senpai","creator":"Masum Senpai","creatorUrl":"https://www.youtube.com/@MasumSenpai","url":"https://www.youtube.com/watch?v=IvbVz7xpBpo","thumbnail":"https://i.ytimg.com/vi/IvbVz7xpBpo/hqdefault.jpg","kind":"community","views":1187},
    {"id":"T9bTZBF8L1U","title":"Reverend Insanity Audiobook Chapters 226-250","channel":"EtherealArcs","creator":"EtherealArcs","creatorUrl":"https://www.youtube.com/@EtherealArcs","url":"https://www.youtube.com/watch?v=T9bTZBF8L1U","thumbnail":"https://i.ytimg.com/vi/T9bTZBF8L1U/hqdefault.jpg","kind":"community","views":1098},
    {"id":"XE4PhmZZNlg","title":"Reverend Insanity: Fang Yuan and Bai Ning Bing Edit","channel":"ShadowVector","creator":"ShadowVector","creatorUrl":"https://www.youtube.com/@Shadow_Vector","url":"https://www.youtube.com/watch?v=XE4PhmZZNlg","thumbnail":"https://i.ytimg.com/vi/XE4PhmZZNlg/hqdefault.jpg","kind":"community","views":795},
    {"id":"vnsyEkO3BJs","title":"Reverend Insanity Chapter 1 FULLY Explained","channel":"RogueWolf","creator":"RogueWolf","creatorUrl":"https://www.youtube.com/@RogueWolf_37","url":"https://www.youtube.com/watch?v=vnsyEkO3BJs","thumbnail":"https://i.ytimg.com/vi/vnsyEkO3BJs/hqdefault.jpg","kind":"community","views":136},
    {"id":"3lW-ATonv3o","title":"Fang Yuan vs Bai Ning Bing (Sora AI animation)","channel":"RandomStuff","creator":"RandomStuff","creatorUrl":"https://www.youtube.com/@RandomStuff-o1c","url":"https://www.youtube.com/watch?v=3lW-ATonv3o","thumbnail":"https://i.ytimg.com/vi/3lW-ATonv3o/hqdefault.jpg","kind":"community","views":697},
    {"id":"E2OnlAJUZjQ","title":"Reverend Insanity or Gu Daoist Master, Ch. 1906-1910 (Hindi audiobook)","channel":"AUDIOBOOKS108","creator":"AUDIOBOOKS108","creatorUrl":"https://www.youtube.com/@AUDIOBOOKS108-po3mc","url":"https://www.youtube.com/watch?v=E2OnlAJUZjQ","thumbnail":"https://i.ytimg.com/vi/E2OnlAJUZjQ/hqdefault.jpg","kind":"community","views":104},
    {"id":"jT732t1B6wo","title":"Reverend Insanity or Gu Daoist Master, Ch. 1231-1235 (Hindi audiobook)","channel":"AUDIOBOOKS108","creator":"AUDIOBOOKS108","creatorUrl":"https://www.youtube.com/@AUDIOBOOKS108-po3mc","url":"https://www.youtube.com/watch?v=jT732t1B6wo","thumbnail":"https://i.ytimg.com/vi/jT732t1B6wo/hqdefault.jpg","kind":"community","views":141},
    {"id":"R0i8asg7-bE","title":"Reverend Insanity or Gu Daoist Master, Ch. 1321-1325 (Hindi audiobook)","channel":"AUDIOBOOKS108","creator":"AUDIOBOOKS108","creatorUrl":"https://www.youtube.com/@AUDIOBOOKS108-po3mc","url":"https://www.youtube.com/watch?v=R0i8asg7-bE","thumbnail":"https://i.ytimg.com/vi/R0i8asg7-bE/hqdefault.jpg","kind":"community","views":92},
    {"id":"wUt2ZdVw0PQ","title":"Fang Yuan Rejects the Trap! Ch. 11 Explained","channel":"Novel Nexus","creator":"Novel Nexus","creatorUrl":"https://www.youtube.com/@NovelNexus-j3o","url":"https://www.youtube.com/watch?v=wUt2ZdVw0PQ","thumbnail":"https://i.ytimg.com/vi/wUt2ZdVw0PQ/hqdefault.jpg","kind":"community","views":14},
    {"id":"Q7WrrNgxhj0","title":"Reverend Insanity Chapter 3 Explained — Fang Yuan's Cold Awakening","channel":"Novel Nexus","creator":"Novel Nexus","creatorUrl":"https://www.youtube.com/@NovelNexus-j3o","url":"https://www.youtube.com/watch?v=Q7WrrNgxhj0","thumbnail":"https://i.ytimg.com/vi/Q7WrrNgxhj0/hqdefault.jpg","kind":"community","views":44},
    {"id":"qzz-GGnklwE","title":"Reverend Insanity Chapter 3 Explained — Fang Yuan's Ruthless Strategy","channel":"Yore","creator":"Yore","creatorUrl":"https://www.youtube.com/@yore-77","url":"https://www.youtube.com/watch?v=qzz-GGnklwE","thumbnail":"https://i.ytimg.com/vi/qzz-GGnklwE/hqdefault.jpg","kind":"community","views":65},
    {"id":"i627Y_4lmsc","title":"Reverend Insanity Chapter 407 Explained — Immortal Crane Sect's Plan","channel":"Story Vault","creator":"Story Vault","creatorUrl":"https://www.youtube.com/@StoryVaultStories21","url":"https://www.youtube.com/watch?v=i627Y_4lmsc","thumbnail":"https://i.ytimg.com/vi/i627Y_4lmsc/hqdefault.jpg","kind":"community","views":64},
    {"id":"gWjtqhqBCYI","title":"Reverend Insanity EN 395: Bai Ning Bing?","channel":"Novel-Gate","creator":"Novel-Gate","creatorUrl":"https://www.youtube.com/@Novel-Gate","url":"https://www.youtube.com/watch?v=gWjtqhqBCYI","thumbnail":"https://i.ytimg.com/vi/gWjtqhqBCYI/hqdefault.jpg","kind":"community","views":39},
    {"id":"KsTIUg7f2kU","title":"Why Fang Yuan Is NOT Evil… He Is Something Worse","channel":"Beyond Morality","creator":"Beyond Morality","creatorUrl":"https://www.youtube.com/@BeyondMorality-o2w","url":"https://www.youtube.com/watch?v=KsTIUg7f2kU","thumbnail":"https://i.ytimg.com/vi/KsTIUg7f2kU/maxresdefault.jpg","kind":"community","views":560},
    {"id":"5aZ9MVdrPYE","title":"Fan Animation: Three Punches to Shatter Dreams (ch. 84–85)","channel":"Awawa","creator":"Awawa · animation by 一下饭王一","creatorUrl":"https://www.youtube.com/@awawa3883","url":"https://www.youtube.com/watch?v=5aZ9MVdrPYE","thumbnail":"https://i.ytimg.com/vi/5aZ9MVdrPYE/maxresdefault.jpg","kind":"community","views":693},
    {"id":"Rd_aueCi-a8","title":"FINALLY! Reverend Insanity Anime (4K fanmade trailer)","channel":"Animation Dope","creator":"Outboxer Explains & Revive Animation","creatorUrl":"https://www.youtube.com/@AnimationDope","url":"https://www.youtube.com/watch?v=Rd_aueCi-a8","thumbnail":"https://i.ytimg.com/vi/Rd_aueCi-a8/hqdefault.jpg","kind":"community","views":255},
    {"id":"Hk_Ul1D8uag","title":"An Amateur Narration of Reverend Insanity (Chapters 1–25)","channel":"An Amature Narrator","creator":"An Amature Narrator","creatorUrl":"https://www.youtube.com/@AmatureNarrator","url":"https://www.youtube.com/watch?v=Hk_Ul1D8uag","thumbnail":"https://i.ytimg.com/vi/Hk_Ul1D8uag/maxresdefault.jpg","kind":"community","views":36}
  ]
};
