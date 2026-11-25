/* Fan animation & community video carousel for the homepage.
 *
 * This file is a plain data file, not hand-styled markup: js/app.js reads
 * window.OMNIARCH_DONGHUA and renders the carousel from it. It starts as a
 * hand-curated seed (source:"curated") and is designed to be overwritten by
 * .github/workflows/update-donghua.yml once a YOUTUBE_API_KEY repo secret
 * exists, at which point `source` becomes "youtube-api" and `updatedAt`
 * reflects the real refresh time. If the workflow ever has no key, fails, or
 * the API quota is hit, it leaves this file untouched rather than breaking
 * the carousel, so the site always has something real to show.
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
 * trending: the larger pool shown behind the "See more" link — this is
 * where most community videos (including the highest-view ones) live,
 * instead of crowding the homepage strip.
 *
 * Every entry carries a `creator` (the channel/person who made that
 * specific video) credited in the UI next to its title. That is separate
 * from site-wide attribution: the lore, translation notes and wiki
 * write-ups that this whole site is built from are The Omniarch's own
 * worldbuilding reference work, credited once in the carousel copy below
 * rather than repeated on every video card. Inclusion of a video here is
 * not an endorsement or a claim of affiliation unless stated.
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
    {"id":"KiTMqhpp8rs","title":"Reverend Insanity, Chapter 1 — anime-style adaptation","channel":"Reverend Insanity (fan channel)","creator":"Reverend Insanity (fan channel)","creatorUrl":"https://www.youtube.com/@reverendinsanity-anime","url":"https://www.youtube.com/watch?v=KiTMqhpp8rs","thumbnail":"https://i.ytimg.com/vi/KiTMqhpp8rs/maxresdefault.jpg","kind":"community"},
    {"id":"J_LFtREMZdM","title":"The Story of Fang Yuan — a view of what his first life could have been","channel":"cornwilae","creator":"cornwilae","creatorUrl":"https://www.youtube.com/@Historian_Cults","url":"https://www.youtube.com/watch?v=J_LFtREMZdM","thumbnail":"https://i.ytimg.com/vi/J_LFtREMZdM/maxresdefault.jpg","kind":"community"},
    {"id":"6-hqIh56MNM","title":"Venerables of the Gu World","channel":"jiral","creator":"jiral","creatorUrl":"https://www.youtube.com/@sshhh8773","url":"https://www.youtube.com/watch?v=6-hqIh56MNM","thumbnail":"https://i.ytimg.com/vi/6-hqIh56MNM/maxresdefault.jpg","kind":"community"}
  ],
  "trending": [
    {"id":"Zw4ODLmARWg","title":"This Ruthless MC Turns Hidden Gu Treasures Into Pure Power","channel":"Manhwa Enjoyer","creator":"Manhwa Enjoyer","creatorUrl":"https://www.youtube.com/@Manhwa_Enjoyer666","url":"https://www.youtube.com/watch?v=Zw4ODLmARWg","thumbnail":"https://i.ytimg.com/vi/Zw4ODLmARWg/maxresdefault.jpg","kind":"community","views":151539},
    {"id":"rAJA59vSBes","title":"Reverend Insanity: The GREATEST Series You’ve Never Heard Of","channel":"Uyak","creator":"Uyak","creatorUrl":"https://www.youtube.com/@UyakNo","url":"https://www.youtube.com/watch?v=rAJA59vSBes","thumbnail":"https://i.ytimg.com/vi/rAJA59vSBes/maxresdefault.jpg","kind":"community","views":9900},
    {"id":"5aZ9MVdrPYE","title":"Fan Animation: Three Punches to Shatter Dreams (ch. 84–85)","channel":"Awawa","creator":"Awawa · animation by 一下饭王一","creatorUrl":"https://www.youtube.com/@awawa3883","url":"https://www.youtube.com/watch?v=5aZ9MVdrPYE","thumbnail":"https://i.ytimg.com/vi/5aZ9MVdrPYE/maxresdefault.jpg","kind":"community","views":693},
    {"id":"KsTIUg7f2kU","title":"Why Fang Yuan Is NOT Evil… He Is Something Worse","channel":"Beyond Morality","creator":"Beyond Morality","creatorUrl":"https://www.youtube.com/@BeyondMorality-o2w","url":"https://www.youtube.com/watch?v=KsTIUg7f2kU","thumbnail":"https://i.ytimg.com/vi/KsTIUg7f2kU/maxresdefault.jpg","kind":"community","views":560},
    {"id":"Rd_aueCi-a8","title":"FINALLY! Reverend Insanity Anime (4K fanmade trailer)","channel":"Animation Dope","creator":"Outboxer Explains & Revive Animation","creatorUrl":"https://www.youtube.com/@AnimationDope","url":"https://www.youtube.com/watch?v=Rd_aueCi-a8","thumbnail":"https://i.ytimg.com/vi/Rd_aueCi-a8/hqdefault.jpg","kind":"community","views":255},
    {"id":"Hk_Ul1D8uag","title":"An Amateur Narration of Reverend Insanity (Chapters 1–25)","channel":"An Amature Narrator","creator":"An Amature Narrator","creatorUrl":"https://www.youtube.com/@AmatureNarrator","url":"https://www.youtube.com/watch?v=Hk_Ul1D8uag","thumbnail":"https://i.ytimg.com/vi/Hk_Ul1D8uag/maxresdefault.jpg","kind":"community","views":36}
  ]
};
